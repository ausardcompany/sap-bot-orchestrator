# Research: Extract Documentation Auto-Generation into External GitHub Action

## R1: GitHub Composite Action Architecture

### Decision: Composite action (`runs: composite`)

### Rationale

Composite actions are the right primitive for this extraction because:

- **Sub-actions are fully supported**: Steps within a composite action can `uses:` other actions (`actions/checkout@v4`, `actions/github-script@v7`, `actions/upload-artifact@v4`). This is critical because the current workflow uses all three.
- **Step-level `if:` conditions work**: Conditional steps (e.g., skip when no code changes) are supported with the full expression syntax including `success()`, `failure()`, `always()`.
- **Outputs propagate back to the caller**: Steps write to `$GITHUB_OUTPUT`, and the action's top-level `outputs:` block maps step outputs to action-level outputs using `${{ steps.step-id.outputs.value }}`.
- **No Docker overhead**: Runs directly on the host runner without image pull latency.

### Key constraints discovered

| Constraint | Impact on Design |
|-----------|-----------------|
| `shell:` is **required** on every `run:` step | Must add `shell: bash` to all 15+ shell steps — cannot inherit a default |
| **No `secrets` context** inside composite actions | All secrets (`GITHUB_TOKEN`, `AICORE_SERVICE_KEY`, `AICORE_RESOURCE_GROUP`) must be passed as explicit `inputs:` by the caller |
| `required: true` does **not** auto-error | Action must validate required inputs in its first step with explicit checks |
| **No `defaults.run.working-directory`** | Must set `working-directory:` per-step if needed |
| **No `jobs:` or `strategy:`** | Cannot split into multiple jobs. The action runs as steps within the caller's job |
| **No `timeout-minutes` per step** | Timeout is controlled at the caller's job level only |
| `github.action_path` resolves to the action's own directory | Useful for referencing bundled templates and scripts |
| Max **10 levels** of composite action nesting | Not a concern (single level) |
| Max **1 MB per output per job** | Not a concern (outputs are short strings, not file contents) |

### Alternatives considered

- **Reusable workflows** (`workflow_call`): Can access `secrets:` natively but run as a separate job, not as steps within the caller's job. This prevents sharing the checkout and workspace. Would require re-checkout in the called workflow, adding latency. Also, reusable workflows cannot be nested with other reusable workflows easily.
- **JavaScript action** (`runs: node20`): Would allow a single `index.js` entry point but requires bundling all logic into JavaScript. The current implementation is ~90% bash with small JS fragments for PR comments. Converting to pure JS is unnecessary complexity.
- **Docker action**: Adds cold-start latency and creates volume-mount complications for the file-system tools. The agent reads/writes/edits files in the repository checkout; Docker isolation complicates this.

---

## R2: Secret Handling Pattern

### Decision: Pass secrets as action inputs

### Rationale

Composite actions cannot access the `secrets` context. The caller must explicitly pass secrets via `with:` inputs.

```yaml
# Caller workflow
- uses: ausardcompany/doc-gen-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    aicore-service-key: ${{ secrets.AICORE_SERVICE_KEY }}
    aicore-resource-group: ${{ secrets.AICORE_RESOURCE_GROUP }}
```

```yaml
# action.yml
inputs:
  github-token:
    description: 'GitHub token for API access and PR comments'
    required: true
  aicore-service-key:
    description: 'SAP AI Core service key'
    required: true
  aicore-resource-group:
    description: 'SAP AI Core resource group'
    required: true
```

GitHub still masks these values in logs since they originate from the `secrets` context in the caller. No additional masking is needed.

### Alternatives considered

- **Environment variables set by caller**: The caller could set `env:` on the step that invokes the composite action. However, composite action steps do NOT automatically inherit the caller's `env:` — they must be redeclared in each step. Using inputs is more explicit and self-documenting.
- **Reusable workflow with `secrets:` block**: Would allow native `secrets` context but forces a separate job (see R1 alternatives).

---

## R3: LLM Agent Distribution Strategy

### Decision (MVP): npm package — `npx alexi agent ...`

### Rationale

The existing `release.yml` workflow already publishes the `alexi` package to npm. The `bin` field in `package.json` is configured (`alexi` → `dist/cli/program.js`). The action can install it with `npm install -g alexi@<version>` in ~30 seconds.

**Required changes for MVP**:
1. Add `.npmignore` to exclude non-essential files (src/, tests/, .github/, etc.) — reduces tarball from 3 MB to ~500 KB
2. Verify `npm publish` succeeds reliably (currently has `continue-on-error: true`)
3. Pin a specific version in the action's default to avoid surprises

**MVP performance budget**: ~30s for `npm install` is acceptable for a PR doc bot that runs 2-5 times per day.

### Decision (Future): GitHub Release tarball

Pre-built `alexi-linux-x64.tar.gz` attached to GitHub Releases containing `dist/`, production `node_modules/`, and `package.json`. Download + extract in ~5 seconds. This eliminates:
- npm registry dependency
- `npm install` latency (297 MB of dependencies)
- Native compilation risk (`tree-sitter` bindings built on the release CI match the runner platform exactly)

### Alternatives considered

