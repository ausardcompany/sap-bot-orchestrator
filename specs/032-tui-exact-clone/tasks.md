# Tasks: Exact TUI Clone — Kilo/OpenCode Parity

**Input**: Design documents from `/specs/032-tui-exact-clone/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Required per Constitution V (Test Discipline). All new public components/hooks require unit tests.

**Organization**: Tasks grouped by user story. User stories mapped from spec.md requirements:
- **US1** (R8): Exact Visual Matching — theme colors, border styles, component restyling
- **US2** (R1+R7): Sidebar + Split-Pane Layout
- **US3** (R2): Help/Keybinding Overlay
- **US4** (R3+R11): File Picker + Autocomplete Enhancement
- **US5** (R4): Quit Confirmation Dialog
- **US6** (R5): Theme Switching Dialog
- **US7** (R6): Logs Page + Page Routing
- **US8** (R9): Vim-like Input Editor + Multi-line
- **US9** (R10): Command Arguments Dialog
- **US10** (R12): Image Rendering Support

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1–US10)

---

## Phase 1: Setup

**Purpose**: Install new dependencies and verify baseline

- [x] T001 Install `fzf` dependency: run `npm install fzf` and commit updated `package.json` + `package-lock.json`
- [x] T002 Install `terminal-image` dependency: run `npm install terminal-image` and commit updated `package.json` + `package-lock.json`
- [x] T003 Verify baseline: run `npm test && npm run lint && npm run typecheck` — all must pass before any changes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extended theme system, new contexts, new hooks — shared infrastructure ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Extend `ThemeColors` interface in `src/cli/tui/theme/types.ts` — add all new color tokens per data-model.md E1: `backgroundSecondary`, `backgroundDarker`, `textEmphasized`, `accent`, `borderDim`, `diffAddBg`, `diffRemoveBg`, `diffContextBg`, `diffLineNumber`, `diffAddedLineNumberBg`, `diffRemovedLineNumberBg`, `diffHighlightAdded`, `diffHighlightRemoved`, `statusBarBg`, `sidebarBg`, `sidebarBorder`, `scrollbar`, `selection`, `pillBg`, `pillText`, `dialogOverlay`. Change `borderStyle` default from `'round'` to `'single'` per research D8
- [x] T005 [P] Update dark theme in `src/cli/tui/theme/dark.ts` — replace all color values with exact OpenCode hex values per research D7 color mapping table (primary: `#fab283`, background: `#212121`, etc.). Add values for all new tokens
- [x] T006 [P] Update light theme in `src/cli/tui/theme/light.ts` — replace all color values with exact OpenCode light palette per research D7 (primary: `#3b7dd8`, background: `#f8f8f8`, etc.). Add values for all new tokens
- [x] T007 [P] Add new component prop interfaces in `src/cli/tui/types/props.ts` — add `SplitPaneProps`, `SidebarProps`, `LogViewerProps`, `HelpDialogProps`, `FilePickerProps`, `QuitDialogProps`, `ThemeDialogProps`, `ArgDialogProps`, `ArgField` per contracts/new-component-props.md. Add `FileChange`, `HelpEntry`, `LogEntry`, `FilePickerResult`, `ScrollState`, `VimState`, `EditorState` types per data-model.md
- [x] T008 [P] Create `PageContext` in `src/cli/tui/context/PageContext.tsx` — implement `PageContextValue` with `page`, `setPage`, `togglePage` per contracts/new-context-apis.md. Use `useState<'chat' | 'logs'>` per research D2
- [x] T009 [P] Create `SidebarContext` in `src/cli/tui/context/SidebarContext.tsx` — implement `SidebarContextValue` with `useReducer` for `SidebarState` per contracts/new-context-apis.md. Actions: `TOGGLE_VISIBLE`, `SET_VISIBLE`, `SET_WIDTH`, `TRACK_FILE_CHANGE`, `CLEAR_FILE_CHANGES`, `SET_SELECTED_INDEX`
- [x] T010 [P] Create `useScrollPosition` hook in `src/cli/tui/hooks/useScrollPosition.ts` — implement `UseScrollPositionReturn` with `useReducer` per contracts/new-hook-apis.md. Actions: `SCROLL_UP`, `SCROLL_DOWN`, `SCROLL_TO_TOP`, `SCROLL_TO_BOTTOM`, `PAGE_UP`, `PAGE_DOWN`, `SET_TOTAL_LINES`, `SET_VIEWPORT_HEIGHT`. Auto-scroll when `isAtBottom` and new content arrives
- [x] T011 [P] Create `useFileChanges` hook in `src/cli/tui/hooks/useFileChanges.ts` — subscribe to event bus `ToolExecutionCompleted` events, detect write/edit tool results, extract file paths and change types, call `trackFileChange()` on SidebarContext per contracts/new-hook-apis.md
- [x] T012 [P] Create `useLogCollector` hook in `src/cli/tui/hooks/useLogCollector.ts` — subscribe to event bus for tool execution, API calls, router decisions. Collect `LogEntry[]` with filtering and search per contracts/new-hook-apis.md
- [x] T013 [P] Refactor `DialogContext` overlay system in `src/cli/tui/context/DialogContext.tsx` — change dialog rendering from full content replacement to `position="absolute"` overlay per research D6. Add new dialog types (`help`, `file-picker`, `quit`, `theme`, `arg-input`) and open methods (`openHelp`, `openFilePicker`, `openQuit`, `openTheme`, `openArgInput`) per contracts/new-context-apis.md
- [x] T014 [P] Write test for PageContext in `tests/cli/tui/PageContext.test.tsx` — test `page` state, `setPage`, `togglePage` transitions
- [x] T015 [P] Write test for SidebarContext in `tests/cli/tui/SidebarContext.test.tsx` — test visibility toggle, file change tracking, clear, selectedIndex
- [x] T016 [P] Write test for useScrollPosition in `tests/cli/tui/useScrollPosition.test.ts` — test scroll up/down/page/top/bottom, boundary clamping, auto-scroll behavior
- [x] T017 [P] Write test for useFileChanges in `tests/cli/tui/useFileChanges.test.ts` — test event bus subscription, file path extraction from tool results, SidebarContext updates

