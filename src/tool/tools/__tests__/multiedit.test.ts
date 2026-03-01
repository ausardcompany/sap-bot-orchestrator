import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { multieditTool } from '../multiedit.js';

describe('multiedit tool', () => {
  let tempDir: string;
  let testFilePath: string;

  beforeEach(async () => {
    // Create a temp directory for tests
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'multiedit-test-'));
    testFilePath = path.join(tempDir, 'test.txt');
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  const context = {
    workdir: '/tmp',
  };

  describe('single edit', () => {
    it('should apply a single edit successfully', async () => {
      await fs.writeFile(testFilePath, 'Hello World');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: 'World', newString: 'Universe' }],
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.editsApplied).toBe(1);
      expect(result.data?.changes).toHaveLength(1);
      expect(result.data?.changes[0].oldString).toBe('World');
      expect(result.data?.changes[0].newString).toBe('Universe');

      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('Hello Universe');
    });

    it('should track the correct line number', async () => {
      await fs.writeFile(testFilePath, 'Line 1\nLine 2\nLine 3');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: 'Line 2', newString: 'Modified Line 2' }],
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.changes[0].lineNumber).toBe(2);
    });
  });

  describe('multiple edits in sequence', () => {
    it('should apply multiple edits in order', async () => {
      await fs.writeFile(testFilePath, 'function foo() {\n  const a = 1;\n  const b = 2;\n}');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [
            { oldString: 'const a = 1;', newString: 'const a = 10;' },
            { oldString: 'const b = 2;', newString: 'const b = 20;' },
          ],
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.editsApplied).toBe(2);

      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('function foo() {\n  const a = 10;\n  const b = 20;\n}');
    });

    it('should fail if later edit depends on earlier edit result (atomic validation)', async () => {
      // This tests atomic validation - all oldStrings must exist in the ORIGINAL content
      await fs.writeFile(testFilePath, 'AAA BBB CCC');
      const originalContent = 'AAA BBB CCC';

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [
            { oldString: 'BBB', newString: 'DDD' },
            { oldString: 'DDD', newString: 'EEE' }, // DDD doesn't exist in original
          ],
        },
        context
      );

      // Should fail because DDD doesn't exist in original content
      expect(result.success).toBe(false);
      expect(result.error).toContain('Edit 2');
      expect(result.error).toContain('String not found');

      // File should remain unchanged
      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe(originalContent);
    });

    it('should apply multiple independent edits in sequence', async () => {
      await fs.writeFile(testFilePath, 'AAA BBB CCC');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [
            { oldString: 'AAA', newString: 'XXX' },
            { oldString: 'CCC', newString: 'ZZZ' },
          ],
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.editsApplied).toBe(2);

      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('XXX BBB ZZZ');
    });
  });

  describe('atomic failure', () => {
    it('should fail all edits if one oldString is not found', async () => {
      await fs.writeFile(testFilePath, 'Hello World');
      const originalContent = 'Hello World';

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [
            { oldString: 'Hello', newString: 'Hi' },
            { oldString: 'NotFound', newString: 'Something' },
          ],
        },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Edit 2');
      expect(result.error).toContain('String not found');

      // File should remain unchanged
      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe(originalContent);
    });

    it('should fail if first edit oldString is not found', async () => {
      await fs.writeFile(testFilePath, 'Hello World');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [
            { oldString: 'NotFound', newString: 'Something' },
            { oldString: 'Hello', newString: 'Hi' },
          ],
        },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Edit 1');
      expect(result.error).toContain('String not found');
    });

    it('should truncate long oldString in error message', async () => {
      await fs.writeFile(testFilePath, 'Short content');
      const longString = 'A'.repeat(100);

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: longString, newString: 'replacement' }],
        },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('...');
      expect(result.error!.length).toBeLessThan(100);
    });
  });

  describe('duplicate oldString error', () => {
    it('should fail if oldString appears multiple times', async () => {
      await fs.writeFile(testFilePath, 'foo bar foo baz foo');
      const originalContent = 'foo bar foo baz foo';

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: 'foo', newString: 'qux' }],
        },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Edit 1');
      expect(result.error).toContain('found 3 times');
      expect(result.error).toContain('expected exactly 1');

      // File should remain unchanged
      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe(originalContent);
    });

    it('should report correct edit number for duplicate error', async () => {
      await fs.writeFile(testFilePath, 'unique1 duplicate duplicate unique2');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [
            { oldString: 'unique1', newString: 'changed1' },
            { oldString: 'duplicate', newString: 'single' },
          ],
        },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Edit 2');
      expect(result.error).toContain('found 2 times');
    });
  });

  describe('file not found', () => {
    it('should return error if file does not exist', async () => {
      const nonExistentPath = path.join(tempDir, 'nonexistent.txt');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: nonExistentPath,
          edits: [{ oldString: 'foo', newString: 'bar' }],
        },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('File not found');
    });
  });

  describe('line ending normalization', () => {
    it('should handle CRLF line endings', async () => {
      await fs.writeFile(testFilePath, 'Line 1\r\nLine 2\r\nLine 3');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: 'Line 1\nLine 2', newString: 'Modified\nContent' }],
        },
        context
      );

      expect(result.success).toBe(true);
      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('Modified\nContent\nLine 3');
    });
  });

  describe('empty file warning', () => {
    it('should warn when file becomes empty', async () => {
      await fs.writeFile(testFilePath, 'content');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: 'content', newString: '' }],
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.hint).toContain('empty');
    });

    it('should warn when file becomes only whitespace', async () => {
      await fs.writeFile(testFilePath, 'content');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: testFilePath,
          edits: [{ oldString: 'content', newString: '   ' }],
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.hint).toContain('empty');
    });
  });

  describe('relative path handling', () => {
    it('should resolve relative paths using workdir', async () => {
      const relativePath = 'test.txt';
      const absolutePath = path.join(tempDir, relativePath);
      await fs.writeFile(absolutePath, 'Hello');

      const result = await multieditTool.executeUnsafe(
        {
          filePath: relativePath,
          edits: [{ oldString: 'Hello', newString: 'Hi' }],
        },
        { workdir: tempDir }
      );

      expect(result.success).toBe(true);
      const content = await fs.readFile(absolutePath, 'utf-8');
      expect(content).toBe('Hi');
    });
  });
});
