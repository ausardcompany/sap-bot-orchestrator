# Implementation Plan: TUI Text Display & Input Visibility Fix

**Branch**: `005-tui-text-display` | **Date**: 2026-03-21 | **Spec**: `/specs/001-tui-clone/spec.md` (R2 — Persistent Layout)
**Input**: User report — text displays poorly in TUI, input line disappears when output fills screen

## Summary

Fix critical TUI display issues where (1) the input line disappears when assistant output fills the terminal viewport, and (2) text rendering has width/wrapping problems. The root cause is that all messages (completed + streaming) are rendered inside a single `overflow="hidden"` flexbox with no scrolling, and InputBox/StatusBar lack flex-shrink protection. The fix uses Ink's `<Static>` component to move completed messages into the terminal's native scrollback buffer, keeping only the active streaming response in the dynamic viewport alongside a permanently-visible input line.

## Technical Context

**Language/Version**: TypeScript 5.9 / Node.js >= 22.12.0 / ES Modules
**Primary Dependencies**: Ink v6.8.0, React v19.2.4, marked v15.0.12, marked-terminal v7.3.0, cli-highlight v2.1.11
**Storage**: N/A (session storage unchanged)
**Testing**: Vitest
**Target Platform**: Terminal (macOS/Linux, any terminal emulator with ANSI support)
**Project Type**: CLI application
**Performance Goals**: Streaming text renders at chunk speed without visible lag; completed messages cause zero re-renders
**Constraints**: Must work within Ink's rendering model (Yoga flexbox + patching); no new runtime dependencies
**Scale/Scope**: 7 files modified, 0 new files, ~200 lines changed

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Gate | Status |
|---|------|--------|
| 1 | **SAP AI Core-First** — All LLM calls route through SAP AI Core Orchestration; no direct provider API calls outside `src/providers/`. | [x] N/A — no LLM call changes |
| 2 | **CLI-First** — Feature is reachable from the CLI; `--print`/`--file` non-interactive modes unaffected; stdout/stderr contract preserved. | [x] PASS — TUI-only changes; non-interactive modes untouched |
| 3 | **Provider Abstraction** — Changes confined to `src/providers/` + `src/config/` for any provider-level work; no provider SDK imports outside `src/providers/`. | [x] N/A — no provider changes |
| 4 | **Agentic Architecture** — Agent specialisation declared in `src/agent/prompts/`; tool results flow through event bus; MCP hot-pluggable. | [x] N/A — no agent/bus/MCP changes |
| 5 | **Test Discipline (BLOCKING)** — New public functions/classes have unit tests; bug fixes have regression tests; `npm test` green; no real network/filesystem calls in tests. | [x] WILL COMPLY — unit tests for new/changed exported functions |
| 6 | **Simplicity / YAGNI** — No unjustified abstractions; complexity violations documented in Complexity Tracking table below. | [x] PASS — uses Ink's built-in `<Static>`, no new abstractions |
| 7 | **Security & Credential Hygiene (BLOCKING)** — No credentials committed; secrets via env vars only; no `console.log` in non-CLI modules. | [x] PASS — no credentials involved |

---

## Root Cause Analysis

### Problem 1: Input line disappears when output fills screen

**Location**: `src/cli/tui/App.tsx:208-262`

The root `<Box>` has `height={rows}` (terminal height). Inside:
- `Header`: `height={3}` (fixed)
- `MessageArea`: `flexGrow={1}`, `overflow="hidden"` — takes all remaining space
- `InputBox`: **no height, no flexShrink protection**
- `StatusBar`: **no height, no flexShrink protection**

When MessageArea content exceeds available space, Yoga's flexbox algorithm clips it (overflow hidden), but the intrinsic content size of MessageArea's children still influences layout. Because InputBox and StatusBar have no `flexShrink={0}`, they can be squeezed to zero height when the flex algorithm resolves overflows.

Furthermore, ALL messages (completed + streaming) are rendered inside the single MessageArea box. With `overflow="hidden"`, content is **clipped**, not scrolled. The newest content at the bottom (including the most recent response) gets clipped along with everything past the box boundary.

### Problem 2: Text displays poorly

**Location**: `src/cli/tui/components/MarkdownRenderer.tsx:38`

