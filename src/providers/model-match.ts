/**
 * Model matching utilities
 * Helpers for identifying specific model types
 */

/**
 * Check if a model ID represents a Ling model
 * Excludes false positives like "kling", "bling", "spelling"
 */
export function isLingModel(modelId: string): boolean {
  const lower = modelId.toLowerCase();

  // Must start with "ling" but not be part of another word
  if (!lower.includes('ling')) {
    return false;
  }

  // Exclude known false positives
  const exclusions = ['kling', 'bling', 'spelling', 'sibling', 'tingling', 'mingling'];
  for (const exclusion of exclusions) {
    if (lower.includes(exclusion)) {
      return false;
    }
  }

  // Check if "ling" appears as a standalone prefix or model name component
  return (
    lower.startsWith('ling') ||
    lower.includes('/ling') ||
    lower.includes('-ling') ||
    lower.includes('_ling')
  );
}
