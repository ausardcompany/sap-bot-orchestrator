import React from 'react';
import { Box, Text } from 'ink';

import { MarkdownRenderer } from './MarkdownRenderer.js';
import { Spinner } from './Spinner.js';
import { ToolCallBlock } from './ToolCallBlock.js';
import type { ToolCallState } from '../context/ChatContext.js';
import { useTheme } from '../context/ThemeContext.js';
import type { ImageAttachmentPreview } from '../context/AttachmentContext.js';

// ---------------------------------------------------------------------------
// Types (aligned with contracts/message-area.ts MessageDisplay)
// ---------------------------------------------------------------------------

export interface MessageDisplay {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls: ToolCallState[];
  agent?: string;
  model?: string;
  tokens?: number;
  timestamp: number;
  /** Image attachments included with this message (display metadata only). */
  images?: ImageAttachmentPreview[];
}

export interface MessageAreaProps {
  /** Currently streaming text (live, incomplete assistant response) */
  streamingText: string;
  /** Whether streaming is in progress */
  isStreaming: boolean;
  /** Active tool calls being executed */
  activeToolCalls: ToolCallState[];
  /** Callback to toggle tool call expansion */
  onToggleToolCall: (toolCallId: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * MessageArea — streaming-only conversation viewport.
 *
 * Completed messages are rendered by `<Static>` in App.tsx and scroll into
 * terminal scrollback. This component only renders:
 * - Active tool calls with live status
 * - Streaming assistant text with markdown rendering
 * - Spinner placeholder while waiting for first chunk
 */
export function MessageArea({
  streamingText,
  isStreaming,
  activeToolCalls,
  onToggleToolCall,
}: MessageAreaProps): React.JSX.Element {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Box flexDirection="column" flexGrow={1} overflow="hidden">
      {/* Active tool calls */}
      {activeToolCalls.map((tc) => (
        <ToolCallBlock
          key={tc.id}
          toolName={tc.toolName}
          params={tc.params}
          status={tc.status}
          output={tc.output}
          error={tc.error}
          isExpanded={tc.isExpanded}
          onToggle={() => onToggleToolCall(tc.id)}
          diff={tc.diff}
        />
      ))}

      {/* Streaming text (live assistant response) */}
      {isStreaming && streamingText && (
        <Box paddingX={1} flexDirection="column">
          <Box>
            <Text color={colors.success} bold>
              assistant ❯
            </Text>
          </Box>
          <Box paddingLeft={2}>
            <MarkdownRenderer markdown={streamingText} isPartial={true} />
          </Box>
        </Box>
      )}

      {/* Spinner placeholder while streaming but no text yet */}
      {isStreaming && !streamingText && (
        <Box paddingX={1}>
          <Spinner label="thinking…" />
        </Box>
      )}
    </Box>
  );
}
