import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  estimateTokens,
  estimateMessagesTokens,
  shouldCompact,
  compactConversation,
  setLLMSummarizeFn,
  getLLMSummarizeFn,
  type LLMSummarizeFn,
} from '../compaction.js';
import type { Message } from '../sessionManager.js';

// Helper to create test messages
function createMessage(role: Message['role'], content: string, timestamp?: number): Message {
  return {
    role,
    content,
    timestamp: timestamp ?? Date.now(),
  };
}

describe('Context Compaction System', () => {
  beforeEach(() => {
    // Reset global LLM function before each test
    setLLMSummarizeFn(null as unknown as LLMSummarizeFn);
  });

  describe('estimateTokens', () => {
    it('should return 0 for empty string', () => {
      expect(estimateTokens('')).toBe(0);
    });

    it('should return 0 for null/undefined', () => {
      expect(estimateTokens(null as unknown as string)).toBe(0);
      expect(estimateTokens(undefined as unknown as string)).toBe(0);
    });

    it('should estimate ~4 chars per token', () => {
      // 4 chars = 1 token
      expect(estimateTokens('1234')).toBe(1);

      // 8 chars = 2 tokens
      expect(estimateTokens('12345678')).toBe(2);

      // 10 chars = 3 tokens (ceil)
      expect(estimateTokens('1234567890')).toBe(3);
    });

    it('should handle longer text', () => {
      const longText = 'a'.repeat(1000);
      expect(estimateTokens(longText)).toBe(250);
    });
  });

  describe('estimateMessagesTokens', () => {
    it('should return 0 for empty array', () => {
      expect(estimateMessagesTokens([])).toBe(0);
    });

    it('should return 0 for null/undefined', () => {
      expect(estimateMessagesTokens(null as unknown as Message[])).toBe(0);
      expect(estimateMessagesTokens(undefined as unknown as Message[])).toBe(0);
    });

    it('should add overhead for each message', () => {
      const messages: Message[] = [
        createMessage('user', ''), // Empty content, just overhead
      ];

      // 4 tokens overhead per message + 0 for empty content
      expect(estimateMessagesTokens(messages)).toBe(4);
    });

    it('should sum tokens across messages', () => {
      const messages: Message[] = [
        createMessage('user', '1234'), // 1 token + 4 overhead = 5
        createMessage('assistant', '12345678'), // 2 tokens + 4 overhead = 6
      ];

      expect(estimateMessagesTokens(messages)).toBe(11);
    });
  });

  describe('shouldCompact', () => {
    it('should return false for empty messages', () => {
      expect(shouldCompact([], 1000)).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(shouldCompact(null as unknown as Message[], 1000)).toBe(false);
      expect(shouldCompact(undefined as unknown as Message[], 1000)).toBe(false);
    });

    it('should return false when below threshold (default 90%)', () => {
      const messages: Message[] = [
        createMessage('user', 'a'.repeat(100)), // ~25 tokens + 4 overhead = 29
      ];

      // 29 tokens < 90% of 100 (90 tokens)
      expect(shouldCompact(messages, 100)).toBe(false);
    });

    it('should return true when at or above threshold (default 90%)', () => {
      const messages: Message[] = [
        createMessage('user', 'a'.repeat(400)), // ~100 tokens + 4 overhead = 104
      ];

      // 104 tokens >= 90% of 100 (90 tokens)
      expect(shouldCompact(messages, 100)).toBe(true);
    });

    it('should use custom threshold', () => {
      const messages: Message[] = [
        createMessage('user', 'a'.repeat(200)), // ~50 tokens + 4 overhead = 54
      ];

      // With 50% threshold: 54 tokens >= 50% of 100 (50 tokens) = true
      expect(shouldCompact(messages, 100, 50)).toBe(true);

      // With 60% threshold: 54 tokens < 60% of 100 (60 tokens) = false
      expect(shouldCompact(messages, 100, 60)).toBe(false);
    });
  });

  describe('compactConversation', () => {
    describe('message preservation (last N kept)', () => {
      it('should keep all messages when count <= preserveLastN', async () => {
        const messages: Message[] = [
          createMessage('user', 'Hello'),
          createMessage('assistant', 'Hi there'),
        ];

        const { messages: compacted, result } = await compactConversation(messages, {
          preserveLastN: 4, // Default
        });

        expect(compacted).toHaveLength(2);
        expect(result.originalMessages).toBe(2);
        expect(result.compactedMessages).toBe(2);
        expect(result.estimatedTokensSaved).toBe(0);
        expect(result.summary).toBe('');
      });

      it('should preserve last N non-system messages', async () => {
        const messages: Message[] = [
          createMessage('user', 'Message 1'),
          createMessage('assistant', 'Response 1'),
          createMessage('user', 'Message 2'),
          createMessage('assistant', 'Response 2'),
          createMessage('user', 'Message 3'),
          createMessage('assistant', 'Response 3'),
        ];

        const { messages: compacted, result } = await compactConversation(messages, {
          preserveLastN: 2,
        });

        // Should have: 1 summary + 2 preserved = 3 messages
        expect(compacted).toHaveLength(3);
        expect(result.compactedMessages).toBe(3);

        // Last 2 messages should be preserved
        const lastTwo = compacted.slice(-2);
        expect(lastTwo[0].content).toBe('Message 3');
        expect(lastTwo[1].content).toBe('Response 3');
      });

      it('should preserve system messages separately', async () => {
        const messages: Message[] = [
          createMessage('system', 'You are a helpful assistant'),
          createMessage('user', 'Message 1'),
          createMessage('assistant', 'Response 1'),
          createMessage('user', 'Message 2'),
          createMessage('assistant', 'Response 2'),
          createMessage('user', 'Message 3'),
          createMessage('assistant', 'Response 3'),
        ];

        const { messages: compacted } = await compactConversation(messages, {
          preserveLastN: 2,
        });

        // Should have: 1 system + 1 summary + 2 preserved = 4 messages
        expect(compacted).toHaveLength(4);

        // First should be original system message
        expect(compacted[0].role).toBe('system');
        expect(compacted[0].content).toBe('You are a helpful assistant');

        // Second should be summary (also system role)
        expect(compacted[1].role).toBe('system');
        expect(compacted[1].content).toContain('[CONVERSATION SUMMARY]');
      });
    });

    describe('with mocked LLM call', () => {
      it('should use LLM function when provided', async () => {
        const mockSummary = 'KEY DECISIONS: Use TypeScript\nFILES CHANGED: index.ts';
        const mockLLM = vi.fn().mockResolvedValue(mockSummary);

        setLLMSummarizeFn(mockLLM);

        const messages: Message[] = [
          createMessage('user', 'Let us use TypeScript'),
          createMessage('assistant', 'Good choice'),
          createMessage('user', 'Create index.ts'),
          createMessage('assistant', 'Done'),
          createMessage('user', 'Recent message 1'),
          createMessage('assistant', 'Recent response 1'),
        ];

        const { messages: compacted, result } = await compactConversation(messages, {
          preserveLastN: 2,
        });

        expect(mockLLM).toHaveBeenCalledTimes(1);
        expect(mockLLM).toHaveBeenCalledWith(expect.stringContaining('KEY DECISIONS'));
        expect(mockLLM).toHaveBeenCalledWith(expect.stringContaining('Let us use TypeScript'));

        expect(result.summary).toBe(mockSummary);
        expect(compacted[0].content).toContain(mockSummary);
      });

      it('should truncate summary if exceeds max tokens', async () => {
        const longSummary = 'a'.repeat(20000); // Very long summary
        const mockLLM = vi.fn().mockResolvedValue(longSummary);

        setLLMSummarizeFn(mockLLM);

        const messages: Message[] = [
          createMessage('user', 'Message 1'),
          createMessage('assistant', 'Response 1'),
          createMessage('user', 'Message 2'),
          createMessage('assistant', 'Response 2'),
          createMessage('user', 'Message 3'),
          createMessage('assistant', 'Response 3'),
        ];

        const { result } = await compactConversation(messages, {
          preserveLastN: 2,
          summaryMaxTokens: 100, // 100 tokens = ~400 chars
        });

        // Summary should be truncated to ~400 chars + '...'
        expect(result.summary.length).toBeLessThanOrEqual(403);
        expect(result.summary.endsWith('...')).toBe(true);
      });
    });

    describe('fallback summary (no LLM)', () => {
      it('should create fallback summary without LLM', async () => {
        const messages: Message[] = [
          createMessage('user', 'Create file src/index.ts'),
          createMessage('assistant', 'I decided to use async/await'),
          createMessage('user', 'Fix the bug in utils.js'),
          createMessage('assistant', 'Done'),
          createMessage('user', 'Recent message'),
          createMessage('assistant', 'Recent response'),
        ];

        const { result } = await compactConversation(messages, {
          preserveLastN: 2,
        });

        // Fallback summary should contain file mentions
        expect(result.summary).toContain('FILES MENTIONED');
        expect(result.summary).toMatch(/index\.ts|utils\.js/);

        // Should contain context about message count
        expect(result.summary).toContain('messages summarized');
      });

      it('should extract decisions from messages', async () => {
        const messages: Message[] = [
          createMessage('user', 'What should we do?'),
          createMessage('assistant', 'We decided to use React for the frontend'),
          createMessage('user', 'Confirmed, will proceed with that approach'),
          createMessage('assistant', 'Great'),
          createMessage('user', 'Recent'),
          createMessage('assistant', 'Response'),
        ];

        const { result } = await compactConversation(messages, {
          preserveLastN: 2,
        });

        expect(result.summary).toContain('KEY POINTS');
      });
    });

    describe('edge cases', () => {
      it('should handle empty messages array', async () => {
        const { messages, result } = await compactConversation([]);

        expect(messages).toHaveLength(0);
        expect(result.originalMessages).toBe(0);
        expect(result.compactedMessages).toBe(0);
        expect(result.estimatedTokensSaved).toBe(0);
      });

      it('should handle null/undefined messages', async () => {
        const result1 = await compactConversation(null as unknown as Message[]);
        expect(result1.messages).toHaveLength(0);

        const result2 = await compactConversation(undefined as unknown as Message[]);
        expect(result2.messages).toHaveLength(0);
      });

      it('should handle only system messages', async () => {
        const messages: Message[] = [
          createMessage('system', 'System prompt 1'),
          createMessage('system', 'System prompt 2'),
        ];

        const { messages: compacted, result } = await compactConversation(messages, {
          preserveLastN: 4,
        });

        // System messages don't count towards preserveLastN, so no compaction
        expect(compacted).toHaveLength(2);
        expect(result.estimatedTokensSaved).toBe(0);
      });

      it('should report estimated tokens saved', async () => {
        const messages: Message[] = [
          createMessage('user', 'a'.repeat(1000)), // ~250 tokens
          createMessage('assistant', 'b'.repeat(1000)), // ~250 tokens
          createMessage('user', 'c'.repeat(100)), // ~25 tokens
          createMessage('assistant', 'd'.repeat(100)), // ~25 tokens
          createMessage('user', 'Recent 1'),
          createMessage('assistant', 'Recent 2'),
        ];

        const { result } = await compactConversation(messages, {
          preserveLastN: 2,
        });

        // Should save significant tokens
        expect(result.estimatedTokensSaved).toBeGreaterThan(0);
        expect(result.originalMessages).toBe(6);
        expect(result.compactedMessages).toBe(3); // summary + 2 preserved
      });
    });
  });

  describe('setLLMSummarizeFn / getLLMSummarizeFn', () => {
    it('should store and retrieve LLM function', () => {
      const mockFn = vi.fn();

      expect(getLLMSummarizeFn()).toBeNull();

      setLLMSummarizeFn(mockFn);
      expect(getLLMSummarizeFn()).toBe(mockFn);
    });
  });
});
