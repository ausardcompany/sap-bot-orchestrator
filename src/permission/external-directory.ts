/**
 * External Directory Permission Support
 * Allows configuring external directories for access in Ask mode
 * Based on kilocode's external directory permission feature
 */

import * as path from 'path';

export interface ExternalDirectoryPermission {
  path: string;
  access: 'read' | 'write' | 'readwrite';
  allowedInModes?: string[];
}

/**
 * Check if a target path is within an allowed external directory
 */
export function checkExternalDirectoryAccess(
  targetPath: string,
  requestedAccess: 'read' | 'write',
  currentMode: string,
  allowedDirectories: ExternalDirectoryPermission[]
): boolean {
  const normalizedTarget = normalizePath(targetPath);

  for (const dir of allowedDirectories) {
    const normalizedAllowed = normalizePath(dir.path);

    // Check if target is within allowed directory
    if (!normalizedTarget.startsWith(normalizedAllowed)) {
      continue;
    }

    // Check access level
    if (requestedAccess === 'write' && dir.access === 'read') {
      continue;
    }

    // Check mode restrictions
    if (dir.allowedInModes && !dir.allowedInModes.includes(currentMode)) {
      continue;
    }

    return true;
  }

  return false;
}

/**
 * Normalize path for comparison
 */
function normalizePath(p: string): string {
  return path.normalize(p).replace(/\\/g, '/').replace(/\/+$/, '');
}

/**
 * Check if a permission request should be auto-approved based on external directory configuration
 */
export function shouldAutoApproveForExternalDirectory(
  targetPath: string,
  requestedAccess: 'read' | 'write',
  currentMode: string,
  externalDirs: ExternalDirectoryPermission[]
): boolean {
  return checkExternalDirectoryAccess(targetPath, requestedAccess, currentMode, externalDirs);
}
