# Quickstart: Adopting alexi-doc-action

**Branch**: `031-external-doc-action` | **Date**: 2026-03-23

## For Existing Consumers (sap-bot-orchestrator Migration)

### Step 1: Remove bundled templates

```bash
git rm -r .github/templates/
```

### Step 2: Replace the workflow

Replace the 746-line `.github/workflows/documentation-update.yml` with:

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
      pr-number: ${​{ github.event_name == 'pull_request' && github.event.pull_request.number || inputs.pr_number }}
      force-regeneration: ${​{ github.event_name == 'workflow_dispatch' && inputs.force_full_regeneration || false }}
```

### Step 3: Verify secrets

Ensure these repository secrets are configured in GitHub Settings > Secrets:
- `AICORE_SERVICE_KEY` — SAP AI Core service key JSON
- `AICORE_RESOURCE_GROUP` — SAP AI Core resource group

### Step 4: Test

Open a PR with a code change and verify:
1. The workflow triggers
2. Documentation is generated
3. A PR comment is posted
4. Changes are committed to the PR branch

## For New Consumers

### Prerequisites

1. A Node.js/TypeScript project with a CLI that supports `agent` mode
2. SAP AI Core credentials
3. GitHub repository with Actions enabled

### Step 1: Add the caller workflow

Create `.github/workflows/documentation-update.yml`:

```yaml
name: Documentation Update

on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main, master]

permissions:
  contents: write
  pull-requests: write

jobs:
  generate-docs:
    uses: ausardcompany/alexi-doc-action/.github/workflows/doc-update.yml@v1
    secrets: inherit
    with:
      pr-number: ${​{ github.event.pull_request.number }}
      cli-build-command: 'npm ci && npm run build'
      cli-run-command: 'node dist/cli/program.js agent'
```

### Step 2: Configure secrets

Add to your repository's GitHub Settings > Secrets and variables > Actions:
- `AICORE_SERVICE_KEY` — Your SAP AI Core service key
- `AICORE_RESOURCE_GROUP` — Your SAP AI Core resource group

### Step 3: (Optional) Custom templates

If the default templates don't match your project, create custom templates:

```bash
mkdir -p .docs/templates
# Copy and customize templates from the action repo
```

Then update the workflow:

```yaml
with:
  templates-path: '.docs/templates'
```

### Step 4: Open a PR

Open a pull request with code changes. The action will:
1. Analyze which files changed
2. Determine which documentation needs updating
3. Build your CLI
4. Generate documentation using the CLI agent
5. Commit and push the generated docs
6. Post a summary comment on the PR

## Troubleshooting

### "No code changes detected"
The action compares against the last commit tagged with `[alexi-bot]`. If you want to force regeneration, use the manual dispatch with `force_full_regeneration: true`.

### CLI build fails
Verify your `cli-build-command` works locally. The action runs on `ubuntu-latest` with the specified Node.js version.

### SAP AI Core errors
Check that `AICORE_SERVICE_KEY` is valid JSON and `AICORE_RESOURCE_GROUP` matches your deployment. The action posts error details in the PR failure comment.

### Template resolution
The action looks for templates in this order:
1. Path specified in `templates-path` input
2. `.github/doc-templates/` in your repo (convention)
3. Bundled defaults from the action repo
