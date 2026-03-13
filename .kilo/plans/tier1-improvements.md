# Tier 1 Upstream-Inspired Improvements — Implementation Plan

## Overview

Five targeted improvements inspired by research of OpenCode, Kilocode, Claude Code, and CodeMie.
Implementation order: #4 → #1 → #3 → #2 → #5 (smallest → largest risk).

Baseline: **1105 tests passing**, 45 test files, clean build, clean typecheck.

---

## Improvement #4: StringDecoder for Bash Tool (~45 min)

**Problem**: `bash.ts:83-89` uses `data.toString()` on stream chunks. When multi-byte UTF-8 characters (e.g. CJK, emoji) are split across Node.js Buffer boundaries, `toString()` produces mojibake/replacement characters. Kilocode fixed this exact issue.

**Files to modify**:
- `src/tool/tools/bash.ts` — Use `StringDecoder` for stdout/stderr
- NEW: `src/tool/tools/__tests__/bash.test.ts` — New test file (bash has no tests currently)

**Implementation details**:

1. Add import at top of `bash.ts`:
   ```typescript
   import { StringDecoder } from 'node:string_decoder';
   ```

2. Inside `execute()`, before spawning, create two decoders:
   ```typescript
   const stdoutDecoder = new StringDecoder('utf8');
   const stderrDecoder = new StringDecoder('utf8');
   ```

3. Replace data handlers (lines 83-89):
   ```typescript
   proc.stdout.on('data', (data: Buffer) => {
     stdout += stdoutDecoder.write(data);
   });

   proc.stderr.on('data', (data: Buffer) => {
     stderr += stderrDecoder.write(data);
   });
   ```

4. In the `close` handler (line 91), flush decoders before truncation:
   ```typescript
   proc.on('close', (code) => {
     // Flush any remaining bytes in the decoders
     stdout += stdoutDecoder.end();
     stderr += stderrDecoder.end();
     // ... existing truncation and resolve logic
   ```

5. Add `windowsHide: true` to spawn options (line 58-62) for cross-platform correctness:
   ```typescript
   const proc = spawn(params.command, {
     shell: true,
     cwd: workdir,
     env: { ...process.env, FORCE_COLOR: '0' },
     windowsHide: true,
   });
   ```

**Tests** (`src/tool/tools/__tests__/bash.test.ts`):
- Basic command execution (echo, exit 0)
- Non-zero exit code handling
- Timeout behavior
- Abort signal cancellation
- Multi-byte UTF-8 handling (echo emoji/CJK through command)
- Large output truncation
- Working directory override
- windowsHide option presence verified

---

## Improvement #1: Tool Result Disk Persistence (~2-3 hours)

**Problem**: `truncateOutput()` in `src/tool/index.ts:70-99` hard-truncates at 2000 lines / 50KB. The truncated data is lost forever. The hint at `bash.ts:122` says "Full output was saved to a file" but no file is actually saved. The LLM can't recover the truncated content.

**Files to modify**:
- `src/tool/index.ts` — Add `persistLargeOutput()` function, export it
- `src/tool/tools/bash.ts` — Use new persistence; include file path in hint
- NEW: `src/tool/tools/__tests__/toolPersistence.test.ts` — Test persistence logic

**Implementation details**:

1. Add new imports and constants to `tool/index.ts`:
   ```typescript
   import * as fs from 'fs/promises';
   import * as path from 'path';
   import * as os from 'os';

   const TOOL_OUTPUT_DIR = path.join(os.homedir(), '.alexi', 'tool-output');
   ```

2. Add `persistLargeOutput()` function:
   ```typescript
   export async function persistLargeOutput(
     output: string,
     toolName: string
   ): Promise<string | null> {
     const lines = output.split('\n');
     const bytes = Buffer.byteLength(output, 'utf-8');
     if (lines.length <= MAX_LINES && bytes <= MAX_BYTES) {
       return null;
     }
     await fs.mkdir(TOOL_OUTPUT_DIR, { recursive: true });
     const filename = `${toolName}-${nanoid(8)}.txt`;
     const filePath = path.join(TOOL_OUTPUT_DIR, filename);
     await fs.writeFile(filePath, output, 'utf-8');
     return filePath;
   }
   ```

3. Add cleanup utility:
   ```typescript
   export async function cleanupToolOutputs(maxAgeMs = 24 * 60 * 60 * 1000): Promise<number> {
     // Remove files older than maxAgeMs from TOOL_OUTPUT_DIR
   }
   ```

4. In `bash.ts`, persist large outputs in `close` handler before truncating:
   ```typescript
   const [stdoutFile, stderrFile] = await Promise.all([
     persistLargeOutput(stdout, 'bash-stdout'),
     persistLargeOutput(stderr, 'bash-stderr'),
   ]);
   ```
   Build hint with actual file paths when truncated.

   **Note**: The `close` callback becomes async. This is safe since `resolve()` is still called within the callback — `new Promise` doesn't care if the executor is async.

**Tests**:
- `persistLargeOutput` returns null for small outputs
- `persistLargeOutput` writes file for large outputs
- File content matches original
- Directory auto-created
- `cleanupToolOutputs` removes old files, keeps recent
- Bash integration: hint includes file path when truncated

---

## Improvement #3: Parallel Tool Error Isolation (~1.5 hours)

**Problem**: `batch.ts:138` uses `Promise.all()`. At line 145, `success: failed === 0` — if ANY tool fails (even a non-critical read), the batch is marked failed. Claude Code and OpenCode classify tools as critical vs non-critical.

