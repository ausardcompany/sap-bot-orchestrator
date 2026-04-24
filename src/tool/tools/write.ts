/**
 * Write Tool - Write or create files
 */

import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import { defineTool, type ToolResult } from '../index.js';
import { encodeWithEncoding, type EncodingResult } from '../encoded-io.js';

const WriteParamsSchema = z.object({
  filePath: z.string().describe('Absolute path to the file to write'),
  content: z.string().describe('Content to write to the file'),
  encoding: z
    .object({
      encoding: z.string(),
      confidence: z.number(),
      content: z.string(),
      hasBOM: z.boolean(),
    })
    .optional()
    .describe('Optional encoding metadata to preserve original file encoding'),
});

interface WriteResult {
  path: string;
  bytesWritten: number;
  created: boolean;
}

export const writeTool = defineTool<typeof WriteParamsSchema, WriteResult>({
  name: 'write',
  description: `Write content to a file. Creates the file if it doesn't exist, or overwrites if it does.

Usage:
- Use absolute paths
- Parent directories will be created if needed
- Prefer editing existing files over creating new ones`,

  parameters: WriteParamsSchema,

  permission: {
    action: 'write',
    getResource: (params, context) => {
      // Resolve relative paths to absolute using workdir
      if (path.isAbsolute(params.filePath)) {
        return params.filePath;
      }
      return path.join(context?.workdir || process.cwd(), params.filePath);
    },
  },

  async execute(params, context): Promise<ToolResult<WriteResult>> {
    const filePath = path.isAbsolute(params.filePath)
      ? params.filePath
      : path.join(context.workdir, params.filePath);

    try {
      // Check if file exists
      let exists = false;
      try {
        await fs.access(filePath);
        exists = true;
      } catch {
        // File doesn't exist
      }

      // Create parent directories if needed
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });

      // Write the file
      // kilocode_change: preserve original file encoding when writing
      if (params.encoding && params.encoding.encoding !== 'UTF-8') {
        const buffer = encodeWithEncoding(
          params.content,
          params.encoding.encoding,
          params.encoding.hasBOM,
        );
        await fs.writeFile(filePath, buffer);
      } else if (params.encoding?.hasBOM && params.encoding.encoding === 'UTF-8') {
        // kilocode_change: preserve UTF-8 BOM through read/write round-trip
        const buffer = encodeWithEncoding(params.content, 'UTF-8', true);
        await fs.writeFile(filePath, buffer);
      } else {
        await fs.writeFile(filePath, params.content, 'utf-8');
      }
      const bytesWritten = Buffer.byteLength(params.content, 'utf-8');

      const toolResult = {
        success: true,
        data: {
          path: filePath,
          bytesWritten,
          created: !exists,
        },
      };

      context.gitManager?.onFileChanged(
        filePath,
        'write',
        !exists ? 'created file' : 'overwrote file'
      );

      return toolResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

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
