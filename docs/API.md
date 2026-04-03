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

The interactive REPL provides slash commands for managing sessions, configuration, and AI interactions. The TUI supports page navigation and advanced keyboard shortcuts.

### Page Navigation

| Shortcut | Description |
|----------|-------------|
| `Ctrl+L` | Toggle between Chat page and Logs page |
| `Ctrl+B` | Toggle sidebar visibility (file changes panel) |
| `j/k` | Scroll down/up in message area (Vim-style) |
| `Ctrl+U/D` | Page up/down in message area |
| `gg` | Jump to top of message area |
| `G` | Jump to bottom of message area |
| `Page Up/Down` | Scroll one page up/down |

### Sidebar Navigation

When the sidebar is visible and focused:

| Shortcut | Description |
|----------|-------------|
| `Up/Down` | Navigate file list |
| `j/k` | Navigate file list (Vim-style) |
| `Enter` | View diff for selected file |

### General Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `/help` | `/h` | Show help message with all available commands |
| `/exit` | `/quit`, `/q` | Exit the interactive REPL |
| `/clear` | | Clear the terminal screen |
| `/agent` | | Switch to a different agent (code, debug, plan, explore, ask) |
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
}
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

## Agent System

### Built-in Agents

Alexi includes specialized agents for different tasks:

| Agent | Mode | Description |
|-------|------|-------------|
| `code` | primary | Code generation and refactoring |
| `debug` | primary | Debugging and troubleshooting |
| `plan` | primary | Planning and architecture design |
| `explore` | primary | Codebase exploration and analysis |
| `ask` | primary | Read-only queries and information retrieval |

### Ask Agent

The ask agent provides a safe, read-only interface for querying codebases:

```typescript
import { getAskAgentBashRules } from './agent/index.js';

// Get read-only bash command rules
const rules = getAskAgentBashRules();

// Rules enforce:
// - Allow: cat, ls, grep, git status, git log, etc.
// - Deny: git add, git commit, write operations
// - Default: deny for unknown commands
```

#### Ask Agent Features

- **Read-Only Tools**: Only has access to read, grep, glob, and restricted bash
- **No Write Operations**: Cannot modify files or commit changes
- **Safe Exploration**: Perfect for code reviews and information gathering
- **Git Read-Only**: Can view git history but cannot make commits

#### Ask Agent Bash Restrictions

```typescript
const readOnlyBash: Record<string, 'allow' | 'ask' | 'deny'> = {
  '*': 'deny',  // Default deny for unknown commands
  
  // Allowed read-only operations
  'cat *': 'allow',
  'ls *': 'allow',
  'grep *': 'allow',
  'git status *': 'allow',
  'git log *': 'allow',
  'git diff *': 'allow',
  
  // Explicitly denied write operations
  'git add *': 'deny',
  'git commit *': 'deny',
  'git push *': 'deny',
};
```

### Agent Switching

```typescript
import { switchAgent, getCurrentAgent } from './agent/index.js';

// Switch to ask agent
const agent = switchAgent('ask', 'Need read-only access');

// Get current agent
const current = getCurrentAgent();
console.log(current.id); // 'ask'
console.log(current.description); // 'Read-only queries...'
```

## Skill System

The skill system enables reusable AI behaviors with tool constraints and model preferences.

### Skill Definition

```typescript
import { defineSkill } from './skill/index.js';

const codeReviewSkill = defineSkill({
  id: 'code-review',
  name: 'Code Review',
  description: 'Perform thorough code review with best practices',
  prompt: 'Review code for quality, security, and performance...',
  
  // Tool constraints
  tools: ['read', 'grep', 'glob'],
  disabledTools: ['write', 'edit'],
  
  // Model preferences
  preferredModel: 'anthropic--claude-4-sonnet',
  temperature: 0.3,
  
  // Metadata
  category: 'review',
  tags: ['quality', 'security', 'performance'],
  aliases: ['review', 'cr'],
});
```

### Loading Skills from Files

Skills can be defined in Markdown files with YAML frontmatter:

```typescript
import { loadSkillFromFile, discoverSkills } from './skill/index.js';

// Load a single skill
const skill = loadSkillFromFile('./skills/code-review.md');

// Discover all skills in a directory
const skills = await discoverSkills('./skills');
```

#### Skill File Format

```markdown
---
id: code-review
name: Code Review
description: Perform thorough code review
category: review
tags: [quality, security, performance]
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
```

### Skill Registry

```typescript
import { SkillRegistry } from './skill/index.js';

const registry = new SkillRegistry();

// Register a skill
registry.register(codeReviewSkill);

// Get skill by ID or alias
const skill = registry.get('code-review');
const sameSkill = registry.get('review'); // Using alias

// List skills by category
const reviewSkills = registry.listByCategory('review');

// List all skills
const allSkills = registry.list();

// Remove a skill
registry.remove('code-review');
```

### Applying Skills

```typescript
import { applySkill } from './skill/index.js';

// Apply skill to a conversation
const result = await applySkill('code-review', {
  context: {
    files: ['src/tool/tools/write.ts'],
    workdir: process.cwd(),
  },
  onProgress: (event) => {
    console.log(`Skill progress: ${event.type}`);
  },
});
```

