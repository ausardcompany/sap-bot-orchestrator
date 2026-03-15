# Alexi Architecture

This document describes the high-level architecture of Alexi, an AI-powered CLI assistant.

## Overview

Alexi is a TypeScript/Node.js application that orchestrates multiple LLM providers with intelligent routing, session management, and extensible tool systems.

## System Architecture

```mermaid
graph TB
    subgraph CLI["CLI Layer"]
        Program[program.ts]
        Interactive[interactive.ts]
    end

    subgraph Core["Core Layer"]
        Orchestrator[orchestrator.ts]
        Router[router.ts]
        SessionManager[sessionManager.ts]
        StreamingOrch[streamingOrchestrator.ts]
    end

    subgraph Providers["Provider Layer"]
        OpenAI[openaiCompatible.ts]
        Anthropic[anthropicCompatible.ts]
        Claude[claudeNative.ts]
        SAP[sapOrchestration.ts]
        SAPNative[sapNative.ts]
    end

    subgraph Tools["Tool System"]
        ToolIndex[tool/index.ts]
        Bash[bash.ts]
        Read[read.ts]
        Write[write.ts]
        Edit[edit.ts]
        Glob[glob.ts]
        Grep[grep.ts]
        Task[task.ts]
        WebFetch[webfetch.ts]
    end

    subgraph Support["Support Systems"]
        Bus[bus/index.ts]
        Permission[permission/index.ts]
        Agent[agent/index.ts]
        MCP[mcp/index.ts]
        Skill[skill/index.ts]
    end

    Program --> Interactive
    Interactive --> Orchestrator
    Orchestrator --> Router
    Orchestrator --> SessionManager
    Orchestrator --> StreamingOrch
    Router --> OpenAI
    Router --> Anthropic
    Router --> Claude
    Router --> SAP
    Router --> SAPNative
    Orchestrator --> ToolIndex
    ToolIndex --> Bash
    ToolIndex --> Read
    ToolIndex --> Write
    ToolIndex --> Edit
    ToolIndex --> Glob
    ToolIndex --> Grep
    ToolIndex --> Task
    ToolIndex --> WebFetch
    Orchestrator --> Bus
    Orchestrator --> Permission
    Orchestrator --> Agent
    Orchestrator --> MCP
    Orchestrator --> Skill
```

## Module Descriptions

### CLI Layer

| Module | File | Description |
|--------|------|-------------|
| Program | `src/cli/program.ts` | CLI entry point using Commander.js |
| Interactive | `src/cli/interactive.ts` | Interactive mode with streaming UI |

### Core Layer

| Module | File | Description |
|--------|------|-------------|
| Orchestrator | `src/core/orchestrator.ts` | Main orchestration logic |
| Router | `src/core/router.ts` | Model selection and routing |
| Session Manager | `src/core/sessionManager.ts` | Conversation session persistence |
| Streaming Orchestrator | `src/core/streamingOrchestrator.ts` | Real-time streaming support |
| Agentic Chat | `src/core/agenticChat.ts` | Autonomous agent with tool execution loop |
| Stage Manager | `src/core/stageManager.ts` | Workflow stage management |
| Workflow Manager | `src/core/workflowManager.ts` | Multi-stage workflow orchestration |

### Provider Layer

| Module | File | Description |
|--------|------|-------------|
| OpenAI Compatible | `src/providers/openaiCompatible.ts` | OpenAI API compatible provider |
| Anthropic Compatible | `src/providers/anthropicCompatible.ts` | Anthropic Messages API |
| Claude Native | `src/providers/claudeNative.ts` | Direct Claude integration |
| SAP Orchestration | `src/providers/sapOrchestration.ts` | SAP AI Core via SDK |
| SAP Native | `src/providers/sapNative.ts` | Native SAP AI Core API |

### Tool System

| Tool | File | Description |
|------|------|-------------|
| Bash | `src/tool/tools/bash.ts` | Execute shell commands |
| Read | `src/tool/tools/read.ts` | Read files and directories |
| Write | `src/tool/tools/write.ts` | Write files |
| Edit | `src/tool/tools/edit.ts` | Edit files with string replacement |
| Glob | `src/tool/tools/glob.ts` | Find files by pattern |
| Grep | `src/tool/tools/grep.ts` | Search file contents |
| Task | `src/tool/tools/task.ts` | Launch sub-agents |
| WebFetch | `src/tool/tools/webfetch.ts` | Fetch web content |
| Question | `src/tool/tools/question.ts` | Ask user questions |
| TodoWrite | `src/tool/tools/todowrite.ts` | Manage task lists |

