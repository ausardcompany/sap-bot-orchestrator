/**
 * Provider-specific message transformations
 * Handles format differences between providers
 */

interface Message {
  role: string;
  content: string;
  reasoning_content?: string;
  [key: string]: unknown;
}

/**
 * Transform interleaved reasoning for DeepSeek models via OpenRouter
 * Preserves empty reasoning_content to maintain message structure
 */
export function transformInterleavedReasoning(
  messages: Message[],
  provider: string,
  model: string
): Message[] {
  // Skip transform for Kilo gateway - it handles this internally
  if (provider === '@kilocode/kilo-gateway') {
    return messages;
  }

  // Only apply to OpenRouter DeepSeek models
  if (provider !== 'openrouter' || !model.includes('deepseek')) {
    return messages;
  }

  return messages.map((msg) => {
    if (msg.role === 'assistant') {
      // Ensure reasoning_content exists even if empty
      return {
        ...msg,
        reasoning_content: msg.reasoning_content ?? '',
      };
    }
    return msg;
  });
}

/**
 * Ensure assistant messages always have reasoning for DeepSeek
 */
export function ensureDeepSeekReasoning(messages: Message[], model: string): Message[] {
  if (!model.includes('deepseek')) {
    return messages;
  }

  return messages.map((msg) => {
    if (msg.role === 'assistant' && msg.reasoning_content === undefined) {
      return { ...msg, reasoning_content: '' };
    }
    return msg;
  });
}
