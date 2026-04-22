import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import {
  createCheckpointManager,
  resetCheckpointManager,
  getCheckpointManager,
  type CheckpointManager,
  type FileCheckpoint,
} from '../checkpoints.js';

describe('CheckpointManager', () => {
  let tempDir: string;
  let testFilePath: string;
  let manager: CheckpointManager;

  beforeEach(async () => {
    // Create a temp directory for tests
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'checkpoint-test-'));
    testFilePath = path.join(tempDir, 'test.txt');

    // Reset singleton and create fresh manager
    resetCheckpointManager();
    manager = createCheckpointManager();
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
    resetCheckpointManager();
  });

  describe('createCheckpoint', () => {
    it('should create a checkpoint with correct properties', () => {
      const checkpoint = manager.createCheckpoint(
        testFilePath,
        'original content',
        'new content',
        'edit'
      );

      expect(checkpoint.id).toBeDefined();
      expect(checkpoint.id.length).toBeGreaterThan(0);
      expect(checkpoint.filePath).toBe(testFilePath);
      expect(checkpoint.originalContent).toBe('original content');
      expect(checkpoint.newContent).toBe('new content');
      expect(checkpoint.toolName).toBe('edit');
      expect(checkpoint.timestamp).toBeLessThanOrEqual(Date.now());
      expect(checkpoint.timestamp).toBeGreaterThan(Date.now() - 1000);
    });

    it('should add checkpoint to undo stack', () => {
      manager.createCheckpoint(testFilePath, 'original', 'new', 'write');

      const info = manager.getStackInfo();
      expect(info.undoCount).toBe(1);
      expect(info.redoCount).toBe(0);
    });

    it('should clear redo stack when new checkpoint is created', async () => {
      // Create initial file and checkpoint
      await fs.writeFile(testFilePath, 'original');
      manager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');
      await fs.writeFile(testFilePath, 'modified');

      // Undo to add to redo stack
      await manager.undo();

      let info = manager.getStackInfo();
      expect(info.redoCount).toBe(1);

      // Create new checkpoint - should clear redo stack
      manager.createCheckpoint(testFilePath, 'original', 'new change', 'edit');

      info = manager.getStackInfo();
      expect(info.redoCount).toBe(0);
    });

    it('should include sessionId when provided', () => {
      const managerWithSession = createCheckpointManager({ sessionId: 'test-session-123' });

      const checkpoint = managerWithSession.createCheckpoint(
        testFilePath,
        'original',
        'new',
        'edit'
      );

      expect(checkpoint.sessionId).toBe('test-session-123');
    });
  });

  describe('undo', () => {
    it('should restore original content', async () => {
      // Setup: create file and checkpoint
      await fs.writeFile(testFilePath, 'modified content');
      manager.createCheckpoint(testFilePath, 'original content', 'modified content', 'edit');

      // Execute undo
      const result = await manager.undo();

      // Verify result
      expect(result.success).toBe(true);
      expect(result.action).toBe('undo');
      expect(result.filePath).toBe(testFilePath);

      // Verify file content
      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('original content');
    });

    it('should move checkpoint to redo stack', async () => {
      await fs.writeFile(testFilePath, 'modified');
      manager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');

      await manager.undo();

      const info = manager.getStackInfo();
      expect(info.undoCount).toBe(0);
      expect(info.redoCount).toBe(1);
    });

    it('should return error when no checkpoints available', async () => {
      const result = await manager.undo();

      expect(result.success).toBe(false);
      expect(result.action).toBe('undo');
      expect(result.error).toContain('No checkpoints available');
    });

    it('should undo specific file when path provided', async () => {
      const file1 = path.join(tempDir, 'file1.txt');
      const file2 = path.join(tempDir, 'file2.txt');

      await fs.writeFile(file1, 'file1 modified');
      await fs.writeFile(file2, 'file2 modified');

      manager.createCheckpoint(file1, 'file1 original', 'file1 modified', 'edit');
      manager.createCheckpoint(file2, 'file2 original', 'file2 modified', 'edit');

      // Undo only file1
      const result = await manager.undo(file1);

      expect(result.success).toBe(true);
      expect(result.filePath).toBe(file1);

      // Verify file1 was restored
      const content1 = await fs.readFile(file1, 'utf-8');
      expect(content1).toBe('file1 original');

      // Verify file2 was not changed
      const content2 = await fs.readFile(file2, 'utf-8');
      expect(content2).toBe('file2 modified');
    });

    it('should return error when file path not found in checkpoints', async () => {
      const nonExistentPath = path.join(tempDir, 'nonexistent.txt');

      manager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');

      const result = await manager.undo(nonExistentPath);

      expect(result.success).toBe(false);
      expect(result.error).toContain('No checkpoint found for file');
    });
  });

  describe('redo', () => {
    it('should restore new content after undo', async () => {
      // Setup: create file, checkpoint, and undo
      await fs.writeFile(testFilePath, 'modified content');
      manager.createCheckpoint(testFilePath, 'original content', 'modified content', 'edit');
      await manager.undo();

      // Verify undo worked
      let content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('original content');

      // Execute redo
      const result = await manager.redo();

      // Verify result
      expect(result.success).toBe(true);
      expect(result.action).toBe('redo');
      expect(result.filePath).toBe(testFilePath);

      // Verify file content is back to modified
      content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('modified content');
    });

    it('should move checkpoint back to undo stack', async () => {
      await fs.writeFile(testFilePath, 'modified');
      manager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');
      await manager.undo();

      let info = manager.getStackInfo();
      expect(info.undoCount).toBe(0);
      expect(info.redoCount).toBe(1);

      await manager.redo();

      info = manager.getStackInfo();
      expect(info.undoCount).toBe(1);
      expect(info.redoCount).toBe(0);
    });

    it('should return error when no redo checkpoints available', async () => {
      const result = await manager.redo();

      expect(result.success).toBe(false);
      expect(result.action).toBe('redo');
      expect(result.error).toContain('No checkpoints available to redo');
    });

    it('should redo specific file when path provided', async () => {
      const file1 = path.join(tempDir, 'file1.txt');
      const file2 = path.join(tempDir, 'file2.txt');

      await fs.writeFile(file1, 'file1 modified');
      await fs.writeFile(file2, 'file2 modified');

      manager.createCheckpoint(file1, 'file1 original', 'file1 modified', 'edit');
      manager.createCheckpoint(file2, 'file2 original', 'file2 modified', 'edit');

      // Undo both
      await manager.undo(file1);
      await manager.undo(file2);

      // Redo only file1
      const result = await manager.redo(file1);

      expect(result.success).toBe(true);
      expect(result.filePath).toBe(file1);

      // Verify file1 was redone
      const content1 = await fs.readFile(file1, 'utf-8');
      expect(content1).toBe('file1 modified');

      // Verify file2 is still original
      const content2 = await fs.readFile(file2, 'utf-8');
      expect(content2).toBe('file2 original');
    });
  });

  describe('getHistory', () => {
    it('should return all checkpoints when no path specified', () => {
      const file1 = path.join(tempDir, 'file1.txt');
      const file2 = path.join(tempDir, 'file2.txt');

      manager.createCheckpoint(file1, 'orig1', 'new1', 'edit');
      manager.createCheckpoint(file2, 'orig2', 'new2', 'write');
      manager.createCheckpoint(file1, 'new1', 'newer1', 'edit');

      const history = manager.getHistory();

      expect(history).toHaveLength(3);
    });

    it('should filter by file path when specified', () => {
      const file1 = path.join(tempDir, 'file1.txt');
      const file2 = path.join(tempDir, 'file2.txt');

      manager.createCheckpoint(file1, 'orig1', 'new1', 'edit');
      manager.createCheckpoint(file2, 'orig2', 'new2', 'write');
      manager.createCheckpoint(file1, 'new1', 'newer1', 'edit');

      const history = manager.getHistory(file1);

      expect(history).toHaveLength(2);
      expect(history.every((cp) => cp.filePath === file1)).toBe(true);
    });

    it('should return empty array when no history', () => {
      const history = manager.getHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe('stack size limits', () => {
    it('should limit undo stack size', () => {
      const smallManager = createCheckpointManager({ maxStackSize: 3 });

      for (let i = 0; i < 5; i++) {
        smallManager.createCheckpoint(testFilePath, `orig${i}`, `new${i}`, 'edit');
      }

      const info = smallManager.getStackInfo();
      expect(info.undoCount).toBe(3);

      // Should have kept the most recent checkpoints
      const history = smallManager.getHistory();
      expect(history[0].originalContent).toBe('orig2');
      expect(history[1].originalContent).toBe('orig3');
      expect(history[2].originalContent).toBe('orig4');
    });

    it('should limit redo stack size', async () => {
      const smallManager = createCheckpointManager({ maxStackSize: 3 });

      // Create multiple checkpoints
      for (let i = 0; i < 5; i++) {
        await fs.writeFile(testFilePath, `new${i}`);
        smallManager.createCheckpoint(testFilePath, `orig${i}`, `new${i}`, 'edit');
      }

      // Undo all of them
      for (let i = 0; i < 5; i++) {
        await smallManager.undo();
      }

      const info = smallManager.getStackInfo();
      // Redo stack should also be limited to 3
      expect(info.redoCount).toBe(3);
    });
  });

  describe('cleanup', () => {
    it('should remove old checkpoints from memory', async () => {
      // Create checkpoints
      manager.createCheckpoint(testFilePath, 'orig1', 'new1', 'edit');

      let info = manager.getStackInfo();
      expect(info.undoCount).toBe(1);

      // Wait a small amount to ensure checkpoint is older than cutoff
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Clean with very short max age
      // Using a tiny fraction of an hour (10ms = ~0.0000028 hours)
      const removed = await manager.cleanup(0.000001);

      expect(removed).toBe(1);

      info = manager.getStackInfo();
      expect(info.undoCount).toBe(0);
    });

    it('should keep recent checkpoints', async () => {
      manager.createCheckpoint(testFilePath, 'orig1', 'new1', 'edit');

      // Clean with long max age
      const removed = await manager.cleanup(24);

      expect(removed).toBe(0);

      const info = manager.getStackInfo();
      expect(info.undoCount).toBe(1);
    });

    it('should clean both undo and redo stacks', async () => {
      await fs.writeFile(testFilePath, 'modified');
      manager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');
      await manager.undo();

      let info = manager.getStackInfo();
      expect(info.redoCount).toBe(1);

      // Wait a small amount to ensure checkpoint is older than cutoff
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Clean with very short max age
      const removed = await manager.cleanup(0.000001);

      expect(removed).toBe(1);

      info = manager.getStackInfo();
      expect(info.redoCount).toBe(0);
    });
  });

  describe('persistence', () => {
    it('should persist checkpoints to disk when persistDir is set', async () => {
      const persistDir = path.join(tempDir, '.alexi', 'checkpoints');
      const persistManager = createCheckpointManager({
        persistDir,
        sessionId: 'test-session',
      });

      persistManager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');

      // Give it a moment to persist
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check that file was created
      const files = await fs.readdir(persistDir);
      expect(files.length).toBe(1);
      expect(files[0]).toMatch(/^test-session-\d+-.*\.json$/);

      // Verify content
      const content = await fs.readFile(path.join(persistDir, files[0]), 'utf-8');
      const checkpoint = JSON.parse(content) as FileCheckpoint;
      expect(checkpoint.originalContent).toBe('original');
      expect(checkpoint.newContent).toBe('modified');
      expect(checkpoint.sessionId).toBe('test-session');
    });

    it('should clean up old persisted checkpoints', async () => {
      const persistDir = path.join(tempDir, '.alexi', 'checkpoints');
      await fs.mkdir(persistDir, { recursive: true });

      // Create an old checkpoint file manually
      const oldTimestamp = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
      const oldCheckpoint: FileCheckpoint = {
        id: 'old-id',
        filePath: testFilePath,
        originalContent: 'old',
        newContent: 'new',
        timestamp: oldTimestamp,
        toolName: 'edit',
      };

      await fs.writeFile(
        path.join(persistDir, `default-${oldTimestamp}-old-id.json`),
        JSON.stringify(oldCheckpoint)
      );

      const persistManager = createCheckpointManager({ persistDir });

      // Clean with 24 hour max age
      const removed = await persistManager.cleanup(24);

      expect(removed).toBe(1);

      // Verify file was deleted
      const files = await fs.readdir(persistDir);
      expect(files.length).toBe(0);
    });
  });

  describe('singleton', () => {
    it('should return same instance', () => {
      resetCheckpointManager();

      const instance1 = getCheckpointManager();
      const instance2 = getCheckpointManager();

      expect(instance1).toBe(instance2);
    });

    it('should reset singleton', () => {
      const instance1 = getCheckpointManager();
      instance1.createCheckpoint(testFilePath, 'orig', 'new', 'edit');

      expect(instance1.getStackInfo().undoCount).toBe(1);

      resetCheckpointManager();

      const instance2 = getCheckpointManager();
      expect(instance2.getStackInfo().undoCount).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle undo when file has been deleted', async () => {
      await fs.writeFile(testFilePath, 'modified');
      manager.createCheckpoint(testFilePath, 'original', 'modified', 'edit');

      // Delete the file
      await fs.unlink(testFilePath);

      // Undo should recreate the file with original content
      const result = await manager.undo();

      expect(result.success).toBe(true);

      const content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('original');
    });

    it('should handle multiple undo/redo cycles', async () => {
      await fs.writeFile(testFilePath, 'v3');

      manager.createCheckpoint(testFilePath, 'v1', 'v2', 'edit');
      await fs.writeFile(testFilePath, 'v2');
      manager.createCheckpoint(testFilePath, 'v2', 'v3', 'edit');
      await fs.writeFile(testFilePath, 'v3');

      // Undo twice
      await manager.undo();
      let content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('v2');

      await manager.undo();
      content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('v1');

      // Redo once
      await manager.redo();
      content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('v2');

      // Undo again
      await manager.undo();
      content = await fs.readFile(testFilePath, 'utf-8');
      expect(content).toBe('v1');
    });

    it('should resolve relative paths to absolute', () => {
      const relativeManager = createCheckpointManager();
      const checkpoint = relativeManager.createCheckpoint(
        'relative/path/file.txt',
        'orig',
        'new',
        'edit'
      );

      expect(path.isAbsolute(checkpoint.filePath)).toBe(true);
    });
  });
});
