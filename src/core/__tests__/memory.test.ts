import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { MemoryManager, getMemoryManager, resetMemoryManager } from '../memory.js';

// Mock fs module for testing
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    existsSync: vi.fn().mockReturnValue(false),
    mkdirSync: vi.fn(),
    readFileSync: vi.fn().mockReturnValue('{"memories": []}'),
    writeFileSync: vi.fn(),
  };
});

// Mock nanoid
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'test-id-' + Math.random().toString(36).substr(2, 9)),
}));

describe('MemoryManager', () => {
  let testDir: string;

  beforeEach(() => {
    vi.clearAllMocks();
    resetMemoryManager();
    testDir = path.join(os.tmpdir(), 'alexi-test-' + Date.now());
  });

  afterEach(() => {
    resetMemoryManager();
  });

  describe('add', () => {
    it('should add a new memory', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('Remember to use TypeScript strict mode');

      expect(entry).toBeDefined();
      expect(entry.id).toBeTruthy();
      expect(entry.content).toBe('Remember to use TypeScript strict mode');
      expect(entry.created).toBeLessThanOrEqual(Date.now());
      expect(entry.updated).toBeLessThanOrEqual(Date.now());
    });

    it('should add memory with tags', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('Always run tests before committing', {
        tags: ['workflow', 'testing'],
      });

      expect(entry.tags).toEqual(['workflow', 'testing']);
    });

    it('should add memory with source and priority', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('User prefers dark mode', {
        source: 'session-123',
        priority: 5,
      });

      expect(entry.source).toBe('session-123');
      expect(entry.priority).toBe(5);
    });

    it('should trim content', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('  content with spaces  ');

      expect(entry.content).toBe('content with spaces');
    });
  });

  describe('update', () => {
    it('should update existing memory', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const original = manager.add('Original content');
      const updated = manager.update(original.id, 'Updated content');

      expect(updated).toBeDefined();
      expect(updated!.content).toBe('Updated content');
      expect(updated!.updated).toBeGreaterThanOrEqual(original.updated);
    });

    it('should return null for non-existent memory', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const result = manager.update('non-existent-id', 'New content');

      expect(result).toBeNull();
    });

    it('should preserve tags if not provided', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const original = manager.add('Content', { tags: ['tag1', 'tag2'] });
      const updated = manager.update(original.id, 'New content');

      expect(updated!.tags).toEqual(['tag1', 'tag2']);
    });

    it('should update tags if provided', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const original = manager.add('Content', { tags: ['tag1'] });
      const updated = manager.update(original.id, 'New content', { tags: ['tag2', 'tag3'] });

      expect(updated!.tags).toEqual(['tag2', 'tag3']);
    });
  });

  describe('delete', () => {
    it('should delete existing memory', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('To be deleted');
      const result = manager.delete(entry.id);

      expect(result).toBe(true);
      expect(manager.get(entry.id)).toBeUndefined();
    });

    it('should return false for non-existent memory', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const result = manager.delete('non-existent-id');

      expect(result).toBe(false);
    });
  });

  describe('get', () => {
    it('should get memory by ID', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('Test content');
      const retrieved = manager.get(entry.id);

      expect(retrieved).toEqual(entry);
    });

    it('should return undefined for non-existent ID', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const retrieved = manager.get('non-existent-id');

      expect(retrieved).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('should return empty array when no memories', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const all = manager.getAll();

      expect(all).toEqual([]);
    });

    it('should return all memories', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Memory 1');
      manager.add('Memory 2');
      manager.add('Memory 3');

      const all = manager.getAll();

      expect(all).toHaveLength(3);
    });
  });

  describe('search', () => {
    it('should search by query string', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('I love TypeScript');
      manager.add('Python is great too');
      manager.add('TypeScript is my favorite');

      const results = manager.search({ query: 'TypeScript' });

      expect(results).toHaveLength(2);
      expect(results.every((r) => r.content.includes('TypeScript'))).toBe(true);
    });

    it('should search case-insensitively', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('UPPERCASE content');
      manager.add('lowercase content');

      const results = manager.search({ query: 'CONTENT' });

      expect(results).toHaveLength(2);
    });

    it('should filter by tags', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Memory 1', { tags: ['work'] });
      manager.add('Memory 2', { tags: ['personal'] });
      manager.add('Memory 3', { tags: ['work', 'urgent'] });

      const results = manager.search({ tags: ['work'] });

      expect(results).toHaveLength(2);
    });

    it('should limit results', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      for (let i = 0; i < 10; i++) {
        manager.add(`Memory ${i}`);
      }

      const results = manager.search({ limit: 5 });

      expect(results).toHaveLength(5);
    });

    it('should sort by created date', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      // Add memories with explicit priorities to differentiate them
      // since they might be created in the same millisecond
      const first = manager.add('First', { priority: 1 });
      const second = manager.add('Second', { priority: 2 });
      const third = manager.add('Third', { priority: 3 });

      // Manually set different created timestamps for testing
      (first as any).created = 1000;
      (second as any).created = 2000;
      (third as any).created = 3000;

      const resultsDesc = manager.search({ sortBy: 'created', sortOrder: 'desc' });
      expect(resultsDesc[0].content).toBe('Third');

      const resultsAsc = manager.search({ sortBy: 'created', sortOrder: 'asc' });
      expect(resultsAsc[0].content).toBe('First');
    });

    it('should sort by priority', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Low priority', { priority: 1 });
      manager.add('High priority', { priority: 10 });
      manager.add('Medium priority', { priority: 5 });

      const results = manager.search({ sortBy: 'priority', sortOrder: 'desc' });

      expect(results[0].content).toBe('High priority');
      expect(results[2].content).toBe('Low priority');
    });

    it('should search in tags', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Memory with tag', { tags: ['important'] });
      manager.add('Memory without relevant tag', { tags: ['other'] });

      const results = manager.search({ query: 'important' });

      expect(results).toHaveLength(1);
    });
  });

  describe('getContextString', () => {
    it('should return empty string when no memories', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const context = manager.getContextString();

      expect(context).toBe('');
    });

    it('should format memories for context injection', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('User prefers TypeScript');
      manager.add('Project uses 2-space indentation');

      const context = manager.getContextString();

      expect(context).toContain('## General');
      expect(context).toContain('- User prefers TypeScript');
      expect(context).toContain('- Project uses 2-space indentation');
    });

    it('should respect limit parameter', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      for (let i = 0; i < 10; i++) {
        manager.add(`Memory ${i}`);
      }

      const context = manager.getContextString(3);

      // Count the number of memory lines
      const memoryLines = context.split('\n').filter((line) => line.startsWith('- '));
      expect(memoryLines).toHaveLength(3);
    });
  });

  describe('getStats', () => {
    it('should return empty stats when no memories', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const stats = manager.getStats();

      expect(stats.count).toBe(0);
      expect(stats.totalSize).toBe(0);
      expect(stats.tags).toEqual([]);
      expect(stats.oldest).toBeUndefined();
      expect(stats.newest).toBeUndefined();
    });

    it('should return correct statistics', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Short', { tags: ['tag1'] });
      manager.add('Longer content', { tags: ['tag2'] });
      manager.add('Medium', { tags: ['tag1', 'tag3'] });

      const stats = manager.getStats();

      expect(stats.count).toBe(3);
      expect(stats.totalSize).toBe('Short'.length + 'Longer content'.length + 'Medium'.length);
      expect(stats.tags).toContain('tag1');
      expect(stats.tags).toContain('tag2');
      expect(stats.tags).toContain('tag3');
      expect(stats.tags).toHaveLength(3);
      expect(stats.oldest).toBeDefined();
      expect(stats.newest).toBeDefined();
    });
  });

  describe('clearAll', () => {
    it('should clear all memories and return count', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Memory 1');
      manager.add('Memory 2');
      manager.add('Memory 3');

      const count = manager.clearAll();

      expect(count).toBe(3);
      expect(manager.getAll()).toHaveLength(0);
    });

    it('should return 0 when already empty', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const count = manager.clearAll();

      expect(count).toBe(0);
    });
  });

  describe('exportToJson', () => {
    it('should export memories as JSON', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      manager.add('Memory 1', { tags: ['tag1'] });
      manager.add('Memory 2');

      const json = manager.exportToJson();
      const parsed = JSON.parse(json);

      expect(parsed.version).toBe(2);
      expect(parsed.memories).toHaveLength(2);
      expect(parsed.memories[0].content).toBeDefined();
    });

    it('should export empty array when no memories', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const json = manager.exportToJson();
      const parsed = JSON.parse(json);

      expect(parsed.memories).toEqual([]);
    });
  });

  describe('getMemoryManager singleton', () => {
    it('should return the same instance', () => {
      const instance1 = getMemoryManager();
      const instance2 = getMemoryManager();

      expect(instance1).toBe(instance2);
    });

    it('should create new instance after reset', () => {
      const instance1 = getMemoryManager();
      resetMemoryManager();
      const instance2 = getMemoryManager();

      expect(instance1).not.toBe(instance2);
    });
  });

  describe('maxMemories limit', () => {
    it('should enforce max memories limit', () => {
      const manager = new MemoryManager({ dataDir: testDir, maxMemories: 5 });

      // Add more than the limit
      for (let i = 0; i < 10; i++) {
        manager.add(`Memory ${i}`);
      }

      // Should have pruned some memories
      expect(manager.getAll().length).toBeLessThanOrEqual(5);
    });
  });

  describe('recall', () => {
    it('should increment accessCount from 0 to 1 on first recall', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Recall test');
      expect(entry.accessCount).toBe(0);

      const recalled = manager.recall(entry.id);

      expect(recalled).not.toBeNull();
      expect(recalled!.accessCount).toBe(1);
    });

    it('should increment accessCount on each subsequent recall', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Recall multiple');

      manager.recall(entry.id);
      manager.recall(entry.id);
      const recalled = manager.recall(entry.id);

      expect(recalled!.accessCount).toBe(3);
    });

    it('should set accessedAt timestamp', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Recall timestamp');
      expect(entry.accessedAt).toBeUndefined();

      const before = Date.now();
      const recalled = manager.recall(entry.id);
      const after = Date.now();

      expect(recalled!.accessedAt).toBeDefined();
      expect(recalled!.accessedAt).toBeGreaterThanOrEqual(before);
      expect(recalled!.accessedAt).toBeLessThanOrEqual(after);
    });

    it('should return null for non-existent ID', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const result = manager.recall('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('markOutdated', () => {
    it('should set status to outdated', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Will be outdated');

      const result = manager.markOutdated(entry.id);

      expect(result).not.toBeNull();
      expect(result!.status).toBe('outdated');
    });

    it('should update the updated timestamp', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Will be outdated');
      const originalUpdated = entry.updated;

      // Small delay so timestamp differs
      const before = Date.now();
      const result = manager.markOutdated(entry.id);

      expect(result!.updated).toBeGreaterThanOrEqual(before);
      expect(result!.updated).toBeGreaterThanOrEqual(originalUpdated);
    });

    it('should return null for non-existent ID', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const result = manager.markOutdated('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('promoteToCanonical', () => {
    it('should set status to canonical', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Will be canonical');

      const result = manager.promoteToCanonical(entry.id);

      expect(result).not.toBeNull();
      expect(result!.status).toBe('canonical');
    });

    it('should update the updated timestamp', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Will be canonical');
      const originalUpdated = entry.updated;

      const before = Date.now();
      const result = manager.promoteToCanonical(entry.id);

      expect(result!.updated).toBeGreaterThanOrEqual(before);
      expect(result!.updated).toBeGreaterThanOrEqual(originalUpdated);
    });

    it('should return null for non-existent ID', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const result = manager.promoteToCanonical('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('search with type and status filters', () => {
    it('should filter by type option', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Semantic fact', { type: 'semantic' });
      manager.add('Procedure step', { type: 'procedural' });
      manager.add('Another fact', { type: 'semantic' });

      const results = manager.search({ type: 'semantic' });

      expect(results).toHaveLength(2);
      expect(results.every((r) => r.type === 'semantic')).toBe(true);
    });

    it('should filter by status option', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Active memory');
      const entry2 = manager.add('Will be outdated');
      manager.add('Another active');
      manager.markOutdated(entry2.id);

      const results = manager.search({ status: 'active' });

      expect(results).toHaveLength(2);
      expect(results.every((r) => r.status === 'active')).toBe(true);
    });

    it('should combine type and status filters', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Active semantic', { type: 'semantic' });
      const entry2 = manager.add('Outdated semantic', { type: 'semantic' });
      manager.add('Active procedural', { type: 'procedural' });
      manager.markOutdated(entry2.id);

      const results = manager.search({ type: 'semantic', status: 'active' });

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('Active semantic');
    });

    it('should combine query with type filter', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('TypeScript is typed', { type: 'semantic' });
      manager.add('TypeScript procedure', { type: 'procedural' });
      manager.add('Python is dynamic', { type: 'semantic' });

      const results = manager.search({ query: 'TypeScript', type: 'semantic' });

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('TypeScript is typed');
    });
  });

  describe('getContextString — type-based grouping', () => {
    it('should group semantic memories under Decisions & Facts header', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Semantic fact one', { type: 'semantic' });

      const context = manager.getContextString();

      expect(context).toContain('## Decisions & Facts');
      expect(context).toContain('- Semantic fact one');
    });

    it('should group procedural memories under Procedures header', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('How to deploy', { type: 'procedural' });

      const context = manager.getContextString();

      expect(context).toContain('## Procedures');
      expect(context).toContain('- How to deploy');
    });

    it('should group episodic memories under Recent Events header', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Deployment happened yesterday', { type: 'episodic' });

      const context = manager.getContextString();

      expect(context).toContain('## Recent Events');
      expect(context).toContain('- Deployment happened yesterday');
    });

    it('should group working memories under Current Context header', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Currently refactoring auth', { type: 'working' });

      const context = manager.getContextString();

      expect(context).toContain('## Current Context');
      expect(context).toContain('- Currently refactoring auth');
    });

    it('should put untyped memories under General header', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Some general note');

      const context = manager.getContextString();

      expect(context).toContain('## General');
      expect(context).toContain('- Some general note');
    });

    it('should render groups in order: semantic → procedural → episodic → working → general', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      // Add in reverse order to verify ordering is by type, not insertion
      manager.add('General note');
      manager.add('Working item', { type: 'working' });
      manager.add('Episodic event', { type: 'episodic' });
      manager.add('Procedure step', { type: 'procedural' });
      manager.add('Semantic fact', { type: 'semantic' });

      const context = manager.getContextString();

      const semanticIdx = context.indexOf('## Decisions & Facts');
      const proceduralIdx = context.indexOf('## Procedures');
      const episodicIdx = context.indexOf('## Recent Events');
      const workingIdx = context.indexOf('## Current Context');
      const generalIdx = context.indexOf('## General');

      expect(semanticIdx).toBeGreaterThanOrEqual(0);
      expect(proceduralIdx).toBeGreaterThan(semanticIdx);
      expect(episodicIdx).toBeGreaterThan(proceduralIdx);
      expect(workingIdx).toBeGreaterThan(episodicIdx);
      expect(generalIdx).toBeGreaterThan(workingIdx);
    });

    it('should exclude outdated memories from context', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const entry = manager.add('Outdated info', { type: 'semantic' });
      manager.add('Fresh info', { type: 'semantic' });
      manager.markOutdated(entry.id);

      const context = manager.getContextString();

      expect(context).not.toContain('Outdated info');
      expect(context).toContain('Fresh info');
    });

    it('should exclude superseded memories from context', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Current info', { type: 'semantic' });
      // Manually set a memory as superseded via direct manipulation
      const superseded = manager.add('Old info', { type: 'semantic' });
      // Use update workaround: access internal state through the returned entry
      const retrieved = manager.get(superseded.id);
      if (retrieved) {
        retrieved.status = 'superseded';
      }

      const context = manager.getContextString();

      expect(context).not.toContain('Old info');
      expect(context).toContain('Current info');
    });

    it('should boost canonical memories to top within their group', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      // Add non-canonical first with same priority
      manager.add('Regular fact', { type: 'semantic', priority: 5 });
      const canonical = manager.add('Canonical fact', { type: 'semantic', priority: 5 });
      manager.promoteToCanonical(canonical.id);

      const context = manager.getContextString();
      const lines = context.split('\n').filter((line) => line.startsWith('- '));

      // Canonical should appear before regular within the same group
      const canonicalIdx = lines.findIndex((l) => l.includes('Canonical fact'));
      const regularIdx = lines.findIndex((l) => l.includes('Regular fact'));
      expect(canonicalIdx).toBeLessThan(regularIdx);
    });
  });

  describe('getStats — byType and byStatus', () => {
    it('should count memories by type', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Semantic 1', { type: 'semantic' });
      manager.add('Semantic 2', { type: 'semantic' });
      manager.add('Procedural 1', { type: 'procedural' });
      manager.add('Episodic 1', { type: 'episodic' });
      manager.add('Working 1', { type: 'working' });
      manager.add('Untyped 1');

      const stats = manager.getStats();

      expect(stats.byType['semantic']).toBe(2);
      expect(stats.byType['procedural']).toBe(1);
      expect(stats.byType['episodic']).toBe(1);
      expect(stats.byType['working']).toBe(1);
      expect(stats.byType['untyped']).toBe(1);
    });

    it('should count memories by status', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Active 1');
      manager.add('Active 2');
      const outdated = manager.add('Will be outdated');
      const canonical = manager.add('Will be canonical');
      manager.markOutdated(outdated.id);
      manager.promoteToCanonical(canonical.id);

      const stats = manager.getStats();

      expect(stats.byStatus['active']).toBe(2);
      expect(stats.byStatus['outdated']).toBe(1);
      expect(stats.byStatus['canonical']).toBe(1);
    });
  });

  describe('add with new typed fields', () => {
    it('should set default status to active when not specified', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('Default status test');

      expect(entry.status).toBe('active');
    });

    it('should set default accessCount to 0', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('Default accessCount test');

      expect(entry.accessCount).toBe(0);
    });

    it('should accept and store type, status, and context fields', () => {
      const manager = new MemoryManager({ dataDir: testDir });

      const entry = manager.add('Typed memory', {
        type: 'semantic',
        status: 'canonical',
        context: 'project-alpha',
      });

      expect(entry.type).toBe('semantic');
      expect(entry.status).toBe('canonical');
      expect(entry.context).toBe('project-alpha');
    });
  });

  describe('list', () => {
    it('should return same result as getAll', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      manager.add('Memory A');
      manager.add('Memory B');
      manager.add('Memory C');

      const listResult = manager.list();
      const getAllResult = manager.getAll();

      expect(listResult).toEqual(getAllResult);
    });
  });

  describe('importMemory', () => {
    it('should import a memory with preserved ID', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const now = Date.now();
      const entry = {
        id: 'preserved-id-123',
        content: 'Imported memory content',
        created: now,
        updated: now,
        tags: ['imported'],
        priority: 3,
        status: 'active' as const,
        accessCount: 0,
      };

      manager.importMemory(entry);

      expect(manager.getAll()).toHaveLength(1);
      expect(manager.getAll()[0].id).toBe('preserved-id-123');
    });

    it('should be retrievable by the preserved ID after import', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const now = Date.now();
      const entry = {
        id: 'custom-id-456',
        content: 'Retrievable import',
        created: now,
        updated: now,
        priority: 0,
        status: 'active' as const,
        accessCount: 0,
      };

      manager.importMemory(entry);
      const retrieved = manager.get('custom-id-456');

      expect(retrieved).toBeDefined();
      expect(retrieved!.content).toBe('Retrievable import');
      expect(retrieved!.id).toBe('custom-id-456');
    });
  });

  describe('importFromFile', () => {
    it('should import memories from a JSON file', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      const fileData = JSON.stringify({
        memories: [
          { content: 'Imported one', tags: ['tag1'], type: 'semantic' },
          { content: 'Imported two', tags: ['tag2'] },
        ],
      });
      vi.mocked(fs.readFileSync).mockReturnValueOnce(fileData);

      const count = manager.importFromFile('/fake/path/memories.json');

      expect(count).toBe(2);
      expect(manager.getAll()).toHaveLength(2);
    });

    it('should return 0 for invalid file paths', () => {
      const manager = new MemoryManager({ dataDir: testDir });
      vi.mocked(fs.readFileSync).mockImplementationOnce(() => {
        throw new Error('ENOENT: no such file or directory');
      });

      const count = manager.importFromFile('/nonexistent/path.json');

      expect(count).toBe(0);
    });
  });

  describe('v1 to v2 backward compatibility in loadMemories', () => {
    it('should set accessCount to 0 and status to active for v1 format entries', () => {
      const v1Data = JSON.stringify({
        memories: [
          {
            id: 'v1-entry-1',
            content: 'Old v1 memory',
            created: 1700000000000,
            updated: 1700000000000,
            tags: ['legacy'],
            priority: 1,
          },
          {
            id: 'v1-entry-2',
            content: 'Another v1 memory',
            created: 1700000001000,
            updated: 1700000001000,
          },
        ],
      });

      // Mock existsSync to return true so loadMemories reads the file
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(v1Data);

      const manager = new MemoryManager({ dataDir: testDir });

      const entry1 = manager.get('v1-entry-1');
      const entry2 = manager.get('v1-entry-2');

      expect(entry1).toBeDefined();
      expect(entry1!.accessCount).toBe(0);
      expect(entry1!.status).toBe('active');

      expect(entry2).toBeDefined();
      expect(entry2!.accessCount).toBe(0);
      expect(entry2!.status).toBe('active');
    });
  });
});
