import { describe, test, expect } from 'vitest';
import { BashHierarchy } from './bash-hierarchy.js';

describe('BashHierarchy', () => {
  describe('addAll', () => {
    test('generates hierarchy rules for multi-part command', () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, ['npm', 'install', 'lodash'], 'npm install lodash');

      expect(rules.has('npm *')).toBe(true);
      expect(rules.has('npm install *')).toBe(true);
      expect(rules.has('npm install lodash')).toBe(true);
    });

    test('handles single-part command', () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, ['ls'], 'ls');

      expect(rules.has('ls')).toBe(true);
      expect(rules.size).toBe(1);
    });

    test('handles empty command', () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, [], '');

      expect(rules.size).toBe(0);
    });

    test('handles two-part command', () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, ['git', 'status'], 'git status');

      expect(rules.has('git *')).toBe(true);
      expect(rules.has('git status')).toBe(true);
      expect(rules.size).toBe(2);
    });

    test('handles command with many parts', () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(
        rules,
        ['docker', 'run', '-it', 'ubuntu', 'bash'],
        'docker run -it ubuntu bash'
      );

      expect(rules.has('docker *')).toBe(true);
      expect(rules.has('docker run *')).toBe(true);
      expect(rules.has('docker run -it *')).toBe(true);
      expect(rules.has('docker run -it ubuntu *')).toBe(true);
      expect(rules.has('docker run -it ubuntu bash')).toBe(true);
      expect(rules.size).toBe(5);
    });
  });

  describe('matches', () => {
    test('matches exact command', () => {
      const approved = new Set(['npm install lodash']);
      expect(BashHierarchy.matches('npm install lodash', approved)).toBe(true);
    });

    test('matches wildcard prefix', () => {
      const approved = new Set(['npm *']);
      expect(BashHierarchy.matches('npm install', approved)).toBe(true);
      expect(BashHierarchy.matches('npm run build', approved)).toBe(true);
      expect(BashHierarchy.matches('npm test', approved)).toBe(true);
    });

    test('matches intermediate wildcard', () => {
      const approved = new Set(['npm install *']);
      expect(BashHierarchy.matches('npm install lodash', approved)).toBe(true);
      expect(BashHierarchy.matches('npm install react vue', approved)).toBe(true);
    });

    test('does not match unrelated command', () => {
      const approved = new Set(['npm *']);
      expect(BashHierarchy.matches('yarn install', approved)).toBe(false);
      expect(BashHierarchy.matches('git status', approved)).toBe(false);
    });

    test('does not match longer prefix', () => {
      const approved = new Set(['npm install lodash']);
      expect(BashHierarchy.matches('npm install', approved)).toBe(false);
      expect(BashHierarchy.matches('npm', approved)).toBe(false);
    });

    test('matches most specific rule', () => {
      const approved = new Set(['docker *', 'docker run *', 'docker run -it ubuntu bash']);
      expect(BashHierarchy.matches('docker ps', approved)).toBe(true);
      expect(BashHierarchy.matches('docker run hello-world', approved)).toBe(true);
      expect(BashHierarchy.matches('docker run -it ubuntu bash', approved)).toBe(true);
    });

    test('handles empty approved rules', () => {
      const approved = new Set<string>();
      expect(BashHierarchy.matches('npm install', approved)).toBe(false);
    });

    test('handles command with single word', () => {
      const approved = new Set(['ls']);
      expect(BashHierarchy.matches('ls', approved)).toBe(true);
      expect(BashHierarchy.matches('ls -la', approved)).toBe(false);
    });

    test('wildcard matches single word continuation', () => {
      const approved = new Set(['git *']);
      expect(BashHierarchy.matches('git status', approved)).toBe(true);
      expect(BashHierarchy.matches('git', approved)).toBe(false);
    });
  });

  describe('integration', () => {
    test('typical workflow: add rules and check matches', () => {
      const rules = new Set<string>();

      // User approves "npm install lodash"
      BashHierarchy.addAll(rules, ['npm', 'install', 'lodash'], 'npm install lodash');

      // Later, AI tries similar commands
      expect(BashHierarchy.matches('npm install lodash', rules)).toBe(true);
      expect(BashHierarchy.matches('npm install', rules)).toBe(true);
      expect(BashHierarchy.matches('npm run build', rules)).toBe(true);
      expect(BashHierarchy.matches('yarn install', rules)).toBe(false);
    });

    test('multiple approved commands', () => {
      const rules = new Set<string>();

      BashHierarchy.addAll(rules, ['git', 'status'], 'git status');
      BashHierarchy.addAll(rules, ['npm', 'test'], 'npm test');

      expect(BashHierarchy.matches('git status', rules)).toBe(true);
      expect(BashHierarchy.matches('git commit', rules)).toBe(true);
      expect(BashHierarchy.matches('npm test', rules)).toBe(true);
      expect(BashHierarchy.matches('npm install', rules)).toBe(true);
      expect(BashHierarchy.matches('yarn test', rules)).toBe(false);
    });
  });
});
