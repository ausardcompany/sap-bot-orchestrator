/**
 * Tool Framework with Effect Schema Support
 * Provides bridge between Zod and Effect Schema for gradual migration
 */

import { z } from 'zod';

// Re-export core types from index for backward compatibility
export type { ToolContext, ToolResult, ToolDefinition, Tool } from './index.js';
export { defineTool as defineToolZod } from './index.js';

/**
 * Placeholder types for Effect Schema compatibility
 * These allow code to reference Effect Schema patterns without requiring the dependency
 */
export interface EffectSchema<A, I = A, R = never> {
  _tag: 'Schema';
  _A: A;
  _I: I;
  _R: R;
}

export interface EffectEffect<A, E = never, R = never> {
  _tag: 'Effect';
  _A: A;
  _E: E;
  _R: R;
}

/**
 * Bridge function to convert Zod schemas to Effect-compatible structure
 * This is a placeholder for future Effect Schema migration
 */
export function zodToEffectSchema<T>(zodSchema: z.ZodType<T>): EffectSchema<T, unknown> {
  return {
    _tag: 'Schema',
    _A: undefined as unknown as T,
    _I: undefined as unknown,
    _R: undefined as never,
  };
}

/**
 * Tool parameters schema placeholder
 * Compatible with both Zod and Effect Schema patterns
 */
export const ToolParametersSchema = z.object({
  name: z.string(),
  description: z.string(),
  required: z.boolean().optional(),
});

export type ToolParameters = z.infer<typeof ToolParametersSchema>;

/**
 * Define tool with Effect Schema support (placeholder)
 * Currently delegates to Zod-based implementation
 */
export function defineTool<T>(options: {
  name: string;
  description: string;
  parameters: z.ZodType<T>;
  execute: (params: T) => Promise<any>;
}) {
  // For now, this is a passthrough to maintain compatibility
  // Future implementation will support Effect Schema
  return {
    ...options,
    parseParameters: (input: unknown) => options.parameters.parse(input),
  };
}
