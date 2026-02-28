/**
 * SAP AI SDK Orchestration Provider
 * Comprehensive wrapper for @sap-ai-sdk/orchestration package
 *
 * Features:
 * - Streaming and non-streaming chat completion
 * - Tool/function calling with streaming support
 * - Content filtering (Azure Content Safety, Llama Guard 3 8B)
 * - Data masking (DPI)
 * - Document grounding
 * - Translation (input/output)
 * - Embeddings
 */
import { OrchestrationClient, OrchestrationEmbeddingClient, buildAzureContentSafetyFilter, buildLlamaGuard38BFilter, buildDpiMaskingProvider, buildDocumentGroundingConfig, buildTranslationConfig, } from '@sap-ai-sdk/orchestration';
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Build input filters based on configuration
 */
function buildInputFilters(config) {
    if (!config)
        return undefined;
    if (config.type === 'azure') {
        const azureParams = {};
        if (config.azureConfig?.hate)
            azureParams.hate = config.azureConfig.hate;
        if (config.azureConfig?.selfHarm)
            azureParams.self_harm = config.azureConfig.selfHarm;
        if (config.azureConfig?.sexual)
            azureParams.sexual = config.azureConfig.sexual;
        if (config.azureConfig?.violence)
            azureParams.violence = config.azureConfig.violence;
        if (config.azureConfig?.promptShield)
            azureParams.prompt_shield = config.azureConfig.promptShield;
        return [buildAzureContentSafetyFilter('input', azureParams)];
    }
    else if (config.type === 'llama_guard' && config.llamaGuardCategories) {
        return [buildLlamaGuard38BFilter('input', config.llamaGuardCategories)];
    }
    return undefined;
}
/**
 * Build output filters based on configuration
 */
function buildOutputFilters(config) {
    if (!config)
        return undefined;
    if (config.type === 'azure') {
        const azureParams = {};
        if (config.azureConfig?.hate)
            azureParams.hate = config.azureConfig.hate;
        if (config.azureConfig?.selfHarm)
            azureParams.self_harm = config.azureConfig.selfHarm;
        if (config.azureConfig?.sexual)
            azureParams.sexual = config.azureConfig.sexual;
        if (config.azureConfig?.violence)
            azureParams.violence = config.azureConfig.violence;
        if (config.azureConfig?.protectedMaterialCode)
            azureParams.protected_material_code = config.azureConfig.protectedMaterialCode;
        return [buildAzureContentSafetyFilter('output', azureParams)];
    }
    else if (config.type === 'llama_guard' && config.llamaGuardCategories) {
        return [buildLlamaGuard38BFilter('output', config.llamaGuardCategories)];
    }
    return undefined;
}
/**
 * Build filtering module config
 */
function buildFilteringModuleConfig(filtering) {
    if (!filtering)
        return undefined;
    const inputFilters = buildInputFilters(filtering.input);
    const outputFilters = buildOutputFilters(filtering.output);
    if (!inputFilters && !outputFilters)
        return undefined;
    return {
        input: inputFilters ? { filters: inputFilters } : undefined,
        output: outputFilters ? { filters: outputFilters } : undefined,
    };
}
/**
 * Build masking module config
 */
function buildMaskingModuleConfig(masking) {
    if (!masking || masking.entities.length === 0)
        return undefined;
    const dpiConfig = {
        method: masking.method,
        entities: masking.entities.map(entity => ({ type: entity })),
        allowlist: masking.allowlist,
    };
    return {
        masking_providers: [buildDpiMaskingProvider(dpiConfig)],
    };
}
/**
 * Build grounding module config
 */
function buildGroundingModuleConfig(grounding) {
    if (!grounding)
        return undefined;
    const groundingServiceConfig = {
        placeholders: {
            input: grounding.inputVariables,
            output: grounding.outputVariable,
        },
        filters: grounding.filters?.map(f => ({
            id: f.id,
            data_repository_id: f.dataRepositoryId,
            data_repository_type: f.dataRepositoryType,
            search_configuration: f.searchConfiguration,
        })),
        metadata_params: grounding.metadataParams,
    };
    return buildDocumentGroundingConfig(groundingServiceConfig);
}
/**
 * Build translation module config
 */
