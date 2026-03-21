# Research: TUI Text Display & Input Visibility Fix

**Feature**: 005-tui-text-display
**Date**: 2026-03-21

## Research Task 1: Ink `<Static>` Component Behavior

### Question
How does Ink's `<Static>` component interact with a fullscreen layout (`height={rows}`)? Can Static and a fixed-height viewport coexist?

### Findings

**Decision**: Use `<Static>` as a sibling above the main `<Box height={rows}>` viewport.

**Rationale**: Ink's `<Static>` component renders items **once** to stdout and they become part of the terminal's native scrollback buffer. The component takes an `items` array and only renders NEW items (it ignores modifications to existing items). After rendering, Static items are permanently above the dynamic area.

When used alongside a fixed-height `<Box>`, the behavior is:
1. Static items are printed to the terminal output (stdout) once
2. The dynamic area (everything after `<Static>`) is the portion of the screen that Ink continuously re-renders using its patching algorithm
3. The `height={rows}` on the dynamic Box creates a viewport at the bottom of the terminal
4. Static items scroll upward naturally as more items are added

This is the exact same pattern used by:
- **Vitest** — completed test results scroll off, progress bar stays at bottom
- **Jest** — similar pattern with `--watch` mode
- **Claude Code CLI** — completed messages scroll into scrollback, input stays at bottom

**Alternatives Considered**:
1. **Custom scroll viewport with offset state** — Rejected because: adds significant complexity (scroll offset management, key handlers for Page Up/Down, viewport slicing), re-renders all messages on scroll, and fights against Ink's rendering model rather than working with it.
2. **`fullscreen-ink` package** — Considered but rejected: adds a runtime dependency, uses alternate screen buffer which loses scrollback entirely, and is overkill for this fix.
3. **Just `overflow="hidden"` with flex protection** — Rejected because: while `flexShrink={0}` on InputBox would prevent it from disappearing, the MessageArea would still clip content without scrolling. Users couldn't see old messages at all.

