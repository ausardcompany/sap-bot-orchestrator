# TUI Requirements Quality Checklist: Exact TUI Clone — Kilo/OpenCode Parity

**Purpose**: Validate that requirements in spec.md are complete, clear, consistent, measurable, and cover all necessary scenarios for implementing upstream TUI parity.
**Created**: 2026-04-03
**Feature**: [specs/032-tui-exact-clone/spec.md](../spec.md)

## Requirement Completeness

- [ ] CHK001 Are all upstream TUI components explicitly enumerated as requirements? The gap analysis table (§Gap Analysis) lists 21 components but only 12 have dedicated requirement sections (R1–R12). [Completeness, Spec §Gap Analysis]
- [ ] CHK002 Are requirements defined for the existing components that need restyling (Header, Message Area, Input Box, Status Bar, Model Picker, Agent Selector, Permission Dialog, Session List, Command Palette, MCP Manager)? R8 mentions them briefly but does not specify per-component acceptance criteria. [Completeness, Spec §R8]
- [ ] CHK003 Are page routing requirements documented beyond the Logs Page? R6 specifies Chat↔Logs but does not define the routing model, URL-like state management, or back-navigation behavior. [Completeness, Spec §R6]
- [ ] CHK004 Are event bus subscription requirements defined for new TUI components? The plan references useToolEvents and usePermission hooks but the spec does not specify which events each new component should consume. [Gap]
- [ ] CHK005 Are state persistence requirements defined for sidebar visibility, scroll position, and vim mode across page switches? [Gap]
- [ ] CHK006 Are requirements defined for the provider tree ordering when adding new context providers (PageContext, SidebarContext)? [Gap]
- [ ] CHK007 Is the file change tracking mechanism specified — what tool events produce FileChange entries, and how are additions/deletions counted? [Completeness, Spec §R1]
- [ ] CHK008 Are requirements defined for how the dialog overlay interacts with keyboard focus management across all existing and new dialogs? [Gap]

## Requirement Clarity

- [ ] CHK009 Is "exact visual and functional parity" (§Overview) quantified with a specific upstream commit/version as the reference baseline? [Clarity, Spec §Overview]
- [ ] CHK010 Is "visually indistinguishable" (Success Criteria §1) defined with measurable criteria? What constitutes "indistinguishable" — pixel-level matching, color-value matching, or subjective comparison? [Measurability, Spec §Success Criteria]
- [ ] CHK011 Are "exact hex/ANSI codes" (§R8) specified inline or is the reference source documented? The spec says "from upstream themes" without citing specific file paths or commit hashes. [Clarity, Spec §R8]
- [ ] CHK012 Is "20-30 chars" sidebar width (§R1) specified as a fixed value, a configurable range, or a responsive calculation? [Clarity, Spec §R1]
- [ ] CHK013 Is "Searchable/filterable" for the help dialog (§R2) defined — search by key name, description, category, or all? [Clarity, Spec §R2]
- [ ] CHK014 Is "first N lines" for file preview in the file picker (§R3) quantified with a specific number? [Clarity, Spec §R3]
- [ ] CHK015 Is "Real-time preview as selection changes" for the theme dialog (§R5) defined — does it mean the entire TUI re-renders or just a color swatch preview? [Clarity, Spec §R5]
- [ ] CHK016 Is "60fps with no visible jank" (Success Criteria §10) defined with a measurement methodology? [Measurability, Spec §Success Criteria]
- [ ] CHK017 Are "exact character counts" for spacing and padding (§R8) documented, or is the upstream source code the implicit specification? [Clarity, Spec §R8]
- [ ] CHK018 Is "Drag-to-resize (if terminal supports mouse)" (§R7) specified with a fallback — what happens when mouse is not supported? [Clarity, Spec §R7]

## Requirement Consistency

- [ ] CHK019 Does R6 specify "Ctrl+L or leader+l" for logs page access, but the existing codebase uses Ctrl+L for "clear messages"? Is the keybinding conflict resolved in the spec? [Conflict, Spec §R6]
- [ ] CHK020 Does R1 specify "Ctrl+B or leader+f" for sidebar toggle, but R3 uses leader+f for file picker? Is the keybinding overlap resolved? [Conflict, Spec §R1 vs §R3]
- [ ] CHK021 Are border style requirements consistent? R8 mentions "rounded corners with box-drawing characters" as the target, but research.md D8 decided to change from round to single for main UI and keep round only for dialogs. Does the spec reflect this decision? [Consistency, Spec §R8]
- [ ] CHK022 Is the term "collapsible" used consistently? R1 uses it for sidebar, R7 uses it for split-pane panels — do they share the same collapse mechanism? [Consistency, Spec §R1 vs §R7]
- [ ] CHK023 Are agent badge rendering requirements (§R8) consistent with the existing agent color system? Are new agents or renamed agents accounted for? [Consistency, Spec §R8]

## Acceptance Criteria Quality

