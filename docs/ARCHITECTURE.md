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
| Interactive | `src/cli/interactive.ts` | Interactive mode with streaming UI (deprecated) |
| TUI App | `src/cli/tui/App.tsx` | Ink-based TUI application with React components |
| Chat Page | `src/cli/tui/pages/ChatPage.tsx` | Main chat interface with sidebar and messages |
| Logs Page | `src/cli/tui/pages/LogsPage.tsx` | Debug logs viewer with filtering |
| Completer | `src/cli/utils/completer.ts` | Unified autocomplete engine for commands, models, paths |
| Keybindings | `src/cli/utils/keybindings.ts` | Keyboard shortcut handling |

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
| Bash Hierarchy | `src/tool/tools/bash-hierarchy.ts` | Hierarchical permission rules for bash commands |
| Read | `src/tool/tools/read.ts` | Read files and directories |
| Write | `src/tool/tools/write.ts` | Write files |
| Edit | `src/tool/tools/edit.ts` | Edit files with string replacement |
| Glob | `src/tool/tools/glob.ts` | Find files by pattern |
| Grep | `src/tool/tools/grep.ts` | Search file contents |
| WarpGrep | `src/tool/tools/warpgrep.ts` | AI-powered semantic code search |
| Task | `src/tool/tools/task.ts` | Launch sub-agents |
| WebFetch | `src/tool/tools/webfetch.ts` | Fetch web content |
| Question | `src/tool/tools/question.ts` | Ask user questions |
| TodoWrite | `src/tool/tools/todowrite.ts` | Manage task lists |

### Support Systems

| Module | File | Description |
|--------|------|-------------|
| Event Bus | `src/bus/index.ts` | Pub/sub event system with metadata support |
| Permission | `src/permission/index.ts` | File access control |
| Permission Config Paths | `src/permission/config-paths.ts` | Config file protection logic |
| Agent | `src/agent/index.ts` | Autonomous agent system with ask agent |
| Agent System | `src/agent/system.ts` | Multi-layer system prompt assembly |
| MCP | `src/mcp/index.ts` | Model Context Protocol |
| MCP Client | `src/mcp/client.ts` | MCP server connection manager with caching |
| Skill | `src/skill/index.ts` | Reusable AI behavior system |
| Compaction | `src/compaction/index.ts` | Context compression with metadata preservation |
| Profile | `src/profile/index.ts` | User profile management |
| User Config | `src/config/userConfig.ts` | Persistent user configuration |
| Logger | `src/utils/logger.ts` | Centralized logging utility |
| Global Utils | `src/utils/global.ts` | Global path resolution utilities |

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

## Instruction File System

Alexi uses a multi-layer instruction file system to provide context to AI agents:

```mermaid
graph TB
    subgraph Sources[\"Instruction Sources\"]
        Soul[Soul Prompt<br/>core identity]
        Model[Model Prompt<br/>Anthropic/OpenAI/Gemini]
        Env[Environment Info<br/>workdir, git, platform]
        Agent[Agent Prompt<br/>code/debug/plan/explore]
        Project[Project AGENTS.md<br/>./AGENTS.md]
        User[User ALEXI.md<br/>~/.alexi/ALEXI.md]
        Rules[Project Rules<br/>.alexi/rules/*.md]
        Custom[Custom Rules<br/>user-provided]
    end
    
    subgraph Assembly[\"System Prompt Assembly\"]
        Assemble[buildAssembledSystemPrompt]
    end
    
    subgraph Output[\"Final Prompt\"]
        System[Complete System Prompt]
    end
    
    Soul --> Assemble
    Model --> Assemble
    Env --> Assemble
    Agent --> Assemble
    Project --> Assemble
    User --> Assemble
    Rules --> Assemble
    Custom --> Assemble
    
    Assemble --> System
    
    style Soul fill:#E3F2FD
    style Model fill:#E8F5E9
    style Agent fill:#FFF3E0
    style Project fill:#F3E5F5
    style User fill:#FCE4EC
    style Rules fill:#E0F2F1
    style System fill:#4CAF50
```

### Instruction File Locations

| File | Path | Purpose |
|------|------|---------|
| Project Instructions | `./AGENTS.md` | Project-specific context, coding standards, build commands |
| User Instructions | `~/.alexi/ALEXI.md` | Global user preferences applied to all projects |
| Project Rules | `./.alexi/rules/*.md` | Scoped rules for specific aspects (API design, security, etc.) |

### Managing Instruction Files