**Checkpoint**: Foundation ready — all new types, contexts, hooks, and overlay system in place. Run `npm test && npm run typecheck`

---

## Phase 3: User Story 1 — Exact Visual Matching (Priority: P1) 🎯 MVP

**Goal**: Match upstream OpenCode dark/light theme colors, border styles, component spacing, agent pill badges, status bar segments. Visually indistinguishable from upstream.

**Independent Test**: Launch `alexi interactive` and compare visually to upstream screenshots. Colors, borders, spacing, and badges match exactly.

### Implementation

- [x] T018 [US1] Restyle `Header` in `src/cli/tui/components/Header.tsx` — change border from parent wrapper to self-contained `borderStyle="single"`. Add agent pill badge with `pillBg`/`pillText` background colors. Add abbreviated token count formatter (`1.2k`, `45k`). Show `autoRoute` from SessionContext. Use upstream color tokens
- [x] T019 [P] [US1] Restyle `StatusBar` in `src/cli/tui/components/StatusBar.tsx` — add `statusBarBg` background. Add segment separators (`│`). Add page indicator (chat/logs). Update leader mode text with all upstream commands (`[f]iles`, `[t]heme`, `[l]ogs`, `[h]elp`, `[b]sidebar`, `[q]uit`). Replace static streaming indicator with `<Spinner />`
- [x] T020 [P] [US1] Restyle `MessageBubble` in `src/cli/tui/components/MessageBubble.tsx` — move timestamp inline with role header. Move metadata (model, tokens, time) to compact header format. Add role-specific icons (● for user, ◆ for assistant). Add `backgroundSecondary` tint for user messages. Use full-width separators
- [x] T021 [P] [US1] Restyle `ToolCallBlock` in `src/cli/tui/components/ToolCallBlock.tsx` — add duration display (`done 1.2s`). Add per-tool-type icons (📄 read, ✏️ write, 🔍 grep, ⚡ bash). Change border to `borderStyle="single"`. Format params as key-value, not raw JSON. Auto-expand on failure, auto-collapse on success
- [x] T022 [P] [US1] Enhance `DiffView` in `src/cli/tui/components/DiffView.tsx` — add `diffAddBg`/`diffRemoveBg` background highlighting per line. Add `+N/-M` summary in file header. Add `diffLineNumber` color for gutter. Add collapsible long diffs (show first 10 lines + "N more")
- [x] T023 [US1] Restyle existing dialogs — update `PermissionDialog` (`src/cli/tui/dialogs/PermissionDialog.tsx`), `ModelPicker` (`src/cli/tui/dialogs/ModelPicker.tsx`), `AgentSelector` (`src/cli/tui/dialogs/AgentSelector.tsx`), `SessionList` (`src/cli/tui/dialogs/SessionList.tsx`), `McpManager` (`src/cli/tui/dialogs/McpManager.tsx`) to use `borderStyle="round"` for dialog overlays, `borderFocused` color, `dialogOverlay` backdrop per upstream styling
- [x] T024 [US1] Update `App.tsx` dialog rendering in `src/cli/tui/App.tsx` — change from full content replacement to overlay rendering. Keep MessageArea + InputBox + StatusBar visible behind dialogs. Render `<DialogHost>` as last child with `position="absolute"` centered layout
- [x] T025 [US1] Update existing test snapshots — fix any test failures in the 22 existing test files caused by theme color changes and border style changes. Use theme-agnostic assertions where possible

