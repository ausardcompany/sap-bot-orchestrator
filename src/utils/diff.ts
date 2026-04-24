/**
 * Diff Utility - Generate file diffs for permission requests
 */

import { createTwoFilesPatch } from 'diff';

export function generateFileDiff(
  originalContent: string,
  newContent: string,
  filePath: string,
): string {
  return createTwoFilesPatch(
    filePath,
    filePath,
    originalContent,
    newContent,
    'original',
    'modified',
  );
}

export function countChangedLines(diff: string): number {
  const lines = diff.split('\n');
  return lines.filter((l) => l.startsWith('+') || l.startsWith('-')).length;
}
