# Research: 032-tui-exact-clone

## Decision Log

### D1: Layout System — Ink Flexbox (no external split-pane package)

**Decision**: Use Ink's built-in `<Box>` with `flexDirection="row"` and percentage widths for split-pane layout.

**Rationale**: Ink's `<Box>` is a full Yoga Flexbox implementation. There is no dedicated split-pane package for Ink, and Ink's primitives provide everything needed: `flexDirection`, `flexGrow/Shrink/Basis`, percentage `width`, per-side borders, `overflowY="hidden"`. The upstream Go implementation also uses a custom flexbox-like layout built on Lip Gloss (not an external library).

**Alternatives Considered**:
- `ink-scroll-view`: Only provides scroll container, not split pane layout
- `blessed`: Incompatible with Ink's rendering model
- Custom Yoga bindings: Over-engineered when `<Box>` already wraps Yoga

### D2: Page Routing — Simple useState Switch (not React Router)

**Decision**: Use a `useState<'chat' | 'logs'>` in `PageContext` to switch between pages. No external router.

**Rationale**: The app has only 2 pages (Chat, Logs). React Router `MemoryRouter` is the official Ink recommendation but adds unnecessary complexity for 2 routes. A simple context-based switch with conditional rendering is lighter, avoids a new dependency, and is consistent with the project's YAGNI principle. Upstream's Go implementation also uses a simple page enum.

**Alternatives Considered**:
- React Router v7 `MemoryRouter`: Official recommendation but overkill for 2 views; adds `react-router` dependency
- `ink-router` (jimmed): Written for Ink v2, incompatible with v6
- URL-based routing: No URLs in terminal apps

### D3: Fuzzy File Search — fzf (fzf-for-js)

**Decision**: Use the `fzf` npm package for fuzzy file search in the FilePicker dialog.

**Rationale**: `fzf` is a pure JavaScript port of FZF's algorithm, designed for command-palette style matching (file paths, commands). It returns match positions for highlighting and produces better results for path-like strings than alternatives. ~100k weekly downloads, actively maintained.

**Alternatives Considered**:
- `fuse.js` (7M+ downloads): More configurable but worse at path matching; designed for JSON objects, not file paths
- `fuzzysort`: Sublime Text-like algorithm; good but less maintained than fzf
- `node-fzf`: Interactive TUI that takes over stdin/stdout — conflicts with Ink rendering
- `flexsearch`: Full-text search with inverted index — overkill for file picker

### D4: Vim-Like Editing — Custom useReducer State Machine (no external package)

**Decision**: Build the vim mode state machine as a `useVimMode` hook using `useReducer` + `useInput`.

