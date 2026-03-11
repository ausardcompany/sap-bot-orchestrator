import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ToolContext } from '../../index.js';
import type { MemoryEntry } from '../../../core/memory.js';

vi.mock('../../../core/memory.js', () => {
  const mockManager = {
    add: vi.fn(),
    search: vi.fn(),
  };
  return {
    getMemoryManager: vi.fn(() => mockManager),
  };
});

import { storeMemoryTool, recallMemoryTool } from '../memory.js';
import { getMemoryManager } from '../../../core/memory.js';

function getMockManager() {
  const manager = vi.mocked(getMemoryManager)();
  return manager as unknown as {
    add: ReturnType<typeof vi.fn>;
    search: ReturnType<typeof vi.fn>;
  };
}

describe('memory tools', () => {
  let mockManager: ReturnType<typeof getMockManager>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockManager = getMockManager();
  });

  // ============ store_memory ============

  describe('store_memory tool', () => {
    const context: ToolContext = { workdir: '/test' };

    describe('tool metadata', () => {
      it('should have correct name', () => {
        expect(storeMemoryTool.name).toBe('store_memory');
      });

      it('should have a description', () => {
        expect(storeMemoryTool.description).toBeTruthy();
        expect(typeof storeMemoryTool.description).toBe('string');
      });

      it('should have parameters schema', () => {
        expect(storeMemoryTool.parameters).toBeDefined();
      });
    });

    describe('successful store with defaults', () => {
      it('should use semantic type and priority 5 when not specified', async () => {
        const fakeEntry: MemoryEntry = {
          id: 'mem-1',
          content: 'Test memory content',
          created: Date.now(),
          updated: Date.now(),
          type: 'semantic',
          priority: 5,
        };
        mockManager.add.mockReturnValue(fakeEntry);

        const result = await storeMemoryTool.executeUnsafe(
          { content: 'Test memory content' },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data).toEqual({
          id: 'mem-1',
          preview: 'Test memory content',
        });
        expect(mockManager.add).toHaveBeenCalledWith('Test memory content', {
          type: 'semantic',
          tags: undefined,
          context: undefined,
          priority: 5,
          source: undefined,
        });
      });
    });

    describe('store with all fields', () => {
      it('should pass all provided fields to manager.add', async () => {
        const fakeEntry: MemoryEntry = {
          id: 'mem-2',
          content: 'Detailed memory',
          created: Date.now(),
          updated: Date.now(),
          type: 'procedural',
          tags: ['deploy', 'ci'],
          priority: 8,
          context: 'project-x',
        };
        mockManager.add.mockReturnValue(fakeEntry);

        const result = await storeMemoryTool.executeUnsafe(
          {
            content: 'Detailed memory',
            type: 'procedural',
            tags: ['deploy', 'ci'],
            context: 'project-x',
            priority: 8,
          },
          { workdir: '/test', sessionId: 'session-456' }
        );

        expect(result.success).toBe(true);
        expect(result.data).toEqual({
          id: 'mem-2',
          preview: 'Detailed memory',
        });
        expect(mockManager.add).toHaveBeenCalledWith('Detailed memory', {
          type: 'procedural',
          tags: ['deploy', 'ci'],
          context: 'project-x',
          priority: 8,
          source: 'session-456',
        });
      });
    });

    describe('store with sessionId', () => {
      it('should pass context.sessionId as source to manager.add', async () => {
        const fakeEntry: MemoryEntry = {
          id: 'mem-3',
          content: 'Session memory',
          created: Date.now(),
          updated: Date.now(),
        };
        mockManager.add.mockReturnValue(fakeEntry);

        await storeMemoryTool.executeUnsafe(
          { content: 'Session memory' },
          { workdir: '/test', sessionId: 'session-123' }
        );

        expect(mockManager.add).toHaveBeenCalledWith(
          'Session memory',
          expect.objectContaining({ source: 'session-123' })
        );
      });
    });

    describe('preview truncation', () => {
      it('should truncate preview to 100 chars with ellipsis for long content', async () => {
        const longContent = 'A'.repeat(150);
        const fakeEntry: MemoryEntry = {
          id: 'mem-4',
          content: longContent,
          created: Date.now(),
          updated: Date.now(),
        };
        mockManager.add.mockReturnValue(fakeEntry);

        const result = await storeMemoryTool.executeUnsafe({ content: longContent }, context);

        expect(result.success).toBe(true);
        expect(result.data!.preview).toBe('A'.repeat(100) + '...');
        expect(result.data!.preview.length).toBe(103);
      });

      it('should not truncate content that is exactly 100 chars', async () => {
        const exactContent = 'B'.repeat(100);
        const fakeEntry: MemoryEntry = {
          id: 'mem-5',
          content: exactContent,
          created: Date.now(),
          updated: Date.now(),
        };
        mockManager.add.mockReturnValue(fakeEntry);

        const result = await storeMemoryTool.executeUnsafe({ content: exactContent }, context);

        expect(result.success).toBe(true);
        expect(result.data!.preview).toBe(exactContent);
      });
    });

    describe('error handling', () => {
      it('should return error result when manager.add throws', async () => {
        mockManager.add.mockImplementation(() => {
          throw new Error('Storage full');
        });

        const result = await storeMemoryTool.executeUnsafe({ content: 'Will fail' }, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Storage full');
      });

      it('should handle non-Error throws', async () => {
        mockManager.add.mockImplementation(() => {
          throw new Error('unexpected string error');
        });

        const result = await storeMemoryTool.executeUnsafe({ content: 'Will fail too' }, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('unexpected string error');
      });
    });
  });

  // ============ recall_memory ============

  describe('recall_memory tool', () => {
    const context: ToolContext = { workdir: '/test' };

    describe('tool metadata', () => {
      it('should have correct name', () => {
        expect(recallMemoryTool.name).toBe('recall_memory');
      });

      it('should have a description', () => {
        expect(recallMemoryTool.description).toBeTruthy();
        expect(typeof recallMemoryTool.description).toBe('string');
      });

      it('should have parameters schema', () => {
        expect(recallMemoryTool.parameters).toBeDefined();
      });
    });

    describe('successful recall with results', () => {
      it('should return formatted data with count, memories, and formatted string', async () => {
        const now = Date.now();
        const entries: MemoryEntry[] = [
          {
            id: 'mem-a',
            content: 'First memory',
            created: now,
            updated: now,
            type: 'semantic',
            tags: ['tag1'],
            priority: 8,
          },
          {
            id: 'mem-b',
            content: 'Second memory',
            created: now + 1000,
            updated: now + 1000,
            type: 'episodic',
            priority: 3,
          },
        ];
        mockManager.search.mockReturnValue(entries);

        const result = await recallMemoryTool.executeUnsafe({}, context);

        expect(result.success).toBe(true);
        expect(result.data!.count).toBe(2);
        expect(result.data!.memories).toHaveLength(2);
        expect(result.data!.memories[0]).toEqual({
          id: 'mem-a',
          content: 'First memory',
          type: 'semantic',
          tags: ['tag1'],
          created: new Date(now).toISOString(),
          priority: 8,
        });
        expect(result.data!.memories[1]).toEqual({
          id: 'mem-b',
          content: 'Second memory',
          type: 'episodic',
          tags: [],
          created: new Date(now + 1000).toISOString(),
          priority: 3,
        });
        expect(result.data!.formatted).toContain('mem-a');
        expect(result.data!.formatted).toContain('First memory');
        expect(result.data!.formatted).toContain('mem-b');
        expect(result.data!.formatted).toContain('Second memory');
      });
    });

    describe('recall with no results', () => {
      it('should return "No memories found." when search returns empty', async () => {
        mockManager.search.mockReturnValue([]);

        const result = await recallMemoryTool.executeUnsafe({ query: 'nonexistent' }, context);

        expect(result.success).toBe(true);
        expect(result.data!.count).toBe(0);
        expect(result.data!.memories).toEqual([]);
        expect(result.data!.formatted).toBe('No memories found.');
      });
    });

    describe('recall with type filter', () => {
      it('should pass type filter to search', async () => {
        mockManager.search.mockReturnValue([]);

        await recallMemoryTool.executeUnsafe({ type: 'procedural' }, context);

        expect(mockManager.search).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'procedural' })
        );
      });
    });

    describe('recall with limit', () => {
      it('should pass custom limit to search', async () => {
        mockManager.search.mockReturnValue([]);

        await recallMemoryTool.executeUnsafe({ limit: 5 }, context);

        expect(mockManager.search).toHaveBeenCalledWith(expect.objectContaining({ limit: 5 }));
      });
    });

    describe('default limit', () => {
      it('should default to limit 10 when not specified', async () => {
        mockManager.search.mockReturnValue([]);

        await recallMemoryTool.executeUnsafe({}, context);

        expect(mockManager.search).toHaveBeenCalledWith(expect.objectContaining({ limit: 10 }));
      });

      it('should pass sortBy priority and sortOrder desc', async () => {
        mockManager.search.mockReturnValue([]);

        await recallMemoryTool.executeUnsafe({}, context);

        expect(mockManager.search).toHaveBeenCalledWith({
          query: undefined,
          type: undefined,
          tags: undefined,
          limit: 10,
          sortBy: 'priority',
          sortOrder: 'desc',
        });
      });
    });

    describe('error handling', () => {
      it('should return error result when manager.search throws', async () => {
        mockManager.search.mockImplementation(() => {
          throw new Error('Database corrupted');
        });

        const result = await recallMemoryTool.executeUnsafe({}, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Database corrupted');
      });

      it('should handle non-Error throws', async () => {
        mockManager.search.mockImplementation(() => {
          throw new Error('search failure');
        });

        const result = await recallMemoryTool.executeUnsafe({}, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('search failure');
      });
    });
  });
});
