import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'ink-testing-library';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { HelpDialog } from '../../../src/cli/tui/dialogs/HelpDialog.js';
import type { HelpEntry } from '../../../src/cli/tui/types/props.js';

const MOCK_ENTRIES: HelpEntry[] = [
  { key: 'Tab', description: 'Cycle agent forward', category: 'navigation', condition: null },
  { key: 'Ctrl+X', description: 'Activate leader mode', category: 'navigation', condition: null },
  { key: '?', description: 'Open help', category: 'dialogs', condition: null },
  { key: 'leader+n', description: 'New session', category: 'leader', condition: 'leader mode' },
  {
    key: 'leader+m',
    description: 'Open model picker',
    category: 'leader',
    condition: 'leader mode',
  },
  { key: 'i', description: 'Enter insert mode', category: 'vim', condition: 'vim normal' },
];

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('HelpDialog', () => {
  it('renders keybinding entries', () => {
    const { lastFrame } = renderWithTheme(<HelpDialog entries={MOCK_ENTRIES} onClose={vi.fn()} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Tab');
    expect(frame).toContain('Cycle agent forward');
    expect(frame).toContain('Ctrl+X');
    expect(frame).toContain('Activate leader mode');
  });

  it('renders title', () => {
    const { lastFrame } = renderWithTheme(<HelpDialog entries={MOCK_ENTRIES} onClose={vi.fn()} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Keybindings');
  });

  it('groups entries by category', () => {
    const { lastFrame } = renderWithTheme(<HelpDialog entries={MOCK_ENTRIES} onClose={vi.fn()} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Navigation');
    expect(frame).toContain('Dialogs');
    expect(frame).toContain('Leader Mode');
    expect(frame).toContain('Vim Mode');
  });

  it('shows condition text in parentheses', () => {
    const { lastFrame } = renderWithTheme(<HelpDialog entries={MOCK_ENTRIES} onClose={vi.fn()} />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('(leader mode)');
  });

  it('calls onClose on q key', () => {
    const onClose = vi.fn();
    const { stdin } = renderWithTheme(<HelpDialog entries={MOCK_ENTRIES} onClose={onClose} />);
    stdin.write('q');
    expect(onClose).toHaveBeenCalledOnce();
  });
});
