# Implementation Plan: Competitive Feature Parity

**Branch**: `008-competitive-parity` | **Date**: 2026-03-26
**Input**: Competitive analysis of Claude Code, Kilo Code, OpenCode vs Alexi v0.3.4
**Constraint**: SAP AI Core-First (strict) — all LLM calls through SAP AI Core only

## Summary

Full competitive gap analysis across Claude Code (Mar 2026), Kilo Code (Mar 2026), and OpenCode v1.3.2 identified **35 feature gaps** organized into 6 HIGH, 16 MEDIUM, and 18 LOW priority items. Alexi holds unique advantages in 11 areas (diagnostics, batch parallel, typed memory, permission drain, etc.) but lacks key extensibility features that all three competitors share: **custom agents**, **custom commands**, **custom tools**, and **lifecycle hooks**.

The plan proposes 6 implementation phases spanning ~20 weeks, each independently shippable as a minor version bump.

---

## Technical Context

**Language/Version**: TypeScript 5.9 / Node.js >= 22.12.0 / ES Modules  
**Primary Dependencies**: SAP AI SDK, Ink v6.8.0, React v19.2, Zod, tree-sitter  
**Storage**: JSON files (~/.alexi/, project .alexi/)  
**Testing**: Vitest  
**Target Platform**: macOS, Linux (CLI)  
**Project Type**: CLI / TUI  
**Constraints**: All LLM calls through SAP AI Core Orchestration API only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Gate | Status |
|---|------|--------|
| 1 | **SAP AI Core-First** — All LLM calls route through SAP AI Core Orchestration; no direct provider API calls outside `src/providers/`. | [✅] All features route through existing SAP provider. Per-agent model override selects from SAP AI Core deployments only. |
| 2 | **CLI-First** — Feature is reachable from the CLI; `--print`/`--file` non-interactive modes unaffected; stdout/stderr contract preserved. | [✅] Custom agents/commands/tools all CLI-accessible. Hooks fire in all modes. |
| 3 | **Provider Abstraction** — Changes confined to `src/providers/` + `src/config/` for any provider-level work; no provider SDK imports outside `src/providers/`. | [✅] No provider changes needed. Per-agent model override uses existing `routePrompt()`. |
| 4 | **Agentic Architecture** — Agent specialisation declared in `src/agent/prompts/`; tool results flow through event bus; MCP hot-pluggable. | [✅] Custom agents extend existing agent registry. Hooks integrate with event bus. |
| 5 | **Test Discipline (BLOCKING)** — New public functions/classes have unit tests; bug fixes have regression tests; `npm test` green; no real network/filesystem calls in tests. | [✅] Each phase requires full test coverage. |
| 6 | **Simplicity / YAGNI** — No unjustified abstractions; complexity violations documented in Complexity Tracking table below. | [⚠️] Hooks system adds complexity — justified by Claude Code precedent and CI/CD needs. See Complexity Tracking. |
| 7 | **Security & Credential Hygiene (BLOCKING)** — No credentials committed; secrets via env vars only; no `console.log` in non-CLI modules. | [✅] Custom tools sandboxed. Hooks cannot access secrets directly. |

---

## Feature Gap Matrix (Summary)

### Legend
- ✅ = Alexi has it | ⚠️ = Partial | ❌ = Missing | CC = Claude Code | KC = Kilo Code | OC = OpenCode

### HIGH Priority Gaps (Tier 1)

| # | Feature | CC | KC | OC | Alexi | Phase |
|---|---------|----|----|-----|-------|-------|
| H1 | Custom agents via Markdown + JSON config | ✅ | ✅ | ✅ | ❌ | 1 |
| H2 | Custom slash commands (Markdown files) | ❌ | ✅ | ✅ | ❌ | 2 |
| H3 | Hooks system (lifecycle events) | ✅ | ❌ | ❌ | ❌ | 3 |
| H4 | Custom tools via TypeScript files | ❌ | ❌ | ✅ | ❌ | 2 |
| H5 | `/init` auto-generate AGENTS.md | ✅ | ✅ | ✅ | ❌ | 1 |
| H6 | Per-agent model override | ✅ | ✅ | ✅ | ❌ | 1 |

### MEDIUM Priority Gaps (Tier 2)