### Support Systems

| Module | File | Description |
|--------|------|-------------|
| Event Bus | `src/bus/index.ts` | Pub/sub event system |
| Permission | `src/permission/index.ts` | File access control |
| Agent | `src/agent/index.ts` | Autonomous agent system |
| MCP | `src/mcp/index.ts` | Model Context Protocol |
| Skill | `src/skill/index.ts` | Specialized prompt skills |
| Compaction | `src/compaction/index.ts` | Context compression |
| Profile | `src/profile/index.ts` | User profile management |
| Logger | `src/utils/logger.ts` | Centralized logging utility |

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Orchestrator
    participant Router
    participant Provider
    participant Tools

    User->>CLI: Input message
    CLI->>Orchestrator: Process request
    Orchestrator->>Router: Select model
    Router-->>Orchestrator: Model selection
    Orchestrator->>Provider: Send to LLM
    Provider-->>Orchestrator: LLM response
    
    alt Tool calls needed
        Orchestrator->>Tools: Execute tool
        Tools-->>Orchestrator: Tool result
        Orchestrator->>Provider: Continue with result
        Provider-->>Orchestrator: Final response
    end
    
    Orchestrator-->>CLI: Response
    CLI-->>User: Display output
```

## Agentic Chat Flow

```mermaid
flowchart TB
    Start([Start Agentic Chat]) --> Init[Initialize Permission Manager]
    Init --> SetRoot[Set Project Root to workdir]
    SetRoot --> EnableExt[Enable External Directories]
    EnableExt --> AddRules[Add High-Priority Allow Rules]
    AddRules --> DetermineModel[Determine Model via Router]
    
    DetermineModel --> BuildMessages[Build Message History]
    BuildMessages --> LoopStart{Iteration < Max?}
    
    LoopStart -->|Yes| CallLLM[Call LLM with Tools]
    CallLLM --> CheckTools{Tool Calls?}
    
    CheckTools -->|Yes| ExecTools[Execute Tool Calls]
    ExecTools --> CheckPerm[Check Permissions]
    CheckPerm -->|Allowed| RunTool[Run Tool]
    CheckPerm -->|Denied| ReturnError[Return Permission Error]
    
    RunTool --> AddToolResult[Add Tool Result to Messages]
    ReturnError --> AddToolResult
    AddToolResult --> LoopStart
    
    CheckTools -->|No| RecordCost[Record Token Usage]
    RecordCost --> SaveSession[Save to Session]
    SaveSession --> End([Return Result])
    
    LoopStart -->|No| MaxReached[Max Iterations Reached]
    MaxReached --> End
```

## Permission System Flow

```mermaid
flowchart LR
    ToolExec[Tool Execution Request] --> HasPerm{Has Permission Config?}
    HasPerm -->|Yes| GetResource[Get Resource Path]
    HasPerm -->|No| DirectExec[Execute Directly]
    
    GetResource --> ResolveCtx[Resolve with Context]
    ResolveCtx --> CheckRules[Check Permission Rules]
    
    CheckRules --> EvalRules[Evaluate Rules by Priority]
    EvalRules --> LastMatch[Last Match Wins]
    
    LastMatch --> Decision{Decision?}
    Decision -->|Allow| Grant[Grant Permission]
    Decision -->|Deny| Reject[Deny Permission]
    Decision -->|Ask| Interactive[Interactive Prompt]
    
    Interactive --> UserResp{User Response}
    UserResp -->|Allow| Grant
    UserResp -->|Deny| Reject
    
    Grant --> DirectExec
    Reject --> RetErr[Return Error]
    DirectExec --> Result[Return Result]
    RetErr --> Result
```

## Tool System with Context Resolution

The tool system resolves relative paths using the workdir context:

```mermaid
flowchart TB
    ToolCall[Tool Call with Params] --> ParseParams[Parse Parameters]
    ParseParams --> CheckPath{Path Type?}
    
    CheckPath -->|Absolute| UseAbsolute[Use Path As-Is]
    CheckPath -->|Relative| ResolveRelative[Resolve with Workdir]
    
    ResolveRelative --> JoinPath[path.join workdir, filePath]
    JoinPath --> AbsolutePath[Absolute Path]
    UseAbsolute --> AbsolutePath
    
    AbsolutePath --> PermCheck[Permission Check]
    PermCheck --> GetResource[getResource params, context]
    GetResource --> CheckPerms[Check Against Rules]
    
    CheckPerms --> Allowed{Allowed?}
    Allowed -->|Yes| Execute[Execute Tool]
    Allowed -->|No| Deny[Return Permission Denied]
    
    Execute --> Result[Return Result]
    Deny --> Result
