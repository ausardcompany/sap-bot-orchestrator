# Alexi

Intelligent LLM orchestrator for SAP AI Core with automatic model routing, multi-turn conversations, and rule-based configuration.

## Features

✅ **Multi-Provider Support**
- OpenAI-compatible models (GPT-4o, GPT-4.1, GPT-4o-mini)
- Claude models via SAP AI Core (Claude 4.5 Sonnet, Claude 4.5 Haiku, Claude 4.5 Opus)
- Extensible architecture for additional providers

✅ **Intelligent Auto-Routing**
- Automatic model selection based on prompt complexity and task type
- Cost optimization with `--prefer-cheap` flag
- Rule-based routing from JSON configuration
- Routing explanation with confidence scores

✅ **Session Management**
- Multi-turn conversations with automatic context preservation
- Session persistence to disk
- Export sessions to markdown format
- Session listing and deletion

✅ **JSON-Based Configuration**
- Define model capabilities and cost tiers
- Create routing rules with priorities
- Keyword-based and complexity-based matching
- Hot-reloadable configuration

## Installation

### Via Homebrew (Recommended)

For macOS/Linux users with access to the ausardcompany private tap:

```bash
# Add the private tap (requires GitHub authentication)
brew tap ausardcompany/tap git@github.com:ausardcompany/homebrew-tap.git

# Install
brew install alexi

# Use the CLI
alexi chat -m "Hello!"
```

### From Source

```bash
git clone git@github.com:ausardcompany/sap-bot-orchestrator.git
cd sap-bot-orchestrator
npm install
npm run build
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file (see `.env.example`):
```bash
# Native SAP AI Core
AICORE_SERVICE_KEY='{"clientid":"...","clientsecret":"...","url":"...","serviceurls":{"AI_API_URL":"..."}}'
AICORE_RESOURCE_GROUP=your-resource-group-id
AICORE_MODEL=gpt-4o  # Default model
```

### 3. Build
```bash
npm run build
```

### 4. Run Commands
```bash
# Simple chat
alexi chat -m "What is 2+2?"

# Auto-routing with cost optimization
alexi chat -m "Write a function to reverse a string" --auto-route --prefer-cheap

# Continue a conversation
alexi chat -m "Now make it recursive" --session <session-id> --auto-route

# Explain routing decision
alexi explain -m "Prove that sqrt(2) is irrational"

# Start interactive mode
alexi interactive
# or use the short alias
alexi i
```

## Commands

### `chat` - Send messages to LLMs
```bash
alexi chat -m "your message" [options]

Options:
  -m, --message <text>    Message to send (required)
  --model <id>            Override model selection (e.g., gpt-4o, anthropic--claude-4.5-sonnet)
  --auto-route            Enable automatic model routing
  --prefer-cheap          Prefer cheaper models when auto-routing
  --session <id>          Continue existing session
  --system <prompt>       System prompt for conversation
```

Examples:
```bash
# Use specific model
alexi chat -m "Hello" --model gpt-4o-mini

# Auto-route with cost optimization
alexi chat -m "What is AI?" --auto-route --prefer-cheap

# Continue conversation in session
alexi chat -m "Tell me more" --session abc-123 --auto-route
```

### `agent` - Run autonomous agent mode
```bash
alexi agent -m "your task" [options]

Options:
  -m, --message <text>      Message/task to execute (required)
  -f, --message-file <path> Read message from file
  --model <id>              Model ID override
  --auto-route              Enable automatic model routing
  --prefer-cheap            Prefer cheaper models when auto-routing
  --session <id>            Continue existing session
  --system <prompt>         System prompt for the conversation
  --max-iterations <n>      Maximum tool execution iterations (default: 50)
  --workdir <path>          Working directory for tool execution
  --tools <list>            Comma-separated list of tool names to enable
  -v, --verbose             Show progress updates
  -q, --quiet               Only output the final response
```

The agent command enables tool execution capabilities, allowing the LLM to:
- Read and write files
- Execute shell commands
- Interact with the filesystem
- Complete multi-step tasks autonomously

### `interactive` - Start interactive REPL
```bash
alexi interactive [options]
alexi i [options]  # short alias

