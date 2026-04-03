import React from 'react';
import { Box, Text } from 'ink';

import type { StatusBarProps } from '../types/props.js';
import { useTheme } from '../context/ThemeContext.js';
import { Spinner } from './Spinner.js';

export type { StatusBarProps };

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

const SEPARATOR = ' │ ';

/**
 * StatusBar — single-line bar at the very bottom of the TUI.
 * Uses segment separators and background color to match upstream.
 */
export function StatusBar({
  agent,
  model: _model,
  cost,
  isStreaming,
  leaderActive,
}: StatusBarProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;

  const currencySymbol = CURRENCY_SYMBOLS[cost.currency] ?? `${cost.currency} `;
  const costStr = `${currencySymbol}${cost.totalCost.toFixed(4)}`;

  if (leaderActive) {
    return (
      <Box paddingX={1} backgroundColor={colors.statusBarBg}>
        <Text color={colors.warning}>
          leader: [n]ew{SEPARATOR}[m]odel{SEPARATOR}[a]gent{SEPARATOR}[s]essions{SEPARATOR}[f]iles
          {SEPARATOR}[t]heme{SEPARATOR}[l]ogs{SEPARATOR}[h]elp{SEPARATOR}[b]sidebar{SEPARATOR}[q]uit
          {SEPARATOR}[Esc] cancel
        </Text>
      </Box>
    );
  }

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      paddingX={1}
      backgroundColor={colors.statusBarBg}
    >
      {/* Left: keybinding hints with separators */}
      <Box>
        <Text color={colors.dimText}>
          Tab: agent{SEPARATOR}Ctrl+X: leader{SEPARATOR}?: help
        </Text>
      </Box>

      {/* Center: agent */}
      <Box>
        <Text color={colors.dimText}>{agent}</Text>
      </Box>

      {/* Right: cost or streaming indicator */}
      <Box>
        {isStreaming ? (
          <Box>
            <Spinner />
            <Text color={colors.info}> streaming</Text>
          </Box>
        ) : (
          <Text color={colors.dimText}>{costStr}</Text>
        )}
      </Box>
    </Box>
  );
}
