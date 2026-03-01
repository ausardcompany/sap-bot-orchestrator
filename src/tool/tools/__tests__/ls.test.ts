import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { lsTool } from '../ls.js';
import type { ToolContext } from '../../index.js';

describe('ls Tool', () => {
  let tempDir: string;
  let context: ToolContext;

  beforeEach(() => {
    // Create temp directory for test files
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-test-'));
    context = { workdir: tempDir };
  });

  afterEach(() => {
    // Cleanup temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('basic directory listing', () => {
    it('should list files and directories in the workdir', async () => {
      // Create test structure
      fs.writeFileSync(path.join(tempDir, 'file1.txt'), 'content1');
      fs.writeFileSync(path.join(tempDir, 'file2.ts'), 'content2');
      fs.mkdirSync(path.join(tempDir, 'subdir'));

      const result = await lsTool.executeUnsafe({}, context);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data!.totalFiles).toBe(2);
      expect(result.data!.totalDirs).toBe(1);
      expect(result.data!.entries).toHaveLength(3);

      const names = result.data!.entries.map((e) => e.name);
      expect(names).toContain('file1.txt');
      expect(names).toContain('file2.ts');
      expect(names).toContain('subdir');
    });

    it('should show correct types for files and directories', async () => {
      fs.writeFileSync(path.join(tempDir, 'file.txt'), 'content');
      fs.mkdirSync(path.join(tempDir, 'dir'));

      const result = await lsTool.executeUnsafe({}, context);

      expect(result.success).toBe(true);
      const fileEntry = result.data!.entries.find((e) => e.name === 'file.txt');
      const dirEntry = result.data!.entries.find((e) => e.name === 'dir');

      expect(fileEntry?.type).toBe('file');
      expect(dirEntry?.type).toBe('directory');
    });

    it('should list a specific path', async () => {
      const subDir = path.join(tempDir, 'specific');
      fs.mkdirSync(subDir);
      fs.writeFileSync(path.join(subDir, 'inner.txt'), 'content');

      const result = await lsTool.executeUnsafe({ path: subDir }, context);

      expect(result.success).toBe(true);
      expect(result.data!.entries).toHaveLength(1);
      expect(result.data!.entries[0].name).toBe('inner.txt');
    });

    it('should handle relative paths', async () => {
      const subDir = path.join(tempDir, 'relative');
      fs.mkdirSync(subDir);
      fs.writeFileSync(path.join(subDir, 'file.txt'), 'content');

      const result = await lsTool.executeUnsafe({ path: 'relative' }, context);

      expect(result.success).toBe(true);
      expect(result.data!.entries).toHaveLength(1);
    });

    it('should include file size for files', async () => {
      const content = 'hello world';
      fs.writeFileSync(path.join(tempDir, 'sized.txt'), content);

      const result = await lsTool.executeUnsafe({}, context);

      expect(result.success).toBe(true);
      const fileEntry = result.data!.entries.find((e) => e.name === 'sized.txt');
      expect(fileEntry?.size).toBe(content.length);
    });
  });

  describe('recursive listing', () => {
    it('should list recursively when recursive=true', async () => {
      // Create nested structure
      fs.mkdirSync(path.join(tempDir, 'level1'));
      fs.mkdirSync(path.join(tempDir, 'level1', 'level2'));
      fs.writeFileSync(path.join(tempDir, 'root.txt'), 'root');
      fs.writeFileSync(path.join(tempDir, 'level1', 'l1.txt'), 'l1');
      fs.writeFileSync(path.join(tempDir, 'level1', 'level2', 'l2.txt'), 'l2');

      const result = await lsTool.executeUnsafe({ recursive: true }, context);

      expect(result.success).toBe(true);
      expect(result.data!.totalFiles).toBe(3);
      expect(result.data!.totalDirs).toBe(2);

      const names = result.data!.entries.map((e) => e.name);
      expect(names).toContain('root.txt');
      expect(names).toContain('l1.txt');
      expect(names).toContain('l2.txt');
    });

    it('should respect max depth', async () => {
      // Create deep structure
      fs.mkdirSync(path.join(tempDir, 'a', 'b', 'c', 'd'), { recursive: true });
      fs.writeFileSync(path.join(tempDir, 'a', 'a.txt'), 'a');
      fs.writeFileSync(path.join(tempDir, 'a', 'b', 'b.txt'), 'b');
      fs.writeFileSync(path.join(tempDir, 'a', 'b', 'c', 'c.txt'), 'c');
      fs.writeFileSync(path.join(tempDir, 'a', 'b', 'c', 'd', 'd.txt'), 'd');

      // With depth 2, should go into directories up to depth 2
      // At depth 0: list a/ and enter it (currentDepth=0 < maxDepth=2)
      // At depth 1: list b/ and enter it (currentDepth=1 < maxDepth=2)
      // At depth 2: list c/ but don't enter it (currentDepth=2 < maxDepth=2 is false)
      const result = await lsTool.executeUnsafe({ recursive: true, depth: 2 }, context);

      expect(result.success).toBe(true);
      const names = result.data!.entries.map((e) => e.name);
      expect(names).toContain('a.txt'); // in a/ at depth 1
      expect(names).toContain('b.txt'); // in a/b/ at depth 2
      expect(names).toContain('c'); // directory c/ is listed at depth 2
      expect(names).not.toContain('c.txt'); // c.txt is inside c/, which we don't enter
      expect(names).not.toContain('d.txt');
    });

    it('should not recurse when recursive=false', async () => {
      fs.mkdirSync(path.join(tempDir, 'subdir'));
      fs.writeFileSync(path.join(tempDir, 'root.txt'), 'root');
      fs.writeFileSync(path.join(tempDir, 'subdir', 'nested.txt'), 'nested');

      const result = await lsTool.executeUnsafe({ recursive: false }, context);

      expect(result.success).toBe(true);
      expect(result.data!.totalFiles).toBe(1);
      expect(result.data!.totalDirs).toBe(1);
    });
  });

  describe('ignore patterns', () => {
    it('should auto-ignore node_modules', async () => {
      fs.mkdirSync(path.join(tempDir, 'node_modules'));
      fs.writeFileSync(path.join(tempDir, 'node_modules', 'pkg.js'), 'pkg');
      fs.writeFileSync(path.join(tempDir, 'app.ts'), 'app');

      const result = await lsTool.executeUnsafe({ recursive: true }, context);

      expect(result.success).toBe(true);
      const names = result.data!.entries.map((e) => e.name);
      expect(names).not.toContain('node_modules');
      expect(names).not.toContain('pkg.js');
      expect(names).toContain('app.ts');
    });

    it('should auto-ignore .git', async () => {
      fs.mkdirSync(path.join(tempDir, '.git'));
      fs.writeFileSync(path.join(tempDir, '.git', 'config'), 'config');
      fs.writeFileSync(path.join(tempDir, 'src.ts'), 'src');

      const result = await lsTool.executeUnsafe({ recursive: true }, context);

      expect(result.success).toBe(true);
      const names = result.data!.entries.map((e) => e.name);
      expect(names).not.toContain('.git');
      expect(names).toContain('src.ts');
    });

    it('should auto-ignore dist, coverage, .next, __pycache__', async () => {
      fs.mkdirSync(path.join(tempDir, 'dist'));
      fs.mkdirSync(path.join(tempDir, 'coverage'));
      fs.mkdirSync(path.join(tempDir, '.next'));
      fs.mkdirSync(path.join(tempDir, '__pycache__'));
      fs.writeFileSync(path.join(tempDir, 'main.ts'), 'main');

      const result = await lsTool.executeUnsafe({}, context);

      expect(result.success).toBe(true);
      const names = result.data!.entries.map((e) => e.name);
      expect(names).not.toContain('dist');
      expect(names).not.toContain('coverage');
      expect(names).not.toContain('.next');
      expect(names).not.toContain('__pycache__');
      expect(names).toContain('main.ts');
    });

    it('should support custom ignore patterns', async () => {
      fs.writeFileSync(path.join(tempDir, 'file.txt'), 'txt');
      fs.writeFileSync(path.join(tempDir, 'file.log'), 'log');
      fs.writeFileSync(path.join(tempDir, 'temp.tmp'), 'tmp');

      const result = await lsTool.executeUnsafe({ ignore: ['*.log', '*.tmp'] }, context);

      expect(result.success).toBe(true);
      const names = result.data!.entries.map((e) => e.name);
      expect(names).toContain('file.txt');
      expect(names).not.toContain('file.log');
      expect(names).not.toContain('temp.tmp');
    });

    it('should support exact name ignore patterns', async () => {
      fs.writeFileSync(path.join(tempDir, 'keep.txt'), 'keep');
      fs.writeFileSync(path.join(tempDir, 'ignore-me.txt'), 'ignore');

      const result = await lsTool.executeUnsafe({ ignore: ['ignore-me.txt'] }, context);

      expect(result.success).toBe(true);
      const names = result.data!.entries.map((e) => e.name);
      expect(names).toContain('keep.txt');
      expect(names).not.toContain('ignore-me.txt');
    });
  });

  describe('error handling', () => {
    it('should return error for non-existent path', async () => {
      const result = await lsTool.executeUnsafe({ path: '/non/existent/path' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });

    it('should return error when path is a file, not directory', async () => {
      const filePath = path.join(tempDir, 'file.txt');
      fs.writeFileSync(filePath, 'content');

      const result = await lsTool.executeUnsafe({ path: filePath }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Not a directory');
    });
  });

  describe('output format', () => {
    it('should return full path for each entry', async () => {
      fs.writeFileSync(path.join(tempDir, 'test.txt'), 'test');

      const result = await lsTool.executeUnsafe({}, context);

      expect(result.success).toBe(true);
      const entry = result.data!.entries.find((e) => e.name === 'test.txt');
      expect(entry?.path).toBe(path.join(tempDir, 'test.txt'));
    });
  });
});
