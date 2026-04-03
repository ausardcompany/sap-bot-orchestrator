# Data Model: Externalize Documentation Update Action

**Branch**: `031-external-doc-action` | **Date**: 2026-03-23

## Entity: External Action Repository

**Repository**: `ausardcompany/alexi-doc-action`

### Directory Structure

```text
alexi-doc-action/
├── .github/
│   └── workflows/
│       ├── doc-update.yml       # Reusable workflow (primary consumer interface)
│       └── test.yml             # CI: test the action itself (dry-run validation)
├── action.yml                   # Composite action (secondary interface)
├── templates/                   # Bundled default prompt templates
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
│   ├── analyze-changes.sh       # Step 1: Analyze changed files, determine scope
│   ├── build-prompt.sh          # Step 2: Assemble prompt from templates
│   ├── run-generation.sh        # Step 3: Invoke CLI with retry logic
│   ├── validate-docs.sh         # Step 4: Validate generated markdown
│   └── commit-and-push.sh       # Step 5: Commit and push changes
├── README.md                    # Action documentation and usage guide
├── CHANGELOG.md                 # Action changelog
└── LICENSE                      # MIT
```

### Script Decomposition

The current 746-line workflow is decomposed into 5 focused scripts:

| Script | Source Lines (approx.) | Responsibility |
|--------|----------------------|----------------|
| `analyze-changes.sh` | ~120 | Determine base branch, find last doc commit, classify changed files, detect scope |
| `build-prompt.sh` | ~100 | Resolve template directory, assemble prompt from templates + analysis artifacts |
| `run-generation.sh` | ~60 | Invoke CLI agent with retry logic for transient errors |
| `validate-docs.sh` | ~30 | Run markdownlint-cli2 on generated docs |
| `commit-and-push.sh` | ~35 | Stage scoped files, commit with bot tag, push to PR branch |

## Entity: Reusable Workflow Interface

**File**: `.github/workflows/doc-update.yml`

### Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `pr-number` | `number` | Yes | — | Pull request number to process |
| `force-regeneration` | `boolean` | No | `false` | Force full documentation regeneration |
| `cli-build-command` | `string` | No | `'npm ci && npm run build'` | Command to build the consumer's CLI |
| `cli-run-command` | `string` | No | `'node dist/cli/program.js agent'` | Command to run the CLI agent |
| `cli-flags` | `string` | No | `'--auto-route --effort high --max-iterations 30 --tools "read,write,edit,glob,grep" --verbose --no-auto-commits'` | Additional CLI flags |
| `system-prompt` | `string` | No | `'You are a technical documentation writer...'` | System prompt for the agent |
| `templates-path` | `string` | No | `''` | Consumer-provided templates directory (relative to workspace) |
| `docs-commit-message` | `string` | No | `'docs: auto-generate documentation [skip ci] [alexi-bot]'` | Commit message for doc updates |
| `bot-name` | `string` | No | `'alexi-bot'` | Bot name for PR comments |
| `node-version` | `string` | No | `'22'` | Node.js version for the runner |
| `max-retries` | `number` | No | `2` | Max retry attempts for CLI invocation |

### Secrets (via `secrets: inherit`)

| Secret | Required | Description |
|--------|----------|-------------|
| `AICORE_SERVICE_KEY` | Yes | SAP AI Core service key JSON |
| `AICORE_RESOURCE_GROUP` | Yes | SAP AI Core resource group |
| `GITHUB_TOKEN` | Auto | GitHub token (automatic in reusable workflows) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `docs-updated` | `boolean` | Whether documentation was updated |
| `docs-files` | `string` | Space-separated list of updated doc files |
| `skipped` | `boolean` | Whether the run was skipped (no code changes) |
| `generation-success` | `boolean` | Whether the CLI generation succeeded |

## Entity: Composite Action Interface

**File**: `action.yml`

### Inputs

Same as the reusable workflow, plus explicit secret inputs:

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `github-token` | `string` | Yes | — | GitHub token for API calls and pushing |
| `aicore-service-key` | `string` | Yes | — | SAP AI Core service key JSON |
| `aicore-resource-group` | `string` | Yes | — | SAP AI Core resource group |
| *(all inputs from reusable workflow)* | | | | |

### Outputs

Same as the reusable workflow outputs.

## Entity: Consumer Caller Workflow

**File**: `.github/workflows/documentation-update.yml` (in consumer repo)

### Structure

```yaml
name: Documentation Update

on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main, master]
  workflow_dispatch:
    inputs:
      pr_number:
        description: 'Pull Request number'
        required: true
        type: number
      force_full_regeneration:
        description: 'Force full documentation regeneration'
        required: false
        type: boolean
        default: false

permissions:
  contents: write
  pull-requests: write

jobs:
  generate-docs:
    uses: ausardcompany/alexi-doc-action/.github/workflows/doc-update.yml@v1
    secrets: inherit
    with:
      pr-number: ${{ github.event_name == 'pull_request' && github.event.pull_request.number || inputs.pr_number }}
      force-regeneration: ${{ github.event_name == 'workflow_dispatch' && inputs.force_full_regeneration || false }}
```

## Entity: Template Resolution

### State Diagram

```
┌─────────────────────┐
│ Input: templates-path│
│ provided?            │
└──────────┬──────────┘
           │
     Yes   │   No
     ▼     │   ▼
┌─────────┐│┌──────────────────┐
│ Use      │││ Convention path  │
│ input    │││ .github/         │
│ path     │││ doc-templates/   │
└─────────┘││ exists?          │
           ││└────────┬────────┘
           ││   Yes   │   No
           ││   ▼     │   ▼
           ││┌───────┐│┌─────────────┐
           │││ Use    │││ Use bundled │
           │││ conv.  │││ templates/  │
           │││ path   │││ from action │
           ││└───────┘│└─────────────┘
           │└─────────┘
           └───────────> TEMPLATES_DIR resolved
```

## Entity: Analysis Artifacts (runtime)

These files are created during workflow execution and uploaded as artifacts:

| File | Purpose | Created By |
|------|---------|-----------|
| `analysis.md` | Changed files classification | `analyze-changes.sh` |
| `scope.md` | Documentation scope (which docs to update) | `analyze-changes.sh` |
| `commits.md` | Commit messages since last doc commit | `analyze-changes.sh` |
| `diff.md` | Code diff summary | `analyze-changes.sh` |
| `kilo-prompt.md` | Assembled prompt for the agent | `build-prompt.sh` |
| `bot-output.log` | CLI agent output | `run-generation.sh` |
| `validation.log` | Markdownlint results | `validate-docs.sh` |

## Relationships

```
Consumer Repo                    Action Repo
┌─────────────────┐             ┌─────────────────────────┐
│ caller workflow  │───uses────>│ reusable workflow        │
│ (20-40 lines)   │  secrets:  │ (.github/workflows/      │
│                  │  inherit   │  doc-update.yml)         │
└─────────────────┘             │                          │
                                │   ┌─────────────────┐   │
                                │   │ analyze-changes  │   │
                                │   │ build-prompt     │   │
                                │   │ run-generation   │   │
                                │   │ validate-docs    │   │
                                │   │ commit-and-push  │   │
                                │   └────────┬────────┘   │
                                │            │             │
                                │   ┌────────▼────────┐   │
                                │   │ templates/       │   │
                                │   │ (bundled defaults)│  │
                                │   └─────────────────┘   │
                                └─────────────────────────┘
```
