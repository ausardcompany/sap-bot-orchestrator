# Implementation Plan: Exact TUI Clone — Kilo/OpenCode Parity

**Branch**: `032-tui-exact-clone` | **Date**: 2026-04-02 | **Spec**: [specs/032-tui-exact-clone/spec.md](spec.md)
**Input**: Feature specification from `/specs/032-tui-exact-clone/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Bring the existing Alexi TUI (`src/cli/tui/`) to exact visual and functional parity with the upstream Kilo/OpenCode terminal interfaces. The existing TUI (28 source files, 22 test files) provides a solid foundation but is missing 9 upstream components (sidebar, help dialog, file picker, quit dialog, theme dialog, logs page, split-pane layout, vim-like editor, command argument dialog) and diverges in visual styling. This plan adds all missing components, matches the exact upstream visual appearance, and enhances existing components to reach pixel-perfect terminal parity.

## Technical Context

**Language/Version**: TypeScript 5.9 / Node.js >= 22.12.0 / ES Modules  
**Primary Dependencies**: Ink v6.8.0, React v19.2.4, ink-text-input v6.0.0, ink-select-input v6.2.0, ink-spinner v5.0.0, marked v15.0.12, marked-terminal v7.3.0, cli-highlight v2.1.11  
**Storage**: In-memory session state (no SQLite); file system for config persistence  
**Testing**: Vitest + ink-testing-library v4.0.0 + @vitejs/plugin-react v6.0.1  
**Target Platform**: Linux/macOS/Windows terminals with 256-color or true-color support  
**Project Type**: CLI application with reactive TUI (Ink/React)  
**Performance Goals**: 60fps rendering during streaming; <16ms per frame; no visible jank  
**Constraints**: Must work in terminals as small as 80×24; graceful degradation for limited color terminals  
**Scale/Scope**: ~9 new components, ~6 enhanced existing components, ~15 new test files; total TUI codebase growth from 28 to ~43 source files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with [Alexi Constitution](.specify/memory/constitution.md) before proceeding.

| # | Gate | Status |
|---|------|--------|
| 1 | **SAP AI Core-First** — All LLM calls route through SAP AI Core Orchestration; no direct provider API calls outside `src/providers/`. | [PASS] TUI is purely a presentation layer; all LLM calls still flow through `src/providers/sap/` via `streamChat()`. No new LLM call paths introduced. |
| 2 | **CLI-First** — Feature is reachable from the CLI; `--print`/`--file` non-interactive modes unaffected; stdout/stderr contract preserved. | [PASS] TUI is the interactive mode only (`alexi interactive`). Non-interactive modes (`--print`, `--file`, `--output json`) are untouched. |
| 3 | **Provider Abstraction** — Changes confined to `src/providers/` + `src/config/` for any provider-level work; no provider SDK imports outside `src/providers/`. | [PASS] No provider changes. TUI consumes the existing streaming interface. |
| 4 | **Agentic Architecture** — Agent specialisation declared in `src/agent/prompts/`; tool results flow through event bus; MCP hot-pluggable. | [PASS] TUI subscribes to event bus via existing `useToolEvents` and `usePermission` hooks. No changes to agent/bus architecture. MCP manager dialog already exists. |
| 5 | **Test Discipline (BLOCKING)** — New public functions/classes have unit tests; bug fixes have regression tests; `npm test` green; no real network/filesystem calls in tests. | [PASS] All 9 new components and 6 enhanced components will have corresponding test files using ink-testing-library. Tests use mocked contexts, no real network/filesystem. |
| 6 | **Simplicity / YAGNI** — No unjustified abstractions; complexity violations documented in Complexity Tracking table below. | [PASS with notes] Split-pane layout and vim-like editor are justified by upstream parity requirement. See Complexity Tracking. |
| 7 | **Security & Credential Hygiene (BLOCKING)** — No credentials committed; secrets via env vars only; no `console.log` in non-CLI modules. | [PASS] TUI uses logger utilities. No credential handling in UI layer. |

## Project Structure

### Documentation (this feature)

```text
specs/032-tui-exact-clone/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/cli/tui/
├── index.ts                          # Entry point (existing)
├── App.tsx                           # Root component (enhance: add page routing)
│
├── components/                       # Presentational components
│   ├── Header.tsx                    # (existing — restyle to match upstream)
│   ├── StatusBar.tsx                 # (existing — restyle to match upstream)
│   ├── InputBox.tsx                  # (existing — enhance with vim modes)
│   ├── MessageArea.tsx               # (existing — restyle)
│   ├── MessageBubble.tsx             # (existing — restyle)
│   ├── MarkdownRenderer.tsx          # (existing)
│   ├── ToolCallBlock.tsx             # (existing — restyle)
│   ├── DiffView.tsx                  # (existing — restyle)
│   ├── Spinner.tsx                   # (existing)
│   ├── AttachmentBar.tsx             # (existing)
│   ├── CommandPalette.tsx            # (existing — enhance with arg dialog)
│   ├── Sidebar.tsx                   # NEW: file changes sidebar panel
│   ├── SplitPane.tsx                 # NEW: horizontal split container
│   └── LogViewer.tsx                 # NEW: logs page content component
│
├── context/
│   ├── ThemeContext.tsx              # (existing)
│   ├── SessionContext.tsx            # (existing)
│   ├── ChatContext.tsx               # (existing — add file change tracking)
│   ├── KeybindContext.tsx            # (existing)
│   ├── DialogContext.tsx             # (existing — add new dialog types)
│   ├── AttachmentContext.tsx         # (existing)
│   ├── PageContext.tsx               # NEW: page routing state (chat/logs)
│   └── SidebarContext.tsx            # NEW: sidebar visibility + file list state
│
├── dialogs/
│   ├── PermissionDialog.tsx          # (existing — restyle)
│   ├── ModelPicker.tsx               # (existing — restyle)
│   ├── AgentSelector.tsx             # (existing — restyle)
│   ├── SessionList.tsx               # (existing — restyle)
│   ├── McpManager.tsx                # (existing — restyle)
│   ├── HelpDialog.tsx                # NEW: keybinding overlay
│   ├── FilePicker.tsx                # NEW: fuzzy file search dialog
│   ├── QuitDialog.tsx                # NEW: quit confirmation
│   ├── ThemeDialog.tsx               # NEW: theme switching with preview
│   └── ArgDialog.tsx                 # NEW: command argument input form
│
├── hooks/
│   ├── useStreamChat.ts             # (existing)
│   ├── useKeyboard.ts               # (existing — add new bindings)
│   ├── useCommands.ts               # (existing — integrate arg dialog)
│   ├── usePermission.ts             # (existing)
│   ├── useToolEvents.ts             # (existing — add file change tracking)
│   ├── useClipboardImage.ts         # (existing)
│   ├── useFileChanges.ts            # NEW: track files modified by agent
│   └── useVimMode.ts                # NEW: vim-like editing state machine
│
├── pages/
│   ├── ChatPage.tsx                  # NEW: extracted from AppLayout
│   └── LogsPage.tsx                  # NEW: debug/logs page
│
├── theme/
│   ├── types.ts                     # (existing — extend with upstream tokens)
│   ├── dark.ts                      # (existing — match upstream colors exactly)
│   └── light.ts                     # (existing — match upstream colors exactly)
│
└── types/
    ├── props.ts                     # (existing — add new component props)
    └── marked-terminal.d.ts         # (existing)

