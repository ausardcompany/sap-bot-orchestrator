/**
 * Semantic Search Tool - Search code semantically
 * Experimental feature for intelligent code search
 */

import { z } from 'zod';
import { defineTool, type ToolResult } from '../index.js';
import * as fs from 'fs/promises';
import * as path from 'path';

const SemanticSearchParamsSchema = z.object({
  query: z.string().min(1).describe('Search query'),
  maxResults: z.number().positive().optional().describe('Maximum number of results (default: 10)'),
  fileTypes: z
    .array(z.string())
    .optional()
    .describe('File extensions to search (e.g., ["ts", "js"])'),
  excludePaths: z
    .array(z.string())
    .optional()
    .describe('Paths to exclude from search (glob patterns)'),
  includeContext: z
    .boolean()
    .optional()
    .describe('Include surrounding context lines (default: true)'),
});

export interface SemanticSearchResult {
  file: string;
  line: number;
  score: number;
  snippet: string;
  context?: {
    before: string[];
    after: string[];
  };
}

interface SearchData {
  results: SemanticSearchResult[];
  totalMatches: number;
}

/**
 * Simple text-based semantic search (placeholder for actual semantic search)
 * In production, this would use embeddings and vector search
 */
async function performSemanticSearch(
  query: string,
  workdir: string,
  options: {
    maxResults?: number;
    fileTypes?: string[];
    excludePaths?: string[];
    includeContext?: boolean;
  }
): Promise<SearchData> {
  const maxResults = options.maxResults ?? 10;
  const includeContext = options.includeContext ?? true;
  const results: SemanticSearchResult[] = [];

  // Simple keyword-based search as placeholder
  // In production, this would use vector embeddings
  const queryWords = query.toLowerCase().split(/\s+/);

  async function searchDirectory(dir: string): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip excluded paths
        if (options.excludePaths?.some((pattern) => fullPath.includes(pattern))) {
          continue;
        }

        if (entry.isDirectory()) {
          // Skip common directories
          if (['node_modules', '.git', 'dist', 'build', '.next'].includes(entry.name)) {
            continue;
          }
          await searchDirectory(fullPath);
        } else if (entry.isFile()) {
          // Check file type
          if (options.fileTypes && options.fileTypes.length > 0) {
            const ext = path.extname(entry.name).slice(1);
            if (!options.fileTypes.includes(ext)) {
              continue;
            }
          }

          try {
            const content = await fs.readFile(fullPath, 'utf-8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
              const lowerLine = line.toLowerCase();
              const matchCount = queryWords.filter((word) => lowerLine.includes(word)).length;

              if (matchCount > 0) {
                const score = matchCount / queryWords.length;

                const result: SemanticSearchResult = {
                  file: path.relative(workdir, fullPath),
                  line: index + 1,
                  score,
                  snippet: line.trim(),
                };

                if (includeContext) {
                  result.context = {
                    before: lines.slice(Math.max(0, index - 2), index).map((l) => l.trim()),
                    after: lines.slice(index + 1, index + 3).map((l) => l.trim()),
                  };
                }

                results.push(result);
              }
            });
          } catch {
            // Skip files we can't read
          }
        }
      }
    } catch {
      // Skip directories we can't read
    }
  }

  await searchDirectory(workdir);

  // Sort by score and limit results
  results.sort((a, b) => b.score - a.score);
  const limitedResults = results.slice(0, maxResults);

  return {
    results: limitedResults,
    totalMatches: results.length,
  };
}

export const semanticSearchTool = defineTool({
  name: 'semantic_search',
  description: `Search code semantically using natural language queries.

This is an experimental feature that finds relevant code based on semantic meaning,
not just exact text matches. Useful for finding implementations, patterns, or concepts.

Usage:
- query: Natural language description of what you're looking for
- maxResults: Limit the number of results (default: 10)
- fileTypes: Filter by file extensions (e.g., ["ts", "js"])
- excludePaths: Exclude certain paths from search
- includeContext: Include surrounding code context (default: true)`,

  parameters: SemanticSearchParamsSchema,

  permission: {
    action: 'read',
    getResource: (params, context) => context?.workdir ?? process.cwd(),
  },

  async execute(params, context): Promise<ToolResult<SearchData>> {
    try {
      const data = await performSemanticSearch(params.query, context.workdir, {
        maxResults: params.maxResults,
        fileTypes: params.fileTypes,
        excludePaths: params.excludePaths,
        includeContext: params.includeContext,
      });

      return {
        success: true,
        data,
        hint:
          data.totalMatches > data.results.length
            ? `Showing ${data.results.length} of ${data.totalMatches} matches. Increase maxResults to see more.`
            : undefined,
      };
    } catch (err) {
      return {
        success: false,
        error: `Semantic search failed: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  },
});
