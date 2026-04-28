# Update Plan for Alexi

Generated: 2026-04-14
Based on upstream commits: kilocode ba7b123f0..bd494f669 (219 commits), opencode 7cbe162..cb1a500 (49 commits)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 9 | Medium: 12 | Low: 4

## Changes

### 1. Add Effect-based ChildProcess spawner for bash tool
**File**: `src/tool/bash.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Upstream replaced Node.js `spawn` with Effect's `ChildProcess` for better error handling, resource management, and Windows compatibility.

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

### 2. Update tool registry to use Effect service pattern
**File**: `src/tool/registry.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Upstream refactored tool registry to resolve built tools through the Effect registry pattern, removing async facade exports.

**Current code**:
```typescript
export namespace ToolRegistry {
  export async function get(name: string) {
    // direct async implementation
  }
  
  export async function list() {
    // direct async implementation
  }
}
```

**New code**:
```typescript
import { Effect, Context, Layer } from "effect"
import { InstanceState } from "@/effect/instance-state"

export namespace ToolRegistry {
  export class Service extends Context.Tag("ToolRegistry.Service")<
    Service,
    {
      get: (name: string) => Effect.Effect<Tool | undefined>
      list: () => Effect.Effect<Tool[]>
      register: (tool: Tool) => Effect.Effect<void>
    }
  >() {}

  export const layer = Layer.effect(
    Service,
    Effect.gen(function* () {
      const state = yield* InstanceState.make<Map<string, Tool>>(
        Effect.succeed(new Map())
      )

      return {
        get: (name: string) =>
          Effect.gen(function* () {
            const s = yield* InstanceState.get(state)
            return s.get(name)
          }),
        list: () =>
          Effect.gen(function* () {
            const s = yield* InstanceState.get(state)
            return Array.from(s.values())
          }),
        register: (tool: Tool) =>
          Effect.gen(function* () {
            yield* InstanceState.update(state, (s) => {
              s.set(tool.name, tool)
              return s
            })
          }),
      }
    })
  )

  export const defaultLayer = layer
}
```

### 3. Fix Tool.define() wrapper accumulation on object-defined tools
**File**: `src/tool/tool.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Upstream fixed a bug where Tool.define() would accumulate wrappers on object-defined tools, causing performance issues and incorrect behavior.

**Current code**:
```typescript
export function define<T extends ToolDefinition>(
  name: string,
  definition: T
): Tool {
  return {
    name,
    ...definition,
    execute: async (params, ctx) => {
      // wrapper logic
      return definition.execute(params, ctx)
    }
  }
}
```

**New code**:
```typescript
const DEFINED_SYMBOL = Symbol.for("Tool.defined")

export function define<T extends ToolDefinition>(
  name: string,
  definition: T
): Tool {
  // Prevent wrapper accumulation on already-defined tools
  if ((definition as any)[DEFINED_SYMBOL]) {
    return definition as Tool
  }

  const tool = {
    name,
    ...definition,
    execute: async (params, ctx) => {
      // wrapper logic
      return definition.execute(params, ctx)
    },
    [DEFINED_SYMBOL]: true,
  }

  return tool
}
```

### 4. Update compaction agent to respond in same language as conversation
**File**: `src/agent/compaction.txt`
**Priority**: high
**Type**: feature
**Reason**: Upstream added instruction for compaction agent to respond in the user's language for better UX in non-English conversations.

**Current code**:
```text
Focus on information that would be helpful for continuing the conversation, including:
...
Your summary should be comprehensive enough to provide context but concise enough to be quickly understood.

Do not respond to any questions in the conversation, only output the summary.
```

**New code**:
```text
Focus on information that would be helpful for continuing the conversation, including:
...
Your summary should be comprehensive enough to provide context but concise enough to be quickly understood.

Do not respond to any questions in the conversation, only output the summary.
Respond in the same language the user used in the conversation.
```

### 5. Update Bus service to use InstanceState for directory
**File**: `src/bus/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream refactored Bus to get directory from InstanceState instead of static Instance.directory for better testability and Effect integration.

