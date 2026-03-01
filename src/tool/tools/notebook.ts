/**
 * Notebook Tools - Read and edit Jupyter Notebook (.ipynb) files
 */

import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import { defineTool, type ToolResult } from '../index.js';

// Notebook cell structure
interface NotebookCell {
  cell_type: 'code' | 'markdown' | 'raw';
  source: string[];
  metadata?: Record<string, unknown>;
  outputs?: unknown[];
  execution_count?: number | null;
}

// Notebook structure
interface Notebook {
  cells: NotebookCell[];
  metadata: {
    kernelspec?: { name: string; display_name: string };
    language_info?: { name: string };
  };
  nbformat: number;
  nbformat_minor: number;
}

// notebookread parameters
const NotebookReadParamsSchema = z.object({
  filePath: z.string().describe('Path to the .ipynb file'),
  cellIndex: z.number().optional().describe('Specific cell index to read (0-based)'),
  cellType: z
    .enum(['code', 'markdown', 'all'])
    .optional()
    .describe('Filter by cell type (default: all)'),
});

// notebookread result
interface NotebookReadResult {
  filePath: string;
  totalCells: number;
  cells: Array<{
    index: number;
    type: 'code' | 'markdown' | 'raw';
    source: string;
    hasOutput: boolean;
  }>;
  kernel?: string;
  language?: string;
}

// notebookedit parameters
const NotebookEditParamsSchema = z.object({
  filePath: z.string().describe('Path to the .ipynb file'),
  cellIndex: z.number().describe('Cell index to edit (0-based)'),
  newSource: z.string().describe('New cell content'),
  cellType: z.enum(['code', 'markdown', 'raw']).optional().describe('Change cell type (optional)'),
});

// notebookedit result
interface NotebookEditResult {
  filePath: string;
  cellIndex: number;
  previousType: string;
  newType: string;
  success: boolean;
}

/**
 * Parse notebook file and validate structure
 */
async function parseNotebook(filePath: string): Promise<Notebook> {
  const content = await fs.readFile(filePath, 'utf-8');

  let notebook: Notebook;
  try {
    notebook = JSON.parse(content);
  } catch {
    throw new Error('Invalid notebook format: not valid JSON');
  }

  if (!notebook.cells || !Array.isArray(notebook.cells)) {
    throw new Error('Invalid notebook format: missing cells array');
  }

  return notebook;
}

/**
 * notebookread Tool - Read cells from a Jupyter notebook
 */
export const notebookReadTool = defineTool<typeof NotebookReadParamsSchema, NotebookReadResult>({
  name: 'notebookread',
  description: `Read cells from a Jupyter notebook (.ipynb file).

Usage:
- Returns all cells by default, or filter by cell type.
- Use cellIndex to read a specific cell (0-based index).
- Cell source is returned as a single string (lines joined).
- Returns kernel and language info from notebook metadata.`,

  parameters: NotebookReadParamsSchema,

  permission: {
    action: 'read',
    getResource: (params) => params.filePath,
  },

  async execute(params, context): Promise<ToolResult<NotebookReadResult>> {
    const filePath = path.isAbsolute(params.filePath)
      ? params.filePath
      : path.join(context.workdir, params.filePath);

    try {
      const notebook = await parseNotebook(filePath);
      const totalCells = notebook.cells.length;

      // Handle specific cell index
      if (params.cellIndex !== undefined) {
        if (params.cellIndex < 0 || params.cellIndex >= totalCells) {
          return {
            success: false,
            error: `Cell index ${params.cellIndex} out of range (0-${totalCells - 1})`,
          };
        }

        const cell = notebook.cells[params.cellIndex];
        return {
          success: true,
          data: {
            filePath,
            totalCells,
            cells: [
              {
                index: params.cellIndex,
                type: cell.cell_type,
                source: cell.source.join(''),
                hasOutput: Array.isArray(cell.outputs) && cell.outputs.length > 0,
              },
            ],
            kernel: notebook.metadata.kernelspec?.display_name,
            language: notebook.metadata.language_info?.name,
          },
        };
      }

      // Filter cells by type
      const cellType = params.cellType ?? 'all';
      const filteredCells = notebook.cells
        .map((cell, index) => ({
          index,
          type: cell.cell_type,
          source: cell.source.join(''),
          hasOutput: Array.isArray(cell.outputs) && cell.outputs.length > 0,
        }))
        .filter((cell) => cellType === 'all' || cell.type === cellType);

      return {
        success: true,
        data: {
          filePath,
          totalCells,
          cells: filteredCells,
          kernel: notebook.metadata.kernelspec?.display_name,
          language: notebook.metadata.language_info?.name,
        },
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

/**
 * notebookedit Tool - Edit cells in a Jupyter notebook
 */
export const notebookEditTool = defineTool<typeof NotebookEditParamsSchema, NotebookEditResult>({
  name: 'notebookedit',
  description: `Edit a cell in a Jupyter notebook (.ipynb file).

Usage:
- Specify cellIndex (0-based) to identify the cell to edit.
- Provide newSource with the new cell content.
- Optionally change cell type with cellType parameter.
- For code cells, outputs and execution_count are cleared on edit.`,

  parameters: NotebookEditParamsSchema,

  permission: {
    action: 'write',
    getResource: (params) => params.filePath,
  },

  async execute(params, context): Promise<ToolResult<NotebookEditResult>> {
    const filePath = path.isAbsolute(params.filePath)
      ? params.filePath
      : path.join(context.workdir, params.filePath);

    try {
      const notebook = await parseNotebook(filePath);
      const totalCells = notebook.cells.length;

      // Validate cell index
      if (params.cellIndex < 0 || params.cellIndex >= totalCells) {
        return {
          success: false,
          error: `Cell index ${params.cellIndex} out of range (0-${totalCells - 1})`,
        };
      }

      const cell = notebook.cells[params.cellIndex];
      const previousType = cell.cell_type;
      const newType = params.cellType ?? previousType;

      // Update cell source - split by newlines but preserve them
      // Notebook format stores each line including the newline character,
      // except for the last line which may not have a trailing newline
      const lines = params.newSource.split(/(?<=\n)/);
      cell.source = lines;

      // Update cell type if specified
      if (params.cellType) {
        cell.cell_type = params.cellType;
      }

      // Clear outputs and execution_count for code cells
      if (cell.cell_type === 'code') {
        cell.outputs = [];
        cell.execution_count = null;
      }

      // Write the notebook back with 1-space indent (standard for notebooks)
      await fs.writeFile(filePath, JSON.stringify(notebook, null, 1), 'utf-8');

      return {
        success: true,
        data: {
          filePath,
          cellIndex: params.cellIndex,
          previousType,
          newType,
          success: true,
        },
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
