/**
 * Ls Tool - List directory contents
 */

import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import { defineTool, truncateOutput, type ToolResult } from '../index.js';

const LsParamsSchema = z.object({
  path: z.string().optional().describe('Directory to list (defaults to workdir)'),
  recursive: z.boolean().optional().describe('List recursively (default: false)'),
  depth: z.number().optional().describe('Max depth for recursive listing (default: 3)'),
  ignore: z.array(z.string()).optional().describe('Additional patterns to ignore'),
});

interface LsEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
}

interface LsResult {
  entries: LsEntry[];
  totalFiles: number;
  totalDirs: number;
}

// Default patterns to ignore
const DEFAULT_IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'coverage',
  '.next',
  '__pycache__',
];

/**
 * Check if a name matches any ignore pattern
 * Supports glob-like patterns with * wildcard
 */
function matchesIgnorePattern(name: string, patterns: string[]): boolean {
  for (const pattern of patterns) {
    if (pattern === name) return true;

    // Convert glob pattern to regex
    if (pattern.includes('*')) {
      const regex = new RegExp(
        '^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'
      );
      if (regex.test(name)) return true;
    }
  }
  return false;
}

/**
 * Format entries into tree-like output
 */
function formatOutput(entries: LsEntry[], basePath: string): string {
  // Group entries by their parent directory for tree structure
  const lines: string[] = [];

  // Sort entries: directories first, then files, alphabetically
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  // Build tree structure
  interface TreeNode {
    name: string;
    type: 'file' | 'directory';
    children: Map<string, TreeNode>;
  }

  const root: TreeNode = { name: '', type: 'directory', children: new Map() };

  for (const entry of sortedEntries) {
    const relativePath = path.relative(basePath, entry.path);
    const parts = relativePath.split(path.sep);

    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (!current.children.has(part)) {
        current.children.set(part, {
          name: part,
          type: isLast ? entry.type : 'directory',
          children: new Map(),
        });
      }
      current = current.children.get(part)!;
    }
  }

  // Render tree with indentation
  function renderTree(node: TreeNode, indent: string): void {
    // Sort children: directories first, then files
    const children = Array.from(node.children.values()).sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    for (const child of children) {
      const suffix = child.type === 'directory' ? '/' : '';
      lines.push(`${indent}${child.name}${suffix}`);
      if (child.type === 'directory' && child.children.size > 0) {
        renderTree(child, indent + '  ');
      }
    }
  }

  renderTree(root, '');
  return lines.join('\n');
}

/**
 * Recursively list directory contents
 */
async function listDirectory(
  dirPath: string,
  ignorePatterns: string[],
  recursive: boolean,
  maxDepth: number,
  currentDepth: number = 0
): Promise<LsEntry[]> {
  const entries: LsEntry[] = [];

  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
      // Skip ignored patterns
      if (matchesIgnorePattern(item.name, ignorePatterns)) {
        continue;
      }

      const fullPath = path.join(dirPath, item.name);
      const isDirectory = item.isDirectory();

      let size: number | undefined;
      if (!isDirectory) {
        try {
          const stat = await fs.stat(fullPath);
          size = stat.size;
        } catch {
          // Ignore stat errors
        }
      }

      entries.push({
        name: item.name,
        path: fullPath,
        type: isDirectory ? 'directory' : 'file',
        size,
      });

      // Recurse into subdirectories if requested
      if (isDirectory && recursive && currentDepth < maxDepth) {
        const subEntries = await listDirectory(
          fullPath,
          ignorePatterns,
          recursive,
          maxDepth,
          currentDepth + 1
        );
        entries.push(...subEntries);
      }
    }
  } catch {
    // Ignore permission errors
  }

  return entries;
}

export const lsTool = defineTool<typeof LsParamsSchema, LsResult>({
  name: 'ls',
  description: `List directory contents with optional recursive listing.

Usage:
- By default, lists the current working directory
- Use recursive=true to list subdirectories
- Automatically ignores common patterns: node_modules, .git, dist, coverage, .next, __pycache__
- Add custom ignore patterns with the ignore parameter
- Output shows directories with trailing /`,

  parameters: LsParamsSchema,

  permission: {
    action: 'read',
    getResource: (params) => params.path ?? '.',
  },

  async execute(params, context): Promise<ToolResult<LsResult>> {
    const targetPath = params.path
      ? path.isAbsolute(params.path)
        ? params.path
        : path.join(context.workdir, params.path)
      : context.workdir;

    const recursive = params.recursive ?? false;
    const maxDepth = params.depth ?? 3;

    // Combine default and custom ignore patterns
    const ignorePatterns = [...DEFAULT_IGNORE_PATTERNS, ...(params.ignore ?? [])];

    try {
      // Verify the path exists and is a directory
      const stat = await fs.stat(targetPath);
      if (!stat.isDirectory()) {
        return {
          success: false,
          error: `Not a directory: ${targetPath}`,
        };
      }

      // List directory contents
      const entries = await listDirectory(targetPath, ignorePatterns, recursive, maxDepth);

      // Count files and directories
      const totalFiles = entries.filter((e) => e.type === 'file').length;
      const totalDirs = entries.filter((e) => e.type === 'directory').length;

      // Format output
      const output = formatOutput(entries, targetPath);
      const { truncated: wasTruncated } = truncateOutput(output);

      return {
        success: true,
        data: {
          entries,
          totalFiles,
          totalDirs,
        },
        truncated: wasTruncated,
        hint: wasTruncated
          ? `Output truncated. ${totalDirs} directories, ${totalFiles} files total.`
          : undefined,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      if (message.includes('ENOENT')) {
        return {
          success: false,
          error: `Directory not found: ${targetPath}`,
        };
      }

      if (message.includes('EACCES')) {
        return {
          success: false,
          error: `Permission denied: ${targetPath}`,
        };
      }

      return {
        success: false,
        error: message,
      };
    }
  },
});
