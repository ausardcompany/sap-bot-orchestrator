# Tasks: Competitive Feature Parity

**Input**: `.kilo/plans/008-competitive-parity.md` + codebase exploration
**Prerequisites**: plan.md (complete), codebase analysis (complete)

**Tests**: Required per Constitution Principle V (Test Discipline). Each new public function/class needs unit tests.

**Organization**: Tasks grouped by phase (= user story). Each phase is independently shippable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Phase/story this task belongs to (PH1, PH2, PH3, PH4, PH5, PH6)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependencies and shared types needed by all phases

- [ ] T001 Add `gray-matter` dependency for YAML frontmatter parsing in Markdown agent/command/tool files (`npm install gray-matter && npm install -D @types/gray-matter`)
- [ ] T002 Create `src/config/projectConfig.ts` — unified `alexi.json` loader with Zod schema for project-level config (agents, commands, hooks, permissions, MCP servers). Merge with `~/.alexi/config.json`. Search paths: `./alexi.json` > `./config/alexi.json`
- [ ] T003 [P] Create `src/config/projectConfig.test.ts` — tests for project config loading, merging, validation, missing file handling

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure changes that enable all subsequent phases

**CRITICAL**: No phase-specific work can begin until these are complete

- [ ] T004 Extend `AgentConfig` Zod schema in `src/agent/index.ts` — add fields: `source: 'built-in' | 'user' | 'project'`, `sourcePath?: string`, `hidden?: boolean`, `color?: string`, `maxIterations?: number` (lines 15-30)
- [ ] T005 Extend `AgentRegistry` in `src/agent/index.ts` — add `registerCustom(config: AgentConfig)` method that merges custom agents with precedence: built-in < user-global < project-local < project-markdown. Add `listCustom()` to list only non-built-in agents
- [ ] T006 [P] Update `AgentName` type union in `src/cli/tui/context/SessionContext.tsx` (line 12) — change from string literal union to `string` type to support dynamic custom agent IDs. Update `AGENTS` array to be dynamically populated from agent registry
- [ ] T007 [P] Update `AVAILABLE_AGENTS` array in `src/cli/tui/hooks/useCommands.ts` (line 48) — change from hardcoded list to dynamic query of `getAgentRegistry().list()`. Update `AGENT_DESCRIPTIONS` to pull from agent configs
- [ ] T008 Wire agent tool restrictions into `agenticChat()` in `src/core/agenticChat.ts` (line 252-257) — if `options.agentId` is provided, use `agent.canUseTool()` to filter `enabledTools` automatically instead of requiring the caller to pass them
- [ ] T009 Wire agent `preferredModel` into model selection in `src/core/agenticChat.ts` (line 234-246) — if `agent.preferredModel` is set and no `modelOverride`, use it before auto-route
- [ ] T010 [P] Create tests for extended AgentConfig, AgentRegistry custom agent methods, and model/tool wiring in `tests/agent/customAgents.test.ts`

**Checkpoint**: Agent system is extensible — custom agents can be registered at runtime, tool/model/permission settings are wired through

---

## Phase 3: User Story 1 — Custom Agents (Priority: P1) MVP

**Goal**: Users define agents in `.alexi/agents/*.md` (project) and `~/.alexi/agents/*.md` (user), and in `alexi.json` config

**Independent Test**: Create `.alexi/agents/test-agent.md` with frontmatter, start Alexi, verify `@test-agent` switching works, `/agent` shows it, and tool restrictions apply

### Tests for PH1

- [ ] T011 [P] [PH1] Create `tests/agent/customAgentLoader.test.ts` — tests for: loading `.md` files with YAML frontmatter, loading JSON config agents, precedence (built-in < user < project), invalid frontmatter handling, duplicate ID resolution, missing fields defaults

### Implementation for PH1

