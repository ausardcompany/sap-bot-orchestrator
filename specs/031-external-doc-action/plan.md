# Implementation Plan: Externalize Documentation Update Action

**Branch**: `031-external-doc-action` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/031-external-doc-action/spec.md`

## Summary

Extract the 746-line monolithic `documentation-update.yml` workflow and its `.github/templates/` directory into a standalone GitHub Action repository (`ausardcompany/alexi-doc-action`). The action is a **composite action** with configurable inputs for CLI build commands, template overrides, and commit messages. The consumer repo (`sap-bot-orchestrator`) retains only a thin ~30-line caller workflow. Templates ship as built-in defaults in the action repo but can be overridden by consumers.

## Technical Context

**Language/Version**: YAML (GitHub Actions), Bash (shell scripts in composite steps)  
**Primary Dependencies**: GitHub Actions runner, Node.js 22, `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`, `actions/github-script@v7`  
**Storage**: N/A (git commits, GitHub Artifacts)  
**Testing**: Manual workflow dispatch testing; optionally a CI workflow in the action repo that runs a dry-run  
**Target Platform**: GitHub Actions (ubuntu-latest runner)  
**Project Type**: GitHub Composite Action (external reusable action)  
**Performance Goals**: Workflow execution time equivalent to current (~5-15 min depending on LLM response)  
**Constraints**: Composite actions cannot set `permissions:` — caller must declare them; composite actions cannot use `secrets` context — caller must pass as inputs or use `secrets: inherit` via reusable workflow wrapper  
**Scale/Scope**: 1 action repo, N consumer repos; initial consumer: `sap-bot-orchestrator`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with [Alexi Constitution](.specify/memory/constitution.md) before proceeding.

| # | Gate | Status |
|---|------|--------|
| 1 | **SAP AI Core-First** — All LLM calls route through SAP AI Core Orchestration; no direct provider API calls outside `src/providers/`. | [N/A] This feature is CI infrastructure only; no LLM call changes. The action invokes the existing Alexi CLI which already complies. |
| 2 | **CLI-First** — Feature is reachable from the CLI; `--print`/`--file` non-interactive modes unaffected; stdout/stderr contract preserved. | [N/A] No CLI changes; the action calls the existing `alexi agent` command. |
| 3 | **Provider Abstraction** — Changes confined to `src/providers/` + `src/config/` for any provider-level work; no provider SDK imports outside `src/providers/`. | [N/A] No provider changes. |
| 4 | **Agentic Architecture** — Agent specialisation declared in `src/agent/prompts/`; tool results flow through event bus; MCP hot-pluggable. | [N/A] No agent system changes. |
| 5 | **Test Discipline (BLOCKING)** — New public functions/classes have unit tests; bug fixes have regression tests; `npm test` green; no real network/filesystem calls in tests. | [PASS] No new TypeScript code. Testing via manual workflow dispatch. `npm test` unaffected — this feature touches only `.github/` files. |
| 6 | **Simplicity / YAGNI** — No unjustified abstractions; complexity violations documented in Complexity Tracking table below. | [PASS] Moving from monolith to reusable action is justified by concrete reuse need across repos. |
| 7 | **Security & Credential Hygiene (BLOCKING)** — No credentials committed; secrets via env vars only; no `console.log` in non-CLI modules. | [PASS] Secrets passed via workflow `secrets: inherit` or explicit input mapping. No credentials in action code. |

**GATE RESULT: PASS** — All applicable gates pass. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/031-external-doc-action/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (action repo structure, input/output schema)
├── quickstart.md        # Phase 1 output (adoption guide for consumers)
├── contracts/           # Phase 1 output (action.yml interface, caller workflow interface)
│   ├── action-inputs.md     # Full action.yml inputs/outputs contract
│   └── caller-workflow.md   # Caller workflow template for consumers
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (changes)

```text
# External action repository (NEW — ausardcompany/alexi-doc-action)
alexi-doc-action/
├── action.yml                 # Composite action definition
├── templates/                 # Built-in prompt templates (moved from .github/templates/)
│   ├── 01-header.md
│   ├── 02-changed-files-header.md
│   ├── 03-commits-header.md
│   ├── 04-diff-header.md
│   ├── 05-scope-header.md
│   ├── 06-requirements.md
│   ├── 07-conditional/
│   │   ├── architecture-api.md
│   │   ├── automation.md
│   │   ├── changelog-contributing.md
│   │   ├── configuration.md
│   │   ├── providers.md
│   │   ├── routing.md
│   │   └── testing.md
│   ├── 08-footer.md
│   └── README.md
├── scripts/
│   └── run-doc-generation.sh  # Main orchestration script (extracted from workflow steps)
├── README.md                  # Action documentation & usage
└── LICENSE

# Consumer repository (sap-bot-orchestrator — MODIFIED)
.github/
├── workflows/
│   └── documentation-update.yml  # REPLACED: thin caller (~30 lines)
└── templates/                    # REMOVED (moved to action repo)
```

**Structure Decision**: Two-repo approach. The action repo (`alexi-doc-action`) contains the composite action with bundled templates and orchestration scripts. The consumer repo retains only a thin caller workflow. Templates are removed from the consumer since they ship with the action, but consumers can override via `templates-path` input.

## Complexity Tracking

> No violations — this change simplifies the consumer repo from 746 lines to ~30 lines.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