**Current code**:
```typescript
function publish<D extends BusEvent.Definition>(def: D, properties: z.output<D["properties"]>) {
  return Effect.gen(function* () {
    const state = yield* InstanceState.get(cache)
    const payload: Payload = { type: def.type, properties }
    
    // ...publish logic...
    
    GlobalBus.emit("event", {
      directory: Instance.directory,
      payload,
    })
  })
}
```

**New code**:
```typescript
function publish<D extends BusEvent.Definition>(def: D, properties: z.output<D["properties"]>) {
  return Effect.gen(function* () {
    const s = yield* InstanceState.get(state)
    const payload: Payload = { type: def.type, properties }
    
    // ...publish logic...
    
    const dir = yield* InstanceState.directory
    GlobalBus.emit("event", {
      directory: dir,
      payload,
    })
  })
}
```

### 6. Add session-scoped rules support to permission evaluation
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream added support for session-scoped permission rules in the evaluate function.

**Current code**:
```typescript
for (const pattern of request.patterns) {
  const rule = evaluate(request.permission, pattern, ruleset, approved)
  // ...
}
```

**New code**:
```typescript
for (const pattern of request.patterns) {
  const rule = evaluate(request.permission, pattern, ruleset, approved, local) // include session-scoped rules
  // ...
}

// Update evaluate function signature
function evaluate(
  permission: string,
  pattern: string,
  ruleset: Ruleset,
  approved: Set<string>,
  local?: Map<string, Rule> // session-scoped rules
): EvaluationResult {
  // Check local rules first
  if (local) {
    const localRule = local.get(`${permission}:${pattern}`)
    if (localRule) {
      return { action: localRule.action, source: "session" }
    }
  }
  // ... existing evaluation logic
}
```

### 7. Update Permission service to use injected Bus service
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream refactored Permission to inject Bus service via Effect layer instead of direct import for better testability.

**Current code**:
```typescript
export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const state = yield* InstanceState.make<State>(...)
    
    // Direct Bus.publish calls
    void Bus.publish(Event.Asked, info)
```

**New code**:
```typescript
export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const bus = yield* Bus.Service
    const state = yield* InstanceState.make<State>(...)
    
    // Use injected bus service
    yield* bus.publish(Event.Asked, info)
```

### 8. Add glob tool directory validation
**File**: `src/tool/glob.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Upstream added validation to ensure glob path is a directory, not a file.

**Current code**:
```typescript
execute: (params: { pattern: string; path?: string }, ctx: Tool.Context) =>
  Effect.gen(function* () {
    let search = params.path ?? Instance.directory
    search = path.isAbsolute(search) ? search : path.resolve(Instance.directory, search)
    yield* assertExternalDirectoryEffect(ctx, search, { kind: "directory" })
    // ...
  })
```

**New code**:
```typescript
execute: (params: { pattern: string; path?: string }, ctx: Tool.Context) =>
  Effect.gen(function* () {
    const ins = yield* InstanceState.context
    let search = params.path ?? ins.directory
    search = path.isAbsolute(search) ? search : path.resolve(ins.directory, search)
    
    const info = yield* fs.stat(search).pipe(Effect.catch(() => Effect.succeed(undefined)))
    if (info?.type === "File") {
      throw new Error(`glob path must be a directory: ${search}`)
    }
    
    yield* assertExternalDirectoryEffect(ctx, search, { kind: "directory" })
    // ...
  })
```

### 9. Update grep tool to use Effect-based ripgrep service
**File**: `src/tool/grep.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream significantly refactored grep tool to use streamed ripgrep search parsing with Effect.

**Current code**:
```typescript
import { Ripgrep } from "../file/ripgrep"

// Direct ripgrep calls with callback-based parsing
const results = await Ripgrep.search({
  pattern: params.pattern,
  cwd: search,
  // ...
})
```

