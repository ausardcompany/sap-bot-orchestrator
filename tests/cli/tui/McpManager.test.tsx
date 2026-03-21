import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';

import { McpManager, type McpServerInfo } from '../../../src/cli/tui/dialogs/McpManager.js';
import { DialogProvider } from '../../../src/cli/tui/context/DialogContext.js';
import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Wrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <ThemeProvider>
      <DialogProvider>{children}</DialogProvider>
    </ThemeProvider>
  );
}

const connectedServer: McpServerInfo = {
  name: 'filesystem',
  url: 'stdio://filesystem',
  status: 'connected',
  toolCount: 5,
};

const disconnectedServer: McpServerInfo = {
  name: 'github',
  url: 'stdio://github',
  status: 'disconnected',
  toolCount: 0,
};

const errorServer: McpServerInfo = {
  name: 'broken-server',
  url: 'stdio://broken',
  status: 'error',
  toolCount: 0,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('McpManager', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[]} />
      </Wrapper>
    );
    expect(lastFrame()).toBeTruthy();
  });

  it('shows the "MCP Manager" title', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[]} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('MCP Manager');
  });

  it('shows empty state message when no servers', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[]} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('No MCP servers configured.');
  });

  it('renders connected server with green dot, name, status, and tool count', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[connectedServer]} />
      </Wrapper>
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('●');
    expect(frame).toContain('filesystem');
    expect(frame).toContain('connected');
    expect(frame).toContain('5 tools');
  });

  it('renders disconnected server with hollow dot, name, and status', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[disconnectedServer]} />
      </Wrapper>
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('○');
    expect(frame).toContain('github');
    expect(frame).toContain('disconnected');
  });

  it('renders error server with X marker, name, and status', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[errorServer]} />
      </Wrapper>
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('✗');
    expect(frame).toContain('broken-server');
    expect(frame).toContain('error');
  });

  it('renders multiple servers of different statuses', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[connectedServer, disconnectedServer, errorServer]} />
      </Wrapper>
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('filesystem');
    expect(frame).toContain('github');
    expect(frame).toContain('broken-server');
    expect(frame).toContain('●');
    expect(frame).toContain('○');
    expect(frame).toContain('✗');
  });

  it('shows "[Esc] Close" hint', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[]} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('[Esc] Close');
  });

  it('does not show empty state message when servers exist', () => {
    const { lastFrame } = render(
      <Wrapper>
        <McpManager servers={[connectedServer]} />
      </Wrapper>
    );
    expect(lastFrame()).not.toContain('No MCP servers configured.');
  });
});
