# Configuration

This document describes all configuration options for Alexi, including environment variables, routing configuration, session management, and TUI customization.

## Table of Contents

- [Environment Variables](#environment-variables)
- [Routing Configuration](#routing-configuration)
- [Session Storage](#session-storage)
- [TUI Configuration](#tui-configuration)
- [Permission Configuration](#permission-configuration)
- [Configuration Files](#configuration-files)

## Environment Variables

### Required Variables

#### AICORE_SERVICE_KEY

SAP AI Core service key in JSON format containing authentication credentials.

```bash
export AICORE_SERVICE_KEY='{
  "clientid": "your-client-id",
  "clientsecret": "your-client-secret",
  "url": "https://your-auth-url",
  "serviceurls": {
    "AI_API_URL": "https://your-ai-api-url"
  }
}'
```

**Format**: JSON string
**Required**: Yes (for SAP AI Core integration)

### Optional Variables

#### AICORE_RESOURCE_GROUP

SAP AI Core resource group identifier.

```bash
export AICORE_RESOURCE_GROUP=production
```

**Default**: `default`
**Format**: String

#### AICORE_MODEL

Default model to use when no model is specified.

```bash
export AICORE_MODEL=gpt-4o
```

**Default**: Auto-selected based on routing rules
**Format**: String (model ID)

#### SAP_PROXY_BASE_URL

Base URL for OpenAI-compatible proxy endpoint.

```bash
export SAP_PROXY_BASE_URL=http://127.0.0.1:3001/v1
```

**Default**: None
**Format**: URL string
**Use Case**: Proxy mode for OpenAI-compatible models

#### SAP_PROXY_API_KEY

API key for proxy endpoint authentication.

```bash
export SAP_PROXY_API_KEY=your_secret_key
```

**Default**: None
**Format**: String
**Use Case**: Proxy mode authentication

#### SAP_PROXY_MODEL

Default model for proxy mode.

```bash
export SAP_PROXY_MODEL=gpt-4o
```

**Default**: None
**Format**: String (model ID)

#### LOG_LEVEL

Logging verbosity level.

```bash
export LOG_LEVEL=debug
```

**Default**: `info`
**Options**: `debug`, `info`, `warn`, `error`

## Routing Configuration

Routing rules control automatic model selection based on prompt analysis.

### Configuration File Location

Alexi looks for routing configuration in the following locations (in order):

1. `./routing-config.json` (project root)
2. `~/.alexi/routing-config.json` (user home directory)
3. Built-in default configuration

### Configuration Format

```json
{
  "rules": [
    {
      "name": "code-tasks",
      "priority": 100,
      "condition": {
        "contains": ["code", "implement", "fix"],
        "complexity": "high"
      },
      "model": "anthropic--claude-4.5-sonnet",
      "description": "Use Claude Sonnet for complex coding tasks"
    },
    {
      "name": "simple-queries",
      "priority": 50,
      "condition": {
        "complexity": "low",
        "tokenEstimate": { "max": 100 }
      },
      "model": "gpt-4o-mini",
      "description": "Use GPT-4o-mini for simple queries"
    }
  ],
  "default": {
    "model": "anthropic--claude-4.5-sonnet",
    "description": "Default model when no rules match"
  }
}
```

### Rule Structure

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Rule identifier |
| `priority` | number | Evaluation priority (higher = later evaluation) |
| `condition` | object | Matching criteria |
| `model` | string | Model to use when rule matches |
| `description` | string | Human-readable description |

### Condition Options

| Condition | Type | Description | Example |
|-----------|------|-------------|---------|
| `contains` | string[] | Keywords in prompt | `["code", "implement"]` |
| `complexity` | string | Complexity level | `"low"`, `"medium"`, `"high"` |
| `tokenEstimate` | object | Token count constraints | `{"min": 100, "max": 1000}` |
| `taskType` | string | Detected task type | `"coding"`, `"reasoning"`, `"creative"` |

### Cost Optimization Strategies

#### Prefer Cheap Models

```json
{
  "rules": [
    {
      "name": "cheap-first",
      "priority": 200,
      "condition": {
        "complexity": "low"
      },
      "model": "gpt-4o-mini"
    }
  ]
}
```

#### Quality First

```json
{
  "rules": [
    {
      "name": "quality-first",
      "priority": 200,
      "condition": {
        "complexity": "high"
      },
      "model": "anthropic--claude-4.5-opus"
    }
  ]
}
```

#### Balanced Approach

```json
{
  "rules": [
    {
      "name": "simple-cheap",
      "priority": 100,
      "condition": { "complexity": "low" },
      "model": "gpt-4o-mini"
    },
    {
      "name": "complex-quality",
      "priority": 100,
      "condition": { "complexity": "high" },
      "model": "anthropic--claude-4.5-sonnet"
    }
  ],
  "default": {
    "model": "gpt-4o"
  }
}
```

## Session Storage

Sessions are stored in `~/.alexi/sessions/` with the following structure:

```
~/.alexi/
├── sessions/
│   ├── session-1234567890.json
│   ├── session-1234567891.json
│   └── ...
├── routing-config.json
└── config.json
```

### Session File Format

```json
{
  "id": "session-1234567890",
  "title": "Implement user authentication",
  "model": "anthropic--claude-4.5-sonnet",
  "agent": "code",
  "created": "2026-03-15T10:30:00Z",
  "modified": "2026-03-15T11:45:00Z",
  "messages": [
    {
      "role": "user",
      "content": "How do I implement JWT authentication?"
    },
    {
      "role": "assistant",
      "content": "Here's how to implement JWT authentication...",
      "model": "anthropic--claude-4.5-sonnet"
    }
  ],
  "usage": {
    "totalTokens": 1500,
    "promptTokens": 500,
    "completionTokens": 1000
  },
  "cost": {
    "totalCost": 0.045,
    "currency": "USD"
  }
}
```

### Session Cleanup

Sessions can be managed using CLI commands:

```bash
# List all sessions
alexi sessions

# Export session to markdown
alexi session-export -s session-1234567890 -o session.md

# Delete session
alexi session-delete -s session-1234567890
```

## TUI Configuration

The Terminal User Interface can be customized through environment variables and runtime settings.

### Theme Configuration

Switch between dark and light themes:

```bash
# In TUI, use slash command
/theme dark
/theme light
```

### Keyboard Shortcuts

Keyboard shortcuts are hardcoded but can be customized in future versions. Current shortcuts:

| Shortcut | Action | Configurable |
|----------|--------|--------------|
| Tab | Cycle agents | No |
| Shift+Tab | Cycle agents backward | No |
| Ctrl+X | Leader mode | No |
| Ctrl+K | Command palette | No |
| Ctrl+L | Clear messages | No |
| Ctrl+C | Exit | No |
| Ctrl+V | Paste image | No |

### Clipboard Configuration

#### macOS

Install pngpaste for better performance:

```bash
brew install pngpaste
```

If pngpaste is not available, Alexi automatically falls back to osascript (built-in).

#### Linux (Wayland)

Install wl-clipboard:

```bash
sudo apt install wl-clipboard
```

#### Linux (X11)

Install xclip:

```bash
sudo apt install xclip
```

#### Windows

No additional configuration needed (uses built-in PowerShell).

### Autocomplete Configuration

Slash command autocomplete is enabled by default with the following behavior:

- **Trigger**: Type forward slash to show all commands
- **Filter**: Type command name to filter suggestions
- **Max Suggestions**: 6 commands shown at once
- **Navigation**: Up/Down arrows or Tab to cycle
- **Accept**: Enter or Tab when suggestion is selected

## Permission Configuration

Permission rules control file system and command execution access.

### Permission File Location

```
~/.alexi/permissions.json
```

### Permission Rule Format

```json
{
  "rules": [
    {
      "id": "allow-project-write",
      "name": "Allow Project Writes",
      "description": "Allow writing files in current project",
      "actions": ["write"],
      "paths": ["/path/to/project/**"],
      "decision": "allow",
      "priority": 100
    },
    {
      "id": "deny-secrets",
      "name": "Deny Secret Files",
      "description": "Prevent access to secret files",
      "actions": ["read", "write"],
      "paths": ["**/.env", "**/*.key", "**/*.pem"],
      "decision": "deny",
      "priority": 200
    }
  ]
}
```

### Permission Actions

| Action | Description |
|--------|-------------|
| `read` | File read operations |
| `write` | File write operations |
| `execute` | Command execution |
| `network` | Network requests |
| `admin` | Administrative operations |

### Permission Decisions

| Decision | Behavior |
|----------|----------|
| `allow` | Automatically grant permission |
| `deny` | Automatically deny permission |
| `ask` | Prompt user interactively |

### Agentic Mode Permissions

In agentic mode, high-priority allow rules are automatically added:

```json
{
  "id": "agentic-allow-write",
  "priority": 200,
  "actions": ["write"],
  "paths": ["<workdir>/**"],
  "decision": "allow"
}
```

This allows autonomous file operations within the working directory.

## Configuration Files

### Main Configuration

**Location**: `~/.alexi/config.json`

```json
{
  "defaultModel": "anthropic--claude-4.5-sonnet",
  "defaultAgent": "code",
  "autoRoute": true,
  "preferCheap": false,
  "logLevel": "info",
  "sessionPath": "~/.alexi/sessions",
  "maxSessionAge": 2592000,
  "theme": "dark"
}
```

### Environment File

**Location**: `.env` (project root, never commit)

```bash
# SAP AI Core
AICORE_SERVICE_KEY={"clientid":"...","clientsecret":"..."}
AICORE_RESOURCE_GROUP=default
AICORE_MODEL=gpt-4o

# Proxy (optional)
SAP_PROXY_BASE_URL=http://127.0.0.1:3001/v1
SAP_PROXY_API_KEY=your_secret_key
SAP_PROXY_MODEL=gpt-4o

# Logging
LOG_LEVEL=info
```

### Configuration Priority

Configuration is loaded in the following order (later sources override earlier ones):

1. Built-in defaults
2. Global config (`~/.alexi/config.json`)
3. Project config (`./alexi.config.json`)
4. Environment variables
5. Command-line flags

## Example Configurations

### Development Setup

```bash
# .env
AICORE_SERVICE_KEY={"clientid":"dev-client","clientsecret":"..."}
AICORE_RESOURCE_GROUP=development
LOG_LEVEL=debug
```

```json
// routing-config.json
{
  "rules": [
    {
      "name": "dev-fast",
      "priority": 100,
      "condition": { "complexity": "low" },
      "model": "gpt-4o-mini"
    }
  ],
  "default": {
    "model": "gpt-4o"
  }
}
```

### Production Setup

```bash
# .env
AICORE_SERVICE_KEY={"clientid":"prod-client","clientsecret":"..."}
AICORE_RESOURCE_GROUP=production
LOG_LEVEL=warn
```

```json
// routing-config.json
{
  "rules": [
    {
      "name": "prod-quality",
      "priority": 100,
      "condition": { "complexity": "high" },
      "model": "anthropic--claude-4.5-opus"
    }
  ],
  "default": {
    "model": "anthropic--claude-4.5-sonnet"
  }
}
```

### Cost-Optimized Setup

```json
// routing-config.json
{
  "rules": [
    {
      "name": "cheap-default",
      "priority": 100,
      "condition": {},
      "model": "gpt-4o-mini"
    }
  ],
  "default": {
    "model": "gpt-4o-mini"
  }
}
```

## Troubleshooting

### Configuration Not Loading

Check file locations and permissions:

```bash
ls -la ~/.alexi/
cat ~/.alexi/config.json
```

### Routing Rules Not Working

Verify routing configuration syntax:

```bash
alexi explain -m "test message"
```

### Permission Errors

Check permission rules and priorities:

```bash
cat ~/.alexi/permissions.json
```

### Clipboard Not Working

Verify clipboard tool installation:

```bash
# macOS
which pngpaste || which osascript

# Linux (Wayland)
which wl-paste

# Linux (X11)
which xclip

# Windows
where powershell
```

## Security Best Practices

1. Never commit `.env` files to version control
2. Use separate service keys for development and production
3. Restrict permission rules to necessary paths only
4. Rotate SAP AI Core credentials regularly
5. Use deny rules for sensitive files (`.env`, `*.key`, `*.pem`)
6. Review session exports before sharing (may contain sensitive data)
