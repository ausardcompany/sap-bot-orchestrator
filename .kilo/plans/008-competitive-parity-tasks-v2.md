# Tasks v2: Competitive Feature Parity — Integration Focus

**Updated**: 2026-03-26 after codebase audit  
**Key Finding**: Upstream syncs already delivered 5 feature modules as dead code. Only custom agent loader is truly missing.

## Audit Results

| Module | File | Lines | Status | Plan Code |
|--------|------|-------|--------|-----------|
| Hooks System | `src/hooks/index.ts` | 658 | Module complete, **NOT wired** | H3 |
| Custom Commands | `src/command/index.ts` | 686 | Module complete, **NOT wired** to CLI | H2 |
| Project Init | `src/init/index.ts` | 1490 | Module complete, **NOT wired** to CLI | H5 |
| Error Backoff | `src/core/error-backoff.ts` | 81 | Module complete, **NOT wired** | — |
| Permission Drain | `src/permission/drain.ts` | 90 | Logic complete, bus events commented out | — |
| Skills System | `src/skill/index.ts` | 274 | Module complete, wired via skill tool | Done |
| Plugin System | `src/plugin/index.ts` | 1044 | Exists, handles custom tools via plugins | H4 |
| Modes Migrator | `src/config/modes-migrator.ts` | 49 | Skeleton only | — |
| **Custom Agent Loader** | **DOES NOT EXIST** | — | **Must be built** | **H1** |

## Revised Scope: What Actually Needs To Be Done

### Track A: Build Missing Feature (Custom Agent Loader)
- Create `src/agent/customAgentLoader.ts` — load agents from `.alexi/agents/*.md` files
- Wire into AgentRegistry initialization
- Wire agent.preferredModel into agenticChat model selection
- Wire agent.tools into agenticChat tool filtering
- Add per-agent permissions (extend PermissionContext with agentId)

### Track B: Integration Wiring (Hooks → Tool/Session)
- Add `executeHooks('PreToolUse', ...)` in `defineTool().executeUnsafe()` 
- Add `executeHooks('PostToolUse', ...)` after tool execution
- Add SessionStart/SessionEnd hooks in orchestrator
- Wire UserPromptSubmit hook in chat entry points

### Track C: Integration Wiring (Commands → CLI)
- Wire `getCommandRegistry()` into REPL `handleCommand()` dispatch
- Wire custom commands into TUI `buildCommands()` 
- Add custom commands to `/help` output

### Track D: Integration Wiring (Init → CLI)
- Create `src/cli/commands/init.ts` CLI command
- Add `/init` slash command to REPL and TUI

### Track E: Additional TUI Updates
- Update AgentName type to support dynamic custom agents
- Update AVAILABLE_AGENTS to use registry dynamically
- Update AgentSelector dialog

---

## Implementation Tasks (Revised — ~35 tasks instead of 87)

### Phase 1: Custom Agent Loader (Track A — MVP)

- [ ] T001 Create `src/agent/customAgentLoader.ts` — scan `.alexi/agents/*.md` and `~/.alexi/agents/*.md`, parse YAML frontmatter with gray-matter, validate via AgentSchema, convert body to systemPrompt. Also load `agents` section from `alexi.json` if present.
- [ ] T002 Integrate loader into `AgentRegistry` constructor in `src/agent/index.ts` — call `loadCustomAgents(workdir)` after built-in agents. Handle errors gracefully (warn, skip invalid).
- [ ] T003 Update `AGENT_PROMPTS` fallback in `src/agent/system.ts` — for custom agents, check registry for prompt if not in static map.
- [ ] T004 Wire `agent.preferredModel` into model selection in `src/core/agenticChat.ts` (line 234-246) — use it before auto-route when no modelOverride.
- [ ] T005 Wire `agent.canUseTool()` into tool filtering in `src/core/agenticChat.ts` (line 252-257) — auto-filter based on agent config.
- [ ] T006 Create `tests/agent/customAgentLoader.test.ts` — loading .md, frontmatter parsing, precedence, invalid handling, model/tool wiring.

### Phase 2: TUI Dynamic Agent Support (Track E)

