/**
 * Cross-Session Context Provider
 *
 * Loads context from recent sessions that worked on the same project directory,
 * giving the LLM awareness of prior work when a new session starts.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import type { Session } from './sessionManager.js';

// ============ Type Definitions ============

export interface SessionContextOptions {
  /** Directory where session files are stored */
  sessionsDir?: string;
  /** Maximum number of recent sessions to scan */
  maxRecentSessions?: number;
  /** Maximum token budget for session context */
  maxTokens?: number;
}

interface SessionSummary {
  title: string;
  date: string;
  workingOn: string;
  files: string[];
  keyPoints: string[];
}

// ============ Constants ============

const DEFAULT_MAX_RECENT_SESSIONS = 5;
const DEFAULT_MAX_TOKENS = 1000;

/** Keywords that signal a decision or agreement in a message */
const DECISION_KEYWORDS = ['decided', 'chose', 'agreed', 'confirmed'];

/**
 * Regex to match file paths with extensions.
 * Matches tokens like src/foo/bar.ts, ./utils/helper.js, tests/payment.test.ts
 */
const FILE_PATH_REGEX = /(?:\.?\.\/)?(?:[\w-]+\/)*[\w.-]+\.\w{1,10}/g;

/** Common non-file extensions to filter out (URLs, versions, etc.) */
const IGNORE_EXTENSIONS = new Set(['com', 'org', 'net', 'io', 'dev', 'ai', 'html', 'htm', 'www']);

// ============ Helper Functions ============

/**
 * Simple token estimator: ~4 characters per token.
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Format a timestamp as YYYY-MM-DD.
 */
function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Extract file paths mentioned in text, filtering out false positives.
 */
function extractFilePaths(text: string): string[] {
  const matches = text.match(FILE_PATH_REGEX) ?? [];
  return matches.filter((m) => {
    const ext = m.split('.').pop()?.toLowerCase() ?? '';
    return !IGNORE_EXTENSIONS.has(ext);
  });
}

/**
 * Check if a message contains decision/agreement keywords.
 */
function isDecisionMessage(content: string): boolean {
  const lower = content.toLowerCase();
  return DECISION_KEYWORDS.some((kw) => lower.includes(kw));
}

/**
 * Extract a concise decision phrase from a message.
 * Finds the sentence containing the keyword and truncates it.
 */
function extractDecisionPhrase(content: string): string {
  const lower = content.toLowerCase();
  for (const kw of DECISION_KEYWORDS) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      // Find sentence boundaries around the keyword
      const sentenceStart = Math.max(0, content.lastIndexOf('.', idx) + 1);
      const sentenceEnd = content.indexOf('.', idx);
      const end = sentenceEnd !== -1 ? sentenceEnd : content.length;
      const sentence = content.slice(sentenceStart, end).trim();
      // Truncate long sentences
      if (sentence.length > 120) {
        return sentence.slice(0, 117) + '...';
      }
      return sentence;
    }
  }
  return content.slice(0, 80);
}

// ============ Session File Reading ============

interface SessionFileInfo {
  filePath: string;
  mtimeMs: number;
}

/**
 * List session files sorted by modification time (most recent first).
 */
function listSessionFiles(sessionsDir: string): SessionFileInfo[] {
  try {
    if (!fs.existsSync(sessionsDir)) {
      return [];
    }

    const entries = fs.readdirSync(sessionsDir);
    const files: SessionFileInfo[] = [];

    for (const entry of entries) {
      if (!entry.endsWith('.json')) {
        continue;
      }
      const filePath = path.join(sessionsDir, entry);
      try {
        const stat = fs.statSync(filePath);
        files.push({ filePath, mtimeMs: stat.mtimeMs });
      } catch {
        // Skip files we can't stat
      }
    }

    // Sort by modification time, most recent first
    files.sort((a, b) => b.mtimeMs - a.mtimeMs);
    return files;
  } catch {
    return [];
  }
}

/**
 * Safely read and parse a session file.
 */
function readSessionFile(filePath: string): Session | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const session = JSON.parse(content) as Session;
    // Basic validation
    if (session?.metadata?.id && Array.isArray(session.messages)) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

// ============ Session Summarization ============

/**
 * Check if a session is relevant to the given working directory.
 * Looks for the workdir path in message contents.
 */