- [ ] CHK024 Can Success Criteria §1 ("visually indistinguishable") be objectively verified by an automated test, or is it inherently subjective? [Measurability, Spec §Success Criteria]
- [ ] CHK025 Are acceptance criteria defined per requirement (R1–R12), or only at the feature level (Success Criteria §1–10)? Individual per-requirement acceptance criteria are missing. [Gap]
- [ ] CHK026 Is Success Criteria §7 ("npm test passes with tests for all new components") specific enough — does it define minimum test coverage, assertion count, or test categories required? [Measurability, Spec §Success Criteria]
- [ ] CHK027 Is Success Criteria §8 ("No regressions in non-interactive modes") defined with a specific test plan or regression suite? [Measurability, Spec §Success Criteria]
- [ ] CHK028 Can Success Criteria §9 ("Theme system matches upstream color tokens") be automatically verified by comparing exported token values? [Measurability, Spec §Success Criteria]

## Scenario Coverage

- [ ] CHK029 Are requirements defined for what happens when the sidebar is open and a dialog overlay appears? Does the dialog cover the sidebar, the chat area, or both? [Coverage, Spec §R1 + §R8]
- [ ] CHK030 Are requirements defined for keyboard focus order when multiple interactive areas are present (sidebar, input box, dialog, message area scroll)? [Coverage, Gap]
- [ ] CHK031 Are requirements defined for what the Logs Page shows when no tool executions have occurred yet (empty state)? [Coverage, Spec §R6]
- [ ] CHK032 Are requirements defined for how the file picker behaves in a repository with no files (empty project), or with thousands of files (performance)? [Coverage, Spec §R3]
- [ ] CHK033 Are requirements defined for vim mode interaction with slash commands — if the user is in vim normal mode, does `/` enter command mode or vim search? [Coverage, Spec §R9]
- [ ] CHK034 Are requirements defined for multi-line input behavior when vim mode is disabled — how does Shift+Enter work without vim? [Coverage, Spec §R9]
- [ ] CHK035 Are requirements defined for how streaming text interacts with the scroll position — if the user has scrolled up, does new content auto-scroll or maintain position? [Coverage, Spec §R6]
- [ ] CHK036 Are requirements defined for concurrent dialog stacking — can a help dialog be opened while a model picker is already open? [Coverage, Gap]

## Edge Case Coverage

- [ ] CHK037 Are requirements defined for terminals below the minimum 80×24 constraint? Does the TUI crash, degrade gracefully, or display a warning? [Edge Case, Spec §Plan Technical Context]
- [ ] CHK038 Are requirements defined for color rendering in terminals with only 16-color or no-color support? §R8 targets "256-color or true-color" but does not specify fallback behavior. [Edge Case, Spec §R8]
- [ ] CHK039 Are requirements defined for extremely long file paths in the sidebar that exceed the sidebar width? [Edge Case, Spec §R1]
- [ ] CHK040 Are requirements defined for what happens when the quit dialog's "Save session" option is selected but session persistence fails? [Edge Case, Spec §R4]
- [ ] CHK041 Are requirements defined for image rendering when the image file path is invalid, the file is too large, or the format is unsupported? [Edge Case, Spec §R12]
- [ ] CHK042 Are requirements defined for the file picker when the working directory is not readable or contains symlink loops? [Edge Case, Spec §R3]
- [ ] CHK043 Are requirements defined for vim mode undo/redo stack limits? Can the undo stack grow unbounded? [Edge Case, Spec §R9]

## Non-Functional Requirements

- [ ] CHK044 Are performance requirements defined per-component (e.g., file picker search latency, sidebar render time) or only globally ("60fps")? [Completeness, Spec §Success Criteria]
- [ ] CHK045 Are memory usage requirements defined for long-running sessions with many log entries and file changes? [Gap]
- [ ] CHK046 Are accessibility requirements defined beyond keyboard navigation — e.g., screen reader compatibility, high contrast mode, or terminal accessibility tools? [Gap]
- [ ] CHK047 Are internationalization requirements defined — are all UI strings hardcoded English, or should they be localizable? [Gap]
- [ ] CHK048 Are terminal compatibility requirements specified beyond "Linux/macOS/Windows"? Which terminal emulators are explicitly supported? [Completeness, Spec §Plan Technical Context]

## Dependencies & Assumptions

- [ ] CHK049 Is the assumption that Ink v6 `position="absolute"` provides reliable overlay rendering validated? Are known limitations documented? [Assumption]
- [ ] CHK050 Is the dependency on the `fzf` npm package validated for bundle size, security, and maintenance status? [Dependency]
- [ ] CHK051 Is the dependency on `terminal-image` validated — the spec notes it is "maintained by sindresorhus" but does not confirm active maintenance status for 2026? [Dependency]
- [ ] CHK052 Is the assumption that `ink-text-input` must be replaced (not extended) for multi-line support validated with evidence? [Assumption, Spec §R9]
- [ ] CHK053 Are requirements for backwards compatibility with the existing TUI API documented? Will existing `alexi interactive` flags and behaviors be preserved? [Dependency, Gap]

## Notes

- Check items off as completed: `[x]`
- Add comments or findings inline
- Items are numbered sequentially (CHK001–CHK053) for easy reference
- Reference format: `[Quality Dimension, Spec §Section]` or `[Gap]` for missing requirements
- Focus: Comprehensive TUI requirements quality across all 12 requirements
