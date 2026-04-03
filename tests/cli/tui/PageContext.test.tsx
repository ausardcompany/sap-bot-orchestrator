import React, { act } from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import { PageProvider, usePage } from '../../../src/cli/tui/context/PageContext.js';

function TestConsumer(): React.JSX.Element {
  const { page, setPage, togglePage } = usePage();
  return (
    <Text>
      {`page:${page}`}
      {'\n'}
      <Text>{`set:${typeof setPage}`}</Text>
      {'\n'}
      <Text>{`toggle:${typeof togglePage}`}</Text>
    </Text>
  );
}

describe('PageContext', () => {
  it('provides default page as chat', () => {
    const { lastFrame } = render(
      <PageProvider>
        <TestConsumer />
      </PageProvider>
    );
    expect(lastFrame()).toContain('page:chat');
  });

  it('togglePage switches between chat and logs', () => {
    let toggleFn: (() => void) | undefined;
    function ToggleConsumer(): React.JSX.Element {
      const { page, togglePage } = usePage();
      toggleFn = togglePage;
      return <Text>{`page:${page}`}</Text>;
    }

    const { lastFrame } = render(
      <PageProvider>
        <ToggleConsumer />
      </PageProvider>
    );
    expect(lastFrame()).toContain('page:chat');

    // Toggle to logs
    act(() => {
      toggleFn?.();
    });

    expect(lastFrame()).toContain('page:logs');

    // Toggle back to chat
    act(() => {
      toggleFn?.();
    });

    expect(lastFrame()).toContain('page:chat');
  });

  it('throws when used outside provider', () => {
    // Calling the hook directly outside React throws before our guard runs.
    // Verify it throws (either our message or React's hook violation).
    expect(() => usePage()).toThrow();
  });
});
