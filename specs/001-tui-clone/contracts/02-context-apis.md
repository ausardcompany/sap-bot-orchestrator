# Context Provider API Contracts

All context providers live in `src/cli/tui/context/`. Each provides state and
mutation methods via a custom hook. Contexts are never accessed directly —
always through the corresponding `use*()` hook.

## Provider Nesting Order

```
ThemeProvider         ← outermost (no dependencies)
  SessionProvider     ← depends on nothing
    ChatProvider      ← depends on nothing
      KeybindProvider ← depends on nothing
        DialogProvider ← depends on nothing
          AttachmentProvider ← depends on nothing (innermost)
```

Cross-context communication happens through hooks that consume multiple contexts
(e.g., `useStreamChat` reads from both `SessionContext` and `ChatContext`).

---

## ThemeContext

```typescript
// src/cli/tui/context/ThemeContext.tsx

export interface ThemeContextValue {
  theme: ThemeState;
  toggleTheme: () => void;
  setTheme: (name: 'dark' | 'light') => void;
}

// ThemeState from src/cli/tui/theme/types.ts
export interface ThemeState {
  active: 'dark' | 'light';
  colors: ThemeColors;
  borderStyle: 'single' | 'round' | 'double' | 'bold';
}

export function ThemeProvider(props: {
  children: React.ReactNode;
  initialTheme?: 'dark' | 'light';  // default: 'dark'
}): JSX.Element;

export function useTheme(): ThemeContextValue;
```

**State machine**: `dark ↔ light` (toggleTheme flips, setTheme sets directly).

---

## SessionContext

```typescript
// src/cli/tui/context/SessionContext.tsx

export type AgentName = 'code' | 'debug' | 'plan' | 'explore' | 'orchestrator';

export interface CostInfo {
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
  currency: string;
}

export interface SessionContextValue {
  sessionId: string;
  model: string;
  autoRoute: boolean;
  agent: AgentName;
  stage: string | null;
  tokenCount: number;
  cost: CostInfo;
  setModel: (m: string) => void;
  setAgent: (a: AgentName) => void;
  cycleAgent: (forward: boolean) => void;
  setTokenCount: (n: number) => void;
  setCost: (c: CostInfo) => void;
}

export const AGENTS: AgentName[];  // ordered: code, debug, plan, explore, orchestrator

export interface SessionProviderProps {
  children: React.ReactNode;
  initialModel: string;
  initialAutoRoute: boolean;
  initialAgent?: AgentName;         // default: 'orchestrator'
  sessionId: string;
  sessionManager?: SessionManager;  // from src/core/sessionManager.js
}

export function SessionProvider(props: SessionProviderProps): JSX.Element;
export function useSession(): SessionContextValue;
```

**Agent cycling**: `cycleAgent(true)` → next in AGENTS array (wraps). `cycleAgent(false)` → previous.
**Side effect**: `setAgent()` publishes `AgentSwitched` event to the bus.

---

## ChatContext

```typescript
// src/cli/tui/context/ChatContext.tsx

export interface ChatState {
  isStreaming: boolean;
  streamingText: string;
  activeToolCalls: ToolCallState[];
  completedToolCalls: ToolCallState[];
  abortController: AbortController | null;
  error: string | null;
  responseModel: string | null;
}

export interface ChatContextValue extends ChatState {
  setStreaming: (streaming: boolean) => void;
  appendStreamText: (text: string) => void;
  clearStreamText: () => void;
  addToolCall: (toolCall: ToolCallState) => void;
  updateToolCall: (id: string, updates: Partial<ToolCallState>) => void;
  toggleToolCallExpansion: (id: string) => void;
  setError: (error: string | null) => void;
  setAbortController: (controller: AbortController | null) => void;
  setResponseModel: (model: string | null) => void;
  reset: () => void;
}

export function ChatProvider(props: { children: React.ReactNode }): JSX.Element;
export function useChat(): ChatContextValue;
```

**State management**: Uses `useReducer` with discriminated union actions.
**Reset**: Clears all state to initial values (called on new conversation turn).

---

## DialogContext

```typescript
// src/cli/tui/context/DialogContext.tsx

export type DialogType =
  | 'model-picker'
  | 'agent-selector'
  | 'permission'
  | 'session-list'
  | 'session-rename'
  | 'mcp-manager'
  | 'command-palette'
  | 'confirm'
  | 'alert';

export interface DialogEntry {
  id: string;
  type: DialogType;
  props: Record<string, unknown>;
  resolve: (result: unknown) => void;
  reject: () => void;
}

export interface DialogContextValue {
  stack: DialogEntry[];
  open: <T>(type: DialogType, props?: Record<string, unknown>) => Promise<T>;
  close: (result?: unknown) => void;
  cancel: () => void;
  isOpen: boolean;
  currentType: DialogType | null;
  currentEntry: DialogEntry | null;
}

export function DialogProvider(props: { children: React.ReactNode }): JSX.Element;
export function useDialog(): DialogContextValue;
```

**Dialog lifecycle**:
1. `open<T>(type, props)` → pushes entry onto stack → returns `Promise<T>`
2. Dialog component renders based on `currentType`
3. `close(result)` → pops entry → resolves promise with result
4. `cancel()` → pops entry → rejects promise

**Stack behavior**: Only the topmost dialog renders. Nested dialogs are supported
(e.g., a confirmation dialog inside a session rename dialog).

---

## KeybindContext

```typescript
// src/cli/tui/context/KeybindContext.tsx

export interface KeybindState {
  leaderActive: boolean;
  leaderTimeout: ReturnType<typeof setTimeout> | null;
  inputFocused: boolean;
}

export interface KeybindContextValue {
  state: KeybindState;
  activateLeader: () => void;
  deactivateLeader: () => void;
  setInputFocused: (focused: boolean) => void;
}

export function KeybindProvider(props: { children: React.ReactNode }): JSX.Element;
export function useKeybind(): KeybindContextValue;
```

**Leader mode**: Ctrl+X activates leader mode for 1500ms. During leader mode,
the next keypress is dispatched as a leader command (n, m, a, s). If no key is
pressed within the timeout, leader mode deactivates automatically.

---

## AttachmentContext

```typescript
// src/cli/tui/context/AttachmentContext.tsx

export interface ImageAttachment {
  id: string;
  data: Buffer;
  format: ImageFormat;           // from src/utils/imageValidation.js
  sizeBytes: number;
  source: 'clipboard' | 'file';
  filePath?: string;
  createdAt: number;
}

export interface ImageAttachmentPreview {
  id: string;
  format: ImageFormat;
  sizeBytes: number;
  source: 'clipboard' | 'file';
  filePath?: string;
}

export interface AttachmentsState {
  pending: ImageAttachment[];
  reading: boolean;
  error?: string;
}

export interface AttachmentContextValue extends AttachmentsState {
  pasteFromClipboard(): Promise<void>;
  addFromFile(filePath: string): Promise<void>;
  remove(id: string): void;
  clearAll(): void;
  consumeAll(): ImageAttachment[];
}

export function AttachmentProvider(props: { children: React.ReactNode }): JSX.Element;
export function useAttachments(): AttachmentContextValue;
```

**Consume pattern**: `consumeAll()` returns all pending attachments and clears the
state. Used by `useStreamChat` to include images in the message payload.