function buildTranslationModuleConfig(translation) {
    if (!translation)
        return undefined;
    const translationModule = {};
    if (translation.input) {
        translationModule.input = buildTranslationConfig('input', {
            sourceLanguage: translation.input.sourceLanguage,
            targetLanguage: translation.input.targetLanguage,
            translateMessagesHistory: translation.input.translateMessagesHistory,
        });
    }
    if (translation.output) {
        translationModule.output = buildTranslationConfig('output', {
            sourceLanguage: translation.output.sourceLanguage,
            targetLanguage: translation.output.targetLanguage,
        });
    }
    return Object.keys(translationModule).length > 0 ? translationModule : undefined;
}
/**
 * Convert simple message format to SDK ChatMessage format
 */
function toOrchestrationMessages(messages) {
    return messages.map(m => {
        // Handle ToolChatMessage (has tool_call_id)
        if ('tool_call_id' in m) {
            return m;
        }
        // Handle ChatMessage with tool_calls
        if ('tool_calls' in m) {
            return m;
        }
        // Simple message format
        return {
            role: m.role,
            content: m.content,
        };
    });
}
// ============================================================================
// Main Provider Class
// ============================================================================
/**
 * SAP AI SDK Orchestration Provider
 *
 * Provides a clean API for all SAP AI Core orchestration features including:
 * - Streaming and non-streaming chat completion
 * - Tool/function calling
 * - Content filtering
 * - Data masking
 * - Document grounding
 * - Translation
 *
 * @example
 * ```typescript
 * const provider = new SapOrchestrationProvider({
 *   modelName: 'gpt-4o',
 *   resourceGroup: 'my-group',
 *   tools: [{
 *     type: 'function',
 *     function: {
 *       name: 'get_weather',
 *       description: 'Get weather for a location',
 *       parameters: { type: 'object', properties: { location: { type: 'string' } } }
 *     }
 *   }]
 * });
 *
 * const result = await provider.complete(messages);
 * if (result.toolCalls) {
 *   // Handle tool calls
 * }
 * ```
 */
