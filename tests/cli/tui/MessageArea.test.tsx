import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'ink-testing-library';

import { MessageArea } from '../../../src/cli/tui/components/MessageArea.js';
import type { ToolCallState } from '../../../src/cli/tui/context/ChatContext.js';
import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';

const makeToolCall = (overrides: Partial<ToolCallState> = {}): ToolCallState => ({
  id: 'tc-1',
  toolName: 'read',
  params: { filePath: '/tmp/test.ts' },
  status: 'running',
  output: null,
  error: null,
  isExpanded: true,
  diff: null,
  startedAt: Date.now(),
  completedAt: null,
  ...overrides,
});

describe('MessageArea', () => {
  it('renders without crashing when empty', () => {
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText=""
          isStreaming={false}
          activeToolCalls={[]}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).toBeDefined();
  });

  it('renders streaming text when isStreaming is true', () => {
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText="partial response..."
          isStreaming={true}
          activeToolCalls={[]}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).toContain('partial response...');
  });

  it('does not render streaming text when isStreaming is false', () => {
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText="should not show"
          isStreaming={false}
          activeToolCalls={[]}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).not.toContain('should not show');
  });

  it('renders a waiting indicator when streaming but no text yet', () => {
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText=""
          isStreaming={true}
          activeToolCalls={[]}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).toContain('…');
  });

  it('renders active tool calls', () => {
    const toolCalls = [makeToolCall({ toolName: 'bash', params: { command: 'ls' } })];
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText=""
          isStreaming={false}
          activeToolCalls={toolCalls}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).toContain('bash');
  });

  it('renders streaming assistant label when streaming', () => {
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText="hello"
          isStreaming={true}
          activeToolCalls={[]}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).toContain('assistant');
    expect(lastFrame()).toContain('❯');
  });

  it('renders multiple active tool calls', () => {
    const toolCalls = [
      makeToolCall({ id: 'tc-1', toolName: 'read', status: 'running' }),
      makeToolCall({ id: 'tc-2', toolName: 'write', status: 'pending' }),
    ];
    const { lastFrame } = render(
      <ThemeProvider>
        <MessageArea
          streamingText=""
          isStreaming={true}
          activeToolCalls={toolCalls}
          onToggleToolCall={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(lastFrame()).toContain('read');
    expect(lastFrame()).toContain('write');
  });
});
