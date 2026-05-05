/**
 * Tool Output Truncation Configuration
 * Allows configuring truncation limits via configuration
 */

export interface TruncationConfig {
  maxOutputLength?: number; // Default: 10000
  maxLineCount?: number; // Default: 500
  truncationMessage?: string; // Default: "\n... (output truncated)"
}

/**
 * Truncate output with configurable limits
 */
export function truncateOutputWithConfig(
  output: string,
  config?: Partial<TruncationConfig>
): { content: string; truncated: boolean } {
  const maxLength = config?.maxOutputLength ?? 10000;
  const maxLines = config?.maxLineCount ?? 500;
  const message = config?.truncationMessage ?? '\n... (output truncated)';

  let result = output;
  let truncated = false;

  // Truncate by line count first
  const lines = result.split('\n');
  if (lines.length > maxLines) {
    result = lines.slice(0, maxLines).join('\n') + message;
    truncated = true;
  }

  // Then truncate by character length
  if (result.length > maxLength) {
    result = result.slice(0, maxLength) + message;
    truncated = true;
  }

  return { content: result, truncated };
}

/**
 * Get truncation config from environment or defaults
 */
export function getTruncationConfig(): TruncationConfig {
  return {
    maxOutputLength: process.env.ALEXI_MAX_OUTPUT_LENGTH
      ? parseInt(process.env.ALEXI_MAX_OUTPUT_LENGTH, 10)
      : 10000,
    maxLineCount: process.env.ALEXI_MAX_LINE_COUNT
      ? parseInt(process.env.ALEXI_MAX_LINE_COUNT, 10)
      : 500,
    truncationMessage: process.env.ALEXI_TRUNCATION_MESSAGE ?? '\n... (output truncated)',
  };
}
