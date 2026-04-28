# Update Plan for Alexi

Generated: 2026-04-02
Based on upstream commits: kilocode c27c81a2b, opencode 0f48899

## Summary
- Total changes planned: 12
- Critical: 1 | High: 4 | Medium: 5 | Low: 2

## Changes

### 1. Refactor Bash Tool to Use Effect ChildProcess
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: refactor
**Reason**: Opencode has migrated from Node.js `spawn` to Effect's `ChildProcess` for better error handling, resource management, and consistency with the Effect ecosystem. This provides better cancellation support and structured concurrency.

**Current code**:
```typescript
import { spawn } from "child_process"

function launch(shell: string, name: string, command: string, cwd: string, env: NodeJS.ProcessEnv) {
  if (process.platform === "win32" && PS.has(name)) {
    return spawn(shell, ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", command], {
      cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"],
      detached: false,
      windowsHide: true,
    })
  }

  return spawn(command, {
    shell,
    cwd,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
    windowsHide: process.platform === "win32",
  })
}
```

**New code**:
```typescript
import { Cause, Effect, Exit, Stream } from "effect"
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process"
import * as CrossSpawnSpawner from "@/effect/cross-spawn-spawner"

function cmd(shell: string, name: string, command: string, cwd: string, env: NodeJS.ProcessEnv) {
  if (process.platform === "win32" && PS.has(name)) {
    return ChildProcess.make(shell, ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", command], {
      cwd,
      env,
      stdin: "ignore",
      detached: false,
    })
  }

  return ChildProcess.make(command, [], {
    shell,
    cwd,
    env,
    stdin: "ignore",
    detached: process.platform !== "win32",
  })
}
```

### 2. Add Cross-Spawn Spawner Effect Module
**File**: `src/effect/cross-spawn-spawner.ts`
**Priority**: high
**Type**: feature
**Reason**: Required dependency for the new Effect-based bash tool execution. Replaces `require()` with dynamic `import()` for ESM compatibility.

**New code**:
```typescript
import { Effect, Layer } from "effect"
import { ChildProcessSpawner, ChildProcessSpawnerTypeId } from "effect/unstable/process"
import type { SpawnOptions } from "child_process"

const make = Effect.gen(function* () {
  const crossSpawn = yield* Effect.promise(async () => {
    const mod = await import("cross-spawn")
    return mod.default
  })

  return {
    [ChildProcessSpawnerTypeId]: ChildProcessSpawnerTypeId,
    spawn: (command: string, args: ReadonlyArray<string>, options?: SpawnOptions) => {
      return crossSpawn(command, args as string[], options)
    },
  } satisfies ChildProcessSpawner
})

export const layer = Layer.effect(ChildProcessSpawner, make)

export const CrossSpawnSpawner = {
  layer,
}
```

### 3. Update Instruction Service to Effect Pattern
**File**: `src/tool/read.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Opencode renamed `InstructionPrompt` to `Instruction` as part of migrating to Effect service pattern. This improves consistency and follows Effect best practices.

**Current code**:
```typescript
import { InstructionPrompt } from "../session/instruction"

// In the tool execution:
const instructions = await InstructionPrompt.resolve(ctx.messages, filepath, ctx.messageID)
```

**New code**:
```typescript
import { Instruction } from "../session/instruction"