**New code**:
```typescript
import { Effect, Stream } from "effect"
import { Ripgrep } from "../file/ripgrep"

// Streamed ripgrep search with Effect
const results = yield* rg.search({
  pattern: params.pattern,
  cwd: search,
  signal: ctx.abort,
}).pipe(
  Stream.take(limit + 1),
  Stream.runCollect,
  Effect.map((chunk) => {
    const arr = Array.from(chunk)
    if (arr.length > limit) {
      truncated = true
      return arr.slice(0, limit)
    }
    return arr
  })
)
```

### 10. Add abort signal support to glob tool
**File**: `src/tool/glob.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream added abort signal propagation to ripgrep file listing for cancellation support.

**Current code**:
```typescript
const files = yield* rg.files({ cwd: search, glob: [params.pattern] }).pipe(
  Stream.take(limit + 1),
  // ...
)
```

**New code**:
```typescript
const files = yield* rg.files({ cwd: search, glob: [params.pattern], signal: ctx.abort }).pipe(
  Stream.take(limit + 1),
  // ...
)
```

### 11. Update external directory assertion to use InstanceState
**File**: `src/tool/external-directory.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream refactored to get instance context from InstanceState instead of static Instance.

**Current code**:
```typescript
import { Instance } from "../project/instance"

export const assertExternalDirectoryEffect = Effect.fn("Tool.assertExternalDirectory")(
  function* (ctx: Tool.Context, target: string, options?: Options) {
    if (options?.bypass) return

    const full = process.platform === "win32" ? AppFileSystem.normalizePath(target) : target
    if (Instance.containsPath(full)) return
    // ...
  }
)
```

**New code**:
```typescript
import { InstanceState } from "@/effect/instance-state"
import { Instance } from "../project/instance"

export const assertExternalDirectoryEffect = Effect.fn("Tool.assertExternalDirectory")(
  function* (ctx: Tool.Context, target: string, options?: Options) {
    if (options?.bypass) return

    const ins = yield* InstanceState.context
    const full = process.platform === "win32" ? AppFileSystem.normalizePath(target) : target
    if (Instance.containsPath(full, ins)) return
    // ...
  }
)
```

### 12. Update Agent service to use injected Provider service
**File**: `src/agent/index.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Upstream refactored Agent to inject Provider service via Effect layer instead of direct static calls.

**Current code**:
```typescript
const model = input.model ?? (yield* Effect.promise(() => Provider.defaultModel()))
const resolved = yield* Effect.promise(() => Provider.getModel(model.providerID, model.modelID))
const language = yield* Effect.promise(() => Provider.getLanguage(resolved))
```

**New code**:
```typescript
const provider = yield* Provider.Service

const model = input.model ?? (yield* provider.defaultModel())
const resolved = yield* provider.getModel(model.providerID, model.modelID)
const language = yield* provider.getLanguage(resolved)
```

### 13. Update Agent layer to include Provider dependency
**File**: `src/agent/index.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Upstream added Provider.defaultLayer to Agent's layer dependencies.

**Current code**:
```typescript
export const defaultLayer = layer.pipe(
  Layer.provide(Auth.defaultLayer),
  Layer.provide(Config.defaultLayer),
  Layer.provide(Skill.defaultLayer),
)
```

**New code**:
```typescript
export const defaultLayer = layer.pipe(
  Layer.provide(Plugin.defaultLayer),
  Layer.provide(Provider.defaultLayer),
  Layer.provide(Auth.defaultLayer),
  Layer.provide(Config.defaultLayer),
  Layer.provide(Skill.defaultLayer),
)
```

### 14. Add Plugin service injection to Agent
**File**: `src/agent/index.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Upstream refactored Agent to inject Plugin service for trigger calls instead of direct static
{"prompt_tokens":33689,"completion_tokens":4096,"total_tokens":37785}

[Session: 0bfbd49d-7567-43f0-835b-483bc6d3ac2b]
[Messages: 2, Tokens: 37785]
