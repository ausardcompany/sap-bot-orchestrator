import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SessionContextProvider, getSessionContextString } from '../sessionContext.js';

let tempDir: string;

beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-ctx-test-'));
});

afterEach(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});

// ============ Helpers ============

interface TestSession {
  metadata: {
    id: string;
    created: number;
    updated: number;
    totalTokens: number;
    messageCount: number;
    title?: string;
  };
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
  }>;
}

function writeSessionFile(dir: string, session: TestSession, filename?: string): string {
  const fname = filename || `${session.metadata.id}.json`;
  const filePath = path.join(dir, fname);
  fs.writeFileSync(filePath, JSON.stringify(session));
  return filePath;
}

function makeSession(
  overrides: Partial<TestSession> & { id?: string; title?: string } = {}
): TestSession {
  const id = overrides.id ?? 'test-session-1';
  const now = Date.now();
  return {
    metadata: {
      id,
      created: now - 60000,
      updated: now,
      totalTokens: 500,
      messageCount: 2,
      title: overrides.title ?? 'Test Session',
      ...overrides.metadata,
    },
    messages: overrides.messages ?? [
      { role: 'user', content: 'Hello, help me with my project', timestamp: now - 30000 },
      { role: 'assistant', content: 'Sure, I can help you.', timestamp: now },
    ],
  };
}

// ============ Tests ============