```bash
# List all instruction files
/memory

# Edit project instructions
/memory edit project

# Edit user instructions
/memory edit user

# Create AGENTS.md from template
/memory init
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
│   │   └── tui/       # Ink-based Terminal UI
│   │       ├── components/    # React components (Header, StatusBar, MessageArea, etc.)
│   │       ├── context/       # React contexts (Theme, Session, Chat, Dialog, etc.)
│   │       ├── dialogs/       # Modal dialogs (ModelPicker, AgentSelector, etc.)
│   │       ├── hooks/         # Custom hooks (useCommands, useVimMode, useScrollPosition, etc.)
│   │       ├── pages/         # Page components (ChatPage, LogsPage)
│   │       ├── theme/         # Theme definitions (dark, light)
│   │       ├── types/         # TypeScript type definitions
│   │       └── utils/         # TUI utilities (helpEntries, terminalImage)
│   ├── core/          # Core orchestration
│   ├── providers/     # LLM providers
│   ├── tool/          # Tool system
│   │   └── tools/     # Individual tools
│   ├── agent/         # Agent system with ask agent
│   ├── bus/           # Event bus with metadata support
│   ├── permission/    # Permission system with config protection
│   ├── mcp/           # MCP integration with client manager
│   ├── skill/         # Skill system for reusable behaviors
│   ├── config/        # Configuration
│   ├── log/           # Logging
│   ├── profile/       # Profile management
│   └── utils/         # Shared utilities (logger, global paths)
├── tests/             # Test files
│   └── cli/tui/       # TUI component tests
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

## Future Improvements

- [ ] Add more provider implementations
- [ ] Improve test coverage
- [ ] Add metrics and telemetry
- [ ] Implement caching layer
- [ ] Add web UI option

## TUI Architecture

The Terminal User Interface (TUI) is built with Ink 6 and React 19, providing a full-featured interactive experience.

```mermaid
graph TB
    subgraph TUI["TUI Application"]
        App[App.tsx]
        PageRouter[Page Router]
        ChatPage[ChatPage]
        LogsPage[LogsPage]
        DialogHost[DialogHost]
    end
    
    subgraph Contexts["React Contexts"]
        Theme[ThemeContext]
        Session[SessionContext]
        Chat[ChatContext]
        Sidebar[SidebarContext]
        Page[PageContext]
        Dialog[DialogContext]
        Keybind[KeybindContext]
        Attachment[AttachmentContext]
    end
    
    subgraph Components["UI Components"]
        Header[Header]
        MessageArea[MessageArea]
        InputBox[InputBox]
        StatusBar[StatusBar]
        SplitPane[SplitPane]
        SidebarComp[Sidebar]
        LogViewer[LogViewer]
        DiffView[DiffView]
    end
    
    subgraph Hooks["Custom Hooks"]
        StreamChat[useStreamChat]
        Commands[useCommands]
        VimMode[useVimMode]
        ScrollPos[useScrollPosition]
        FileChanges[useFileChanges]
        LogCollector[useLogCollector]
    end
    
    App --> PageRouter
    PageRouter --> ChatPage
    PageRouter --> LogsPage
    App --> DialogHost
    
    ChatPage --> SplitPane
    SplitPane --> SidebarComp
    SplitPane --> MessageArea
    ChatPage --> InputBox
    ChatPage --> StatusBar
    
    LogsPage --> LogViewer
    LogsPage --> StatusBar
    
    MessageArea --> DiffView
    
    App --> Contexts
    Contexts --> Components
    Components --> Hooks
    
    style App fill:#4CAF50
    style ChatPage fill:#2196F3
    style LogsPage fill:#FF9800
```

### TUI Page Navigation

```mermaid
stateDiagram-v2
    [*] --> ChatPage
    ChatPage --> LogsPage: Ctrl+L
    LogsPage --> ChatPage: Ctrl+L
    
    ChatPage --> Sidebar: Ctrl+B (toggle)
    Sidebar --> ChatPage: Ctrl+B (toggle)
    
    ChatPage --> Dialog: Open Dialog
    Dialog --> ChatPage: Close/Cancel
    
    LogsPage --> Dialog: Open Dialog
    Dialog --> LogsPage: Close/Cancel
    
    note right of ChatPage
        Main chat interface
        - Message history
        - Input box
        - File changes sidebar
        - Tool execution display
    end note
    
    note right of LogsPage
        Debug logs viewer
        - Level filtering
        - Text search
        - Scrollable log entries
    end note