### Built-in Skills

Alexi includes several built-in skills:

| Skill ID | Category | Description |
|----------|----------|-------------|
| `code-review` | review | Thorough code review with best practices |
| `explain-code` | documentation | Explain code functionality and design |
| `refactor` | refactoring | Suggest refactoring improvements |
| `test-generation` | testing | Generate unit tests for code |

### Skill Interface

```typescript
interface Skill {
  id: string;
  name: string;
  description: string;
  prompt: string;
  
  // Optional structured prompts
  prompts?: {
    system?: string;
    review?: string;
    planning?: string;
    codeReview?: string;
  };
  
  // Tool constraints
  tools?: string[];
  disabledTools?: string[];
  
  // Model preferences
  preferredModel?: string;
  temperature?: number;
  maxTokens?: number;
  
  // Metadata
  category?: string;
  tags?: string[];
  aliases?: string[];
  
  // Source information
  source?: 'builtin' | 'file' | 'mcp';
  sourcePath?: string;
}
```

## Config File Protection

The permission system includes special protection for configuration files.

### Protected Paths

```typescript
import { ConfigProtection } from './permission/config-paths.js';

// Check if a path is a config file
const isConfig = ConfigProtection.isRelative('.alexi/context.json'); // true
const isAgents = ConfigProtection.isRelative('AGENTS.md'); // true

// Check absolute path
const absoluteConfig = ConfigProtection.isAbsolute(
  '/project/.alexi/config.json',
  '/project'
); // true

// Get metadata for permission dialog
const metadata = ConfigProtection.getMetadata();
// { disableAlways: true }
```

### Protected Directories

- `.kilo/`, `.kilocode/`, `.opencode/`, `.alexi/` (at any depth)
- `~/.alexi/` (global config directory)
- Excludes: `.alexi/plans/` (not config files)

### Protected Root Files

- `kilo.json`, `kilo.jsonc`
- `opencode.json`, `opencode.jsonc`
- `alexi.json`, `alexi.jsonc`
- `AGENTS.md`

### Protection Behavior

When the agent attempts to write to a config file:

1. Permission request is flagged as config file modification
2. Metadata includes `disableAlways: true`
3. Permission dialog shows without "Always allow" option
4. User must explicitly approve each config file change

```typescript
// Example permission check for config files
const permissionInfo = {
  patterns: ['.alexi/context.json'],
  permission: 'write',
};

if (ConfigProtection.isRequest(permissionInfo)) {
  // This is a config file write - require explicit approval
  const metadata = ConfigProtection.getMetadata();
  // Show permission dialog with metadata
}
```

## TUI Components

The TUI provides React-based components for interactive terminal usage.

### Page Components

```typescript
import { ChatPage, LogsPage } from './cli/tui/pages/index.js';

// ChatPage props
interface ChatPageProps {
  messages: MessageDisplay[];
  streamingText: string;
  isStreaming: boolean;
  activeToolCalls: ToolCallState[];
  onToggleToolCall: (id: string) => void;
  agent: string;
  agentColor: string;
  model: string;
  cost: { totalCost: number; currency: string };
  leaderActive: boolean;
  dialogIsOpen: boolean;
  onSubmit: (text: string) => void;
  commands: SlashCommand[];
  sidebar: SidebarContextValue;
}

// LogsPage props
interface LogsPageProps {
  entries: LogEntry[];
  agent: string;
  model: string;
  cost: { totalCost: number; currency: string };
  isStreaming: boolean;
  leaderActive: boolean;
}
```

### Custom Hooks

```typescript
// Vim mode hook
import { useVimMode } from './cli/tui/hooks/useVimMode.js';

const {
  mode,        // 'normal' | 'insert' | 'visual' | 'command'
  enabled,     // boolean
  dispatch,    // VimAction dispatcher
} = useVimMode();

// Scroll position hook
import { useScrollPosition } from './cli/tui/hooks/useScrollPosition.js';

const {
  scrollOffset,
  canScrollUp,
  canScrollDown,
  scrollUp,
  scrollDown,
  scrollToTop,
  scrollToBottom,
  scrollPageUp,
  scrollPageDown,
} = useScrollPosition({ totalLines: 100, visibleLines: 24 });

// File changes hook
import { useFileChanges } from './cli/tui/hooks/useFileChanges.js';

const files = useFileChanges(); // FileChange[]

// Log collector hook
import { useLogCollector } from './cli/tui/hooks/useLogCollector.js';

const { entries } = useLogCollector(); // LogEntry[]
```

### TUI Context Types

```typescript
// Page context
interface PageContextValue {
  page: 'chat' | 'logs';
  setPage: (page: 'chat' | 'logs') => void;
}

// Sidebar context
interface SidebarContextValue {
  visible: boolean;
  toggle: () => void;
  files: FileChange[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

// File change type
interface FileChange {
  path: string;
  status: 'added' | 'modified' | 'deleted';
  additions?: number;
  deletions?: number;
}

// Log entry type
interface LogEntry {
  timestamp: number;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  data?: unknown;
}
```