tests/cli/tui/
├── [22 existing test files]
├── Sidebar.test.tsx                 # NEW
├── SplitPane.test.tsx               # NEW
├── LogViewer.test.tsx               # NEW
├── HelpDialog.test.tsx              # NEW
├── FilePicker.test.tsx              # NEW
├── QuitDialog.test.tsx              # NEW
├── ThemeDialog.test.tsx             # NEW
├── ArgDialog.test.tsx               # NEW
├── ChatPage.test.tsx                # NEW
├── LogsPage.test.tsx                # NEW
├── PageContext.test.tsx             # NEW
├── SidebarContext.test.tsx          # NEW
├── useFileChanges.test.ts          # NEW
└── useVimMode.test.ts              # NEW
```

**Structure Decision**: Extend the existing `src/cli/tui/` directory structure. New components follow the established pattern (components/, context/, dialogs/, hooks/). Add a new `pages/` subdirectory for page-level routing. All new files follow camelCase naming convention.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Split-pane layout component (`SplitPane.tsx`) | Upstream parity requires sidebar + main content split view; this is a core layout primitive in both OpenCode and Kilo | A simple toggle between sidebar-only and chat-only views would not match the upstream UX where both are visible simultaneously |
| Vim-like input modes (`useVimMode.ts`) | Upstream editor.go provides vim-like editing; this is a distinguishing UX feature | Basic text input without modes would diverge from upstream; making it opt-in (togglable) mitigates complexity for non-vim users |
| Page routing system (`PageContext.tsx`) | Upstream has chat page + logs page routing; needed for logs/debug view | Embedding logs in the chat page as a dialog would conflict with the dialog overlay system and not match upstream navigation |