| # | Feature | CC | KC | OC | Alexi | Phase |
|---|---------|----|----|-----|-------|-------|
| M1 | Path-scoped rules | ✅ | ❌ | ✅ | ❌ | 3 |
| M2 | Per-agent permissions | ✅ | ✅ | ✅ | ❌ | 1 |
| M3 | Patch/diff tool | ❌ | ✅ | ✅ | ❌ | 2 |
| M4 | LSP integration | ❌ | ❌ | ✅ | ❌ | 5 |
| M5 | External editor (/editor) | ❌ | ✅ | ✅ | ❌ | 2 |
| M6 | Budget/cost controls | ✅ | ❌ | ❌ | ❌ | 4 |
| M7 | Headless server mode | ❌ | ✅ | ✅ | ❌ | 6 |
| M8 | Stdin piping | ✅ | ❌ | ❌ | ❌ | 4 |
| M9 | Structured output (--json-schema) | ✅ | ❌ | ✅ | ❌ | 4 |
| M10 | MCP HTTP transport | ✅ | ❌ | ✅ | ❌ | 5 |
| M11 | MCP server management CLI | ✅ | ✅ | ✅ | ⚠️ | 4 |
| M12 | Auto mode (AI permission classification) | ✅ | ❌ | ❌ | ❌ | 3 |
| M13 | Project config file (alexi.json) | ✅ | ✅ | ✅ | ⚠️ | 4 |
| M14 | Background/parallel subagents | ✅ | ❌ | ✅ | ❌ | 5 |
| M15 | PR creation from issues | ✅ | ❌ | ❌ | ❌ | 6 |
| M16 | MCP resources support | ✅ | ✅ | ❌ | ❌ | 5 |

### Features Where Alexi Is AHEAD

| Feature | Description |
|---------|-------------|
| Diagnostics tool | Code diagnostics (errors, warnings, hints) — no competitor |
| Batch parallel tool | Multiple tool calls in one invocation — unique |
| Typed memory (store/recall) | Episodic/semantic/procedural — most sophisticated |
| Permission drain | Auto-resolve from sibling subagent approvals |
| Doom loop detection | Prevent infinite permission request loops |
| Cost tracking | Per-model pricing, usage records, daily summaries |
| Alexi as MCP server | Bidirectional MCP — unique |
| Session close extraction | Auto-extract decisions/procedures to memory |
| DDD workflow/stages | 6-stage workflow with artifacts and DoD checks |
| AI notes generation | AI_NOTES.md with changes, rationale, risks |
| Multi-edit tool | Multiple edits per file per call |

---

## Phase 1: Agent Extensibility (v0.4.x) — 2–3 weeks

### Scope: H1 + H5 + H6 + M2

### 1.1 Custom Agents via Markdown + JSON

**Goal**: Users define agents in `.alexi/agents/*.md` (project) and `~/.alexi/agents/*.md` (user).

**Markdown Format** (matching Claude Code / Kilo Code / OpenCode convention):
```markdown
---
# YAML frontmatter
name: "API Expert"
slug: api-expert
aliases: [api, backend]
mode: all              # primary | subagent | all
model: gpt-4o          # SAP AI Core deployment ID or alias
tools: [read, write, edit, glob, grep, bash]
temperature: 0.3
maxIterations: 30
permission:
  read: allow
  write: ask
  execute: ask
  bash:
    "npm *": allow
    "git *": allow
    "rm *": deny
---

You are an API development expert specializing in REST and GraphQL...
```

**JSON Format** (in `alexi.json` or `~/.alexi/config.json`):
```json
{
  "agents": {
    "api-expert": {
      "name": "API Expert",
      "mode": "all",
      "model": "gpt-4o",
      "tools": ["read", "write", "edit", "glob", "grep", "bash"],
      "temperature": 0.3,
      "prompt": "You are an API development expert..."
    }
  }
}
```

**Implementation**:
- New file: `src/agent/customAgents.ts` — loader for `.alexi/agents/` and `~/.alexi/agents/`
- Modify: `src/agent/index.ts` — merge custom agents into agent registry
- Config precedence: built-in < user-global < project-local < project-markdown
- Markdown files parsed with `gray-matter` (or lightweight YAML frontmatter parser)

### 1.2 Per-Agent Model Override

**Goal**: Each agent can specify a preferred SAP AI Core model. Falls back to session default.

