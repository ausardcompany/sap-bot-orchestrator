import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

import { useTheme } from '../context/ThemeContext.js';
import type { LogEntry } from '../types/props.js';

export interface LogViewerProps {
  entries: LogEntry[];
  filterQuery?: string;
  levelFilter?: LogEntry['level'] | 'all';
  autoScroll?: boolean;
}

const LEVEL_COLORS: Record<LogEntry['level'], string> = {
  debug: 'dimText',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

const LEVEL_LABELS: Record<LogEntry['level'], string> = {
  debug: 'DBG',
  info: 'INF',
  warn: 'WRN',
  error: 'ERR',
};

/**
 * LogViewer — displays log entries with color-coded levels.
 *
 * Features:
 * - Color-coded log levels
 * - Timestamp + source + message
 * - Text filter input
 * - Level filter
 */
export function LogViewer({
  entries,
  filterQuery = '',
  levelFilter = 'all',
}: LogViewerProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scrollOffset, setScrollOffset] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow) {
      setScrollOffset((prev) => Math.max(0, prev - 1));
    }
    if (key.downArrow) {
      setScrollOffset((prev) => prev + 1);
    }
  });

  // Filter entries
  let filtered = entries;
  if (levelFilter !== 'all') {
    filtered = filtered.filter((e) => e.level === levelFilter);
  }
  if (filterQuery) {
    const lower = filterQuery.toLowerCase();
    filtered = filtered.filter(
      (e) => e.message.toLowerCase().includes(lower) || e.source.toLowerCase().includes(lower)
    );
  }

  const visible = filtered.slice(scrollOffset);

  if (visible.length === 0 && entries.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color={colors.dimText}>No log entries yet.</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" flexGrow={1} overflowY="hidden">
      {visible.map((entry) => {
        const colorKey = LEVEL_COLORS[entry.level];
        const color = colors[colorKey as keyof typeof colors] as string;
        const label = LEVEL_LABELS[entry.level];
        const time = new Date(entry.timestamp).toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        return (
          <Box key={entry.id}>
            <Text color={colors.dimText}>{time} </Text>
            <Text color={color} bold>
              [{label}]
            </Text>
            <Text color={colors.dimText}> {entry.source}: </Text>
            <Text color={colors.text} wrap="truncate-end">
              {entry.message}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
