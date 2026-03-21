import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'ink-testing-library';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../../../src/cli/tui/context/AttachmentContext.js', () => ({
  useAttachments: vi.fn(),
}));

vi.mock('../../../src/cli/tui/context/ThemeContext.js', () => ({
  useTheme: vi.fn(() => ({
    theme: {
      colors: {
        warning: 'yellow',
        error: 'red',
        info: 'cyan',
      },
    },
    toggleTheme: vi.fn(),
    setTheme: vi.fn(),
  })),
}));

vi.mock('../../../src/utils/imageValidation.js', () => ({
  formatSize: (bytes: number) => `${bytes} B`,
}));

// Import after mocks
import { AttachmentBar } from '../../../src/cli/tui/components/AttachmentBar.js';
import { useAttachments } from '../../../src/cli/tui/context/AttachmentContext.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mockedUseAttachments = vi.mocked(useAttachments);

function defaultAttachmentState() {
  return {
    pending: [],
    reading: false,
    error: undefined,
    pasteFromClipboard: vi.fn(),
    addFromFile: vi.fn(),
    remove: vi.fn(),
    clearAll: vi.fn(),
    consumeAll: vi.fn(),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AttachmentBar', () => {
  beforeEach(() => {
    mockedUseAttachments.mockReturnValue(defaultAttachmentState());
  });

  it('returns null when no attachments, no reading, no error', () => {
    const { lastFrame } = render(<AttachmentBar />);
    expect(lastFrame()).toBe('');
  });

  it('shows "Reading clipboard..." when reading is true', () => {
    mockedUseAttachments.mockReturnValue({
      ...defaultAttachmentState(),
      reading: true,
    });

    const { lastFrame } = render(<AttachmentBar />);
    expect(lastFrame()).toContain('Reading clipboard...');
  });

  it('shows error message when error is set', () => {
    mockedUseAttachments.mockReturnValue({
      ...defaultAttachmentState(),
      error: 'Clipboard is empty',
    });

    const { lastFrame } = render(<AttachmentBar />);
    expect(lastFrame()).toContain('Clipboard is empty');
  });

  it('shows single image with format and size', () => {
    mockedUseAttachments.mockReturnValue({
      ...defaultAttachmentState(),
      pending: [
        {
          id: 'att-1',
          data: Buffer.alloc(0),
          format: 'png',
          sizeBytes: 2048,
          source: 'clipboard' as const,
          createdAt: Date.now(),
        },
      ],
    });

    const { lastFrame } = render(<AttachmentBar />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('1 image');
    expect(frame).toContain('[PNG 2048 B]');
    expect(frame).toContain('Esc to remove');
  });

  it('shows multiple images with format and size', () => {
    mockedUseAttachments.mockReturnValue({
      ...defaultAttachmentState(),
      pending: [
        {
          id: 'att-1',
          data: Buffer.alloc(0),
          format: 'png',
          sizeBytes: 1024,
          source: 'clipboard' as const,
          createdAt: Date.now(),
        },
        {
          id: 'att-2',
          data: Buffer.alloc(0),
          format: 'jpeg',
          sizeBytes: 4096,
          source: 'file' as const,
          filePath: '/tmp/photo.jpg',
          createdAt: Date.now(),
        },
      ],
    });

    const { lastFrame } = render(<AttachmentBar />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('2 images');
    expect(frame).toContain('[PNG 1024 B]');
    expect(frame).toContain('[JPEG 4096 B]');
    expect(frame).toContain('Esc to remove');
  });

  it('does not show error when reading is true even if error is set', () => {
    mockedUseAttachments.mockReturnValue({
      ...defaultAttachmentState(),
      reading: true,
      error: 'Some error',
    });

    const { lastFrame } = render(<AttachmentBar />);
    const frame = lastFrame() ?? '';
    expect(frame).toContain('Reading clipboard...');
    expect(frame).not.toContain('Some error');
  });
});
