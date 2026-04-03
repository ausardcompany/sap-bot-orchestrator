# Contract: Consumer Caller Workflow

**Branch**: `031-external-doc-action` | **Date**: 2026-03-23

This document defines the caller workflow template for consumer repositories.

## Recommended Caller Workflow (Reusable Workflow)

This is the primary, recommended integration pattern. Replaces the current 746-line monolithic workflow.

```yaml
# .github/workflows/documentation-update.yml
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

**Total lines**: ~25 (down from 746)

## Alternative Caller Workflow (Composite Action)

For consumers who need step-level control or want to add custom steps before/after documentation generation.

```yaml
# .github/workflows/documentation-update.yml
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
    runs-on: ubuntu-latest
    steps:
      - name: Checkout PR branch
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Generate documentation
        uses: ausardcompany/alexi-doc-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          aicore-service-key: ${{ secrets.AICORE_SERVICE_KEY }}
          aicore-resource-group: ${{ secrets.AICORE_RESOURCE_GROUP }}
          pr-number: ${{ github.event_name == 'pull_request' && github.event.pull_request.number || inputs.pr_number }}
          force-regeneration: ${{ github.event_name == 'workflow_dispatch' && inputs.force_full_regeneration || false }}
```

**Total lines**: ~40

## Customized Caller Examples

### Custom CLI and Templates

```yaml
jobs:
  generate-docs:
    uses: ausardcompany/alexi-doc-action/.github/workflows/doc-update.yml@v1
    secrets: inherit
    with:
      pr-number: ${{ github.event.pull_request.number }}
      cli-build-command: 'pnpm install && pnpm build'
      cli-run-command: 'node dist/main.js agent'
      templates-path: '.docs/templates'
      docs-commit-message: 'docs: update documentation [skip ci] [my-bot]'
      bot-name: 'my-bot'
```

### Force Regeneration on Schedule

```yaml
on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly Monday midnight

jobs:
  generate-docs:
    uses: ausardcompany/alexi-doc-action/.github/workflows/doc-update.yml@v1
    secrets: inherit
    with:
      pr-number: 0  # Will need special handling for non-PR contexts
      force-regeneration: true
```

## Consumer Prerequisites

1. **Repository secrets** configured:
   - `AICORE_SERVICE_KEY` — SAP AI Core service key JSON
   - `AICORE_RESOURCE_GROUP` — SAP AI Core resource group

2. **CLI** must be buildable from repo source:
   - Default: `npm ci && npm run build` produces `dist/cli/program.js`
   - Override via `cli-build-command` and `cli-run-command` inputs

3. **Permissions**: The caller workflow must set `contents: write` and `pull-requests: write`.

## Migration Checklist (from monolithic workflow)

- [ ] Remove `.github/templates/` directory from consumer repo (templates now bundled in action)
- [ ] Replace `.github/workflows/documentation-update.yml` with the recommended caller workflow above
- [ ] Verify `AICORE_SERVICE_KEY` and `AICORE_RESOURCE_GROUP` secrets are configured
- [ ] Open a test PR to verify the new workflow works identically
- [ ] (Optional) If custom templates are needed, create them in the consumer repo and pass `templates-path`