The `marked-terminal` width is set to `columns - 4`, but the actual padding chain is:
- `paddingX={1}` on MessageBubble outer box → 2 chars
- `paddingLeft={2}` on content box inside MessageBubble → 2 chars
- Total actual padding: ~6 chars minimum

Result: rendered markdown lines are 2+ characters too wide, causing wrapping artifacts and visual corruption.

**Location**: `src/cli/tui/components/MessageBubble.tsx:68-73`

User messages render content inline with "You ❯" prefix on the same `<Box>` without explicit wrapping, causing long user inputs to overflow terminal width.

### Problem 3: Performance degradation during streaming

**Location**: `src/cli/tui/context/ChatContext.tsx:84`

Every streaming chunk dispatches `APPEND_STREAM_TEXT`, triggering a full re-render of ALL messages (completed + streaming). The `MarkdownRenderer` useMemo dependency on `markdown` (= `streamingText`) means it recalculates on every single chunk.

---

## Solution Design

### Architecture: Static + Dynamic Split

```
┌─────────────────────────── Terminal ──────────────────────────┐
│                                                                │
│  ┌── <Static items={completedMessages}> ──────────────────┐   │
│  │  [Message 1: user + assistant + tool calls]             │   │
│  │  [Message 2: user + assistant + tool calls]             │   │ ← Terminal
│  │  ... (rendered ONCE, scrolls via native scrollback)     │   │   scrollback
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  ┌── <Box height={rows}> ── Dynamic Viewport ─────────────┐   │
│  │  ┌─ Header ──────────────────────── height={3} ───────┐│   │
│  │  │  model │ agent │ session │ tokens                   ││   │
│  │  └────────────────────────────────────────────────────┘│   │
│  │  ┌─ StreamingArea ──────────── flexGrow={1} ──────────┐│   │
│  │  │  [Active tool calls]                                ││   │ ← Always
│  │  │  [Streaming markdown text...]                       ││   │   visible
│  │  │  [Spinner if waiting]                               ││   │
│  │  └────────────────────────────────────────────────────┘│   │
│  │  ┌─ InputBox ──────────────── flexShrink={0} ─────────┐│   │
│  │  │  agent ❯ <cursor>                                   ││   │
│  │  └────────────────────────────────────────────────────┘│   │
│  │  ┌─ StatusBar ─────────────── flexShrink={0} ─────────┐│   │
│  │  │  Tab: switch agent · Ctrl+X: leader       $0.00     ││   │
│  │  └────────────────────────────────────────────────────┘│   │
│  └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

### Key Behavioral Changes

1. **Completed messages** (user + assistant pairs with their tool calls) are rendered via `<Static>` — printed once to stdout, become part of terminal scrollback. Users scroll back with mouse wheel or Shift+PgUp.

2. **Active content** (streaming text, active tool calls, spinner) stays in the dynamic viewport which is continuously re-rendered by Ink.

3. **InputBox and StatusBar** always visible — protected by `flexShrink={0}`.

4. **Markdown width** correctly accounts for the full padding chain.

5. **Performance**: completed messages are NEVER re-rendered. Only the streaming area re-renders on each chunk. This is a major performance improvement.

---

## Files Modified

```text
src/cli/tui/
├── App.tsx                          # Layout restructure: <Static> + flex protection
├── components/
│   ├── MessageArea.tsx              # Simplify to streaming-only area
│   ├── MessageBubble.tsx            # Fix user message wrapping
│   └── MarkdownRenderer.tsx         # Fix width calculation, accept maxWidth prop
└── types/
    └── props.ts                     # Add maxWidth to MarkdownRendererProps

tests/
└── (colocated or under tests/tui/)
    ├── MarkdownRenderer.test.ts     # Width calculation tests
    └── closePartialFences.test.ts   # Partial fence closing tests (if not existing)
```

No new files outside of tests. No new dependencies.

---

## Implementation Phases

### Phase A: Flex Protection (Quick Win)

**Files**: `src/cli/tui/App.tsx`
**Risk**: Low

Add `flexShrink={0}` to InputBox and StatusBar wrappers. This alone prevents the input from being squeezed to zero height by the flex algorithm.

```tsx
// App.tsx — wrap InputBox
<Box flexShrink={0}>
  <InputBox
    agent={agent}
    agentColor={agentColor}
    disabled={chat.isStreaming}
    onSubmit={handleSubmit}
    isFocused={!keybindState.leaderActive}
    commands={commands}
  />
