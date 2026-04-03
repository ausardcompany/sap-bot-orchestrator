import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

import { useTheme } from '../context/ThemeContext.js';
import { LogViewer } from '../components/LogViewer.js';
import { StatusBar } from '../components/StatusBar.js';
import type { LogEntry } from '../types/props.js';

export interface LogsPageProps {
  entries: LogEntry[];
  agent: string;
  model: string;
  cost: { totalCost: number; currency: string };
  isStreaming: boolean;
  leaderActive: boolean;
}

const LEVEL_OPTIONS: Array<LogEntry['level'] | 'all'> = ['all', 'debug', 'info', 'warn', 'error'];

/**
 * LogsPage — dedicated debug/logs page.
 *
 * Header with "Logs" title, filter controls, LogViewer, and StatusBar.
 */
export function LogsPage({
  entries,
  agent,
  model,
  cost,
  isStreaming,
  leaderActive,
}: LogsPageProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;
  const [levelFilter, setLevelFilter] = useState<LogEntry['level'] | 'all'>('all');
  const [filterQuery, setFilterQuery] = useState('');

  useInput((input, key) => {
    // Cycle level filter with Tab
    if (key.tab) {
      setLevelFilter((prev) => {
        const idx = LEVEL_OPTIONS.indexOf(prev);
        return LEVEL_OPTIONS[(idx + 1) % LEVEL_OPTIONS.length];
      });
      return;
    }
    // Simple query editing
    if (key.backspace || key.delete) {
      setFilterQuery((prev) => prev.slice(0, -1));
      return;
    }
    if (input && input.length === 1 && !key.ctrl && !key.meta && !key.escape) {
      setFilterQuery((prev) => prev + input);
    }
  });

  return (
    <>
      {/* Header */}
      <Box
        paddingX={1}
        borderBottom
        borderStyle="single"
        borderColor={colors.border}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      >
        <Text color={colors.text} bold>
          Logs
        </Text>
        <Text color={colors.dimText}> Level: </Text>
        <Text color={colors.primary} bold>
          {levelFilter}
        </Text>
        {filterQuery && (
          <>
            <Text color={colors.dimText}> Filter: </Text>
            <Text color={colors.text}>{filterQuery}</Text>
          </>
        )}
        <Text color={colors.dimText}> ({entries.length} entries)</Text>
      </Box>

      {/* Log viewer */}
      <LogViewer entries={entries} levelFilter={levelFilter} filterQuery={filterQuery} />

      {/* Status bar */}
      <Box flexShrink={0}>
        <StatusBar
          agent={agent}
          model={model}
          cost={cost}
          isStreaming={isStreaming}
          leaderActive={leaderActive}
        />
      </Box>
    </>
  );
}
