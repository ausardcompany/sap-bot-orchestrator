import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { notebookReadTool, notebookEditTool } from '../notebook.js';

describe('notebook tools', () => {
  let tempDir: string;
  let notebookPath: string;

  const createNotebook = (cells: any[], metadata: any = {}): string => {
    return JSON.stringify(
      {
        cells,
        metadata: {
          kernelspec: { name: 'python3', display_name: 'Python 3' },
          language_info: { name: 'python' },
          ...metadata,
        },
        nbformat: 4,
        nbformat_minor: 5,
      },
      null,
      1
    );
  };

  const createCodeCell = (source: string[], outputs: any[] = []): any => ({
    cell_type: 'code',
    source,
    metadata: {},
    outputs,
    execution_count: outputs.length > 0 ? 1 : null,
  });

  const createMarkdownCell = (source: string[]): any => ({
    cell_type: 'markdown',
    source,
    metadata: {},
  });

  const createRawCell = (source: string[]): any => ({
    cell_type: 'raw',
    source,
    metadata: {},
  });

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'notebook-test-'));
    notebookPath = path.join(tempDir, 'test.ipynb');
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  const context = {
    workdir: '/tmp',
  };

  describe('notebookread tool', () => {
    describe('read all cells', () => {
      it('should read all cells from a notebook', async () => {
        const notebook = createNotebook([
          createCodeCell(['print("Hello")\\n', 'print("World")']),
          createMarkdownCell(['# Title\\n', 'Some text']),
          createCodeCell(['x = 1']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe({ filePath: notebookPath }, context);

        expect(result.success).toBe(true);
        expect(result.data?.totalCells).toBe(3);
        expect(result.data?.cells).toHaveLength(3);
        expect(result.data?.cells[0].type).toBe('code');
        expect(result.data?.cells[0].source).toBe('print("Hello")\\nprint("World")');
        expect(result.data?.cells[1].type).toBe('markdown');
        expect(result.data?.cells[2].type).toBe('code');
        expect(result.data?.kernel).toBe('Python 3');
        expect(result.data?.language).toBe('python');
      });

      it('should return empty cells array for notebook with no cells', async () => {
        const notebook = createNotebook([]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe({ filePath: notebookPath }, context);

        expect(result.success).toBe(true);
        expect(result.data?.totalCells).toBe(0);
        expect(result.data?.cells).toHaveLength(0);
      });

      it('should detect cells with outputs', async () => {
        const notebook = createNotebook([
          createCodeCell(['print("Hello")'], [{ output_type: 'stream', text: ['Hello\n'] }]),
          createCodeCell(['x = 1'], []),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe({ filePath: notebookPath }, context);

        expect(result.success).toBe(true);
        expect(result.data?.cells[0].hasOutput).toBe(true);
        expect(result.data?.cells[1].hasOutput).toBe(false);
      });
    });

    describe('read specific cell by index', () => {
      it('should read a specific cell by index', async () => {
        const notebook = createNotebook([
          createCodeCell(['cell 0']),
          createMarkdownCell(['cell 1']),
          createCodeCell(['cell 2']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellIndex: 1 },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cells).toHaveLength(1);
        expect(result.data?.cells[0].index).toBe(1);
        expect(result.data?.cells[0].type).toBe('markdown');
        expect(result.data?.cells[0].source).toBe('cell 1');
      });

      it('should read first cell (index 0)', async () => {
        const notebook = createNotebook([
          createCodeCell(['first cell']),
          createMarkdownCell(['second cell']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellIndex: 0 },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cells[0].index).toBe(0);
        expect(result.data?.cells[0].source).toBe('first cell');
      });

      it('should read last cell', async () => {
        const notebook = createNotebook([
          createCodeCell(['first']),
          createMarkdownCell(['second']),
          createCodeCell(['last cell']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellIndex: 2 },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cells[0].index).toBe(2);
        expect(result.data?.cells[0].source).toBe('last cell');
      });
    });

    describe('filter by cell type', () => {
      it('should filter code cells only', async () => {
        const notebook = createNotebook([
          createCodeCell(['code 1']),
          createMarkdownCell(['markdown 1']),
          createCodeCell(['code 2']),
          createRawCell(['raw 1']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellType: 'code' },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.totalCells).toBe(4);
        expect(result.data?.cells).toHaveLength(2);
        expect(result.data?.cells[0].index).toBe(0);
        expect(result.data?.cells[0].source).toBe('code 1');
        expect(result.data?.cells[1].index).toBe(2);
        expect(result.data?.cells[1].source).toBe('code 2');
      });

      it('should filter markdown cells only', async () => {
        const notebook = createNotebook([
          createCodeCell(['code 1']),
          createMarkdownCell(['markdown 1']),
          createMarkdownCell(['markdown 2']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellType: 'markdown' },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cells).toHaveLength(2);
        expect(result.data?.cells[0].type).toBe('markdown');
        expect(result.data?.cells[1].type).toBe('markdown');
      });

      it('should return all cells with cellType "all"', async () => {
        const notebook = createNotebook([
          createCodeCell(['code']),
          createMarkdownCell(['markdown']),
          createRawCell(['raw']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellType: 'all' },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cells).toHaveLength(3);
      });

      it('should return empty array when no cells match filter', async () => {
        const notebook = createNotebook([createCodeCell(['code only'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellType: 'markdown' },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cells).toHaveLength(0);
      });
    });

    describe('invalid notebook handling', () => {
      it('should return error for invalid JSON', async () => {
        await fs.writeFile(notebookPath, 'not valid json {{{');

        const result = await notebookReadTool.executeUnsafe({ filePath: notebookPath }, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid notebook format: not valid JSON');
      });

      it('should return error for missing cells array', async () => {
        await fs.writeFile(notebookPath, JSON.stringify({ metadata: {}, nbformat: 4 }));

        const result = await notebookReadTool.executeUnsafe({ filePath: notebookPath }, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid notebook format: missing cells array');
      });

      it('should return error for cells not being an array', async () => {
        await fs.writeFile(
          notebookPath,
          JSON.stringify({ cells: 'not an array', metadata: {}, nbformat: 4 })
        );

        const result = await notebookReadTool.executeUnsafe({ filePath: notebookPath }, context);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid notebook format: missing cells array');
      });
    });

    describe('cell index out of range', () => {
      it('should return error for negative cell index', async () => {
        const notebook = createNotebook([createCodeCell(['cell'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellIndex: -1 },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Cell index -1 out of range (0-0)');
      });

      it('should return error for cell index beyond last cell', async () => {
        const notebook = createNotebook([createCodeCell(['cell 0']), createCodeCell(['cell 1'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellIndex: 5 },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Cell index 5 out of range (0-1)');
      });

      it('should return error for cell index on empty notebook', async () => {
        const notebook = createNotebook([]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookReadTool.executeUnsafe(
          { filePath: notebookPath, cellIndex: 0 },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Cell index 0 out of range (0--1)');
      });
    });

    describe('file not found', () => {
      it('should return error for non-existent file', async () => {
        const nonExistentPath = path.join(tempDir, 'nonexistent.ipynb');

        const result = await notebookReadTool.executeUnsafe({ filePath: nonExistentPath }, context);

        expect(result.success).toBe(false);
        expect(result.error).toContain('File not found');
      });
    });
  });

  describe('notebookedit tool', () => {
    describe('edit cell content', () => {
      it('should edit cell content', async () => {
        const notebook = createNotebook([
          createCodeCell(['original content']),
          createMarkdownCell(['other cell']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'new content',
          },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.cellIndex).toBe(0);
        expect(result.data?.previousType).toBe('code');
        expect(result.data?.newType).toBe('code');

        // Verify the file was updated
        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].source.join('')).toBe('new content');
      });

      it('should handle multiline content', async () => {
        const notebook = createNotebook([createCodeCell(['old'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'line 1\nline 2\nline 3',
          },
          context
        );

        expect(result.success).toBe(true);

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].source.join('')).toBe('line 1\nline 2\nline 3');
      });

      it('should clear outputs and execution_count for code cells', async () => {
        const notebook = createNotebook([
          createCodeCell(['print("hello")'], [{ output_type: 'stream', text: ['hello\n'] }]),
        ]);
        await fs.writeFile(notebookPath, notebook);

        // Verify outputs exist before edit
        const before = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(before.cells[0].outputs).toHaveLength(1);
        expect(before.cells[0].execution_count).toBe(1);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'print("world")',
          },
          context
        );

        expect(result.success).toBe(true);

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].outputs).toEqual([]);
        expect(updated.cells[0].execution_count).toBeNull();
      });

      it('should preserve other cells when editing', async () => {
        const notebook = createNotebook([
          createCodeCell(['cell 0']),
          createMarkdownCell(['cell 1']),
          createCodeCell(['cell 2']),
        ]);
        await fs.writeFile(notebookPath, notebook);

        await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 1,
            newSource: 'modified cell 1',
          },
          context
        );

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].source.join('')).toBe('cell 0');
        expect(updated.cells[1].source.join('')).toBe('modified cell 1');
        expect(updated.cells[2].source.join('')).toBe('cell 2');
      });
    });

    describe('edit cell type', () => {
      it('should change cell type from code to markdown', async () => {
        const notebook = createNotebook([createCodeCell(['# heading'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: '# heading',
            cellType: 'markdown',
          },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.previousType).toBe('code');
        expect(result.data?.newType).toBe('markdown');

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].cell_type).toBe('markdown');
      });

      it('should change cell type from markdown to code', async () => {
        const notebook = createNotebook([createMarkdownCell(['x = 1'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'x = 1',
            cellType: 'code',
          },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.previousType).toBe('markdown');
        expect(result.data?.newType).toBe('code');

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].cell_type).toBe('code');
        // Should have outputs and execution_count cleared
        expect(updated.cells[0].outputs).toEqual([]);
        expect(updated.cells[0].execution_count).toBeNull();
      });

      it('should change cell type to raw', async () => {
        const notebook = createNotebook([createCodeCell(['content'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'content',
            cellType: 'raw',
          },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.newType).toBe('raw');

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].cell_type).toBe('raw');
      });

      it('should keep type unchanged when cellType not specified', async () => {
        const notebook = createNotebook([createMarkdownCell(['text'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'new text',
          },
          context
        );

        expect(result.success).toBe(true);
        expect(result.data?.previousType).toBe('markdown');
        expect(result.data?.newType).toBe('markdown');

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].cell_type).toBe('markdown');
      });
    });

    describe('invalid notebook handling', () => {
      it('should return error for invalid JSON', async () => {
        await fs.writeFile(notebookPath, 'not valid json');

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'content',
          },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid notebook format: not valid JSON');
      });

      it('should return error for missing cells array', async () => {
        await fs.writeFile(notebookPath, JSON.stringify({ metadata: {} }));

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'content',
          },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid notebook format: missing cells array');
      });
    });

    describe('cell index out of range', () => {
      it('should return error for negative cell index', async () => {
        const notebook = createNotebook([createCodeCell(['cell'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: -1,
            newSource: 'new',
          },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Cell index -1 out of range (0-0)');
      });

      it('should return error for cell index beyond last cell', async () => {
        const notebook = createNotebook([createCodeCell(['cell'])]);
        await fs.writeFile(notebookPath, notebook);

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 10,
            newSource: 'new',
          },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Cell index 10 out of range (0-0)');
      });
    });

    describe('file not found', () => {
      it('should return error for non-existent file', async () => {
        const nonExistentPath = path.join(tempDir, 'nonexistent.ipynb');

        const result = await notebookEditTool.executeUnsafe(
          {
            filePath: nonExistentPath,
            cellIndex: 0,
            newSource: 'content',
          },
          context
        );

        expect(result.success).toBe(false);
        expect(result.error).toContain('File not found');
      });
    });

    describe('preserve metadata', () => {
      it('should preserve notebook metadata after edit', async () => {
        const notebook = createNotebook([createCodeCell(['content'])], {
          kernelspec: { name: 'julia', display_name: 'Julia 1.8' },
          language_info: { name: 'julia' },
          custom_meta: { key: 'value' },
        });
        await fs.writeFile(notebookPath, notebook);

        await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'new content',
          },
          context
        );

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.metadata.kernelspec.name).toBe('julia');
        expect(updated.metadata.language_info.name).toBe('julia');
        expect(updated.metadata.custom_meta).toEqual({ key: 'value' });
        expect(updated.nbformat).toBe(4);
        expect(updated.nbformat_minor).toBe(5);
      });

      it('should preserve cell metadata after edit', async () => {
        const cell = createCodeCell(['content']);
        cell.metadata = { scrolled: true, tags: ['important'] };
        const notebook = createNotebook([cell]);
        await fs.writeFile(notebookPath, notebook);

        await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'new content',
          },
          context
        );

        const updated = JSON.parse(await fs.readFile(notebookPath, 'utf-8'));
        expect(updated.cells[0].metadata.scrolled).toBe(true);
        expect(updated.cells[0].metadata.tags).toEqual(['important']);
      });
    });

    describe('JSON formatting', () => {
      it('should write notebook with 1-space indent', async () => {
        const notebook = createNotebook([createCodeCell(['content'])]);
        await fs.writeFile(notebookPath, notebook);

        await notebookEditTool.executeUnsafe(
          {
            filePath: notebookPath,
            cellIndex: 0,
            newSource: 'new content',
          },
          context
        );

        const raw = await fs.readFile(notebookPath, 'utf-8');
        // Check that it uses 1-space indent (lines should start with single space)
        const lines = raw.split('\n');
        const indentedLines = lines.filter((l) => l.startsWith(' ') && !l.startsWith('  '));
        expect(indentedLines.length).toBeGreaterThan(0);
      });
    });
  });
});
