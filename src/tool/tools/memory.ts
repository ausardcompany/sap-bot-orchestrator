/**
 * Memory Tools - Store and recall persistent memories for the LLM agent
 */

import { z } from 'zod';
import { defineTool } from '../index.js';
import type { ToolContext, ToolResult } from '../index.js';
import { getMemoryManager } from '../../core/memory.js';
import type { MemoryEntry, MemoryType } from '../../core/memory.js';

const MEMORY_TYPES = ['episodic', 'semantic', 'procedural', 'working'] as const;

/**
 * Format a memory entry for display
 */
function formatEntry(entry: MemoryEntry): string {
  const type = entry.type ?? 'unknown';
  const tagsStr = entry.tags && entry.tags.length > 0 ? ` [${entry.tags.join(', ')}]` : '';
  const date = new Date(entry.created).toISOString();
  const priority = entry.priority ?? 0;
  return `- **${entry.id}** (${type}, priority: ${priority})${tagsStr} — ${date}\n  ${entry.content}`;
}

// ============ store_memory ============

const StoreMemoryParamsSchema = z.object({
  content: z.string().describe('The memory content to store'),
  type: z
    .enum(MEMORY_TYPES)
    .optional()
    .describe(
      "Memory type: 'episodic', 'semantic', 'procedural', or 'working'. Defaults to 'semantic'."
    ),
  tags: z.array(z.string()).optional().describe('Tags for categorization'),
  context: z.string().optional().describe('Project or task context'),
  priority: z
    .number()
    .min(0)
    .max(10)
    .optional()
    .describe('Importance level from 0 to 10. Defaults to 5.'),
});

type StoreMemoryParams = z.infer<typeof StoreMemoryParamsSchema>;

interface StoreMemoryResult {
  id: string;
  preview: string;
}

export const storeMemoryTool = defineTool<typeof StoreMemoryParamsSchema, StoreMemoryResult>({
  name: 'store_memory',
  description:
    'Store a memory for future reference. Use this to save important decisions, facts, procedures, or current context that should persist across sessions.',
  parameters: StoreMemoryParamsSchema,

  async execute(
    params: StoreMemoryParams,
    context: ToolContext
  ): Promise<ToolResult<StoreMemoryResult>> {
    try {
      const memoryType: MemoryType = params.type ?? 'semantic';
      const priority = params.priority ?? 5;

      const entry = getMemoryManager().add(params.content, {
        type: memoryType,
        tags: params.tags,
        context: params.context,
        priority,
        source: context.sessionId,
      });

      const preview =
        entry.content.length > 100 ? `${entry.content.slice(0, 100)}...` : entry.content;

      return {
        success: true,
        data: {
          id: entry.id,
          preview,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: message };
    }
  },
});

// ============ recall_memory ============

const RecallMemoryParamsSchema = z.object({
  query: z.string().optional().describe('Search query for memory content'),
  type: z
    .enum(MEMORY_TYPES)
    .optional()
    .describe("Filter by memory type: 'episodic', 'semantic', 'procedural', or 'working'"),
  tags: z.array(z.string()).optional().describe('Filter by tags'),
  limit: z.number().optional().describe('Max results to return. Defaults to 10.'),
});

type RecallMemoryParams = z.infer<typeof RecallMemoryParamsSchema>;

interface RecallMemoryEntry {
  id: string;
  content: string;
  type: string;
  tags: string[];
  created: string;
  priority: number;
}

interface RecallMemoryResult {
  count: number;
  memories: RecallMemoryEntry[];
  formatted: string;
}

export const recallMemoryTool = defineTool<typeof RecallMemoryParamsSchema, RecallMemoryResult>({
  name: 'recall_memory',
  description:
    'Recall stored memories by searching with a query, filtering by type, or listing by tags. Use this at the start of a session or when you need to recall past decisions, procedures, or context.',
  parameters: RecallMemoryParamsSchema,

  async execute(
    params: RecallMemoryParams,
    _context: ToolContext
  ): Promise<ToolResult<RecallMemoryResult>> {
    try {
      const limit = params.limit ?? 10;

      const results = getMemoryManager().search({
        query: params.query,
        type: params.type,
        tags: params.tags,
        limit,
        sortBy: 'priority',
        sortOrder: 'desc',
      });

      const memories: RecallMemoryEntry[] = results.map((entry) => ({
        id: entry.id,
        content: entry.content,
        type: entry.type ?? 'unknown',
        tags: entry.tags ?? [],
        created: new Date(entry.created).toISOString(),
        priority: entry.priority ?? 0,
      }));

      const formatted =
        results.length === 0 ? 'No memories found.' : results.map(formatEntry).join('\n');

      return {
        success: true,
        data: {
          count: memories.length,
          memories,
          formatted,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: message };
    }
  },
});
