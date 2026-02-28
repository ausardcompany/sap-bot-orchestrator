/**
 * Streaming Orchestrator for real-time chat completions
 * Uses SAP AI SDK Orchestration provider exclusively
 */
import { getProviderForModel, getDefaultModel } from "../providers/index.js";
import { routePrompt } from "./router.js";
/**
 * Stream chat completion, yielding text chunks as they arrive
 * Collects and returns full response after streaming completes
 */
export async function* streamChat(message, options) {
    let modelId;
    let routingReason;
    // Auto-routing enabled?
    if (options?.autoRoute && !options?.modelOverride) {
        const decision = routePrompt(message, { preferCheap: options.preferCheap });
        modelId = decision.modelId;
        routingReason = decision.reason;
    }
    else {
        // Use specified or default model
        modelId = (options?.modelOverride ?? getDefaultModel()).trim();
    }
    // Build messages array with history if session manager provided
    const messages = [];
    if (options?.sessionManager) {
        const session = options.sessionManager.getCurrentSession();
        // Initialize session if needed
        if (!session) {
            options.sessionManager.createSession(modelId);
        }
        // Get conversation history
        const history = options.sessionManager.getHistory(20); // Last 20 messages
        // Add system prompt if provided and not already in history
        if (options.systemPrompt && !history.some(m => m.role === 'system')) {
            messages.push({ role: 'system', content: options.systemPrompt });
        }
        // Add conversation history
        messages.push(...history.map(m => ({ role: m.role, content: m.content })));
    }
    else {
        // Single message without history
        if (options?.systemPrompt) {
            messages.push({ role: 'system', content: options.systemPrompt });
        }
    }
    // Add current user message
    messages.push({ role: 'user', content: message });
    // Get SAP Orchestration provider for this model
    const provider = getProviderForModel(modelId);
    let fullText = '';
    let finalUsage;
    // Stream using SAP Orchestration provider
    for await (const chunk of provider.streamComplete(messages, {
        maxTokens: options?.maxTokens ?? 4096,
        temperature: options?.temperature,
        signal: options?.signal,
    })) {
        fullText += chunk.text;
        if (chunk.usage)
            finalUsage = chunk.usage;
        yield chunk;
    }
    // Save messages to session AFTER streaming completes (not per-chunk)
    if (options?.sessionManager) {
        options.sessionManager.addMessage('user', message, {
            input: finalUsage?.prompt_tokens
        });
        options.sessionManager.addMessage('assistant', fullText, {
            output: finalUsage?.completion_tokens
        });
    }
    return {
        text: fullText,
        usage: finalUsage,
        modelUsed: modelId,
        routingReason
    };
}
/**
 * Get model ID that would be used for a message (for display purposes)
 */
export function resolveModelId(options) {
    if (options?.modelOverride) {
        return options.modelOverride.trim();
    }
    return getDefaultModel();
}
/**
 * Check if abort was requested
 */
export function isAbortError(error) {
    return error instanceof Error && error.name === 'AbortError';
}
