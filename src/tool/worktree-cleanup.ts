/**
 * Worktree Cleanup Utility
 * Handles cleanup of git worktrees with Windows file lock retry logic
 */

import * as fs from 'fs/promises';
import * as path from 'path';

const RETRY_DELAYS = [100, 200, 500, 1000, 2000]; // ms

export interface CleanupResult {
  success: boolean;
  path: string;
  error?: string;
  retries?: number;
}

/**
 * Check if error is retryable (file lock issues on Windows)
 */
function isRetryableError(err: unknown): boolean {
  if (err instanceof Error) {
    const code = (err as NodeJS.ErrnoException).code;
    // EBUSY, EPERM, EACCES are common on Windows when files are locked
    return code === 'EBUSY' || code === 'EPERM' || code === 'EACCES';
  }
  return false;
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clean up a worktree directory with retry logic
 */
export async function cleanupWorktree(worktreePath: string): Promise<CleanupResult> {
  const normalizedPath = path.resolve(worktreePath);

  // Check if path exists
  try {
    await fs.access(normalizedPath);
  } catch {
    return { success: true, path: normalizedPath }; // Already cleaned
  }

  // Try to remove with retries for Windows file locks
  let lastError: Error | undefined;

  for (let i = 0; i < RETRY_DELAYS.length; i++) {
    try {
      await fs.rm(normalizedPath, { recursive: true, force: true });
      return { success: true, path: normalizedPath, retries: i };
    } catch (err) {
      lastError = err as Error;

      // On Windows, EBUSY/EPERM often means file is locked
      if (isRetryableError(err)) {
        await sleep(RETRY_DELAYS[i]);
        continue;
      }

      // Non-retryable error
      break;
    }
  }

  return {
    success: false,
    path: normalizedPath,
    error: lastError?.message ?? 'Unknown error',
    retries: RETRY_DELAYS.length,
  };
}

/**
 * Clean up multiple worktrees
 */
export async function cleanupWorktrees(worktreePaths: string[]): Promise<CleanupResult[]> {
  return Promise.all(worktreePaths.map((p) => cleanupWorktree(p)));
}

/**
 * Check if a path is a valid worktree directory
 */
export async function isWorktreeDirectory(dirPath: string): Promise<boolean> {
  try {
    const gitPath = path.join(dirPath, '.git');
    const stat = await fs.stat(gitPath);
    // Worktrees have a .git file (not directory) pointing to the main repo
    return stat.isFile();
  } catch {
    return false;
  }
}
