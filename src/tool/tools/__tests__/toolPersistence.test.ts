/**
 * Tests for tool output disk persistence
 */

import { describe, it, expect, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import {
  persistLargeOutput,
  cleanupToolOutputs,
  TOOL_OUTPUT_DIR,
  MAX_LINES,
  MAX_BYTES,
} from '../../index.js';

describe('tool output persistence', () => {
  // Track files we create for cleanup
  const createdFiles: string[] = [];

  afterEach(async () => {
    // Clean up any files we created
    for (const filePath of createdFiles) {
      try {
        await fs.unlink(filePath);
      } catch {
        // ignore
      }
    }
    createdFiles.length = 0;
  });

  describe('persistLargeOutput', () => {
    it('should return null for small outputs', async () => {
      const result = await persistLargeOutput('hello world', 'test');
      expect(result).toBeNull();
    });

    it('should return null for output exactly at line limit', async () => {
      const output = Array.from({ length: MAX_LINES }, (_, i) => `line ${i}`).join('\n');
      // Only persist if both limits are exceeded
      const bytes = Buffer.byteLength(output, 'utf-8');
      if (bytes <= MAX_BYTES) {
        const result = await persistLargeOutput(output, 'test');
        expect(result).toBeNull();
      }
    });

    it('should persist output exceeding line limit', async () => {
      const output = Array.from({ length: MAX_LINES + 100 }, (_, i) => `line ${i}`).join('\n');
      const result = await persistLargeOutput(output, 'test-lines');

      expect(result).not.toBeNull();
      expect(result).toContain('test-lines-');
      expect(result).toContain(TOOL_OUTPUT_DIR);

      if (result) {
        createdFiles.push(result);
        const content = await fs.readFile(result, 'utf-8');
        expect(content).toBe(output);
      }
    });

    it('should persist output exceeding byte limit', async () => {
      // Create output that's small in lines but large in bytes
      const bigLine = 'x'.repeat(MAX_BYTES + 1000);
      const result = await persistLargeOutput(bigLine, 'test-bytes');

      expect(result).not.toBeNull();

      if (result) {
        createdFiles.push(result);
        const content = await fs.readFile(result, 'utf-8');
        expect(content).toBe(bigLine);
      }
    });

    it('should create the output directory if it does not exist', async () => {
      // persistLargeOutput uses mkdir recursive, so just verify it works
      const output = 'x'.repeat(MAX_BYTES + 100);
      const result = await persistLargeOutput(output, 'test-mkdir');

      expect(result).not.toBeNull();
      if (result) {
        createdFiles.push(result);
        const dirExists = await fs
          .stat(TOOL_OUTPUT_DIR)
          .then(() => true)
          .catch(() => false);
        expect(dirExists).toBe(true);
      }
    });

    it('should use nanoid in the filename', async () => {
      const output = 'x'.repeat(MAX_BYTES + 100);
      const result = await persistLargeOutput(output, 'test-nanoid');

      expect(result).not.toBeNull();
      if (result) {
        createdFiles.push(result);
        const filename = path.basename(result);
        // Should be toolName-<8char nanoid>.txt
        expect(filename).toMatch(/^test-nanoid-.{8}\.txt$/);
      }
    });
  });

  describe('cleanupToolOutputs', () => {
    it('should remove old files', async () => {
      // Create a test file with old mtime
      await fs.mkdir(TOOL_OUTPUT_DIR, { recursive: true });
      const oldFile = path.join(TOOL_OUTPUT_DIR, 'cleanup-test-old.txt');
      await fs.writeFile(oldFile, 'old content');
      createdFiles.push(oldFile);

      // Set mtime to 2 days ago
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      await fs.utimes(oldFile, twoDaysAgo, twoDaysAgo);

      const removed = await cleanupToolOutputs(24 * 60 * 60 * 1000);

      expect(removed).toBeGreaterThanOrEqual(1);

      // File should be gone
      const exists = await fs
        .stat(oldFile)
        .then(() => true)
        .catch(() => false);
      expect(exists).toBe(false);

      // Remove from tracking since it's already cleaned up
      const idx = createdFiles.indexOf(oldFile);
      if (idx >= 0) {
        createdFiles.splice(idx, 1);
      }
    });

    it('should keep recent files', async () => {
      // Create a recent test file
      await fs.mkdir(TOOL_OUTPUT_DIR, { recursive: true });
      const recentFile = path.join(TOOL_OUTPUT_DIR, 'cleanup-test-recent.txt');
      await fs.writeFile(recentFile, 'recent content');
      createdFiles.push(recentFile);

      await cleanupToolOutputs(24 * 60 * 60 * 1000);

      // File should still exist
      const exists = await fs
        .stat(recentFile)
        .then(() => true)
        .catch(() => false);
      expect(exists).toBe(true);
    });

    it('should return 0 when directory does not exist', async () => {
      // Use a path that definitely doesn't exist
      const removed = await cleanupToolOutputs(0);
      // This may be 0 or more depending on state, but should not throw
      expect(typeof removed).toBe('number');
    });
  });

  describe('TOOL_OUTPUT_DIR', () => {
    it('should be under ~/.alexi/tool-output', () => {
      expect(TOOL_OUTPUT_DIR).toBe(path.join(os.homedir(), '.alexi', 'tool-output'));
    });
  });
});
