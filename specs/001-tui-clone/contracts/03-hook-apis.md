# Custom Hook API Contracts

All custom hooks live in `src/cli/tui/hooks/`. Hooks bridge the TUI layer with
the backend (event bus, streamChat, clipboard, etc.).

---

## useStreamChat

```typescript
// src/cli/tui/hooks/useStreamChat.ts

export interface UseStreamChatReturn {
  sendMessage: (text: string) => Promise<void>;
  abort: () => void;
}

export function useStreamChat(): UseStreamChatReturn;
```

**Dependencies**: `useChat()`, `useSession()`, `useAttachments()`

**sendMessage flow**:
1. Calls `chat.reset()` to clear previous state
2. Sets `chat.setStreaming(true)`
3. Creates `AbortController` → `chat.setAbortController(controller)`
4. Consumes pending image attachments via `attachments.consumeAll()`
5. Dynamically imports `streamChat` from `src/core/streamingOrchestrator.js`
6. Calls `streamChat(messageContent, { modelOverride, autoRoute, agentId, signal })`
7. Iterates async generator:
   - Text chunks → `chat.appendStreamText(chunk)`
   - Tool calls → handled by `useToolEvents` via event bus
   - Metadata → `chat.setResponseModel(model)`, `session.setTokenCount(n)`, `session.setCost(info)`
8. On completion: `chat.setStreaming(false)`, `chat.clearStreamText()`
9. On error: `chat.setError(message)`, `chat.setStreaming(false)`

**abort flow**:
1. Calls `abortController.abort()`
2. Stream generator throws AbortError → caught in error handler
3. Sets `chat.setStreaming(false)`

---

## useKeyboard

```typescript
// src/cli/tui/hooks/useKeyboard.ts

export interface UseKeyboardOptions {
  onExit: () => void;
  onClear: () => void;
  onNewSession: () => void;
  isInputActive: boolean;
  commands?: SlashCommand[];
}

export function useKeyboard(options: UseKeyboardOptions): void;
```

**Dependencies**: `useSession()`, `useKeybind()`, `useDialog()`, `useChat()`

**Keybinding dispatch table**:

| Key Combo | Condition | Action |
|-----------|-----------|--------|
| `Tab` | Always | `session.cycleAgent(true)` |
| `Shift+Tab` | Always | `session.cycleAgent(false)` |
| `Ctrl+X` | Always | `keybind.activateLeader()` |
| `Ctrl+K` | Not streaming | `dialog.open('command-palette')` |
| `Ctrl+L` | Always | `options.onClear()` |
| `Ctrl+C` | Streaming | `chat.abortController?.abort()` |
| `Ctrl+C` | Not streaming | `options.onExit()` |
| Leader+`n` | Leader active | `options.onNewSession()` |
| Leader+`m` | Leader active | `dialog.open('model-picker')` → `session.setModel(result)` |
| Leader+`a` | Leader active | `dialog.open('agent-selector')` → `session.setAgent(result)` |
| Leader+`s` | Leader active | `dialog.open('session-list')` |

**Focus guard**: When `isInputActive=false` (dialog open), only Escape and dialog-specific keys are processed.

---

## usePermission

```typescript
// src/cli/tui/hooks/usePermission.ts

export function usePermission(): void;
```

**Dependencies**: `useDialog()`, event bus (`PermissionRequested`, `PermissionResponse`)

**Flow**:
1. Subscribes to `PermissionRequested` event on mount
2. On event: opens `'permission'` dialog with props `{ action, toolName, resource, description, icon }`
3. Awaits `dialog.open<{ granted: boolean; remember: boolean }>('permission', props)`
4. On resolve: publishes `PermissionResponse` with `{ id, granted, remember, timestamp }`
5. On cancel (dialog rejected): publishes `PermissionResponse` with `{ id, granted: false, remember: false, timestamp }`

**Lifecycle**: Effect cleanup unsubscribes from event bus.

---

## useToolEvents

```typescript
// src/cli/tui/hooks/useToolEvents.ts

export function useToolEvents(): void;
```