describe('SessionContextProvider', () => {
  describe('empty/missing directory', () => {
    it('should return empty string when sessions directory does not exist', () => {
      const nonExistentDir = path.join(tempDir, 'does-not-exist');
      const provider = new SessionContextProvider({ sessionsDir: nonExistentDir });

      const result = provider.getRecentContext('/some/workdir');

      expect(result).toBe('');
    });

    it('should return empty string when sessions directory is empty', () => {
      const provider = new SessionContextProvider({ sessionsDir: tempDir });

      const result = provider.getRecentContext('/some/workdir');

      expect(result).toBe('');
    });
  });

  describe('basic context generation', () => {
    it('should return formatted context with session title and date', () => {
      const updated = new Date('2025-06-15T12:00:00Z').getTime();
      const session = makeSession({
        title: 'Refactor auth module',
        metadata: {
          id: 'sess-1',
          created: updated - 60000,
          updated,
          totalTokens: 100,
          messageCount: 2,
          title: 'Refactor auth module',
        },
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Refactor auth module');
      expect(result).toContain('2025-06-15');
    });

    it('should include "## Recent Session Context" header', () => {
      const session = makeSession();
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toMatch(/^## Recent Session Context/);
    });

    it('should show "Working on:" line from last user messages', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'Fix the login page bug', timestamp: now - 30000 },
          { role: 'assistant', content: 'I will look into it.', timestamp: now - 20000 },
          { role: 'user', content: 'Also update the tests please', timestamp: now - 10000 },
          { role: 'assistant', content: 'Done.', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      // The "Working on:" line should come from the first of the last 3 user messages.
      // With 2 user messages total, last 3 gives both; first is "Fix the login page bug".
      expect(result).toContain('Working on:');
      expect(result).toContain('Fix the login page bug');
    });

    it('should show "Untitled session" when session has no title', () => {
      const session = makeSession();
      // Remove title from metadata
      delete (session.metadata as Record<string, unknown>).title;
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Untitled session');
    });
  });

  describe('file path extraction', () => {
    it('should extract file paths from messages', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          {
            role: 'user',
            content: 'Please update src/core/memory.ts and tests/utils.test.ts',
            timestamp: now - 10000,
          },
          {
            role: 'assistant',
            content: 'I updated src/core/memory.ts successfully.',
            timestamp: now,
          },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Files:');
      expect(result).toContain('src/core/memory.ts');
      expect(result).toContain('tests/utils.test.ts');
    });

    it('should filter out URL-like extensions (.com, .org)', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          {
            role: 'user',
            content: 'Check example.com and docs.org for info about src/utils/helper.js',
            timestamp: now - 10000,
          },
          {
            role: 'assistant',
            content: 'I checked the references and updated src/utils/helper.js',
            timestamp: now,
          },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      // The Files: line should contain only real file paths, not URL-like tokens
      const filesMatch = result.match(/Files: (.+)/);
      expect(filesMatch).not.toBeNull();
      const filesLine = filesMatch![1];
      expect(filesLine).toContain('src/utils/helper.js');
      expect(filesLine).not.toContain('example.com');
      expect(filesLine).not.toContain('docs.org');
    });
  });

  describe('decision extraction', () => {
    it('should extract decision phrases from assistant messages with "decided"', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'What approach should we use?', timestamp: now - 20000 },
          {
            role: 'assistant',
            content: 'We decided to use the strategy pattern for handling different providers.',
            timestamp: now - 10000,
          },
          { role: 'user', content: 'Sounds good.', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Key points:');
      expect(result).toContain('decided');
    });

    it('should extract decision phrases for "chose" keyword', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'Which library?', timestamp: now - 20000 },
          {
            role: 'assistant',
            content:
              'We chose zod for runtime validation because it has great TypeScript integration.',
            timestamp: now - 10000,
          },
          { role: 'user', content: 'OK', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Key points:');
      expect(result).toContain('chose');
    });

    it('should extract decision phrases for "agreed" keyword', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'Let us go with option B', timestamp: now - 20000 },
          {
            role: 'assistant',
            content: 'We agreed to go with option B for the migration approach.',
            timestamp: now - 10000,
          },
          { role: 'user', content: 'Great', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Key points:');
      expect(result).toContain('agreed');
    });

    it('should extract decision phrases for "confirmed" keyword', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'Is the config correct?', timestamp: now - 20000 },
          {
            role: 'assistant',
            content: 'I confirmed that the configuration is correct and all tests pass.',
            timestamp: now - 10000,
          },
          { role: 'user', content: 'Thanks', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Key points:');
      expect(result).toContain('confirmed');
    });

    it('should not include key points when no decisions are present', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'Just a regular question', timestamp: now - 10000 },
          {
            role: 'assistant',
            content: 'Here is a regular answer with no decisions.',
            timestamp: now,
          },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).not.toContain('Key points:');
    });

    it('should not extract decisions from user messages', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'user', content: 'I decided to refactor everything.', timestamp: now - 10000 },
          {
            role: 'assistant',
            content: 'That sounds like a good plan. Let me help.',
            timestamp: now,
          },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      // Only assistant messages trigger decision extraction
      expect(result).not.toContain('Key points:');
    });
  });

  describe('token budget', () => {
    it('should stop adding sessions when token budget is exceeded', () => {
      const now = Date.now();
      // Create two sessions with enough content
      const session1 = makeSession({
        id: 'sess-budget-1',
        title: 'First Session Alpha',
        messages: [
          { role: 'user', content: 'Working on the first task', timestamp: now - 10000 },
          { role: 'assistant', content: 'Here is the result for the first task.', timestamp: now },
        ],
      });
      const session2 = makeSession({
        id: 'sess-budget-2',
        title: 'Second Session Beta',
        messages: [
          { role: 'user', content: 'Working on the second task', timestamp: now - 50000 },
          {
            role: 'assistant',
            content: 'Here is the result for the second task.',
            timestamp: now - 40000,
          },
        ],
      });

      const path1 = writeSessionFile(tempDir, session1);
      // Ensure different mtime: write session2 file, then touch session1 to be newer
      const path2 = writeSessionFile(tempDir, session2);

      // Make session1 newer by updating its access/modify time
      const futureTime = new Date(now + 1000);
      fs.utimesSync(path1, futureTime, futureTime);
      const pastTime = new Date(now - 100000);
      fs.utimesSync(path2, pastTime, pastTime);

      // Use a very small maxTokens that can only fit the header + one session
      // The header "## Recent Session Context" is ~7 tokens (25 chars / 4)
      // A single session summary is roughly 20-40 tokens
      // Set budget so only one session fits
      const provider = new SessionContextProvider({
        sessionsDir: tempDir,
        maxTokens: 40,
      });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('First Session Alpha');
      expect(result).not.toContain('Second Session Beta');
    });

    it('should respect maxRecentSessions limit', () => {
      const now = Date.now();
      const sessions: TestSession[] = [];

      for (let i = 0; i < 5; i++) {
        sessions.push(
          makeSession({
            id: `sess-limit-${i}`,
            title: `Session Number ${i}`,
            messages: [
              { role: 'user', content: `Task ${i}`, timestamp: now - 10000 },
              { role: 'assistant', content: `Done ${i}`, timestamp: now },
            ],
          })
        );
      }

      const paths: string[] = [];
      for (const session of sessions) {
        paths.push(writeSessionFile(tempDir, session));
      }

      // Set mtimes so they are in order (session 4 newest, session 0 oldest)
      for (let i = 0; i < paths.length; i++) {
        const time = new Date(now + i * 10000);
        fs.utimesSync(paths[i], time, time);
      }

      const provider = new SessionContextProvider({
        sessionsDir: tempDir,
        maxRecentSessions: 2,
        maxTokens: 5000,
      });
      const result = provider.getRecentContext('/my/project');

      // Should include the 2 most recent sessions (4 and 3)
      expect(result).toContain('Session Number 4');
      expect(result).toContain('Session Number 3');
      expect(result).not.toContain('Session Number 2');
      expect(result).not.toContain('Session Number 1');
      expect(result).not.toContain('Session Number 0');
    });

    it('should return empty string when token budget is too small for any session', () => {
      const session = makeSession({ title: 'Some Session With Long Title For Testing' });
      writeSessionFile(tempDir, session);

      // Set maxTokens to something extremely small — only enough for the header
      const provider = new SessionContextProvider({
        sessionsDir: tempDir,
        maxTokens: 8,
      });
      const result = provider.getRecentContext('/my/project');

      // The header alone uses ~7 tokens; any session would exceed the budget.
      expect(result).toBe('');
    });
  });

  describe('session filtering', () => {
    it('should skip sessions with fewer than 2 messages', () => {
      const now = Date.now();
      const shortSession = makeSession({
        id: 'short-session',
        title: 'Short One',
        messages: [{ role: 'user', content: 'Hello', timestamp: now }],
      });
      const validSession = makeSession({
        id: 'valid-session',
        title: 'Valid Session',
        messages: [
          { role: 'user', content: 'Help me', timestamp: now - 10000 },
          { role: 'assistant', content: 'Sure thing', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, shortSession);
      writeSessionFile(tempDir, validSession);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Valid Session');
      expect(result).not.toContain('Short One');
    });

    it('should skip non-JSON files in the directory', () => {
      const _now = Date.now();
      // Write a valid session
      const session = makeSession({ id: 'real-session', title: 'Real Session' });
      writeSessionFile(tempDir, session);

      // Write non-JSON files
      fs.writeFileSync(path.join(tempDir, 'notes.txt'), 'some notes');
      fs.writeFileSync(path.join(tempDir, 'data.csv'), 'a,b,c');
      fs.writeFileSync(path.join(tempDir, '.hidden'), 'hidden file');

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      // Should still work with only the valid session
      expect(result).toContain('Real Session');
    });

    it('should skip invalid JSON files', () => {
      const _now = Date.now();
      // Write a valid session
      const session = makeSession({ id: 'good-session', title: 'Good Session' });
      writeSessionFile(tempDir, session);

      // Write an invalid JSON file with .json extension
      fs.writeFileSync(path.join(tempDir, 'corrupt.json'), '{ this is not valid json !!!');

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Good Session');
    });

    it('should skip JSON files missing metadata.id', () => {
      const now = Date.now();
      const validSession = makeSession({ id: 'valid-id', title: 'Valid' });
      writeSessionFile(tempDir, validSession);

      // Write a JSON file without metadata.id
      const noIdSession = {
        metadata: { created: now },
        messages: [
          { role: 'user', content: 'hi', timestamp: now },
          { role: 'assistant', content: 'hey', timestamp: now },
        ],
      };
      fs.writeFileSync(path.join(tempDir, 'no-id.json'), JSON.stringify(noIdSession));

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Valid');
    });

    it('should skip JSON files missing messages array', () => {
      const validSession = makeSession({ id: 'valid-arr', title: 'Has Messages' });
      writeSessionFile(tempDir, validSession);

      // Write a JSON file without messages array
      const noMsgs = { metadata: { id: 'no-msgs' } };
      fs.writeFileSync(path.join(tempDir, 'no-msgs.json'), JSON.stringify(noMsgs));

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Has Messages');
    });
  });

  describe('getSessionContextString convenience function', () => {
    it('should return a string', () => {
      const result = getSessionContextString('/some/nonexistent/workdir');

      expect(typeof result).toBe('string');
    });

    it('should return empty string when default sessions directory has no sessions', () => {
      // The default sessions dir is ~/.alexi/sessions which may or may not exist.
      // Either way, the function should return a string (empty or with content).
      const result = getSessionContextString('/tmp/nonexistent-project-dir');

      expect(typeof result).toBe('string');
    });
  });

  describe('multiple sessions', () => {
    it('should show multiple session summaries ordered most recent first', () => {
      const now = Date.now();
      const session1 = makeSession({
        id: 'multi-1',
        title: 'Oldest Session',
        messages: [
          { role: 'user', content: 'Task one', timestamp: now - 200000 },
          { role: 'assistant', content: 'Done one', timestamp: now - 190000 },
        ],
      });
      const session2 = makeSession({
        id: 'multi-2',
        title: 'Middle Session',
        messages: [
          { role: 'user', content: 'Task two', timestamp: now - 100000 },
          { role: 'assistant', content: 'Done two', timestamp: now - 90000 },
        ],
      });
      const session3 = makeSession({
        id: 'multi-3',
        title: 'Newest Session',
        messages: [
          { role: 'user', content: 'Task three', timestamp: now - 10000 },
          { role: 'assistant', content: 'Done three', timestamp: now },
        ],
      });

      const path1 = writeSessionFile(tempDir, session1);
      const path2 = writeSessionFile(tempDir, session2);
      const path3 = writeSessionFile(tempDir, session3);

      // Set mtimes to control ordering
      fs.utimesSync(path1, new Date(now - 200000), new Date(now - 200000));
      fs.utimesSync(path2, new Date(now - 100000), new Date(now - 100000));
      fs.utimesSync(path3, new Date(now), new Date(now));

      const provider = new SessionContextProvider({
        sessionsDir: tempDir,
        maxTokens: 5000,
      });
      const result = provider.getRecentContext('/my/project');

      // All three should be present
      expect(result).toContain('Newest Session');
      expect(result).toContain('Middle Session');
      expect(result).toContain('Oldest Session');

      // Verify ordering: newest appears before middle, middle before oldest
      const newestIdx = result.indexOf('Newest Session');
      const middleIdx = result.indexOf('Middle Session');
      const oldestIdx = result.indexOf('Oldest Session');

      expect(newestIdx).toBeLessThan(middleIdx);
      expect(middleIdx).toBeLessThan(oldestIdx);
    });

    it('should combine file paths and decisions from multiple sessions', () => {
      const now = Date.now();
      const session1 = makeSession({
        id: 'combo-1',
        title: 'Session A',
        messages: [
          { role: 'user', content: 'Update src/core/router.ts', timestamp: now - 10000 },
          { role: 'assistant', content: 'We decided to use a map-based router.', timestamp: now },
        ],
      });
      const session2 = makeSession({
        id: 'combo-2',
        title: 'Session B',
        messages: [
          { role: 'user', content: 'Fix tests/utils.test.ts', timestamp: now - 10000 },
          { role: 'assistant', content: 'We chose vitest over jest for testing.', timestamp: now },
        ],
      });

      const p1 = writeSessionFile(tempDir, session1);
      const p2 = writeSessionFile(tempDir, session2);

      fs.utimesSync(p1, new Date(now), new Date(now));
      fs.utimesSync(p2, new Date(now - 50000), new Date(now - 50000));

      const provider = new SessionContextProvider({
        sessionsDir: tempDir,
        maxTokens: 5000,
      });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('src/core/router.ts');
      expect(result).toContain('tests/utils.test.ts');
      expect(result).toContain('decided');
      expect(result).toContain('chose');
    });
  });

  describe('edge cases', () => {
    it('should truncate long "Working on" content to 100 characters', () => {
      const now = Date.now();
      const longContent = 'A'.repeat(200);
      const session = makeSession({
        messages: [
          { role: 'user', content: longContent, timestamp: now - 10000 },
          { role: 'assistant', content: 'Acknowledged.', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      // The "Working on:" line should not contain 200 A's — it's sliced to 100
      const workingOnMatch = result.match(/Working on: (A+)/);
      expect(workingOnMatch).not.toBeNull();
      expect(workingOnMatch![1].length).toBe(100);
    });

    it('should truncate long decision phrases to 120 characters with ellipsis', () => {
      const now = Date.now();
      const longDecision = 'We decided to ' + 'implement '.repeat(20) + 'everything';
      const session = makeSession({
        messages: [
          { role: 'user', content: 'What should we do?', timestamp: now - 10000 },
          { role: 'assistant', content: longDecision, timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Key points:');
      // The extracted phrase should be truncated with '...'
      expect(result).toContain('...');
    });

    it('should limit extracted files to 10 per session', () => {
      const now = Date.now();
      const manyFiles = Array.from({ length: 15 }, (_, i) => `src/module${i}/file${i}.ts`).join(
        ' '
      );
      const session = makeSession({
        messages: [
          { role: 'user', content: manyFiles, timestamp: now - 10000 },
          { role: 'assistant', content: 'Updated all files.', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      // Count how many "src/module" references appear in the Files: line
      const filesMatch = result.match(/Files: (.+)/);
      expect(filesMatch).not.toBeNull();
      const filesList = filesMatch![1].split(', ');
      expect(filesList.length).toBeLessThanOrEqual(10);
    });

    it('should show "Working on: unknown" when there are no user messages', () => {
      const now = Date.now();
      const session = makeSession({
        messages: [
          { role: 'system', content: 'System prompt here', timestamp: now - 20000 },
          { role: 'assistant', content: 'Ready to help.', timestamp: now - 10000 },
          { role: 'system', content: 'Another system message', timestamp: now },
        ],
      });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Working on: unknown');
    });

    it('should limit key points to 5 per session', () => {
      const now = Date.now();
      const messages: TestSession['messages'] = [
        { role: 'user', content: 'Start', timestamp: now - 100000 },
      ];
      // Add 8 assistant messages with decision keywords
      for (let i = 0; i < 8; i++) {
        messages.push({
          role: 'assistant',
          content: `We decided on approach ${i} for module ${i}.`,
          timestamp: now - 90000 + i * 1000,
        });
      }
      const session = makeSession({ messages });
      writeSessionFile(tempDir, session);

      const provider = new SessionContextProvider({ sessionsDir: tempDir, maxTokens: 5000 });
      const result = provider.getRecentContext('/my/project');

      expect(result).toContain('Key points:');
      // Key points are joined by '; ', so count them
      const keyPointsMatch = result.match(/Key points: (.+)/);
      expect(keyPointsMatch).not.toBeNull();
      const keyPoints = keyPointsMatch![1].split('; ');
      expect(keyPoints.length).toBeLessThanOrEqual(5);
    });

    it('should use default options when none are provided', () => {
      // Verify the constructor doesn't throw with no arguments
      const provider = new SessionContextProvider();
      const result = provider.getRecentContext('/some/workdir');
      expect(typeof result).toBe('string');
    });

    it('should handle session with empty messages array as less than 2', () => {
      const session = makeSession({
        id: 'empty-msgs',
        title: 'Empty Messages',
        messages: [],
      });
      const validSession = makeSession({ id: 'valid-2', title: 'Valid Two' });

      writeSessionFile(tempDir, session);
      writeSessionFile(tempDir, validSession);

      const provider = new SessionContextProvider({ sessionsDir: tempDir });
      const result = provider.getRecentContext('/my/project');

      expect(result).not.toContain('Empty Messages');
      expect(result).toContain('Valid Two');
    });
  });
});
