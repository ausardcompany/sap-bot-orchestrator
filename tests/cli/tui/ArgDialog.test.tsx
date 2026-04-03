import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'ink-testing-library';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { ArgDialog } from '../../../src/cli/tui/dialogs/ArgDialog.js';
import type { ArgField } from '../../../src/cli/tui/types/props.js';

const MOCK_FIELDS: ArgField[] = [
  { name: 'name', label: 'Name', placeholder: 'Enter name', required: true },
  { name: 'description', label: 'Description', placeholder: 'Optional description' },
];

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ArgDialog', () => {
  it('renders title and fields', () => {
    const { lastFrame } = renderWithTheme(
      <ArgDialog title="New Command" fields={MOCK_FIELDS} onSubmit={vi.fn()} onCancel={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('New Command');
    expect(frame).toContain('Name');
    expect(frame).toContain('Description');
  });

  it('shows required indicator', () => {
    const { lastFrame } = renderWithTheme(
      <ArgDialog title="Test" fields={MOCK_FIELDS} onSubmit={vi.fn()} onCancel={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('*');
  });

  it('shows footer hints', () => {
    const { lastFrame } = renderWithTheme(
      <ArgDialog title="Test" fields={MOCK_FIELDS} onSubmit={vi.fn()} onCancel={vi.fn()} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Tab: next field');
    expect(frame).toContain('Enter: submit');
    expect(frame).toContain('Esc: cancel');
  });
});
