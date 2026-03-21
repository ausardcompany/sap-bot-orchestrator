# Data Model: TUI Text Display & Input Visibility Fix

**Feature**: 005-tui-text-display
**Date**: 2026-03-21

## Overview

This feature modifies component interfaces (props), not data persistence models. The changes affect how existing data types flow through the TUI component tree.

---

## Entity: MessageDisplay (unchanged)

**Location**: `src/cli/tui/components/MessageArea.tsx:16-27`

```typescript
export interface MessageDisplay {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls: ToolCallState[];
  agent?: string;
  model?: string;
  tokens?: number;
  timestamp: number;
  images?: ImageAttachmentPreview[];
}
```

**No changes needed.** The `toolCalls` field already exists and will now be properly populated with `chat.completedToolCalls` when the assistant message is created (currently set to `[]`).

---

## Entity: ChatState — Minor Addition

**Location**: `src/cli/tui/context/ChatContext.tsx:38-46`

### Current

```typescript
export interface ChatState {
  isStreaming: boolean;
  streamingText: string;
  activeToolCalls: ToolCallState[];
  completedToolCalls: ToolCallState[];
  abortController: AbortController | null;
  error: string | null;
  responseModel: string | null;
}
```

### Change

Add `CLEAR_COMPLETED_TOOL_CALLS` action to the reducer:

```typescript
type ChatAction =
  | { type: 'SET_STREAMING'; payload: boolean }
  | { type: 'APPEND_STREAM_TEXT'; payload: string }
  | { type: 'CLEAR_STREAM_TEXT' }
  | { type: 'CLEAR_COMPLETED_TOOL_CALLS' }  // NEW
  // ... rest unchanged
```

Add to `ChatContextValue`:

```typescript
export interface ChatContextValue extends ChatState {
  // ... existing methods
  clearCompletedToolCalls: () => void;  // NEW
}
```

**Rationale**: When an assistant message completes and enters `<Static>` via the `messages` array, the `completedToolCalls` are captured into the `MessageDisplay.toolCalls` field. We then need to clear the context's `completedToolCalls` to prevent them from being re-captured on the next message.

---

## Component Interface: MessageAreaProps — Simplified

**Location**: `src/cli/tui/components/MessageArea.tsx:29-40`

### Current

```typescript
export interface MessageAreaProps {
  messages: MessageDisplay[];        // ← REMOVED
  streamingText: string;
  isStreaming: boolean;
  activeToolCalls: ToolCallState[];
  onToggleToolCall: (toolCallId: string) => void;
}
```

### New

```typescript
export interface MessageAreaProps {
  // messages REMOVED — completed messages now rendered by <Static> in App.tsx
  streamingText: string;
  isStreaming: boolean;
  activeToolCalls: ToolCallState[];
  onToggleToolCall: (toolCallId: string) => void;
}
```

**Rationale**: MessageArea no longer renders completed messages. That responsibility moves to `App.tsx` which uses `<Static>` for them.

---

## Component Interface: MarkdownRendererProps — Extended

**Location**: `src/cli/tui/types/props.ts`

### Current

```typescript
export interface MarkdownRendererProps {
  markdown: string;
  isPartial?: boolean;
}
```

### New

```typescript
export interface MarkdownRendererProps {
  markdown: string;
  isPartial?: boolean;
  maxWidth?: number;  // NEW — override effective width for markdown rendering
}
```

**Rationale**: Different callers have different padding contexts. The default width (`columns - 8`) works for the standard MessageBubble context, but callers with different padding can override.

---

## Component Tree: Before vs After

### Before

```
App.tsx:
  <Box height={rows}>
    <Header />
    <MessageArea messages={messages} streaming={...} />  ← ALL messages here
    <InputBox />                                          ← no flex protection
    <StatusBar />                                         ← no flex protection
  </Box>
```

### After

```
App.tsx:
  <>
    <Static items={messages}>                              ← completed messages (rendered once)
      {msg => <MessageBubble /> + <ToolCallBlock />}
    </Static>
    <Box height={rows}>
      <Header />
      <MessageArea streaming={...} />                      ← streaming only
      <Box flexShrink={0}><InputBox /></Box>               ← protected
      <Box flexShrink={0}><StatusBar /></Box>              ← protected
    </Box>
  </>
```

---

## State Transitions

### Message Lifecycle

```
┌──────────────┐     streaming starts     ┌─────────────────────┐
│ User types   │ ──────────────────────►  │ isStreaming = true    │
│ & submits    │                           │ streamingText grows   │
│              │                           │ activeToolCalls grow  │
└──────────────┘                           └──────────┬────────────┘
                                                       │
                                            tool calls complete
                                            (active → completed)
                                                       │
                                                       ▼
                                           ┌─────────────────────┐
                                           │ isStreaming = false   │
                                           │ streamingText final   │
                                           │ completedToolCalls    │
                                           └──────────┬────────────┘
                                                       │
                                            create MessageDisplay
                                            with toolCalls = completedToolCalls
                                            add to messages array
                                            clear streamingText
                                            clear completedToolCalls
                                                       │
                                                       ▼
                                           ┌─────────────────────┐
                                           │ <Static> renders     │
                                           │ the new message once │
                                           │ → terminal scrollback│
                                           └──────────────────────┘
```

---

## Validation Rules

No new validation rules. Existing TypeScript interfaces provide compile-time validation. No runtime validation changes needed.