</Box>

// App.tsx — wrap StatusBar
<Box flexShrink={0}>
  <StatusBar
    agent={agent}
    model={model}
    cost={{ totalCost: cost.totalCost, currency: cost.currency }}
    isStreaming={chat.isStreaming}
    leaderActive={keybindState.leaderActive}
  />
</Box>
```

This phase can be deployed independently as a hotfix.

### Phase B: Static Messages (Core Fix)

**Files**: `src/cli/tui/App.tsx`, `src/cli/tui/components/MessageArea.tsx`
**Risk**: Medium

#### B1. Restructure AppLayout

Import `Static` from `ink`. Move completed messages into `<Static>`:

```tsx
// App.tsx — AppLayout return
return (
  <>
    {/* Completed messages — rendered once, scroll into terminal scrollback */}
    <Static items={messages}>
      {(msg, idx) => (
        <Box key={msg.id} flexDirection="column">
          {idx > 0 && (
            <Box paddingX={1}>
              <Text dimColor>{'─'.repeat(40)}</Text>
            </Box>
          )}
          <MessageBubble
            role={msg.role}
            content={msg.content}
            agent={msg.agent}
            model={msg.model}
            tokens={msg.tokens}
            timestamp={msg.timestamp}
            images={msg.images}
          />
          {msg.toolCalls.map((tc) => (
            <ToolCallBlock key={tc.id} ... />
          ))}
        </Box>
      )}
    </Static>

    {/* Dynamic viewport — always visible */}
    <Box flexDirection="column" height={rows}>
      {/* Header */}
      <Box height={3} borderStyle={theme.borderStyle} borderColor={theme.colors.border} paddingX={1}>
        <Header ... />
      </Box>

      {dialogIsOpen ? (
        <Box flexDirection="column" flexGrow={1}>
          <DialogHost />
        </Box>
      ) : (
        <>
          {/* Streaming area — only active content */}
          <MessageArea
            streamingText={chat.streamingText}
            isStreaming={chat.isStreaming}
            activeToolCalls={chat.activeToolCalls}
            onToggleToolCall={chat.toggleToolCallExpansion}
          />

          <Box flexShrink={0}>
            <InputBox ... />
          </Box>
          <Box flexShrink={0}>
            <StatusBar ... />
          </Box>
        </>
      )}
    </Box>
  </>
);
```

#### B2. Simplify MessageArea

Remove the `messages` prop and completed messages loop. MessageArea now only renders:

```tsx
export interface MessageAreaProps {
  // REMOVED: messages: MessageDisplay[]
  streamingText: string;
  isStreaming: boolean;
  activeToolCalls: ToolCallState[];
  onToggleToolCall: (toolCallId: string) => void;
}

