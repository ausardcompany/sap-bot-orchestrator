import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { Sidebar } from '../../../src/cli/tui/components/Sidebar.js';
import type { FileChange } from '../../../src/cli/tui/types/props.js';

const MOCK_FILES: FileChange[] = [
  { path: 'src/foo.ts', status: 'added', additions: 10, deletions: 0, timestamp: Date.now() },
  { path: 'src/bar.ts', status: 'modified', additions: 5, deletions: 3, timestamp: Date.now() },
  { path: 'src/old.ts', status: 'deleted', additions: 0, deletions: 20, timestamp: Date.now() },
];

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Sidebar', () => {
  it('renders file list with status indicators', () => {
    const { lastFrame } = renderWithTheme(
      <Sidebar
        files={MOCK_FILES}
        selectedIndex={0}
        onSelect={vi.fn()}
        onActivate={vi.fn()}
        isFocused={false}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('src/foo.ts');
    expect(frame).toContain('src/bar.ts');
    expect(frame).toContain('src/old.ts');
    expect(frame).toContain('Files (3)');
  });

  it('shows empty state when no files', () => {
    const { lastFrame } = renderWithTheme(
      <Sidebar
        files={[]}
        selectedIndex={0}
        onSelect={vi.fn()}
        onActivate={vi.fn()}
        isFocused={false}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('No changes yet');
  });

  it('shows status characters', () => {
    const { lastFrame } = renderWithTheme(
      <Sidebar
        files={MOCK_FILES}
        selectedIndex={0}
        onSelect={vi.fn()}
        onActivate={vi.fn()}
        isFocused={false}
      />
    );
    const frame = lastFrame() ?? '';
    // + for added, ~ for modified, - for deleted
    expect(frame).toContain('+');
    expect(frame).toContain('~');
    expect(frame).toContain('-');
  });

  it('renders without crashing when focused', () => {
    const { lastFrame } = renderWithTheme(
      <Sidebar
        files={MOCK_FILES}
        selectedIndex={1}
        onSelect={vi.fn()}
        onActivate={vi.fn()}
        isFocused={true}
      />
    );
    expect(lastFrame()).toBeDefined();
  });
});