// In the tool execution:
const instructions = await Instruction.resolve(ctx.messages, filepath, ctx.messageID)
```

### 4. Add Compaction Agent Language Matching
**File**: `src/agent/prompt/compaction.txt`
**Priority**: medium
**Type**: feature
**Reason**: The compaction agent should respond in the same language the user used in the conversation for better UX with international users.

**Current code**:
```text
Focus on information that would be helpful for continuing the conversation, including:
...
Do not respond to any questions in the conversation, only output the summary.
```

**New code**:
```text
Focus on information that would be helpful for continuing the conversation, including:
...
Do not respond to any questions in the conversation, only output the summary.
Respond in the same language the user used in the conversation.
```

### 5. Standardize InstanceState Variable Naming
**File**: `src/bus/index.ts`
**Priority**: low
**Type**: refactor
**Reason**: Opencode standardized InstanceState variable names from `cache` to `state` for clarity and consistency across the codebase.

**Current code**:
```typescript
export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const cache = yield* InstanceState.make<State>(
      Effect.fn("Bus.state")(function* (ctx) {
        // ...
      })
    )

    function publish<D extends BusEvent.Definition>(def: D, properties: z.output<D["properties"]>) {
      return Effect.gen(function* () {
        const state = yield* InstanceState.get(cache)
        // ...
      })
    }
  })
)
```

**New code**:
```typescript
export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const state = yield* InstanceState.make<State>(
      Effect.fn("Bus.state")(function* (ctx) {
        // ...
      })
    )

    function publish<D extends BusEvent.Definition>(def: D, properties: z.output<D["properties"]>) {
      return Effect.gen(function* () {
        const s = yield* InstanceState.get(state)
        // ...
      })
    }

    function subscribe<D extends BusEvent.Definition>(def: D) {
      return Stream.unwrap(
        Effect.gen(function* () {
          const s = yield* InstanceState.get(state)
          const ps = yield* getOrCreate(s, def)
          return Stream.fromPubSub(ps)
        }),
      )
    }
  })
)
```

### 6. Add Bash Tool Tests
**File**: `src/tool/bash.test.ts`
**Priority**: medium
**Type**: feature
**Reason**: Opencode added comprehensive tests for the bash tool. These tests validate the Effect-based execution and ensure proper behavior.

**New code**:
```typescript
import { describe, it, expect } from "vitest"
import { Effect, Layer, Exit } from "effect"
import { BashTool } from "./bash"
import * as CrossSpawnSpawner from "@/effect/cross-spawn-spawner"

describe("BashTool", () => {
  const testLayer = CrossSpawnSpawner.layer

  it("should execute simple commands", async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const output = yield* BashTool.execute({
          command: "echo 'hello world'",
          cwd: process.cwd(),
        })
        return output
      }).pipe(Effect.provide(testLayer))
    )

    expect(result.stdout).toContain("hello world")
    expect(result.exitCode).toBe(0)
  })

  it("should handle command timeout", async () => {
    const result = await Effect.runPromiseExit(
      Effect.gen(function* () {
        yield* BashTool.execute({
          command: "sleep 10",
          cwd: process.cwd(),
          timeout: 100,
        })
      }).pipe(Effect.provide(testLayer))
    )

    expect(Exit.isFailure(result)).toBe(true)
  })

  it("should capture stderr", async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const output = yield* BashTool.execute({
          command: "echo 'error' >&2",
          cwd: process.cwd(),
        })
        return output
      }).pipe(Effect.provide(testLayer))
    )

    expect(result.stderr).toContain("error")
  })

  it("should respect working directory", async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const output = yield* BashTool.execute({
          command: "pwd",
          cwd: "/tmp",
        })
        return output
      }).pipe(Effect.provide(testLayer))
    )

    expect(result.stdout).toContain("/tmp")
  })
})
```

### 7. Prevent Agent Loop Stopping After Tool Calls with OpenAI-Compatible Providers
**File**: `src/providers/openai-compatible.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Critical fix from opencode that prevents the agent loop from incorrectly stopping after tool calls when using OpenAI-compatible providers (including SAP AI Core). This ensures proper continuation of multi-step agent workflows.

**Current code**:
```typescript
async function processResponse(response: OpenAIResponse, context: AgentContext) {
  const message = response.choices[0]?.message
  
  if (message.tool_calls && message.tool_calls.length > 0) {
    // Process tool calls
    const toolResults = await executeToolCalls(message.tool_calls, context)
    
    // Check if we should continue - BUG: may incorrectly stop here
    if (response.choices[0]?.finish_reason === "tool_calls") {
      return { shouldContinue: false, results: toolResults }
    }
  }
  
  return { shouldContinue: true, results: [] }
}
```

**New code**:
```typescript
async function processResponse(response: OpenAIResponse, context: AgentContext) {
  const message = response.choices[0]?.message
  
  if (message.tool_calls && message.tool_calls.length > 0) {
    // Process tool calls
    const toolResults = await executeToolCalls(message.tool_calls, context)
    
    // Always continue after tool calls to let the model process results
    // The model will indicate completion via finish_reason="stop" in subsequent response
    return { shouldContinue: true, results: toolResults }
  }
  
  // Only stop when there are no tool calls and finish_reason indicates completion
  const shouldContinue = response.choices[0]?.finish_reason !== "stop"
  return { shouldContinue, results: [] }
}
```

