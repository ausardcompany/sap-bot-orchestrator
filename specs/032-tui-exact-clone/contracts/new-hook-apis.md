# Contract: New Hook APIs

## useFileChanges

```typescript
/**
 * Subscribes to the event bus for ToolExecutionCompleted events
 * and tracks file modifications (write, edit tools) in SidebarContext.
 */
function useFileChanges(): void;
// Side effect only — subscribes to event bus, updates SidebarContext
```

## useVimMode

```typescript
interface VimModeReturn {
  /** Current vim mode */
  mode: 'normal' | 'insert' | 'visual' | 'command';
  /** Whether vim mode is enabled */
  enabled: boolean;
  /** Enable/disable vim mode */
  setEnabled: (enabled: boolean) => void;
  /** Mode indicator text for display */
  modeIndicator: string;
  /** Command line buffer (for : commands) */
  commandBuffer: string;
  /** Process a key input in the current mode context */
  handleKey: (input: string, key: KeyInfo) => VimAction | null;
}

type VimAction =
  | { type: 'insert-char'; char: string }
  | { type: 'delete-char' }
  | { type: 'delete-line' }
  | { type: 'move'; direction: 'up' | 'down' | 'left' | 'right' | 'home' | 'end' }
  | { type: 'move-word'; direction: 'forward' | 'backward' }
  | { type: 'enter-mode'; mode: VimMode }
  | { type: 'submit' }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'select-start' }
  | { type: 'select-end' }
  | { type: 'yank' }
  | { type: 'paste' }
  | { type: 'command'; command: string };

function useVimMode(options?: { initialEnabled?: boolean }): VimModeReturn;
```

## useScrollPosition

```typescript
/**
 * Manages scroll state for a content area.
 * Returns scroll state and control functions.
 */
interface UseScrollPositionOptions {
  /** Total content height in lines */
  totalLines: number;
  /** Viewport height in lines */
  viewportHeight: number;
  /** Auto-scroll to bottom on new content */
  autoScroll?: boolean; // default: true
}

interface UseScrollPositionReturn {
  /** Current scroll offset from top */
  offset: number;
  /** Whether viewport is at the bottom */
  isAtBottom: boolean;
  /** Scroll up by N lines (default 1) */
  scrollUp: (lines?: number) => void;
  /** Scroll down by N lines (default 1) */
  scrollDown: (lines?: number) => void;
  /** Scroll to top */
  scrollToTop: () => void;
  /** Scroll to bottom */
  scrollToBottom: () => void;
  /** Scroll up by one page */
  pageUp: () => void;
  /** Scroll down by one page */
  pageDown: () => void;
}

function useScrollPosition(options: UseScrollPositionOptions): UseScrollPositionReturn;
```

## useLogCollector

```typescript
/**
 * Collects log entries from various sources for the LogsPage.
 * Subscribes to event bus for tool execution, API calls, etc.
 */
interface UseLogCollectorReturn {
  /** All collected log entries */
  entries: LogEntry[];
  /** Clear all entries */
  clear: () => void;
  /** Filter entries by level */
  filterByLevel: (level: LogEntry['level'] | 'all') => LogEntry[];
  /** Search entries by text */
  search: (query: string) => LogEntry[];
}

function useLogCollector(): UseLogCollectorReturn;
```
