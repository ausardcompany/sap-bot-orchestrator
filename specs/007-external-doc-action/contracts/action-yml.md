# Contract: action.yml (Composite Action Definition)

## Interface

```yaml
name: 'Documentation Auto-Generator'
description: 'Automatically generates and updates documentation using an LLM agent based on code changes in a pull request.'
author: 'ausardcompany'

branding:
  icon: 'book-open'
  color: 'blue'

inputs:
  # ─── Required secrets (passed by caller) ───────────────────────────────────
  github-token:
    description: 'GitHub token for API access, PR comments, and git push'
    required: true
  aicore-service-key:
    description: 'SAP AI Core service key for LLM API calls'
    required: true
  aicore-resource-group:
    description: 'SAP AI Core resource group'
    required: true

  # ─── PR context ────────────────────────────────────────────────────────────
  pr-number:
    description: 'Pull request number to process'
    required: true
  pr-branch:
    description: 'Head branch of the pull request'
    required: true
  base-branch:
    description: 'Base branch to diff against'
    required: false
    default: 'master'

  # ─── Scope configuration ───────────────────────────────────────────────────
  scope-mapping:
    description: >
      JSON mapping of file glob patterns to documentation file paths.
      Example: {"src/cli/**": ["docs/API.md"], "tests/**": ["docs/TESTING.md"]}
    required: false
    default: '{}'
  always-update:
    description: 'Space-separated list of doc files always regenerated'
    required: false
    default: 'CHANGELOG.md'

  # ─── Template configuration ────────────────────────────────────────────────
  templates-dir:
    description: 'Path to project-specific template overrides (relative to repo root)'
    required: false
    default: ''

  # ─── Output configuration ──────────────────────────────────────────────────
  docs-dir:
    description: 'Output directory for generated documentation'
    required: false
    default: 'docs'

  # ─── Agent configuration ───────────────────────────────────────────────────
  agent-command:
    description: 'CLI command to invoke the LLM agent (must support --message-file and --tools flags)'
    required: false
    default: 'npx alexi agent'
  agent-max-iterations:
    description: 'Maximum agent tool-call iterations'
    required: false
    default: '30'
  agent-effort:
    description: 'Agent effort level: low, medium, high'
    required: false
    default: 'high'
  agent-tools:
    description: 'Comma-separated list of agent tools'
    required: false
    default: 'read,write,edit,glob,grep'
  system-prompt:
    description: 'System prompt for the LLM agent'
    required: false
    default: 'You are a technical documentation writer. Read source code files using the provided tools before writing documentation. Write to the exact file paths specified in the Documentation Scope section.'

  # ─── Commit configuration ──────────────────────────────────────────────────
  commit-tag:
    description: 'Tag appended to commit messages for bot detection (used by incremental analysis)'
    required: false
    default: '[doc-bot]'
  commit-message-prefix:
    description: 'Prefix for documentation commit messages'
    required: false
    default: 'docs: auto-generate documentation'
  commit-user-name:
    description: 'Git user.name for documentation commits'
    required: false
    default: 'github-actions[bot]'
  commit-user-email:
    description: 'Git user.email for documentation commits'
    required: false
    default: 'github-actions[bot]@users.noreply.github.com'

  # ─── Behavior flags ────────────────────────────────────────────────────────
  force-regeneration:
    description: 'Force full documentation regeneration regardless of changes'
    required: false
    default: 'false'

outputs:
  docs-updated:
    description: 'Space-separated list of documentation files that were updated'
    value: ${{ steps.scope.outputs.docs_to_update }}
  skipped:
    description: '"true" if no code changes detected and not forced'
    value: ${{ steps.check_needed.outputs.skip }}
  success:
    description: '"true" if documentation was generated successfully'
    value: ${{ steps.bot.outputs.success }}
  commit-sha:
    description: 'SHA of the documentation commit (empty if no changes committed)'
    value: ${{ steps.commit.outputs.sha }}
  files-changed:
    description: 'Count of documentation files modified'
    value: ${{ steps.commit.outputs.files_changed }}

runs:
  using: 'composite'
  steps:
    # Steps defined in contracts/workflow-steps.md
    # Each step has shell: bash for run: steps
    # Uses github.action_path for bundled template references
    # Uses inputs.* for all configuration
    # Uses env: for secrets (never inline)
```

## Caller Workflow Contract

The caller's `documentation-update.yml` reduces to:

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
  generate-documentation:
    runs-on: ubuntu-latest
    steps:
      - name: Determine PR context
        id: pr
        run: |
          if [ "${{ github.event_name }}" = "pull_request" ]; then
            echo "number=${{ github.event.pull_request.number }}" >> $GITHUB_OUTPUT
            echo "branch=${{ github.event.pull_request.head.ref }}" >> $GITHUB_OUTPUT
          else
            echo "number=${{ inputs.pr_number }}" >> $GITHUB_OUTPUT
            BRANCH=$(gh api "repos/$GITHUB_REPOSITORY/pulls/${{ inputs.pr_number }}" --jq '.head.ref')
            echo "branch=$BRANCH" >> $GITHUB_OUTPUT
          fi
        shell: bash
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Checkout PR branch
        uses: actions/checkout@v4
        with:
          ref: ${{ steps.pr.outputs.branch }}
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Generate documentation
        uses: ausardcompany/doc-gen-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          aicore-service-key: ${{ secrets.AICORE_SERVICE_KEY }}
          aicore-resource-group: ${{ secrets.AICORE_RESOURCE_GROUP }}
          pr-number: ${{ steps.pr.outputs.number }}
          pr-branch: ${{ steps.pr.outputs.branch }}
          templates-dir: '.github/templates'
          scope-mapping: |
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
          always-update: 'CHANGELOG.md docs/CONTRIBUTING.md'
          commit-tag: '[alexi-bot]'
          force-regeneration: ${{ github.event_name == 'workflow_dispatch' && inputs.force_full_regeneration || 'false' }}
```

This reduces the caller from **746 lines** to **~50 lines**.
