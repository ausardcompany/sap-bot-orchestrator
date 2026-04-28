# Contract: New Component Props

## SplitPane Props

```typescript
interface SplitPaneProps {
  /** Left pane content */
  left: React.ReactNode;
  /** Right pane content */
  right: React.ReactNode;
  /** Left pane width (percentage string or number of columns) */
  leftWidth?: string | number; // default: '30%'
  /** Whether the left pane is visible */
  leftVisible?: boolean; // default: true
  /** Border style between panes */
  borderStyle?: 'single' | 'round' | 'bold' | 'double';
  /** Border color */
  borderColor?: string;
}
```

## Sidebar Props

```typescript
interface SidebarProps {
  /** Files changed in this session */
  files: FileChange[];
  /** Currently selected file index */
  selectedIndex: number;
  /** Callback when a file is selected */
  onSelect: (index: number) => void;
  /** Callback when a file is activated (Enter) */
  onActivate: (path: string) => void;
  /** Whether the sidebar has keyboard focus */
  isFocused: boolean;
}
```

## LogViewer Props

```typescript
interface LogViewerProps {
  /** Log entries to display */
  entries: LogEntry[];
  /** Current search/filter query */
  filterQuery?: string;
  /** Log level filter */
  levelFilter?: LogEntry['level'] | 'all';
  /** Whether auto-scroll is enabled */
  autoScroll?: boolean;
}
```

## HelpDialog Props

```typescript
interface HelpDialogProps {
  /** All available key bindings */
  entries: HelpEntry[];
  /** Callback when dialog is dismissed */
  onClose: () => void;
}
```

## FilePicker Props

```typescript
interface FilePickerProps {
  /** Root directory to search from */
  rootDir: string;
  /** Callback with selected file paths */
  onSelect: (paths: string[]) => void;
  /** Callback when dialog is cancelled */
  onCancel: () => void;
  /** Allow selecting multiple files */
  multiSelect?: boolean; // default: true
  /** File patterns to include (glob) */
  include?: string[];
  /** File patterns to exclude (glob) */
  exclude?: string[];
}
```

## QuitDialog Props

```typescript
interface QuitDialogProps {
  /** Whether there's an active conversation */
  hasActiveSession: boolean;
  /** Token count of current session */
  tokenCount: number;
  /** Callback with user's choice */
  onChoice: (action: 'quit' | 'cancel' | 'save-and-quit') => void;
}
```

## ThemeDialog Props

```typescript
interface ThemeDialogProps {
  /** Currently active theme */
  currentTheme: 'dark' | 'light';
  /** Available theme names */
  themes: Array<{ name: string; preview: ThemeColors }>;
  /** Callback when theme is selected */
  onSelect: (theme: string) => void;
  /** Callback when dialog is cancelled */
  onCancel: () => void;
}
```

## ArgDialog Props

```typescript
interface ArgDialogProps {
  /** Dialog title (command name) */
  title: string;
  /** Argument field definitions */
  fields: ArgField[];
  /** Callback with filled values */
  onSubmit: (values: Record<string, string>) => void;
  /** Callback when dialog is cancelled */
  onCancel: () => void;
}

interface ArgField {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | null; // return error message or null
}
```
