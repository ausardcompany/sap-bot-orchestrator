# Feature Spec: Exact TUI Clone — Kilo/OpenCode Parity

## Overview

The existing Alexi TUI (implemented in `src/cli/tui/` via 001-tui-clone) provides a functional terminal interface using Ink v6.8.0 + React 19. However, it diverges significantly from the upstream Kilo/OpenCode TUI in visual layout, interaction patterns, and missing components.

This feature brings the TUI to **exact visual and functional parity** with the upstream Kilo (kilocode) and OpenCode (opencode-ai/opencode) terminal interfaces by:
1. Copying the exact layout, spacing, borders, and color scheme
2. Adding all missing upstream components (sidebar, file picker, help overlay, quit dialog, theme dialog, logs page, split-pane layout)
3. Matching the exact keybinding scheme and interaction model
4. Reproducing the exact visual rendering of messages, tool calls, diffs, and streaming output

## User Input (verbatim)

> давай все таки сделаем точно такой же ui как в kilo или opencode — можешь взять их форки и полностью скопировать

## Reference Implementation

### Upstream Sources
- **OpenCode**: `opencode-ai/opencode` (Go + Bubble Tea + Lip Gloss) — the canonical TUI reference
- **Kilo**: `Kilo-Org/kilocode` (SolidJS + OpenTUI + Bun) — TypeScript port with UI improvements
- **Crush**: `charmbracelet/crush` (Go, successor to opencode) — latest evolution

### Upstream TUI Structure (opencode-ai/opencode)
```
internal/tui/
├── tui.go                    # Main entry point
├── components/
│   ├── chat/
│   │   ├── chat.go           # Chat page main component
│   │   ├── editor.go         # Vim-like text input editor
│   │   ├── list.go           # Message list/scrolling
│   │   ├── message.go        # Individual message rendering
│   │   └── sidebar.go        # File changes sidebar panel
│   ├── core/
│   │   └── status.go         # Status bar
│   └── dialog/
│       ├── arguments.go      # Command argument input
│       ├── commands.go       # Command palette
│       ├── complete.go       # Autocomplete
│       ├── custom_commands.go # Custom command management
│       ├── filepicker.go     # File picker
│       ├── help.go           # Help/keybinding overlay
│       ├── init.go           # Project initialization
│       ├── models.go         # Model picker
│       ├── permission.go     # Permission approval
│       ├── quit.go           # Quit confirmation
│       ├── session.go        # Session switcher
│       └── theme.go          # Theme switching
├── layout/
│   ├── container.go          # Flexbox container
│   ├── layout.go             # Main layout engine
│   ├── overlay.go            # Modal overlay system
│   └── split.go              # Split-pane layout
├── page/
│   ├── page.go               # Page routing
│   ├── chat.go               # Chat page
│   └── logs.go               # Logs page
├── styles/                   # Lip Gloss style definitions
└── theme/                    # Theme definitions
```

## Requirements

### R1 — Sidebar Panel (File Changes)
Add a collapsible sidebar panel showing files modified by the agent during the session:
- Split-pane layout: sidebar (20-30 chars) + main chat area
- Toggle visibility with keybinding (e.g., Ctrl+B or leader+f)
- Show file paths with modification indicators (+added, ~modified, -deleted)
- Highlight currently-discussed file
- Clicking/selecting a file shows its diff

### R2 — Help/Keybinding Overlay Dialog
Add a help dialog (`?` or `Ctrl+/`) showing all available keybindings:
- Grouped by category (Navigation, Dialogs, Chat, Leader mode)
- Searchable/filterable
- Dismissable with Escape or `q`

### R3 — File Picker Dialog
Add a file picker dialog for attaching files to context:
- Fuzzy file search within the project directory
- File type icons/indicators
- Preview of selected file (first N lines)
- Multi-select capability
- Integrated into `/context` or `/file` slash command

### R4 — Quit Confirmation Dialog
Add a quit confirmation dialog when pressing Ctrl+C or `/exit`:
- Show "Are you sure?" with session summary
- Options: [Y]es quit, [N]o cancel, [S]ave session
- Only shown when there's an active conversation

### R5 — Theme Switching Dialog
Replace programmatic theme toggle with an interactive dialog:
- List available themes with preview colors
- Real-time preview as selection changes
- Persist theme choice to config

