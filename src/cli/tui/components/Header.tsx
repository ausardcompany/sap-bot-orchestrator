import React from 'react';
import { Box, Text } from 'ink';

import type { HeaderProps } from '../types/props.js';
import { useTheme } from '../context/ThemeContext.js';

export type { HeaderProps };

/**
 * Format a token count into an abbreviated form: 1.2k, 45k, 1.3M
 */
function formatTokenCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}k`;
  }
  return String(count);
}

/**
 * Header — top bar of the TUI layout with self-contained border.
 *
 * ┌──────────────────────────────────────────────────┐
 * │ model-name      [agent]      session-id  1.2k tok│
 * └──────────────────────────────────────────────────┘
 */
export function Header({
  model,
  agent,
  agentColor,
  sessionId,
  tokenCount,
  autoRoute,
}: HeaderProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <Box flexDirection="row" justifyContent="space-between" width="100%">
      {/* Left: model name */}
      <Box flexShrink={1}>
        <Text color={colors.text} bold wrap="truncate-end">
          {model}
        </Text>
        {autoRoute && (
          <>
            <Text color={colors.dimText}> [</Text>
            <Text color={colors.info}>auto-route</Text>
            <Text color={colors.dimText}>]</Text>
          </>
        )}
      </Box>

      {/* Center: agent pill badge */}
      <Box flexShrink={0} marginX={1}>
        <Text backgroundColor={colors.pillBg} color={agentColor || colors.pillText} bold>
          {' '}
          {agent}{' '}
        </Text>
      </Box>

      {/* Right: session ID + abbreviated token count */}
      <Box flexShrink={0}>
        <Text color={colors.dimText}>{sessionId.slice(0, 8)}</Text>
        {tokenCount > 0 && <Text color={colors.dimText}> {formatTokenCount(tokenCount)} tok</Text>}
      </Box>
    </Box>
  );
}
