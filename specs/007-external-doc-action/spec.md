# Feature Specification: Extract Documentation Auto-Generation into External GitHub Action

**Feature Branch**: `007-external-doc-action`  
**Created**: 2026-03-24  
**Status**: Draft  
**Input**: User description: "хочу вынести автогенерацию документации в отдельный репозиторий и использовать в workflow как внешний action"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Use External Action for Doc Generation (Priority: P1)

As a repository maintainer, I want to replace the inline 746-line `documentation-update.yml` workflow with a single `uses: ausardcompany/doc-gen-action@v1` step, so that documentation generation logic is maintained in one place and reused across multiple repositories.

**Why this priority**: This is the core value proposition — reducing ~700 lines of inline workflow to ~20 lines of action invocation. Every other story depends on this extraction working.

**Independent Test**: Can be fully tested by creating the new `doc-gen-action` repository with `action.yml`, then updating `documentation-update.yml` in the Alexi repo to call it. A successful PR with auto-generated docs proves the action works end-to-end.

**Acceptance Scenarios**:

1. **Given** the `doc-gen-action` repository exists with a published release, **When** a PR is opened in the Alexi repository with code changes, **Then** the `documentation-update.yml` workflow calls the external action and documentation is generated identically to the current inline workflow.
2. **Given** the external action is configured with Alexi-specific templates, **When** the action runs, **Then** it uses the project's `.github/templates/` directory for prompt assembly, preserving the existing modular template system.
3. **Given** no code changes since the last doc generation, **When** a PR is synced, **Then** the action correctly skips generation and posts a skip comment.

---

### User Story 2 - Configure Action via Inputs (Priority: P1)

As a repository maintainer, I want to configure the action's behavior through `with:` inputs (scope mapping, template directory, LLM settings, commit tag), so that different repositories can customize documentation generation without forking the action.

**Why this priority**: Without configurable inputs, the action would be hardcoded to Alexi's structure and useless for other repositories. This is essential for reusability.

**Independent Test**: Can be tested by invoking the action with non-default inputs (e.g., a different `docs-dir`, custom `scope-mapping`) and verifying the action respects those overrides.

**Acceptance Scenarios**:

1. **Given** the action is called with `scope-mapping` input mapping `src/lib/**` → `docs/LIB.md`, **When** files in `src/lib/` change, **Then** the action targets `docs/LIB.md` for regeneration.
2. **Given** the action is called with `commit-tag: [my-bot]`, **When** the action commits documentation, **Then** the commit message contains `[my-bot]` instead of the default `[alexi-bot]`.
3. **Given** the action is called with `templates-dir: .docs/templates`, **When** prompt assembly runs, **Then** templates are loaded from `.docs/templates/` rather than `.github/templates/`.

---

### User Story 3 - Pluggable LLM Agent Backend (Priority: P2)

As a developer adopting the action in a non-Alexi repository, I want to specify which LLM agent command to use (or use a built-in default), so that the action is not coupled to the Alexi CLI binary.

**Why this priority**: The current workflow builds Alexi from source and uses its own CLI as the LLM agent. For reusability, the action needs to support alternative agent backends. However, for the MVP, using the Alexi CLI as a pre-built binary or Docker image is acceptable.

**Independent Test**: Can be tested by configuring the action with `agent-command: "npx @ausard/alexi agent"` (pre-published npm package) and verifying docs are generated without building from source.

**Acceptance Scenarios**:

1. **Given** the action is called without `agent-command` input, **When** the action runs, **Then** it uses the built-in default agent (pre-packaged Alexi CLI from Docker or npm).
2. **Given** the action is called with a custom `agent-command`, **When** the action runs, **Then** it invokes the specified command with the assembled prompt and tool flags.

---

### User Story 4 - Composite Action with Minimal Dependencies (Priority: P2)

As a GitHub Actions user, I want the external action to be a composite action (not Docker-based), so that it runs quickly without image pull overhead and works on any `ubuntu-latest` runner.

**Why this priority**: Docker-based actions add cold-start latency. A composite action using `runs: composite` with shell steps is faster and simpler to maintain. The only external dependency is Node.js (already standard on runners).

