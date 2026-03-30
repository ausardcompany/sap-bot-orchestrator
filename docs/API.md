# Alexi API Documentation

This document provides comprehensive API documentation for Alexi's CLI commands, configuration options, and TypeScript interfaces.

## Table of Contents

- [CLI Commands](#cli-commands)
- [Environment Variables](#environment-variables)
- [TypeScript Interfaces](#typescript-interfaces)
- [Tool System](#tool-system)
- [Permission System](#permission-system)

## CLI Commands

### chat

Send messages to LLMs with optional auto-routing and session management.

```bash
alexi chat -m <message> [options]
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `-m, --message <text>` | string | Message to send (required) |
| `--model <id>` | string | Override model selection (e.g., gpt-4o, claude-4-sonnet) |
| `--auto-route` | boolean | Enable automatic model routing |
| `--prefer-cheap` | boolean | Prefer cheaper models when auto-routing |
| `--session <id>` | string | Continue existing session |
| `--system <prompt>` | string | System prompt for conversation |

#### Examples

```bash
# Use specific model
alexi chat -m "Hello" --model gpt-4o-mini

# Auto-route with cost optimization
alexi chat -m "What is AI?" --auto-route --prefer-cheap

# Continue conversation in session
alexi chat -m "Tell me more" --session abc-123 --auto-route
```

### models

List available models/deployments from SAP AI Core.

```bash
alexi models [options]
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `-j, --json` | boolean | Output as JSON |
| `-s, --status <status>` | string | Filter by status (RUNNING, PENDING, STOPPED, etc.) |
| `--scenario <scenario>` | string | Filter by scenario ID |
| `-g, --resource-group <group>` | string | AI Core resource group (default: "default") |
| `--proxy` | boolean | Use proxy endpoint instead of direct AI Core API |

#### Examples

```bash
# List all deployments
alexi models

# Filter by status
alexi models --status RUNNING

# Filter by scenario
alexi models --scenario foundation-models

# Output as JSON
alexi models --json

# Use specific resource group
alexi models --resource-group production

# Use proxy endpoint
alexi models --proxy
```

#### Output Format

The models command displays a formatted table with the following columns:

- **ID**: Deployment ID (UUID)
- **Configuration**: Configuration name
- **Scenario**: Scenario ID
- **Status**: Current status (color-coded)
  - Green: RUNNING
  - Yellow: PENDING, STARTING
  - Red: STOPPED, DEAD, UNKNOWN
- **Created**: Creation timestamp

For RUNNING deployments, the deployment URL is displayed below the row.

#### TypeScript Interface

```typescript
interface DeploymentInfo {
  id: string;
  configurationId: string;
  configurationName: string;
  scenarioId: string | undefined;
  status: string;
  targetStatus: string;
  statusMessage?: string;
  deploymentUrl?: string;
  createdAt: string;
  modifiedAt: string;
}
```

### explain

Analyze and explain routing decisions without executing the request.

```bash
alexi explain -m <message>
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `-m, --message <text>` | string | Message to analyze (required) |

#### Example Output

```
=== Prompt Analysis ===
Type: deep-reasoning
Complexity: complex
Requires Reasoning: true
Estimated Tokens: 19

=== Matched Rules ===
• reasoning-for-math (priority: 80): Use reasoning models for math problems

=== Model Candidates (by score) ===
✓ gpt-4.1              Score: 120 - expensive tier, strong at deep-reasoning, has reasoning
  claude-4-sonnet      Score: 120 - expensive tier, strong at deep-reasoning, has reasoning

=== Selected Model ===
Model: gpt-4.1
Reason: Task type: deep-reasoning, Complexity: complex, requires reasoning
Confidence: 100%
Rule Applied: reasoning-for-math
```

### sessions

List all saved sessions.

```bash
alexi sessions
```

Displays a table of all sessions with:
- Session ID
- Title (auto-generated from first message)
- Message count
- Model used
- Creation date

### session-export

Export a session to markdown format.

```bash
alexi session-export -s <session-id> [-o output.md]
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `-s, --session <id>` | string | Session ID to export (required) |
| `-o, --output <file>` | string | Output file path (default: stdout) |

### session-delete

Delete a session.

```bash
alexi session-delete -s <session-id>
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `-s, --session <id>` | string | Session ID to delete (required) |

## Interactive Mode Commands

The interactive REPL provides slash commands for managing sessions, configuration, and AI interactions.

### General Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `/help` | `/h` | Show help message with all available commands |
| `/exit` | `/quit`, `/q` | Exit the interactive REPL |
| `/clear` | | Clear the terminal screen |
| `/agent` | | Switch to a different agent (code, debug, plan, explore) |
| `/stage` | | Switch development stage |
| `/dod` | | Run Definition of Done checks |
| `/map` | | Show repository map |
| `/map-refresh` | | Rebuild repository map from scratch |
| `/map-tokens` | | Set token budget for repository map |

### Model Management

| Command | Description | Example |
|---------|-------------|---------|
| `/model <model-id>` | Switch to a different model and save as default | `/model gpt-4o` |
| `/models` | Open interactive model picker | `/models` |
| `/autoroute` | Toggle automatic model routing | `/autoroute` |

**Note**: When you switch models with `/model`, the selection is persisted to `~/.alexi/config.json` as your default model.

### Session Commands

| Command | Description |
|---------|-------------|
| `/session` | Show current session information |
| `/sessions` | List all saved sessions |
| `/history` | Show conversation history |
| `/tokens` | Show token usage statistics |
| `/compact` | Trigger manual context compaction |
| `/context` | Show context usage |
| `/status` | Show current status |
| `/fork` | Fork current session |
| `/rename` | Rename current session |
| `/clear-history` | Clear conversation history |
| `/cost` | Show cost summary |
| `/stats` | Show usage statistics |

### Memory Management

#### Instruction Files (/memory)

Manage instruction files that provide context to AI agents.

```bash
# List all instruction files
/memory

# Edit project instructions (AGENTS.md)
/memory edit project

# Edit user instructions (~/.alexi/ALEXI.md)
/memory edit user

# Create AGENTS.md from template
/memory init
```

**Instruction File Hierarchy**:
1. Project AGENTS.md (./AGENTS.md)
2. User ALEXI.md (~/.alexi/ALEXI.md)
3. Project rules (.alexi/rules/*.md)

#### Memories (/mem)

Manage short-term memories with tagging support.

```bash
# List all memories
/mem

# Search memories by text or tag
/mem search <query>

# Delete a memory by ID
/mem delete <id>

# Clear all memories
/mem clear

# Show memory statistics
/mem stats

# Export memories to JSON
/mem export
```

### Remember Command

Save information to memory with optional tags.

```bash
/remember <text> [#tag1 #tag2]

# Example
/remember The API endpoint is /v1/chat/completions #api #endpoint
```

### Configuration Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/system <prompt>` | Set system prompt | `/system You are a helpful assistant` |
| `/config show` | Show current configuration | `/config show` |
| `/config set <key> <value>` | Set configuration value | `/config set soundEnabled true` |
| `/config path` | Show configuration file paths | `/config path` |
| `/permissions` | List/reset permission rules | `/permissions` |
| `/mcp` | Manage MCP servers | `/mcp` |
| `/think` | Toggle extended thinking mode | `/think` |
| `/effort <level>` | Set effort level (low/medium/high/max) | `/effort high` |
| `/doctor` | Run environment health checks | `/doctor` |

### Git Commands

| Command | Description |
|---------|-------------|
| `/diff` | Show files changed in current session |
| `/undo` | Undo last file change |
| `/redo` | Redo last undone change |
| `/commit` | Force commit pending changes |
| `/git <command>` | Run a git command |
| `/git-log` | Show recent AI commits |

### Data Export/Import

| Command | Description | Example |
|---------|-------------|---------|
| `/export <file>` | Export data to file | `/export session.json` |
| `/import <file>` | Import data from file | `/import session.json` |

### Autocomplete Support

The interactive REPL provides Tab completion for:
- **Slash commands**: Type `/` and press Tab to see available commands
- **Model names**: After `/model `, press Tab to see available models
- **File paths**: After `/export ` or `/import `, press Tab for file completion

```bash
# Autocomplete slash commands
/mod<Tab>  → /model

# Autocomplete model names
/model gpt<Tab>  → /model gpt-4o

# Autocomplete file paths
/export session<Tab>  → /export session.json
```

### session-delete

Delete a session.

```bash
alexi session-delete -s <session-id>
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `-s, --session <id>` | string | Session ID to delete (required) |

## Environment Variables

### Required Variables

#### AICORE_SERVICE_KEY

SAP AI Core service key in JSON format. Contains authentication credentials for SAP AI Core.

```bash
AICORE_SERVICE_KEY='{"clientid":"...","clientsecret":"...","url":"...","serviceurls":{"AI_API_URL":"..."}}'
```

### Optional Variables

#### AICORE_RESOURCE_GROUP

SAP AI Core resource group identifier. Defaults to "default" if not specified.

```bash
AICORE_RESOURCE_GROUP=production
```

#### AICORE_MODEL

Default model to use when no model is specified.

```bash
AICORE_MODEL=gpt-4o
```

#### SAP_PROXY_BASE_URL

Base URL for OpenAI-compatible proxy endpoint (for proxy mode).

```bash
SAP_PROXY_BASE_URL=http://127.0.0.1:3001/v1
```

#### SAP_PROXY_API_KEY

API key for proxy endpoint authentication.

```bash
SAP_PROXY_API_KEY=your_secret_key
```

## TypeScript Interfaces

### Core Interfaces

#### UserConfig

User configuration stored in ~/.alexi/config.json

```typescript
interface UserConfig {
  defaultModel?: string;          // Persistent default model
  soundEnabled?: boolean;         // Enable notification sounds
  autoRoute?: boolean;            // Auto-routing preference
  [key: string]: unknown;         // Extensible for custom settings
}

// User configuration API
import {
  loadFullConfig,
  saveFullConfig,
  getConfigValue,
  setConfigValue,
  getConfigDefaultModel,
  setConfigDefaultModel
} from './config/userConfig.js';

// Load entire config
const config = loadFullConfig();

// Get specific value
const defaultModel = getConfigDefaultModel();

// Set and persist value
setConfigDefaultModel('claude-4-sonnet');

// Generic key access
setConfigValue('soundEnabled', true);
const soundEnabled = getConfigValue('soundEnabled');
```

#### CompletionResult

Result from LLM completion request.

```typescript
interface CompletionResult {
  text: string;
  usage?: TokenUsage;
  toolCalls?: ToolCall[];
  finishReason?: string;
}
```

#### TokenUsage

Token usage statistics for a request.

```typescript
interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
```

#### ToolCall

Tool call request from LLM.

```typescript
interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}
```

#### AgentConfig

Configuration for defining custom agents.

```typescript
export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string().optional(), // Human-readable name for org modes
  description: z.string(),
  mode: z.enum(['primary', 'subagent', 'all']).default('all'),
  systemPrompt: z.string(),
  // Tool configuration
  tools: z.array(z.string()).optional(), // Tool IDs this agent can use
  disabledTools: z.array(z.string()).optional(), // Explicitly disabled tools
  // Model preferences
  preferredModel: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().optional(),
  // Aliases for @syntax switching
  aliases: z.array(z.string()).optional(),
  // Options for organization-managed agents
  options: z.record(z.string(), z.unknown()).optional(),
});

export type AgentConfig = z.infer<typeof AgentSchema>;

// Agent registry functions
import { 
  getAgentRegistry, 
  switchAgent, 
  removeAgent,
  getCurrentAgent 
} from './agent/index.js';

// Get current agent
const agent = getCurrentAgent();

// Switch to different agent
const switched = switchAgent('debug', 'Need to fix bugs');

// Remove custom agent (cannot remove built-in or org-managed)
removeAgent('my-custom-agent');

// Access registry directly
const registry = getAgentRegistry();
const allAgents = registry.list();
```

#### Organization-Managed Modes

```typescript
import { migrateOrgModes, isOrgManagedMode } from './config/modes-migrator.js';

interface OrgMode {
  name: string;
  displayName?: string;
  description?: string;
  steps?: string[];
  options?: Record<string, unknown>;
  permission?: Record<string, unknown>;
}

// Migrate organization modes from cloud
await migrateOrgModes([
  {
    name: 'enterprise-code',
    displayName: 'Enterprise Code Assistant',
    description: 'Organization-approved coding assistant',
    options: { customSetting: 'value' }
  }
]);

// Check if agent is organization-managed
const isOrgMode = isOrgManagedMode(agent);
```

#### ErrorBackoff

Circuit breaker and exponential backoff for API errors.

```typescript
import { ErrorBackoff, extractStatusCode } from './core/error-backoff.js';

interface BackoffConfig {
  initialDelayMs: number;  // Default: 1000
  maxDelayMs: number;      // Default: 60000
  multiplier: number;      // Default: 2
  maxRetries: number;      // Default: 5
}

const backoff = new ErrorBackoff({
  initialDelayMs: 1000,
  maxDelayMs: 60000,
  multiplier: 2,
  maxRetries: 5
});

// Record error with optional status code
backoff.recordError(500);

// Record success (resets backoff)
backoff.recordSuccess();

// Check if should backoff
if (backoff.shouldBackoff()) {
  const delayMs = backoff.getRemainingBackoffMs();
  await sleep(delayMs);
}

// Check if error is fatal (4xx)
if (backoff.isFatal()) {
  throw new Error('Fatal error, stop retrying');
}

// Get consecutive error count
const errorCount = backoff.getConsecutiveErrors();

// Extract status code from error message
const statusCode = extractStatusCode('API error: status: 429');
// Returns: 429
```

#### Shell Utilities

Cross-platform shell detection and execution.

```typescript
import { Shell } from './shell/shell.js';

// Find PowerShell on Windows
const pwsh = Shell.findPowerShell();
// Returns: 'C:\\Program Files\\PowerShell\\7\\pwsh.exe' or undefined

// Get default shell for platform
const shell = Shell.getDefaultShell();
// Windows: pwsh.exe, cmd.exe
// Unix: $SHELL or /bin/bash

// Get shell arguments for command execution
const args = Shell.getShellArgs('pwsh.exe');
// Returns: ['-NoProfile', '-NonInteractive', '-Command']

const bashArgs = Shell.getShellArgs('/bin/bash');
// Returns: ['-c']
```

#### Permission System Enhancements

```typescript
import { ConfigProtection } from './permission/config-paths.js';
import { matchesPattern } from './permission/next.js';
import { drainCovered } from './permission/drain.js';

// Check if path is a config file
const isConfig = ConfigProtection.isRelative('.alexi/config.json');
// Returns: true

// Check if path is global config directory
const isGlobal = ConfigProtection.isGlobalConfigDir('/home/user/.alexi');
// Returns: true

// Check if permission request involves config files
const request = { patterns: ['.alexi/rules.json'] };
const needsProtection = ConfigProtection.isRequest(request);
// Returns: true

// Metadata key for disabling "Allow always" option
const key = ConfigProtection.DISABLE_ALWAYS_KEY;
// Returns: 'disableAlways'

// Pattern matching with glob support
matchesPattern('*.ts', 'index.ts'); // true
matchesPattern('src/**/*.ts', 'src/tool/tools/read.ts'); // true

// Auto-resolve pending permissions
await drainCovered(
  pending,      // Pending permission requests
  approved,     // Approved rules
  evaluate,     // Evaluation function
  events,       // Event definitions
  DeniedError,  // Error constructor
  'exclude-id'  // Optional: ID to exclude from drain
);
```

#### Builtin Skills

```typescript
import { BuiltinSkills } from './skill/builtin.js';

interface Skill {
  id: string;
  name: string;
  description: string;
  prompt: string;
  source: 'builtin' | 'user';
  sourcePath: string;
}

// Get built-in skill by name
const skill = BuiltinSkills.get('alexi-config');

// List all built-in skills
const skills = BuiltinSkills.list();

// Check if skill is built-in
const isBuiltin = BuiltinSkills.isBuiltin('__builtin__');
// Returns: true
```

### Agentic Chat Interfaces

#### AgenticChatOptions

Configuration options for agentic chat execution.

```typescript
interface AgenticChatOptions {
  modelOverride?: string;
  autoRoute?: boolean;
  preferCheap?: boolean;
  sessionManager?: SessionManager;
  systemPrompt?: string;
  maxIterations?: number; // Default: 50
  workdir?: string; // Default: process.cwd()
  enabledTools?: string[]; // Default: all registered tools
  onProgress?: (event: AgenticProgressEvent) => void;
  signal?: AbortSignal;
}
```

#### AgenticChatResult

Result from agentic chat execution.

```typescript
interface AgenticChatResult {
  text: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  modelUsed: string;
  routingReason?: string;
  iterations: number;
  toolCallsExecuted: number;
  toolCallSummary: Array<{
    name: string;
    success: boolean;
    error?: string;
  }>;
}
```

#### AgenticProgressEvent

Progress event emitted during agentic execution.

```typescript
interface AgenticProgressEvent {
  type: 'llm_call' | 'tool_start' | 'tool_end' | 'iteration' | 'complete';
  iteration?: number;
  toolName?: string;
  toolId?: string;
  result?: ToolResult;
  message?: string;
}
```

## Tool System

### Tool Definition

Tools are defined using the `defineTool` function with Zod schema validation.

```typescript
import { defineTool } from '../tool/index.js';
import { z } from 'zod';

const myTool = defineTool({
  name: 'my-tool',
  description: 'Description of what the tool does',
  parameters: z.object({
    param1: z.string().describe('Parameter description'),
    param2: z.number().optional(),
  }),
  permission: {
    action: 'write',
    getResource: (params, context) => {
      // Resolve resource path with context
      return path.join(context?.workdir || process.cwd(), params.filePath);
    },
  },
  async execute(params, context) {
    // Tool implementation
    return {
      success: true,
      data: { /* result data */ },
    };
  },
});
```

### ToolContext

Context provided to tool execution.

```typescript
interface ToolContext {
  workdir: string; // Working directory
  signal?: AbortSignal; // Cancellation signal
  sessionId?: string; // Current session ID
}
```

### ToolDefinition

Tool definition with permission support and context-aware resource resolution.

```typescript
interface ToolDefinition<TParams extends z.ZodType, TResult> {
  name: string;
  description: string;
  parameters: TParams;
  // Permission requirements
  permission?: {
    action: PermissionAction;
    // getResource can optionally receive context to resolve relative paths
    getResource: (params: z.infer<TParams>, context?: ToolContext) => string;
  };
  // Execution function
  execute: (params: z.infer<TParams>, context: ToolContext) => Promise<ToolResult<TResult>>;
}
```

### ToolResult

Result returned from tool execution.

```typescript
interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  truncated?: boolean;
  hint?: string;
}
```

### Built-in Tools

#### read

Read files and directories.

```typescript
{
  name: 'read',
  parameters: {
    filePath: string; // Path to read
    limit?: number;   // Max lines to return (default: 2000)
    offset?: number;  // Line offset to start from
  }
}
```

#### write

Write or create files.

```typescript
{
  name: 'write',
  parameters: {
    filePath: string; // Path to write
    content: string;  // Content to write
  }
}
```

#### edit

Perform exact string replacements in files.

```typescript
{
  name: 'edit',
  parameters: {
    filePath: string;    // Path to file
    oldString: string;   // Text to replace
    newString: string;   // Replacement text
    replaceAll?: boolean; // Replace all occurrences (default: false)
  }
}
```

#### glob

Find files matching a pattern.

```typescript
{
  name: 'glob',
  parameters: {
    pattern: string; // Glob pattern (e.g., "**/*.ts")
    path?: string;   // Base path to search from
  }
}
```

#### grep

Search file contents using regex.

```typescript
{
  name: 'grep',
  parameters: {
    pattern: string;  // Regular expression pattern
    path?: string;    // Base path to search from
    include?: string; // File pattern filter (e.g., "*.js")
  }
}
```

#### bash

Execute shell commands.

```typescript
{
  name: 'bash',
  parameters: {
    command: string; // Shell command to execute
  }
}
```

#### codebase_search (WarpGrep)

AI-powered semantic code search using WarpGrep.

```typescript
{
  name: 'codebase_search',
  parameters: {
    query: string; // Descriptive search query
  }
}
```

**Requirements**: Install `@morphllm/morphsdk` as optional dependency
**Configuration**: Set `MORPH_API_KEY` environment variable (optional during free period)

**Example**:
```bash
# Search for authentication logic
codebase_search("Find the authentication middleware that validates JWT tokens")

# Find error handling patterns
codebase_search("Show me how errors are handled in API routes")
```

**Result Format**:
```typescript
interface CodeSpan {
  filePath: string;
  startLine: number;
  endLine: number;
  content: string;
}

interface WarpGrepResult {
  spans: CodeSpan[];
  query: string;
}
```

## Permission System

### Permission Actions

```typescript
type PermissionAction = 'read' | 'write' | 'execute' | 'network' | 'admin';
```

### Permission Decisions

```typescript
type PermissionDecision = 'allow' | 'deny' | 'ask';
```

### Permission Rule

```typescript
interface PermissionRule {
  id?: string;
  name?: string;
  description?: string;
  // Matching criteria
  tools?: string[];    // Tool name patterns
  actions?: PermissionAction[];
  paths?: string[];    // File path patterns
  commands?: string[]; // Command patterns
  hosts?: string[];    // Network host patterns
  // Decision
  decision: PermissionDecision;
  // Priority (higher = evaluated later in last-match-wins)
  priority: number; // Default: 0
  // Enhanced options
  externalPaths?: boolean; // Whether rule applies to external paths
  homeExpansion?: boolean; // Expand ~/ to home directory in paths
}
```

### Permission Context

```typescript
interface PermissionContext {
  toolName: string;
  action: PermissionAction;
  resource: string; // Path, command, URL, etc.
  description?: string;
  metadata?: Record<string, unknown>; // Optional metadata for UI customization
}
```

### Permission Events

```typescript
import { PermissionRequested, PermissionResponse } from './bus/index.js';

// Permission requested event
PermissionRequested.subscribe((event) => {
  console.log('Permission requested:', event);
  // {
  //   id: 'perm-123',
  //   toolName: 'write',
  //   action: 'write',
  //   resource: '/path/to/file',
  //   description: 'Write file',
  //   timestamp: 1234567890,
  //   metadata: { disableAlways: true } // For config files
  // }
});

// Permission response event
PermissionResponse.publish({
  id: 'perm-123',
  granted: true,
  remember: false,
  timestamp: Date.now()
});
```

### Config Path Protection

Prevent AI agents from modifying configuration files:

```typescript
import { ConfigProtection } from './permission/config-paths.js';

// Protected paths include:
// - .alexi/, .kilocode/, .opencode/ directories
// - Root-level config files: alexi.json, kilo.json, AGENTS.md
// - Global config: ~/.alexi/

// Check if path is protected
const isProtected = ConfigProtection.isRelative('.alexi/config.json');

// Check if request involves config files
const needsProtection = ConfigProtection.isRequest({
  patterns: ['.alexi/rules.json']
});

// Metadata key for UI customization
const key = ConfigProtection.DISABLE_ALWAYS_KEY; // 'disableAlways'
```

### Permission Drain System

Auto-resolve pending permissions when new rules cover them:

```typescript
import { drainCovered } from './permission/drain.js';

// When user approves/denies a rule, drain pending permissions
await drainCovered(
  pending,      // Record<id, PendingRequest>
  approved,     // Array of approved rules
  evaluate,     // Evaluation function
  events,       // Event definitions
  DeniedError,  // Error constructor
  'exclude-id'  // Optional: exclude specific request
);
```

### Agentic Permission Configuration

In agentic mode, the permission system is automatically configured with high-priority allow rules:

```typescript
// Allow writes in workdir (priority 200)
{
  id: 'agentic-allow-write',
  name: 'Agentic Write Allow',
  description: 'Allow writing files in workdir for agentic mode',
  actions: ['write'],
  paths: [`${workdir}/**`, workdir],
  decision: 'allow',
  priority: 200,
}

// Allow execute operations (priority 200)
{
  id: 'agentic-allow-execute',
  name: 'Agentic Execute Allow',
  description: 'Allow executing commands for agentic mode',
  actions: ['execute'],
  decision: 'allow',
  priority: 200,
}
```

These rules override the default `ask-write` rule (priority 10) and `deny-secrets` rule (priority 100).

## Usage Examples

### Basic Chat with Auto-Routing

```typescript
import { agenticChat } from './core/agenticChat.js';

const result = await agenticChat('Write a function to sort an array', {
  autoRoute: true,
  preferCheap: true,
  maxIterations: 10,
  workdir: '/path/to/project',
});

console.log(result.text);
console.log(`Model: ${result.modelUsed}`);
console.log(`Iterations: ${result.iterations}`);
console.log(`Tool calls: ${result.toolCallsExecuted}`);
```

### List Deployments Programmatically

```typescript
import { DeploymentApi } from '@sap-ai-sdk/ai-api';

const response = await DeploymentApi.deploymentQuery(
  {},
  { 'AI-Resource-Group': 'default' }
).execute();

const deployments = response.resources || [];
const running = deployments.filter(d => d.status === 'RUNNING');

console.log(`Found ${running.length} running deployments`);
```

### Custom Tool Registration

```typescript
import { registerTool, defineTool } from './tool/index.js';
import { z } from 'zod';

const customTool = defineTool({
  name: 'custom-tool',
  description: 'My custom tool',
  parameters: z.object({
    input: z.string(),
  }),
  async execute(params, context) {
    // Implementation
    return { success: true, data: 'result' };
  },
});

registerTool(customTool);
```

## Error Handling

All CLI commands handle errors gracefully and exit with appropriate exit codes:

- `0`: Success
- `1`: Error (with error message displayed)

TypeScript APIs throw errors that should be caught and handled by the caller:

```typescript
try {
  const result = await agenticChat(message, options);
  // Handle success
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  }
  // Handle error
}
```

## Streaming Support

Alexi supports streaming responses for real-time output. See the streaming orchestrator documentation for details on implementing streaming in custom integrations.

## Logging Utility

Alexi provides a centralized logging utility for consistent logging across the application.

### Logger Interface

```typescript
interface Logger {
  setLevel(level: LogLevel): void;
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  print(message: string): void;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
```

### Usage

```typescript
import { logger } from './utils/index.js';

// Set log level
logger.setLevel('debug');

// Log messages
logger.debug('Debugging information', { context: 'value' });
logger.info('Operation completed successfully');
logger.warn('Potential issue detected');
logger.error('Operation failed', error);

// Print raw output (for CLI)
logger.print('Output without formatting');
```

### Log Level Behavior

The logger filters messages based on the configured level:

| Current Level | Messages Shown |
|---------------|----------------|
| `debug` | debug, info, warn, error |
| `info` (default) | info, warn, error |
| `warn` | warn, error |
| `error` | error only |

The `print` method always outputs regardless of log level and is intended for CLI output that should not be filtered.