**Source**: [Ink README — Static component](https://github.com/vadimdemedes/ink#static), Context7 documentation, Ink source code analysis.

---

## Research Task 2: `flexShrink` Behavior in Ink/Yoga

### Question
Will `flexShrink={0}` on InputBox and StatusBar reliably prevent them from being squeezed?

### Findings

**Decision**: Use `flexShrink={0}` on wrapper Boxes around InputBox and StatusBar.

**Rationale**: Ink uses Yoga (the CSS Flexbox engine from Meta) for layout. In Yoga:
- `flexShrink` defaults to `1` for all flex items, meaning they CAN shrink below their content size when the parent overflows
- Setting `flexShrink={0}` prevents an item from shrinking below its natural/content size
- This is the standard CSS flexbox behavior and is well-tested in Yoga

The InputBox component internally renders a `<Box>` with borders and padding. Its natural content size is approximately 2-3 rows (1 row border-top + 1 row prompt + optional suggestion rows). With `flexShrink={0}`, Yoga will never reduce it below this size.

Similarly, StatusBar is a single-line component. With `flexShrink={0}`, it always gets at least 1 row.

The remaining space (after Header height=3, InputBox ~2-3 rows, StatusBar ~1 row) is given to MessageArea via `flexGrow={1}`.

**Alternatives Considered**:
1. **Explicit `height` on InputBox** — Rejected because InputBox has variable height (autocomplete suggestions add rows). Fixed height would clip suggestions.
2. **`minHeight` on InputBox** — Viable but `flexShrink={0}` is simpler and more idiomatic in flexbox.

---

## Research Task 3: `marked-terminal` Width Calculation

### Question
What is the correct width parameter for `marked-terminal` given the component padding chain?

### Findings

**Decision**: Default to `columns - 8` instead of `columns - 4`.

**Rationale**: The padding chain from the terminal edge to the markdown content is:

```
Terminal edge
├── paddingX={1} on MessageBubble outer <Box>  → +1 left, +1 right = 2 chars
│   ├── paddingLeft={2} on content <Box>       → +2 left = 2 chars
│   │   └── [MARKDOWN CONTENT HERE]
│   └── (end padding)
└── (end padding)
```

Total left padding: 1 + 2 = 3 chars
Total right padding: 1 char
Total horizontal padding: 4 chars

But `marked-terminal` adds its own internal padding for code blocks, lists, and blockquotes. Looking at `marked-terminal` source:
- Code blocks add 4 chars of padding (2 left border + 2 internal padding)
- Blockquotes add 2 chars (border)
- Lists add 2 chars (bullet + space)

So the effective available width for content inside code blocks is `columns - 4 (our padding) - 4 (marked-terminal code block padding) = columns - 8`.

Setting `width: Math.max(40, columns - 8)` in `createMarkedInstance` ensures:
- Regular text has a small right margin (safe)
- Code blocks fit within the terminal without wrapping
- Minimum width of 40 prevents excessive squishing on very narrow terminals

**Alternatives Considered**:
1. **Pass exact available width from parent** — Viable as a `maxWidth` prop. Added as optional prop for callers that know their exact padding context.
2. **Dynamic width based on nesting level** — Over-engineered for this use case.

---

## Research Task 4: Tool Call Association on Stream Completion

### Question
When streaming ends and a completed assistant message is created, how do we capture the tool calls that occurred during that response?

### Findings

**Decision**: Capture `chat.completedToolCalls` when creating the assistant `MessageDisplay`, then clear them.

**Rationale**: The current flow is:
1. User sends message → `useStreamChat` starts streaming
2. During streaming, tool calls are added to `ChatContext.activeToolCalls`
3. As tool calls complete, they move from `activeToolCalls` to `completedToolCalls`
4. When streaming ends (`isStreaming` goes false), `App.tsx` creates an `assistantMessage` with `toolCalls: []`

The fix is straightforward:
1. When creating the assistant message, set `toolCalls: [...chat.completedToolCalls]`
2. After capturing, dispatch a new action to clear `completedToolCalls` (or it naturally resets on next RESET)

Looking at `ChatContext.tsx`:
- The `RESET` action already sets `completedToolCalls: []`
- We need to add a `CLEAR_COMPLETED_TOOL_CALLS` action, OR simply use the reset that happens when the next message is sent

The simplest approach: after creating the assistant message and calling `chat.clearStreamText()`, also clear completed tool calls. The ChatContext can have a new `clearCompletedToolCalls` method, or we can just read them before clearing the stream text and not worry about clearing them (they'll be cleared on next RESET).

**Decision**: Read `completedToolCalls` when creating the message. Add a `clearCompletedToolCalls` action to ChatContext for cleanliness.

---

## Research Task 5: Ink `<Static>` with React Fragments

### Question
Can `<Static>` be placed inside a React Fragment (`<>...</>`) alongside the main layout Box?

### Findings

**Decision**: Yes, use a Fragment wrapper.

**Rationale**: From Ink source code and documentation:
- `<Static>` must be a direct child of the root component (or at least not nested inside another Box)
- React Fragments (`<>...</>`) are transparent to Ink's rendering — they don't create layout nodes
- The pattern `<><Static>...</Static><Box height={rows}>...</Box></>` is the recommended approach

Ink processes the component tree top-to-bottom. `<Static>` items are rendered to stdout in order, then the remaining dynamic content is rendered in the "viewport" area that Ink manages.

**Source**: Ink README examples, Ink test suite patterns.

---

## Research Task 6: Performance Impact of `<Static>` vs Current Approach

### Question
How much performance improvement does `<Static>` provide?

### Findings

**Decision**: Significant improvement — from O(n) re-renders per chunk to O(1).

**Current behavior**:
- Each streaming chunk triggers `APPEND_STREAM_TEXT`
- This causes React to re-render `MessageArea`
- `MessageArea` re-renders ALL completed messages (each `MessageBubble` + `ToolCallBlock`)
- Each `MessageBubble` with assistant content runs `MarkdownRenderer` which calls `marked.parse()`
- `useMemo` prevents re-parsing completed messages (stable `markdown` prop), but React still diffing all the JSX elements

**With `<Static>`**:
- Completed messages are rendered ONCE when they enter the `<Static>` items array
- After that, Ink never touches them again — they're part of stdout
- Each streaming chunk only re-renders the slim `MessageArea` (just streaming text + active tool calls)
- `MarkdownRenderer` only runs for the streaming text, not for any completed messages

For a conversation with 20 completed messages and streaming in progress:
- **Before**: Each chunk re-renders ~20 MessageBubbles + 20 ToolCallBlocks + streaming text
- **After**: Each chunk re-renders ONLY the streaming text + any active tool calls

This is especially noticeable on slower terminals or with long conversations.

---

## Summary of All Decisions

| Research Question | Decision | Confidence |
|-------------------|----------|------------|
| Ink `<Static>` + fixed viewport | Use `<Static>` as sibling above `<Box height={rows}>` | High |
| Flex protection for InputBox/StatusBar | `flexShrink={0}` on wrapper Boxes | High |
| Markdown width calculation | `columns - 8` default, optional `maxWidth` prop | High |
| Tool call capture on completion | Read `completedToolCalls` when creating message, add clear action | High |
| `<Static>` in Fragment | Use `<>...</>` wrapper, works correctly | High |
| Performance impact | O(n) → O(1) per-chunk renders, significant improvement | High |

All NEEDS CLARIFICATION items resolved. No remaining unknowns.