- [ ] T012 [PH1] Create `src/agent/customAgentLoader.ts` — loader that: scans `~/.alexi/agents/*.md` and `.alexi/agents/*.md`, parses YAML frontmatter with `gray-matter`, validates via `AgentSchema`, converts Markdown body to `systemPrompt`, also loads `agents` key from `alexi.json` via `projectConfig.ts`. Returns `AgentConfig[]` with source tracking
- [ ] T013 [PH1] Integrate custom agent loader into `AgentRegistry` initialization in `src/agent/index.ts` — call `loadCustomAgents(workdir)` after registering built-in agents. Handle errors gracefully (warn, skip invalid agents)
- [ ] T014 [PH1] Update `AGENT_PROMPTS` map in `src/agent/system.ts` (lines 48-55) — for custom agents, load `systemPrompt` from `AgentConfig` at build time instead of from `prompts/*.txt` files. Add fallback: if `agentId` not in `AGENT_PROMPTS`, check registry for custom agent prompt
- [ ] T015 [PH1] Update `src/cli/tui/dialogs/AgentSelector.tsx` — populate agent list dynamically from `getAgentRegistry().list()` instead of hardcoded. Show custom agents with `[custom]` badge
- [ ] T016 [PH1] Update `@syntax` in `parseAndSwitch()` in `src/agent/index.ts` (line 196) — already works dynamically via registry lookup, verify custom agents are found by ID and alias
- [ ] T017 [PH1] Add `/agent list` sub-command to REPL `handleCommand()` in `src/cli/interactive.ts` (line 617) — show all agents including custom ones with source indicator
- [ ] T018 [PH1] Add `agent` command improvements to TUI `buildCommands()` in `src/cli/tui/hooks/useCommands.ts` — show custom agents in the AgentSelector dialog with descriptions from config

**Checkpoint**: Custom agents work end-to-end — define in `.alexi/agents/`, switch with `@`, use restricted tools, use preferred model

---

## Phase 4: User Story 2 — Per-Agent Permissions (Priority: P1)

**Goal**: Each agent has its own permission rules that override defaults

**Independent Test**: Define a `readonly-agent.md` with `permission.write: deny`, switch to it, verify write operations are denied without asking

### Tests for PH1-Permissions

- [ ] T019 [P] [PH1] Create `tests/permission/agentPermissions.test.ts` — tests for: agent-specific rules override defaults, bash glob patterns per agent, multiple agents with different permissions, fallback to global rules when agent has no override

### Implementation for PH1-Permissions

- [ ] T020 [PH1] Add `permission` field to `AgentSchema` in `src/agent/index.ts` — Zod schema for per-agent permissions: `{ read?: 'allow'|'ask'|'deny', write?: ..., execute?: ..., bash?: Record<string, 'allow'|'ask'|'deny'> }`
- [ ] T021 [PH1] Extend `PermissionContext` in `src/permission/index.ts` (line 93) — add `agentId?: string` field
- [ ] T022 [PH1] Extend `PermissionManager.evaluate()` in `src/permission/index.ts` (line 418) — before evaluating global rules, check if current agent has specific rules for this action. If so, return agent rule decision
- [ ] T023 [PH1] Wire `agentId` through tool execution chain: `ToolContext` → `defineTool.execute()` → `PermissionManager.check()`. Add `agentId?: string` to `ToolContext` in `src/tool/index.ts` (line 17)
- [ ] T024 [PH1] Pass `agentId` from `agenticChat()` into `ToolContext` when executing tools in `src/core/agenticChat.ts`

**Checkpoint**: Agents have isolated permissions — a `readonly` agent can't write, a `full-access` agent can

---

## Phase 5: User Story 3 — `/init` Auto-Generate AGENTS.md (Priority: P1)

**Goal**: `alexi init` scans codebase and generates starter AGENTS.md with build commands, style, structure

**Independent Test**: Run `alexi init` in a fresh TypeScript project, verify AGENTS.md is created with correct package manager, test commands, and project structure

### Tests for PH1-Init