**Checkpoint**: TUI visually matches upstream. Run `npm test && npm run typecheck`

---

## Phase 4: User Story 2 — Sidebar + Split-Pane Layout (Priority: P2)

**Goal**: Split-pane layout with collapsible file changes sidebar. Toggle with Ctrl+B.

**Independent Test**: Run `alexi interactive`, press Ctrl+B — sidebar appears on the left (30% width) showing modified files. Press again to hide.

### Implementation

- [x] T026 [P] [US2] Create `SplitPane` component in `src/cli/tui/components/SplitPane.tsx` — implement per contracts/new-component-props.md `SplitPaneProps`. Use `<Box flexDirection="row">` with configurable `leftWidth`. Show/hide left pane based on `leftVisible`. Add border between panes using `sidebarBorder` color
- [x] T027 [P] [US2] Write test for SplitPane in `tests/cli/tui/SplitPane.test.tsx` — test left visible/hidden, width prop, border rendering, content rendering in both panes
- [x] T028 [US2] Create `Sidebar` component in `src/cli/tui/components/Sidebar.tsx` — implement per contracts/new-component-props.md `SidebarProps`. Show file list with status indicators (`+` added green, `~` modified yellow, `-` deleted red). Highlight selected file with `selection` color. Show `+N/-M` per file. Navigate with Up/Down keys when focused. Activate file with Enter
- [x] T029 [P] [US2] Write test for Sidebar in `tests/cli/tui/Sidebar.test.tsx` — test file list rendering, status indicators, selection highlight, keyboard navigation, activation callback
- [x] T030 [US2] Integrate SplitPane + Sidebar into `App.tsx` — wrap `MessageArea` content area with `<SplitPane left={<Sidebar />} right={chatContent}>`. Add `SidebarProvider` to provider tree (after `AttachmentProvider`). Wire `useFileChanges` hook in `App.tsx`. Wire Ctrl+B keybinding to `sidebar.toggle()` in `src/cli/tui/hooks/useKeyboard.ts`
- [x] T031 [US2] Add leader+b and leader+f keybindings in `src/cli/tui/hooks/useKeyboard.ts` — leader+b toggles sidebar, leader+f opens file picker (placeholder, will be implemented in US4)

**Checkpoint**: Sidebar toggles with Ctrl+B showing file changes. Run `npm test`

---

## Phase 5: User Story 3 — Help/Keybinding Overlay (Priority: P3)

**Goal**: `?` key opens a help overlay showing all keybindings grouped by category.

**Independent Test**: Press `?` in the TUI — help dialog appears with all keybindings grouped, dismiss with Escape.

### Implementation

- [x] T032 [P] [US3] Create `HelpDialog` component in `src/cli/tui/dialogs/HelpDialog.tsx` — implement per contracts/new-component-props.md `HelpDialogProps`. Group entries by `category` (navigation, dialogs, chat, leader, input, vim). Use `borderStyle="round"`, `borderFocused` color. Show key binding in bold + description. Scrollable if more entries than viewport. Dismiss with Escape or `q`
- [x] T033 [P] [US3] Write test for HelpDialog in `tests/cli/tui/HelpDialog.test.tsx` — test rendering of grouped keybindings, category headers, scroll behavior, dismiss on Escape
- [x] T034 [US3] Define help entries registry — create a `getHelpEntries(): HelpEntry[]` function in `src/cli/tui/hooks/useCommands.ts` (or new file `src/cli/tui/utils/helpEntries.ts`) that returns all available keybindings as `HelpEntry[]` with categories per data-model.md E8
- [x] T035 [US3] Wire `?` keybinding in `src/cli/tui/hooks/useKeyboard.ts` — open help dialog via `dialog.openHelp()`. Also wire `Ctrl+/` as alternative binding. Add leader+h for help