Options:
  --model <id>        Model ID to use
  --auto-route        Enable automatic model routing
  --prefer-cheap      Prefer cheaper models when auto-routing
  --session <id>      Continue existing session
  --system <prompt>   System prompt for the conversation
```

Start an interactive chat session with streaming responses and slash commands.

### `explain` - Analyze routing decisions
```bash
alexi explain -m "your message"
```

Shows:
- Prompt classification (type, complexity, reasoning requirements)
- Matched routing rules
- Model candidates with scores
- Selected model and confidence

Example output:
```
=== Prompt Analysis ===
Type: deep-reasoning
Complexity: complex
Requires Reasoning: true
Estimated Tokens: 19

=== Matched Rules ===
• reasoning-for-math (priority: 80): Use reasoning models for math problems

=== Model Candidates (by score) ===
✓ gpt-4.1                    Score: 120 - expensive tier, strong at deep-reasoning, has reasoning
  anthropic--claude-4.5-opus Score: 120 - expensive tier, strong at deep-reasoning, has reasoning
  ...

=== Selected Model ===
Model: gpt-4.1
Reason: Task type: deep-reasoning, Complexity: complex, requires reasoning
Confidence: 100%
Rule Applied: reasoning-for-math
```

### `stages` - Manage development stages
```bash
# List available stages
alexi stages

# Set current development stage
alexi stage-set -s <stage-type> [-n <number>] [--name <name>]

Stage types: architecture, planning, implementation, documentation, devops, security
```

Development stages help organize work and track expected artifacts and Definition of Done criteria.

### `notes` - Manage notes
```bash
# Generate AI_NOTES.md for current stage
alexi notes-generate [-o <output-file>]
```

Generates documentation notes based on the current development stage.

### `dod` - Definition of Done checker
```bash
# Run DoD checks for a stage
alexi dod-check [-s <stage>] [-o <output-file>]

# List available DoD checks
alexi dod-list
```

Run Definition of Done checks to verify stage completion criteria.

### `context` - Manage project context
```bash
# Show current project context
alexi context

# Initialize project context
alexi context-init -n <name> [-d <description>] [--language <lang>] [--framework <fw>]

# Add architecture invariant
alexi context-add-invariant -i <invariant-text>
```

### `sessions` - List all saved sessions
```bash
alexi sessions
```

### `session-export` - Export session to markdown
```bash
alexi session-export -s <session-id> [-o output.md]
```

### `session-delete` - Delete a session
```bash
alexi session-delete -s <session-id>
```

### `models` - List available models
```bash
alexi models
```

## Interactive Mode Commands

When in interactive mode (`alexi interactive` or `alexi i`), use these slash commands:

### Basic Commands
| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/exit`, `/quit`, `/q` | Exit the REPL |
| `/clear` | Clear screen |
| `/history` | Show conversation history |

### Model & Routing
| Command | Description |
|---------|-------------|
| `/model <id>` | Switch to a different model |
| `/models` | List available models |
| `/autoroute` | Toggle auto model routing |

### Session Management
| Command | Description |
|---------|-------------|
| `/session` | Show current session info |
| `/sessions` | List all sessions |
| `/session load <id>` | Load a previous session |
| `/session new` | Start a new session |
| `/session export` | Export session to markdown |
| `/fork [name]` | Fork current session |
| `/rename <name>` | Rename current session |

### Context & History
| Command | Description |
|---------|-------------|
| `/compact` | Compact conversation history |
| `/context` | Show context usage (tokens) |
| `/status` | Show current status |
| `/tokens` | Show token usage stats |
| `/clear-history` | Clear conversation history |

### File Changes
| Command | Description |
|---------|-------------|
| `/diff` | Show files changed in session |
| `/undo` | Undo last file change |
| `/redo` | Redo last undone change |

### Agents & Stages
| Command | Description |
|---------|-------------|
| `/agent <name>` | Switch agent (code, debug, plan, explore, orchestrator) |
| `/stage <name>` | Switch development stage |
| `/dod` | Run Definition of Done checks |

