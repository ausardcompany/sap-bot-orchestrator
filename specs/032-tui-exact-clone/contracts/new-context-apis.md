# Contract: New Context APIs

## PageContext

```typescript
interface PageContextValue {
  /** Currently active page */
  page: 'chat' | 'logs';
  /** Switch to a different page */
  setPage: (page: 'chat' | 'logs') => void;
  /** Toggle between chat and logs */
  togglePage: () => void;
}

// Usage:
const { page, setPage, togglePage } = usePageContext();
```

## SidebarContext

```typescript
interface SidebarContextValue {
  /** Whether sidebar is visible */
  visible: boolean;
  /** Sidebar width in columns */
  width: number;
  /** Files modified in current session */
  files: FileChange[];
  /** Currently highlighted file index */
  selectedIndex: number;
  /** Toggle sidebar visibility */
  toggle: () => void;
  /** Set sidebar visibility */
  setVisible: (visible: boolean) => void;
  /** Set sidebar width */
  setWidth: (width: number) => void;
  /** Add or update a file change */
  trackFileChange: (change: FileChange) => void;
  /** Clear all tracked file changes */
  clearFileChanges: () => void;
  /** Set the selected file index */
  setSelectedIndex: (index: number) => void;
}

// Usage:
const { visible, toggle, files, trackFileChange } = useSidebarContext();
```

## Extended DialogContext

```typescript
// New dialog types added to existing DialogContext
type NewDialogType =
  | 'help'
  | 'file-picker'
  | 'quit'
  | 'theme'
  | 'arg-input';

// New open methods added to existing DialogContextValue
interface ExtendedDialogMethods {
  openHelp: () => Promise<void>;
  openFilePicker: (options?: { multiSelect?: boolean; include?: string[]; exclude?: string[] }) => Promise<string[]>;
  openQuit: () => Promise<'quit' | 'cancel' | 'save-and-quit'>;
  openTheme: () => Promise<string>;
  openArgInput: (title: string, fields: ArgField[]) => Promise<Record<string, string>>;
}
```

## Extended ChatContext (Scroll State)

```typescript
// Additions to existing ChatContext
interface ScrollActions {
  scrollUp: (lines?: number) => void;
  scrollDown: (lines?: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  /** Set viewport height (called by MessageArea on mount/resize) */
  setViewportHeight: (height: number) => void;
}

interface ScrollState {
  scrollOffset: number;
  isAtBottom: boolean;
  totalLines: number;
  viewportHeight: number;
}
```
