/**
 * Provider Index - SAP AI SDK Orchestration Only
 *
 * This module exports the SapOrchestrationProvider as the sole provider
 * for all LLM operations through SAP AI Core.
 */
import { env } from "../config/env.js";
import { SapOrchestrationProvider } from "./sapOrchestration.js";
// Re-export everything from sapOrchestration
export { SapOrchestrationProvider, SapOrchestrationEmbeddings, createSapOrchestrationProvider, createSapOrchestrationEmbeddings, createTool, createToolResponse, isOrchestrationModel, ORCHESTRATION_MODELS, } from "./sapOrchestration.js";
/**
 * Get the SAP Orchestration provider for the specified model
 *
 * @param modelId - The model identifier (e.g., 'gpt-4o', 'anthropic--claude-3.7-sonnet')
 * @returns SapOrchestrationProvider instance configured for the model
 */
export function getProviderForModel(modelId) {
    const resourceGroup = env("AICORE_RESOURCE_GROUP");
    return new SapOrchestrationProvider({
        modelName: modelId,
        resourceGroup: resourceGroup || undefined,
    });
}
/**
 * Get the default model from environment
 */
export function getDefaultModel() {
    return env("AICORE_MODEL") ?? "gpt-4o";
}