- [ ] T007 Update `AgentName` type in `src/cli/tui/context/SessionContext.tsx` — change from literal union to `string` for dynamic agent support.
- [ ] T008 Update `AVAILABLE_AGENTS` in `src/cli/tui/hooks/useCommands.ts` — populate dynamically from `getAgentRegistry().list()`.
- [ ] T009 Update `AgentSelector.tsx` dialog — show custom agents with source indicators.

### Phase 3: Wire Hooks Into Lifecycle (Track B)

- [ ] T010 Wire `PreToolUse` hook into `defineTool().executeUnsafe()` in `src/tool/index.ts` — call `executeHooks('PreToolUse', context)` before execute. If any hook blocks (exit code 2), return error.
- [ ] T011 Wire `PostToolUse` hook after tool execution in `src/tool/index.ts` — fire asynchronously (non-blocking).
- [ ] T012 Wire `SessionStart` hook into session creation in `src/core/agenticChat.ts`.
- [ ] T013 Wire `SessionEnd` hook into session close.
- [ ] T014 Wire `Stop` hook into agent completion in `src/core/agenticChat.ts`.
- [ ] T015 Create integration test `tests/hooks/integration.test.ts` — verify hooks fire during actual tool/session execution.

### Phase 4: Wire Commands Into CLI (Track C)

- [ ] T016 Wire `getCommandRegistry()` into REPL `handleCommand()` in `src/cli/interactive.ts` — before `default:` case, check if cmd matches a registered custom command. If so, execute it.
- [ ] T017 Call `getCommandRegistry().loadFromDefaultLocations()` during REPL initialization.
- [ ] T018 Wire custom commands into TUI `buildCommands()` in `src/cli/tui/hooks/useCommands.ts` — merge custom commands as SlashCommand entries.
- [ ] T019 Add custom commands to `/help` output in REPL — show under "Custom Commands" section.

### Phase 5: Wire Init Into CLI (Track D)

- [ ] T020 Create `src/cli/commands/init.ts` — registerInitCommand(program) with --force option. Calls `initProject()` from existing `src/init/index.ts`.
- [ ] T021 Register in `src/cli/commands/index.ts` — add to `registerAllCommands()`.
- [ ] T022 Add `/init` to REPL `handleCommand()` in `src/cli/interactive.ts`.
- [ ] T023 Add `/init` to TUI `buildCommands()` in `src/cli/tui/hooks/useCommands.ts`.

### Phase 6: Per-Agent Permissions

- [ ] T024 Add `permission` field to AgentSchema in `src/agent/index.ts` — per-agent permission overrides.
- [ ] T025 Add `agentId` to `ToolContext` in `src/tool/index.ts` and `PermissionContext` in `src/permission/index.ts`.
- [ ] T026 Extend `PermissionManager.evaluate()` to check agent-specific rules before global rules.
- [ ] T027 Pass `agentId` from `agenticChat()` through the tool execution chain.
- [ ] T028 Create `tests/permission/agentPermissions.test.ts`.

### Phase 7: Polish

- [ ] T029 Run `npm run typecheck` — zero errors.
- [ ] T030 Run `npm run lint:fix && npm run format`.
- [ ] T031 Run `npm test` — all tests pass.
- [ ] T032 Update AGENTS.md with new features.

---

## Summary

| Phase | Tasks | Effort | Deliverable |
|-------|-------|--------|-------------|
| 1: Custom Agent Loader | 6 (T001-T006) | Medium | Users can define agents in .alexi/agents/*.md |
| 2: TUI Dynamic Agents | 3 (T007-T009) | Small | TUI shows custom agents |
| 3: Wire Hooks | 6 (T010-T015) | Medium | Hooks fire on tool/session events |
| 4: Wire Commands | 4 (T016-T019) | Small | Custom commands work as slash commands |
| 5: Wire Init | 4 (T020-T023) | Small | `alexi init` generates AI_CONTEXT.md |
| 6: Per-Agent Permissions | 5 (T024-T028) | Medium | Agents have isolated permissions |
| 7: Polish | 4 (T029-T032) | Small | Clean, tested, documented |
| **Total** | **32 tasks** | **~1-2 weeks** | **Phase 1-3 of original plan** |

**Effort reduced from 87 tasks / 6-8 weeks to 32 tasks / 1-2 weeks** thanks to upstream sync having already built the modules.
