# Quickstart: TUI Text Display & Input Visibility Fix

**Feature**: 005-tui-text-display
**Date**: 2026-03-21

## Prerequisites

- Node.js >= 22.12.0
- `npm install` completed
- `npm run build` passing
- `npm test` passing (baseline)

## Implementation Quickstart

### Step 1: Create Feature Branch

```bash
git checkout master
git checkout -b 005-tui-text-display
```

### Step 2: Phase A — Flex Protection (5 min)

**File**: `src/cli/tui/App.tsx`

Wrap InputBox and StatusBar with `flexShrink={0}`:

```tsx
// Line ~243: Wrap InputBox
<Box flexShrink={0}>
  <InputBox ... />
</Box>

// Line ~253: Wrap StatusBar
<Box flexShrink={0}>
  <StatusBar ... />
</Box>
```

**Verify**: `npm run build && npm run dev` — input should remain visible even with long output.

### Step 3: Phase B — Static Messages (30-45 min)

**File 1**: `src/cli/tui/context/ChatContext.tsx`

Add `CLEAR_COMPLETED_TOOL_CALLS` action:

```typescript
// In ChatAction union type (~line 62):
| { type: 'CLEAR_COMPLETED_TOOL_CALLS' }

// In chatReducer (~line 134, before 'RESET'):
case 'CLEAR_COMPLETED_TOOL_CALLS':
  return { ...state, completedToolCalls: [] };

// In ChatContextValue interface:
clearCompletedToolCalls: () => void;

// In ChatProvider:
const clearCompletedToolCalls = useCallback(() => {
  dispatch({ type: 'CLEAR_COMPLETED_TOOL_CALLS' });
}, []);

// In value object:
clearCompletedToolCalls,
```

**File 2**: `src/cli/tui/App.tsx`

1. Import `Static` from `ink`
2. Import `MessageBubble` and `ToolCallBlock` (for Static rendering)
3. Restructure `AppLayout` return to use `<Static>` + dynamic viewport (see plan.md Phase B)
4. Update streaming completion handler to capture `completedToolCalls`

**File 3**: `src/cli/tui/components/MessageArea.tsx`

1. Remove `messages` from `MessageAreaProps`
2. Remove the completed messages rendering loop
3. Keep only: active tool calls, streaming text, spinner

**Verify**: `npm run build && npm run dev` — completed messages should scroll into terminal scrollback; input always visible.

### Step 4: Phase C — Markdown Width (10 min)

**File 1**: `src/cli/tui/types/props.ts`

Add `maxWidth?: number` to `MarkdownRendererProps`.

**File 2**: `src/cli/tui/components/MarkdownRenderer.tsx`

Change width from `columns - 4` to `maxWidth ?? Math.max(40, columns - 8)`.

**Verify**: Long code blocks and paragraphs should not wrap unexpectedly.

### Step 5: Phase D — User Message Wrapping (5 min)

**File**: `src/cli/tui/components/MessageBubble.tsx`

Move user content to its own line with `paddingLeft={2}` and `wrap="wrap"`.

**Verify**: Long user inputs wrap properly.

### Step 6: Phase E — Tests (20-30 min)

Add tests for:
1. `closePartialFences` — verify odd/even fence counts
2. Markdown width calculation — verify `maxWidth` prop is respected
3. Component render smoke tests if using `ink-testing-library`

```bash
npm test
npm run lint
npm run typecheck
```

### Step 7: Final Verification

```bash
# Full CI check
npm run typecheck && npm run lint && npm test

# Manual testing
npm run dev
# 1. Send a message → verify input stays visible
# 2. Send multiple messages → verify old messages scroll into scrollback
# 3. Get a long code response → verify code blocks don't overflow
# 4. Type a very long message → verify it wraps
# 5. Check streaming → verify only streaming area re-renders
```

## Key Files Reference

| File | Phase | Change |
|------|-------|--------|
| `src/cli/tui/App.tsx` | A, B | flexShrink + Static layout |
| `src/cli/tui/context/ChatContext.tsx` | B | clearCompletedToolCalls action |
| `src/cli/tui/components/MessageArea.tsx` | B | Remove messages prop, streaming-only |
| `src/cli/tui/components/MarkdownRenderer.tsx` | C | Width fix + maxWidth prop |
| `src/cli/tui/types/props.ts` | C | maxWidth in MarkdownRendererProps |
| `src/cli/tui/components/MessageBubble.tsx` | D | User message wrapping |