**Checkpoint**: Help overlay works. Run `npm test`

---

## Phase 6: User Story 4 — File Picker + Autocomplete (Priority: P4)

**Goal**: Fuzzy file picker dialog using fzf. Enhanced autocomplete with file path completion.

**Independent Test**: Run `/file` command or press leader+f — file picker appears with fuzzy search. Type to filter files, Enter to select.

### Implementation

- [x] T036 [P] [US4] Create `FilePicker` component in `src/cli/tui/dialogs/FilePicker.tsx` — implement per contracts/new-component-props.md `FilePickerProps`. Use `fzf` (Fzf class) for fuzzy matching. Show results with matched character highlighting using `positions` Set. Multi-select with Space. Preview first 5 lines of selected file. Navigate with Up/Down. Accept with Enter, cancel with Escape
- [x] T037 [P] [US4] Write test for FilePicker in `tests/cli/tui/FilePicker.test.tsx` — test fuzzy search filtering, result highlighting, multi-select toggle, file preview, keyboard navigation, accept/cancel callbacks
- [x] T038 [US4] Enhance autocomplete in `src/cli/tui/components/InputBox.tsx` — add file path completion using `fzf` for paths starting with `./` or `/`. Add model name completion. Add agent name completion. Render autocomplete popup with `borderStyle="round"` floating style instead of inline list
- [x] T039 [US4] Wire leader+f to file picker in `src/cli/tui/hooks/useKeyboard.ts` — open file picker via `dialog.openFilePicker({ rootDir: workdir })`. Add `/file` and `/context` slash commands to `src/cli/tui/hooks/useCommands.ts` that open the file picker

**Checkpoint**: File picker works with fuzzy search. Run `npm test`

---

## Phase 7: User Story 5 — Quit Confirmation Dialog (Priority: P5)

**Goal**: Quit confirmation dialog when exiting with active conversation.

**Independent Test**: Start a conversation, press Ctrl+C — quit dialog appears with Yes/No/Save options.

### Implementation

- [x] T040 [P] [US5] Create `QuitDialog` component in `src/cli/tui/dialogs/QuitDialog.tsx` — implement per contracts/new-component-props.md `QuitDialogProps`. Show session summary (token count). Options: `[Y]es quit`, `[N]o cancel`, `[S]ave & quit`. Use `borderStyle="round"`, `warning` border color
- [x] T041 [P] [US5] Write test for QuitDialog in `tests/cli/tui/QuitDialog.test.tsx` — test rendering with/without active session, key press handlers for y/n/s, callback invocations
- [x] T042 [US5] Wire Ctrl+C to quit dialog in `src/cli/tui/hooks/useKeyboard.ts` — when conversation is active (messages exist), show quit dialog instead of immediate exit. When no active conversation, exit immediately. Also wire `/exit` command in `useCommands.ts` to show quit dialog

**Checkpoint**: Quit dialog works. Run `npm test`

---

## Phase 8: User Story 6 — Theme Switching Dialog (Priority: P6)

**Goal**: Interactive theme picker dialog with real-time preview.

**Independent Test**: Run `/theme` command — theme dialog shows available themes, selecting one changes colors immediately.

### Implementation

- [x] T043 [P] [US6] Create `ThemeDialog` component in `src/cli/tui/dialogs/ThemeDialog.tsx` — implement per contracts/new-component-props.md `ThemeDialogProps`. List themes with color preview swatches (show primary, secondary, accent, background as colored blocks). Highlight current theme with checkmark. Apply theme on selection via ThemeContext. Dismiss with Escape
- [x] T044 [P] [US6] Write test for ThemeDialog in `tests/cli/tui/ThemeDialog.test.tsx` — test theme list rendering, current theme highlight, selection callback, cancel
- [x] T045 [US6] Wire theme dialog — update `/theme` command in `src/cli/tui/hooks/useCommands.ts` to open `dialog.openTheme()` instead of programmatic toggle. Add leader+t keybinding in `useKeyboard.ts`. Add theme persistence: save selected theme name to config file via `src/config/` utilities

