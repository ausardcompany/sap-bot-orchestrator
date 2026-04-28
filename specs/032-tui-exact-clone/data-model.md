# Data Model: 032-tui-exact-clone

## Entity Overview

This feature is primarily a UI/presentation layer. Entities represent React component state, context models, and theme configuration — not persistent database entities.

## Entities

### E1: ThemeColors (Extended)

Extends the existing `ThemeColors` interface with upstream-parity tokens.

| Field | Type | Description |
|-------|------|-------------|
| primary | string | Primary accent color (`#fab283` dark, `#3b7dd8` light) |
| secondary | string | Secondary accent (`#5c9cf5` dark, `#7b5bb6` light) |
| accent | string | Tertiary accent (`#9d7cd8` dark, `#d68c27` light) |
| background | string | Main background (`#212121` dark, `#f8f8f8` light) |
| backgroundSecondary | string | Secondary bg for alternating/highlight (`#252525` dark) |
| backgroundDarker | string | Shadow/deeper bg (`#121212` dark) |
| text | string | Default foreground text (`#e0e0e0` dark) |
| dimText | string | Muted/comment text (`#6a6a6a` dark) |
| textEmphasized | string | Yellow emphasized text (`#e5c07b` dark) |
| bold | string | Bold text color |
| error | string | Error/red (`#e06c75` dark) |
| success | string | Success/green (`#7fd88f` dark) |
| warning | string | Warning/orange (`#f5a742` dark) |
| info | string | Info/cyan (`#56b6c2` dark) |
| border | string | Normal border (`#4b4c5c` dark) |
| borderFocused | string | Focused border (= primary) |
| borderDim | string | Dim border (`#303030` dark) |
| agents | Record<AgentName, string> | Per-agent accent colors |
| toolHeader | string | Tool call header color |
| toolOutput | string | Tool output text color |
| diffAdd | string | Diff added foreground (`#478247` dark) |
| diffRemove | string | Diff removed foreground (`#7C4444` dark) |
| diffContext | string | Diff context foreground (`#a0a0a0` dark) |
| diffAddBg | string | **NEW** Diff added background (`#303A30` dark) |
| diffRemoveBg | string | **NEW** Diff removed background (`#3A3030` dark) |
| diffContextBg | string | **NEW** Diff context background (`#212121` dark) |
| diffLineNumber | string | **NEW** Diff line number text (`#888888` dark) |
| diffAddedLineNumberBg | string | **NEW** Added line number bg (`#293229` dark) |
| diffRemovedLineNumberBg | string | **NEW** Removed line number bg (`#332929` dark) |
| diffHighlightAdded | string | **NEW** Word-level added highlight (`#DAFADA` dark) |
| diffHighlightRemoved | string | **NEW** Word-level removed highlight (`#FADADD` dark) |
| prompt | string | Input prompt color |
| cursor | string | Cursor color |
| placeholder | string | Placeholder text color |
| statusBarBg | string | **NEW** Status bar background |
| sidebarBg | string | **NEW** Sidebar panel background |
| sidebarBorder | string | **NEW** Sidebar border color |
| scrollbar | string | **NEW** Scrollbar indicator color |
| selection | string | **NEW** Text selection highlight |
| pillBg | string | **NEW** Agent badge pill background |
| pillText | string | **NEW** Agent badge pill text |
| dialogOverlay | string | **NEW** Dialog overlay dim color |

### E2: PageState

| Field | Type | Description |
|-------|------|-------------|
| activePage | `'chat' \| 'logs'` | Currently displayed page |

**State Transitions:**
- `chat → logs`: Ctrl+J, leader+l, or `/logs` command
- `logs → chat`: Ctrl+J, Escape, or `/chat` command

### E3: SidebarState

| Field | Type | Description |
|-------|------|-------------|
| visible | boolean | Whether sidebar is shown |
| width | number | Sidebar width in columns (default: 30) |
| files | FileChange[] | Files modified in current session |
| selectedIndex | number | Currently highlighted file index |

### E4: FileChange

| Field | Type | Description |
|-------|------|-------------|
| path | string | Relative file path |
| status | `'added' \| 'modified' \| 'deleted'` | Change type |
| additions | number | Lines added |
| deletions | number | Lines deleted |
| timestamp | number | When the change occurred |

### E5: ScrollState