**Dependencies**: `useChat()`, event bus (`ToolExecutionStarted`, `ToolExecutionCompleted`, `ToolExecutionFailed`)

**Event mappings**:

| Bus Event | Chat Action |
|-----------|-------------|
| `ToolExecutionStarted` `{ toolName, toolId, parameters, timestamp }` | `chat.addToolCall({ id: toolId, toolName, params: parameters, status: 'running', output: null, error: null, isExpanded: true, diff: null, startedAt: timestamp, completedAt: null })` |
| `ToolExecutionCompleted` `{ toolId, result, duration, timestamp }` | `chat.updateToolCall(toolId, { status: 'completed', output: result, completedAt: timestamp, isExpanded: false })` |
| `ToolExecutionFailed` `{ toolId, error, duration, timestamp }` | `chat.updateToolCall(toolId, { status: 'failed', error, completedAt: timestamp, isExpanded: true })` |

**Lifecycle**: Effect cleanup unsubscribes from all three event bus events.

---

## useCommands

```typescript
// src/cli/tui/hooks/useCommands.ts

export type CommandCategory = 'general' | 'session' | 'model' | 'git' | 'debug' | 'config';

export interface CommandContext {
  exit: () => void;
  sessionId: string;
  model: string;
  agent: string;
  setModel: (m: string) => void;
  setAgent: (a: AgentName) => void;
}

export interface SlashCommand {
  name: string;
  aliases?: string[];
  description: string;
  category: CommandCategory;
  execute: (args: string, context: CommandContext) => Promise<boolean>;
}

export interface UseCommandsReturn {
  handleCommand: (input: string) => Promise<boolean>;
  commands: SlashCommand[];
}

export function useCommands(): UseCommandsReturn;
```

**Dependencies**: `useSession()`, `useDialog()`, `useTheme()`, `useAttachments()`, `useApp()`

**handleCommand flow**:
1. Checks if input starts with `/`
2. Parses command name and args: `/model claude-sonnet` → `name="model"`, `args="claude-sonnet"`
3. Finds matching command by `name` or `aliases`
4. Calls `command.execute(args, context)` → returns `true` if handled
5. Returns `false` if no matching command found

**Command registry** (12 commands):

| Name | Aliases | Category | Description |
|------|---------|----------|-------------|
| `help` | `h` | general | Show available commands |
| `exit` | `quit`, `q` | general | Exit the TUI |
| `clear` | — | general | Clear messages |
| `model` | — | model | Show or switch model |
| `agent` | — | session | Show or switch agent |
| `status` | — | session | Show session status |
| `sessions` | — | session | Open session list |
| `mcp` | — | config | Manage MCP servers |
| `theme` | — | config | Switch theme |
| `image` | `img` | general | Attach image from clipboard/file |
| `clear-images` | `cli` | general | Remove pending attachments |
| `memory` | — | config | List instruction files |

---

## useClipboardImage

```typescript
// src/cli/tui/hooks/useClipboardImage.ts

export interface UseClipboardImageOptions {
  enabled?: boolean;  // default: true
}

export function useClipboardImage(options?: UseClipboardImageOptions): void;
```

**Dependencies**: `useAttachments()`, Ink `useInput()`

**Behavior**: Listens for Ctrl+V (`\x16` raw terminal character) via Ink's `useInput`.
When triggered (and not already reading), calls `attachments.pasteFromClipboard()`.
Disabled when `enabled=false` or when `attachments.reading=true`.

---

## Event Bus Integration Summary

```
Event Bus (src/bus/)
│
├── ToolExecutionStarted ──→ useToolEvents ──→ ChatContext.addToolCall
├── ToolExecutionCompleted ─→ useToolEvents ──→ ChatContext.updateToolCall
├── ToolExecutionFailed ───→ useToolEvents ──→ ChatContext.updateToolCall
│
├── PermissionRequested ───→ usePermission ──→ DialogContext.open('permission')
├── PermissionResponse ←───── usePermission ──← dialog resolve/cancel
│
├── AgentSwitched ←────────── SessionContext.setAgent (publishes on change)
│
└── StreamChunkReceived ───→ (consumed by useStreamChat via async generator)
```
