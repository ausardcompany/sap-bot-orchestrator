/**
 * Tests for the useVimMode hook.
 *
 * Since the project uses vitest with environment: 'node' (no DOM),
 * we test the hook via a lightweight React render using ink's built-in
 * React. We create a tiny component that exposes the hook state via a ref.
 */
import { describe, it, expect } from 'vitest';
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import { useVimMode } from '../../../src/cli/tui/hooks/useVimMode.js';
import type { VimModeReturn } from '../../../src/cli/tui/hooks/useVimMode.js';

// ---------------------------------------------------------------------------
// Test harness — a minimal Ink component that exposes the hook via ref
// ---------------------------------------------------------------------------

interface HarnessHandle {
  get: () => VimModeReturn;
}

interface HarnessProps {
  initialEnabled?: boolean;
}

const Harness = forwardRef<HarnessHandle, HarnessProps>(function Harness(props, ref) {
  const vim = useVimMode({ initialEnabled: props.initialEnabled });
  const vimRef = useRef(vim);
  vimRef.current = vim;

  useImperativeHandle(ref, () => ({
    get: () => vimRef.current,
  }));

  return React.createElement(Text, null, vim.modeIndicator);
});

function renderVim(initialEnabled?: boolean) {
  const refObj: { current: HarnessHandle | null } = { current: null };
  const { unmount, rerender } = render(
    React.createElement(Harness, { ref: refObj, initialEnabled })
  );

  function vim(): VimModeReturn {
    if (!refObj.current) {
      throw new Error('Harness ref not set');
    }
    return refObj.current.get();
  }

  function act(fn: () => void) {
    fn();
    // Force re-render to pick up state changes
    rerender(React.createElement(Harness, { ref: refObj, initialEnabled }));
  }

  return { vim, act, unmount };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useVimMode', () => {
  it('starts disabled by default', () => {
    const { vim, unmount } = renderVim();
    expect(vim().enabled).toBe(false);
    expect(vim().mode).toBe('insert');
    unmount();
  });

  it('starts in normal mode when enabled', () => {
    const { vim, unmount } = renderVim(true);
    expect(vim().enabled).toBe(true);
    expect(vim().mode).toBe('normal');
    unmount();
  });

  it('returns null when disabled', () => {
    const { vim, unmount } = renderVim();
    const action = vim().handleKey('i', {});
    expect(action).toBeNull();
    unmount();
  });

  it('transitions normal → insert on i', () => {
    const { vim, unmount } = renderVim(true);
    const action = vim().handleKey('i', {});
    expect(action).toEqual({ type: 'enter-mode', mode: 'insert' });
    unmount();
  });

  it('transitions insert → normal on Escape', () => {
    const { vim, act, unmount } = renderVim(true);
    // Enter insert mode
    act(() => {
      vim().handleKey('i', {});
    });
    // Exit to normal
    const action = vim().handleKey('', { escape: true });
    expect(action).toEqual({ type: 'enter-mode', mode: 'normal' });
    unmount();
  });

  it('handles motion keys in normal mode', () => {
    const { vim, unmount } = renderVim(true);
    expect(vim().handleKey('h', {})).toEqual({ type: 'move', direction: 'left' });
    expect(vim().handleKey('j', {})).toEqual({ type: 'move', direction: 'down' });
    expect(vim().handleKey('k', {})).toEqual({ type: 'move', direction: 'up' });
    expect(vim().handleKey('l', {})).toEqual({ type: 'move', direction: 'right' });
    unmount();
  });

  it('handles dd for delete line', () => {
    const { vim, act, unmount } = renderVim(true);
    // First d — sets pending operator
    let action: ReturnType<VimModeReturn['handleKey']>;
    act(() => {
      action = vim().handleKey('d', {});
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(action!).toBeNull();
    // Second d — executes delete-line
    action = vim().handleKey('d', {});
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(action!).toEqual({ type: 'delete-line' });
    unmount();
  });

  it('provides mode indicator', () => {
    const { vim, unmount } = renderVim(true);
    expect(vim().modeIndicator).toBe('-- NORMAL --');
    unmount();
  });

  it('setEnabled toggles vim mode', () => {
    const { vim, act, unmount } = renderVim();
    expect(vim().enabled).toBe(false);
    act(() => {
      vim().setEnabled(true);
    });
    expect(vim().enabled).toBe(true);
    expect(vim().mode).toBe('normal');
    unmount();
  });
});
