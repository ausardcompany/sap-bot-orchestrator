/**
 * Tests for import graph construction, PageRank-style ranking, and
 * cross-file reference counting.
 */

import { describe, it, expect } from 'vitest';
import { extractImports, buildImportGraph, rankFiles, countSymbolReferences } from '../ranking.js';

// ─── extractImports ───────────────────────────────────────────────────────────

describe('extractImports', () => {
  it('extracts a simple ESM import', () => {
    const src = `import { foo } from './foo';`;
    expect(extractImports(src)).toContain('./foo');
  });

  it('extracts a default ESM import', () => {
    const src = `import bar from './bar';`;
    expect(extractImports(src)).toContain('./bar');
  });

  it('extracts a namespace import', () => {
    const src = `import * as utils from './utils';`;
    expect(extractImports(src)).toContain('./utils');
  });

  it('extracts a re-export', () => {
    const src = `export { x } from './x';`;
    expect(extractImports(src)).toContain('./x');
  });

  it('extracts a require() call', () => {
    const src = `const mod = require('./mod');`;
    expect(extractImports(src)).toContain('./mod');
  });

  it('ignores bare package imports', () => {
    const src = `import { useState } from 'react';`;
    expect(extractImports(src)).toHaveLength(0);
  });

  it('ignores absolute-path imports', () => {
    const src = `import x from '/abs/path';`;
    expect(extractImports(src)).toHaveLength(0);
  });

  it('returns empty array for source with no imports', () => {
    const src = 'const x = 42;';
    expect(extractImports(src)).toHaveLength(0);
  });

  it('extracts multiple imports from the same file', () => {
    const src = `
import a from './a';
import b from './b';
const c = require('./c');
`;
    const imports = extractImports(src);
    expect(imports).toContain('./a');
    expect(imports).toContain('./b');
    expect(imports).toContain('./c');
  });

  it('extracts imports with double-quote delimiters', () => {
    const src = `import x from "./x";`;
    expect(extractImports(src)).toContain('./x');
  });
});

// ─── buildImportGraph ─────────────────────────────────────────────────────────

describe('buildImportGraph', () => {
  it('returns an empty graph for empty input', () => {
    const graph = buildImportGraph(new Map());
    expect(graph.size).toBe(0);
  });

  it('builds a graph entry for every file', () => {
    const files = new Map([
      ['/a/foo.ts', ''],
      ['/a/bar.ts', ''],
    ]);
    const graph = buildImportGraph(files);
    expect(graph.has('/a/foo.ts')).toBe(true);
    expect(graph.has('/a/bar.ts')).toBe(true);
  });

  it('resolves a relative import between two files', () => {
    const files = new Map([
      ['/a/foo.ts', `import { bar } from './bar';`],
      ['/a/bar.ts', `export const bar = 1;`],
    ]);
    const graph = buildImportGraph(files);
    expect(graph.get('/a/foo.ts')!.has('/a/bar.ts')).toBe(true);
  });

  it('resolves an import without an extension (.ts fallback)', () => {
    const files = new Map([
      ['/a/importer.ts', `import x from './utils';`],
      ['/a/utils.ts', `export const x = 1;`],
    ]);
    const graph = buildImportGraph(files);
    expect(graph.get('/a/importer.ts')!.has('/a/utils.ts')).toBe(true);
  });

  it('resolves an index file import', () => {
    const files = new Map([
      ['/a/main.ts', `import x from './lib';`],
      ['/a/lib/index.ts', `export const x = 1;`],
    ]);
    const graph = buildImportGraph(files);
    expect(graph.get('/a/main.ts')!.has('/a/lib/index.ts')).toBe(true);
  });

  it('ignores imports to files not in the file set', () => {
    const files = new Map([['/a/main.ts', `import x from './missing';`]]);
    const graph = buildImportGraph(files);
    expect(graph.get('/a/main.ts')!.size).toBe(0);
  });

  it('ignores package (bare) imports', () => {
    const files = new Map([['/a/main.ts', `import React from 'react';`]]);
    const graph = buildImportGraph(files);
    expect(graph.get('/a/main.ts')!.size).toBe(0);
  });

  it('builds multiple edges from one file', () => {
    const files = new Map([
      ['/a/main.ts', `import a from './a';\nimport b from './b';`],
      ['/a/a.ts', ''],
      ['/a/b.ts', ''],
    ]);
    const graph = buildImportGraph(files);
    const edges = graph.get('/a/main.ts')!;
    expect(edges.has('/a/a.ts')).toBe(true);
    expect(edges.has('/a/b.ts')).toBe(true);
  });
});