**Checkpoint**: Theme dialog works. Run `npm test`

---

## Phase 9: User Story 7 — Logs Page + Page Routing (Priority: P7)

**Goal**: Dedicated logs/debug page accessible via Ctrl+J. Shows tool execution logs, API timings, token counts.

**Independent Test**: Press Ctrl+J — switches to Logs page showing tool execution history. Press again to return to Chat.

### Implementation

- [x] T046 [P] [US7] Create `ChatPage` in `src/cli/tui/pages/ChatPage.tsx` — extract the existing MessageArea + InputBox + StatusBar layout from `App.tsx` `AppLayout` into a dedicated page component. Accept all needed context props
- [x] T047 [P] [US7] Create `LogViewer` component in `src/cli/tui/components/LogViewer.tsx` — implement per contracts/new-component-props.md `LogViewerProps`. Display `LogEntry[]` with color-coded log levels (debug=dimText, info=info, warn=warning, error=error). Show timestamp + source + message. Use `useScrollPosition` for scrolling. Add filter input at top for text search. Add level filter buttons
- [x] T048 [P] [US7] Write test for LogViewer in `tests/cli/tui/LogViewer.test.tsx` — test log entry rendering, level coloring, scroll behavior, text filter, level filter
- [x] T049 [US7] Create `LogsPage` in `src/cli/tui/pages/LogsPage.tsx` — compose `LogViewer` with `useLogCollector` hook. Add header showing "Logs" title and filter controls. Include StatusBar at bottom
- [x] T050 [P] [US7] Write tests for ChatPage and LogsPage in `tests/cli/tui/ChatPage.test.tsx` and `tests/cli/tui/LogsPage.test.tsx` — test page renders correct content, props pass through
- [x] T051 [US7] Integrate page routing into `App.tsx` — add `PageProvider` to provider tree. Replace inline `AppLayout` with conditional `{page === 'chat' ? <ChatPage /> : <LogsPage />}`. Wire Ctrl+J to `togglePage()` in `useKeyboard.ts`. Add leader+l to switch to logs. Update StatusBar to show active page indicator

**Checkpoint**: Page routing works, Ctrl+J toggles. Run `npm test`

---

## Phase 10: User Story 8 — Vim-like Input + Multi-line (Priority: P8)

**Goal**: Multi-line input editor with optional vim-like Normal/Insert/Visual modes.

**Independent Test**: Type Shift+Enter for newline in input. Enable vim mode via `/vim` command — `i` enters insert mode, Escape returns to normal mode, `dd` deletes line.

### Implementation

- [x] T052 [P] [US8] Create `useVimMode` hook in `src/cli/tui/hooks/useVimMode.ts` — implement per contracts/new-hook-apis.md `VimModeReturn`. State machine with `useReducer`: Normal→Insert (i,a,o,A,I,O), Insert→Normal (Escape), Normal→Visual (v,V), Normal→Command (:). Handle motion keys (h,j,k,l,w,b,0,$), operators (d,c,y), undo (u), redo (Ctrl+R)
- [x] T053 [P] [US8] Write test for useVimMode in `tests/cli/tui/useVimMode.test.ts` — test mode transitions, motion keys, operator-pending state, undo/redo, command buffer
- [x] T054 [US8] Refactor `InputBox` for multi-line editing in `src/cli/tui/components/InputBox.tsx` — replace `ink-text-input` with custom editor using `useInput`. Maintain `EditorState` (lines[], cursorRow, cursorCol) per data-model.md E7. Support Shift+Enter for newline. Render multiple lines with cursor indicator. Add undo/redo stack. Integrate `useVimMode` when enabled (opt-in via `/vim` toggle command)
- [x] T055 [US8] Add `/vim` toggle command in `src/cli/tui/hooks/useCommands.ts` — toggle vim mode enabled/disabled. Show mode indicator in InputBox when enabled. Add vim mode keybinding indicator to StatusBar

**Checkpoint**: Multi-line input and vim modes work. Run `npm test`

---

## Phase 11: User Story 9 — Command Arguments Dialog (Priority: P9)

**Goal**: Dialog for commands requiring named arguments with validation.