**Independent Test**: Can be tested by verifying the action's `action.yml` uses `runs: composite` and all steps use `shell: bash` or `uses:` sub-actions.

**Acceptance Scenarios**:

1. **Given** the action repository contains `action.yml` with `runs: composite`, **When** a workflow calls `uses: ausardcompany/doc-gen-action@v1`, **Then** the action executes without pulling a Docker image.
2. **Given** the runner has Node.js 22 available (via `setup-node`), **When** the action runs, **Then** all steps complete without requiring additional runtime setup.

---

### User Story 5 - Default Templates Bundled with Overrides (Priority: P3)

As a new adopter of the action, I want sensible default templates bundled with the action, so that I can get started without writing templates from scratch — while still being able to override any template.

**Why this priority**: Reduces adoption friction. Advanced users override templates; new users get a working setup out of the box.

**Independent Test**: Can be tested by calling the action without a `templates-dir` input and verifying default templates produce valid documentation prompts.

**Acceptance Scenarios**:

1. **Given** the action is called without `templates-dir`, **When** prompt assembly runs, **Then** the action uses its bundled default templates (generic versions of the current Alexi templates).
2. **Given** the caller provides `templates-dir` pointing to a directory with only `01-header.md`, **When** prompt assembly runs, **Then** the caller's `01-header.md` overrides the default, and all other templates use the bundled defaults.

---

### Edge Cases

- What happens when the caller's `scope-mapping` JSON is malformed? → Action fails fast with a clear error message and posts a failure PR comment.
- What happens when the LLM agent command is not found? → Action detects missing binary, posts failure comment with installation instructions.
- What happens when the caller's repository has no `docs/` directory? → Action creates it (already handled by current workflow).
- What happens when the action is called on a non-PR event? → Action validates the trigger event and exits gracefully with an info message.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Action MUST accept a `scope-mapping` input (JSON) that maps file glob patterns to documentation file paths.
- **FR-002**: Action MUST accept a `templates-dir` input for project-specific prompt templates, with fallback to bundled defaults.
- **FR-003**: Action MUST accept LLM configuration inputs: `agent-command`, `agent-max-iterations`, `agent-tools`, `agent-effort`.
- **FR-004**: Action MUST accept output configuration: `docs-dir`, `commit-tag`, `commit-message-prefix`.
- **FR-005**: Action MUST perform changed-file analysis against the base branch or last bot commit.
- **FR-006**: Action MUST assemble LLM prompts from ordered templates with conditional sections based on scope.
- **FR-007**: Action MUST invoke the configured LLM agent with the assembled prompt and file-system tools.
- **FR-008**: Action MUST commit and push documentation changes to the PR branch.
- **FR-009**: Action MUST post PR comments (success/failure/skip) summarizing the generation run.
- **FR-010**: Action MUST upload debug artifacts (prompt, logs, analysis) for troubleshooting.
- **FR-011**: Action MUST support `workflow_dispatch` with `pr_number` and `force_full_regeneration` inputs.
- **FR-012**: Action MUST validate generated markdown with `markdownlint-cli2` (warnings only, non-blocking).
- **FR-013**: Action MUST NOT commit credentials or secrets; all LLM API keys are passed via environment variables.
- **FR-014**: Action MUST be a composite action (`runs: composite`) to avoid Docker overhead.

### Key Entities

- **Action Inputs**: Configuration parameters passed via `with:` in the caller's workflow.
- **Scope Mapping**: JSON structure mapping file patterns to documentation targets.
- **Template Set**: Ordered collection of markdown templates assembled into the LLM prompt.
- **Documentation Scope**: Computed set of doc files to update based on changed files and scope mapping.
- **Generation Run**: A single invocation of the action including analysis, generation, commit, and reporting.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The Alexi repository's `documentation-update.yml` is reduced from ~746 lines to <30 lines (action invocation + secrets passing).
- **SC-002**: Documentation generated by the external action is byte-identical to the current inline workflow for the same input.
- **SC-003**: The action can be adopted in a second repository with only `action.yml` inputs and templates — no code changes to the action itself.
- **SC-004**: Action execution time is within 10% of the current inline workflow (no Docker overhead).
- **SC-005**: All existing PR comment formats (success/failure/skip) are preserved.
