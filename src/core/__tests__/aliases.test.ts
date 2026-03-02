/**
 * Tests for Command Alias System
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { AliasManager, DEFAULT_ALIASES, getAliasManager, resetAliasManager } from '../aliases.js';
import { ORCHESTRATION_MODELS } from '../../providers/sapOrchestration.js';

describe('AliasManager', () => {
  let testDir: string;
  let aliasManager: AliasManager;

  beforeEach(() => {
    // Create temp directory for tests
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'alexi-alias-test-'));
    resetAliasManager();
    aliasManager = new AliasManager({ dataDir: testDir });
  });

  afterEach(() => {
    // Clean up test directory
    fs.rmSync(testDir, { recursive: true, force: true });
    resetAliasManager();
  });

  describe('initialization', () => {
    it('should initialize with default aliases', () => {
      const aliases = aliasManager.list();

      expect(aliases.length).toBeGreaterThan(0);

      // Check some default aliases exist
      const aliasNames = aliases.map((a) => a.name);
      expect(aliasNames).toContain('gpt4');
      expect(aliasNames).toContain('claude');
      expect(aliasNames).toContain('new');
    });

    it('should load existing aliases from file', () => {
      // Write custom aliases file
      const customAliases = {
        version: 1,
        aliases: [{ name: 'custom', command: '/custom cmd', created: Date.now() }],
      };
      fs.writeFileSync(path.join(testDir, 'aliases.json'), JSON.stringify(customAliases));

      // Create new manager to load from file
      const newManager = new AliasManager({ dataDir: testDir });
      const alias = newManager.get('custom');

      expect(alias).toBeDefined();
      expect(alias?.command).toBe('/custom cmd');
    });
  });

  describe('set', () => {
    it('should create new alias', () => {
      const alias = aliasManager.set('myalias', '/model gpt-4o', 'My custom alias');

      expect(alias.name).toBe('myalias');
      expect(alias.command).toBe('/model gpt-4o');
      expect(alias.description).toBe('My custom alias');
      expect(alias.created).toBeLessThanOrEqual(Date.now());
    });

    it('should normalize alias name to lowercase', () => {
      const alias = aliasManager.set('MyAlias', '/test');

      expect(alias.name).toBe('myalias');
    });

    it('should add leading slash to command if missing', () => {
      const alias = aliasManager.set('test', 'model gpt-4o');

      expect(alias.command).toBe('/model gpt-4o');
    });

    it('should update existing alias', () => {
      aliasManager.set('test', '/command1');
      const updated = aliasManager.set('test', '/command2');

      expect(updated.command).toBe('/command2');
      expect(aliasManager.list().filter((a) => a.name === 'test').length).toBe(1);
    });

    it('should throw on invalid alias name', () => {
      expect(() => aliasManager.set('invalid name', '/cmd')).toThrow();
      expect(() => aliasManager.set('', '/cmd')).toThrow();
      expect(() => aliasManager.set('a'.repeat(25), '/cmd')).toThrow();
    });

    it('should accept valid alias names', () => {
      expect(() => aliasManager.set('valid', '/cmd')).not.toThrow();
      expect(() => aliasManager.set('valid123', '/cmd')).not.toThrow();
      expect(() => aliasManager.set('valid_name', '/cmd')).not.toThrow();
      expect(() => aliasManager.set('valid-name', '/cmd')).not.toThrow();
    });
  });

  describe('get', () => {
    it('should get alias by name', () => {
      aliasManager.set('test', '/testcmd');

      const alias = aliasManager.get('test');

      expect(alias).toBeDefined();
      expect(alias?.command).toBe('/testcmd');
    });

    it('should be case-insensitive', () => {
      aliasManager.set('test', '/cmd');

      expect(aliasManager.get('TEST')).toBeDefined();
      expect(aliasManager.get('Test')).toBeDefined();
    });

    it('should return undefined for non-existent alias', () => {
      expect(aliasManager.get('nonexistent')).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete existing alias', () => {
      aliasManager.set('todelete', '/cmd');

      const deleted = aliasManager.delete('todelete');

      expect(deleted).toBe(true);
      expect(aliasManager.get('todelete')).toBeUndefined();
    });

    it('should return false for non-existent alias', () => {
      const deleted = aliasManager.delete('nonexistent');

      expect(deleted).toBe(false);
    });
  });

  describe('list', () => {
    it('should return all aliases sorted by name', () => {
      aliasManager.set('zebra', '/z');
      aliasManager.set('apple', '/a');
      aliasManager.set('banana', '/b');

      const aliases = aliasManager.list();
      const customAliases = aliases.filter((a) => ['zebra', 'apple', 'banana'].includes(a.name));

      expect(customAliases[0].name).toBe('apple');
      expect(customAliases[1].name).toBe('banana');
      expect(customAliases[2].name).toBe('zebra');
    });
  });

  describe('resolve', () => {
    it('should resolve alias to command', () => {
      aliasManager.set('g4', '/model gpt-4o');

      const resolved = aliasManager.resolve('/g4');

      expect(resolved).toBe('/model gpt-4o');
    });

    it('should append additional arguments', () => {
      aliasManager.set('m', '/model');

      const resolved = aliasManager.resolve('/m gpt-4o-mini');

      expect(resolved).toBe('/model gpt-4o-mini');
    });

    it('should return original input if not an alias', () => {
      const input = '/nonexistent command';

      const resolved = aliasManager.resolve(input);

      expect(resolved).toBe(input);
    });

    it('should return original input if not a slash command', () => {
      const input = 'regular message';

      const resolved = aliasManager.resolve(input);

      expect(resolved).toBe(input);
    });
  });

  describe('isValidAliasName', () => {
    it('should accept valid names', () => {
      expect(aliasManager.isValidAliasName('valid')).toBe(true);
      expect(aliasManager.isValidAliasName('valid123')).toBe(true);
      expect(aliasManager.isValidAliasName('valid_name')).toBe(true);
      expect(aliasManager.isValidAliasName('valid-name')).toBe(true);
      expect(aliasManager.isValidAliasName('a')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(aliasManager.isValidAliasName('')).toBe(false);
      expect(aliasManager.isValidAliasName('has space')).toBe(false);
      expect(aliasManager.isValidAliasName('has.dot')).toBe(false);
      expect(aliasManager.isValidAliasName('a'.repeat(25))).toBe(false);
    });
  });

  describe('resetToDefaults', () => {
    it('should reset to default aliases', () => {
      // Add custom aliases
      aliasManager.set('custom1', '/cmd1');
      aliasManager.set('custom2', '/cmd2');

      aliasManager.resetToDefaults();

      const aliases = aliasManager.list();
      expect(aliases.find((a) => a.name === 'custom1')).toBeUndefined();
      expect(aliases.find((a) => a.name === 'custom2')).toBeUndefined();
      expect(aliases.find((a) => a.name === 'gpt4')).toBeDefined();
    });
  });

  describe('exportToJson / importFromJson', () => {
    it('should export aliases to JSON', () => {
      aliasManager.set('export-test', '/test');

      const json = aliasManager.exportToJson();
      const parsed = JSON.parse(json);

      expect(parsed.version).toBe(1);
      expect(parsed.aliases.find((a: any) => a.name === 'export-test')).toBeDefined();
    });

    it('should import aliases from JSON', () => {
      const json = JSON.stringify({
        version: 1,
        aliases: [{ name: 'imported', command: '/imported-cmd' }],
      });

      const imported = aliasManager.importFromJson(json);

      expect(imported).toBe(1);
      expect(aliasManager.get('imported')?.command).toBe('/imported-cmd');
    });

    it('should handle invalid JSON gracefully', () => {
      const imported = aliasManager.importFromJson('not valid json');

      expect(imported).toBe(0);
    });
  });

  describe('persistence', () => {
    it('should persist aliases to file', () => {
      aliasManager.set('persisted', '/persist-cmd');

      // Create new manager to load from file
      const newManager = new AliasManager({ dataDir: testDir });
      const alias = newManager.get('persisted');

      expect(alias).toBeDefined();
      expect(alias?.command).toBe('/persist-cmd');
    });
  });

  describe('singleton', () => {
    it('should return same instance', () => {
      resetAliasManager();
      const instance1 = getAliasManager();
      const instance2 = getAliasManager();

      expect(instance1).toBe(instance2);
    });

    it('should reset instance', () => {
      const instance1 = getAliasManager();
      resetAliasManager();
      const instance2 = getAliasManager();

      expect(instance1).not.toBe(instance2);
    });
  });

  describe('DEFAULT_ALIASES model validity', () => {
    it('all model aliases should point to valid ORCHESTRATION_MODELS', () => {
      const modelAliases = DEFAULT_ALIASES.filter((a) => a.command.startsWith('/model '));
      const invalid: string[] = [];

      for (const alias of modelAliases) {
        const modelId = alias.command.slice('/model '.length).trim();
        if (!(ORCHESTRATION_MODELS as readonly string[]).includes(modelId)) {
          invalid.push(`/${alias.name} → ${modelId}`);
        }
      }

      expect(invalid).toEqual([]);
    });

    it('should not contain removed invalid model aliases (opus, haiku, gpt4m)', () => {
      const aliasNames = DEFAULT_ALIASES.map((a) => a.name);
      expect(aliasNames).not.toContain('opus');
      expect(aliasNames).not.toContain('haiku');
      expect(aliasNames).not.toContain('gpt4m');
    });

    it('should contain aliases for all major provider families', () => {
      const commands = DEFAULT_ALIASES.map((a) => a.command);
      // OpenAI
      expect(commands.some((c) => c.includes('gpt-4o'))).toBe(true);
      // Anthropic
      expect(commands.some((c) => c.includes('anthropic--claude'))).toBe(true);
      // Google
      expect(commands.some((c) => c.includes('gemini'))).toBe(true);
      // Meta
      expect(commands.some((c) => c.includes('meta--llama'))).toBe(true);
      // DeepSeek
      expect(commands.some((c) => c.includes('deepseek'))).toBe(true);
    });
  });

  describe('upgrade migration', () => {
    it('should merge new default aliases into an existing aliases file', () => {
      // Simulate an old aliases.json that only has gpt4 and claude
      const oldAliases = {
        version: 1,
        aliases: [
          { name: 'gpt4', command: '/model gpt-4o', description: 'GPT-4o', created: 1 },
          {
            name: 'claude',
            command: '/model anthropic--claude-4.5-sonnet',
            description: 'Claude',
            created: 1,
          },
        ],
      };
      fs.writeFileSync(path.join(testDir, 'aliases.json'), JSON.stringify(oldAliases));

      const mgr = new AliasManager({ dataDir: testDir });

      // New defaults (e.g. /gemini, /deepseek) should have been merged in
      expect(mgr.get('gemini')).toBeDefined();
      expect(mgr.get('deepseek')).toBeDefined();
      // User aliases should be preserved
      expect(mgr.get('gpt4')?.command).toBe('/model gpt-4o');
      expect(mgr.get('claude')?.command).toBe('/model anthropic--claude-4.5-sonnet');
    });

    it('should remove stale aliases that point to invalid model IDs', () => {
      // Simulate old aliases.json with the three now-invalid aliases
      const staleAliases = {
        version: 1,
        aliases: [
          {
            name: 'gpt4m',
            command: '/model gpt-4o-mini',
            description: 'old',
            created: 1,
          },
          {
            name: 'opus',
            command: '/model anthropic--claude-4.5-opus',
            description: 'old',
            created: 1,
          },
          {
            name: 'haiku',
            command: '/model anthropic--claude-4.5-haiku',
            description: 'old',
            created: 1,
          },
          // A user-added alias with same name but a custom command should NOT be removed
          {
            name: 'custom',
            command: '/model gpt-4o',
            description: 'kept',
            created: 1,
          },
        ],
      };
      fs.writeFileSync(path.join(testDir, 'aliases.json'), JSON.stringify(staleAliases));

      const mgr = new AliasManager({ dataDir: testDir });

      expect(mgr.get('gpt4m')).toBeUndefined();
      expect(mgr.get('opus')).toBeUndefined();
      expect(mgr.get('haiku')).toBeUndefined();
      // Unrelated user alias should survive
      expect(mgr.get('custom')?.command).toBe('/model gpt-4o');
    });

    it('should not remove a stale-named alias if it has been customised to a valid command', () => {
      // User renamed /opus to point to a valid model themselves
      const customisedAliases = {
        version: 1,
        aliases: [
          {
            name: 'opus',
            command: '/model anthropic--claude-3.7-sonnet',
            description: 'custom',
            created: 1,
          },
        ],
      };
      fs.writeFileSync(path.join(testDir, 'aliases.json'), JSON.stringify(customisedAliases));

      const mgr = new AliasManager({ dataDir: testDir });

      // The stale check only removes exact stale command matches, so this survives
      expect(mgr.get('opus')?.command).toBe('/model anthropic--claude-3.7-sonnet');
    });

    it('should persist the migrated state back to disk', () => {
      const oldAliases = {
        version: 1,
        aliases: [{ name: 'gpt4', command: '/model gpt-4o', created: 1 }],
      };
      fs.writeFileSync(path.join(testDir, 'aliases.json'), JSON.stringify(oldAliases));

      new AliasManager({ dataDir: testDir });

      // Re-read the file: new defaults should have been saved
      const saved = JSON.parse(fs.readFileSync(path.join(testDir, 'aliases.json'), 'utf-8'));
      const savedNames = saved.aliases.map((a: { name: string }) => a.name);
      expect(savedNames).toContain('gemini');
    });
  });

  describe('/claude and /sonnet alias resolution', () => {
    it('/claude should resolve to claude-4.5-sonnet', () => {
      const resolved = aliasManager.resolve('/claude');
      expect(resolved).toBe('/model anthropic--claude-4.5-sonnet');
    });

    it('/sonnet should resolve to claude-3.7-sonnet', () => {
      const resolved = aliasManager.resolve('/sonnet');
      expect(resolved).toBe('/model anthropic--claude-3.7-sonnet');
    });

    it('/gpt4 should resolve to gpt-4o', () => {
      const resolved = aliasManager.resolve('/gpt4');
      expect(resolved).toBe('/model gpt-4o');
    });

    it('/gemini should resolve to gemini-2.5-flash', () => {
      const resolved = aliasManager.resolve('/gemini');
      expect(resolved).toBe('/model gemini-2.5-flash');
    });

    it('/deepseek should resolve to deepseek-ai--deepseek-r1', () => {
      const resolved = aliasManager.resolve('/deepseek');
      expect(resolved).toBe('/model deepseek-ai--deepseek-r1');
    });
  });
});
