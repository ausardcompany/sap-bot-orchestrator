import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

import { useTheme } from '../context/ThemeContext.js';

export interface ThemeDialogProps {
  currentTheme: 'dark' | 'light';
  onSelect: (theme: string) => void;
  onCancel: () => void;
}

interface ThemeOption {
  name: 'dark' | 'light';
  label: string;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { name: 'dark', label: 'Dark', description: 'OpenCode default dark theme' },
  { name: 'light', label: 'Light', description: 'OpenCode default light theme' },
];

/**
 * ThemeDialog — interactive theme picker with color preview.
 *
 * Up/Down to navigate, Enter to select, Escape to cancel.
 * Current theme is marked with a checkmark.
 */
export function ThemeDialog({
  currentTheme,
  onSelect,
  onCancel,
}: ThemeDialogProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;
  const [selectedIndex, setSelectedIndex] = useState(
    THEME_OPTIONS.findIndex((t) => t.name === currentTheme)
  );

  useInput((input, key) => {
    if (key.escape || input === 'q') {
      onCancel();
      return;
    }
    if (key.return) {
      const selected = THEME_OPTIONS[selectedIndex];
      if (selected) {
        onSelect(selected.name);
      }
      return;
    }
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
      return;
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(THEME_OPTIONS.length - 1, prev + 1));
      return;
    }
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.borderFocused}
      padding={1}
      width="50%"
      alignSelf="center"
    >
      <Text color={colors.text} bold>
        Theme
      </Text>

      <Box flexDirection="column" marginTop={1}>
        {THEME_OPTIONS.map((option, idx) => {
          const isSelected = idx === selectedIndex;
          const isCurrent = option.name === currentTheme;
          const bgColor = isSelected ? colors.selection : undefined;

          return (
            <Box key={option.name} backgroundColor={bgColor}>
              <Text color={isCurrent ? colors.success : colors.dimText}>
                {isCurrent ? '✓ ' : '  '}
              </Text>
              <Text color={isSelected ? colors.text : colors.dimText} bold={isSelected}>
                {option.label}
              </Text>
              <Text color={colors.dimText}> — {option.description}</Text>
            </Box>
          );
        })}
      </Box>

      <Box marginTop={1}>
        <Text color={colors.dimText}>Enter: select · Esc: cancel</Text>
      </Box>
    </Box>
  );
}