- [ ] T025 [P] [PH1] Create `tests/cli/commands/init.test.ts` — tests for: project analysis (detects TS, package.json, test framework), AGENTS.md generation format, non-destructive (doesn't overwrite existing), --force flag, .alexi/ directory creation

### Implementation for PH1-Init

- [ ] T026 [PH1] Create `src/cli/commands/init.ts` — `registerInitCommand(program)` with options: `--force` (overwrite), `--ai` (use LLM to analyze), `--skip-agents-md` (only create `.alexi/` directory). Calls `initProject()` from existing `src/init/index.ts`
- [ ] T027 [PH1] Register init command in `src/cli/commands/index.ts` — add `registerInitCommand(program)` to `registerAllCommands()`
- [ ] T028 [PH1] Add `/init` slash command to REPL in `src/cli/interactive.ts` — add `case 'init'` to `handleCommand()` switch, call same `initProject()` logic
- [ ] T029 [PH1] Add `/init` slash command to TUI in `src/cli/tui/hooks/useCommands.ts` — add to `buildCommands()` array with `category: 'config'`
- [ ] T030 [PH1] Enhance `initProject()` in `src/init/index.ts` — ensure it generates AGENTS.md with: build/test commands from `package.json` scripts, detected framework/language, project structure tree, code style from `.eslintrc`/`.prettierrc`, import conventions

**Checkpoint**: `alexi init` generates a useful AGENTS.md that improves agent behavior for the project

---

## Phase 6: User Story 4 — Custom Slash Commands (Priority: P2)

**Goal**: Users define slash commands in `.kilo/command/*.md` and `~/.config/kilo/commands/*.md`

**Independent Test**: Create `.kilo/command/test-cmd.md`, start Alexi, run `/test-cmd`, verify command body is sent as user message

### Tests for PH2

- [ ] T031 [P] [PH2] Create `tests/cli/customCommands.test.ts` — tests for: loading `.md` command files, frontmatter parsing (description, handoffs), command body as prompt, handoff agent switching, command name from filename, duplicate name handling

### Implementation for PH2

- [ ] T032 [PH2] Create `src/cli/customCommands.ts` — loader that: scans `.kilo/command/*.md` and `~/.config/kilo/commands/*.md`, parses YAML frontmatter (description, handoffs array), body becomes prompt template. Returns `CustomCommand[]`
- [ ] T033 [PH2] Integrate custom commands into REPL dispatch in `src/cli/interactive.ts` — before `default:` case in `handleCommand()`, check if `cmd` matches a loaded custom command. If so, send body as user message (with optional agent handoff)
- [ ] T034 [PH2] Integrate custom commands into TUI dispatch in `src/cli/tui/hooks/useCommands.ts` — merge loaded custom commands into `buildCommands()` result array with `category: 'custom'`
- [ ] T035 [PH2] Add custom commands to `/help` output in both REPL and TUI — show under "Custom Commands" section with description from frontmatter

**Checkpoint**: Custom commands work — define `.md` file, run as slash command, body sends as prompt

---

## Phase 7: User Story 5 — Custom Tools via TypeScript (Priority: P2)

**Goal**: Users define tools in `.alexi/tools/*.ts` and `~/.alexi/tools/*.ts`

**Independent Test**: Create `.alexi/tools/hello.ts` exporting a `defineTool()`, start Alexi, verify tool appears in tool list and agent can call it

### Tests for PH2

- [ ] T036 [P] [PH2] Create `tests/tool/customTools.test.ts` — tests for: loading `.ts` tool files via dynamic import, Zod validation of tool params, permission integration, tool override (custom overrides built-in by name with warning), error handling for malformed tools

### Implementation for PH2

- [ ] T037 [PH2] Create `src/tool/customTools.ts` — loader that: scans `.alexi/tools/*.ts` and `~/.alexi/tools/*.ts`, uses `import()` to dynamically load each, validates default export is a `Tool` object (has name, description, parameters, execute), registers into `ToolRegistry`
- [ ] T038 [PH2] Integrate custom tool loader into startup sequence — call `loadCustomTools(workdir)` during initialization, before any agent chat begins. Handle import errors gracefully (warn, skip)
- [ ] T039 [PH2] Export `defineTool` and `ToolContext` types from a stable public API path — create `src/tool/public.ts` or ensure `src/tool/index.ts` exports are usable from custom tool files

**Checkpoint**: Custom tools work — define `.ts` file, tool appears in agent's toolbox, can be called

---

## Phase 8: User Story 6 — Patch/Diff Tool + External Editor (Priority: P2)

**Goal**: Apply unified diffs to files; compose long prompts in $EDITOR

**Independent Test**: Agent generates a unified diff, calls patch tool, file is correctly modified. User runs `/editor`, types prompt in vim, submits

### Tests for PH2-Extras

- [ ] T040 [P] [PH2] Create `tests/tool/tools/patch.test.ts` — tests for: apply single hunk, apply multi-hunk, context matching with offset, reject on failed match, create file from diff, handle binary files gracefully

### Implementation for PH2-Extras

- [ ] T041 [PH2] Create `src/tool/tools/patch.ts` — tool that accepts `{ filePath: string, diff: string }`, parses unified diff format, applies hunks to file with context matching. Uses `diff` package or custom parser
- [ ] T042 [PH2] Register patch tool in tool registry — import and register in the tool initialization sequence
- [ ] T043 [PH2] Add `/editor` slash command to REPL in `src/cli/interactive.ts` — open temp file in `$EDITOR` (pattern from `/memory edit` at line 1232), read content after close, send as user message
- [ ] T044 [PH2] Add `/editor` slash command to TUI in `src/cli/tui/hooks/useCommands.ts` — same logic, with `category: 'general'`

**Checkpoint**: Patch tool applies diffs; /editor enables long prompt composition

---

## Phase 9: User Story 7 — Hooks System (Priority: P2)

**Goal**: Lifecycle hooks (shell commands) fire at key events: PreToolUse, PostToolUse, SessionStart, SessionEnd, UserPromptSubmit, Stop

**Independent Test**: Create `.alexi/hooks/validate-bash.sh` that blocks `rm -rf`, configure `PreToolUse` hook for `bash` tool, verify `rm -rf` is blocked

### Tests for PH3

- [ ] T045 [P] [PH3] Create `tests/hooks/hooks.test.ts` — tests for: hook config loading from `alexi.json`, hook matching (tool name patterns, regex), shell command execution with JSON stdin, exit code semantics (0=proceed, 2=block), timeout handling, PreToolUse blocking, PostToolUse non-blocking, environment variable passing

### Implementation for PH3

- [ ] T046 [PH3] Create `src/hooks/types.ts` — interfaces: `HookEvent` (enum of 6 events), `HookConfig` (matcher, command, type, blocking, timeout), `HookResult` (allow/deny/warn, stdout, exitCode), `HookContext` (event, toolName, args, sessionId, agentId)
- [ ] T047 [PH3] Create `src/hooks/runner.ts` — `runHook(hookConfig, context)`: spawns shell command with `child_process.execFile`, passes `HookContext` as JSON on stdin, reads stdout/stderr, interprets exit code (0=proceed, 2=block, other=warn). Configurable timeout (default 30s)
- [ ] T048 [PH3] Create `src/hooks/index.ts` — `HookRegistry`: loads hooks from `alexi.json` hooks key, matches hooks to events using tool name/agent glob patterns, executes matched hooks in order, aggregates results (any block = block)
- [ ] T049 [PH3] Integrate hooks with event bus in `src/bus/index.ts` — define new events: `HookTriggered`, `HookCompleted`, `HookFailed`
- [ ] T050 [PH3] Wire `PreToolUse` hook into `defineTool()` in `src/tool/index.ts` — before `execute()` is called, run `HookRegistry.fire('PreToolUse', context)`. If any hook blocks, return `{ success: false, error: 'Blocked by hook' }`
- [ ] T051 [PH3] Wire `PostToolUse` hook into `defineTool()` in `src/tool/index.ts` — after `execute()` completes, fire `HookRegistry.fire('PostToolUse', context)` asynchronously (non-blocking)
- [ ] T052 [PH3] Wire `SessionStart` and `SessionEnd` hooks into `src/core/agenticChat.ts` and session lifecycle
- [ ] T053 [PH3] Wire `UserPromptSubmit` hook into chat entry points — before sending user message to LLM, fire hook. If blocked, show warning and don't send
- [ ] T054 [PH3] Wire `Stop` hook into agent completion — fire when agent signals task completion
- [ ] T055 [PH3] Add `/hooks` command to REPL and TUI — list all configured hooks with source, event, matcher, command

**Checkpoint**: Hooks fire at lifecycle events, can block dangerous operations, provide extensibility

---

## Phase 10: User Story 8 — Path-Scoped Rules + Auto Mode (Priority: P2)

**Goal**: Rules load only for matching files; AI classifier auto-approves safe operations

**Independent Test**: Create `.alexi/rules/api.md` with `paths: ["src/api/**"]`, verify rules only load when agent reads files in `src/api/`

### Tests for PH3-Extras

- [ ] T056 [P] [PH3] Create `tests/agent/pathScopedRules.test.ts` — tests for: frontmatter `paths` field parsing, glob matching against current files, lazy loading/unloading as file context changes, multiple rules with overlapping paths
- [ ] T057 [P] [PH3] Create `tests/permission/autoMode.test.ts` — tests for: rule matching (allow/soft_deny patterns), LLM classification mocking, fallback to manual on uncertainty, toggle on/off

### Implementation for PH3-Extras

- [ ] T058 [PH3] Modify `loadInstructionFiles()` in `src/agent/system.ts` (line 145) — parse YAML frontmatter from `.alexi/rules/*.md` files. If `paths` field exists, store rule with patterns. Only include in prompt assembly when current working files match any pattern
- [ ] T059 [PH3] Track "current working files" — in `agenticChat()`, maintain a set of files the agent has read/written (from tool call arguments). Pass to `buildAssembledSystemPrompt()` for path-scoped rule matching
- [ ] T060 [PH3] Create `src/permission/autoMode.ts` — `AutoPermissionClassifier`: takes configurable rules (`allow: ["read *", "write src/**"]`, `soft_deny: ["bash rm *"]`), classifies tool calls. For uncertain cases, uses a cheap SAP AI Core model (gpt-4o-mini) to evaluate risk
- [ ] T061 [PH3] Add `--auto` flag to `agent` command in `src/cli/commands/agent.ts` — enables auto mode for the session
- [ ] T062 [PH3] Add `/auto` toggle command to REPL and TUI — enables/disables auto mode mid-session

**Checkpoint**: Rules load contextually; auto mode reduces permission prompts for safe operations

---

## Phase 11: User Story 9 — CLI Infrastructure (Priority: P3)

**Goal**: Budget controls, stdin piping, structured output, MCP CLI, project config

**Independent Test**: Run `alexi chat -p "hello" --max-budget-usd 0.001` and verify it aborts when budget is exceeded. Run `echo "explain this" | alexi chat -p "analyze"` and verify stdin is included

### Tests for PH4

- [ ] T063 [P] [PH4] Create `tests/cli/budgetControls.test.ts` — tests for: budget tracking integration, abort on budget exceeded, --max-turns enforcement, graceful shutdown message
- [ ] T064 [P] [PH4] Create `tests/cli/stdinPiping.test.ts` — tests for: piped input detection, content prepending to message, non-TTY handling

### Implementation for PH4

- [ ] T065 [PH4] Add `--max-budget-usd <amount>` and `--max-turns <n>` flags to `chat` and `agent` commands in `src/cli/commands/chat.ts` and `src/cli/commands/agent.ts`. Integrate with `costTracker.ts` — check after each iteration
- [ ] T066 [PH4] Add stdin piping support — in `src/cli/commands/chat.ts`, detect `!process.stdin.isTTY`, read stdin content, prepend to `--message` with `\n---\nUser provided content:\n{stdin}\n---\n`
- [ ] T067 [PH4] Add `--json-schema <path>` flag to `chat` command — load JSON Schema from file, instruct LLM to produce valid JSON, validate response, retry up to 3 times on validation failure
- [ ] T068 [PH4] Create `src/cli/commands/mcp.ts` — `registerMcpCommand(program)` with sub-commands: `list`, `add <name> --command <cmd> [--args ...]`, `remove <name>`, `test <name>`, `toggle <name>`. Uses existing `src/mcp/config.ts` CRUD functions
- [ ] T069 [PH4] Register MCP command in `src/cli/commands/index.ts` — add `registerMcpCommand(program)` to `registerAllCommands()`

**Checkpoint**: CLI has budget controls, Unix composability (piping), structured output, MCP management

---

## Phase 12: User Story 10 — Advanced MCP + LSP + Parallel Subagents (Priority: P3)

**Goal**: MCP HTTP transport, MCP resources, LSP tool, background subagents

**Independent Test**: Connect to a remote MCP server via HTTP. Use LSP tool for goToDefinition on a TypeScript function. Run two subagents in parallel

### Implementation for PH5

- [ ] T070 [PH5] Add HTTP transport to `src/mcp/client.ts` — support `transport: 'http'` in `McpServerConfig`. Use `fetch()` for request/response, handle streaming with SSE fallback
- [ ] T071 [PH5] Implement MCP resources in `src/mcp/resources.ts` — resource listing, reading, `@server:resource` mention syntax parsing, content injection into context
- [ ] T072 [PH5] Create `src/tool/tools/lsp.ts` — LSP tool with actions: `goToDefinition`, `findReferences`, `hover`, `documentSymbol`. Auto-detect and spawn TypeScript language server (`typescript-language-server`) via stdio
- [ ] T073 [PH5] Implement background subagents in `src/tool/tools/task.ts` — add `background: boolean` parameter. When true, spawn subagent in separate async context, return immediately with `taskId`. Add `task_result` tool to poll/collect results
- [ ] T074 [P] [PH5] Create tests for MCP HTTP, MCP resources, LSP tool, and background subagents

**Checkpoint**: Advanced features: remote MCP, code intelligence, parallel agents

---

## Phase 13: User Story 11 — Server Mode + GitHub Integration (Priority: P3)

**Goal**: `alexi serve` headless server; PR creation from issues

### Implementation for PH6

- [ ] T075 [PH6] Create `src/server/index.ts` — HTTP server using Node.js `http` module + `ws` for WebSocket. Endpoints: `POST /chat`, `POST /agent`, `GET /sessions`, `GET /tools`. Bearer token auth via env var
- [ ] T076 [PH6] Create `src/server/routes.ts` — route handlers that call existing `sendChat()`, `agenticChat()`, session CRUD. Stream responses via SSE or WebSocket
- [ ] T077 [PH6] Create `src/cli/commands/serve.ts` — `registerServeCommand(program)` with options: `--port <n>`, `--host <host>`, `--auth-token <token>`
- [ ] T078 [PH6] Create `src/cli/commands/attach.ts` — `registerAttachCommand(program)` — connect TUI to remote server via WebSocket
- [ ] T079 [PH6] Create GitHub issue→PR workflow — `alexi github install` sets up GitHub App, `.github/workflows/alexi-issue-handler.yml` template that triggers on `@alexi` mention in issues
- [ ] T080 [PH6] Create `alexi-config.schema.json` — JSON Schema for `alexi.json` with all config options. Add `"$schema"` support in config loader
- [ ] T081 [P] [PH6] Create tests for server endpoints, WebSocket streaming, and GitHub integration

**Checkpoint**: Server mode enables remote access; GitHub integration creates PRs from issues

---

## Phase 14: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple phases

- [ ] T082 [P] Update AGENTS.md with new features: custom agents, custom commands, custom tools, hooks, /init, /editor, MCP CLI
- [ ] T083 [P] Update `src/cli/tui/hooks/useCommands.ts` — add help text for all new slash commands (/init, /editor, /auto, /hooks)
- [ ] T084 Run `npm run lint:fix && npm run format` across all new files
- [ ] T085 Run `npm test` — ensure all tests pass including new ones
- [ ] T086 Run `npm run typecheck` — ensure zero TypeScript errors
- [ ] T087 Version bump to v0.4.0 for Phase 1 release

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **PH1: Custom Agents (Phase 3-5)**: Depends on Foundational — MVP release target
- **PH2: Commands & Tools (Phase 6-8)**: Depends on Foundational — can run in parallel with PH1
- **PH3: Hooks & Guardrails (Phase 9-10)**: Depends on Foundational — can run in parallel
- **PH4: CLI Infrastructure (Phase 11)**: Depends on PH1 (for alexi.json) — sequential after Phase 1
- **PH5: Advanced (Phase 12)**: Depends on PH1 + PH2 — sequential
- **PH6: Server (Phase 13)**: Depends on PH4 — sequential
- **Polish (Phase 14)**: Depends on all desired phases being complete

### User Story Dependencies

- **PH1 (Custom Agents)**: Foundational only — NO cross-story deps. MVP target.
- **PH2 (Commands + Tools)**: Foundational only — parallel with PH1
- **PH3 (Hooks)**: Foundational only — parallel with PH1/PH2
- **PH4 (CLI)**: Needs PH1 for `alexi.json` config infrastructure
- **PH5 (Advanced)**: Needs PH1 (agent system) + PH2 (tool system)
- **PH6 (Server)**: Needs PH4 (CLI infrastructure)

### Within Each Phase

- Tests MUST be written and FAIL before implementation
- Types/interfaces before logic
- Core logic before integration (registration, wiring)
- Integration before polish

### Parallel Opportunities

- T002/T003 (config) can run parallel with T004-T007 (agent system)
- All test tasks marked [P] can run in parallel within a phase
- PH1, PH2, PH3 can all begin after Foundational — parallel tracks
- T040/T041 (patch tool) parallel with T043/T044 (/editor)

---

## Implementation Strategy

### MVP First (Phase 1 Only — Custom Agents)

1. Complete Setup (T001-T003)
2. Complete Foundational (T004-T010) — CRITICAL
3. Complete PH1: Custom Agents (T011-T018)
4. Complete PH1: Per-Agent Permissions (T019-T024)
5. Complete PH1: /init Command (T025-T030)
6. **STOP and VALIDATE**: Test custom agents end-to-end
7. Release as v0.4.0

### Incremental Delivery

1. v0.4.0 — Custom agents + permissions + /init (PH1)
2. v0.5.0 — Custom commands + tools + patch + /editor (PH2)
3. v0.6.0 — Hooks + path-scoped rules + auto mode (PH3)
4. v0.7.0 — Budget controls + piping + MCP CLI + alexi.json (PH4)
5. v0.8.0 — MCP HTTP + LSP + parallel subagents (PH5)
6. v0.9.0 — Server mode + GitHub integration (PH6)

---

## Summary

| Phase | Tasks | Key Deliverables |
|-------|-------|------------------|
| Setup | 3 (T001-T003) | gray-matter dep, project config |
| Foundational | 7 (T004-T010) | Extended agent types, wiring |
| PH1: Custom Agents | 8 (T011-T018) | Custom agents from .md + .json |
| PH1: Permissions | 6 (T019-T024) | Per-agent permission rules |
| PH1: /init | 6 (T025-T030) | Auto-generate AGENTS.md |
| PH2: Commands | 5 (T031-T035) | Custom slash commands from .md |
| PH2: Tools | 4 (T036-T039) | Custom tools from .ts |
| PH2: Extras | 5 (T040-T044) | Patch tool + /editor |
| PH3: Hooks | 11 (T045-T055) | 6 lifecycle events |
| PH3: Extras | 7 (T056-T062) | Path-scoped rules + auto mode |
| PH4: CLI | 7 (T063-T069) | Budget, piping, MCP CLI |
| PH5: Advanced | 5 (T070-T074) | MCP HTTP, LSP, parallel agents |
| PH6: Server | 7 (T075-T081) | Server mode, GitHub integration |
| Polish | 6 (T082-T087) | Docs, lint, tests, release |
| **Total** | **87 tasks** | **35 feature gaps closed** |
