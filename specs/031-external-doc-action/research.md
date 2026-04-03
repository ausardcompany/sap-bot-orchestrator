# Research: Externalize Documentation Update Action

**Branch**: `031-external-doc-action` | **Date**: 2026-03-23

## Research Questions

### RQ-1: Composite Action vs Reusable Workflow vs Hybrid

**Decision**: Hybrid approach — **Reusable Workflow** as the public interface, internally calling a **Composite Action** for step logic.

**Rationale**:
- The documentation-update workflow needs `secrets` context for SAP AI Core credentials (`AICORE_SERVICE_KEY`, `AICORE_RESOURCE_GROUP`) and `GITHUB_TOKEN` for PR comments and pushing commits.
- Composite actions **cannot** access `secrets` context directly — all secrets must be passed as explicit inputs, which means consumers must enumerate every secret in their caller workflow.
- Reusable workflows support `secrets: inherit`, enabling a clean one-line secrets passthrough.
- The reusable workflow handles job-level concerns (permissions, runner, secrets), while step logic lives in a composite action or inline steps.

**Alternatives considered**:

| Approach | Pros | Cons |
|----------|------|------|
| Pure Composite Action | Single `action.yml`, simple structure | No `secrets` context; consumer must pass every secret as input; no `permissions:` control |
| Pure Reusable Workflow | Full `secrets: inherit`; own `permissions:` | Must live in `.github/workflows/`; less intuitive for consumers expecting `uses: org/action@v1` as a step |
| **Hybrid (chosen)** | Best of both; clean `secrets: inherit`; step-level composability; consumer calls at job level | Slightly more files in the action repo |

**Final architecture**:
```
Consumer repo:                  Action repo:
┌────────────────────┐         ┌─────────────────────────────────────┐
│ caller workflow     │ uses:   │ .github/workflows/doc-update.yml   │
│ (20-40 lines)      │────────>│   (reusable workflow)               │
│                     │ secrets │     └── steps call composite action │
│                     │ inherit │ action.yml (composite action)       │
└────────────────────┘         │ templates/ (bundled defaults)        │
                               │ scripts/  (shell scripts)            │
                               └─────────────────────────────────────┘
```

However, on further analysis, since the consumer calls the reusable workflow (not the composite action directly), the composite action layer inside the repo is optional — the reusable workflow can contain all steps inline. The composite `action.yml` at root serves as a convenience entry point for consumers who prefer step-level usage and are willing to pass secrets as inputs.

**Revised decision**: Ship **both** — a reusable workflow (primary, recommended) and a composite `action.yml` (secondary, for advanced consumers who want step-level integration). The reusable workflow is the recommended interface.

---

### RQ-2: Secrets Handling

**Decision**: Use `secrets: inherit` via the reusable workflow interface.

**Rationale**:
- The action needs 3 secrets: `AICORE_SERVICE_KEY`, `AICORE_RESOURCE_GROUP`, and `GITHUB_TOKEN`.
- With `secrets: inherit`, the consumer does not need to enumerate them — all repository secrets are passed automatically.
- `GITHUB_TOKEN` is automatically available in reusable workflows when the caller grants appropriate permissions.
- For the composite action fallback, secrets are passed as explicit inputs.

**Consumer patterns**:

```yaml
# Pattern 1: Reusable workflow (recommended)
jobs:
  docs:
    uses: ausardcompany/alexi-doc-action/.github/workflows/doc-update.yml@v1
    secrets: inherit
    with:
      pr-number: ${{ github.event.pull_request.number }}

# Pattern 2: Composite action (requires explicit secret inputs)
steps:
  - uses: ausardcompany/alexi-doc-action@v1
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      aicore-service-key: ${{ secrets.AICORE_SERVICE_KEY }}
      aicore-resource-group: ${{ secrets.AICORE_RESOURCE_GROUP }}
      pr-number: ${{ github.event.pull_request.number }}
```

---

### RQ-3: Template Override Strategy

**Decision**: 3-tier resolution — explicit input > convention path > bundled defaults.

**Rationale**:
- Templates ship in the action repo at `templates/` and are accessible via `$GITHUB_ACTION_PATH/templates/` (composite) or `$GITHUB_WORKSPACE` after checkout (reusable workflow).
- Consumers can override templates by providing a `templates-path` input pointing to their own templates directory.
- If no override, fall back to the action's bundled templates.

**Resolution order**:
1. **Explicit input**: Consumer sets `templates-path: '.docs/templates'` — action uses that directory
2. **Convention path**: Consumer has `.github/doc-templates/` — action detects and uses it
3. **Bundled default**: Action uses its own `templates/` directory

**Implementation**: A shell script in the action resolves the template directory once at the beginning and exports it as `TEMPLATES_DIR` for all subsequent steps.

---

### RQ-4: Versioning Strategy

**Decision**: Semantic versioning with moving major tags (`v1`, `v1.0.0`).

**Rationale**: Industry-standard GitHub Actions versioning pattern.

**Implementation**:
- Each release gets a precise tag: `v1.0.0`, `v1.1.0`, etc.
- A moving `v1` tag points to the latest `v1.x.x` release.
- Breaking changes bump to `v2`.
- GitHub Releases with changelogs for each version.

---

### RQ-5: What Stays in the Consumer Repo

**Decision**: Only the caller workflow file remains.

**Rationale**:
- `.github/templates/` moves entirely to the action repo.
- The 746-line `documentation-update.yml` is replaced by a ~30-line caller.
- If a consumer wants custom templates, they place them in their repo and pass `templates-path`.

**What gets removed from sap-bot-orchestrator**:
- `.github/workflows/documentation-update.yml` (replaced with thin caller)
- `.github/templates/` directory (moved to action repo)
- `.github/templates/README.md` (moved to action repo)

---

### RQ-6: CLI Build and Invocation

**Decision**: The action checks out the consumer repo and builds the CLI from the consumer's source.

**Rationale**:
- The Alexi CLI is the core documentation generator — it needs the consumer's codebase context.
- The action runs `npm ci && npm run build` in the consumer's repo, then invokes `node dist/cli/program.js agent`.
- This is configurable via `cli-build-command` and `cli-run-command` inputs for consumers with different CLI setups.

**Default values**:
```yaml
cli-build-command: 'npm ci && npm run build'
cli-run-command: 'node dist/cli/program.js agent'
```

**Consumer can override**:
```yaml
with:
  cli-build-command: 'pnpm install && pnpm build'
  cli-run-command: 'node dist/main.js agent'
```

---

### RQ-7: PR Comment Permissions

**Decision**: Caller workflow must set `permissions: contents: write, pull-requests: write`.

**Rationale**:
- Composite actions inherit the caller's permissions.
- Reusable workflows can have their own permissions block, but the caller must also grant sufficient permissions.
- The action needs `contents: write` to push commits and `pull-requests: write` to post comments.

---

## Summary of All Decisions

| Topic | Decision |
|-------|----------|
| Architecture | Hybrid: reusable workflow (primary) + composite action (secondary) |
| Secrets | `secrets: inherit` via reusable workflow; explicit inputs for composite |
| Templates | 3-tier resolution: input > convention > bundled defaults |
| Versioning | Semver + moving major tags |
| Consumer changes | Remove templates dir, replace workflow with thin caller |
| CLI invocation | Checkout consumer, build from source, configurable commands |
| Permissions | Caller sets `contents: write` + `pull-requests: write` |
