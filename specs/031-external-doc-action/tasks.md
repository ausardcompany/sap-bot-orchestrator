# Tasks: Externalize Documentation Update Action

**Input**: Design documents from `/specs/031-external-doc-action/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not required — this feature is CI/YAML/Bash infrastructure. Testing is via manual workflow dispatch.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Scope**: This is a 2-repo feature. Tasks prefixed with `[ACTION]` target the new `alexi-doc-action` repository. Tasks prefixed with `[CONSUMER]` target the existing `sap-bot-orchestrator` repository. Unless marked, tasks target the action repo by default.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Action repo**: `alexi-doc-action/` (new repository root)
- **Consumer repo**: `sap-bot-orchestrator/` (existing repository root)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the action repository structure and move templates

- [ ] T001 [ACTION] Create repository `ausardcompany/alexi-doc-action` with initial directory structure: `.github/workflows/`, `templates/`, `templates/07-conditional/`, `scripts/`
- [ ] T002 [P] [ACTION] Create LICENSE file (MIT) in alexi-doc-action/LICENSE
- [ ] T003 [P] [ACTION] Copy all prompt templates from sap-bot-orchestrator `.github/templates/` to alexi-doc-action `templates/` preserving directory structure (01-header.md through 08-footer.md, 07-conditional/*, README.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extract the monolithic 746-line workflow into focused shell scripts — BLOCKS all user story implementation

**CRITICAL**: No user story work can begin until these scripts are complete and tested locally

- [ ] T004 [ACTION] Create `scripts/analyze-changes.sh` — extract lines 91-205 from current workflow: determine base branch, find last doc commit, classify changed files (TS, CLI, routing, providers, core, tests, config, workflows, scripts), determine documentation scope, generate `analysis.md`, `scope.md`, `commits.md`, `diff.md`. Accept inputs via environment variables: `PR_BRANCH`, `FORCE_REGENERATION`, `BOT_TAG` (default `[alexi-bot]`). Set outputs via `$GITHUB_OUTPUT`.
- [ ] T005 [ACTION] Create `scripts/build-prompt.sh` — extract lines 378-477 from current workflow: resolve TEMPLATES_DIR (from env var or default), verify required template files exist, assemble `kilo-prompt.md` from templates + analysis artifacts. Accept inputs via environment variables: `TEMPLATES_DIR`, plus flags from analyze step (e.g., `TS_CHANGED`, `CLI_CHANGED`, etc.).
- [ ] T006 [ACTION] Create `scripts/run-generation.sh` — extract lines 486-558 from current workflow: invoke CLI agent with configurable command/flags, implement retry logic for transient errors (socket hang up, ECONNRESET, ETIMEDOUT, ENOTFOUND, fetch failed), wait 30s between retries, write output to `bot-output.log`. Accept inputs: `CLI_RUN_COMMAND`, `CLI_FLAGS`, `SYSTEM_PROMPT`, `MAX_RETRIES`.
- [ ] T007 [P] [ACTION] Create `scripts/validate-docs.sh` — extract lines 562-584 from current workflow: run `npx markdownlint-cli2` on generated doc files, write `validation.log`. Accept input: `DOCS_TO_UPDATE` (space-separated file list).
- [ ] T008 [P] [ACTION] Create `scripts/commit-and-push.sh` — extract lines 586-614 from current workflow: stage only scoped doc files, commit with configurable message, push only if HEAD differs from remote. Accept inputs: `DOCS_TO_UPDATE`, `COMMIT_MESSAGE`, `BRANCH_NAME`.
- [ ] T009 [ACTION] Create `scripts/resolve-templates.sh` — implement 3-tier template resolution logic: check explicit `TEMPLATES_PATH` input first, then convention path `.github/doc-templates/`, then fall back to `$GITHUB_ACTION_PATH/templates/` (for composite) or action checkout path (for reusable workflow). Export resolved `TEMPLATES_DIR`.
- [ ] T010 [ACTION] Mark all scripts executable (`chmod +x scripts/*.sh`)

**Checkpoint**: All 6 scripts extracted and executable. Each script can be tested independently with mock environment variables.

---

## Phase 3: User Story 1 — Consumer Repo Calls External Action (Priority: P1) — MVP

**Goal**: The existing `sap-bot-orchestrator` documentation workflow runs identically to today, but all logic lives in the external `alexi-doc-action` repository. Consumer workflow shrinks from 746 to ~25 lines.

**Independent Test**: Open a PR on `sap-bot-orchestrator` after replacing the workflow — documentation should be generated, committed, and commented on the PR identically to the current monolithic workflow.

### Implementation for User Story 1

- [ ] T011 [US1] [ACTION] Create reusable workflow `.github/workflows/doc-update.yml` with `on.workflow_call` — define all inputs per contracts/action-inputs.md (pr-number, force-regeneration, cli-build-command, cli-run-command, cli-flags, system-prompt, templates-path, docs-commit-message, bot-name, node-version, max-retries), define secrets (AICORE_SERVICE_KEY, AICORE_RESOURCE_GROUP), define outputs (docs-updated, docs-files, skipped, generation-success)
- [ ] T012 [US1] [ACTION] Implement the `generate-docs` job in `.github/workflows/doc-update.yml` — step 1: determine PR branch via `gh api`; step 2: checkout PR branch with fetch-depth 0; step 3: fetch base branch (main/master); step 4: setup Node.js via actions/setup-node@v4; step 5: build consumer CLI using `inputs.cli-build-command`; step 6: verify CLI and SAP AI Core config
- [ ] T013 [US1] [ACTION] Add analysis and generation steps to the `generate-docs` job in `.github/workflows/doc-update.yml` — step 7: call `scripts/resolve-templates.sh`; step 8: call `scripts/analyze-changes.sh`; step 9: check if update needed (skip condition); step 10: call `scripts/build-prompt.sh`; step 11: call `scripts/run-generation.sh`; step 12: call `scripts/validate-docs.sh`
- [ ] T014 [US1] [ACTION] Add commit, comment, and artifact steps to `.github/workflows/doc-update.yml` — step 13: call `scripts/commit-and-push.sh`; step 14: post skip comment via actions/github-script@v7; step 15: post success comment; step 16: post failure comment; step 17: upload artifacts via actions/upload-artifact@v4 (analysis.md, scope.md, commits.md, diff.md, kilo-prompt.md, bot-output.log, validation.log)
- [ ] T015 [US1] [ACTION] Create composite action `action.yml` at repo root — define all inputs (including explicit github-token, aicore-service-key, aicore-resource-group), define outputs, `runs.using: composite`, implement all steps referencing scripts via `${{ github.action_path }}/scripts/`
- [ ] T016 [US1] [CONSUMER] Replace `.github/workflows/documentation-update.yml` (746 lines) with thin caller workflow (~25 lines) per contracts/caller-workflow.md — trigger on PR and workflow_dispatch, set permissions, call `ausardcompany/alexi-doc-action/.github/workflows/doc-update.yml@v1` with `secrets: inherit`
- [ ] T017 [US1] [CONSUMER] Remove `.github/templates/` directory from consumer repo (all 16 files including 07-conditional/ subdirectory and README.md) — templates now bundled in action repo

**Checkpoint**: Opening a PR on sap-bot-orchestrator triggers the external action and generates documentation identically to the current workflow. Consumer workflow is <50 lines (SC-001). Behavior is identical (SC-002).

---

## Phase 4: User Story 2 — Reuse Across Multiple Repos (Priority: P2)

**Goal**: A second repository can adopt the action by adding only a caller workflow file and configuring secrets. Custom CLI commands and template overrides are supported.

**Independent Test**: Add the caller workflow to a second test repo with different `cli-build-command` and `templates-path`, open a PR, and verify documentation is generated using the custom configuration.

### Implementation for User Story 2

- [ ] T018 [US2] [ACTION] Add input validation to `scripts/resolve-templates.sh` — validate that `TEMPLATES_PATH` (if provided) exists and contains required files (01-header.md, 06-requirements.md, 08-footer.md minimum), emit warning and fall back to bundled defaults if invalid, log resolution result
- [ ] T019 [US2] [ACTION] Add edge case handling to `scripts/analyze-changes.sh` — create `docs/` directory if it doesn't exist, handle case where `gh` CLI is not available, handle repos without conventional commit history
- [ ] T020 [US2] [ACTION] Add edge case handling to `scripts/run-generation.sh` — handle missing SAP AI Core credentials with clear error message (not just generic failure), handle CLI build failure with actionable PR comment, handle empty prompt file
- [ ] T021 [US2] [ACTION] Create `README.md` at action repo root — document both integration patterns (reusable workflow recommended, composite action alternative), list all inputs with descriptions and defaults, show customization examples (custom CLI, custom templates, custom commit message), include troubleshooting section, reference contracts/action-inputs.md structure
- [ ] T022 [P] [US2] [ACTION] Update `templates/README.md` — add section explaining template override mechanism, document which templates are required vs optional, explain the 3-tier resolution order

**Checkpoint**: A second repository can adopt the action with only a caller workflow and secrets (SC-003). Custom CLI commands and template overrides work correctly.

---

## Phase 5: User Story 3 — Independent Versioning and Updates (Priority: P3)

**Goal**: The action repo supports semantic versioning. Consumers pin to `@v1` and update at their own pace. Action maintainer can release improvements independently.

**Independent Test**: Tag `v1.0.0` and `v1` on the action repo. Verify a consumer pinned to `@v1` uses the correct version. Tag `v1.1.0` and force-move `v1`. Verify consumer gets updated behavior.

### Implementation for User Story 3

- [ ] T023 [US3] [ACTION] Create `CHANGELOG.md` in alexi-doc-action root — document v1.0.0 release with initial feature set, follow Keep a Changelog format
- [ ] T024 [US3] [ACTION] Create `.github/workflows/release.yml` — workflow triggered on push of `v*` tags, creates GitHub Release from tag with auto-generated release notes, moves the major version tag (e.g., `v1` -> latest `v1.x.x`)
- [ ] T025 [US3] [ACTION] Tag initial release: create `v1.0.0` annotated tag and `v1` lightweight tag pointing to same commit, push both tags, create GitHub Release for v1.0.0

**Checkpoint**: Action repo has a tagged v1 release (SC-004). Consumers can pin to `@v1` or `@v1.0.0`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: CI for the action repo, documentation cleanup, end-to-end validation

- [ ] T026 [P] [ACTION] Create `.github/workflows/test.yml` in action repo — CI workflow that validates YAML syntax of action.yml and doc-update.yml, runs shellcheck on all scripts in scripts/, validates templates directory structure
- [ ] T027 [P] [ACTION] Add `.gitattributes` to action repo — ensure scripts have LF line endings, mark shell scripts as binary in GitHub linguist if desired
- [ ] T028 [CONSUMER] Run end-to-end validation: open a test PR on sap-bot-orchestrator with a trivial code change, verify the new caller workflow triggers the external action, documentation is generated, PR comment is posted, artifacts are uploaded
- [ ] T029 [CONSUMER] Verify `npm test` still passes on sap-bot-orchestrator after removing templates and replacing workflow — no TypeScript code affected
- [ ] T030 Documentation review: verify quickstart.md in specs/031-external-doc-action/ is accurate post-implementation, update if needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Can start after US1 is complete (builds on the working action)
- **User Story 3 (Phase 5)**: Can start after US1 is complete (needs a working action to tag)
- **Polish (Phase 6)**: Depends on US1 completion at minimum; ideally after US2 and US3

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on Foundational (Phase 2). This is the MVP — delivers the core external action.
- **User Story 2 (P2)**: Depends on US1 (needs the working action to add customization on top). Can run in parallel with US3.
- **User Story 3 (P3)**: Depends on US1 (needs a working action to tag). Can run in parallel with US2.

### Within Each User Story

- Reusable workflow before composite action (T011-T014 before T015)
- Action repo changes before consumer repo changes (T011-T015 before T016-T017)
- Core scripts before wiring into workflow steps

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel
- **Phase 2**: T007 and T008 can run in parallel (independent scripts). T004-T006 are sequential (analyze → build-prompt → run-generation pipeline).
- **Phase 3**: T011-T015 are sequential (building up the workflow incrementally). T016 and T017 can run in parallel after T015.
- **Phase 4**: T018-T020 are sequential (progressive hardening). T021 and T022 can run in parallel with each other and with T018-T020.
- **Phase 5**: T023-T025 are sequential (changelog → release workflow → tag).
- **Phase 6**: T026 and T027 can run in parallel. T028-T030 are sequential.

---

## Parallel Example: User Story 1

```bash
# After T015 completes (composite action created), launch consumer changes in parallel:
Task: "[CONSUMER] Replace documentation-update.yml with thin caller"
Task: "[CONSUMER] Remove .github/templates/ directory"
```

## Parallel Example: User Story 2

```bash
# These can run concurrently with US2 implementation tasks:
Task: "[ACTION] Create README.md at action repo root"
Task: "[ACTION] Update templates/README.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational scripts (T004-T010) — CRITICAL
3. Complete Phase 3: User Story 1 (T011-T017)
4. **STOP and VALIDATE**: Open a test PR on sap-bot-orchestrator, verify identical behavior
5. Deploy if ready — consumer is already using the external action

### Incremental Delivery

1. Complete Setup + Foundational → Scripts extracted and tested
2. Add User Story 1 → Test via real PR → Deploy (MVP!)
3. Add User Story 2 → Test with second repo → Reusability proven
4. Add User Story 3 → Tag release → Versioning operational
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T011-T017)
3. Once US1 is done:
   - Developer A: User Story 2 (T018-T022)
   - Developer B: User Story 3 (T023-T025)
4. Polish (T026-T030) after stories complete

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- [ACTION] = targets the new `alexi-doc-action` repository
- [CONSUMER] = targets the existing `sap-bot-orchestrator` repository
- No TypeScript tests — this is YAML/Bash CI infrastructure
- Testing is via manual workflow dispatch and real PR validation
- All scripts should be POSIX-compatible Bash and work on ubuntu-latest runner
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
