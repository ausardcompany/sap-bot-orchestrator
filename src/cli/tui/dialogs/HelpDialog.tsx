import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

import { useTheme } from '../context/ThemeContext.js';
import type { HelpEntry } from '../types/props.js';

export interface HelpDialogProps {
  entries: HelpEntry[];
  onClose: () => void;
}

const CATEGORY_LABELS: Record<HelpEntry['category'], string> = {
  navigation: 'Navigation',
  dialogs: 'Dialogs',
  chat: 'Chat',
  leader: 'Leader Mode',
  input: 'Input',
  vim: 'Vim Mode',
};

const CATEGORY_ORDER: HelpEntry['category'][] = [
  'navigation',
  'chat',
  'leader',
  'dialogs',
  'input',
  'vim',
];

/**
 * HelpDialog — keybinding overlay showing all available keybindings grouped by category.
 *
 * Dismiss with Escape or `q`.
 * Scrollable if entries exceed viewport.
 */
export function HelpDialog({ entries, onClose }: HelpDialogProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scrollOffset, setScrollOffset] = useState(0);

  useInput((input, key) => {
    if (key.escape || input === 'q') {
      onClose();
      return;
    }
    if (key.upArrow) {
      setScrollOffset((prev) => Math.max(0, prev - 1));
      return;
    }
    if (key.downArrow) {
      setScrollOffset((prev) => prev + 1);
      return;
    }
  });

  // Group entries by category
  const grouped = new Map<HelpEntry['category'], HelpEntry[]>();
  for (const entry of entries) {
    const list = grouped.get(entry.category) ?? [];
    list.push(entry);
    grouped.set(entry.category, list);
  }

  // Build flat list of lines for rendering
  const lines: Array<{ type: 'header'; text: string } | { type: 'entry'; entry: HelpEntry }> = [];
  for (const category of CATEGORY_ORDER) {
    const categoryEntries = grouped.get(category);
    if (!categoryEntries || categoryEntries.length === 0) {
      continue;
    }
    lines.push({ type: 'header', text: CATEGORY_LABELS[category] });
    for (const entry of categoryEntries) {
      lines.push({ type: 'entry', entry });
    }
  }

  // Find max key width for alignment
  const maxKeyWidth = Math.max(...entries.map((e) => e.key.length), 10);

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.borderFocused}
      padding={1}
      width="60%"
      alignSelf="center"
    >
      {/* Title */}
      <Box justifyContent="center" marginBottom={1}>
        <Text color={colors.text} bold>
          Keybindings
        </Text>
        <Text color={colors.dimText}> (Esc to close)</Text>
      </Box>

      {/* Scrollable content */}
      {lines.slice(scrollOffset).map((line, idx) => {
        if (line.type === 'header') {
          return (
            <Box key={`h-${idx}`} marginTop={idx > 0 ? 1 : 0}>
              <Text color={colors.primary} bold>
                {line.text}
              </Text>
            </Box>
          );
        }

        const { entry } = line;
        const paddedKey = entry.key.padEnd(maxKeyWidth);

        return (
          <Box key={`e-${idx}`}>
            <Text color={colors.textEmphasized} bold>
              {paddedKey}
            </Text>
            <Text color={colors.dimText}> {entry.description}</Text>
            {entry.condition && (
              <Text color={colors.dimText} italic>
                {' '}
                ({entry.condition})
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
