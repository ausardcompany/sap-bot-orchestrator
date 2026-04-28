# Contract: Action Inputs & Outputs

**Branch**: `031-external-doc-action` | **Date**: 2026-03-23

This document defines the public interface contract for `ausardcompany/alexi-doc-action`.

## Reusable Workflow: `.github/workflows/doc-update.yml`

### `on.workflow_call`

```yaml
on:
  workflow_call:
    inputs:
      pr-number:
        description: 'Pull Request number to generate documentation for'
        required: true
        type: number

      force-regeneration:
        description: 'Force full documentation regeneration (ignore change detection)'
        required: false
        type: boolean
        default: false

      cli-build-command:
        description: 'Shell command to build the consumer CLI from source'
        required: false
        type: string
        default: 'npm ci && npm run build'

      cli-run-command:
        description: 'Shell command to invoke the CLI agent (without message/prompt flags)'
        required: false
        type: string
        default: 'node dist/cli/program.js agent'

      cli-flags:
        description: 'Additional CLI flags appended to cli-run-command'
        required: false
        type: string
        default: '--auto-route --effort high --max-iterations 30 --tools "read,write,edit,glob,grep" --verbose --no-auto-commits'

      system-prompt:
        description: 'System prompt for the documentation agent'
        required: false
        type: string
        default: 'You are a technical documentation writer for the Alexi project. Read source code files using the provided tools before writing documentation. Write to the exact file paths specified in the Documentation Scope section.'

      templates-path:
        description: 'Path to consumer-provided templates directory (relative to workspace root). If empty, bundled defaults are used.'
        required: false
        type: string
        default: ''

      docs-commit-message:
        description: 'Git commit message for documentation changes'
        required: false
        type: string
        default: 'docs: auto-generate documentation [skip ci] [alexi-bot]'

      bot-name:
        description: 'Bot name shown in PR comments'
        required: false
        type: string
        default: 'alexi-bot'

      node-version:
        description: 'Node.js version for the runner'
        required: false
        type: string
        default: '22'

      max-retries:
        description: 'Maximum retry attempts for CLI invocation on transient errors'
        required: false
        type: number
        default: 2

    outputs:
      docs-updated:
        description: 'Whether documentation files were updated and committed'
        value: ${{ jobs.generate-docs.outputs.docs-updated }}

      docs-files:
        description: 'Space-separated list of documentation files that were updated'
        value: ${{ jobs.generate-docs.outputs.docs-files }}

      skipped:
        description: 'Whether the run was skipped due to no code changes'
        value: ${{ jobs.generate-docs.outputs.skipped }}

      generation-success:
        description: 'Whether the CLI documentation generation succeeded'
        value: ${{ jobs.generate-docs.outputs.generation-success }}

    secrets:
      AICORE_SERVICE_KEY:
        description: 'SAP AI Core service key JSON'
        required: true
      AICORE_RESOURCE_GROUP:
        description: 'SAP AI Core resource group identifier'
        required: true
```

### Permissions Required (caller must grant)

```yaml
permissions:
  contents: write       # Push documentation commits to PR branch
  pull-requests: write  # Post status comments on PR
```

## Composite Action: `action.yml`

### Inputs

```yaml
inputs:
  # --- Secrets (must be passed explicitly) ---
  github-token:
    description: 'GitHub token for API calls, pushing commits, and posting PR comments'
    required: true
  aicore-service-key:
    description: 'SAP AI Core service key JSON'
    required: true
  aicore-resource-group:
    description: 'SAP AI Core resource group identifier'
    required: true

  # --- Configuration (same as reusable workflow) ---
  pr-number:
    description: 'Pull Request number'
    required: true
  force-regeneration:
    description: 'Force full documentation regeneration'
    required: false
    default: 'false'
  cli-build-command:
    description: 'Command to build the consumer CLI'
    required: false
    default: 'npm ci && npm run build'
  cli-run-command:
    description: 'Command to run the CLI agent'
    required: false
    default: 'node dist/cli/program.js agent'
  cli-flags:
    description: 'Additional CLI flags'
    required: false
    default: '--auto-route --effort high --max-iterations 30 --tools "read,write,edit,glob,grep" --verbose --no-auto-commits'
  system-prompt:
    description: 'System prompt for the agent'
    required: false
    default: 'You are a technical documentation writer...'
  templates-path:
    description: 'Consumer templates directory (relative to workspace)'
    required: false
    default: ''
  docs-commit-message:
    description: 'Commit message for documentation changes'
    required: false
    default: 'docs: auto-generate documentation [skip ci] [alexi-bot]'
  bot-name:
    description: 'Bot name in PR comments'
    required: false
    default: 'alexi-bot'
  max-retries:
    description: 'Max retry attempts'
    required: false
    default: '2'

outputs:
  docs-updated:
    description: 'Whether documentation was updated'
    value: ${{ steps.commit.outputs.docs-updated }}
  docs-files:
    description: 'Space-separated list of updated files'
    value: ${{ steps.scope.outputs.docs-to-update }}
  skipped:
    description: 'Whether the run was skipped'
    value: ${{ steps.check-needed.outputs.skip }}
  generation-success:
    description: 'Whether generation succeeded'
    value: ${{ steps.generate.outputs.success }}
```

## Behavioral Contract

### Execution Flow

```
1. Determine PR number and branch
2. Checkout PR branch (fetch-depth: 0)
3. Fetch base branch (main/master)
4. Set up Node.js
5. Build consumer CLI (cli-build-command)
6. Resolve templates directory (input > convention > bundled)
7. Analyze changed files since last doc commit
8. Determine documentation scope
9. Check if update needed (skip if no code changes and no force)
10. Build prompt from templates + analysis
11. Run CLI agent with retry logic
12. Validate generated markdown (markdownlint)
13. Commit and push documentation changes
14. Post PR comment (skip/success/failure)
15. Upload artifacts (analysis, scope, prompt, output, validation)
```

### Skip Conditions

The action skips documentation generation when ALL of:
- No code changes detected since last `[alexi-bot]` commit
- `force-regeneration` is `false`

### Retry Behavior

On transient errors (`socket hang up`, `ECONNRESET`, `ETIMEDOUT`, `ENOTFOUND`, `fetch failed`):
- Wait 30 seconds
- Retry up to `max-retries` times
- Non-transient errors fail immediately

### Commit Behavior

- Only files in the determined scope are staged (`git add`)
- Commit message uses `docs-commit-message` input
- Push only if local HEAD differs from remote HEAD
- No force push

### PR Comments

Three comment types:
1. **Skip**: "No code changes detected since the last documentation generation"
2. **Success**: Includes scope, analysis, validation warnings, and next steps
3. **Failure**: Includes error log (last 2000 chars) and manual documentation checklist

### Artifacts

Always uploaded (even on failure), retention 30 days:
- `analysis.md`, `scope.md`, `commits.md`, `diff.md`
- `kilo-prompt.md`, `bot-output.log`, `validation.log`
