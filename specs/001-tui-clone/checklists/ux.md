# TUI/UX Requirements Quality Checklist: Full TUI Clone

**Purpose**: Validate the completeness, clarity, consistency, and measurability of TUI/UX requirements in spec.md, data-model.md, and contracts/. Tests the *requirements* themselves, not the implementation.
**Created**: 2026-03-21
**Feature**: [spec.md](../spec.md) | [plan.md](../plan.md) | [contracts/](../contracts/)
**Focus**: TUI/UX — component behavior, layout, interaction states, accessibility, edge cases
**Depth**: Standard (~25 items)
**Audience**: PR Reviewer

---

## Requirement Completeness

- [ ] CHK001 Are empty/zero-state requirements defined for the message area when no conversation history exists? [Gap, Spec §R2]
- [ ] CHK002 Are loading state requirements specified for the initial TUI launch (before session and model are resolved)? [Gap, Spec §R2]
- [ ] CHK003 Are error display requirements defined for LLM connection failures, timeout, and rate-limit errors? [Gap, Spec §R3]
- [ ] CHK004 Are requirements defined for what the StatusBar displays during streaming vs idle states? [Completeness, Spec §R2]
- [ ] CHK005 Are requirements specified for tool call output truncation when output exceeds viewport height? [Gap, Spec §R4]
- [ ] CHK006 Are empty-list requirements defined for dialogs when data is unavailable (e.g., no saved sessions, no MCP servers connected)? [Gap, Spec §R5]
- [ ] CHK007 Are exit/cleanup requirements specified for TUI teardown (restoring terminal state, flushing buffers)? [Gap]
- [ ] CHK008 Are requirements defined for displaying multiple concurrent tool calls and their ordering? [Gap, Spec §R4]

## Requirement Clarity

- [ ] CHK009 Is "multi-line capable" for the input area quantified — does it mean Shift+Enter newlines, or auto-growing height, or both? Research.md §5 says single-line for Phase 1, but spec §R2 says "multi-line capable" without qualification. [Ambiguity, Spec §R2]
- [ ] CHK010 Is "scrollable" for the message area defined with specific scroll mechanics (line-by-line, page-by-page, smooth scroll)? [Clarity, Spec §R2]
- [ ] CHK011 Are "syntax-highlighted code blocks" specified with supported languages and fallback for unknown languages? [Clarity, Spec §R3]
- [ ] CHK012 Is "collapsible" for tool call output defined — what is the default state (expanded or collapsed) for active vs completed calls? [Clarity, Spec §R4]
- [ ] CHK013 Is the "agent-colored prompt" requirement specified with exact color values or does it defer to the theme system? [Clarity, Spec §R2]
- [ ] CHK014 Are the Ctrl+K "command palette" fuzzy search matching rules defined (prefix match, substring, Levenshtein distance)? [Clarity, Spec §R7]

## Requirement Consistency

- [ ] CHK015 Are the `AgentName` type definitions consistent between `data-model.md` §1 (SessionState), `theme/types.ts`, and `context/SessionContext.tsx`? The type is duplicated in at least two locations. [Consistency]
- [ ] CHK016 Is the dialog type list consistent between `data-model.md` §3 (DialogType union) and the 5 dialogs listed in spec §R5? Data-model adds `session-rename`, `command-palette`, `confirm`, `alert` which are not in the spec. [Consistency, Spec §R5]
- [ ] CHK017 Are theme color requirements consistent between `data-model.md` §3 (ThemeColors) and the "no hard-coded ANSI" requirement in spec §R8? Is there a defined migration path for existing `src/cli/utils/colors.ts` consumers? [Consistency, Spec §R8]

## Acceptance Criteria Quality

- [ ] CHK018 Can success criterion #1 ("persistent TUI with header, message area, input, status bar") be objectively measured with specific layout dimensions and content? [Measurability, Spec §Success Criteria]
- [ ] CHK019 Can success criterion #7 ("~1960-line interactive.ts monolith is decomposed") be objectively measured — is there a maximum file size or component count threshold? [Measurability, Spec §Success Criteria]
- [ ] CHK020 Are the plan.md performance goals (<50ms input-to-render, 30+ chunks/sec) traceable to testable acceptance criteria in the spec? The spec mentions no performance targets. [Measurability, Gap]

## Scenario Coverage

- [ ] CHK021 Are requirements defined for permission dialog behavior when a second permission request arrives while the first dialog is still open? [Coverage, Exception Flow, Spec §R6]
- [ ] CHK022 Are requirements defined for keyboard shortcut conflicts with terminal emulator shortcuts (e.g., Ctrl+C captured by terminal before Ink)? [Coverage, Spec §R7]
- [ ] CHK023 Are terminal resize requirements specified — should the layout reflow, and what happens to scroll position and dialog positioning on resize? [Coverage, Gap]
- [ ] CHK024 Are requirements defined for the streaming behavior when the LLM response contains extremely long unbroken lines (>terminal width) or extremely large responses (>100K tokens)? [Coverage, Edge Case, Spec §R3]

## Edge Case Coverage

- [ ] CHK025 Is the fallback behavior specified for terminals that do not support ANSI colors or 256-color mode? [Edge Case, Gap]
- [ ] CHK026 Are requirements defined for the cost display format when cost is $0.00, unknown, or when the cost API is unavailable? [Edge Case, Spec §R2]
- [ ] CHK027 Are requirements specified for what happens when the user pastes a very large text block (>10KB) into the InputBox? [Edge Case, Spec §R2]

## Non-Functional Requirements

- [ ] CHK028 Are accessibility requirements defined for keyboard-only navigation through all TUI elements (message area, dialogs, command palette)? Spec mentions keybindings but not systematic a11y. [Gap, NFR]
- [ ] CHK029 Are color contrast requirements defined to meet WCAG-equivalent standards for terminal UIs? [Gap, NFR]
- [ ] CHK030 Is the minimum terminal size (80x24 in plan.md) documented in the spec as a non-functional requirement with defined behavior when the terminal is smaller? [Gap, NFR]

## Notes

- Check items off as completed: `[x]`
- Add inline findings or decisions as sub-bullets under each item
- Reference spec/plan sections when resolving items
- Items marked `[Gap]` indicate missing requirements that should be added to spec.md
- Items marked `[Ambiguity]` indicate requirements needing clarification
- Items marked `[Consistency]` indicate potential conflicts between documents