**Files to modify**:
- `src/tool/tools/batch.ts` — Add `CRITICAL_TOOLS` set, use `Promise.allSettled`, update success logic
- `src/tool/tools/__tests__/batch.test.ts` — Add error isolation tests

**Implementation details**:

1. Add critical tools set:
   ```typescript
   export const CRITICAL_TOOLS = new Set([
     'bash', 'write', 'edit', 'multiedit', 'delete',
   ]);
   ```

2. Replace `Promise.all` with `Promise.allSettled` at line 138.

3. Update success logic:
   ```typescript
   const criticalFailures = results.filter(
     (r) => !r.success && CRITICAL_TOOLS.has(r.tool)
   ).length;
   
   return {
     success: criticalFailures === 0,
     // ...
   };
   ```

4. Update hint to distinguish critical vs non-critical.

**Tests** (additions to existing `batch.test.ts`):
- Non-critical failure (read/glob/grep) → batch succeeds
- Critical failure (bash/write/edit) → batch fails
- Mixed failures → batch fails if any critical
- Hint distinguishes critical vs non-critical
- `CRITICAL_TOOLS` exported

---

## Improvement #2: Prompt Cache Optimization (~1-2 hours)

**Problem**: `buildSystemPrompt()` in `agenticChat.ts:279-286` concatenates: repoMap → memory → session → base. The stable base prompt changes position when volatile content changes, busting prompt cache. Claude Code showed 12x cost reduction with better ordering.

**Files to modify**:
- `src/core/agenticChat.ts` — Reorder `buildSystemPrompt()` parts
- `src/cli/interactive.ts` — Apply same ordering for streaming system prompt
- `src/core/__tests__/agenticChat.test.ts` — Update test expectations

**Implementation details**:

1. Change order in `buildSystemPrompt()`:

   **Current** (cache-hostile): `repoMap → memory → session → base`
   
   **New** (cache-friendly): `base → memory → session → repoMap`

   Rationale:
   - `base` = agent persona + instructions → most stable, best cache prefix
   - `memory` = changes only on user add/edit → semi-stable
   - `session` = changes at session boundaries → semi-stable
   - `repoMap` = changes on file edits → most volatile, goes last

2. In `interactive.ts`, flip memory/system prompt ordering to match:
   ```typescript
   // Before: memoryContext + systemPrompt
   // After:  systemPrompt + memoryContext
   ```

3. Update ~4-5 tests in `agenticChat.test.ts` that assert on prompt part ordering.

---

## Improvement #5: Effort Levels (~3-4 hours)

**Problem**: No way to control cost/speed vs quality tradeoff. Claude Code's effort levels let users say "quick fix" vs "think deeply."

**Files to create/modify**:
- NEW: `src/core/effortLevel.ts` — Types, configs, validation
- `src/core/agenticChat.ts` — Thread effort into maxIterations, preferCheap, maxTokens
- `src/cli/interactive.ts` — `/effort` slash command, add to state, thread to streamChat
- `src/core/streamingOrchestrator.ts` — Accept effort in options
- NEW: `src/core/__tests__/effortLevel.test.ts` — Test configs and validation

**Implementation details**:

1. `effortLevel.ts` defines:
   ```typescript
   export type EffortLevel = 'low' | 'medium' | 'high';
   
   export interface EffortConfig {
     label: string;
     maxIterations: number;
     preferCheap: boolean;
     maxTokens: number;
     thinkingBudget: number;
     compactionThreshold: number;
   }
   
   export const EFFORT_CONFIGS: Record<EffortLevel, EffortConfig> = {
     low:    { label: 'Low (fast & cheap)',  maxIterations: 15,  preferCheap: true,  maxTokens: 2048, thinkingBudget: 0,     compactionThreshold: 0.5  },
     medium: { label: 'Medium (balanced)',    maxIterations: 50,  preferCheap: false, maxTokens: 4096, thinkingBudget: 0,     compactionThreshold: 0.75 },
     high:   { label: 'High (thorough)',      maxIterations: 100, preferCheap: false, maxTokens: 8192, thinkingBudget: 10000, compactionThreshold: 0.9  },
   };
   ```
   - `DEFAULT_EFFORT = 'medium'` — matches current behavior exactly (50 iterations, no preferCheap, 4096 tokens)

2. Thread through `AgenticChatOptions.effort?` and `StreamingOptions.effort?`

3. In `agenticChat()`, use effort config as defaults (explicit options override):
   ```typescript
   const effortConfig = getEffortConfig(options?.effort ?? DEFAULT_EFFORT);
   const maxIterations = options?.maxIterations ?? effortConfig.maxIterations;
   const preferCheap = options?.preferCheap ?? effortConfig.preferCheap;
   ```

4. Add `/effort [low|medium|high]` slash command with help text

5. Add `effort?: EffortLevel` to `ReplState`, pass to `streamChat()`

**Tests**:
- Config values for each level
- Validation function
- Default is medium
- Thread-through: low effort limits iterations
- Thread-through: high effort allows more iterations

---

## Commit Strategy

One commit per improvement, conventional format:

1. `fix(tools): use StringDecoder in bash tool for correct multi-byte UTF-8 handling`
2. `feat(tools): persist large tool outputs to disk instead of silently truncating`
3. `feat(tools): isolate non-critical tool failures in batch execution`
4. `perf(core): reorder system prompt for cache-friendly prefix matching`
5. `feat(core): add effort levels for cost/quality tradeoff control`

---

## Verification

After each improvement:
```bash
npm run typecheck && npm test && npm run lint
```

After all improvements:
```bash
npm run build && npm run format:check
```
