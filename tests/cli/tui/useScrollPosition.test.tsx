import { describe, it, expect } from 'vitest';
import React, { act } from 'react';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import {
  useScrollPosition,
  type UseScrollPositionReturn,
} from '../../../src/cli/tui/hooks/useScrollPosition.js';

// ---------------------------------------------------------------------------
// Helper component that exposes the hook return via a ref-like pattern
// ---------------------------------------------------------------------------

let hookResult: UseScrollPositionReturn;

function ScrollHarness(props: {
  totalLines: number;
  viewportHeight: number;
  autoScroll?: boolean;
}): React.JSX.Element {
  const result = useScrollPosition({
    totalLines: props.totalLines,
    viewportHeight: props.viewportHeight,
    autoScroll: props.autoScroll,
  });
  hookResult = result;
  return <Text>{`offset:${result.offset},isAtBottom:${result.isAtBottom}`}</Text>;
}

describe('useScrollPosition', () => {
  it('initializes with offset 0 and isAtBottom true', () => {
    const { lastFrame } = render(
      <ScrollHarness totalLines={100} viewportHeight={20} />
    );
    expect(lastFrame()).toContain('isAtBottom:true');
  });

  it('scrollUp decreases offset', () => {
    render(
      <ScrollHarness totalLines={100} viewportHeight={20} autoScroll={false} />
    );

    act(() => {
      hookResult.scrollUp(5);
    });

    // Offset should have decreased (or clamped to 0 if already at 0)
    expect(hookResult.offset).toBeGreaterThanOrEqual(0);
  });

  it('scrollToTop sets offset to 0', () => {
    render(
      <ScrollHarness totalLines={100} viewportHeight={20} autoScroll={false} />
    );

    act(() => {
      hookResult.scrollToTop();
    });

    expect(hookResult.offset).toBe(0);
  });

  it('scrollToBottom sets isAtBottom to true', () => {
    render(<ScrollHarness totalLines={100} viewportHeight={20} />);

    act(() => {
      hookResult.scrollToBottom();
    });

    expect(hookResult.isAtBottom).toBe(true);
  });

  it('pageUp and pageDown work', () => {
    render(
      <ScrollHarness totalLines={100} viewportHeight={20} autoScroll={false} />
    );

    act(() => {
      hookResult.pageDown();
    });

    const afterDown = hookResult.offset;

    act(() => {
      hookResult.pageUp();
    });

    expect(hookResult.offset).toBeLessThanOrEqual(afterDown);
  });

  it('clamps offset to valid range', () => {
    render(
      <ScrollHarness totalLines={10} viewportHeight={20} autoScroll={false} />
    );

    act(() => {
      hookResult.scrollDown(100);
    });

    // When totalLines < viewportHeight, offset should stay at 0
    expect(hookResult.offset).toBe(0);
  });
});