```

### TUI Component Hierarchy

```mermaid
graph TD
    App[App Component]
    
    App --> Providers[Context Providers]
    Providers --> Theme[ThemeProvider]
    Theme --> Page[PageProvider]
    Page --> Session[SessionProvider]
    Session --> Chat[ChatProvider]
    Chat --> Attachment[AttachmentProvider]
    Attachment --> Sidebar[SidebarProvider]
    Sidebar --> Keybind[KeybindProvider]
    Keybind --> Dialog[DialogProvider]
    
    Dialog --> Layout[AppLayout]
    Layout --> Header[Header]
    Layout --> PageRouter[Page Router]
    Layout --> DialogHost[DialogHost]
    
    PageRouter --> ChatPage[ChatPage]
    PageRouter --> LogsPage[LogsPage]
    
    ChatPage --> SplitPane[SplitPane]
    SplitPane --> SidebarComp[Sidebar]
    SplitPane --> MessageArea[MessageArea]
    ChatPage --> InputBox[InputBox]
    ChatPage --> StatusBar[StatusBar]
    
    MessageArea --> MessageBubble[MessageBubble]
    MessageArea --> ToolCallBlock[ToolCallBlock]
    ToolCallBlock --> DiffView[DiffView]
    
    LogsPage --> LogViewer[LogViewer]
    
    DialogHost --> ModelPicker[ModelPicker]
    DialogHost --> AgentSelector[AgentSelector]
    DialogHost --> PermissionDialog[PermissionDialog]
    DialogHost --> SessionList[SessionList]
    DialogHost --> McpManager[McpManager]
    DialogHost --> HelpDialog[HelpDialog]
    DialogHost --> FilePicker[FilePicker]
    DialogHost --> QuitDialog[QuitDialog]
    DialogHost --> ThemeDialog[ThemeDialog]
    DialogHost --> ArgDialog[ArgDialog]
    
    style App fill:#4CAF50
    style ChatPage fill:#2196F3
    style LogsPage fill:#FF9800
    style DialogHost fill:#9C27B0
```

## Skill System Architecture

The skill system enables reusable AI behaviors with tool constraints and model preferences.

```mermaid
graph TB
    subgraph Definition["Skill Definition"]
        File[Markdown File<br/>with Frontmatter]
        Builtin[Built-in Skill<br/>defineSkill()]
        MCP[MCP Skill<br/>from Server]
    end
    
    subgraph Loading["Skill Loading"]
        Discover[discoverSkills()]
        Load[loadSkillFromFile()]
        Validate[SkillSchema<br/>Validation]
    end
    
    subgraph Registry["Skill Registry"]
        Store[Skill Storage]
        Lookup[ID/Alias Lookup]
        Category[Category Filter]
    end
    
    subgraph Application["Skill Application"]
        Prompt[Inject Prompt]
        Tools[Configure Tools]
        Model[Set Model Preference]
        Temp[Set Temperature]
    end
    
    File --> Load
    Builtin --> Store
    MCP --> Store
    
    Load --> Validate
    Validate --> Store
    
    Discover --> Load
    
    Store --> Lookup
    Store --> Category
    
    Lookup --> Prompt
    Lookup --> Tools
    Lookup --> Model
    Lookup --> Temp
    
    style Definition fill:#E3F2FD
    style Registry fill:#4CAF50
    style Application fill:#FF9800
```

### Skill File Format

Skills are defined in Markdown files with YAML frontmatter:

```markdown
---
id: code-review
name: Code Review
description: Perform thorough code review with best practices
category: review
tags: [quality, security, performance]
aliases: [review, cr]
preferredModel: anthropic--claude-4-sonnet
temperature: 0.3
tools: [read, grep, glob]
disabledTools: [write, edit]
---

# Code Review Instructions

When reviewing code, focus on:

1. Code quality and readability
2. Security vulnerabilities
3. Performance implications
4. Test coverage
5. Documentation completeness

Use the read, grep, and glob tools to examine the codebase.
Do not modify any files during review.
```

## Ask Agent System

The ask agent provides a read-only interface for querying and exploring codebases without modification capabilities.

```mermaid
graph LR
    subgraph Agent["Ask Agent"]
        Query[User Query]
        ReadOnly[Read-Only Mode]
    end
    
    subgraph BashRules["Bash Command Rules"]
        Allow[Allow List<br/>cat, ls, grep, git status]
        Deny[Deny List<br/>git add, write operations]
        Default[Default: Deny]
    end
    
    subgraph Tools["Available Tools"]
        Read[read tool]
        Grep[grep tool]
        Glob[glob tool]
        Bash[bash tool<br/>restricted]
    end
    
    subgraph Protection["Write Protection"]
        NoWrite[No write tool]
        NoEdit[No edit tool]
        NoGitWrite[No git commits]
    end
    
    Query --> ReadOnly
    ReadOnly --> BashRules
    BashRules --> Tools
    Tools --> Protection
    
    Allow --> Bash
    Deny --> Protection
    Default --> Protection
    
    style Agent fill:#4CAF50
    style BashRules fill:#FF9800
    style Protection fill:#F44336
