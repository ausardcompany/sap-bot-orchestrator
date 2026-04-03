import React from 'react';
import { Box, Text, useInput } from 'ink';

import { useTheme } from '../context/ThemeContext.js';
import type { ThemeColors } from '../theme/types.js';
import type { FileChange } from '../types/props.js';

export interface SidebarProps {
  files: FileChange[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onActivate: (path: string) => void;
  isFocused: boolean;
}

/** Status indicator character and color mapping */
function statusIndicator(
  status: FileChange['status'],
  colors: ThemeColors
): { char: string; color: string } {
  switch (status) {
    case 'added':
      return { char: '+', color: colors.success };
    case 'modified':
      return { char: '~', color: colors.warning };
    case 'deleted':
      return { char: '-', color: colors.error };
    default:
      return { char: ' ', color: colors.dimText };
  }
}

/**
 * Sidebar — file changes panel showing files modified by the agent.
 *
 * Displays file paths with status indicators (+added, ~modified, -deleted).
 * Keyboard navigation: Up/Down to select, Enter to activate.
 */
export function Sidebar({
  files,
  selectedIndex,
  onSelect,
  onActivate,
  isFocused,
}: SidebarProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;

  useInput(
    (input, key) => {
      if (!isFocused || files.length === 0) {
        return;
      }

      if (key.upArrow) {
        onSelect(Math.max(0, selectedIndex - 1));
        return;
      }
      if (key.downArrow) {
        onSelect(Math.min(files.length - 1, selectedIndex + 1));
        return;
      }
      if (key.return) {
        const file = files[selectedIndex];
        if (file) {
          onActivate(file.path);
        }
        return;
      }
    },
    { isActive: isFocused }
  );

  if (files.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color={colors.dimText} bold>
          Files
        </Text>
        <Text color={colors.dimText}>No changes yet</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color={colors.text} bold>
        Files ({files.length})
      </Text>
      {files.map((file, idx) => {
        const isSelected = idx === selectedIndex;
        const { char, color } = statusIndicator(file.status, colors);
        const bgColor = isSelected ? colors.selection : undefined;

        return (
          <Box key={file.path}>
            <Text backgroundColor={bgColor} color={color}>
              {char}{' '}
            </Text>
            <Text
              backgroundColor={bgColor}
              color={isSelected ? colors.text : colors.dimText}
              wrap="truncate-end"
            >
              {file.path}
            </Text>
            {(file.additions > 0 || file.deletions > 0) && (
              <Text backgroundColor={bgColor} color={colors.dimText}>
                {' '}
                {file.additions > 0 ? <Text color={colors.success}>+{file.additions}</Text> : null}
                {file.deletions > 0 ? <Text color={colors.error}>-{file.deletions}</Text> : null}
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