function isSessionRelevant(session: Session, workdir: string): boolean {
  // Normalize the workdir for matching
  const normalizedWorkdir = workdir.replace(/\\/g, '/');
  const dirName = path.basename(normalizedWorkdir);

  for (const msg of session.messages) {
    if (msg.content.includes(normalizedWorkdir) || msg.content.includes(dirName)) {
      return true;
    }
  }

  // If no workdir reference, still include it — the session may be about the
  // same project even without explicit path mentions
  return true;
}

/**
 * Summarize a session for context injection.
 */
function summarizeSession(session: Session): SessionSummary {
  const title = session.metadata.title ?? 'Untitled session';
  const date = formatDate(session.metadata.updated);

  // Collect user messages for "working on" summary
  const userMessages = session.messages.filter((m) => m.role === 'user');
  const lastUserMessages = userMessages.slice(-3);
  const workingOn =
    lastUserMessages.length > 0
      ? lastUserMessages[0].content.slice(0, 100).replace(/\n/g, ' ')
      : 'unknown';

  // Collect file paths from all messages
  const allFiles = new Set<string>();
  for (const msg of session.messages) {
    const files = extractFilePaths(msg.content);
    for (const f of files) {
      allFiles.add(f);
    }
  }

  // Collect key decision points
  const keyPoints: string[] = [];
  for (const msg of session.messages) {
    if (msg.role === 'assistant' && isDecisionMessage(msg.content)) {
      const phrase = extractDecisionPhrase(msg.content);
      if (phrase && keyPoints.length < 5) {
        keyPoints.push(phrase);
      }
    }
  }

  return {
    title,
    date,
    workingOn,
    files: Array.from(allFiles).slice(0, 10), // Limit to 10 files
    keyPoints,
  };
}

/**
 * Format a session summary as a markdown section.
 */
function formatSummary(summary: SessionSummary): string {
  const lines: string[] = [];
  lines.push(`### Session: "${summary.title}" (${summary.date})`);
  lines.push(`- Working on: ${summary.workingOn}`);

  if (summary.files.length > 0) {
    lines.push(`- Files: ${summary.files.join(', ')}`);
  }

  if (summary.keyPoints.length > 0) {
    lines.push(`- Key points: ${summary.keyPoints.join('; ')}`);
  }

  return lines.join('\n');
}

// ============ Main Class ============

export class SessionContextProvider {
  private sessionsDir: string;
  private maxRecentSessions: number;
  private maxTokens: number;

  constructor(options?: SessionContextOptions) {
    this.sessionsDir = options?.sessionsDir ?? path.join(os.homedir(), '.alexi', 'sessions');
    this.maxRecentSessions = options?.maxRecentSessions ?? DEFAULT_MAX_RECENT_SESSIONS;
    this.maxTokens = options?.maxTokens ?? DEFAULT_MAX_TOKENS;
  }

  /**
   * Get context from recent sessions for the given working directory.
   * Returns a formatted string suitable for system prompt injection.
   */
  getRecentContext(workdir: string): string {
    const sessionFiles = listSessionFiles(this.sessionsDir);

    if (sessionFiles.length === 0) {
      return '';
    }

    const summaries: string[] = [];
    let tokenCount = 0;
    let sessionsProcessed = 0;

    // Reserve tokens for the header
    const header = '## Recent Session Context';
    tokenCount += estimateTokens(header);

    for (const fileInfo of sessionFiles) {
      if (sessionsProcessed >= this.maxRecentSessions) {
        break;
      }

      const session = readSessionFile(fileInfo.filePath);
      if (!session) {
        continue;
      }

      // Skip sessions with very few messages (likely empty/abandoned)
      if (session.messages.length < 2) {
        continue;
      }

      if (!isSessionRelevant(session, workdir)) {
        continue;
      }

      const summary = summarizeSession(session);
      const formatted = formatSummary(summary);
      const formattedTokens = estimateTokens(formatted);

      // Check if we'd exceed the budget
      if (tokenCount + formattedTokens > this.maxTokens) {
        break;
      }

      summaries.push(formatted);
      tokenCount += formattedTokens;
      sessionsProcessed++;
    }

    if (summaries.length === 0) {
      return '';
    }

    return `${header}\n${summaries.join('\n\n')}`;
  }
}

// ============ Convenience Function ============

/**
 * Create a SessionContextProvider with defaults and return the formatted context.
 * Intended as the main entry point for integration with agenticChat and interactive.
 */
export function getSessionContextString(workdir: string): string {
  const provider = new SessionContextProvider();
  return provider.getRecentContext(workdir);
}
