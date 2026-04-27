/**
 * DeepSeek-specific provider utilities
 * Handles DeepSeek model features and API quirks
 */

interface Message {
  role: string;
  content: string;
  [key: string]: unknown;
}

interface ProviderRequest {
  messages: Message[];
  max_tokens?: number;
  max_completion_tokens?: number | 'max';
  [key: string]: unknown;
}

export interface DeepSeekOptions {
  maxTokens?: number | 'max';
  reasoningEffort?: 'low' | 'medium' | 'high';
}

/**
 * Build DeepSeek-specific request with special token handling
 */
export function buildDeepSeekRequest(
  messages: Message[],
  options: DeepSeekOptions
): ProviderRequest {
  const request: ProviderRequest = {
    messages,
  };

  // Handle special "max" value for max_tokens
  if (options.maxTokens === 'max') {
    // Let provider use maximum - DeepSeek supports "max" as special value
    request.max_completion_tokens = 'max' as any;
  } else if (options.maxTokens) {
    request.max_tokens = options.maxTokens;
  }

  // Add reasoning effort if specified
  if (options.reasoningEffort) {
    request.reasoning_effort = options.reasoningEffort;
  }

  return request;
}