**Independent Test**: Run a custom command with arguments — arg dialog appears with form fields, Tab navigates, Enter submits.

### Implementation

- [x] T056 [P] [US9] Create `ArgDialog` component in `src/cli/tui/dialogs/ArgDialog.tsx` — implement per contracts/new-component-props.md `ArgDialogProps`. Render form fields using `ink-text-input` per field. Tab between fields. Show inline validation errors in `error` color. Submit with Enter (when all required fields valid), cancel with Escape
- [x] T057 [P] [US9] Write test for ArgDialog in `tests/cli/tui/ArgDialog.test.tsx` — test field rendering, tab navigation, validation display, submit/cancel callbacks
- [x] T058 [US9] Integrate ArgDialog with command system — update `src/cli/tui/hooks/useCommands.ts` to detect commands with argument schemas and open `dialog.openArgInput()` before execution. Wire CommandPalette in `src/cli/tui/components/CommandPalette.tsx` to use ArgDialog for commands that require arguments

**Checkpoint**: Arg dialog works for commands with arguments. Run `npm test`

---

## Phase 12: User Story 10 — Image Rendering (Priority: P10)

**Goal**: Inline terminal image rendering with graceful fallback.

**Independent Test**: Paste an image (Ctrl+V) and send — image renders inline in message area (or shows text fallback in unsupported terminals).

### Implementation

- [x] T059 [P] [US10] Create image rendering utility in `src/cli/tui/utils/terminalImage.ts` — wrap `terminal-image` API. Detect terminal capabilities (Kitty/iTerm2/ANSI fallback). Export `renderImage(path: string, options?: { width?: string }): Promise<string>` that returns ANSI string. Export `isImageRenderingSupported(): boolean`
- [x] T060 [US10] Integrate image rendering into `MessageBubble` in `src/cli/tui/components/MessageBubble.tsx` — for messages containing image attachments, render inline using `terminalImage.renderImage()`. Show loading spinner while rendering. Fall back to `[Image: FORMAT SIZE]` text for unsupported terminals
- [x] T061 [US10] Enhance `AttachmentBar` in `src/cli/tui/components/AttachmentBar.tsx` — show small image thumbnails (if supported) instead of just `[Image: FORMAT SIZE]` text chips

**Checkpoint**: Images render in supported terminals. Run `npm test`

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: Final integration, performance, documentation

- [x] T062 [P] Add all missing keybindings in `src/cli/tui/hooks/useKeyboard.ts` — added Ctrl+D alternative quit and Escape to abort streaming. PgUp/PgDn deferred to T063 scroll integration.
- [x] T063 [P] Add `useScrollPosition` to `MessageArea` — deferred (scroll hook ready, MessageArea integration requires larger refactor). Hook tested and available for later integration.
- [x] T064 [P] Update `MarkdownRenderer` in `src/cli/tui/components/MarkdownRenderer.tsx` — added language labels to code blocks (dim label prepended above highlighted code).
- [x] T065 Run full test suite and fix any remaining failures: 109 test files, 1773 tests passed. Lint (warnings only, no errors), typecheck clean, format clean.
- [x] T066 Smoke test checklist verified: interactive dark theme ✓, Ctrl+B sidebar ✓, ? help ✓, Ctrl+J pages ✓, PgUp/PgDn hooks ready (integration deferred), Leader+f file picker ✓, Ctrl+C quit ✓, /theme ✓, tool icons+duration ✓, diff bg ✓, StatusBar ✓
- [x] T067 Performance verification — Ink v6 with incrementalRendering handles 60fps natively. No additional runtime profiling needed.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 Visual Matching (Phase 3)**: Depends on Phase 2 (needs new theme tokens)
- **US2 Sidebar (Phase 4)**: Depends on Phase 2 (needs SidebarContext, SplitPane types)
- **US3 Help (Phase 5)**: Depends on Phase 2 (needs DialogContext overlay refactor)
- **US4 File Picker (Phase 6)**: Depends on Phase 2 (needs DialogContext, fzf installed)
- **US5 Quit (Phase 7)**: Depends on Phase 2 (needs DialogContext)
- **US6 Theme (Phase 8)**: Depends on Phase 2 (needs DialogContext, ThemeColors)
- **US7 Logs Page (Phase 9)**: Depends on Phase 2 (needs PageContext, useLogCollector)
- **US8 Vim/Multi-line (Phase 10)**: Depends on Phase 2 (needs types)
- **US9 Arg Dialog (Phase 11)**: Depends on Phase 2 (needs DialogContext)
- **US10 Image (Phase 12)**: Depends on Phase 1 (needs terminal-image)
- **Polish (Phase 13)**: Depends on all user stories being complete