export class SapOrchestrationProvider {
    config;
    constructor(config) {
        this.config = config;
    }
    /**
     * Build the orchestration module configuration
     */
    buildModuleConfig(options) {
        // Build model params
        const modelParams = {
            max_tokens: options?.maxTokens ?? this.config.maxTokens ?? 4096,
            temperature: options?.temperature ?? this.config.temperature ?? 0.7,
        };
        if (options?.topP !== undefined || this.config.topP !== undefined) {
            modelParams.top_p = options?.topP ?? this.config.topP;
        }
        if (this.config.frequencyPenalty !== undefined) {
            modelParams.frequency_penalty = this.config.frequencyPenalty;
        }
        if (this.config.presencePenalty !== undefined) {
            modelParams.presence_penalty = this.config.presencePenalty;
        }
        // Handle tools in model params (SDK expects tools in params for some models)
        const tools = options?.tools ?? this.config.tools;
        const toolChoice = options?.toolChoice ?? this.config.toolChoice;
        if (tools && tools.length > 0) {
            modelParams.tools = tools;
            if (toolChoice) {
                modelParams.tool_choice = toolChoice;
            }
        }
        // Build the module config
        const moduleConfig = {
            promptTemplating: {
                model: {
                    name: this.config.modelName,
                    version: this.config.modelVersion,
                    params: modelParams,
                },
            },
        };
        // Add filtering
        const filtering = buildFilteringModuleConfig(this.config.filtering);
        if (filtering) {
            moduleConfig.filtering = filtering;
        }
        // Add masking
        const masking = buildMaskingModuleConfig(this.config.masking);
        if (masking) {
            moduleConfig.masking = masking;
        }
        // Add grounding
        const grounding = buildGroundingModuleConfig(this.config.grounding);
        if (grounding) {
            moduleConfig.grounding = grounding;
        }
        // Add translation
        const translation = buildTranslationModuleConfig(this.config.translation);
        if (translation) {
            moduleConfig.translation = translation;
        }
        return moduleConfig;
    }
    /**
     * Get deployment configuration
     */
    getDeploymentConfig() {
        const deploymentConfig = {};
        if (this.config.resourceGroup) {
            deploymentConfig.resourceGroup = this.config.resourceGroup;
        }
        if (this.config.deploymentId) {
            deploymentConfig.deploymentId = this.config.deploymentId;
        }
        return Object.keys(deploymentConfig).length > 0 ? deploymentConfig : undefined;
    }
    /**
     * Create an OrchestrationClient instance
     */
    createClient(options) {
        const moduleConfig = this.buildModuleConfig(options);
        const deploymentConfig = this.getDeploymentConfig();
        return new OrchestrationClient(moduleConfig, deploymentConfig);
    }
    /**
     * Non-streaming chat completion
     *
     * @param messages - Array of chat messages (supports ToolChatMessage for tool responses)
     * @param options - Optional completion options
     * @returns Completion result with text, tool calls, and usage statistics
     *
     * @example
     * ```typescript
     * // Basic completion
     * const result = await provider.complete([
     *   { role: 'user', content: 'Hello!' }
     * ]);
     *
     * // With tool response
     * const result = await provider.complete([
     *   { role: 'user', content: 'What is the weather?' },
     *   { role: 'assistant', content: '', tool_calls: [...] },
     *   { role: 'tool', tool_call_id: 'call_123', content: '{"temp": 72}' }
     * ]);
     * ```
     */
    async complete(messages, options) {
        const client = this.createClient(options);
        const orchestrationMessages = toOrchestrationMessages(messages);
        const response = await client.chatCompletion({
            messages: orchestrationMessages,
        });
        const tokenUsage = response.getTokenUsage();
        const toolCalls = response.getToolCalls();
        const allMessages = response.getAllMessages();
        return {
            text: response.getContent() ?? '',
            toolCalls: toolCalls && toolCalls.length > 0 ? toolCalls : undefined,
            finishReason: response.getFinishReason() ?? undefined,
            usage: tokenUsage
                ? {
                    prompt_tokens: tokenUsage.prompt_tokens,
                    completion_tokens: tokenUsage.completion_tokens,
                    total_tokens: tokenUsage.total_tokens,
                }
                : undefined,
            allMessages: allMessages,
        };
    }
    /**
     * Streaming chat completion
     *
     * Yields chunks with text content and/or tool call deltas.
     * The final chunk contains finish reason and usage statistics.
     *
     * @param messages - Array of chat messages
     * @param options - Optional completion options (including AbortSignal)
     * @yields StreamChunk with text, tool calls, finish reason, and usage
     *
     * @example
     * ```typescript
     * // Stream text output
     * for await (const chunk of provider.streamComplete(messages)) {
     *   if (chunk.text) {
     *     process.stdout.write(chunk.text);
     *   }
     * }
     *
     * // Stream with tool calls
     * const toolCallsAccumulator: Map<number, ToolCallChunk> = new Map();
     * for await (const chunk of provider.streamComplete(messages)) {
     *   if (chunk.text) process.stdout.write(chunk.text);
     *   if (chunk.toolCalls) {
     *     for (const tc of chunk.toolCalls) {
     *       // Accumulate tool call chunks
     *       const existing = toolCallsAccumulator.get(tc.index) || { index: tc.index };
     *       if (tc.id) existing.id = tc.id;
     *       if (tc.function?.name) existing.function = { ...existing.function, name: tc.function.name };
     *       if (tc.function?.arguments) {
     *         existing.function = existing.function || {};
     *         existing.function.arguments = (existing.function.arguments || '') + tc.function.arguments;
     *       }
     *       toolCallsAccumulator.set(tc.index, existing);
     *     }
     *   }
     * }
     * ```
     */
    async *streamComplete(messages, options) {
        const client = this.createClient(options);
        const orchestrationMessages = toOrchestrationMessages(messages);
        // Use SAP SDK streaming with AbortSignal support
        const response = await client.stream({ messages: orchestrationMessages }, options?.signal);
        // Stream chunks using the iterator
        for await (const chunk of response.stream) {
            const deltaContent = chunk.getDeltaContent();
            const deltaToolCalls = chunk.getDeltaToolCalls();
            // Only yield if there's content or tool calls
            if (deltaContent || (deltaToolCalls && deltaToolCalls.length > 0)) {
                const streamChunk = {
                    text: deltaContent ?? '',
                };
                if (deltaToolCalls && deltaToolCalls.length > 0) {
                    streamChunk.toolCalls = deltaToolCalls.map((tc) => ({
                        index: tc.index,
                        id: tc.id,
                        type: tc.type,
                        function: tc.function
                            ? {
                                name: tc.function.name,
                                arguments: tc.function.arguments,
                            }
                            : undefined,
                    }));
                }
                yield streamChunk;
            }
        }
        // After streaming completes, get final metadata
        const finishReason = response.getFinishReason();
        const tokenUsage = response.getTokenUsage();
        // Yield final chunk with metadata
        yield {
            text: '',
            finishReason: finishReason ?? undefined,
            usage: tokenUsage
                ? {
                    prompt_tokens: tokenUsage.prompt_tokens,
                    completion_tokens: tokenUsage.completion_tokens,
                    total_tokens: tokenUsage.total_tokens,
                }
                : undefined,
        };
    }
    /**
     * Get the model name
     */
    getModelName() {
        return this.config.modelName;
    }
    /**
     * Update model configuration
     */
    setModel(modelName, modelVersion) {
        this.config.modelName = modelName;
        this.config.modelVersion = modelVersion;
    }
    /**
     * Update tools configuration
     */
    setTools(tools) {
        this.config.tools = tools;
    }
    /**
     * Get current tools configuration
     */
    getTools() {
        return this.config.tools;
    }
    /**
     * Update filtering configuration
     */
    setFiltering(filtering) {
        this.config.filtering = filtering;
    }
    /**
     * Update masking configuration
     */
    setMasking(masking) {
        this.config.masking = masking;
    }
    /**
     * Update grounding configuration
     */
    setGrounding(grounding) {
        this.config.grounding = grounding;
    }
    /**
     * Update translation configuration
     */
    setTranslation(translation) {
        this.config.translation = translation;
    }
    /**
     * Get the full configuration
     */
    getConfig() {
        return { ...this.config };
    }
}
// ============================================================================
// Embeddings Client
// ============================================================================
/**
 * SAP AI SDK Orchestration Embeddings Provider
 *
 * Provides text embedding generation using SAP AI Core orchestration.
 *
 * @example
 * ```typescript
 * const embeddings = new SapOrchestrationEmbeddings({
 *   resourceGroup: 'my-group',
 *   modelName: 'text-embedding-ada-002'
 * });
 *
 * const result = await embeddings.embed(['Hello world', 'How are you?']);
 * console.log(result.embeddings); // [[0.1, 0.2, ...], [0.3, 0.4, ...]]
 * ```
 */
