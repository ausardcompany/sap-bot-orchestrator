import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';

import { Header } from '../../../src/cli/tui/components/Header.js';
import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';

function renderHeader(overrides: Record<string, unknown> = {}) {
  const defaultProps = {
    model: 'claude-3-sonnet',
    agent: 'code',
    agentColor: 'green',
    sessionId: 'abcdef1234567890',
    tokenCount: 0,
    autoRoute: false,
    ...overrides,
  };
  return render(
    <ThemeProvider>
      <Header {...defaultProps} />
    </ThemeProvider>
  );
}

describe('Header', () => {
  it('renders the model name', () => {
    const { lastFrame } = renderHeader();
    expect(lastFrame()).toContain('claude-3-sonnet');
  });

  it('renders the agent name', () => {
    const { lastFrame } = renderHeader();
    expect(lastFrame()).toContain('code');
  });

  it('renders the first 8 characters of session ID', () => {
    const { lastFrame } = renderHeader();
    expect(lastFrame()).toContain('abcdef12');
    // Full ID should not be shown
    expect(lastFrame()).not.toContain('abcdef1234567890');
  });

  it('does not render token count when tokenCount is 0', () => {
    const { lastFrame } = renderHeader({ tokenCount: 0 });
    expect(lastFrame()).not.toContain('tok');
  });

  it('renders token count when tokenCount > 0', () => {
    const { lastFrame } = renderHeader({ tokenCount: 1234 });
    // Component uses abbreviated format: 1.2k instead of 1,234
    expect(lastFrame()).toContain('1.2k tok');
  });

  it('renders auto-route indicator when autoRoute is true', () => {
    const { lastFrame } = renderHeader({ autoRoute: true });
    expect(lastFrame()).toContain('auto-route');
  });

  it('does not render auto-route indicator when autoRoute is false', () => {
    const { lastFrame } = renderHeader({ autoRoute: false });
    expect(lastFrame()).not.toContain('auto-route');
  });

  it('renders different agent names', () => {
    for (const agent of ['debug', 'plan', 'explore', 'orchestrator'] as const) {
      const { lastFrame } = renderHeader({ agent });
      expect(lastFrame()).toContain(agent);
    }
  });
});