```

## Configuration

### Environment Variables

```
AICORE_SERVICE_KEY    # SAP AI Core credentials
AICORE_RESOURCE_GROUP # SAP AI Core resource group
OPENAI_API_KEY        # OpenAI API key (optional)
ANTHROPIC_API_KEY     # Anthropic API key (optional)
```

### Routing Configuration

Routing rules are defined in `routing-config.json` or `~/.alexi/routing-config.json`:

```json
{
  "rules": [
    {
      "name": "code-tasks",
      "priority": 100,
      "condition": { "contains": ["code", "implement", "fix"] },
      "model": "anthropic--claude-4-sonnet"
    }
  ],
  "default": {
    "model": "anthropic--claude-4-sonnet"
  }
}
```

## Directory Structure

```
alexi/
├── src/
│   ├── cli/           # CLI entry points
│   ├── core/          # Core orchestration
│   ├── providers/     # LLM providers
│   ├── tool/          # Tool system
│   │   └── tools/     # Individual tools
│   ├── agent/         # Agent system
│   ├── bus/           # Event bus
│   ├── permission/    # Permission system
│   ├── mcp/           # MCP integration
│   ├── skill/         # Skill system
│   ├── config/        # Configuration
│   ├── log/           # Logging
│   ├── profile/       # Profile management
│   └── ...
├── tests/             # Test files
├── dist/              # Compiled output
└── docs/              # Documentation
```

## Key Design Decisions

### 1. Multi-Provider Architecture

Alexi supports multiple LLM providers through a unified interface, allowing:
- Easy switching between providers
- Fallback mechanisms
- Cost optimization through routing

### 2. Tool System with Permission Control

Tools are implemented as independent modules that:
- Follow a consistent interface based on Zod schema validation
- Can be enabled/disabled per session
- Support permission-based access control with last-match-wins rule evaluation
- Resolve relative paths using workdir context for agentic operations
- Support interactive permission prompts and high-priority allow rules
- Convert Zod schemas to JSON Schema for LLM function calling with proper type handling

### 3. Agentic Execution Mode

The agentic chat system enables autonomous file operations:
- Automatic permission configuration for write and execute actions
- High-priority allow rules (priority 200) override default ask prompts
- External directory access for full workspace capability
- Tool execution loop with LLM-driven decision making
- Iteration limits to prevent infinite loops (default: 50)

### 4. Event-Driven Architecture

The event bus enables:
- Loose coupling between modules
- Plugin extensibility
- Real-time streaming updates
- Permission events (DoomLoopDetected, ExternalAccessAttempted)

### 5. Session Management

Sessions provide:
- Multi-turn conversation context
- Persistence across CLI invocations
- Export and sharing capabilities

## Security Considerations

1. **Secrets Management**: Secrets are redacted in exports and logs
2. **Permission System**: File access is controlled by configurable rules
3. **Environment Isolation**: Sensitive config stored in `~/.alexi/`
4. **Type Safety**: Strict TypeScript configuration with proper type assertions
5. **Logging**: Centralized logger replaces direct console calls for better control

## Logging System

Alexi uses a centralized logging utility to provide consistent logging across the application.

### Logger API

```typescript
import { logger } from './utils/logger.js';

// Set log level (debug, info, warn, error)
logger.setLevel('debug');

// Log messages at different levels
logger.debug('Debug message', additionalData);
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);

// Print without formatting (for CLI output)
logger.print('Raw output');
```

### Log Levels

| Level | Priority | Description | Output Format |
|-------|----------|-------------|---------------|
| `debug` | 0 | Detailed debugging information | `[DEBUG] message` |
| `info` | 1 | General informational messages | `message` (no prefix) |
| `warn` | 2 | Warning messages | `[WARN] message` |
| `error` | 3 | Error messages | `[ERROR] message` |

The logger respects the configured log level and only outputs messages at or above that level. The default level is `info`.

### ESLint Integration

The logger utility is the only module permitted to use direct console calls. All other modules should import and use the centralized logger to maintain ESLint compliance.

```typescript
// ❌ Avoid direct console usage
console.log('message');

