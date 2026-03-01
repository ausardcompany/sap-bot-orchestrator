import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { deleteTool } from '../delete.js';
import type { ToolContext } from '../../index.js';

describe('Delete Tool', () => {
  let tempDir: string;
  let context: ToolContext;

  beforeEach(() => {
    // Create temp directory for test files
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'delete-test-'));
    context = { workdir: tempDir };
  });

  afterEach(() => {
    // Cleanup temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('Delete file', () => {
    it('should delete a file', async () => {
      const filePath = path.join(tempDir, 'test-file.txt');
      fs.writeFileSync(filePath, 'test content');

      const result = await deleteTool.executeUnsafe({ path: filePath }, context);

      expect(result.success).toBe(true);
      expect(result.data?.deleted).toBe(true);
      expect(result.data?.type).toBe('file');
      expect(result.data?.path).toBe(filePath);
      expect(fs.existsSync(filePath)).toBe(false);
    });

    it('should delete a file using relative path', async () => {
      const filePath = path.join(tempDir, 'relative-file.txt');
      fs.writeFileSync(filePath, 'test content');

      const result = await deleteTool.executeUnsafe({ path: 'relative-file.txt' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.deleted).toBe(true);
      expect(result.data?.type).toBe('file');
      expect(fs.existsSync(filePath)).toBe(false);
    });

    it('should return error for non-existent file', async () => {
      const result = await deleteTool.executeUnsafe(
        { path: path.join(tempDir, 'non-existent.txt') },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('File not found');
    });
  });

  describe('Delete empty directory', () => {
    it('should delete an empty directory', async () => {
      const dirPath = path.join(tempDir, 'empty-dir');
      fs.mkdirSync(dirPath);

      const result = await deleteTool.executeUnsafe({ path: dirPath }, context);

      expect(result.success).toBe(true);
      expect(result.data?.deleted).toBe(true);
      expect(result.data?.type).toBe('directory');
      expect(fs.existsSync(dirPath)).toBe(false);
    });
  });

  describe('Delete non-empty directory', () => {
    it('should fail to delete non-empty directory without recursive flag', async () => {
      const dirPath = path.join(tempDir, 'non-empty-dir');
      fs.mkdirSync(dirPath);
      fs.writeFileSync(path.join(dirPath, 'file.txt'), 'content');

      const result = await deleteTool.executeUnsafe({ path: dirPath }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Directory not empty. Use recursive=true to delete');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should delete non-empty directory with recursive=true', async () => {
      const dirPath = path.join(tempDir, 'recursive-dir');
      fs.mkdirSync(dirPath);
      fs.writeFileSync(path.join(dirPath, 'file1.txt'), 'content1');
      fs.writeFileSync(path.join(dirPath, 'file2.txt'), 'content2');
      fs.mkdirSync(path.join(dirPath, 'subdir'));
      fs.writeFileSync(path.join(dirPath, 'subdir', 'file3.txt'), 'content3');

      const result = await deleteTool.executeUnsafe({ path: dirPath, recursive: true }, context);

      expect(result.success).toBe(true);
      expect(result.data?.deleted).toBe(true);
      expect(result.data?.type).toBe('directory');
      expect(result.data?.itemsDeleted).toBe(4); // 3 files + 1 subdir
      expect(fs.existsSync(dirPath)).toBe(false);
    });
  });

  describe('Block deletion outside workdir', () => {
    it('should block deletion of paths outside workdir', async () => {
      const outsidePath = path.join(os.tmpdir(), 'outside-workdir.txt');
      fs.writeFileSync(outsidePath, 'content');

      try {
        const result = await deleteTool.executeUnsafe({ path: outsidePath }, context);

        expect(result.success).toBe(false);
        expect(result.error).toContain('Cannot delete protected path');
        expect(result.error).toContain('Cannot delete outside workdir');
        expect(fs.existsSync(outsidePath)).toBe(true);
      } finally {
        // Cleanup
        if (fs.existsSync(outsidePath)) {
          fs.unlinkSync(outsidePath);
        }
      }
    });

    it('should block deletion with path traversal', async () => {
      // Use string concatenation to preserve ".." without normalization
      const result = await deleteTool.executeUnsafe({ path: '../outside.txt' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Cannot delete protected path');
      expect(result.error).toContain('".."');
    });

    it('should block deletion of workdir itself', async () => {
      const result = await deleteTool.executeUnsafe({ path: tempDir }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Cannot delete protected path');
      expect(result.error).toContain('Cannot delete workdir itself');
    });
  });

  describe('Block deletion of .git', () => {
    it('should block deletion of .git directory', async () => {
      const gitDir = path.join(tempDir, '.git');
      fs.mkdirSync(gitDir);

      const result = await deleteTool.executeUnsafe({ path: gitDir }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Cannot delete protected path');
      expect(result.error).toContain('.git');
      expect(fs.existsSync(gitDir)).toBe(true);
    });

    it('should block deletion of files inside .git directory', async () => {
      const gitDir = path.join(tempDir, '.git');
      fs.mkdirSync(gitDir);
      const gitFile = path.join(gitDir, 'config');
      fs.writeFileSync(gitFile, 'git config');

      const result = await deleteTool.executeUnsafe({ path: gitFile }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Cannot delete protected path');
      expect(result.error).toContain('.git');
      expect(fs.existsSync(gitFile)).toBe(true);
    });
  });
});
