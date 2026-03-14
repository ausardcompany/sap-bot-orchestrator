# Plan: Interactive Model Selection + `!` Bash Execution

## Overview

Two features for the interactive REPL (`src/cli/interactive.ts`):

1. **Interactive model picker** — `/models` opens an arrow-key TUI selector (powered by `@inquirer/prompts`) showing combined local + remote models, grouped by provider
2. **`!` bash execution** — typing `! <command>` executes a shell command synchronously with inherited stdio

---

## Feature 1: Interactive Model Picker

### Current State
- `/models` fetches from `SAP_PROXY_BASE_URL/models` and prints a flat bullet list (no selection)
- `/model <id>` sets `state.currentModel` with no validation
- `ORCHESTRATION_MODELS` in `sapOrchestration.ts` has 15 hardcoded model IDs
- No interactive prompt library installed

### Design

**Model source**: Combined local `ORCHESTRATION_MODELS` + remote proxy models (if `SAP_PROXY_BASE_URL` configured). Grouped by provider.

**UX flow**:
```
❯ /models

  Select a model:

  OpenAI
  ❯ gpt-4o                    ← current
    gpt-4.1
    gpt-5
    gpt-5-mini

  Anthropic
    anthropic--claude-3.7-sonnet
    anthropic--claude-4.5-sonnet

  Google
    gemini-2.5-flash
    gemini-2.5-pro
  ...

  (Type to filter, ↑↓ to navigate, Enter to select, Esc to cancel)

  ✓ Switched to model: gpt-4.1
```

### Implementation Steps

#### Step 1: Install `@inquirer/prompts`

```bash
npm install @inquirer/prompts
```

This adds the `search` or `select` prompt. The `select` prompt with `type: 'separator'` supports grouped options natively.

#### Step 2: Create `src/cli/utils/modelPicker.ts`

New file — encapsulates model fetching + grouping + TUI selection logic.

```typescript
/**
 * Interactive model picker using @inquirer/prompts
 */

import { select, Separator } from '@inquirer/prompts';
import { ORCHESTRATION_MODELS } from '../../providers/sapOrchestration.js';
import { env } from '../../config/env.js';
import { c } from './colors.js';

interface ModelChoice {
  id: string;
  source: 'local' | 'remote';
}

/**
 * Group models by provider prefix.
 * Models like "anthropic--claude-4.5-sonnet" → group "Anthropic"
 * Models like "gpt-4o" → group "OpenAI"
 */
const PROVIDER_GROUPS: Record<string, string> = {
  'gpt-': 'OpenAI',
  'anthropic--': 'Anthropic',
  'gemini-': 'Google',
  'amazon--': 'Amazon',
  'mistralai--': 'Mistral',
  'meta--': 'Meta',
  'deepseek-': 'DeepSeek',
  'sap-': 'SAP',
};

function getProviderGroup(modelId: string): string {
  for (const [prefix, group] of Object.entries(PROVIDER_GROUPS)) {
    if (modelId.startsWith(prefix)) {
      return group;
    }
  }
  return 'Other';
}

/**
 * Fetch remote models from SAP proxy (if configured).
 * Returns empty array if not configured or fetch fails.
 */
async function fetchRemoteModels(): Promise<string[]> {
  const baseURL = env('SAP_PROXY_BASE_URL');
  const apiKey = env('SAP_PROXY_API_KEY');
  if (!baseURL || !apiKey) {
    return [];
  }

  try {
    const url = baseURL.replace(/\/$/, '') + '/models';
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = (await res.json()) as { data?: Array<{ id: string }> };
      return (data?.data || []).map((m) => m.id);
    }
  } catch {
    // Silently fall back to local models
  }
  return [];
}

/**
 * Build the combined, deduplicated, grouped model list.
 */
async function getAvailableModels(): Promise<ModelChoice[]> {
  const localModels = [...ORCHESTRATION_MODELS];
  const remoteModels = await fetchRemoteModels();

  // Merge: local first, then remote-only models
  const seen = new Set<string>(localModels);
  const allModels: ModelChoice[] = localModels.map((id) => ({ id, source: 'local' as const }));

  for (const id of remoteModels) {
    if (!seen.has(id)) {
      seen.add(id);
      allModels.push({ id, source: 'remote' as const });
    }
  }

  return allModels;
}

/**
 * Show interactive model picker. Returns selected model ID or null if cancelled.
 */
export async function pickModel(currentModel: string): Promise<string | null> {
  const models = await getAvailableModels();

  // Group by provider
  const groups = new Map<string, ModelChoice[]>();
  for (const model of models) {
    const group = getProviderGroup(model.id);
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)!.push(model);
  }

  // Build choices with separators for each group
  const choices: Array<{ name: string; value: string; description?: string } | Separator> = [];

  for (const [groupName, groupModels] of groups) {
    choices.push(new Separator(`── ${groupName} ──`));
    for (const model of groupModels) {
      const isCurrent = model.id === currentModel;
      choices.push({
        name: isCurrent ? `${model.id} ← current` : model.id,
        value: model.id,
        description: model.source === 'remote' ? '(proxy)' : undefined,
      });
    }
  }

  try {
    const selected = await select({
      message: 'Select a model',
      choices,
      pageSize: 20,
      loop: false,
    });
    return selected;
  } catch {
    // User pressed Esc or Ctrl+C — cancelled
    return null;
  }
}
```

