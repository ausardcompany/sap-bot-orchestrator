import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import { ThemeProvider } from '../../../src/cli/tui/context/ThemeContext.js';
import { SplitPane } from '../../../src/cli/tui/components/SplitPane.js';

function renderWithTheme(ui: React.JSX.Element) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('SplitPane', () => {
  it('renders both panes when leftVisible is true', () => {
    const { lastFrame } = renderWithTheme(
      <SplitPane
        left={<Text>LEFT_CONTENT</Text>}
        right={<Text>RIGHT_CONTENT</Text>}
        leftVisible={true}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('LEFT_CONTENT');
    expect(frame).toContain('RIGHT_CONTENT');
  });

  it('hides left pane when leftVisible is false', () => {
    const { lastFrame } = renderWithTheme(
      <SplitPane
        left={<Text>LEFT_CONTENT</Text>}
        right={<Text>RIGHT_CONTENT</Text>}
        leftVisible={false}
      />
    );
    const frame = lastFrame() ?? '';
    expect(frame).not.toContain('LEFT_CONTENT');
    expect(frame).toContain('RIGHT_CONTENT');
  });

  it('defaults leftVisible to true', () => {
    const { lastFrame } = renderWithTheme(
      <SplitPane left={<Text>LEFT</Text>} right={<Text>RIGHT</Text>} />
    );
    const frame = lastFrame() ?? '';
    expect(frame).toContain('LEFT');
    expect(frame).toContain('RIGHT');
  });

  it('renders without crashing with custom width', () => {
    const { lastFrame } = renderWithTheme(
      <SplitPane left={<Text>L</Text>} right={<Text>R</Text>} leftWidth={20} />
    );
    expect(lastFrame()).toBeDefined();
  });

  it('renders without crashing with custom border style', () => {
    const { lastFrame } = renderWithTheme(
      <SplitPane
        left={<Text>L</Text>}
        right={<Text>R</Text>}
        borderStyle="round"
        borderColor="cyan"
      />
    );
    expect(lastFrame()).toBeDefined();
  });
});