```

### Ask Agent Bash Allowlist

The ask agent enforces strict read-only bash command restrictions:

**Allowed Commands**:
- File reading: `cat`, `head`, `tail`, `less`
- Directory listing: `ls`, `tree`, `pwd`
- Text processing: `grep`, `rg`, `ag`, `sort`, `uniq`, `cut`, `awk`, `sed`, `jq`, `yq`
- Git read-only: `git status`, `git log`, `git diff`, `git show`, `git blame`
- System info: `uname`, `whoami`, `printenv`, `which`, `type`, `file`

**Denied Commands**:
- Git write operations: `git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`
- All unknown commands (default: deny)

## Config File Protection System

The permission system includes special protection for project configuration files.

```mermaid
flowchart TB
    Request[Permission Request]
    
    Request --> CheckAction{Action Type?}
    CheckAction -->|read| Allow[Allow]
    CheckAction -->|write/edit| CheckPath[Check Path]
    
    CheckPath --> IsConfig{Is Config File?}
    
    IsConfig -->|Yes| ConfigCheck[Config File Check]
    IsConfig -->|No| NormalPerms[Normal Permissions]
    
    ConfigCheck --> ProjectConfig{Project Config?}
    ConfigCheck --> GlobalConfig{Global Config?}
    
    ProjectConfig -->|.kilo/| Protect[Protect]
    ProjectConfig -->|.kilocode/| Protect
    ProjectConfig -->|.opencode/| Protect
    ProjectConfig -->|.alexi/| Protect
    ProjectConfig -->|AGENTS.md| Protect
    
    GlobalConfig -->|~/.alexi/| Protect
    
    Protect --> DisableAlways[Disable 'Always Allow']
    DisableAlways --> AskUser[Ask User]
    
    NormalPerms --> StandardRules[Standard Permission Rules]
    
    style Request fill:#E3F2FD
    style Protect fill:#F44336
    style Allow fill:#4CAF50
```

### Protected Paths

The config protection system guards:

1. **Project Config Directories**:
   - `.kilo/`, `.kilocode/`, `.opencode/`, `.alexi/` at any depth
   - Excludes: `.alexi/plans/` (not config files)

2. **Root Config Files**:
   - `kilo.json`, `kilo.jsonc`
   - `opencode.json`, `opencode.jsonc`
   - `alexi.json`, `alexi.jsonc`
   - `AGENTS.md`

3. **Global Config**:
   - `~/.alexi/` directory and all contents

4. **Protection Behavior**:
   - Write/edit operations require explicit user approval
   - "Always allow" option is disabled for config files
   - Metadata flag `disableAlways: true` passed to permission dialog

## MCP Client Architecture

The Model Context Protocol (MCP) client connects to external servers and aggregates their tools.

```mermaid
sequenceDiagram
    participant App as Alexi App
    participant Manager as McpClientManager
    participant Client as MCP Client
    participant Server as MCP Server
    participant Cache as Tool Cache
    
    App->>Manager: connect(config)
    Manager->>Client: new Client()
    Manager->>Server: spawn process (stdio)
    Client->>Server: initialize connection
    Server-->>Client: capabilities
    
    Client->>Server: listTools()
    Server-->>Client: tool list
    Client->>Cache: cache tools (30s TTL)
    Manager-->>App: connection established
    
    App->>Manager: getTools(serverName)
    Manager->>Cache: check cache
    
    alt Cache valid
        Cache-->>Manager: cached tools
    else Cache expired
        Manager->>Server: listTools()
        Server-->>Manager: fresh tool list
        Manager->>Cache: update cache
    end
    
    Manager-->>App: tool list
    
    App->>Manager: callTool(serverName, toolName, params)
    Manager->>Server: execute tool
    Server-->>Manager: tool result
    Manager-->>App: result
    
    App->>Manager: disconnect(serverName)
    Manager->>Client: close()
    Manager->>Server: kill process
```

### MCP Features

- **Connection Management**: Tracks status (connecting, connected, disconnected, error)
- **Tool Caching**: 30-second TTL to reduce server queries
- **Error Handling**: Graceful degradation on connection failures
- **Process Management**: Proper cleanup of child processes
- **Multiple Transports**: Currently supports stdio, extensible for HTTP/SSE


