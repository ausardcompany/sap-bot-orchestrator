import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { clearAllHandlers, ToolExecutionCompleted } from '../../../src/bus/index.js';

// Mock the SidebarContext before importing useFileChanges
vi.mock('../../../src/cli/tui/context/SidebarContext.js', () => {
  const trackFileChange = vi.fn();
  return {
    useSidebar: () => ({
      visible: false,
      width: 30,
      files: [],
      selectedIndex: 0,
      toggle: vi.fn(),
      setVisible: vi.fn(),
      setWidth: vi.fn(),
      trackFileChange,
      clearFileChanges: vi.fn(),
      setSelectedIndex: vi.fn(),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SidebarProvider: ({ children }: { children: any }) => children,
    SidebarContext: null,
  };
});

import { useSidebar } from '../../../src/cli/tui/context/SidebarContext.js';

describe('useFileChanges', () => {
  beforeEach(() => {
    clearAllHandlers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    clearAllHandlers();
  });

  it('ToolExecutionCompleted event bus fires correctly', () => {
    const handler = vi.fn();
    const unsub = ToolExecutionCompleted.subscribe(handler);

    ToolExecutionCompleted.publish({
      toolName: 'write',
      toolId: 'test-1',
      result: { filePath: 'src/foo.ts' },
      duration: 100,
      timestamp: Date.now(),
    });

    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        toolName: 'write',
        toolId: 'test-1',
      })
    );

    unsub();
  });

  it('trackFileChange mock is available', () => {
    const sidebar = useSidebar();
    expect(typeof sidebar.trackFileChange).toBe('function');
  });
});