### R6 — Logs Page
Add a dedicated logs/debug page accessible via Ctrl+L or leader+l:
- Page routing system (Chat page ↔ Logs page)
- Show tool execution logs, API call timings, token counts
- Scrollable, searchable
- Auto-scroll with pause-on-scroll-up

### R7 — Split-Pane Layout System
Implement a proper split-pane layout matching the upstream:
- Horizontal split: sidebar + main content
- Configurable split ratio
- Drag-to-resize (if terminal supports mouse) or keyboard resize
- Collapsible panels

### R8 — Exact Visual Matching
Match the upstream visual appearance exactly:
- Border styles (rounded corners with box-drawing characters)
- Color scheme matching (exact hex/ANSI codes from upstream themes)
- Spacing and padding (exact character counts)
- Agent badge rendering (colored pill badges)
- Message alignment and indentation
- Tool call block rendering (exact header/body format)
- Diff view formatting (exact line-number alignment)
- Status bar layout (exact segment positioning)

### R9 — Vim-like Input Editor
Enhance InputBox to support vim-like editing (matching upstream's editor.go):
- Normal/Insert/Visual modes (optional, togglable)
- Multi-line editing with proper cursor movement
- Line wrapping with visual indicators
- Undo/redo support
- Selection with Shift+Arrow

### R10 — Command Arguments Dialog
Add a dialog for commands that require named arguments:
- Dynamic form based on command schema
- Input validation with inline error messages
- Tab between fields
- Used by custom commands and complex slash commands

### R11 — Autocomplete Enhancement
Improve autocomplete to match upstream completeness:
- File path completion (with fuzzy matching)
- Slash command completion with descriptions
- Model name completion
- Agent name completion
- Inline popup (not just prefix match)

### R12 — Image Rendering Support
If the terminal supports Sixel/Kitty/iTerm2 image protocol:
- Inline image rendering in message area
- Image thumbnails in attachment bar
- Graceful fallback to text description for unsupported terminals

## Non-Requirements (out of scope)

- Web UI / desktop app / Tauri integration
- Worker thread architecture (Alexi is single-process)
- SolidJS / OpenTUI adoption (continue with Ink + React)
- VS Code extension integration
- SQLite session storage (keep existing session approach)

## Gap Analysis (Current vs. Target)

| Component | Current Status | Target |
|-----------|---------------|--------|
| Header | ✅ Implemented | Match exact upstream styling |
| Message Area | ✅ Implemented | Match scrolling behavior, styling |
| Input Box | ✅ Implemented | Add vim-like editing, multi-line |
| Status Bar | ✅ Implemented | Match exact segment layout |
| Model Picker | ✅ Implemented | Match styling |
| Agent Selector | ✅ Implemented | Match styling |
| Permission Dialog | ✅ Implemented | Match styling |
| Session List | ✅ Implemented | Match styling |
| Command Palette | ✅ Implemented | Match styling, add argument dialog |
| MCP Manager | ✅ Implemented | Match styling |
| Sidebar | ❌ Missing | Add file changes sidebar |
| Help Dialog | ❌ Missing | Add keybinding overlay |
| File Picker | ❌ Missing | Add fuzzy file picker |
| Quit Dialog | ❌ Missing | Add quit confirmation |
| Theme Dialog | ❌ Missing | Add interactive theme picker |
| Logs Page | ❌ Missing | Add debug/logs page |
| Split Pane | ❌ Missing | Add split-pane layout |
| Vim Editor | ❌ Missing | Add vim-like input modes |
| Arg Dialog | ❌ Missing | Add command argument input |
| Image Render | ❌ Missing | Add terminal image protocol |
| Autocomplete | ⚠️ Partial | Enhance with file/inline completion |

## Success Criteria

1. Visually indistinguishable from upstream Kilo/OpenCode TUI in a side-by-side terminal comparison
2. All upstream dialogs and overlays present and functional
3. Sidebar panel shows file changes in split-pane layout
4. Logs page accessible and shows tool execution details
5. Help overlay shows all keybindings
6. File picker works with fuzzy search
7. `npm test` passes with tests for all new components
8. No regressions in non-interactive modes (`--print`, `--file`, `--output json`)
9. Theme system matches upstream color tokens
10. Performance: TUI renders at 60fps with no visible jank during streaming