**Implementation**:
- Add `model?: string` to `AgentConfig` interface in `src/agent/index.ts`
- In `agenticChat()` / `streamChat()`, check `agent.model` before calling `routePrompt()`
- Model string maps to SAP AI Core deployment ID via existing `routingConfig.ts`

### 1.3 Per-Agent Permissions

**Goal**: Each agent has its own permission rules that override defaults.

**Implementation**:
- Add `permission?: PermissionConfig` to `AgentConfig`
- In `PermissionManager.evaluate()`, check agent-specific rules before global rules
- Format matches OpenCode/Kilo convention: tool → allow/ask/deny, plus bash glob patterns

### 1.4 `/init` Auto-Generate AGENTS.md

**Goal**: Scan codebase and generate starter AGENTS.md with project context.

**Implementation**:
- New command: `alexi init` (CLI) and `/init` (TUI slash command)
- Scans: `package.json`, `tsconfig.json`, `.eslintrc`, existing docs, directory structure
- Generates `AGENTS.md` with: build/test commands, code style, project structure, key conventions
- Interactive multi-phase flow: detect → propose → confirm → write
- Uses SAP AI Core to analyze codebase if `--ai` flag is passed

---

## Phase 2: Command & Tool Extensibility (v0.5.x) — 2–3 weeks

### Scope: H2 + H4 + M3 + M5

### 2.1 Custom Slash Commands (Markdown Files)

**Goal**: Users define slash commands in `.kilo/command/*.md` (project) and `~/.config/kilo/commands/*.md` (user). Already referenced in project config structure.

**Markdown Format**:
```markdown
---
description: Run the test suite and fix failures
handoffs:
  - label: Fix in Code mode
    agent: code
    prompt: Fix the failing tests
    send: true
---

Run `npm test` and report any failures. If tests fail, analyze the errors and suggest fixes.
```

**Implementation**:
- New file: `src/cli/customCommands.ts` — loader and registry
- Modify: `useCommands.ts` (TUI) and `handleCommand()` (REPL) — merge custom commands
- Command body becomes the user message sent to the current agent
- Handoffs trigger agent switch with pre-populated prompt

### 2.2 Custom Tools via TypeScript

**Goal**: Users define tools in `.alexi/tools/*.ts` (project) and `~/.alexi/tools/*.ts` (user).

**Format** (matching OpenCode convention):
```typescript
import { defineTool } from 'alexi/tool';
import { z } from 'zod';

export default defineTool({
  name: 'my-linter',
  description: 'Run custom linter on a file',
  parameters: z.object({
    filePath: z.string().describe('Path to lint'),
  }),
  execute: async ({ filePath }, context) => {
    const result = await context.bash(`my-lint ${filePath}`);
    return { success: true, data: result };
  },
});
```

**Implementation**:
- New file: `src/tool/customTools.ts` — loader using dynamic `import()`
- Tools registered alongside built-in tools in tool registry
- Sandboxed: custom tools inherit permission system, event bus integration
- Can override built-in tools by name (with warning)

### 2.3 Patch/Diff Tool

**Goal**: Apply unified diff patches to files. Alternative to `edit` for larger changes.

**Implementation**:
- New file: `src/tool/tools/patch.ts`
- Accept unified diff format (output of `git diff`)
- Parse with `diff` package (already in devDependencies) or simple parser
- Apply hunks with context matching and offset tolerance

### 2.4 External Editor (/editor)

**Goal**: Open `$EDITOR` for composing long prompts.

**Implementation**:
- New slash command: `/editor` — opens temp file in `$EDITOR`, waits for close, sends content
- Uses `child_process.spawnSync` with `stdio: 'inherit'`
- Works in both REPL and TUI modes

---

## Phase 3: Hooks & Guardrails (v0.6.x) — 3–4 weeks

### Scope: H3 + M1 + M12

### 3.1 Hooks System

**Goal**: Lifecycle hooks that fire shell commands at key events.

**Events (Phase 1 — 6 core events)**:
| Event | When | Can Block? |
|-------|------|-----------|
| `SessionStart` | New session begins | No |
| `SessionEnd` | Session closes | No |
| `PreToolUse` | Before any tool executes | Yes (allow/deny/block) |
| `PostToolUse` | After tool completes | No |
| `UserPromptSubmit` | User sends a message | Yes (modify/block) |
| `Stop` | Agent signals completion | No |

