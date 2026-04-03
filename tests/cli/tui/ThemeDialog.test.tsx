import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'ink-testing-library';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { ThemeDialog } from '../../../src/cli/tui/dialogs/ThemeDialog.js';

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ThemeDialog', () => {
  it('renders theme options', () => {
    const { lastFrame } = renderWithTheme(
      <ThemeDialog currentTheme="dark" onSelect={vi.fn()} onCancel={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Theme');
    expect(frame).toContain('Dark');
    expect(frame).toContain('Light');
  });

  it('shows checkmark for current theme', () => {
    const { lastFrame } = renderWithTheme(
      <ThemeDialog currentTheme="dark" onSelect={vi.fn()} onCancel={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('✓');
  });

  it('shows footer hints', () => {
    const { lastFrame } = renderWithTheme(
      <ThemeDialog currentTheme="dark" onSelect={vi.fn()} onCancel={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Enter: select');
    expect(frame).toContain('Esc: cancel');
  });
});
