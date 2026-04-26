/**
 * Model matching utilities
 */

/**
 * Check if a model ID represents a Ling model
 * Excludes false positives like "kling", "bling", "spelling"
 */
export function isLingModel(modelId: string): boolean {
  const lower = modelId.toLowerCase();

  // Must start with "ling" to be a Ling model
  if (!lower.startsWith('ling')) {
    return false;
  }

  // Exclude known false positives
  const exclusions = ['kling', 'bling', 'spelling', 'darling', 'sterling'];
  for (const exclusion of exclusions) {
    if (lower.startsWith(exclusion)) {
      return false;
    }
  }

  return true;
}

/**
 * Check if model supports multilingual prompts
 */
export function supportsMultilingual(modelId: string): boolean {
  // Ling models have special multilingual handling
  if (isLingModel(modelId)) {
    return true;
  }

  const lower = modelId.toLowerCase();
  return lower.includes('multilingual') || lower.includes('polyglot');
}
