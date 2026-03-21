import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';

import { StatusBar } from '../../../src/cli/tui/components/StatusBar.js';
import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';

function Wrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('StatusBar', () => {
  const defaultProps = {
    agent: 'code',
    model: 'claude-3-sonnet',
    cost: { totalCost: 0.0123, currency: 'USD' },
    isStreaming: false,
    leaderActive: false,
  };

  it('renders keybinding hints in normal mode', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('Tab: switch agent');
    expect(lastFrame()).toContain('Ctrl+X: leader');
    expect(lastFrame()).toContain('/help');
  });

  it('renders agent name', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('code');
  });

  it('renders formatted cost with USD symbol', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('$0.0123');
  });

  it('renders cost with EUR symbol', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} cost={{ totalCost: 1.5, currency: 'EUR' }} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('€1.5000');
  });

  it('shows "● streaming" when isStreaming is true', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} isStreaming={true} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('● streaming');
  });

  it('shows leader mode hints when leaderActive is true', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} leaderActive={true} />
      </Wrapper>
    );
    expect(lastFrame()).toContain('leader:');
    expect(lastFrame()).toContain('[n]ew session');
    expect(lastFrame()).toContain('[m]odel');
    expect(lastFrame()).toContain('[a]gent');
    expect(lastFrame()).toContain('[s]essions');
    expect(lastFrame()).toContain('[/]palette');
    expect(lastFrame()).toContain('[Esc] cancel');
  });

  it('does not show cost when streaming', () => {
    const { lastFrame } = render(
      <Wrapper>
        <StatusBar {...defaultProps} isStreaming={true} />
      </Wrapper>
    );
    expect(lastFrame()).not.toContain('$0.0123');
  });
});
