/**
 * Read Tool - Read files or directories
 */

import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import { defineTool, truncateOutput, MAX_LINES, type ToolResult } from '../index.js';
import {
  detectEncoding,
  decodeWithEncoding,
  isBinaryFile,
  type EncodingInfo,
} from '../encoded-io.js';

const ReadParamsSchema = z.object({
  filePath: z.string().min(1, 'filePath must not be empty').describe('Absolute path to the file or directory to read'),
  offset: z
    .number()
    .int('offset must be an integer')
    .positive('offset must be positive')
    .optional()
    .describe('Line number to start from (1-indexed)'),
  limit: z
    .number()
    .int('limit must be an integer')
    .positive('limit must be positive')
    .optional()
    .describe('Maximum number of lines to read (default: 2000)'),
  startLine: z
    .number()
    .int('startLine must be an integer')
    .positive('startLine must be positive')
    .optional()
    .describe('Alias for offset - starting line number (1-indexed)'),
  endLine: z
    .number()
    .int('endLine must be an integer')
    .positive('endLine must be positive')
    .optional()
    .describe('Ending line number (inclusive)'),
});

interface ReadFileResult {
  type: 'file';
  path: string;
  content: string;
  totalLines: number;
  shownLines: number;
  offset: number;
}

interface ReadDirResult {
  type: 'directory';
  path: string;
  entries: string;
}

type ReadResult = ReadFileResult | ReadDirResult;

// Store encoding info for later write operations
const fileEncodings = new Map<string, EncodingInfo>();

export function getFileEncoding(filePath: string): EncodingInfo | undefined {
  return fileEncodings.get(filePath);
}

export const readTool = defineTool<typeof ReadParamsSchema, ReadResult>({
  name: 'read',
  description: `Read a file or directory from the local filesystem. Returns contents with line numbers.
  
Usage:
- The filePath parameter should be an absolute path.
- By default, returns up to 2000 lines from the start of the file.
- Use offset to read from a specific line.
- For directories, returns a list of entries.
- Lines are prefixed with line numbers like "1: content".`,

  parameters: ReadParamsSchema,

  permission: {
    action: 'read',
    getResource: (params) => params.filePath,
  },

  async execute(params, context): Promise<ToolResult<ReadResult>> {
    const filePath = path.isAbsolute(params.filePath)
      ? params.filePath
      : path.join(context.workdir, params.filePath);

    try {
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // Read directory
        const entries = await fs.readdir(filePath, { withFileTypes: true });
        const formatted = entries
          .map((e) => (e.isDirectory() ? `${e.name}/` : e.name))
          .sort()
          .join('\n');

        return {
          success: true,
          data: {
            type: 'directory',
            path: filePath,
            entries: formatted,
          },
        };
      }

      // Read file
      const buffer = await fs.readFile(filePath);

      // Check for binary first
      if (isBinaryFile(buffer)) {
        return {
          success: false,
          error: `Cannot read binary file: ${filePath}`,
        };
      }

      // Detect and decode with proper encoding
      const encoding = detectEncoding(buffer);
      const content = decodeWithEncoding(buffer, encoding);

      // Cache encoding for write operations
      fileEncodings.set(filePath, encoding);

      const lines = content.split('\n');
      const totalLines = lines.length;

      // Support both offset/limit and startLine/endLine patterns
      let startIdx: number;
      let endIdx: number;

      if (params.startLine !== undefined || params.endLine !== undefined) {
        // Use startLine/endLine pattern
        const start = params.startLine ?? 1;
        const end = params.endLine ?? totalLines;

        // Validate line range
        if (start > end) {
          return {
            success: false,
            error: `startLine (${start}) cannot be greater than endLine (${end})`,
          };
        }

        if (start > totalLines) {
          return {
            success: false,
            error: `startLine (${start}) exceeds file length (${totalLines} lines)`,
          };
        }

        startIdx = Math.max(0, start - 1);
        endIdx = Math.min(end, totalLines);
      } else {
        // Use offset/limit pattern
        const offset = Math.max(1, params.offset ?? 1);
        const limit = params.limit ?? MAX_LINES;

        startIdx = offset - 1;
        endIdx = Math.min(startIdx + limit, lines.length);
      }

      const selectedLines = lines.slice(startIdx, endIdx);

      // Add line numbers
      const numberedLines = selectedLines.map((line, i) => `${startIdx + i + 1}: ${line}`);

      const output = numberedLines.join('\n');
      const { content: truncated, truncated: wasTruncated } = truncateOutput(output);

      return {
        success: true,
        data: {
          type: 'file',
          path: filePath,
          content: truncated,
          totalLines,
          shownLines: selectedLines.length,
          offset: startIdx + 1,
        },
        truncated: wasTruncated,
        hint: wasTruncated
          ? `Output truncated. Use offset=${endIdx + 1} to continue reading.`
          : undefined,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      if (message.includes('ENOENT')) {
        return {
          success: false,
          error: `File not found: ${filePath}`,
        };
      }

      if (message.includes('EACCES')) {
        return {
          success: false,
          error: `Permission denied: ${filePath}`,
        };
      }

      return {
        success: false,
        error: message,
      };
    }
  },
});