export function MessageArea({
  streamingText,
  isStreaming,
  activeToolCalls,
  onToggleToolCall,
}: MessageAreaProps): React.JSX.Element {
  return (
    <Box flexDirection="column" flexGrow={1} overflow="hidden">
      {/* Active tool calls */}
      {activeToolCalls.map((tc) => (
        <ToolCallBlock key={tc.id} ... />
      ))}

      {/* Streaming text */}
      {isStreaming && streamingText && (
        <Box paddingX={1} flexDirection="column">
          <Box>
            <Text color={colors.success} bold>assistant ❯</Text>
          </Box>
          <Box paddingLeft={2}>
            <MarkdownRenderer markdown={streamingText} isPartial={true} />
          </Box>
        </Box>
      )}

      {/* Spinner */}
      {isStreaming && !streamingText && (
        <Box paddingX={1}>
          <Spinner label="thinking…" />
        </Box>
      )}
    </Box>
  );
}
```

#### B3. Handle tool calls for in-progress response

Currently tool calls are tracked in `ChatContext.activeToolCalls` and moved to `completedToolCalls` when done. The completed tool calls need to be associated with the assistant message when it enters the `messages` array (for `<Static>` rendering).

The existing logic in `App.tsx:139-158` already handles this: when streaming ends, it creates an `assistantMessage` with `toolCalls: []`. This needs to be enhanced to capture `chat.completedToolCalls`:

```tsx
// App.tsx — streaming completion handler
useEffect(() => {
  if (chat.isStreaming) {
    wasStreamingRef.current = true;
  } else if (wasStreamingRef.current && chat.streamingText) {
    wasStreamingRef.current = false;
    const assistantMessage: MessageDisplay = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: chat.streamingText,
      toolCalls: chat.completedToolCalls,  // ← capture completed tool calls
      agent: chat.responseModel ?? undefined,
      model: chat.responseModel ?? undefined,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    chat.clearStreamText();
    // Also need to reset completedToolCalls in ChatContext
  } else {
    wasStreamingRef.current = false;
  }
}, [chat.isStreaming, chat.streamingText, chat.responseModel, chat.clearStreamText, chat.completedToolCalls]);
```

**Note**: `ChatContext` may need a `clearCompletedToolCalls()` action or the RESET action should be called after a response completes.

### Phase C: Markdown Width Fix

**Files**: `src/cli/tui/components/MarkdownRenderer.tsx`, `src/cli/tui/types/props.ts`
**Risk**: Low

1. Add `maxWidth?: number` to `MarkdownRendererProps` in `types/props.ts`
2. Update `MarkdownRenderer` to use it:

```tsx
export function MarkdownRenderer({
  markdown,
  isPartial,
  maxWidth,
}: MarkdownRendererProps): React.JSX.Element {
  const { stdout } = useStdout();
  const columns = stdout?.columns ?? 80;
  // Full padding chain: paddingX(1)=2 + paddingLeft(2)=2 + paddingX(1)=2 = 6 chars
  // Plus 2 chars safety margin = 8
  const effectiveWidth = maxWidth ?? Math.max(40, columns - 8);

  const rendered = useMemo(() => {
    const source = isPartial ? closePartialFences(markdown) : markdown;
    if (!source) return '';
    const instance = createMarkedInstance(effectiveWidth);
    const result = instance.parse(source, { async: false });
    return result.replace(/\n$/, '');
  }, [markdown, isPartial, effectiveWidth]);

  return <Text>{rendered}</Text>;
}
```

### Phase D: User Message Wrapping

**Files**: `src/cli/tui/components/MessageBubble.tsx`
**Risk**: Low

Move user content to its own line with consistent left padding:

```tsx
// Before
<Box>
  <Text color={colors.primary} bold>You ❯ </Text>
  <Text>{content}</Text>
</Box>

// After
<Box>
  <Text color={colors.primary} bold>You ❯</Text>
</Box>
<Box paddingLeft={2}>
  <Text wrap="wrap">{content}</Text>
</Box>
```

### Phase E: Tests

**Files**: New test files
**Risk**: Low

1. **`closePartialFences` unit test** — verify odd/even fence handling
2. **`createMarkedInstance` width test** — verify width parameter is respected
3. **App layout smoke test** — verify the Static + dynamic viewport renders without errors (using `ink-testing-library` if available, or a basic render test)

---

## Dependencies & Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| `<Static>` + `height={rows}` interaction | Medium | Ink docs confirm: Static renders above dynamic area. Verified in Ink source and examples. |
| Tool calls in flight when message completes | Low | Capture `completedToolCalls` from ChatContext when creating the assistant message |
| Terminal scrollback not available in some envs | Low | Headless/CI users use `--print` mode which is unaffected |
| `marked-terminal` ANSI + Ink `<Text>` wrapping | Medium | Width fix in Phase C mitigates. `marked-terminal` does its own line wrapping. |
| `<Static>` items can't be updated after render | Low | This is by design — completed messages are immutable |

## Execution Order

1. **Phase A** (flex protection) — immediate relief, can be cherry-picked alone
2. **Phase B** (Static messages) — core architecture change, biggest impact
3. **Phase C** (markdown width) — depends on understanding final padding from Phase B
4. **Phase D** (user message wrapping) — independent, can parallel with A
5. **Phase E** (tests) — written alongside each phase, verified at end

Total estimated effort: ~4-6 hours of focused implementation.

## Complexity Tracking

> No constitution violations. All changes use existing Ink APIs (`<Static>`, `flexShrink`) with no new abstractions.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| (none)    | —          | —                                    |