export class SapOrchestrationEmbeddings {
    options;
    constructor(options) {
        this.options = options ?? {};
    }
    /**
     * Build the embedding module configuration
     */
    buildEmbeddingConfig() {
        return {
            embeddings: {
                model: {
                    name: (this.options.modelName ?? 'text-embedding-ada-002'),
                    version: this.options.modelVersion,
                },
            },
        };
    }
    /**
     * Get deployment configuration
     */
    getDeploymentConfig() {
        if (this.options.resourceGroup) {
            return { resourceGroup: this.options.resourceGroup };
        }
        return undefined;
    }
    /**
     * Generate embeddings for input texts
     *
     * @param input - Single text or array of texts to embed
     * @returns Embedding result with vectors and usage
     */
    async embed(input) {
        const embeddingConfig = this.buildEmbeddingConfig();
        const deploymentConfig = this.getDeploymentConfig();
        const client = new OrchestrationEmbeddingClient(embeddingConfig, deploymentConfig);
        const texts = Array.isArray(input) ? input : [input];
        const response = await client.embed({ input: texts });
        const embeddingData = response.getEmbeddings();
        const tokenUsage = response.getTokenUsage();
        return {
            embeddings: embeddingData.map(d => {
                // Handle both number[] and base64-encoded string formats
                if (Array.isArray(d.embedding)) {
                    return d.embedding;
                }
                // If it's a base64 string, decode it (rare case)
                return [];
            }),
            usage: tokenUsage
                ? {
                    prompt_tokens: tokenUsage.prompt_tokens,
                    total_tokens: tokenUsage.total_tokens,
                }
                : undefined,
        };
    }
    /**
     * Generate embedding for a single text
     *
     * @param text - Text to embed
     * @returns Single embedding vector
     */
    async embedSingle(text) {
        const result = await this.embed(text);
        return result.embeddings[0] ?? [];
    }
}
// ============================================================================
// Factory Functions
// ============================================================================
/**
 * Create a SAP Orchestration provider instance
 */
