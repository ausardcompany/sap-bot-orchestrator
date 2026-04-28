import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Fzf } from 'fzf';
import type { FzfResultItem } from 'fzf';
import * as fs from 'fs/promises';
import * as path from 'path';

import { useTheme } from '../context/ThemeContext.js';

export interface FilePickerProps {
  rootDir: string;
  onSelect: (paths: string[]) => void;
  onCancel: () => void;
  multiSelect?: boolean;
  include?: string[];
  exclude?: string[];
}

const MAX_RESULTS = 15;
const MAX_DEPTH = 5;

/**
 * Recursively list files in a directory up to a given depth.
 */
async function listFiles(
  dir: string,
  rootDir: string,
  depth: number,
  exclude: string[]
): Promise<string[]> {
  if (depth <= 0) {
    return [];
  }
  const result: string[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const name = entry.name;
      if (name.startsWith('.') || exclude.includes(name)) {
        continue;
      }
      const fullPath = path.join(dir, name);
      const relativePath = path.relative(rootDir, fullPath);
      if (entry.isDirectory()) {
        const children = await listFiles(fullPath, rootDir, depth - 1, exclude);
        result.push(...children);
      } else {
        result.push(relativePath);
      }
    }
  } catch {
    // Permission denied or other error — skip
  }
  return result;
}

/**
 * FilePicker — fuzzy file search dialog using fzf.
 *
 * Features:
 * - Fuzzy search with matched character highlighting
 * - Multi-select with Space
 * - Up/Down navigation
 * - Enter to accept, Escape to cancel
 */
export function FilePicker({
  rootDir,
  onSelect,
  onCancel,
  multiSelect = true,
  exclude = [],
}: FilePickerProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;

  const [query, setQuery] = useState('');
  const [allFiles, setAllFiles] = useState<string[]>([]);
  const [results, setResults] = useState<Array<{ item: string; positions: Set<number> }>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load file list on mount
  useEffect(() => {
    const defaultExclude = ['node_modules', 'dist', 'build', '.git', 'coverage', ...exclude];
    void listFiles(rootDir, rootDir, MAX_DEPTH, defaultExclude).then((files) => {
      setAllFiles(files);
      setIsLoading(false);
    });
  }, [rootDir, exclude]);

  // Run fuzzy search when query or file list changes
  useEffect(() => {
    if (allFiles.length === 0) {
      setResults([]);
      return;
    }

    if (query.length === 0) {
      setResults(allFiles.slice(0, MAX_RESULTS).map((f) => ({ item: f, positions: new Set() })));
      return;
    }

    const fzf = new Fzf(allFiles);
    const fzfResults: FzfResultItem<string>[] = fzf.find(query);
    setResults(
      fzfResults.slice(0, MAX_RESULTS).map((r: FzfResultItem<string>) => ({
        item: r.item,
        positions: r.positions,
      }))
    );
    setSelectedIndex(0);
  }, [query, allFiles]);

  useInput((input, key) => {
    if (key.escape) {
      onCancel();
      return;
    }
    if (key.return) {
      if (multiSelect && selectedFiles.size > 0) {
        onSelect([...selectedFiles]);
      } else if (results[selectedIndex]) {
        onSelect([results[selectedIndex].item]);
      }
      return;
    }
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
      return;
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(results.length - 1, prev + 1));
      return;
    }
    if (input === ' ' && multiSelect) {
      const current = results[selectedIndex];
      if (current) {
        setSelectedFiles((prev) => {
          const next = new Set(prev);
          if (next.has(current.item)) {
            next.delete(current.item);
          } else {
            next.add(current.item);
          }
          return next;
        });
      }
      return;
    }
    if (key.backspace || key.delete) {
      setQuery((prev) => prev.slice(0, -1));
      return;
    }
    if (input && input.length === 1 && !key.ctrl && !key.meta) {
      setQuery((prev) => prev + input);
    }
  });

  const renderHighlighted = useCallback(
    (text: string, positions: Set<number>): React.JSX.Element => {
      const chars = text.split('').map((ch, idx) => {
        if (positions.has(idx)) {
          return (
            <Text key={idx} color={colors.primary} bold>
              {ch}
            </Text>
          );
        }
        return (
          <Text key={idx} color={colors.text}>
            {ch}
          </Text>
        );
      });
      return <Text>{chars}</Text>;
    },
    [colors]
  );

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.borderFocused}
      padding={1}
      width="70%"
      alignSelf="center"
    >
      {/* Title */}
      <Text color={colors.text} bold>
        File Picker
      </Text>

      {/* Search input */}
      <Box marginTop={1}>
        <Text color={colors.primary}>❯ </Text>
        <Text color={colors.text}>{query}</Text>
        <Text color={colors.cursor}>█</Text>
      </Box>

      {/* Results */}
      <Box flexDirection="column" marginTop={1}>
        {isLoading ? (
          <Text color={colors.dimText}>Loading files...</Text>
        ) : results.length === 0 ? (
          <Text color={colors.dimText}>No matches</Text>
        ) : (
          results.map((result, idx) => {
            const isHighlighted = idx === selectedIndex;
            const isSelected = selectedFiles.has(result.item);
            const bgColor = isHighlighted ? colors.selection : undefined;
            const checkmark = multiSelect ? (isSelected ? '✓ ' : '  ') : '';

            return (
              <Box key={result.item} backgroundColor={bgColor}>
                {multiSelect && (
                  <Text color={isSelected ? colors.success : colors.dimText}>{checkmark}</Text>
                )}
                {renderHighlighted(result.item, result.positions)}
              </Box>
            );
          })
        )}
      </Box>

      {/* Footer hints */}
      <Box marginTop={1}>
        <Text color={colors.dimText}>
          {multiSelect ? 'Space: toggle · ' : ''}Enter: select · Esc: cancel
        </Text>
      </Box>
    </Box>
  );
}
