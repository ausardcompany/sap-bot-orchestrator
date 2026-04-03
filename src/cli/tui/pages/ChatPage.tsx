import React from 'react';
import { Box } from 'ink';

import { MessageArea } from '../components/MessageArea.js';
import type { MessageDisplay } from '../components/MessageArea.js';
import { InputBox } from '../components/InputBox.js';
import { StatusBar } from '../components/StatusBar.js';
import { SplitPane } from '../components/SplitPane.js';
import { Sidebar } from '../components/Sidebar.js';
import type { SlashCommand } from '../hooks/useCommands.js';
import type { ToolCallState } from '../context/ChatContext.js';
import type { SidebarContextValue } from '../context/SidebarContext.js';

export interface ChatPageProps {
  messages: MessageDisplay[];
  streamingText: string;
  isStreaming: boolean;
  activeToolCalls: ToolCallState[];
  onToggleToolCall: (id: string) => void;
  agent: string;
  agentColor: string;
  model: string;
  cost: { totalCost: number; currency: string };
  leaderActive: boolean;
  dialogIsOpen: boolean;
  onSubmit: (text: string) => void;
  commands: SlashCommand[];
  sidebar: SidebarContextValue;
}

/**
 * ChatPage — the main chat view extracted from AppLayout.
 * Contains SplitPane (sidebar + messages), InputBox, and StatusBar.
 */
export function ChatPage({
  messages,
  streamingText,
  isStreaming,
  activeToolCalls,
  onToggleToolCall,
  agent,
  agentColor,
  model,
  cost,
  leaderActive,
  dialogIsOpen,
  onSubmit,
  commands,
  sidebar,
}: ChatPageProps): React.JSX.Element {
  return (
    <>
      <SplitPane
        left={
          <Sidebar
            files={sidebar.files}
            selectedIndex={sidebar.selectedIndex}
            onSelect={sidebar.setSelectedIndex}
            onActivate={() => {
              /* TODO: show diff for activated file */
            }}
            isFocused={sidebar.visible && !leaderActive && !dialogIsOpen}
          />
        }
        right={
          <MessageArea
            messages={messages}
            streamingText={streamingText}
            isStreaming={isStreaming}
            activeToolCalls={activeToolCalls}
            onToggleToolCall={onToggleToolCall}
          />
        }
        leftVisible={sidebar.visible}
      />

      <Box flexShrink={0}>
        <InputBox
          agent={agent}
          agentColor={agentColor}
          disabled={isStreaming || dialogIsOpen}
          onSubmit={onSubmit}
          isFocused={!leaderActive && !dialogIsOpen}
          commands={commands}
        />
      </Box>

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
