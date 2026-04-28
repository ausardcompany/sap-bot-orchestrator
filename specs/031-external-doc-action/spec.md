# Feature Specification: Externalize Documentation Update Action

**Feature Branch**: `031-external-doc-action`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "Move the documentation update GitHub Action to a separate repository and make it external/reusable"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consumer Repo Calls External Action (Priority: P1)

A repository maintainer wants the documentation-update workflow to run on PRs just like today, but the action logic lives in an external repository (`ausardcompany/alexi-doc-action` or similar). The caller workflow in `sap-bot-orchestrator` is minimal (trigger + `uses: ausardcompany/alexi-doc-action@v1`).

**Why this priority**: This is the core deliverable — decouple the 746-line monolithic workflow from the consumer repo so it can be reused across projects and versioned independently.

**Independent Test**: Can be tested by opening a PR on `sap-bot-orchestrator` after replacing the existing workflow with the thin caller and verifying documentation is generated identically.

**Acceptance Scenarios**:

1. **Given** a PR is opened on `sap-bot-orchestrator`, **When** the caller workflow triggers, **Then** the external action checks out the PR branch, analyzes changes, builds the CLI, generates documentation, commits, and posts PR comments — identical behaviour to today.
2. **Given** the external action is at `v1`, **When** the consumer pins `uses: ausardcompany/alexi-doc-action@v1`, **Then** the action runs with the `v1` templates and logic regardless of subsequent changes to the action repo.

---

### User Story 2 - Reuse Across Multiple Repos (Priority: P2)

A second repository (`ausardcompany/another-project`) wants automatic documentation generation using the same action, just passing its own CLI build command and template overrides.

**Why this priority**: The primary motivation for externalizing — reusability across repos.

**Independent Test**: Can be tested by adding the caller workflow to a second repo with different inputs and verifying it works.

**Acceptance Scenarios**:

1. **Given** a different repo calls the external action with `cli-build-command: 'npm run build && node dist/main.js agent'`, **When** a PR is opened, **Then** the action uses that custom command instead of the default.
2. **Given** a repo provides custom templates via `templates-path: '.docs/templates'`, **When** the action runs, **Then** it uses the consumer's templates instead of built-in ones.

---

### User Story 3 - Independent Versioning and Updates (Priority: P3)

The action maintainer pushes a template improvement or workflow bugfix to the action repo. Consumer repos update at their own pace by bumping the version tag.

**Why this priority**: Operational benefit — decouple the action's release cycle from each consumer repo.

**Independent Test**: Can be tested by tagging a new release on the action repo and verifying pinned consumers are unaffected while updated consumers get new behaviour.

**Acceptance Scenarios**:

1. **Given** the action repo has `v1.0.0` and `v1.1.0` tags, **When** a consumer pins `@v1.0.0`, **Then** it uses the v1.0.0 logic even though v1.1.0 exists.
2. **Given** a breaking change is released as `v2`, **When** a consumer still uses `@v1`, **Then** no disruption occurs.

---

### Edge Cases

- What happens when the consumer repo has no `docs/` directory? → Action creates it.
- What happens when SAP AI Core credentials are missing? → Action fails gracefully with clear error message in PR comment.
- What happens when the consumer provides invalid `templates-path`? → Action falls back to built-in templates with a warning.
- What happens when the CLI build fails? → Action posts failure comment on PR.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create a new repository containing a composite GitHub Action (`action.yml`) with all workflow logic.
- **FR-002**: System MUST move `.github/templates/` from consumer repo into the action repo as bundled defaults.
- **FR-003**: System MUST accept configurable inputs: `pr-number`, `force-regeneration`, `cli-build-command`, `templates-path`, `docs-commit-message`, `bot-name`.
- **FR-004**: System MUST support `secrets: inherit` for passing SAP AI Core credentials from caller to action.
- **FR-005**: System MUST preserve all current functionality: change analysis, scope detection, prompt assembly, CLI invocation, validation, commit/push, PR comments.
- **FR-006**: System MUST replace the existing 746-line workflow in `sap-bot-orchestrator` with a thin caller workflow (<50 lines).
- **FR-007**: System MUST use semantic versioning with major version tags (`v1`, `v1.0.0`, etc.) for consumer pinning.
- **FR-008**: Action MUST support consumer-provided template overrides that take precedence over built-in templates.

### Key Entities

- **External Action Repo**: New repository containing `action.yml`, templates, scripts, and documentation.
- **Caller Workflow**: Thin wrapper in consumer repos that triggers the external action.
- **Templates Bundle**: The `.github/templates/` files, shipped as defaults inside the action repo.
- **Action Inputs/Outputs**: The contract between caller and action.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Consumer repo's documentation-update workflow is <50 lines (currently 746).
- **SC-002**: Opening a PR on `sap-bot-orchestrator` triggers documentation generation identically to the current monolithic workflow.
- **SC-003**: A second repository can adopt the action by adding only a caller workflow file and providing secrets.
- **SC-004**: The action repo has a tagged `v1` release that consumers can pin to.
