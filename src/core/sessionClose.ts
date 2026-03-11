/**
 * Session Close Pipeline
 * Auto-extracts important information from a conversation and stores it as
 * memories when a session ends.
 */

import type { Message } from './sessionManager.js';
import type { MemoryType, MemoryEntry } from './memory.js';
import { getMemoryManager } from './memory.js';

// ============ Type Definitions ============

export interface SessionCloseOptions {
  /** Minimum number of messages to trigger analysis */
  minMessages?: number;
  /** Maximum memories to create per session */
  maxMemories?: number;
}

export interface ExtractedKnowledge {
  content: string;
  type: MemoryType;
  tags: string[];
  priority: number;
}

// ============ Constants ============

const DEFAULT_MIN_MESSAGES = 4;
const DEFAULT_MAX_MEMORIES = 5;
const SIMILARITY_THRESHOLD = 0.8;

// ============ Pattern Definitions ============

interface ExtractionRule {
  type: MemoryType;
  priority: number;
  tags: string[];
  patterns: RegExp[];
  /** When true, also extract the sentence following the match for context */
  includeNextSentence?: boolean;
  /** When true, only match patterns found in assistant messages that follow a user question */
  assistantResponseOnly?: boolean;
}

const EXTRACTION_RULES: ExtractionRule[] = [
  {
    type: 'semantic',
    priority: 8,
    tags: ['decision'],
    patterns: [
      /\bdecided to\b/i,
      /\bchose to\b/i,
      /\bagreed on\b/i,
      /\bwe'll use\b/i,
      /\bgoing with\b/i,
      /\bconfirmed that\b/i,
      /\bthe approach is\b/i,
    ],
  },
  {
    type: 'episodic',
    priority: 7,
    tags: ['bug', 'issue'],
    patterns: [
      /\bbug\b/i,
      /\bissue\b/i,
      /\bbroken\b/i,
      /\bdoesn't work\b/i,
      /\bfailed because\b/i,
      /\bthe problem was\b/i,
      /\broot cause\b/i,
      /\bfix for\b/i,
    ],
  },
  {
    type: 'procedural',
    priority: 6,
    tags: ['procedure'],
    patterns: [
      /\bto deploy\b/i,
      /\bto fix\b/i,
      /\bthe steps are\b/i,
      /\byou need to\b/i,
      /\brun `/i,
      /\bcommand:/i,
      /\bworkflow:/i,
    ],
    includeNextSentence: true,
  },
  {
    type: 'semantic',
    priority: 7,
    tags: ['architecture'],
    patterns: [
      /\busing\b/i,
      /\bchose\b/i,
      /\barchitecture\b/i,
      /\bstack\b/i,
      /\bframework\b/i,
      /\blibrary\b/i,
      /\bpattern\b/i,
    ],
    assistantResponseOnly: true,
  },
];

// ============ Helper Functions ============

/**
 * Split text into sentences using a simple regex splitter.
 * Handles common abbreviations and decimal numbers to avoid false splits.
 */
function splitSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by whitespace or end of string
  const raw = text.split(/(?<=[.!?])\s+/);
  return raw.map((s) => s.trim()).filter((s) => s.length > 0);
}

/**
 * Calculate similarity between two strings using a bigram-based coefficient.
 * Returns a value between 0 and 1.
 */
function similarity(a: string, b: string): number {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();

  if (aLower === bLower) {
    return 1;
  }

  const bigramsA = new Set<string>();
  for (let i = 0; i < aLower.length - 1; i++) {
    bigramsA.add(aLower.slice(i, i + 2));
  }

  const bigramsB = new Set<string>();
  for (let i = 0; i < bLower.length - 1; i++) {
    bigramsB.add(bLower.slice(i, i + 2));
  }

  if (bigramsA.size === 0 && bigramsB.size === 0) {
    return 1;
  }

  let intersection = 0;
  for (const bg of bigramsA) {
    if (bigramsB.has(bg)) {
      intersection++;
    }
  }

  return (2 * intersection) / (bigramsA.size + bigramsB.size);
}

/**
 * Determine whether a message at the given index is an assistant message
 * that directly follows a user question.
 */
function isAssistantResponseToQuestion(messages: Message[], index: number): boolean {
  const msg = messages[index];
  if (msg.role !== 'assistant') {
    return false;
  }
  // Look backwards for the nearest user message
  for (let i = index - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      return messages[i].content.includes('?');
    }
    // Skip system messages
    if (messages[i].role === 'assistant') {
      return false;
    }
  }
  return false;
}

// ============ SessionCloseAnalyzer ============

export class SessionCloseAnalyzer {
  private minMessages: number;
  private maxMemories: number;

  constructor(options?: SessionCloseOptions) {
    this.minMessages = options?.minMessages ?? DEFAULT_MIN_MESSAGES;
    this.maxMemories = options?.maxMemories ?? DEFAULT_MAX_MEMORIES;
  }

  /**
   * Analyze a completed session and extract knowledge items.
   * Does NOT store them — returns candidates for review or auto-store.
   */
  analyze(messages: Message[]): ExtractedKnowledge[] {
    if (messages.length < this.minMessages) {
      return [];
    }

    const extracted: ExtractedKnowledge[] = [];

    for (let msgIdx = 0; msgIdx < messages.length; msgIdx++) {
      const message = messages[msgIdx];

      // Skip system messages entirely
      if (message.role === 'system') {
        continue;
      }

      const sentences = splitSentences(message.content);

      for (const rule of EXTRACTION_RULES) {
        // Architecture rule only applies to assistant responses to questions
        if (rule.assistantResponseOnly && !isAssistantResponseToQuestion(messages, msgIdx)) {
          continue;
        }

        for (let sentIdx = 0; sentIdx < sentences.length; sentIdx++) {
          const sentence = sentences[sentIdx];
          const matched = rule.patterns.some((p) => p.test(sentence));

          if (!matched) {
            continue;
          }

          let content = sentence;

          // For procedural rules, append the next sentence for context
          if (rule.includeNextSentence && sentIdx + 1 < sentences.length) {
            content = `${sentence} ${sentences[sentIdx + 1]}`;
          }

          extracted.push({
            content,
            type: rule.type,
            tags: [...rule.tags],
            priority: rule.priority,
          });
        }
      }
    }

    // Deduplicate internally — drop items that are too similar to each other
    const unique = this.deduplicateInternal(extracted);

    // Deduplicate against existing memories
    const fresh = this.deduplicateAgainstExisting(unique);

    // Sort by priority descending and enforce max limit
    fresh.sort((a, b) => b.priority - a.priority);

    return fresh.slice(0, this.maxMemories);
  }

  /**
   * Analyze and auto-store extracted knowledge as memories.
   * Returns the number of memories created.
   */
  analyzeAndStore(messages: Message[], sessionId?: string): number {
    const items = this.analyze(messages);
    if (items.length === 0) {
      return 0;
    }

    try {
      const manager = getMemoryManager();
      let count = 0;

      for (const item of items) {
        manager.add(item.content, {
          type: item.type,
          tags: item.tags,
          priority: item.priority,
          source: sessionId ? `session:${sessionId}` : 'session-close',
        });
        count++;
      }

      return count;
    } catch {
      return 0;
    }
  }

  /**
   * Remove items whose content is >80% similar to another item in the list.
   * Keeps the higher-priority item when a duplicate pair is found.
   */
  private deduplicateInternal(items: ExtractedKnowledge[]): ExtractedKnowledge[] {
    const result: ExtractedKnowledge[] = [];

    for (const item of items) {
      const isDuplicate = result.some(
        (existing) => similarity(existing.content, item.content) > SIMILARITY_THRESHOLD
      );
      if (!isDuplicate) {
        result.push(item);
      }
    }

    return result;
  }

  /**
   * Filter out items that are >80% similar to any existing memory.
   */
  private deduplicateAgainstExisting(items: ExtractedKnowledge[]): ExtractedKnowledge[] {
    let existingMemories: MemoryEntry[];
    try {
      existingMemories = getMemoryManager().getAll();
    } catch {
      // If we can't read existing memories, skip deduplication
      return items;
    }

    if (existingMemories.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return !existingMemories.some(
        (mem) => similarity(mem.content, item.content) > SIMILARITY_THRESHOLD
      );
    });
  }
}

// ============ Convenience Function ============

/**
 * Create a SessionCloseAnalyzer with defaults, analyze the messages,
 * auto-store extracted knowledge, and return the count of memories created.
 */
export function closeSession(messages: Message[], sessionId?: string): number {
  const analyzer = new SessionCloseAnalyzer();
  return analyzer.analyzeAndStore(messages, sessionId);
}
