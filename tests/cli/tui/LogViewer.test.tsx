import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { LogViewer } from '../../../src/cli/tui/components/LogViewer.js';
import type { LogEntry } from '../../../src/cli/tui/types/props.js';

const MOCK_ENTRIES: LogEntry[] = [
  {
    id: '1',
    timestamp: Date.now(),
    level: 'info',
    source: 'tool:read',
    message: 'Read file src/foo.ts',
    data: null,
  },
  {
    id: '2',
    timestamp: Date.now(),
    level: 'error',
    source: 'tool:bash',
    message: 'Command failed: exit 1',
    data: null,
  },
  {
    id: '3',
    timestamp: Date.now(),
    level: 'debug',
    source: 'router',
    message: 'Agent switched to code',
    data: null,
  },
  {
    id: '4',
    timestamp: Date.now(),
    level: 'warn',
    source: 'api',
    message: 'Rate limit approaching',
    data: null,
  },
];

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('LogViewer', () => {
  it('renders log entries', () => {
    const { lastFrame } = renderWithTheme(<LogViewer entries={MOCK_ENTRIES} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Read file src/foo.ts');
    expect(frame).toContain('Command failed');
    expect(frame).toContain('Agent switched');
  });

  it('shows level labels', () => {
    const { lastFrame } = renderWithTheme(<LogViewer entries={MOCK_ENTRIES} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('[INF]');
    expect(frame).toContain('[ERR]');
    expect(frame).toContain('[DBG]');
    expect(frame).toContain('[WRN]');
  });

  it('shows empty state when no entries', () => {
    const { lastFrame } = renderWithTheme(<LogViewer entries={[]} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('No log entries');
  });

  it('filters by level', () => {
    const { lastFrame } = renderWithTheme(<LogViewer entries={MOCK_ENTRIES} levelFilter="error" />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Command failed');
    expect(frame).not.toContain('Read file');
  });

  it('filters by query text', () => {
    const { lastFrame } = renderWithTheme(
      <LogViewer entries={MOCK_ENTRIES} filterQuery="router" />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Agent switched');
    expect(frame).not.toContain('Rate limit');
  });
});
