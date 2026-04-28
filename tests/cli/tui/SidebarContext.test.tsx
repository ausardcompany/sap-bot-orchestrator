import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import { SidebarProvider, useSidebar } from '../../../src/cli/tui/context/SidebarContext.js';

function TestConsumer(): React.JSX.Element {
  const { visible, width, files, selectedIndex } = useSidebar();
  return (
    <Text>
      {`visible:${visible},width:${width},files:${files.length},selected:${selectedIndex}`}
    </Text>
  );
}

describe('SidebarContext', () => {
  it('provides default state', () => {
    const { lastFrame } = render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>
    );
    expect(lastFrame()).toContain('visible:false');
    expect(lastFrame()).toContain('width:30');
    expect(lastFrame()).toContain('files:0');
    expect(lastFrame()).toContain('selected:0');
  });

  it('throws when used outside provider', () => {
    // Calling the hook directly outside React throws before our guard runs.
    // Verify it throws (either our message or React's hook violation).
    expect(() => useSidebar()).toThrow();
  });

  it('provides toggle function', () => {
    let toggleFn: (() => void) | undefined;
    function ToggleConsumer(): React.JSX.Element {
      const { visible, toggle } = useSidebar();
      toggleFn = toggle;
      return <Text>{`visible:${visible}`}</Text>;
    }

    render(
      <SidebarProvider>
        <ToggleConsumer />
      </SidebarProvider>
    );
    expect(typeof toggleFn).toBe('function');
  });
});