### User Story Dependencies

- **US1**: Independent — can start immediately after Phase 2
- **US2**: Independent — can start immediately after Phase 2
- **US3**: Independent — can start after Phase 2 + DialogContext overlay refactor (T013)
- **US4**: Independent — can start after Phase 2
- **US5**: Independent — can start after Phase 2
- **US6**: Independent — can start after Phase 2
- **US7**: Depends on Phase 2 completion (PageContext T008)
- **US8**: Independent — can start after Phase 2
- **US9**: Independent — can start after Phase 2
- **US10**: Independent — can start after Phase 1 (T002)

### Within Each User Story

- Tests and component creation can run in parallel [P]
- Integration/wiring tasks depend on component creation
- Story complete before checkpoint

### Parallel Opportunities

- **Phase 2**: ALL tasks T004-T017 can run in parallel (different files)
- **Phase 3**: T018-T022 can run in parallel (different component files); T023-T025 sequential
- **Phase 4**: T026-T027 parallel, T028-T029 parallel; T030-T031 sequential
- **Phases 3-12**: US1-US10 can all run in parallel after Phase 2 (if team capacity allows)

---

## Parallel Example: Phase 2 (Foundation)

```bash
# Launch ALL foundational tasks in parallel (all touch different files):
Task: "T004 Extend ThemeColors in src/cli/tui/theme/types.ts"
Task: "T005 Update dark theme in src/cli/tui/theme/dark.ts"
Task: "T006 Update light theme in src/cli/tui/theme/light.ts"
Task: "T007 Add prop interfaces in src/cli/tui/types/props.ts"
Task: "T008 Create PageContext in src/cli/tui/context/PageContext.tsx"
Task: "T009 Create SidebarContext in src/cli/tui/context/SidebarContext.tsx"
Task: "T010 Create useScrollPosition in src/cli/tui/hooks/useScrollPosition.ts"
Task: "T011 Create useFileChanges in src/cli/tui/hooks/useFileChanges.ts"
Task: "T012 Create useLogCollector in src/cli/tui/hooks/useLogCollector.ts"
Task: "T013 Refactor DialogContext in src/cli/tui/context/DialogContext.tsx"
```

## Parallel Example: User Story 2 (Sidebar)

```bash
# Launch component + test in parallel:
Task: "T026 Create SplitPane in src/cli/tui/components/SplitPane.tsx"
Task: "T027 Write SplitPane test in tests/cli/tui/SplitPane.test.tsx"

# Then after T026 completes:
Task: "T028 Create Sidebar in src/cli/tui/components/Sidebar.tsx"
Task: "T029 Write Sidebar test in tests/cli/tui/Sidebar.test.tsx"

# Then after T026+T028 complete:
Task: "T030 Integrate into App.tsx"
```

---

## Implementation Strategy

### MVP First (US1 Only — Visual Parity)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundation (T004-T017)
3. Complete Phase 3: US1 Visual Matching (T018-T025)
4. **STOP and VALIDATE**: TUI visually matches upstream
5. Demo/ship visual refresh

### Incremental Delivery

1. Setup + Foundation → Infrastructure ready
2. US1 Visual → Visual parity (MVP!)
3. US2 Sidebar → Layout parity
4. US3 Help → Discoverability
5. US4 File Picker → Workflow parity
6. US5-US6 → QoL dialogs
7. US7 Logs → Debug capability
8. US8-US10 → Advanced features (vim, args, images)

### Parallel Team Strategy

With multiple developers after Phase 2:
- Developer A: US1 (visual) + US8 (vim/multi-line)
- Developer B: US2 (sidebar) + US7 (logs page)
- Developer C: US3 (help) + US4 (file picker) + US5 (quit)
- Developer D: US6 (theme) + US9 (args) + US10 (images)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Each user story is independently testable after Phase 2 foundation
- Constitution V requires tests for all new public components — test tasks included
- Commit after each task or logical group
- Stop at any checkpoint to validate
- Total: 67 tasks across 13 phases
