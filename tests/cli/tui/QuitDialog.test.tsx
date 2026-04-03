import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'ink-testing-library';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { QuitDialog } from '../../../src/cli/tui/dialogs/QuitDialog.js';

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('QuitDialog', () => {
  it('renders quit options', () => {
    const { lastFrame } = renderWithTheme(
      <QuitDialog hasActiveSession={true} tokenCount={500} onChoice={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Quit?');
    expect(frame).toContain('[Y]');
    expect(frame).toContain('[N]');
    expect(frame).toContain('[S]');
  });

  it('shows session info when active', () => {
    const { lastFrame } = renderWithTheme(
      <QuitDialog hasActiveSession={true} tokenCount={1234} onChoice={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('1234 tokens');
  });

  it('calls onChoice with quit on Y', () => {
    const onChoice = vi.fn();
    const { stdin } = renderWithTheme(
      <QuitDialog hasActiveSession={false} tokenCount={0} onChoice={onChoice} />
    );
    stdin.write('y');
    expect(onChoice).toHaveBeenCalledWith('quit');
  });

  it('calls onChoice with cancel on N', () => {
    const onChoice = vi.fn();
    const { stdin } = renderWithTheme(
      <QuitDialog hasActiveSession={false} tokenCount={0} onChoice={onChoice} />
    );
    stdin.write('n');
    expect(onChoice).toHaveBeenCalledWith('cancel');
  });

  it('calls onChoice with save-and-quit on S', () => {
    const onChoice = vi.fn();
    const { stdin } = renderWithTheme(
      <QuitDialog hasActiveSession={false} tokenCount={0} onChoice={onChoice} />
    );
    stdin.write('s');
    expect(onChoice).toHaveBeenCalledWith('save-and-quit');
  });
});