**Rationale**: There are no good standalone npm packages for vim-mode state machines in terminal UIs. `terminal-kit` and `blessed` have vim-like features but are full TUI frameworks that conflict with Ink. The state machine is ~150-200 lines for Normal/Insert/Command modes and fits naturally into React's `useReducer` paradigm. Ink v6's kitty keyboard protocol support (`kittyKeyboard: { mode: 'auto' }`) enables proper Escape vs Ctrl+[ disambiguation.

**Alternatives Considered**:
- `terminal-kit`: Heavy, own rendering model, conflicts with Ink
- `blessed`: Full TUI framework, incompatible
- Extracting from Neovim: C implementation, not portable

### D5: Terminal Image Rendering — terminal-image + ink-picture

**Decision**: Use `terminal-image` for image rendering with `ink-picture` as the Ink component wrapper.

**Rationale**: `terminal-image` auto-detects the best available protocol (Kitty Graphics → iTerm2 Inline → ANSI block character fallback). It's maintained by sindresorhus, supports PNG/JPEG/GIF, and is listed in Ink's official "Useful Components" list. Graceful degradation via ANSI block characters ensures it works in any terminal.

**Alternatives Considered**:
- Direct Sixel: No good Node.js bindings
- `term-img`: Older, iTerm2 only
- Raw ANSI escape sequences: Fragile, no auto-detection

### D6: Dialog Overlay — Ink position="absolute" (not full-replacement)

**Decision**: Replace the current dialog system (full content replacement) with `position="absolute"` overlays that render dialogs on top of the main content.

**Rationale**: The current implementation replaces the entire MessageArea + InputBox + StatusBar when a dialog opens. Upstream renders dialogs as centered floating overlays on top of the chat content (content remains visible behind the dialog). Ink v6 supports `position="absolute"` with `top/left/width/height` props, which enables true overlay rendering. Focus management via `useFocus({ isActive })` ensures input goes to the dialog.

**Alternatives Considered**:
- Current approach (full replacement): Works but doesn't match upstream UX — user loses context of the conversation
- Portal-like rendering: React portals aren't meaningful in Ink (no DOM)

### D7: Upstream Color Palette — OpenCode Default Theme

**Decision**: Adopt the OpenCode default theme color palette exactly for the dark theme. Create a light theme using OpenCode's light palette.

**Rationale**: The user explicitly requested "точно такой же ui как в kilo или opencode". The OpenCode default theme defines 40+ color tokens with specific hex values. Matching these exactly ensures visual parity.

**Key Color Mapping (Dark)**:

| Token | Current (Alexi) | Target (OpenCode) |
|-------|-----------------|-------------------|
| primary | cyan | `#fab283` (orange/gold) |
| secondary | blue | `#5c9cf5` (blue) |
| accent | — | `#9d7cd8` (purple) |
| background | `#1a1a1a` | `#212121` |
| text | white | `#e0e0e0` |
| dimText | gray | `#6a6a6a` |
| border | gray | `#4b4c5c` |
| borderFocused | cyan | `#fab283` (= primary) |
| error | red | `#e06c75` |
| success | green | `#7fd88f` |
| warning | yellow | `#f5a742` |
| info | cyan | `#56b6c2` |

**New Tokens to Add**: `backgroundSecondary`, `backgroundDarker`, `textEmphasized`, `accentMuted`, `borderDim`, `diffAddBg`, `diffRemoveBg`, `diffAddedLineNumberBg`, `diffRemovedLineNumberBg`, `diffHighlightAdded`, `diffHighlightRemoved`, `diffContextBg`, `diffLineNumber`, `statusBarBg`, `sidebarBg`, `sidebarBorder`, `scrollbar`, `selection`, `pillBg`, `pillText`, `dialogOverlay`, `syntaxComment`, `syntaxKeyword`, `syntaxFunction`, `syntaxVariable`, `syntaxString`, `syntaxNumber`, `syntaxType`, `syntaxOperator`, `syntaxPunctuation`, `markdownHeading`, `markdownLink`, `markdownCode`, `markdownBlockQuote`, `markdownEmph`, `markdownStrong`, `markdownListItem`

### D8: Border Style — Normal (single-line), not Rounded

**Decision**: Change the default border style from `'round'` to `'single'` to match upstream.

**Rationale**: OpenCode uses `lipgloss.NormalBorder()` (single-line unicode: `│ ─ ┌ ┐ └ ┘`) as the default. Rounded borders (`╭ ╮ ╰ ╯`) are used only for dialog overlays. Current Alexi TUI uses `'round'` for everything.

### D9: Scroll Implementation — Manual Offset with useReducer

**Decision**: Implement scrolling in MessageArea using a manual scroll offset tracked via `useReducer`, with keyboard bindings for PgUp/PgDn/Home/End.

**Rationale**: Ink has no built-in scroll support. `<Box overflowY="hidden">` clips content but doesn't scroll. The upstream Go implementation uses a custom viewport with offset tracking. A `useReducer` with `scrollOffset` state and `SCROLL_UP/DOWN/TO_TOP/TO_BOTTOM` actions matches the React pattern and integrates with the existing ChatContext architecture.

**Alternatives Considered**:
- `ink-scroll-view`: External package, may not integrate well with existing MessageArea
- `<Static>`: One-way rendering, items can't be updated or scrolled

### D10: Multi-line Input — Custom Implementation (not ink-text-input)

**Decision**: Replace `ink-text-input` with a custom multi-line text editor component for the InputBox.

**Rationale**: `ink-text-input` is strictly single-line. Upstream supports multi-line input with Shift+Enter for newlines. A custom editor component using `useInput` with a `lines[]` + `cursorRow/cursorCol` state model provides multi-line support, vim modes, and selection — none of which are possible with `ink-text-input`.

**Alternatives Considered**:
- `ink-text-input` with workarounds: No multi-line support, too constrained
- `ink-text-area` (if exists): Not found on npm
- Fork `ink-text-input`: Simpler but still fundamentally single-line

## Technology Inventory

| Technology | Version | Purpose | New? |
|-----------|---------|---------|------|
| Ink | 6.8.0 | Terminal UI framework | Existing |
| React | 19.2.4 | Component model | Existing |
| ink-select-input | 6.2.0 | Selection lists | Existing |
| ink-spinner | 5.0.0 | Loading animations | Existing |
| marked | 15.0.12 | Markdown parsing | Existing |
| marked-terminal | 7.3.0 | Terminal markdown | Existing |
| cli-highlight | 2.1.11 | Syntax highlighting | Existing |
| fzf | latest | Fuzzy file search | **NEW** |
| terminal-image | latest | Terminal image rendering | **NEW** |
| ink-picture | latest | Ink image component | **NEW** (optional) |

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Ink `position="absolute"` overlay has z-index issues | Dialog rendering behind content | Render overlay last in JSX; use backgroundColor to fully cover content beneath |
| Multi-line custom editor is complex | Bug surface area, edge cases | Start with basic multi-line (no vim), add vim modes as separate follow-up |
| Terminal image support varies widely | Broken images in some terminals | `terminal-image` auto-detects and falls back to ANSI blocks |
| fzf dependency may bloat bundle | Larger install | fzf is small (~50KB), justified by file picker necessity |
| Theme color changes break existing tests | Test failures from color assertions | Update snapshot tests after color changes; use theme-agnostic test assertions |
| Scroll offset bugs with streaming | Content jumps during streaming | Auto-scroll-to-bottom when at bottom; freeze scroll position when user scrolled up |
