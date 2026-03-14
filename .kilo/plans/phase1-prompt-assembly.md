# Phase 1: Core Identity & Prompt Assembly Pipeline

## Overview

Replace inline agent prompts with file-based `.txt` prompts and create an assembly pipeline
that layers: soul → model-specific → environment info → agent role prompt → AGENTS.md → custom rules.

**Baseline**: 50 test files, 1170 tests passing. Must remain green after implementation.

## Architecture

```
buildAssembledSystemPrompt({ modelId, agentId, workdir })
  │
  ├─ 1. soul.txt                    (core identity - always first)
  ├─ 2. {model-specific}.txt        (anthropic|openai|gemini|default)
  ├─ 3. Environment info block      (workdir, git, platform, date, model)
  ├─ 4. {agent}.txt                 (code|debug|orchestrator|explore|ask)
  ├─ 5. AGENTS.md                   (from project root, if exists)
  └─ 6. Custom rules                (.alexi/rules-{mode}/*.md, if exist)
```

## Deliverables

### A. Prompt Text Files (10 new files in `src/agent/prompts/`)

| # | File | Description | Source/Reference |
|---|------|-------------|-----------------|
| 1 | `soul.txt` | Core identity: "You are Alexi", direct tone, no-emoji, objectivity, code principles | Adapted from Kilo `src/kilocode/soul.txt` |
| 2 | `anthropic.txt` | Claude-specific: tool usage policy, parallel calls, structured thinking | Adapted from Kilo `src/session/prompt/anthropic.txt` |
| 3 | `openai.txt` | GPT/O-series: autonomous execution, web research, structured output | Adapted from Kilo `src/session/prompt/beast.txt` |
| 4 | `gemini.txt` | Gemini: structured mandates, conciseness | Adapted from Kilo `src/session/prompt/gemini.txt` |
| 5 | `default.txt` | Fallback for Amazon, Mistral, Meta, DeepSeek, SAP models | General-purpose subset |
| 6 | `code.txt` | Enriched code agent: task mgmt, file editing rules, commit/PR protocol, tool policy | Adapted from Kilo `src/agent/prompt/code/` pattern |
| 7 | `debug.txt` | 5-7 hypotheses, systematic verification, minimal fixes | Adapted from Kilo `src/agent/prompt/debug.txt` |
| 8 | `orchestrator.txt` | Wave-based parallel delegation, agent coordination | Adapted from Kilo `src/agent/prompt/orchestrator.txt` |
| 9 | `explore.txt` | Read-only specialist, quick/medium/thorough modes | Adapted from Kilo `src/agent/prompt/explore.txt` |
| 10 | `ask.txt` | Read-only Q&A, Mermaid diagrams, cite file:line | New (Kilo pattern) |

### B. Assembly Pipeline (1 new file)

| # | File | Description |
|---|------|-------------|
| 11 | `src/agent/system.ts` | Exports `buildAssembledSystemPrompt(options)` and `getModelPromptFile(modelId)` |

### C. Agent Registry Update (1 modified file)

| # | File | Changes |
|---|------|---------|
| 12 | `src/agent/index.ts` | Replace inline prompt consts with `fs.readFileSync` from `.txt` files using `import.meta.url` |

## Design Decisions

### Prompt Loading Strategy
```typescript
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const promptsDir = join(__dirname, 'prompts');

function loadPrompt(name: string): string {
  return readFileSync(join(promptsDir, name), 'utf-8');
}
```
- Load at module init time (not per-request) for performance
- Use `import.meta.url` for ESM-compatible path resolution
- Files are read synchronously at startup (same as Kilo)

### Model → Prompt Mapping
```typescript
function getModelPromptFile(modelId: string): string {
  if (modelId.startsWith('anthropic--')) return 'anthropic.txt';
  if (modelId.startsWith('gpt-')) return 'openai.txt';
  if (modelId.startsWith('gemini-')) return 'gemini.txt';
  return 'default.txt';
}
```

### Environment Info Block
```
<environment>
Working directory: {cwd}
Is directory a git repo: {yes|no}
Platform: {process.platform}
Today's date: {formatted date}
Model: {modelId}
</environment>
```

### AGENTS.md Loading
- Read from `path.join(workdir, 'AGENTS.md')` if it exists
- Wrap in `<agents-md>` XML tags
- Silent no-op if file doesn't exist

### Custom Rules Loading
- Scan `.alexi/rules-{agentId}/*.md` in workdir
- Concatenate all found files
- Wrap each in descriptive header
- Silent no-op if directory doesn't exist

## Backward Compatibility

- `builtInAgents` keeps exact same shape (`AgentConfig[]`)
- `AgentRegistry` class unchanged
- All 98 agent tests pass without modification
- `buildSystemPrompt()` in `agenticChat.ts` NOT modified in Phase 1
- `streamingOrchestrator.ts` NOT modified in Phase 1
- `interactive.ts` NOT modified in Phase 1
- Integration of `buildAssembledSystemPrompt` into the chat pipeline is Phase 4

## File Dependency Order

1. Create `src/agent/prompts/` directory
2. Write all 10 `.txt` files (independent, parallel)
3. Write `src/agent/system.ts` (depends on .txt files existing)
4. Modify `src/agent/index.ts` (depends on .txt files existing)
5. Run `npm run typecheck && npm test` to verify

## Verification

```bash
npm run typecheck   # Must pass with no errors
npm test            # Must pass: 50 files, 1170+ tests
```
