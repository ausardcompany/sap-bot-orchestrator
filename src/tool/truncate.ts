/**
 * Tool Output Truncation Utilities
 */

export interface TruncationConfig {
  maxOutputLength?: number;
  maxLineCount?: number;
  preserveEnds?: boolean;
}

const DEFAULT_CONFIG: Required<TruncationConfig> = {
  maxOutputLength: 10000,
  maxLineCount: 500,
  preserveEnds: true,
};

export function truncateOutput(
  output: string,
  config: TruncationConfig = {}
): { content: string; truncated: boolean } {
  const { maxOutputLength, maxLineCount, preserveEnds } = { ...DEFAULT_CONFIG, ...config };

  // Check line count first
  const lines = output.split('\n');
  if (lines.length > maxLineCount) {
    if (preserveEnds) {
      const headLines = Math.floor(maxLineCount * 0.4);
      const tailLines = Math.floor(maxLineCount * 0.4);
      const head = lines.slice(0, headLines).join('\n');
      const tail = lines.slice(-tailLines).join('\n');
      const truncatedCount = lines.length - headLines - tailLines;
      return {
        content: `${head}\n\n... (${truncatedCount} lines truncated) ...\n\n${tail}`,
        truncated: true,
      };
    }
    const truncatedCount = lines.length - maxLineCount;
    return {
      content: lines.slice(0, maxLineCount).join('\n') + `\n... (${truncatedCount} lines truncated)`,
      truncated: true,
    };
  }

  // Then check character length
  if (output.length <= maxOutputLength) {
    return { content: output, truncated: false };
  }

  if (preserveEnds) {
    const headLength = Math.floor(maxOutputLength * 0.4);
    const tailLength = Math.floor(maxOutputLength * 0.4);
    const truncatedChars = output.length - headLength - tailLength;
    return {
      content:
        output.slice(0, headLength) +
        `\n\n... (${truncatedChars} chars truncated) ...\n\n` +
        output.slice(-tailLength),
      truncated: true,
    };
  }

  const truncatedChars = output.length - maxOutputLength;
  return {
    content: output.slice(0, maxOutputLength) + `\n... (${truncatedChars} chars truncated)`,
    truncated: true,
  };
}
