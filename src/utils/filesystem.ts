/**
 * Filesystem Utility Functions
 * Path containment checking and security utilities
 */

import * as path from 'path';
import * as fs from 'fs/promises';

/**
 * Check if a path is contained within a parent directory
 * Handles edge cases like symlinks and path traversal attempts
 * @param parent - The parent directory path
 * @param child - The child path to check
 * @returns true if child is within parent, false otherwise
 */
export function containsPath(parent: string, child: string): boolean {
  const normalizedParent = path.resolve(parent);
  const normalizedChild = path.resolve(child);

  // Normalize to POSIX-style for consistent comparison
  const parentPosix = normalizedParent.split(path.sep).join(path.posix.sep);
  const childPosix = normalizedChild.split(path.sep).join(path.posix.sep);

  // Check if child starts with parent path
  if (!childPosix.startsWith(parentPosix)) {
    return false;
  }

  // Ensure it's actually a subdirectory, not just a prefix match
  // e.g., /home/user should not contain /home/user-data
  const remainder = childPosix.slice(parentPosix.length);
  return remainder.length === 0 || remainder.startsWith(path.posix.sep);
}

/**
 * Safely resolve a path and check if it's contained within a parent directory
 * Also resolves symlinks to prevent symlink-based traversal attacks
 * @param parent - The parent directory path
 * @param child - The child path to check
 * @returns Object with containment status and resolved path
 */
export async function safePathCheck(
  parent: string,
  child: string
): Promise<{ contained: boolean; resolved: string }> {
  try {
    const resolved = path.resolve(parent, child);

    // First check without symlink resolution
    if (!containsPath(parent, resolved)) {
      return { contained: false, resolved };
    }

    // Try to resolve symlinks
    try {
      const realPath = await fs.realpath(resolved);
      const contained = containsPath(parent, realPath);
      return { contained, resolved: realPath };
    } catch {
      // File doesn't exist yet, or we can't resolve it
      // In this case, trust the initial containment check
      return { contained: true, resolved };
    }
  } catch {
    // Path resolution failed
    return { contained: false, resolved: child };
  }
}

/**
 * Check if a path attempts directory traversal
 * @param filePath - The path to check
 * @returns true if path contains suspicious patterns
 */
export function hasTraversalAttempt(filePath: string): boolean {
  const normalized = path.normalize(filePath);
  // Check for parent directory references that escape
  return normalized.includes('..') || normalized.startsWith('..');
}
