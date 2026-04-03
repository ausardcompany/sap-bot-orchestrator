# Quickstart: 032-tui-exact-clone

## Prerequisites

- Node.js >= 22.12.0
- npm
- Terminal with 256-color or true-color support (recommended: iTerm2, Kitty, WezTerm, Windows Terminal)
- Project already builds and tests pass: `npm test && npm run lint`

## Install New Dependencies

```bash
# Fuzzy file search for FilePicker
npm install fzf

# Terminal image rendering (optional, for inline images)
npm install terminal-image
```

## Implementation Order

The recommended order minimizes dependency conflicts between components:

### Wave 1: Foundation (no cross-dependencies)

These components can be built in parallel:

1. **Extend ThemeColors** — Add all new color tokens to `theme/types.ts`, `theme/dark.ts`, `theme/light.ts`
2. **PageContext** — New context at `context/PageContext.tsx` (simple useState)
3. **SidebarContext** — New context at `context/SidebarContext.tsx` (useReducer)
4. **useScrollPosition** hook — New at `hooks/useScrollPosition.ts`
5. **useFileChanges** hook — New at `hooks/useFileChanges.ts`

### Wave 2: Core Components (depend on Wave 1)

6. **SplitPane** — New component at `components/SplitPane.tsx` (depends on ThemeColors)
7. **Sidebar** — New component at `components/Sidebar.tsx` (depends on SidebarContext, ThemeColors)
8. **LogViewer** — New component at `components/LogViewer.tsx` (depends on ThemeColors)
9. **Dialog overlay refactor** — Change DialogContext to use `position="absolute"` instead of full replacement

### Wave 3: Dialog Components (depend on Wave 2)

10. **HelpDialog** — New at `dialogs/HelpDialog.tsx`
11. **FilePicker** — New at `dialogs/FilePicker.tsx` (depends on fzf)
12. **QuitDialog** — New at `dialogs/QuitDialog.tsx`
13. **ThemeDialog** — New at `dialogs/ThemeDialog.tsx`
14. **ArgDialog** — New at `dialogs/ArgDialog.tsx`

### Wave 4: Enhanced Components (depend on Waves 1-3)

15. **MessageArea scroll support** — Add useScrollPosition to MessageArea
16. **Header restyle** — Match upstream colors, pill badges, git branch
17. **StatusBar restyle** — Segment separators, background, page indicator
18. **ToolCallBlock enhancements** — Keyboard toggle, duration, tool-specific icons
19. **DiffView enhancements** — Background highlighting, word-level diffs
20. **InputBox multi-line** — Custom editor replacing ink-text-input

### Wave 5: Page Routing + App Layout (depend on everything)

21. **ChatPage** — Extract from App.tsx AppLayout into `pages/ChatPage.tsx`
22. **LogsPage** — New at `pages/LogsPage.tsx`
23. **App.tsx refactor** — Add PageContext, SidebarContext, SplitPane, page routing
24. **useKeyboard enhancements** — Add all missing keybindings

### Wave 6: Polish (optional, nice-to-have)

25. **useVimMode** — Vim-like editing state machine
26. **Image rendering** — terminal-image integration
27. **Restyle all existing dialogs** — Match upstream visual appearance
28. **Theme persistence** — Save theme choice to config file

## Quick Verification

After each wave, verify with:

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Tests
npm test

# Manual TUI check
npm run dev -- interactive
```

## Key Files to Touch

| File | Action |
|------|--------|
| `src/cli/tui/theme/types.ts` | Extend ThemeColors interface |
| `src/cli/tui/theme/dark.ts` | Update colors to match upstream |
| `src/cli/tui/theme/light.ts` | Update colors to match upstream |
| `src/cli/tui/context/PageContext.tsx` | NEW |
| `src/cli/tui/context/SidebarContext.tsx` | NEW |
| `src/cli/tui/context/DialogContext.tsx` | MODIFY (overlay refactor) |
| `src/cli/tui/components/SplitPane.tsx` | NEW |
| `src/cli/tui/components/Sidebar.tsx` | NEW |
| `src/cli/tui/components/LogViewer.tsx` | NEW |
| `src/cli/tui/components/MessageArea.tsx` | MODIFY (scroll) |
| `src/cli/tui/components/Header.tsx` | MODIFY (restyle) |
| `src/cli/tui/components/StatusBar.tsx` | MODIFY (restyle) |
| `src/cli/tui/components/InputBox.tsx` | MODIFY (multi-line) |
| `src/cli/tui/components/ToolCallBlock.tsx` | MODIFY (enhance) |
| `src/cli/tui/components/DiffView.tsx` | MODIFY (enhance) |
| `src/cli/tui/dialogs/HelpDialog.tsx` | NEW |
| `src/cli/tui/dialogs/FilePicker.tsx` | NEW |
| `src/cli/tui/dialogs/QuitDialog.tsx` | NEW |
| `src/cli/tui/dialogs/ThemeDialog.tsx` | NEW |
| `src/cli/tui/dialogs/ArgDialog.tsx` | NEW |
| `src/cli/tui/pages/ChatPage.tsx` | NEW |
| `src/cli/tui/pages/LogsPage.tsx` | NEW |
| `src/cli/tui/hooks/useFileChanges.ts` | NEW |
| `src/cli/tui/hooks/useScrollPosition.ts` | NEW |
| `src/cli/tui/hooks/useVimMode.ts` | NEW |
| `src/cli/tui/hooks/useLogCollector.ts` | NEW |
| `src/cli/tui/hooks/useKeyboard.ts` | MODIFY (new bindings) |
| `src/cli/tui/App.tsx` | MODIFY (layout refactor) |
| `package.json` | MODIFY (add fzf, terminal-image) |

## Smoke Test Checklist

After full implementation:

- [ ] `alexi interactive` launches with OpenCode-style dark theme
- [ ] Ctrl+B toggles sidebar (file changes panel)
- [ ] `?` opens help overlay with all keybindings
- [ ] Ctrl+J switches between Chat and Logs pages
- [ ] PgUp/PgDn scrolls message area
- [ ] Leader+f opens file picker with fuzzy search
- [ ] Ctrl+C shows quit confirmation dialog
- [ ] `/theme` opens interactive theme picker
- [ ] Tool calls show duration and tool-specific icons
- [ ] Diffs show background highlighting
- [ ] Status bar shows segment separators and page indicator
- [ ] All 22 existing tests still pass
- [ ] All new component tests pass
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
