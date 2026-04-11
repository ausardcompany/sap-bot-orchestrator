/**
 * Tool Schema Definitions
 * Centralized type definitions for tool system with branded IDs
 */

import { z } from 'zod';

// Branded ID types for type safety
export const ToolID = z.string().describe('Unique identifier for a tool');
export type ToolID = z.infer<typeof ToolID>;

export const ToolCallID = z.string().describe('Unique identifier for a tool call instance');
export type ToolCallID = z.infer<typeof ToolCallID>;

export const ToolResultID = z.string().describe('Unique identifier for a tool result');
export type ToolResultID = z.infer<typeof ToolResultID>;

// Tool execution state
export const ToolExecutionState = z.enum([
  'pending',
  'running',
  'completed',
  'failed',
  'cancelled',
]);
export type ToolExecutionState = z.infer<typeof ToolExecutionState>;

// Tool permission level
export const ToolPermissionLevel = z.enum(['allow', 'ask', 'deny']);
export type ToolPermissionLevel = z.infer<typeof ToolPermissionLevel>;

// Tool metadata for registration
export const ToolMetadata = z.object({
  id: ToolID,
  name: z.string(),
  description: z.string(),
  category: z.string().optional(),
  requiresPermission: z.boolean(),
  defaultPermission: ToolPermissionLevel,
});
export type ToolMetadata = z.infer<typeof ToolMetadata>;
