/**
 * Effort Levels - Cost/quality tradeoff control
 *
 * Allows users to control how much compute the AI uses per turn.
 * Inspired by Claude Code's effort levels.
 *
 * - low:    Fast & cheap — fewer iterations, smaller tokens, prefer cheap models
 * - medium: Balanced (default) — matches existing behavior exactly
 * - high:   Thorough — more iterations, larger tokens, extended thinking
 */

export type EffortLevel = 'low' | 'medium' | 'high';

export interface EffortConfig {
  label: string;
  maxIterations: number;
  preferCheap: boolean;
  maxTokens: number;
  thinkingBudget: number;
  compactionThreshold: number;
}

export const EFFORT_CONFIGS: Record<EffortLevel, EffortConfig> = {
  low: {
    label: 'Low (fast & cheap)',
    maxIterations: 15,
    preferCheap: true,
    maxTokens: 2048,
    thinkingBudget: 0,
    compactionThreshold: 0.5,
  },
  medium: {
    label: 'Medium (balanced)',
    maxIterations: 50,
    preferCheap: false,
    maxTokens: 16384,
    thinkingBudget: 0,
    compactionThreshold: 0.75,
  },
  high: {
    label: 'High (thorough)',
    maxIterations: 100,
    preferCheap: false,
    maxTokens: 32768,
    thinkingBudget: 10000,
    compactionThreshold: 0.9,
  },
};

export const DEFAULT_EFFORT: EffortLevel = 'medium';

export const EFFORT_LEVELS: EffortLevel[] = ['low', 'medium', 'high'];

/**
 * Validate and return an EffortLevel, or undefined if invalid.
 */
export function parseEffortLevel(value: string): EffortLevel | undefined {
  const normalized = value.toLowerCase().trim();
  if (EFFORT_LEVELS.includes(normalized as EffortLevel)) {
    return normalized as EffortLevel;
  }
  return undefined;
}

/**
 * Get the config for a given effort level.
 */
export function getEffortConfig(level: EffortLevel): EffortConfig {
  return EFFORT_CONFIGS[level];
}