#### Step 3: Update `/models` handler in `interactive.ts`

Replace the current `/models` case (lines 267-292) with:

```typescript
case 'models': {
  // Pause readline to let inquirer take over stdin
  rl.pause();
  try {
    const { pickModel } = await import('./utils/modelPicker.js');
    const selected = await pickModel(state.currentModel);
    if (selected && selected !== state.currentModel) {
      state.currentModel = selected;
      console.log(c('green', `\n  Switched to model: ${state.currentModel}\n`));
    } else if (selected === state.currentModel) {
      console.log(c('gray', `\n  Model unchanged: ${state.currentModel}\n`));
    } else {
      console.log(c('gray', '\n  Model selection cancelled\n'));
    }
  } catch (e) {
    console.log(c('red', `\n  Error: ${e instanceof Error ? e.message : String(e)}\n`));
  } finally {
    rl.resume();
  }
  return true;
}
```

**Key detail**: `rl.pause()` / `rl.resume()` is required because both `readline` and `@inquirer/prompts` listen on `process.stdin`. We must pause readline while inquirer is active.

The `rl` variable is currently scoped inside `startInteractiveSession()` (line 1636) and is NOT accessible from `handleCommand()`. We need to pass it through — either:
- (a) Pass `rl` as a parameter to `handleCommand()`, or
- (b) Add `rl` to `ReplState`

**Recommended**: Option (b) — add `rl` to `ReplState`.

```typescript
// Add to ReplState interface (line 50-64):
interface ReplState {
  // ... existing fields ...
  rl?: readline.Interface;
}
```

Then in the main function, set `state.rl = rl` after creating the readline interface.

#### Step 4: Update `/model` handler for validation

Enhance the existing `/model <id>` handler (lines 258-265) to validate against known models:

```typescript
case 'model':
  if (args.length === 0) {
    console.log(c('gray', `\n  Current model: ${c('green', state.currentModel)}\n`));
  } else {
    const modelId = args.join(' ');
    if (!isOrchestrationModel(modelId)) {
      console.log(c('yellow', `\n  Warning: '${modelId}' is not in the known models list`));
      console.log(c('yellow', '  Use /models to see available models\n'));
    }
    state.currentModel = modelId;
    console.log(c('green', `\n  Switched to model: ${state.currentModel}\n`));
  }
  return true;
```

Import `isOrchestrationModel` at the top of `interactive.ts`:
```typescript
import { isOrchestrationModel } from '../providers/sapOrchestration.js';
```

#### Step 5: Update help text

Add `!` command to the help output, and update `/models` description:

```
  /models              - Pick a model (interactive selector)
  ! <command>          - Execute a shell command
```

---

## Feature 2: `!` Bash Execution

### Current State
- No `!` prefix handling exists in the REPL
- `child_process` is not imported in `interactive.ts`
- The `bash.ts` tool uses `spawn` for async execution, but the REPL wants sync inherited stdio

