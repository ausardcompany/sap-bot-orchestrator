import React from 'react';
import { Box, Text, useInput } from 'ink';

import { useTheme } from '../context/ThemeContext.js';

export interface QuitDialogProps {
  hasActiveSession: boolean;
  tokenCount: number;
  onChoice: (action: 'quit' | 'cancel' | 'save-and-quit') => void;
}

/**
 * QuitDialog — confirmation dialog when exiting with an active conversation.
 *
 * Shows session summary and offers: [Y]es quit, [N]o cancel, [S]ave & quit.
 */
export function QuitDialog({
  hasActiveSession,
  tokenCount,
  onChoice,
}: QuitDialogProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;

  useInput((input, key) => {
    const lower = input.toLowerCase();
    if (lower === 'y' || key.return) {
      onChoice('quit');
      return;
    }
    if (lower === 'n' || key.escape) {
      onChoice('cancel');
      return;
    }
    if (lower === 's') {
      onChoice('save-and-quit');
      return;
    }
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.warning}
      padding={1}
      width="50%"
      alignSelf="center"
    >
      <Text color={colors.warning} bold>
        Quit?
      </Text>

      {hasActiveSession && (
        <Box marginTop={1}>
          <Text color={colors.dimText}>
            Active session with {tokenCount > 0 ? `${tokenCount} tokens` : 'messages'}.
          </Text>
        </Box>
      )}

      <Box marginTop={1} flexDirection="column">
        <Text>
          <Text color={colors.success} bold>
            [Y]
          </Text>
          <Text color={colors.text}>es — quit</Text>
        </Text>
        <Text>
          <Text color={colors.info} bold>
            [N]
          </Text>
          <Text color={colors.text}>o — cancel</Text>
        </Text>
        <Text>
          <Text color={colors.warning} bold>
            [S]
          </Text>
          <Text color={colors.text}>ave & quit</Text>
        </Text>
      </Box>
    </Box>
  );
}