| Field | Type | Description |
|-------|------|-------------|
| offset | number | Current scroll offset (lines from bottom) |
| isAtBottom | boolean | Whether scrolled to the latest content |
| totalLines | number | Total content height in lines |
| viewportHeight | number | Visible area height in lines |

**Validation**: `offset >= 0 && offset <= Math.max(0, totalLines - viewportHeight)`

### E6: VimState

| Field | Type | Description |
|-------|------|-------------|
| mode | `'normal' \| 'insert' \| 'visual' \| 'command'` | Current editing mode |
| enabled | boolean | Whether vim mode is active (user can toggle) |
| pendingOperator | string \| null | Pending operator (d, c, y) |
| count | number \| null | Numeric prefix |
| commandBuffer | string | Command-line buffer (for `:` commands) |

**State Transitions:**
- Normal → Insert: `i`, `a`, `o`, `A`, `I`, `O`
- Insert → Normal: `Escape`
- Normal → Visual: `v` (char), `V` (line)
- Visual → Normal: `Escape`
- Normal → Command: `:`
- Command → Normal: `Enter`, `Escape`

### E7: EditorState (Multi-line Input)

| Field | Type | Description |
|-------|------|-------------|
| lines | string[] | Array of text lines |
| cursorRow | number | Current cursor row (0-indexed) |
| cursorCol | number | Current cursor column (0-indexed) |
| selectionStart | { row: number, col: number } \| null | Selection anchor point |
| selectionEnd | { row: number, col: number } \| null | Selection end point |
| undoStack | EditorSnapshot[] | Undo history |
| redoStack | EditorSnapshot[] | Redo history |

### E8: HelpEntry

| Field | Type | Description |
|-------|------|-------------|
| key | string | Key binding display string (e.g., "Ctrl+X n") |
| description | string | What the binding does |
| category | `'navigation' \| 'dialogs' \| 'chat' \| 'leader' \| 'input' \| 'vim'` | Grouping category |
| condition | string \| null | When available (e.g., "leader mode", "vim normal") |

### E9: FilePickerState

| Field | Type | Description |
|-------|------|-------------|
| query | string | Current search query |
| results | FilePickerResult[] | Fuzzy search results |
| selectedIndex | number | Currently highlighted result |
| selectedFiles | string[] | Multi-selected file paths |
| isLoading | boolean | Whether file list is being scanned |

### E10: FilePickerResult

| Field | Type | Description |
|-------|------|-------------|
| path | string | Relative file path |
| positions | Set<number> | Matched character positions (for highlighting) |
| score | number | FZF ranking score |

### E11: LogEntry

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique entry ID |
| timestamp | number | Unix timestamp |
| level | `'debug' \| 'info' \| 'warn' \| 'error'` | Log level |
| source | string | Source module (e.g., "tool:read", "api", "router") |
| message | string | Log message content |
| data | unknown \| null | Optional structured data |

### E12: DialogEntry (Extended)

Extends the existing `DialogEntry` type with new dialog types.

| Field | Type | Description |
|-------|------|-------------|
| type | DialogType | Dialog type identifier |
| resolve | (value: T) => void | Promise resolve callback |
| reject | () => void | Promise reject callback |
| props | Record<string, unknown> | Dialog-specific props |

**DialogType** (extended): `'model-picker' | 'agent-selector' | 'permission' | 'session-list' | 'session-rename' | 'mcp-manager' | 'command-palette' | 'confirm' | 'alert' | 'help' | 'file-picker' | 'quit' | 'theme' | 'arg-input'`

## Relationships

```
ThemeContext ──provides──> ThemeColors ──used-by──> All Components
PageContext ──provides──> PageState ──determines──> ChatPage | LogsPage
SidebarContext ──provides──> SidebarState ──contains──> FileChange[]
ChatContext ──provides──> ScrollState ──used-by──> MessageArea
DialogContext ──provides──> DialogEntry[] ──renders──> HelpDialog | FilePicker | QuitDialog | ThemeDialog | ArgDialog
EditorState ──used-by──> InputBox (multi-line)
VimState ──used-by──> InputBox (vim modes)
FilePickerState ──uses──> fzf ──searches──> project files
LogEntry[] ──displayed-by──> LogViewer ──on──> LogsPage
useFileChanges ──subscribes-to──> EventBus (ToolExecutionCompleted) ──updates──> SidebarContext
```
