import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'ink-testing-library';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockPasteFromClipboard = vi.fn();

// Capture the useInput callback so we can invoke it manually
let capturedInputHandler: ((input: string, key: Record<string, boolean>) => void) | null = null;
let capturedInputOptions: { isActive?: boolean } | undefined = undefined;

vi.mock('ink', async () => {
  const actual = await vi.importActual<typeof import('ink')>('ink');
  return {
    ...actual,
    useInput: (
      handler: (input: string, key: Record<string, boolean>) => void,
      options?: { isActive?: boolean }
    ) => {
      capturedInputHandler = handler;
      capturedInputOptions = options;
    },
  };
});

vi.mock('../../../src/cli/tui/context/AttachmentContext.js', () => ({
  useAttachments: vi.fn(() => ({
    pending: [],
    reading: false,
    error: undefined,
    pasteFromClipboard: mockPasteFromClipboard,
    addFromFile: vi.fn(),
    remove: vi.fn(),
    clearAll: vi.fn(),
    consumeAll: vi.fn(),
  })),
}));

// Import after mocks
import { useClipboardImage } from '../../../src/cli/tui/hooks/useClipboardImage.js';
import { useAttachments } from '../../../src/cli/tui/context/AttachmentContext.js';

// ---------------------------------------------------------------------------
// Test component that uses the hook
// ---------------------------------------------------------------------------

function TestComponent({ enabled }: { enabled?: boolean }): React.JSX.Element {
  useClipboardImage({ enabled });
  return <></>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mockedUseAttachments = vi.mocked(useAttachments);

function defaultAttachmentState() {
  return {
    pending: [],
    reading: false,
    error: undefined,
    pasteFromClipboard: mockPasteFromClipboard,
    addFromFile: vi.fn(),
    remove: vi.fn(),
    clearAll: vi.fn(),
    consumeAll: vi.fn(),
  };
}

const CTRL_V = '\x16';

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useClipboardImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedInputHandler = null;
    capturedInputOptions = undefined;
    mockedUseAttachments.mockReturnValue(defaultAttachmentState());
  });

  it('calls pasteFromClipboard on Ctrl+V', () => {
    render(<TestComponent />);

    expect(capturedInputHandler).not.toBeNull();
    capturedInputHandler!(CTRL_V, {});

    expect(mockPasteFromClipboard).toHaveBeenCalledTimes(1);
  });

  it('does not call pasteFromClipboard when disabled', () => {
    render(<TestComponent enabled={false} />);

    expect(capturedInputOptions).toEqual({ isActive: false });
    // Even if handler is invoked (which ink wouldn't do), verify the
    // isActive flag was set correctly
  });

  it('does not call pasteFromClipboard when already reading', () => {
    mockedUseAttachments.mockReturnValue({
      ...defaultAttachmentState(),
      reading: true,
    });

    render(<TestComponent />);

    expect(capturedInputHandler).not.toBeNull();
    capturedInputHandler!(CTRL_V, {});

    expect(mockPasteFromClipboard).not.toHaveBeenCalled();
  });

  it('sets isActive to true when enabled is explicitly true', () => {
    render(<TestComponent enabled={true} />);

    expect(capturedInputOptions).toEqual({ isActive: true });
  });

  it('does not call pasteFromClipboard for non-Ctrl+V input', () => {
    render(<TestComponent />);

    expect(capturedInputHandler).not.toBeNull();
    capturedInputHandler!('a', {});

    expect(mockPasteFromClipboard).not.toHaveBeenCalled();
  });
});