// ✅ Use centralized logger
import { logger } from './utils/logger.js';
logger.info('message');
```

## Type Safety and Code Quality

### TypeScript Configuration

Alexi uses strict TypeScript configuration with proper type assertions:

```typescript
// Model capability filtering with explicit type assertion
const models = config.models.filter(
  (m) => (m as ModelCapability & { enabled?: boolean }).enabled !== false
);

// Zod schema type handling with interface definitions
interface ZodDefBase {
  description?: string;
}

const def = (schema as unknown as { _def: ZodDefBase })._def;
```

### ESLint Rules

Key ESLint rules enforced:

- `no-console: warn` - Prevents direct console usage (except in logger)
- `@typescript-eslint/no-explicit-any: warn` - Flags any type usage
- `@typescript-eslint/no-unused-vars: error` - Prevents unused variables
- `prefer-const: error` - Enforces const for immutable variables
- `eqeqeq: error` - Requires strict equality checks

### Code Quality Diagram

```mermaid
flowchart LR
    subgraph Development
        Code[Write Code] --> TypeCheck[TypeScript Check]
        TypeCheck --> Lint[ESLint]
        Lint --> Test[Run Tests]
    end
    
    subgraph Quality Gates
        Test --> Build[Build Project]
        Build --> CI[CI Pipeline]
    end
    
    subgraph Standards
        Logger[Centralized Logger]
        Types[Type Safety]
        Validation[Zod Validation]
    end
    
    Code --> Logger
    Code --> Types
    Code --> Validation
    
    CI --> Deploy{Pass?}
    Deploy -->|Yes| Merge[Merge to Main]
    Deploy -->|No| Fix[Fix Issues]
    Fix --> Code
```

## TUI Architecture

Alexi includes an Ink-based Terminal User Interface (TUI) for interactive chat sessions with real-time streaming, slash command support, and inline autocomplete.

### TUI Component Hierarchy

```mermaid
graph TB
    App[App.tsx] --> ThemeProvider
    ThemeProvider --> SessionProvider
    SessionProvider --> ChatProvider
    ChatProvider --> AttachmentProvider
    AttachmentProvider --> KeybindProvider
    KeybindProvider --> DialogProvider
    DialogProvider --> AppLayout
    
    AppLayout --> Header
    AppLayout --> MessageArea
    AppLayout --> InputBox
    AppLayout --> StatusBar
    AppLayout --> DialogHost
    
    InputBox --> AttachmentBar
    InputBox --> AutocompleteList
    InputBox --> TextInput
    
    DialogHost --> PermissionDialog
    DialogHost --> ModelPicker
    DialogHost --> AgentSelector
    DialogHost --> CommandPalette
    
    style App fill:#4CAF50
    style AppLayout fill:#2196F3
    style InputBox fill:#FF9800
```

### TUI Context System

The TUI uses React Context for state management across components:

| Context | Purpose | Key State |
|---------|---------|-----------|
| ThemeContext | Color scheme and styling | theme, setTheme |
| SessionContext | Session metadata | model, agent, sessionId, tokenCount, cost |
| ChatContext | Chat state and streaming | messages, isStreaming, streamingText, activeToolCalls |
| AttachmentContext | Image attachments | pending, pasteFromClipboard, addFromFile |
| KeybindContext | Keyboard shortcuts | leaderActive, activateLeader, deactivateLeader |
| DialogContext | Modal dialogs | isOpen, currentType, open, close |

### Slash Command System

The TUI implements a declarative slash command system with autocomplete:

```mermaid
sequenceDiagram
    participant User
    participant InputBox
    participant Autocomplete
    participant useCommands
    participant Handler
    participant LLM
    
    User->>InputBox: Types "/"
    InputBox->>Autocomplete: Show all commands
    User->>InputBox: Types "/he"
    InputBox->>Autocomplete: Filter to "help"
    User->>Autocomplete: Press Tab or Enter
    Autocomplete->>InputBox: Accept "/help "
    User->>InputBox: Press Enter
    InputBox->>useCommands: handleCommand("/help")
    useCommands->>Handler: Execute help command
    Handler-->>InputBox: Return true (handled)
    
    Note over InputBox,LLM: Command intercepted, NOT sent to LLM