**Configuration** (in `alexi.json` or `.alexi/hooks.json`):
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "toolName": "bash" },
        "command": ".alexi/hooks/validate-bash.sh",
        "type": "command",
        "blocking": true
      }
    ],
    "SessionStart": [
      {
        "command": ".alexi/hooks/setup-env.sh",
        "type": "command",
        "blocking": false
      }
    ]
  }
}
```

**Implementation**:
- New directory: `src/hooks/`
  - `src/hooks/index.ts` — hook registry, loader, executor
  - `src/hooks/types.ts` — event types, hook config interfaces
  - `src/hooks/runner.ts` — shell command executor with timeout, env, exit code semantics
- Integration: hook into existing event bus (`src/bus/`)
- Exit code semantics: 0 = proceed, 2 = block, other = warn
- Hook receives JSON on stdin: `{ event, toolName, arguments, sessionId, ... }`
- Hook can output JSON to stdout to modify tool arguments (PreToolUse only)

### 3.2 Path-Scoped Rules

**Goal**: Rules in `.alexi/rules/` that only load when agent works with matching files.

**Format**:
```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/routes/**"
---

When working with API routes, always use Zod validation...
```

**Implementation**:
- Modify: `src/agent/system.ts` → `loadInstructionFiles()`
- Parse YAML frontmatter `paths` field from rule files
- Track current working files (from tool calls) and load matching rules on demand

### 3.3 Auto Mode (AI Permission Classification)

**Goal**: AI classifier evaluates tool calls against configurable allow/deny rules.

**Implementation**:
- New file: `src/permission/autoMode.ts`
- Uses a cheap/fast SAP AI Core model (e.g., gpt-4o-mini) to classify risk
- Configurable rules: `"allow": ["read *", "write src/**"]`, `"soft_deny": ["bash rm *"]`
- Fallback to manual approval on classification uncertainty
- Toggle: `--auto` flag or `/auto` command

---

## Phase 4: CLI & Infrastructure (v0.7.x) — 2–3 weeks

### Scope: M6 + M8 + M9 + M11 + M13

### 4.1 Budget/Cost Controls

- `--max-budget-usd <amount>` flag on `agent` and `chat` commands
- `--max-turns <n>` flag (alternative to effort level granularity)
- Integration with existing `costTracker.ts`
- Abort gracefully when budget exceeded

### 4.2 Stdin Piping

- `cat file.ts | alexi chat -p "explain this"` reads from stdin
- Detects piped input (`!process.stdin.isTTY`)
- Prepends stdin content to the user message

### 4.3 Structured Output (--json-schema)

- `--json-schema <schema-file>` flag on `chat` command
- Validates LLM output against JSON Schema
- Retries on validation failure (up to 3 attempts)
- Uses SAP AI Core response format parameter if supported

### 4.4 MCP Server Management CLI

- `alexi mcp list` — show configured servers and status
- `alexi mcp add <name> --command <cmd>` — add stdio server
- `alexi mcp remove <name>` — remove server
- `alexi mcp test <name>` — test connection

### 4.5 Project Config File (alexi.json)

- Unified project config at `alexi.json` (project root)
- Contains: agents, commands, hooks, MCP servers, permissions, model routing
- Merges with `~/.alexi/config.json` (user-level defaults)
- JSON Schema for editor autocomplete

---

## Phase 5: Advanced Features (v0.8.x) — 4–6 weeks

### Scope: M4 + M10 + M14 + M16

### 5.1 MCP HTTP Transport
- Add HTTP/HTTPS transport to `src/mcp/client.ts`
- Support for remote MCP servers
- Optional OAuth 2.0 if needed

### 5.2 MCP Resources
- Implement MCP resource protocol in client
- `@server:resource` mention syntax
- Resource content injected into context

### 5.3 LSP Integration (Experimental)
- New tool: `lsp` — goToDefinition, findReferences, hover, documentSymbol
- Auto-detect and spawn language servers
- Start with TypeScript (ts-server) and Python (pyright)

### 5.4 Background/Parallel Subagents
- `task` tool supports `background: true` option
- Parallel execution with result collection
- Permission propagation from parent agent

---

## Phase 6: Server & Integration (v0.9.x) — 4–6 weeks

### Scope: M7 + M15 + L17

### 6.1 Headless Server Mode
- `alexi serve [--port 3000]` — starts HTTP/WebSocket server
- API endpoints: `/chat`, `/agent`, `/sessions`, `/tools`
- `alexi attach <url>` — connect TUI to remote server
- Enables: web UI, mobile access, CI/CD integration

### 6.2 PR Creation from Issues
- `alexi github install` — set up GitHub App
- @alexi mention in issues triggers PR creation
- Uses existing agent infrastructure in CI

### 6.3 JSON Schema for Config
- Publish `alexi-config.schema.json`
- `"$schema"` support in `alexi.json`
- Editor autocomplete for all config options

---

## Project Structure

### Documentation

```text
specs/008-competitive-parity/
├── plan.md              # This file
├── research.md          # Gap analysis + decisions
├── data-model.md        # Entity definitions for new features
├── contracts/           # API contracts for custom agents/tools/hooks
└── tasks.md             # Implementation tasks (created by /speckit.tasks)
```

### Source Code (new files per phase)

```text
# Phase 1: Agent Extensibility
src/agent/customAgents.ts        # Custom agent loader
src/agent/agentConfig.ts         # AgentConfig types + validation
tests/agent/customAgents.test.ts

# Phase 2: Command & Tool Extensibility
src/cli/customCommands.ts        # Custom command loader
src/tool/customTools.ts          # Custom tool loader
src/tool/tools/patch.ts          # Unified diff tool
tests/cli/customCommands.test.ts
tests/tool/customTools.test.ts
tests/tool/tools/patch.test.ts

# Phase 3: Hooks & Guardrails
src/hooks/index.ts               # Hook registry + executor
src/hooks/types.ts               # Event types + config
src/hooks/runner.ts              # Shell command runner
src/permission/autoMode.ts       # AI permission classifier
tests/hooks/hooks.test.ts
tests/permission/autoMode.test.ts

# Phase 4: CLI & Infrastructure
src/cli/commands/mcp.ts          # MCP CLI commands
src/config/projectConfig.ts      # alexi.json loader
tests/cli/commands/mcp.test.ts

# Phase 5: Advanced
src/mcp/http.ts                  # HTTP transport
src/mcp/resources.ts             # MCP resources
src/tool/tools/lsp.ts            # LSP tool
tests/mcp/http.test.ts

# Phase 6: Server
src/server/                      # HTTP/WS server
src/server/index.ts
src/server/routes.ts
tests/server/server.test.ts
```

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Hooks system (Phase 3) adds event lifecycle complexity | Claude Code's most differentiating feature. Enables CI/CD guardrails, custom security policies, workflow automation. All enterprise users need this. | Simple event logging (rejected: no blocking/decision capability). Hardcoded guardrails (rejected: not extensible). |
| Custom tools (Phase 2) allow arbitrary code execution | OpenCode proves user demand. Essential for domain-specific workflows (e.g., SAP-specific tools). | MCP-only extensibility (rejected: too heavy for simple tools, requires separate server process). |
| Headless server (Phase 6) adds HTTP server dependency | Both Kilo and OpenCode have it. Enables web UI, remote control, multi-client access. | CLI-only forever (rejected: limits adoption for teams, web-based workflows, mobile access). |

---

## Timeline Summary

| Phase | Version | Duration | Key Deliverables |
|-------|---------|----------|------------------|
| 1 | v0.4.x | 2–3 weeks | Custom agents, /init, per-agent model + permissions |
| 2 | v0.5.x | 2–3 weeks | Custom commands, custom tools, patch tool, /editor |
| 3 | v0.6.x | 3–4 weeks | Hooks (6 events), path-scoped rules, auto mode |
| 4 | v0.7.x | 2–3 weeks | Budget controls, stdin piping, structured output, MCP CLI, alexi.json |
| 5 | v0.8.x | 4–6 weeks | MCP HTTP, MCP resources, LSP, parallel subagents |
| 6 | v0.9.x | 4–6 weeks | Server mode, GitHub issue→PR, JSON Schema config |
| **Total** | **v0.4–0.9** | **~17–24 weeks** | **35 feature gaps closed** |

---

## Next Steps

1. Create individual specs for Phase 1 features (008a-custom-agents, 008b-init-command)
2. Break Phase 1 into tasks via `/speckit.tasks`
3. Begin implementation on branch `008a-custom-agents`
