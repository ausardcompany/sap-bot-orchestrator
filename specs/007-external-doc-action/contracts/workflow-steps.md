# Contract: Composite Action Workflow Steps

## Step Inventory

The composite action contains these steps, executed in order within the caller's job:

| # | Step ID | Name | Type | Conditional |
|---|---------|------|------|-------------|
| 1 | `validate` | Validate inputs | `run:` | — |
| 2 | `setup_git` | Configure git identity | `run:` | — |
| 3 | `fetch_base` | Fetch base branch | `run:` | — |
| 4 | `analyze` | Analyze changed files | `run:` | — |
| 5 | `check_needed` | Check if update needed | `run:` | — |
| 6 | `scope` | Determine documentation scope | `run:` | skip != 'true' |
| 7 | `commits` | Get commit messages | `run:` | skip != 'true' |
| 8 | `diff` | Generate code diff summary | `run:` | skip != 'true' |
| 9 | `prompt` | Assemble LLM prompt from templates | `run:` | skip != 'true' |
| 10 | `setup_node` | Setup Node.js 22 | `uses:` | skip != 'true' |
| 11 | `install_agent` | Install LLM agent | `run:` | skip != 'true' |
| 12 | `prepare_dirs` | Prepare documentation directories | `run:` | skip != 'true' |
| 13 | `bot` | Run LLM agent | `run:` | skip != 'true' |
| 14 | `validate_md` | Validate generated markdown | `run:` | skip != 'true' && bot.success |
| 15 | `commit` | Commit and push changes | `run:` | skip != 'true' && bot.success |
| 16 | `comment_skip` | Post skip comment | `uses:` | skip == 'true' |
| 17 | `comment_success` | Post success comment | `uses:` | skip != 'true' && bot.success |
| 18 | `comment_failure` | Post failure comment | `uses:` | skip != 'true' && !bot.success |
| 19 | `artifacts` | Upload debug artifacts | `uses:` | always() |

## Step Pseudocode

### Step 1: Validate Inputs

```bash
# Validate required inputs
if [ -z "$INPUT_GITHUB_TOKEN" ]; then
  echo "::error::Required input 'github-token' is not set"
  exit 1
fi
if [ -z "$INPUT_AICORE_SERVICE_KEY" ]; then
  echo "::error::Required input 'aicore-service-key' is not set"
  exit 1
fi
if [ -z "$INPUT_PR_NUMBER" ] || [ -z "$INPUT_PR_BRANCH" ]; then
  echo "::error::Required inputs 'pr-number' and 'pr-branch' are not set"
  exit 1
fi

# Validate scope-mapping is valid JSON (if provided)
if [ -n "$INPUT_SCOPE_MAPPING" ] && [ "$INPUT_SCOPE_MAPPING" != "{}" ]; then
  echo "$INPUT_SCOPE_MAPPING" | jq empty 2>/dev/null || {
    echo "::error::Invalid JSON in 'scope-mapping' input"
    exit 1
  }
fi

echo "[OK] All inputs validated"
```

### Step 2: Configure Git Identity

```bash
git config user.name "$INPUT_COMMIT_USER_NAME"
git config user.email "$INPUT_COMMIT_USER_EMAIL"
```

### Step 3: Fetch Base Branch

```bash
git fetch origin "$INPUT_BASE_BRANCH:$INPUT_BASE_BRANCH" 2>/dev/null || {
  echo "::warning::Could not fetch $INPUT_BASE_BRANCH, trying alternatives"
  git fetch origin main:main 2>/dev/null || git fetch origin master:master
}
```

### Step 4: Analyze Changed Files

```bash
# Find last bot commit by searching for commit-tag
LAST_DOC_COMMIT=$(git log --oneline --grep="$INPUT_COMMIT_TAG" -1 --format="%H" 2>/dev/null || echo "")

if [ -n "$LAST_DOC_COMMIT" ]; then
  LAST_CODE_COMMIT=$(git rev-parse "${LAST_DOC_COMMIT}^1" 2>/dev/null || echo "$INPUT_BASE_BRANCH")
  CHANGED_FILES=$(git diff --name-only "$LAST_CODE_COMMIT"...HEAD -- ':!docs/' ':!CHANGELOG.md' ':!*.md')
else
  CHANGED_FILES=$(git diff --name-only "$INPUT_BASE_BRANCH"...HEAD)
fi

# Filter out documentation files
CHANGED_FILES=$(echo "$CHANGED_FILES" | grep -v -E "^($INPUT_DOCS_DIR/|CHANGELOG\.md$)" || echo "")

if [ -z "$CHANGED_FILES" ]; then
  echo "has_code_changes=false" >> $GITHUB_OUTPUT
else
  echo "has_code_changes=true" >> $GITHUB_OUTPUT
fi

# Write analysis.md for prompt assembly
echo "## Changed Files Analysis" > analysis.md
echo '```' >> analysis.md
echo "$CHANGED_FILES" >> analysis.md
echo '```' >> analysis.md
```

### Step 5: Check If Update Needed

```bash
if [ "$HAS_CODE_CHANGES" = "false" ] && [ "$INPUT_FORCE" = "false" ]; then
  echo "skip=true" >> $GITHUB_OUTPUT
else
  echo "skip=false" >> $GITHUB_OUTPUT
fi
```

### Step 6: Determine Documentation Scope

```bash
CHANGED_FILES=$(cat analysis.md | sed -n '/^```$/,/^```$/p' | grep -v '^```$')
DOCS_TO_UPDATE=""