```

#### Autocomplete Features

The InputBox component provides inline autocomplete for slash commands:

1. **Trigger**: Typing forward slash shows all available commands
2. **Filtering**: As user types, commands are filtered by name or alias
3. **Navigation**: Up/Down arrow keys cycle through suggestions
4. **Selection**: Tab key cycles through suggestions, Enter accepts
5. **Display**: Shows command name, aliases, and description
6. **Visual Feedback**: Selected suggestion is highlighted in agent color

#### Command Registration

Commands are registered in `useCommands.ts` with metadata:

```typescript
{
  name: 'help',
  aliases: ['h'],
  description: 'Show available commands',
  category: 'general',
  execute: async (args, context) => {
    // Command implementation
    return true; // Return true if handled
  }
}
```

### Clipboard Integration

The TUI supports clipboard image paste with platform-specific implementations:

```mermaid
flowchart TD
    Paste[User presses Ctrl+V] --> Detect[Detect Platform]
    Detect --> macOS{macOS?}
    Detect --> Linux{Linux?}
    Detect --> Windows{Windows?}
    
    macOS --> TryPngpaste{pngpaste available?}
    TryPngpaste -->|Yes| UsePngpaste[Use pngpaste]
    TryPngpaste -->|No| UseOsascript[Use osascript fallback]
    
    UseOsascript --> CreateTemp[Create temp file]
    CreateTemp --> AppleScript[Run AppleScript to save clipboard]
    AppleScript --> ReadFile[Read file]
    ReadFile --> Cleanup[Clean up temp file]
    Cleanup --> AddAttachment[Add to attachments]
    
    UsePngpaste --> AddAttachment
    
    Linux --> UseWlPaste[Use wl-paste or xclip]
    UseWlPaste --> AddAttachment
    
    Windows --> UsePowerShell[Use PowerShell]
    UsePowerShell --> AddAttachment
    
    AddAttachment --> Display[Display in AttachmentBar]
    
    style UseOsascript fill:#FF9800
    style AddAttachment fill:#4CAF50
```

#### Clipboard Tool Detection

The clipboard system detects available tools at runtime:

**macOS**:
1. Try `pngpaste` (preferred, requires installation)
2. Fall back to `osascript` (built-in, no dependencies)

**Linux**:
1. Try `wl-paste` (Wayland)
2. Fall back to `xclip` (X11)

**Windows**:
1. Use PowerShell (built-in)

#### osascript Fallback

When pngpaste is not available on macOS, Alexi uses AppleScript to read clipboard images:

```typescript
// AppleScript to write clipboard image to temporary file
const script = `
  set tmpFile to POSIX file "${tmpFile}"
  try
    set imgData to the clipboard as «class PNGf»
    set fRef to open for access tmpFile with write permission
    set eof fRef to 0
    write imgData to fRef
    close access fRef
  on error errMsg
    try
      close access tmpFile
    end try
    error errMsg
  end try
`;
```

This approach:
- Requires no external dependencies
- Works on all macOS versions with osascript
- Handles clipboard errors gracefully
- Cleans up temporary files automatically

### Keyboard Shortcuts

The TUI implements vim-inspired keyboard shortcuts:

| Shortcut | Action | Context |
|----------|--------|---------|
| Tab | Cycle agents forward | Global |
| Shift+Tab | Cycle agents backward | Global |
| Ctrl+X | Activate leader mode | Global |
| Ctrl+K | Open command palette | Global |
| Ctrl+L | Clear messages | Global |
| Ctrl+C | Abort streaming / Exit | Global |
| Ctrl+V | Paste image from clipboard | Input focused |
| Escape | Dismiss autocomplete / Clear attachments | Input focused |
| Up/Down | Navigate autocomplete or history | Input focused |
| Enter | Accept autocomplete or submit | Input focused |

#### Leader Mode

Leader mode (Ctrl+X) enables secondary keybindings:

| Key | Action |
|-----|--------|
| n | New session |
| m | Open model picker |
| a | Open agent selector |
| s | Open session list |

## Future Improvements

- [ ] Add more provider implementations
- [ ] Improve test coverage
- [ ] Add metrics and telemetry
- [ ] Implement caching layer
- [ ] Add web UI option
- [ ] TUI session persistence and restoration
- [ ] TUI command history search (Ctrl+R)
- [ ] TUI split panes for multi-agent workflows
