/**
 * Checkpoint/Undo System for Alexi
 * Tracks file changes and allows undo/redo of modifications
 */

import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

export interface FileCheckpoint {
  id: string; // nanoid
  filePath: string; // Absolute path
  originalContent: string; // Content before change
  newContent: string; // Content after change
  timestamp: number; // Unix timestamp
  toolName: string; // Which tool made the change (edit, write)
  sessionId?: string; // Optional session association
}

export interface UndoResult {
  success: boolean;
  filePath?: string;
  action: 'undo' | 'redo';
  error?: string;
}

export interface CheckpointManager {
  // Create checkpoint before file modification
  createCheckpoint(
    filePath: string,
    originalContent: string,
    newContent: string,
    toolName: string
  ): FileCheckpoint;

  // Undo last change to a file (or any file if path not specified)
  undo(filePath?: string): Promise<UndoResult>;

  // Redo last undone change
  redo(filePath?: string): Promise<UndoResult>;

  // Get history for a file or all files
  getHistory(filePath?: string): FileCheckpoint[];

  // Clear old checkpoints (older than N hours)
  cleanup(maxAgeHours?: number): Promise<number>;

  // Get current undo/redo stack sizes
  getStackInfo(): { undoCount: number; redoCount: number };
}

class CheckpointManagerImpl implements CheckpointManager {
  private undoStack: FileCheckpoint[] = [];
  private redoStack: FileCheckpoint[] = [];
  private maxStackSize = 50; // Limit memory usage
  private persistDir: string | null = null;
  private sessionId: string | null = null;

  constructor(options?: { persistDir?: string; sessionId?: string; maxStackSize?: number }) {
    if (options?.persistDir) {
      this.persistDir = options.persistDir;
    }
    if (options?.sessionId) {
      this.sessionId = options.sessionId;
    }
    if (options?.maxStackSize) {
      this.maxStackSize = options.maxStackSize;
    }
  }

  createCheckpoint(
    filePath: string,
    originalContent: string,
    newContent: string,
    toolName: string
  ): FileCheckpoint {
    const checkpoint: FileCheckpoint = {
      id: nanoid(),
      filePath: path.resolve(filePath),
      originalContent,
      newContent,
      timestamp: Date.now(),
      toolName,
      sessionId: this.sessionId ?? undefined,
    };

    // Add to undo stack
    this.undoStack.push(checkpoint);

    // Clear redo stack when new checkpoint is created
    this.redoStack = [];

    // Enforce max stack size
    if (this.undoStack.length > this.maxStackSize) {
      this.undoStack.shift();
    }

    // Optionally persist to disk
    this.persistCheckpoint(checkpoint);

    return checkpoint;
  }