- **Build from source in the action**: Simplest but slowest (~60-90s). Acceptable only as a fallback if npm install fails.
- **Docker image**: Adds 400-500 MB image pull, volume-mount complications for file-system tools, and a new Dockerfile/publishing pipeline. Overkill and actively harmful for the file-reading agent pattern.

---

## R4: Template Override Strategy

### Decision: `github.action_path` for defaults, input path for overrides

### Rationale

Composite actions set `${{ github.action_path }}` to the directory containing the action's `action.yml`. This allows bundling default templates:

```
doc-gen-action/
├── action.yml
├── templates/          ← default templates, referenced via ${{ github.action_path }}/templates
│   ├── 01-header.md
│   ├── 06-requirements.md
│   └── 08-footer.md
└── scripts/
    └── assemble-prompt.sh
```

The caller overrides by providing `templates-dir` input pointing to their own templates directory:

```yaml
- uses: ausardcompany/doc-gen-action@v1
  with:
    templates-dir: .github/templates  # Alexi-specific overrides
```

The assembly script checks the override directory first, falling back to the action's bundled defaults for any missing template file. This is the same pattern used by `.specify/templates/` (overrides → presets → extensions → core).

### Alternatives considered

- **No bundled defaults**: Callers must provide all templates. Increases adoption friction.
- **Config file (YAML/JSON)**: A `.doc-gen.yml` config file in the caller's repo. Adds another file to maintain and a parser to write. Inputs are simpler.

---

## R5: Scope Mapping Configuration Format

### Decision: JSON input with glob-to-docs mapping

### Rationale

The current workflow hardcodes scope mapping in bash `if` chains:

```bash
if [ "$cli_changed" = "true" ] || [ "$core_changed" = "true" ]; then
  DOCS_TO_UPDATE="$DOCS_TO_UPDATE docs/ARCHITECTURE.md docs/API.md"
fi
```

For a reusable action, this becomes a configurable JSON input:

```json
{
  "src/cli/**": ["docs/ARCHITECTURE.md", "docs/API.md"],
  "src/core/**": ["docs/ARCHITECTURE.md", "docs/API.md"],
  "src/core/router*": ["docs/ROUTING.md"],
  "src/config/routing*": ["docs/ROUTING.md"],
  "src/providers/**": ["docs/PROVIDERS.md"],
  "package.json": ["docs/CONFIGURATION.md"],
  "tsconfig.json": ["docs/CONFIGURATION.md"],
  "src/config/**": ["docs/CONFIGURATION.md"],
  "tests/**": ["docs/TESTING.md"],
  ".github/workflows/**": ["docs/AUTOMATION.md"],
  "scripts/**": ["docs/AUTOMATION.md"]
}
```

**Always-update files** (CHANGELOG.md, CONTRIBUTING.md) are configured via a separate `always-update` input:

```yaml
always-update: "CHANGELOG.md docs/CONTRIBUTING.md"
```

The analysis script uses `git diff --name-only` to get changed files, then matches each against the scope mapping globs using bash `[[ $file == $glob ]]` pattern matching. This replaces the 10+ boolean flags (`cli_changed`, `core_changed`, etc.) with a single data-driven loop.

### Alternatives considered

- **YAML configuration file**: More readable but requires a YAML parser. JSON can be parsed with `jq` which is pre-installed on GitHub Actions runners.
- **Simple glob:file pairs (CSV)**: Less expressive. JSON handles many-to-many mappings naturally.
- **Keep hardcoded patterns**: Defeats the purpose of extraction.

---

## R6: PR Comment Strategy

### Decision: Use `actions/github-script@v7` as a composite step

### Rationale

The current workflow uses `actions/github-script@v7` for PR comments with inline JavaScript. Composite actions support `uses:` steps, so this can be directly migrated:

```yaml
- uses: actions/github-script@v7
  with:
    github-token: ${{ inputs.github-token }}
    script: |
      // ... comment posting logic
```

The JavaScript reads intermediate files (scope.md, analysis.md, validation.log) and builds the comment body. This is simpler than writing a custom Node.js script and maintains the existing comment format.

### Alternatives considered

- **`gh api` with curl**: Possible but verbose for comment upsert logic (find existing comment, update or create). The GitHub Script action handles Octokit natively.
- **Custom `post-comment.js` script**: More testable but adds a dependency on the action bundling its own Node scripts. The inline approach is proven and works.

---

## R7: Conditional Template Inclusion

### Decision: Name-based matching between scope keys and conditional templates

### Rationale

The current workflow uses step outputs (`${{ steps.analyze.outputs.routing_changed }}`) to conditionally include templates. In the external action, the scope mapping output determines which conditional templates to include.

The assembly script:
1. Computes the set of doc files to update from scope mapping
2. For each doc file in scope, checks if a matching conditional template exists in `07-conditional/`
3. The mapping from doc file → conditional template is either:
   - Filename-based convention: `docs/ROUTING.md` → `07-conditional/routing.md`
   - Explicit mapping in a `template-mapping` input (for non-standard names)

This replaces 6 separate `if:` blocks with a single loop.

### Alternatives considered

- **Keep individual `if:` blocks**: Works but doesn't scale. Adding a new documentation scope requires editing both the scope mapping and the template assembly logic.
- **All-or-nothing**: Always include all conditional templates. Wastes LLM tokens on irrelevant instructions.
