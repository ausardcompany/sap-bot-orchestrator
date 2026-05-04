/**
 * Tool Output Truncation with Configurable Limits
 * Prevents context overflow with smart truncation strategies
 */

import { z } from 'zod';

export const TruncationConfigSchema = z.object({
  maxOutputLength: z.number().positive().int().optional().default(10000),
  maxLineCount: z.number().positive().int().optional().default(500),
  preserveEnds: z.boolean().optional().default(true),
});

export type TruncationConfig = z.infer<typeof TruncationConfigSchema>;

const DEFAULT_CONFIG: TruncationConfig = {
  maxOutputLength: 10000,
  maxLineCount: 500,
  preserveEnds: true,
};

/**
 * Truncate output with configurable limits
 * Supports both line count and character count limits
 * Can preserve both start and end of output when truncating
 */
export function truncateOutput(
  output: string,
  config: Partial<TruncationConfig> = {}
): string {
  const { maxOutputLength, maxLineCount, preserveEnds } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const lines = output.split('\n');

  // Truncate by line count first
  if (lines.length > maxLineCount) {
    if (preserveEnds) {
      const halfLines = Math.floor(maxLineCount / 2);
      const truncatedLines = [
        ...lines.slice(0, halfLines),
        `\n... (${lines.length - maxLineCount} lines truncated) ...\n`,
        ...lines.slice(-halfLines),
      ];
      output = truncatedLines.join('\n');
    } else {
      output = lines.slice(0, maxLineCount).join('\n') + '\n... (truncated)';
    }
  }

  // Then truncate by character count
  if (output.length > maxOutputLength) {
    if (preserveEnds) {
      const halfLength = Math.floor(maxOutputLength / 2);
      output =
        output.slice(0, halfLength) + '\n... (truncated) ...\n' + output.slice(-halfLength);
    } else {
      output = output.slice(0, maxOutputLength) + '\n... (truncated)';
    }
  }

  return output;
}

/**
 * Check if output would be truncated with given config
 */
export function wouldTruncate(output: string, config: Partial<TruncationConfig> = {}): boolean {
  const { maxOutputLength, maxLineCount } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const lines = output.split('\n');
  return lines.length > maxLineCount || output.length > maxOutputLength;
}

/**
 * Get truncation info for output
 */
export function getTruncationInfo(
  output: string,
  config: Partial<TruncationConfig> = {}
): {
  wouldTruncate: boolean;
  lineCount: number;
  charCount: number;
  exceedsLines: boolean;
  exceedsChars: boolean;
} {
  const { maxOutputLength, maxLineCount } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const lines = output.split('\n');
  const lineCount = lines.length;
  const charCount = output.length;
  const exceedsLines = lineCount > maxLineCount;
  const exceedsChars = charCount > maxOutputLength;

  return {
    wouldTruncate: exceedsLines || exceedsChars,
    lineCount,
    charCount,
    exceedsLines,
    exceedsChars,
  };
}