// ─── rankFiles ────────────────────────────────────────────────────────────────

describe('rankFiles', () => {
  it('returns an empty map for an empty graph', () => {
    expect(rankFiles(new Map()).size).toBe(0);
  });

  it('returns a score for every node', () => {
    const files = new Map([
      ['/a.ts', ''],
      ['/b.ts', ''],
    ]);
    const graph = buildImportGraph(files);
    const ranks = rankFiles(graph);
    expect(ranks.has('/a.ts')).toBe(true);
    expect(ranks.has('/b.ts')).toBe(true);
  });

  it('all scores are in the range [0, 1]', () => {
    const files = new Map([
      ['/a/main.ts', `import x from './lib';`],
      ['/a/lib.ts', ''],
      ['/a/util.ts', `import x from './lib';`],
    ]);
    const graph = buildImportGraph(files);
    const ranks = rankFiles(graph);
    for (const score of ranks.values()) {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
    }
  });

  it('the most-imported file gets a higher rank than a leaf file', () => {
    // /shared.ts is imported by both main and secondary; /leaf.ts is not imported by anyone
    const files = new Map([
      ['/main.ts', `import x from './shared';`],
      ['/secondary.ts', `import x from './shared';`],
      ['/shared.ts', ''],
      ['/leaf.ts', ''],
    ]);
    const graph = buildImportGraph(files);
    const ranks = rankFiles(graph);
    expect(ranks.get('/shared.ts')!).toBeGreaterThan(ranks.get('/leaf.ts')!);
  });

  it('normalises so the maximum score equals 1', () => {
    const files = new Map([
      ['/a.ts', `import x from './b';`],
      ['/b.ts', ''],
    ]);
    const graph = buildImportGraph(files);
    const ranks = rankFiles(graph);
    const max = Math.max(...ranks.values());
    expect(max).toBeCloseTo(1, 5);
  });

  it('handles a single-node graph', () => {
    const graph = new Map([['/solo.ts', new Set<string>()]]);
    const ranks = rankFiles(graph);
    expect(ranks.get('/solo.ts')).toBe(1); // only node, normalises to 1
  });
});

// ─── countSymbolReferences ────────────────────────────────────────────────────

describe('countSymbolReferences', () => {
  it('counts occurrences of a symbol in other files', () => {
    const files = new Map([
      ['/def.ts', 'export function myFunc() {}'],
      ['/user1.ts', 'import { myFunc } from "./def"; myFunc();'],
      ['/user2.ts', 'myFunc();'],
    ]);
    const count = countSymbolReferences('myFunc', '/def.ts', files);
    // user1 has 2 occurrences, user2 has 1
    expect(count).toBe(3);
  });

  it('excludes the defining file from the count', () => {
    const files = new Map([
      ['/def.ts', 'function myFunc() {} myFunc();'], // 2 occurrences in defining file
      ['/user.ts', 'myFunc();'],
    ]);
    const count = countSymbolReferences('myFunc', '/def.ts', files);
    expect(count).toBe(1); // only user.ts counts
  });

  it('returns 0 when symbol is not referenced elsewhere', () => {
    const files = new Map([
      ['/def.ts', 'function lonely() {}'],
      ['/other.ts', 'const x = 1;'],
    ]);
    const count = countSymbolReferences('lonely', '/def.ts', files);
    expect(count).toBe(0);
  });

  it('is case-sensitive', () => {
    const files = new Map([
      ['/def.ts', 'function myFunc() {}'],
      ['/user.ts', 'MyFunc(); MYFUNC();'],
    ]);
    const count = countSymbolReferences('myFunc', '/def.ts', files);
    expect(count).toBe(0);
  });

  it('uses word boundaries (does not match sub-strings)', () => {
    const files = new Map([
      ['/def.ts', 'function foo() {}'],
      ['/user.ts', 'fooBar(); notfoo(); foo();'],
    ]);
    const count = countSymbolReferences('foo', '/def.ts', files);
    expect(count).toBe(1); // only the exact 'foo()' token
  });

  it('returns 0 for an empty file set', () => {
    const count = countSymbolReferences('anything', '/def.ts', new Map());
    expect(count).toBe(0);
  });
});
