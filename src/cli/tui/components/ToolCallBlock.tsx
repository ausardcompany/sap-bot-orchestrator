import React from 'react';
import { Box, Text } from 'ink';

import { useTheme } from '../context/ThemeContext.js';
import { DiffView } from './DiffView.js';
import { Spinner } from './Spinner.js';
import type { DiffData } from '../context/ChatContext.js';

export interface ToolCallBlockProps {
  toolName: string;
  params: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output: string | null;
  error: string | null;
  isExpanded: boolean;
  onToggle: () => void;
  diff: DiffData | null;
  /** Duration in ms (set on completion) */
  duration?: number;
}

const MAX_OUTPUT_LINES = 20;
const TRUNCATED_OUTPUT_LINES = 15;

/** Tool-specific icons */
const TOOL_ICONS: Record<string, string> = {
  read: '📄',
  write: '✏️',
  edit: '✏️',
  grep: '🔍',
  glob: '🔍',
  bash: '⚡',
  fetch: '🌐',
};

/**
 * Format tool params as key-value pairs, not raw JSON.
 */
function formatParamsPreview(params: Record<string, unknown>): string {
  const entries = Object.entries(params);
  if (entries.length === 0) {
    return '';
  }
  // Show the most relevant param (usually filePath, command, pattern, etc.)
  const keyParams = ['filePath', 'path', 'file', 'command', 'pattern', 'query'];
  for (const key of keyParams) {
    if (key in params) {
      const val = String(params[key]);
      return val.length > 50 ? `${key}: ${val.slice(0, 50)}…` : `${key}: ${val}`;
    }
  }
  // Fallback: first param
  const [key, val] = entries[0];
  const valStr = String(val);
  return valStr.length > 50 ? `${key}: ${valStr.slice(0, 50)}…` : `${key}: ${valStr}`;
}

function truncateOutput(text: string): { text: string; truncated: boolean; remaining: number } {
  const lines = text.split('\n');
  if (lines.length > MAX_OUTPUT_LINES) {
    const remaining = lines.length - TRUNCATED_OUTPUT_LINES;
    return {
      text: lines.slice(0, TRUNCATED_OUTPUT_LINES).join('\n'),
      truncated: true,
      remaining,
    };
  }
  return { text, truncated: false, remaining: 0 };
}

function formatDuration(ms: number): string {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }
  return `${ms}ms`;
}

export function ToolCallBlock({
  toolName,
  params,
  status,
  output,
  error,
  isExpanded,
  onToggle,
  diff,
  duration,
}: ToolCallBlockProps): React.JSX.Element {
  void onToggle;
  const { theme } = useTheme();
  const { colors } = theme;

  const paramsPreview = formatParamsPreview(params);
  const icon = TOOL_ICONS[toolName] ?? '🔧';

  // Auto-expand on failure
  const shouldShow = isExpanded || status === 'failed';

  const renderStatusIcon = (): React.JSX.Element => {
    if (status === 'pending') {
      return <Text color={colors.dimText}>○ </Text>;
    }
    if (status === 'running') {
      return <Spinner />;
    }
    if (status === 'completed') {
      return <Text color={colors.success}>✓ </Text>;
    }
    return <Text color={colors.error}>✗ </Text>;
  };

  const renderStatusLabel = (): React.JSX.Element => {
    if (status === 'pending') {
      return <Text color={colors.dimText}> pending</Text>;
    }
    if (status === 'running') {
      return <Text color={colors.warning}> running…</Text>;
    }
    if (status === 'completed') {
      const dur = duration !== undefined ? ` ${formatDuration(duration)}` : '';
      return <Text color={colors.dimText}> done{dur}</Text>;
    }
    return <Text color={colors.error}> failed</Text>;
  };

  const renderBody = (): React.JSX.Element | null => {
    if (!shouldShow) {
      return null;
    }

    let bodyContent: React.JSX.Element | null = null;

    if (error !== null) {
      bodyContent = <Text color={colors.error}>{error}</Text>;
    } else if (diff !== null) {
      bodyContent = <DiffView filePath={diff.filePath} hunks={diff.hunks} />;
    } else if (toolName === 'bash' && output !== null) {
      const command = typeof params.command === 'string' ? params.command : '';
      const { text: truncatedText, truncated, remaining } = truncateOutput(output);
      bodyContent = (
        <Box flexDirection="column">
          <Text color={colors.toolOutput}>
            <Text bold>$ {command}</Text>
            {'\n'}
            {truncatedText}
          </Text>
          {truncated ? <Text color={colors.dimText}>... ({remaining} more lines)</Text> : null}
        </Box>
      );
    } else if (output !== null) {
      const { text: truncatedText, truncated, remaining } = truncateOutput(output);
      bodyContent = (
        <Box flexDirection="column">
          <Text color={colors.toolOutput}>{truncatedText}</Text>
          {truncated ? <Text color={colors.dimText}>... ({remaining} more lines)</Text> : null}
        </Box>
      );
    }

    if (bodyContent === null) {
      return null;
    }

    return (
      <Box
        borderLeft
        borderStyle="single"
        borderColor={colors.borderDim}
        paddingLeft={1}
        borderTop={false}
        borderRight={false}
        borderBottom={false}
      >
        {bodyContent}
      </Box>
    );
  };

  return (
    <Box flexDirection="column" paddingLeft={2}>
      <Box>
        {renderStatusIcon()}
        <Text>{icon} </Text>
        <Text color={colors.toolHeader} bold>
          {toolName}
        </Text>
        {paramsPreview && <Text color={colors.dimText}> {paramsPreview}</Text>}
        {renderStatusLabel()}
      </Box>
      {renderBody()}
    </Box>
  );
}
