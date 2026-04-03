import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { LogsPage } from '../../../src/cli/tui/pages/LogsPage.js';
import type { LogEntry } from '../../../src/cli/tui/types/props.js';

const MOCK_ENTRIES: LogEntry[] = [
  {
    id: '1',
    timestamp: Date.now(),
    level: 'info',
    source: 'tool:read',
    message: 'Read file',
    data: null,
  },
];

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('LogsPage', () => {
  it('renders logs header', () => {
    const { lastFrame } = renderWithTheme(
      <LogsPage
        entries={MOCK_ENTRIES}
        agent="code"
        model="gpt-4o"
        cost={{ totalCost: 0, currency: 'USD' }}
        isStreaming={false}
        leaderActive={false}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Logs');
    expect(frame).toContain('1 entries');
  });

  it('renders log entries', () => {
    const { lastFrame } = renderWithTheme(
      <LogsPage
        entries={MOCK_ENTRIES}
        agent="code"
        model="gpt-4o"
        cost={{ totalCost: 0, currency: 'USD' }}
        isStreaming={false}
        leaderActive={false}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Read file');
  });

  it('shows default level filter as all', () => {
    const { lastFrame } = renderWithTheme(
      <LogsPage
        entries={[]}
        agent="code"
        model="gpt-4o"
        cost={{ totalCost: 0, currency: 'USD' }}
        isStreaming={false}
        leaderActive={false}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('all');
  });
});
