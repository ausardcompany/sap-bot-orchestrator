# Component Props Contracts

All TUI components live in `src/cli/tui/components/` and `src/cli/tui/dialogs/`.
Prop interfaces are defined in `src/cli/tui/types/props.ts` (shared) or co-located
with the component (dialog-specific).

## Entry Point

```typescript
// src/cli/tui/index.ts
export interface StartTuiOptions {
  model: string;
  autoRoute: boolean;
  sessionId?: string;
  preferCheap?: boolean;
  systemPrompt?: string;
  gitManager?: unknown;
  repoMapManager?: unknown;
}

export async function startTui(options: StartTuiOptions): Promise<void>;
```

## App (Root Component)

```typescript
// src/cli/tui/App.tsx
export interface AppProps {
  model: string;
  autoRoute: boolean;
  sessionId?: string;
  preferCheap?: boolean;
  systemPrompt?: string;
  gitManager?: unknown;
  repoMapManager?: unknown;
}
```

**Provider tree** (outermost → innermost):
```
ThemeProvider → SessionProvider → ChatProvider → KeybindProvider → DialogProvider → AttachmentProvider → AppLayout + DialogHost
```

---

## Layout Components

### Header

```typescript
// src/cli/tui/types/props.ts
export interface HeaderProps {
  model: string;
  agent: string;
  agentColor: string;
  sessionId: string;
  tokenCount: number;
  autoRoute: boolean;
}
```

**Renders**: Model name, agent badge (colored), session ID, token count, auto-route status.
**Height**: Fixed 3 rows with `borderStyle="round"`.

### StatusBar

```typescript
export interface StatusBarProps {
  agent: string;
  model: string;
  cost: { totalCost: number; currency: string };
  isStreaming: boolean;
  leaderActive: boolean;
}
```

**Renders**: Keybinding hints, total cost, agent name, model, leader mode indicator.
**Height**: Fixed 1 row.

### InputBox

```typescript
export interface InputBoxProps {
  agent: string;
  agentColor: string;
  disabled: boolean;
  onSubmit: (text: string) => void;
  isFocused: boolean;
  commands?: SlashCommand[];
}
```

**Renders**: Agent-colored prompt (`{agent} ❯ `), text input, slash command autocomplete.
**Behavior**: Disabled when streaming. Autocomplete triggers on `/` prefix.

### MessageArea

Internal component — reads messages from `useChat()` and `useSession()` contexts.
No external props. Manages scroll offset internally.

**Scroll behavior**:
- Auto-scrolls to bottom on new content
- Up/Down/PageUp/PageDown for manual scroll
- `overflow="hidden"` with sliced render window

---

## Content Components

### MessageBubble

```typescript
export interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent?: string;
  model?: string;
  tokens?: number;
  timestamp: number;
  images?: ImageAttachmentPreview[];
}
```

**Renders**: Role-colored header, content (markdown for assistant, plain for user), metadata.

### MarkdownRenderer

```typescript
export interface MarkdownRendererProps {
  markdown: string;
  isPartial: boolean;
}
```

**Renders**: Markdown → ANSI terminal output via `marked` + `marked-terminal`.
**Streaming**: When `isPartial=true`, auto-closes unclosed code fences before rendering.

### ToolCallBlock

Internal component — receives `ToolCallState` from `ChatContext`.

**Renders**:
- Header: tool name + parameters (always visible)
- Body: tool output (collapsible via toggle)
- For file edits: `DiffView` sub-component
- Status indicator: spinner (running), checkmark (completed), X (failed)

### DiffView

```typescript
// src/cli/tui/components/DiffView.tsx (internal props)
interface DiffViewProps {
  diff: DiffData;
}
```

**Renders**: Red/green line-by-line diff with hunk headers.

### Spinner

Thin wrapper around `ink-spinner`. Shows during LLM streaming and tool execution.

### AttachmentBar

Internal component — reads from `useAttachments()`.
**Renders**: Pending image attachment indicators (format, size, source).

### CommandPalette

Internal component — reads from `useCommands()` and `useDialog()`.
**Renders**: Fuzzy-searchable list of slash commands in an overlay.

---

## Dialog Components

All dialogs are rendered by `DialogHost` in `App.tsx` based on `useDialog().currentType`.

### ModelPicker

Opened via: Leader+m, `/model` command, or `useDialog().open('model-picker')`.
**Renders**: List of available models with `ink-select-input`.
**Resolves with**: Selected model string.

### AgentSelector

Opened via: Leader+a, `/agent` command.
**Renders**: List of 5 agents with descriptions.
**Resolves with**: Selected `AgentName`.

### PermissionDialog

Opened via: `usePermission()` hook on `PermissionRequested` bus event.
**Renders**: Action icon, tool name, resource path, description. Keybindings: A(pprove), D(eny), R(emember approve), N(ever approve).
**Resolves with**: `{ granted: boolean; remember: boolean }`.

### SessionList

Opened via: Leader+s, `/sessions` command.
**Renders**: List of saved sessions with timestamps.
**Resolves with**: Selected session ID or null.

### McpManager

Opened via: `/mcp` command.
**Renders**: List of MCP servers with status (connected/disconnected).
**Resolves with**: void (side-effects only).