### Configuration
| Command | Description |
|---------|-------------|
| `/config` | Show current configuration |
| `/config path` | Show config file paths |
| `/config set <key> <value>` | Set configuration value |
| `/system <prompt>` | Set system prompt |

### MCP Servers
| Command | Description |
|---------|-------------|
| `/mcp` | List MCP servers |
| `/mcp connect <name>` | Connect to MCP server |
| `/mcp disconnect <name>` | Disconnect from server |
| `/mcp status` | Show connection status |

### Cost & Memory
| Command | Description |
|---------|-------------|
| `/cost` | Show today's cost summary |
| `/cost month` | Show this month's costs |
| `/cost all` | Show all-time costs |
| `/cost export` | Export cost history to CSV |
| `/remember <text>` | Save a memory (use #tags) |
| `/memory` | List all memories |
| `/memory search <query>` | Search memories |
| `/memory stats` | Show memory statistics |

### Data & Export
| Command | Description |
|---------|-------------|
| `/export [file]` | Export all data |
| `/import <file>` | Import data from file |
| `/stats` | Show usage statistics |

### Aliases & Templates
| Command | Description |
|---------|-------------|
| `/alias` | List command aliases |
| `/alias <name> <cmd>` | Create alias |
| `/snippet` | List code snippets |
| `/template` | List message templates |

### Other
| Command | Description |
|---------|-------------|
| `/think [on\|off]` | Toggle extended thinking mode |
| `/doctor` | Run environment health checks |
| `/permissions` | List permission rules |
| `/bug`, `/feedback` | Report issues |

## Available Models

| Model ID | Type | Cost Tier | Reasoning | Best For |
|----------|------|-----------|-----------|----------|
| `gpt-4o-mini` | OpenAI | Cheap | No | Simple QA, classification, extraction |
| `gpt-4o` | OpenAI | Medium | No | Coding, analysis, creative writing, vision |
| `gpt-4.1` | OpenAI | Expensive | Yes | Deep reasoning, complex math, research |
| `anthropic--claude-4.5-haiku` | Claude | Cheap | No | Simple QA, classification, summarization |
| `anthropic--claude-4.5-sonnet` | Claude | Medium | No | Coding, analysis, long-context, technical writing |
| `anthropic--claude-4.5-opus` | Claude | Expensive | Yes | Deep reasoning, complex analysis, research |

## Routing Configuration

Create a `routing-config.json` in the project root (see `routing-config.example.json`):

```json
{
  "models": [
    {
      "id": "gpt-4o-mini",
      "type": "openai",
      "costTier": "cheap",
      "strengths": ["simple-qa", "classification", "extraction"],
      "maxTokens": 16000,
      "reasoning": false,
      "enabled": true
    }
  ],
  "rules": [
    {
      "name": "force-claude-for-long-context",
      "description": "Use Claude for prompts longer than 10000 characters",
      "condition": {
        "minLength": 10000
      },
      "modelId": "anthropic--claude-4.5-sonnet",
      "priority": 100
    },
    {
      "name": "reasoning-for-math",
      "description": "Use reasoning models for math problems",
      "condition": {
        "keywords": ["prove", "derive", "equation", "theorem"]
      },
      "requiresReasoning": true,
      "priority": 80
    }
  ],
  "preferences": {
    "defaultCostTier": "medium",
    "preferCheapWhenPossible": false,
    "fallbackModel": "gpt-4o"
  }
}
```

### Rule Conditions
- `minLength` / `maxLength`: Character count constraints
- `taskTypes`: Match specific task classifications (e.g., `["simple-qa", "coding"]`)
- `maxComplexity`: Maximum allowed complexity (`"simple"`, `"medium"`, `"complex"`)
- `keywords`: List of keywords to match in prompt (case-insensitive)

## Architecture

### Provider Resolution
The orchestrator routes all requests through SAP AI Core's orchestration service:
- **GPT models** → SAP AI Core Orchestration API
- **Claude models** → SAP AI Core Orchestration API

### Routing Logic
1. Check for forced model via `--model` flag
2. If `--auto-route` enabled:
   - Classify prompt (task type, complexity, reasoning needs)
   - Match against routing rules (highest priority wins)
   - Score models based on capabilities and cost
   - Select best model with confidence score
3. Otherwise use default model from environment

### Session Management
- Sessions stored in `~/.alexi/sessions/`
- Auto-generated session IDs (UUID)
- Conversation history preserved with token tracking
- Automatic title generation from first message

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in dev mode with tsx
npm run dev -- chat -m "test"

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

## Autonomous Self-Updating System

This bot **automatically updates itself** by syncing with three upstream AI coding assistant repositories:

| Repository | Description | Source |
|------------|-------------|--------|
| **kilocode** | Kilo AI coding assistant | [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) |
| **opencode** | OpenCode AI terminal assistant | [anomalyco/opencode](https://github.com/anomalyco/opencode) |
| **claude-code** | Anthropic's Claude Code CLI | [anthropics/claude-code](https://github.com/anthropics/claude-code) |

### How It Works

The bot runs **fully autonomously** via GitHub Actions:

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions (Daily 06:00 UTC)              │
├─────────────────────────────────────────────────────────────────┤
│  1. Fetch upstream repos (kilocode, opencode, claude-code)      │
│  2. Compare with last synced commits                            │
│  3. Generate diff reports                                       │
│  4. Kilo AI analyzes changes & updates code                     │
│  5. Create PR with changes                                      │
│  6. Auto-merge PR (squash)                                      │
│  7. Update sync state                                           │
└─────────────────────────────────────────────────────────────────┘
```

### Triggers

- **Automatic**: Daily at 06:00 UTC
- **Manual**: Via GitHub Actions UI with options:
  - `dry_run` - Only analyze, don't apply changes
  - `force_sync` - Sync even if no changes detected

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AICORE_SERVICE_KEY` | Full SAP AI Core service key JSON |
| `AICORE_RESOURCE_GROUP` | SAP AI Core resource group ID |
| `GH_PAT` | Personal access token for PR creation and merge |

### Workflow Configuration

- **Workflow file**: [`.github/workflows/sync-upstream.yml`](.github/workflows/sync-upstream.yml)
- **Sync state**: [`.github/last-sync-commits.json`](.github/last-sync-commits.json)
- **Secrets setup**: See [`SYNC_SECRETS_SETUP.md`](SYNC_SECRETS_SETUP.md)

### Local Testing (Optional)

```bash
# Dry run - analyze without applying
./scripts/sync-upstream.sh --dry-run --verbose

# Full sync with auto-apply
./scripts/sync-upstream.sh --yes
```

### AI Analysis

Kilo AI analyzes upstream changes and:
1. Identifies relevant bug fixes and security updates
2. Extracts useful new features
3. Adapts code to maintain SAP AI Core compatibility
4. Creates detailed change summaries

## Testing

Test different scenarios:

```bash
# Simple query (should use gpt-4o-mini)
alexi explain -m "What is the capital of France?"

# Coding task (should use gpt-4o or anthropic--claude-4.5-sonnet)
alexi explain -m "Write a function to sort an array"

# Complex reasoning (should use gpt-4.1 or anthropic--claude-4.5-opus)
alexi explain -m "Prove the Pythagorean theorem step by step"

# Long context (should use Claude if rule enabled)
alexi explain -m "$(cat very_long_document.txt)"
```

## Roadmap

- [x] Streaming support for long responses
- [x] Interactive CLI mode (REPL)
- [x] Function/tool calling support with streaming
- [x] Content filtering (Azure, Llama Guard)
- [x] Data masking (DPI)
- [x] Document grounding
- [x] Translation support
- [x] Embeddings support
- [x] Cost tracking and budget limits
- [x] Token usage analytics
- [ ] Channel integrations (Telegram, Slack, WebChat)
- [ ] Caching layer for repeated queries
- [ ] A/B testing for routing strategies
- [ ] Performance metrics and logging

## License

MIT