### Design

When the user types `! ls -la` or `!ls -la`, execute the command synchronously with inherited stdio. The command output appears directly in the terminal. After the command finishes, the REPL prompt returns.

**Behavior**:
- `! ls -la` → runs `ls -la` in the current working directory
- `!ls -la` → also works (no space required after `!`)
- Exit code is shown if non-zero: `  [exit code: 1]`
- The working directory is `process.cwd()`
- `SIGINT` (Ctrl+C) during the command goes to the child process, not our handler

### Implementation

#### Step 1: Add `!` prefix handler in the REPL input loop

In `interactive.ts`, add a new branch before the "Send message" section (between line 1670 and 1672):

```typescript
// Handle bang commands (shell execution)
if (input.startsWith('!')) {
  const command = input.slice(1).trim();
  if (!command) {
    console.log(c('yellow', '\n  Usage: ! <command>\n'));
    rl.prompt();
    return;
  }
  try {
    const { execSync } = await import('child_process');
    console.log(); // blank line before output
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: true,
      env: process.env,
    });
    console.log(); // blank line after output
  } catch (err: unknown) {
    const exitCode = (err as { status?: number }).status;
    if (exitCode !== null && exitCode !== undefined) {
      console.log(c('yellow', `\n  [exit code: ${exitCode}]\n`));
    } else {
      console.log(c('red', `\n  Error: ${err instanceof Error ? err.message : String(err)}\n`));
    }
  }
  rl.prompt();
  return;
}
```

Using `execSync` with `stdio: 'inherit'`:
- stdout/stderr go directly to the terminal
- stdin is inherited (allows interactive commands like `vim`, `less`)
- The shell flag enables pipes, redirects, etc. (`! ls | grep foo`)
- `execSync` blocks the event loop — this is intentional for UX (user expects synchronous behavior)

**Note**: We use dynamic `await import('child_process')` instead of a top-level import. This is a stylistic choice — `child_process` is a Node.js built-in and could be imported at the top. Either approach works. Since `interactive.ts` already has many imports, a dynamic import keeps the top cleaner and only loads when needed. However, a static import at the top is equally fine. We'll use a static import for simplicity:

```typescript
import { execSync } from 'child_process';
```

---

## File Changes Summary

| File | Change |
|------|--------|
| `package.json` | Add `@inquirer/prompts` dependency |
| `src/cli/utils/modelPicker.ts` | **NEW** — model fetching, grouping, TUI picker |
| `src/cli/interactive.ts` | Add `!` handler, update `/models` to use picker, add `rl` to `ReplState`, import `execSync` and `isOrchestrationModel`, update help text |

## Tests

### `src/cli/utils/__tests__/modelPicker.test.ts` (NEW)

Test the pure logic functions (grouping, merging) without the TUI prompt:
- `getProviderGroup()` correctly groups all known model prefixes
- Model merging deduplicates local + remote
- Local models appear before remote-only models
- Unknown provider prefix → "Other" group

### `src/cli/__tests__/interactive-bash.test.ts` (NEW)

Test the `!` command parsing logic:
- `! ls` extracts command `ls`
- `!ls` (no space) also works
- Empty `!` shows usage message
- Non-zero exit code is reported

### Existing test suite

Run `npm run typecheck && npm test` after implementation to verify no regressions.

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| `@inquirer/prompts` conflicts with `readline` | `rl.pause()` / `rl.resume()` around inquirer calls |
| `execSync` blocks event loop | Intentional — matches user expectation for shell commands |
| `@inquirer/prompts` ESM compatibility | Package supports ESM natively since v7+ |
| Large model lists overflow terminal | `pageSize: 20` with scroll + type-to-filter |
| Proxy API timeout delays `/models` | 5s `AbortSignal.timeout()`, falls back to local models silently |

## Implementation Order

1. `npm install @inquirer/prompts`
2. Create `src/cli/utils/modelPicker.ts`
3. Update `interactive.ts` — add `rl` to `ReplState`, `!` handler, `/models` update, `/model` validation, help text, imports
4. Create tests
5. Run `npm run typecheck && npm test`
6. Commit