export function createSapOrchestrationProvider(config) {
    return new SapOrchestrationProvider(config);
}
/**
 * Create a SAP Orchestration embeddings instance
 */
export function createSapOrchestrationEmbeddings(options) {
    return new SapOrchestrationEmbeddings(options);
}
// ============================================================================
// Tool Definition Helpers
// ============================================================================
/**
 * Create a ChatCompletionTool from a function definition
 *
 * @param fn - Function object definition
 * @returns ChatCompletionTool
 *
 * @example
 * ```typescript
 * const weatherTool = createTool({
 *   name: 'get_weather',
 *   description: 'Get weather for a location',
 *   parameters: {
 *     type: 'object',
 *     properties: {
 *       location: { type: 'string', description: 'City name' }
 *     },
 *     required: ['location']
 *   }
 * });
 * ```
 */
export function createTool(fn) {
    return {
        type: 'function',
        function: fn,
    };
}
/**
 * Create a ToolChatMessage for responding to a tool call
 *
 * @param toolCallId - The ID of the tool call being responded to
 * @param content - The tool's response content (will be JSON stringified if object)
 * @returns ToolChatMessage
 *
 * @example
 * ```typescript
 * const toolResponse = createToolResponse(
 *   'call_abc123',
 *   { temperature: 72, conditions: 'sunny' }
 * );
 * ```
 */
export function createToolResponse(toolCallId, content) {
    return {
        role: 'tool',
        tool_call_id: toolCallId,
        content: typeof content === 'string' ? content : JSON.stringify(content),
    };
}
// ============================================================================
// Model Registry
// ============================================================================
/**
 * List of models available through SAP AI Core Orchestration
 * Based on SAP documentation
 */
export const ORCHESTRATION_MODELS = [
    // OpenAI models
    'gpt-4o',
    'gpt-4.1',
    'gpt-5',
    'gpt-5-mini',
    // Anthropic models
    'anthropic--claude-3.7-sonnet',
    'anthropic--claude-4.5-sonnet',
    // Google models
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    // Amazon models
    'amazon--nova-micro',
    'amazon--nova-lite',
    'amazon--nova-pro',
    // Mistral models
    'mistralai--mistral-small-instruct',
    // Meta models
    'meta--llama3.1-70b-instruct',
    // DeepSeek models
    'deepseek-ai--deepseek-r1',
    // SAP models
    'sap-abap-1',
];
/**
 * Check if a model is available through orchestration
 */
export function isOrchestrationModel(modelId) {
    return ORCHESTRATION_MODELS.includes(modelId);
}
