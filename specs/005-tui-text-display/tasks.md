# Tasks: TUI Text Display & Input Visibility Fix

**Feature**: 005-tui-text-display
**Branch**: `005-tui-text-display`
**Plan**: `.kilo/plans/005-tui-text-display.md`

## Phase A: Flex Protection (Quick Win)

- [X] A1. Add `flexShrink={0}` wrapper around InputBox in App.tsx
- [X] A2. Add `flexShrink={0}` wrapper around StatusBar in App.tsx

## Phase B: Static Messages (Core Fix)

- [X] B1. Add `CLEAR_COMPLETED_TOOL_CALLS` action to ChatContext reducer
- [X] B2. Add `clearCompletedToolCalls` method to ChatContextValue interface
- [X] B3. Add `clearCompletedToolCalls` callback in ChatProvider
- [X] B4. Include `clearCompletedToolCalls` in provider value object
- [X] B5. Import `Static`, `Text` from ink in App.tsx
- [X] B6. Import `MessageBubble` and `ToolCallBlock` in App.tsx
- [X] B7. Restructure AppLayout return: `<Static>` for completed messages + dynamic viewport
- [X] B8. Update streaming completion handler to capture `completedToolCalls`
- [X] B9. Call `clearCompletedToolCalls()` after capturing tool calls
- [X] B10. Remove `messages` prop from MessageAreaProps interface
- [X] B11. Remove completed messages rendering loop from MessageArea
- [X] B12. Update MessageArea JSDoc to reflect streaming-only behavior

## Phase C: Markdown Width Fix

- [X] C1. Add `maxWidth?: number` to MarkdownRendererProps in types/props.ts
- [X] C2. Update MarkdownRenderer to accept `maxWidth` prop
- [X] C3. Change effective width calculation to `maxWidth ?? Math.max(40, columns - 8)`
- [X] C4. Remove double-subtraction in `createMarkedInstance` (was `width - 4`, now passes width directly)

## Phase D: User Message Wrapping

- [X] D1. Move user content to its own line in MessageBubble
- [X] D2. Add `paddingLeft={2}` and `wrap="wrap"` to user content box

## Phase E: Tests

- [X] E1. Update MessageArea.test.tsx — remove `messages` prop from all test renders
- [X] E2. Add streaming label and multi-tool-call tests to MessageArea.test.tsx
- [X] E3. Add `maxWidth` prop tests to MarkdownRenderer.test.tsx
- [X] E4. Create ChatContext.test.tsx — initial state, stream text, tool call lifecycle, reset tests

## Phase F: Validation

- [X] F1. TypeScript type check passes (`npm run typecheck`)
- [X] F2. ESLint passes with no new errors (`npm run lint`)
- [X] F3. All 93 test files / 1664 tests pass (`npm test`)
