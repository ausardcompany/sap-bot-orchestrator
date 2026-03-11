import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../memory.js', () => {
  const mockManager = {
    add: vi.fn(),
    getAll: vi.fn().mockReturnValue([]),
  };
  return {
    getMemoryManager: vi.fn(() => mockManager),
  };
});

import { SessionCloseAnalyzer, closeSession } from '../sessionClose.js';
import type { Message } from '../sessionManager.js';
import { getMemoryManager } from '../memory.js';

function msg(role: 'user' | 'assistant' | 'system', content: string): Message {
  return { role, content, timestamp: Date.now() };
}

/**
 * Build a minimal conversation of 4+ messages so it passes the default
 * minMessages threshold. The supplied messages are appended after filler.
 */
function conversation(...extra: Message[]): Message[] {
  const filler: Message[] = [
    msg('user', 'Hello there.'),
    msg('assistant', 'Hi, how can I help?'),
    msg('user', 'I have a question.'),
    msg('assistant', 'Sure, go ahead.'),
  ];
  return [...filler, ...extra];
}

describe('SessionCloseAnalyzer', () => {
  let mockManager: { add: ReturnType<typeof vi.fn>; getAll: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    mockManager = getMemoryManager() as unknown as typeof mockManager;
    mockManager.getAll.mockReturnValue([]);
  });

  // ======================================================
  // 1. Basic extraction rules
  // ======================================================
  describe('basic extraction rules', () => {
    it('returns empty array when fewer than minMessages (default 4)', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages: Message[] = [
        msg('user', 'We decided to use React.'),
        msg('assistant', 'Good choice.'),
        msg('user', 'Thanks.'),
      ];

      const result = analyzer.analyze(messages);

      expect(result).toEqual([]);
    });

    it('extracts decisions: message containing "decided to"', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(msg('user', 'We decided to use React for the frontend.'));

      const result = analyzer.analyze(messages);

      const decision = result.find((k) => k.tags.includes('decision'));
      expect(decision).toBeDefined();
      expect(decision!.type).toBe('semantic');
      expect(decision!.priority).toBe(8);
      expect(decision!.tags).toEqual(['decision']);
      expect(decision!.content).toContain('decided to use React');
    });

    it('extracts bugs: message containing "the root cause was"', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('assistant', 'The root cause was a race condition in the event loop.')
      );

      const result = analyzer.analyze(messages);

      const bugItem = result.find((k) => k.tags.includes('bug'));
      expect(bugItem).toBeDefined();
      expect(bugItem!.type).toBe('episodic');
      expect(bugItem!.priority).toBe(7);
      expect(bugItem!.tags).toEqual(['bug', 'issue']);
      expect(bugItem!.content).toContain('root cause');
    });

    it('extracts procedures: message containing "to deploy, run `npm deploy`"', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('assistant', 'To deploy, run `npm deploy`. It will handle everything automatically.')
      );

      const result = analyzer.analyze(messages);

      const procedure = result.find((k) => k.tags.includes('procedure'));
      expect(procedure).toBeDefined();
      expect(procedure!.type).toBe('procedural');
      expect(procedure!.priority).toBe(6);
      expect(procedure!.tags).toEqual(['procedure']);
    });

    it('procedure extraction includes next sentence for context', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('assistant', 'To fix the build, update webpack. This resolves the module error.')
      );

      const result = analyzer.analyze(messages);

      const procedure = result.find((k) => k.tags.includes('procedure'));
      expect(procedure).toBeDefined();
      expect(procedure!.content).toContain('To fix the build, update webpack.');
      expect(procedure!.content).toContain('This resolves the module error.');
    });

    it('architecture extraction only from assistant response to user question', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'What framework should we use?'),
        msg('assistant', 'We are using Next.js as the framework for this project.')
      );

      const result = analyzer.analyze(messages);

      const arch = result.find((k) => k.tags.includes('architecture'));
      expect(arch).toBeDefined();
      expect(arch!.type).toBe('semantic');
      expect(arch!.priority).toBe(7);
      expect(arch!.content).toContain('framework');
    });
  });

  // ======================================================
  // 2. System message handling
  // ======================================================
  describe('system message handling', () => {
    it('system messages are never analyzed', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(msg('system', 'We decided to use a new architecture pattern.'));

      const result = analyzer.analyze(messages);

      const decision = result.find((k) => k.tags.includes('decision'));
      expect(decision).toBeUndefined();
    });
  });

  // ======================================================
  // 3. Deduplication
  // ======================================================
  describe('deduplication', () => {
    it('deduplicates internally: two very similar sentences yield one result', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'We decided to use React for the frontend.'),
        msg('assistant', 'We decided to use React for the frontend app.')
      );

      const result = analyzer.analyze(messages);

      const decisions = result.filter((k) => k.tags.includes('decision'));
      expect(decisions).toHaveLength(1);
    });

    it('deduplicates against existing memories', () => {
      mockManager.getAll.mockReturnValue([
        { content: 'We decided to use React for the frontend.', id: '1', created: 0, updated: 0 },
      ]);

      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(msg('user', 'We decided to use React for the frontend.'));

      const result = analyzer.analyze(messages);

      const decisions = result.filter((k) => k.tags.includes('decision'));
      expect(decisions).toHaveLength(0);
    });
  });

  // ======================================================
  // 4. Limits and sorting
  // ======================================================
  describe('limits and sorting', () => {
    it('respects maxMemories option', () => {
      const analyzer = new SessionCloseAnalyzer({ maxMemories: 2 });
      const messages = conversation(
        msg('user', 'We decided to use React.'),
        msg('assistant', 'There is a bug in the login flow.'),
        msg('user', 'The issue is confirmed.'),
        msg('assistant', 'To fix it, run `npm run fix`. Then restart the server.')
      );

      const result = analyzer.analyze(messages);

      expect(result.length).toBeLessThanOrEqual(2);
    });

    it('results are sorted by priority descending', () => {
      const analyzer = new SessionCloseAnalyzer({ maxMemories: 10 });
      const messages = conversation(
        msg('assistant', 'To deploy, run `npm deploy`. Then check the logs.'),
        msg('user', 'We decided to adopt the new API.'),
        msg('assistant', 'The root cause was a null pointer.')
      );

      const result = analyzer.analyze(messages);

      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].priority).toBeGreaterThanOrEqual(result[i].priority);
      }
    });

    it('custom minMessages option is respected', () => {
      const analyzer = new SessionCloseAnalyzer({ minMessages: 2 });
      const messages: Message[] = [
        msg('user', 'We decided to use Vue.'),
        msg('assistant', 'Good choice.'),
      ];

      const result = analyzer.analyze(messages);

      const decision = result.find((k) => k.tags.includes('decision'));
      expect(decision).toBeDefined();
    });
  });

  // ======================================================
  // 5. analyzeAndStore
  // ======================================================
  describe('analyzeAndStore', () => {
    it('calls getMemoryManager().add() for each extracted item', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'We decided to go with PostgreSQL.'),
        msg('assistant', 'There was a bug in the migration script.')
      );

      analyzer.analyzeAndStore(messages, 'session-42');

      expect(mockManager.add).toHaveBeenCalled();
      const callCount = mockManager.add.mock.calls.length;
      expect(callCount).toBeGreaterThanOrEqual(1);
    });

    it('passes correct type, tags, priority, and source with sessionId', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(msg('user', 'We decided to adopt GraphQL.'));

      analyzer.analyzeAndStore(messages, 'abc-123');

      expect(mockManager.add).toHaveBeenCalledWith(
        expect.stringContaining('decided to adopt GraphQL'),
        expect.objectContaining({
          type: 'semantic',
          tags: ['decision'],
          priority: 8,
          source: 'session:abc-123',
        })
      );
    });

    it('uses "session-close" as source when no sessionId', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(msg('user', 'We decided to adopt GraphQL.'));

      analyzer.analyzeAndStore(messages);

      expect(mockManager.add).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          source: 'session-close',
        })
      );
    });

    it('returns count of memories created', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'We decided to use Svelte.'),
        msg('assistant', 'There is a bug in the parser.')
      );

      const count = analyzer.analyzeAndStore(messages, 'sess-1');

      expect(count).toBeGreaterThanOrEqual(1);
      expect(count).toBe(mockManager.add.mock.calls.length);
    });

    it('returns 0 when no items extracted', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'Nice weather today.'),
        msg('assistant', 'Indeed it is.')
      );

      const count = analyzer.analyzeAndStore(messages);

      expect(count).toBe(0);
      expect(mockManager.add).not.toHaveBeenCalled();
    });
  });

  // ======================================================
  // 6. closeSession convenience function
  // ======================================================
  describe('closeSession', () => {
    it('calls analyzeAndStore with default options', () => {
      const messages = conversation(msg('user', 'We decided to use Deno.'));

      const count = closeSession(messages, 'sess-99');

      expect(count).toBeGreaterThanOrEqual(1);
      expect(mockManager.add).toHaveBeenCalled();
    });

    it('returns number of memories created', () => {
      const messages = conversation(
        msg('user', 'We decided to switch to Bun.'),
        msg('assistant', 'The root cause was a dependency conflict.')
      );

      const count = closeSession(messages, 'sess-100');

      expect(typeof count).toBe('number');
      expect(count).toBe(mockManager.add.mock.calls.length);
    });
  });

  // ======================================================
  // 7. Architecture rule specifics
  // ======================================================
  describe('architecture rule specifics', () => {
    it('only matches assistant messages', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'What stack should we use?'),
        msg('user', 'We are using the microservices pattern.')
      );

      const result = analyzer.analyze(messages);

      const arch = result.find((k) => k.tags.includes('architecture'));
      expect(arch).toBeUndefined();
    });

    it('only matches when previous user message contains "?"', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'Tell me about the stack.'),
        msg('assistant', 'We are using the microservices pattern for the architecture.')
      );

      const result = analyzer.analyze(messages);

      const arch = result.find((k) => k.tags.includes('architecture'));
      expect(arch).toBeUndefined();
    });

    it('does NOT match assistant messages that do not follow a question', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'Let me know about our setup.'),
        msg('assistant', 'We are using the observer pattern and React framework.')
      );

      const result = analyzer.analyze(messages);

      const arch = result.find((k) => k.tags.includes('architecture'));
      expect(arch).toBeUndefined();
    });

    it('matches when previous user message contains "?"', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'What library are we using?'),
        msg('assistant', 'We are using the Redux library for state management.')
      );

      const result = analyzer.analyze(messages);

      const arch = result.find((k) => k.tags.includes('architecture'));
      expect(arch).toBeDefined();
      expect(arch!.type).toBe('semantic');
      expect(arch!.priority).toBe(7);
    });
  });

  // ======================================================
  // 8. Edge cases
  // ======================================================
  describe('edge cases', () => {
    it('empty messages array returns empty array', () => {
      const analyzer = new SessionCloseAnalyzer();

      const result = analyzer.analyze([]);

      expect(result).toEqual([]);
    });

    it('messages with no matching patterns returns empty array', () => {
      const analyzer = new SessionCloseAnalyzer();
      const messages = conversation(
        msg('user', 'How is the weather today?'),
        msg('assistant', 'It is sunny and warm.')
      );

      const result = analyzer.analyze(messages);

      expect(result).toEqual([]);
    });
  });
});