  async undo(filePath?: string): Promise<UndoResult> {
    // Find checkpoint to undo
    let checkpointIndex: number;

    if (filePath) {
      const absolutePath = path.resolve(filePath);
      checkpointIndex = this.findLastCheckpointIndex(this.undoStack, absolutePath);
    } else {
      checkpointIndex = this.undoStack.length - 1;
    }

    if (checkpointIndex < 0) {
      return {
        success: false,
        action: 'undo',
        error: filePath
          ? `No checkpoint found for file: ${filePath}`
          : 'No checkpoints available to undo',
      };
    }

    const checkpoint = this.undoStack[checkpointIndex];

    try {
      // Read current file content to preserve for redo
      let currentContent: string;
      try {
        currentContent = await fs.readFile(checkpoint.filePath, 'utf-8');
      } catch {
        // File may have been deleted - treat as empty
        currentContent = '';
      }

      // Write original content back to file
      await fs.writeFile(checkpoint.filePath, checkpoint.originalContent, 'utf-8');

      // Remove from undo stack
      this.undoStack.splice(checkpointIndex, 1);

      // Create redo checkpoint with current content as "new"
      const redoCheckpoint: FileCheckpoint = {
        ...checkpoint,
        id: nanoid(),
        originalContent: checkpoint.originalContent,
        newContent: currentContent,
        timestamp: Date.now(),
      };

      this.redoStack.push(redoCheckpoint);

      // Enforce max stack size for redo
      if (this.redoStack.length > this.maxStackSize) {
        this.redoStack.shift();
      }

      return {
        success: true,
        filePath: checkpoint.filePath,
        action: 'undo',
      };
    } catch (error) {
      return {
        success: false,
        filePath: checkpoint.filePath,
        action: 'undo',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async redo(filePath?: string): Promise<UndoResult> {
    // Find checkpoint to redo
    let checkpointIndex: number;

    if (filePath) {
      const absolutePath = path.resolve(filePath);
      checkpointIndex = this.findLastCheckpointIndex(this.redoStack, absolutePath);
    } else {
      checkpointIndex = this.redoStack.length - 1;
    }

    if (checkpointIndex < 0) {
      return {
        success: false,
        action: 'redo',
        error: filePath
          ? `No redo checkpoint found for file: ${filePath}`
          : 'No checkpoints available to redo',
      };
    }

    const checkpoint = this.redoStack[checkpointIndex];

    try {
      // Write new content to file
      await fs.writeFile(checkpoint.filePath, checkpoint.newContent, 'utf-8');

      // Remove from redo stack
      this.redoStack.splice(checkpointIndex, 1);

      // Push back to undo stack
      const undoCheckpoint: FileCheckpoint = {
        ...checkpoint,
        id: nanoid(),
        originalContent: checkpoint.originalContent,
        newContent: checkpoint.newContent,
        timestamp: Date.now(),
      };

      this.undoStack.push(undoCheckpoint);

      // Enforce max stack size for undo
      if (this.undoStack.length > this.maxStackSize) {
        this.undoStack.shift();
      }

      return {
        success: true,
        filePath: checkpoint.filePath,
        action: 'redo',
      };
    } catch (error) {
      return {
        success: false,
        filePath: checkpoint.filePath,
        action: 'redo',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  getHistory(filePath?: string): FileCheckpoint[] {
    if (filePath) {
      const absolutePath = path.resolve(filePath);
      return this.undoStack.filter((cp) => cp.filePath === absolutePath);
    }
    return [...this.undoStack];
  }

  async cleanup(maxAgeHours: number = 24): Promise<number> {
    const maxAgeMs = maxAgeHours * 60 * 60 * 1000;
    const cutoffTime = Date.now() - maxAgeMs;

    // Clean in-memory stacks
    const undoBefore = this.undoStack.length;
    const redoBefore = this.redoStack.length;

    this.undoStack = this.undoStack.filter((cp) => cp.timestamp >= cutoffTime);
    this.redoStack = this.redoStack.filter((cp) => cp.timestamp >= cutoffTime);

    const memoryCleared = undoBefore - this.undoStack.length + (redoBefore - this.redoStack.length);

    // Clean persisted checkpoints
    let persistedCleared = 0;
    if (this.persistDir) {
      try {
        const files = await fs.readdir(this.persistDir);
        for (const file of files) {
          if (!file.endsWith('.json')) continue;

          const filePath = path.join(this.persistDir, file);
          try {
            const content = await fs.readFile(filePath, 'utf-8');
            const checkpoint = JSON.parse(content) as FileCheckpoint;

            if (checkpoint.timestamp < cutoffTime) {
              await fs.unlink(filePath);
              persistedCleared++;
            }
          } catch {
            // Skip invalid files
          }
        }
      } catch {
        // Persist directory may not exist
      }
    }

    return memoryCleared + persistedCleared;
  }

  getStackInfo(): { undoCount: number; redoCount: number } {
    return {
      undoCount: this.undoStack.length,
      redoCount: this.redoStack.length,
    };
  }

  /**
   * Find the last checkpoint index for a specific file path
   */
  private findLastCheckpointIndex(stack: FileCheckpoint[], absolutePath: string): number {
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].filePath === absolutePath) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Persist checkpoint to disk for recovery
   */
  private async persistCheckpoint(checkpoint: FileCheckpoint): Promise<void> {
    if (!this.persistDir) return;

    try {
      // Ensure directory exists
      await fs.mkdir(this.persistDir, { recursive: true });

      const filename = `${checkpoint.sessionId || 'default'}-${checkpoint.timestamp}-${checkpoint.id}.json`;
      const filePath = path.join(this.persistDir, filename);

      await fs.writeFile(filePath, JSON.stringify(checkpoint, null, 2), 'utf-8');
    } catch (error) {
      // Silently fail persistence - it's optional
      console.error('Failed to persist checkpoint:', error);
    }
  }
}

// Singleton instance
let instance: CheckpointManager | null = null;

/**
 * Get the singleton CheckpointManager instance
 */
export function getCheckpointManager(options?: {
  persistDir?: string;
  sessionId?: string;
  maxStackSize?: number;
}): CheckpointManager {
  if (!instance) {
    instance = new CheckpointManagerImpl(options);
  }
  return instance;
}

/**
 * Reset the singleton instance (for testing)
 */
export function resetCheckpointManager(): void {
  instance = null;
}

/**
 * Create a new CheckpointManager instance (for testing or custom use)
 */
export function createCheckpointManager(options?: {
  persistDir?: string;
  sessionId?: string;
  maxStackSize?: number;
}): CheckpointManager {
  return new CheckpointManagerImpl(options);
}
