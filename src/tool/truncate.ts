export interface TruncationConfig {
  maxOutputLength: number;
  maxLineCount: number;
  preserveEnds: boolean; // keep beginning and end
  endPreserveRatio: number; // 0.2 = keep 20% at end
}

const DEFAULT_CONFIG: TruncationConfig = {
  maxOutputLength: 10000,
  maxLineCount: 500,
  preserveEnds: true,
  endPreserveRatio: 0.2,
};

export function truncateOutput(
  output: string,
  config: Partial<TruncationConfig> = {}
): string {
  const cfg = { ...DEFAULT_CONFIG, ...config };

  if (output.length <= cfg.maxOutputLength) {
    return output;
  }

  if (cfg.preserveEnds) {
    const endLength = Math.floor(cfg.maxOutputLength * cfg.endPreserveRatio);
    const startLength = cfg.maxOutputLength - endLength - 50; // 50 for separator
    return (
      output.slice(0, startLength) +
      '\n\n... [truncated ' +
      (output.length - cfg.maxOutputLength) +
      ' characters] ...\n\n' +
      output.slice(-endLength)
    );
  }

  return output.slice(0, cfg.maxOutputLength) + '\n... (truncated)';
}