### 8. Add FileTime Path Normalization for Windows Compatibility
**File**: `src/file/time.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fixes Windows path mismatch issues by normalizing file paths. This is important for cross-platform compatibility, especially when running on Windows environments.

**Current code**:
```typescript
export class FileTime {
  private times: Map<string, number> = new Map()

  set(filepath: string, time: number) {
    this.times.set(filepath, time)
  }

  get(filepath: string): number | undefined {
    return this.times.get(filepath)
  }
}
```

**New code**:
```typescript
import path from "path"

export class FileTime {
  private times: Map<string, number> = new Map()

  private normalize(filepath: string): string {
    // Normalize path separators for cross-platform consistency
    return path.normalize(filepath).replace(/\\/g, "/")
  }

  set(filepath: string, time: number) {
    this.times.set(this.normalize(filepath), time)
  }

  get(filepath: string): number | undefined {
    return this.times.get(this.normalize(filepath))
  }

  has(filepath: string): boolean {
    return this.times.has(this.normalize(filepath))
  }

  delete(filepath: string): boolean {
    return this.times.delete(this.normalize(filepath))
  }
}
```

### 9. Update Tool Registry to Use Effect Services
**File**: `src/tool/registry.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Aligns with opencode's pattern of using Effect services instead of async facades for better composability and error handling.

**Current code**:
```typescript
export class ToolRegistry {
  private tools: Map<string, Tool> = new Map()

  async register(tool: Tool): Promise<void> {
    this.tools.set(tool.name, tool)
  }

  async get(name: string): Promise<Tool | undefined> {
    return this.tools.get(name)
  }

  async list(): Promise<Tool[]> {
    return Array.from(this.tools.values())
  }
}
```

**New code**:
```typescript
import { Effect, Context, Layer } from "effect"

export interface ToolRegistry {
  readonly register: (tool: Tool) => Effect.Effect<void>
  readonly get: (name: string) => Effect.Effect<Tool | undefined>
  readonly list: () => Effect.Effect<Tool[]>
}

export const ToolRegistry = Context.GenericTag<ToolRegistry>("ToolRegistry")

export const makeToolRegistry = Effect.gen(function* () {
  const tools = new Map<string, Tool>()

  return ToolRegistry.of({
    register: (tool: Tool) =>
      Effect.sync(() => {
        tools.set(tool.name, tool)
      }),
    get: (name: string) =>
      Effect.sync(() => tools.get(name)),
    list: () =>
      Effect.sync(() => Array.from(tools.values())),
  })
})

export const ToolRegistryLive = Layer.effect(ToolRegistry, makeToolRegistry)
```

### 10. Add Batch Snapshot Revert Without Reordering
**File**: `src/snapshot/index.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fixes an issue where batch snapshot reverts could reorder operations, causing inconsistent state. Critical for undo/redo functionality.

**Current code**:
```typescript
async function revertSnapshots(snapshotIds: string[]): Promise<void> {
  const reverts = snapshotIds.map(id => revertSnapshot(id))
  await Promise.all(reverts)
}
```

**New code**:
```typescript
import { Effect, Array as EffectArray } from "effect"

function revertSnapshots(snapshotIds: string[]): Effect.Effect<void, RevertError> {
  // Process reverts sequentially to maintain order
  return Effect.gen(function* () {
    for (const id of snapshotIds) {
      yield* revertSnapshot(id)
    }
  })
}

// Alternative batch version that preserves order using Effect
function revertSnapshotsBatch(snapshotIds: string[]): Effect.Effect<void[], RevertError> {
  return Effect.forEach(snapshotIds, revertSnapshot, { concurrency: 1 })
}
```

### 11. Add User-Agent Headers for Cloudflare Providers
**File**: `src/providers/cloudflare.ts`
**Priority**: medium
**Type**: feature
**Reason**: Adds proper User-Agent headers when making requests to Cloudflare-based providers, which may be required for rate limiting and analytics purposes.

**New code**:
```typescript
import { version } from "../../package.json"

export const CLOUDFLARE_USER_AGENT = `Alexi/${version}`

export function createCloudflareHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
  return {
    "User-Agent":
{"prompt_tokens":13078,"completion_tokens":4096,"total_tokens":17174}

[Session: ab1c4ea9-c2fb-4557-8233-e1420d10736c]
[Messages: 2, Tokens: 17174]
