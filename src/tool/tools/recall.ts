/**
 * Recall Tool - Search through past conversation sessions
 * Enables cross-session context recall for improved agent memory
 */

import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import { defineTool, type ToolResult } from '../index.js';

const RecallParamsSchema = z.object({
  query: z.string().describe('Search query to find relevant information from past sessions'),
  sessionLimit: z
    .number()
    .optional()
    .describe('Maximum number of sessions to search (default: 10)'),
  includeCurrentSession: z
    .boolean()
    .optional()
    .describe('Whether to include the current session in results (default: false)'),
});

interface RecallResult {
  results: Array<{
    sessionId: string;
    messageId: string;
    content: string;
    relevance: number;
    timestamp: string;
  }>;
  totalMatches: number;
}

/**
 * Calculate relevance score based on query matches
 */
function calculateRelevance(content: string, query: string): number {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const occurrences = (lowerContent.match(new RegExp(lowerQuery, 'g')) || []).length;
  const density = occurrences / (content.length / 100);
  return Math.min(density * 10, 100);
}

/**
 * Get sessions directory path
 */
function getSessionsDir(): string {
  return path.join(process.env.HOME || '~', '.alexi', 'sessions');
}

/**
 * Load and parse a session file
 */
async function loadSession(sessionPath: string): Promise<any | null> {
  try {
    const content = await fs.readFile(sessionPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export const recallTool = defineTool<typeof RecallParamsSchema, RecallResult>({
  name: 'recall',
  description: `Search through past conversation sessions to recall relevant context and information.

Use this tool when you need to:
- Remember what was discussed in previous sessions
- Find code or solutions from past conversations
- Retrieve context that might be relevant to the current task

The tool searches message content and returns the most relevant matches with context.`,

  parameters: RecallParamsSchema,

  // No permission needed - read-only operation on session history

  async execute(params, context): Promise<ToolResult<RecallResult>> {
    const sessionsDir = getSessionsDir();
    const sessionLimit = params.sessionLimit ?? 10;
    const includeCurrentSession = params.includeCurrentSession ?? false;

    try {
      // Check if sessions directory exists
      try {
        await fs.access(sessionsDir);
      } catch {
        return {
          success: true,
          data: {
            results: [],
            totalMatches: 0,
          },
          hint: 'No session history found',
        };
      }

      // Read session files
      const files = await fs.readdir(sessionsDir);
      const sessionFiles = files
        .filter((f) => f.endsWith('.json'))
        .sort()
        .reverse()
        .slice(0, sessionLimit);

      const results: Array<{
        sessionId: string;
        messageId: string;
        content: string;
        relevance: number;
        timestamp: string;
      }> = [];

      // Search through sessions
      for (const file of sessionFiles) {
        const sessionPath = path.join(sessionsDir, file);
        const session = await loadSession(sessionPath);

        if (!session || !session.messages) {
          continue;
        }

        // Skip current session if requested
        if (!includeCurrentSession && context.sessionId && file.includes(context.sessionId)) {
          continue;
        }

        // Search messages
        for (let i = 0; i < session.messages.length; i++) {
          const message = session.messages[i];
          const messageContent =
            typeof message.content === 'string' ? message.content : JSON.stringify(message.content);

          if (messageContent.toLowerCase().includes(params.query.toLowerCase())) {
            results.push({
              sessionId: session.metadata?.id || file.replace('.json', ''),
              messageId: `msg-${i}`,
              content: messageContent.slice(0, 500), // Limit content length
              relevance: calculateRelevance(messageContent, params.query),
              timestamp:
                message.timestamp?.toString() ||
                session.metadata?.created?.toString() ||
                new Date().toISOString(),
            });
          }
        }
      }

      // Sort by relevance
      results.sort((a, b) => b.relevance - a.relevance);

      // Return top 20 results
      const topResults = results.slice(0, 20);

      return {
        success: true,
        data: {
          results: topResults,
          totalMatches: results.length,
        },
        hint:
          results.length > 20
            ? `Found ${results.length} matches, showing top 20 most relevant`
            : undefined,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: `Failed to search sessions: ${message}`,
      };
    }
  },
});
