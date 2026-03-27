# Quickstart: External Documentation Action

## Prerequisites

- GitHub repository with documentation in a `docs/` directory
- SAP AI Core credentials (`AICORE_SERVICE_KEY`, `AICORE_RESOURCE_GROUP`) as repository secrets
- Node.js 22 compatible project (for the Alexi CLI agent)

## Step 1: Create the Action Repository

```bash
# Create new repository: ausardcompany/doc-gen-action
gh repo create ausardcompany/doc-gen-action --public --clone
cd doc-gen-action
```

## Step 2: Create action.yml

Copy the contract from `contracts/action-yml.md` into `action.yml` at the repository root. Fill in the composite action steps from `contracts/workflow-steps.md`.

## Step 3: Add Default Templates

```bash
mkdir -p templates/07-conditional
```

Create the following files with generic defaults (see `contracts/template-system.md`):

```
templates/
├── 01-header.md
├── 02-changed-files-header.md
├── 03-commits-header.md
├── 04-diff-header.md
├── 05-scope-header.md
├── 06-requirements.md
├── 07-conditional/
│   └── changelog-contributing.md
└── 08-footer.md
```

## Step 4: Test the Action Locally

Use [nektos/act](https://github.com/nektos/act) to test composite actions locally:

```bash
# Install act
brew install act

# Create a test workflow in a test repo
cat > .github/workflows/test-doc-gen.yml << 'EOF'
name: Test Doc Gen
on: workflow_dispatch
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ausardcompany/doc-gen-action@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          aicore-service-key: ${{ secrets.AICORE_SERVICE_KEY }}
          aicore-resource-group: ${{ secrets.AICORE_RESOURCE_GROUP }}
          pr-number: '1'
          pr-branch: 'test-branch'
EOF

# Run locally (requires .secrets file with credentials)
act workflow_dispatch
```

## Step 5: Update Alexi's documentation-update.yml

Replace the current 746-line workflow with the thin caller:

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

## Step 6: Publish the Action

```bash
cd doc-gen-action

# Tag a release
git add .
git commit -m "feat: initial doc-gen-action composite action"
git tag v1.0.0
git push origin main --tags

# Create GitHub Release
gh release create v1.0.0 --title "v1.0.0" --notes "Initial release of Documentation Auto-Generator action"

# Create a v1 moving tag for semver compatibility
git tag -fa v1 v1.0.0
git push origin v1 --force
```

## Step 7: Verify End-to-End

1. Open a PR in the Alexi repository with a code change (e.g., modify a file in `src/cli/`)
2. Observe the `Documentation Update` workflow run
3. Verify the PR receives a documentation update commit and a success comment
4. Verify the artifacts contain prompt.md, bot-output.log, analysis.md

## Rollback Plan

If the external action fails, revert `documentation-update.yml` to the inline version:

```bash
git checkout master -- .github/workflows/documentation-update.yml
git commit -m "revert: restore inline documentation workflow"
git push
```

The inline workflow is self-contained and has no dependency on the external action repository.