# Match changed files against scope mapping
echo "$INPUT_SCOPE_MAPPING" | jq -r 'to_entries[] | "\(.key)\t\(.value | join(" "))"' | \
while IFS=$'\t' read -r pattern doc_files; do
  echo "$CHANGED_FILES" | while read -r file; do
    if [[ "$file" == $pattern ]]; then
      for doc in $doc_files; do
        echo "$doc"
      done
    fi
  done
done | sort -u > /tmp/scope-docs.txt

# Add always-update files
for f in $INPUT_ALWAYS_UPDATE; do
  echo "$f" >> /tmp/scope-docs.txt
done

# Force → include ALL doc files from scope mapping
if [ "$INPUT_FORCE" = "true" ]; then
  echo "$INPUT_SCOPE_MAPPING" | jq -r '.[] | .[]' | sort -u > /tmp/scope-docs.txt
  for f in $INPUT_ALWAYS_UPDATE; do
    echo "$f" >> /tmp/scope-docs.txt
  done
fi

DOCS_TO_UPDATE=$(sort -u /tmp/scope-docs.txt | tr '\n' ' ')
echo "docs_to_update=$DOCS_TO_UPDATE" >> $GITHUB_OUTPUT

# Write scope.md for prompt assembly
echo "## Documentation Scope" > scope.md
for f in $DOCS_TO_UPDATE; do
  echo "- $f" >> scope.md
done
```

### Step 9: Assemble LLM Prompt

```bash
TEMPLATES_OVERRIDE="$INPUT_TEMPLATES_DIR"
TEMPLATES_DEFAULT="${​{ github.action_path }}/templates"

resolve_template() {
  local name="$1"
  if [ -n "$TEMPLATES_OVERRIDE" ] && [ -f "$TEMPLATES_OVERRIDE/$name" ]; then
    echo "$TEMPLATES_OVERRIDE/$name"
  elif [ -f "$TEMPLATES_DEFAULT/$name" ]; then
    echo "$TEMPLATES_DEFAULT/$name"
  else
    echo ""
  fi
}

# Assemble in order
cat "$(resolve_template '01-header.md')" > prompt.md
cat "$(resolve_template '02-changed-files-header.md')" >> prompt.md
cat analysis.md >> prompt.md
cat "$(resolve_template '03-commits-header.md')" >> prompt.md
cat commits.md >> prompt.md
cat "$(resolve_template '04-diff-header.md')" >> prompt.md
cat diff.md >> prompt.md
cat "$(resolve_template '05-scope-header.md')" >> prompt.md
cat scope.md >> prompt.md
cat "$(resolve_template '06-requirements.md')" >> prompt.md

# Conditional templates based on scope
for doc in $DOCS_TO_UPDATE; do
  # Derive conditional template name from doc file
  # e.g., docs/ROUTING.md → routing, docs/ARCHITECTURE.md → architecture-api
  basename=$(basename "$doc" .md | tr '[:upper:]' '[:lower:]')
  conditional="$(resolve_template "07-conditional/$basename.md")"
  if [ -n "$conditional" ]; then
    cat "$conditional" >> prompt.md
  fi
done

# Always include changelog-contributing
cat "$(resolve_template '07-conditional/changelog-contributing.md')" >> prompt.md

# Footer
cat "$(resolve_template '08-footer.md')" >> prompt.md

echo "[OK] Prompt assembled ($(wc -l < prompt.md) lines)"
```

### Step 13: Run LLM Agent

```bash
MAX_RETRIES=2
ATTEMPT=0
BOT_EXIT_CODE=1

while [ $ATTEMPT -lt $MAX_RETRIES ]; do
  ATTEMPT=$((ATTEMPT + 1))

  $INPUT_AGENT_COMMAND \
    --message-file prompt.md \
    --auto-route \
    --effort "$INPUT_AGENT_EFFORT" \
    --max-iterations "$INPUT_AGENT_MAX_ITERATIONS" \
    --tools "$INPUT_AGENT_TOOLS" \
    --workdir "$(pwd)" \
    --verbose \
    --no-auto-commits \
    --system "$INPUT_SYSTEM_PROMPT" \
    > bot-output.log 2>&1

  BOT_EXIT_CODE=$?

  if [ $BOT_EXIT_CODE -eq 0 ]; then
    break
  fi

  # Retry on transient network errors
  if grep -qiE "socket hang up|ECONNRESET|ETIMEDOUT|ENOTFOUND|fetch failed" bot-output.log; then
    if [ $ATTEMPT -lt $MAX_RETRIES ]; then
      echo "[WARN] Transient network error. Retrying in 30s..."
      sleep 30
      continue
    fi
  fi

  break
done

echo "success=$([ $BOT_EXIT_CODE -eq 0 ] && echo 'true' || echo 'false')" >> $GITHUB_OUTPUT
```

### Step 15: Commit and Push

```bash
BRANCH="$INPUT_PR_BRANCH"
DOCS_TO_UPDATE="$SCOPE_DOCS"

# Stage only target doc files
for f in $DOCS_TO_UPDATE; do
  [ -f "$f" ] && git add "$f"
done

if ! git diff --cached --quiet; then
  git commit -m "$INPUT_COMMIT_PREFIX [skip ci] $INPUT_COMMIT_TAG"
  echo "sha=$(git rev-parse HEAD)" >> $GITHUB_OUTPUT
  echo "files_changed=$(git diff --cached --name-only | wc -l | tr -d ' ')" >> $GITHUB_OUTPUT
else
  echo "sha=" >> $GITHUB_OUTPUT
  echo "files_changed=0" >> $GITHUB_OUTPUT
fi

# Push if ahead of remote
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "")

if [ "$LOCAL" != "$REMOTE" ]; then
  git push origin "$BRANCH"
fi
```
