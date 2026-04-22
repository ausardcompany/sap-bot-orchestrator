/**
 * Model matching utilities
 * Helper functions to identify specific model types
 */

/**
 * Check if a model ID represents a Ling model.
 * Excludes false positives like "kling", "bling", "spelling".
 */
export function isLing(modelId: string): boolean {
  const lower = modelId.toLowerCase();
  // Must start with "ling" or contain "/ling" or "-ling" or "_ling"
  if (lower.startsWith('ling')) return true;
  if (lower.includes('/ling')) return true;
  if (lower.includes('-ling')) return true;
  if (lower.includes('_ling')) return true;
  return false;
}
