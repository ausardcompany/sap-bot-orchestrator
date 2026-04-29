# Update Plan for Alexi

Generated: 2026-04-29
Based on upstream commits: kilocode (34787b484, 1412583ce, d94ebcf29, be0ea1990, and 120+ more), opencode (65ba1f6, d37e5af, d71b827, 504ca3d, and 28+ more)

## Summary
- Total changes planned: 24
- Critical: 2 | High: 8 | Medium: 10 | Low: 4

## Changes

### 1. Migrate BusEvent Definitions from Zod to Effect Schema
**File**: `src/bus/bus-event.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Upstream has migrated from Zod to Effect Schema for event definitions. This is a foundational change that affects the entire event bus system.

**Current code**:
```typescript
import z from "zod"
import type { ZodType } from "zod"

export type Definition = ReturnType<typeof define>

const registry = new Map<string, Definition>()

export function define<Type extends string, Properties extends ZodType>(type: Type, properties: Properties) {
  const result = {
    type,
    properties,
  }
  registry.set(type, result)
  return result
}
```

**New code**:
```typescript
import z from "zod"
import { Schema } from "effect"
import { zodObject } from "@/util/effect-zod"

export type Definition<Type extends string = string, Properties extends Schema.Top = Schema.Top> = {
  type: Type
  properties: Properties
}

const registry = new Map<string, Definition>()

export function define<Type extends string, Properties extends Schema.Top>(
  type: Type,
  properties: Properties,
): Definition<Type, Properties> {
  const result = { type, properties }
  registry.set(type, result)
  return result
}

export function payloads() {
  return [...registry.entries()].map(([type, def]) => {
    return z
      .object({
        type: z.literal(type),
        properties: zodObject(def.properties),
      })
      .meta({
        ref: `Event.${def.type}`,
      })
  })
}
```

### 2. Update Bus Interface for Effect Schema Types
**File**: `src/bus/index.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Bus publish/subscribe methods need to work with Effect Schema types instead of Zod infer types.

**Current code**:
```typescript
import z from "zod"
import { Effect, Exit, Layer, PubSub, Scope, Context, Stream } from "effect"

export const InstanceDisposed = BusEvent.define(
  "server.instance.disposed",
  z.object({
    directory: z.string(),
  }),
)

type Payload<D extends BusEvent.Definition = BusEvent.Definition> = {
  type: D["type"]
  properties: z.infer<D["properties"]>
}

export interface Interface {
  readonly publish: <D extends BusEvent.Definition>(
    def: D,
    properties: z.output<D["properties"]>,
  ) => Effect.Effect<void>
  // ...
}
```

**New code**:
```typescript
import { Effect, Exit, Layer, PubSub, Scope, Context, Stream, Schema } from "effect"
import { EffectBridge } from "@/effect"
import { Log } from "../util"
import { BusEvent } from "./bus-event"

const log = Log.create({ service: "bus" })

type BusProperties<D extends BusEvent.Definition<string, Schema.Top>> = Schema.Schema.Type<D["properties"]>

export const InstanceDisposed = BusEvent.define(
  "server.instance.disposed",
  Schema.Struct({
    directory: Schema.String,
  }),
)

type Payload<D extends BusEvent.Definition = BusEvent.Definition> = {
  type: D["type"]
  properties: BusProperties<D>
}

export interface Interface {
  readonly publish: <D extends BusEvent.Definition>(def: D, properties: BusProperties<D>) => Effect.Effect<void>
  readonly subscribe: <D extends BusEvent.Definition>(def: D) => Stream.Stream<Payload<D>>
  readonly subscribeAll: () => Stream.Stream<Payload>
  readonly subscribeCallback: <D extends BusEvent.Definition>(
    def: D,
    callback: (payload: Payload<D>) => void,
  ) => Effect.Effect<void>
}
```

### 3. Fix Memory Leak in Bash Tool - Release Parsed Syntax Trees
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Memory leak fix - parsed syntax trees must be released after use to prevent memory accumulation.

**Current code**:
```typescript
const parse = Effect.fn("BashTool.parse")(function* (command: string, ps: boolean) {
  const tree = yield* Effect.promise(() => parser().then((p) => (ps ? p.ps : p.bash).parse(command)))
  if (!tree) throw new Error("Failed to parse command")
  return tree.rootNode
})

// In execute:
const root = yield* parse(params.command, ps)
const scan = yield* collect(root, cwd, ps, shell)
if (!Instance.containsPath(cwd)) scan.dirs.add(cwd)
yield* ask(ctx, scan)
```

**New code**:
```typescript
const parse = Effect.fn("BashTool.parse")(function* (command: string, ps: boolean) {
  const tree = yield* Effect.promise(() => parser().then((p) => (ps ? p.ps : p.bash).parse(command)))
  if (!tree) throw new Error("Failed to parse command")
  return tree
})

// In execute:
yield* Effect.scoped(
  Effect.gen(function* () {
    const tree = yield* Effect.acquireRelease(parse(params.command, ps), (tree) =>
      Effect.sync(() => tree.delete()),
    )
    const scan = yield* collect(tree.rootNode, cwd, ps, shell)
    if (!Instance.containsPath(cwd)) scan.dirs.add(cwd)
    yield* ask(ctx, scan)
  }),
)
```

### 4. Migrate Tool Parameters to Effect Schema
**File**: `src/tool/tool.ts`
**Priority**: high
**Type**: refactor
**Reason**: Tool framework migrated to Effect Schema for parameter definitions, affecting all 18+ built-in tools.

**Current code**:
```typescript
import z from "zod"

export type Info<TParams extends z.ZodType = z.ZodType, TMeta = unknown> = {
  name: string
  description: string
  parameters: TParams
  execute: (params: z.infer<TParams>, ctx: Context) => Effect.Effect<ExecuteResult<TMeta>>
}

export function define<TParams extends z.ZodType, TMeta, TError, TName extends string>(
  name: TName,
  info: Effect.Effect<Omit<Info<TParams, TMeta>, "name">, TError>,
) {
  // ...
}
```

**New code**:
```typescript
import { Schema } from "effect"
import { zodObject } from "@/util/effect-zod"

export type Info<TParams extends Schema.Top = Schema.Top, TMeta = unknown> = {
  name: string
  description: string
  parameters: TParams
  execute: (params: Schema.Schema.Type<TParams>, ctx: Context) => Effect.Effect<ExecuteResult<TMeta>>
}

export function define<TParams extends Schema.Top, TMeta, TError, TName extends string>(
  name: TName,
  info: Effect.Effect<Omit<Info<TParams, TMeta>, "name">, TError>,
) {
  // Implementation updated to use Effect Schema
}

// Helper to convert Effect Schema to Zod for OpenAPI compatibility
export function parametersToZod<T extends Schema.Top>(schema: T) {
  return zodObject(schema)
}
```

### 5. Update Semantic Search Tool Parameters
**File**: `src/tool/semantic-search.ts`
**Priority**: high
**Type**: refactor
**Reason**: Semantic search tool parameters migrated to Effect Schema format.

**Current code**:
```typescript
import z from "zod"

const Parameters = z.object({
  query: z.string().describe("The search query, expressed in natural language."),
  path: z
    .string()
    .optional()
    .describe(
      "Limit search to specific subdirectory (relative to the current workspace directory). Leave empty for entire workspace.",
    ),
})
```

**New code**:
```typescript
import { Schema } from "effect"

const Parameters = Schema.Struct({
  query: Schema.String.annotate({
    description: "The search query, expressed in natural language.",
  }),
  path: Schema.optional(Schema.String).annotate({
    description:
      "Limit search to specific subdirectory (relative to the current workspace directory). Leave empty for entire workspace.",
  }),
})

// Update execute signature
execute: (
  params: Schema.Schema.Type<typeof Parameters>,
  ctx: Tool.Context,
): Effect.Effect<Tool.ExecuteResult<Meta>> =>
  Effect.gen(function* () {
    // ...
  })
```

### 6. Refactor Tool Registry for Lazy Semantic Tool Loading
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: refactor
**Reason**: Tool registry now lazily loads semantic search tool to keep indexing startup responsive and isolate indexing from tool registry.

**Current code**:
```typescript
import { SemanticSearchTool } from "@/kilocode/tool/semantic-search"

export namespace KiloToolRegistry {
  export function infos() {
    return Effect.gen(function* () {
      const codebase = yield* CodebaseSearchTool
      const semantic = yield* SemanticSearchTool
      const recall = yield* RecallTool
      return { codebase, semantic, recall }
    })
  }

  export function build(tools: { codebase: Tool.Info; semantic: Tool.Info; recall: Tool.Info }) {
    return Effect.all({
      codebase: Tool.init(tools.codebase),
      semantic: Tool.init(tools.semantic),
      recall: Tool.init(tools.recall),
    })
  }
}
```

**New code**:
```typescript
import { Log } from "@/util"
import { Agent } from "@/agent/agent"
import * as Truncate from "@/tool/truncate"

const log = Log.create({ service: "tool-registry" })
type Deps = { agent: Agent.Interface; truncate: Truncate.Interface }

export namespace ToolRegistry {
  export function infos() {
    return Effect.gen(function* () {
      const codebase = yield* CodebaseSearchTool
      const recall = yield* RecallTool
      return { codebase, recall }
    })
  }

  export function build(tools: { codebase: Tool.Info; recall: Tool.Info }, deps: Deps) {
    return Effect.gen(function* () {
      const base = yield* Effect.all({
        codebase: Tool.init(tools.codebase),
        recall: Tool.init(tools.recall),
      })
      const semantic = yield* semanticTool(deps)
      return { ...base, semantic }
    })
  }

  function semanticTool(deps: Deps) {
    return Effect.gen(function* () {
      // Lazy load semantic search only when indexing is ready
      const indexing = yield* Effect.serviceOption(KiloIndexing)
      if (indexing._tag === "None") {
        log.debug("Semantic search not available - indexing not initialized")
        return undefined
      }
      // Initialize semantic search tool with deps
      return yield* SemanticSearchTool.init(deps)
    })
  }
}
```

### 7. Add Configurable Tool Output Truncation Limits
**File**: `src/tool/truncate.ts`
**Priority**: high
**Type**: feature
**Reason**: New feature allowing configurable tool output truncation limits for better control over context window usage.

**Current code**:
```typescript
const DEFAULT_MAX_LINES = 500
const DEFAULT_MAX_BYTES = 50000

export function truncate(output: string): string {
  // Fixed truncation logic
}
```

**New code**:
```typescript
import { Config } from "@/config/config"

export interface TruncationConfig {
  maxLines: number
  maxBytes: number
  toolSpecific?: Record<string, { maxLines?: number; maxBytes?: number }>
}

const DEFAULT_CONFIG: TruncationConfig = {
  maxLines: 500,
  maxBytes: 50000,
}

export function truncate(output: string, toolName?: string): string {
  return Effect.gen(function* () {
    const config = yield* Config
    const truncateConfig = config.truncation ?? DEFAULT_CONFIG
    
    let maxLines = truncateConfig.maxLines
    let maxBytes = truncateConfig.maxBytes
    
    // Apply tool-specific overrides if available
    if (toolName && truncateConfig.toolSpecific?.[toolName]) {
      const toolConfig = truncateConfig.toolSpecific[toolName]
      maxLines = toolConfig.maxLines ?? maxLines
      maxBytes = toolConfig.maxBytes ?? maxBytes
    }
    
    return truncateWithLimits(output, maxLines, maxBytes)
  })
}

function truncateWithLimits(text: string, maxLines: number, maxBytes: number): string {
  // Truncation implementation
}
```

### 8. Update Permission Handler for Stale Permission Cleanup
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix for stale permission prompts that could leave VS Code approvals stuck. Permissions now clear properly instead of hanging.

**Current code**:
```typescript
export function handlePermissionRequest(request: PermissionRequest) {
  return Effect.gen(function* () {
    // Direct permission handling
    const result = yield* promptUser(request)
    return result
  })
}
```

**New code**:
```typescript
import { Duration } from "effect"

const PERMISSION_TIMEOUT = Duration.minutes(5)

export function handlePermissionRequest(request: PermissionRequest) {
  return Effect.gen(function* () {
    // Add timeout to prevent stale prompts
    const result = yield* Effect.timeoutOption(
      promptUser(request),
      PERMISSION_TIMEOUT
    )
    
    if (result._tag === "None") {
      // Permission prompt timed out - clear it and deny
      yield* clearStalePermission(request.id)
      return { granted: false, reason: "timeout" }
    }
    
    return result.value
  })
}

function clearStalePermission(permissionId: string) {
  return Effect.gen(function* () {
    const bus = yield* Bus
    yield* bus.publish(PermissionCleared, { permissionId })
  })
}

// New event for permission clearing
export const PermissionCleared = BusEvent.define(
  "permission.cleared",
  Schema.Struct({
    permissionId: Schema.String,
  }),
)
```

### 9. Add Effect-Zod Bridge Utilities
**File**: `src/util/effect-zod.ts`
**Priority**: high
**Type**: feature
**Reason**: New utilities needed for bridging Effect Schema to Zod for OpenAPI compatibility and gradual migration.

**New code**:
```typescript
import { Schema } from "effect"
import z from "zod"

/**
 * Convert an Effect Schema struct to a Zod object schema
 * Used for OpenAPI generation compatibility during migration
 */
export function zodObject<T extends Schema.Struct.Fields>(schema: Schema.Struct<T>): z.ZodObject<any> {
  const fields = Schema.Struct.fields(schema)
  const zodFields: Record<string, z.ZodTypeAny> = {}
  
  for (const [key, field] of Object.entries(fields)) {
    zodFields[key] = effectSchemaToZod(field)
{"prompt_tokens":23177,"completion_tokens":4096,"total_tokens":27273}

[Session: d013d6fb-f306-47a0-9d2b-53e15e20f2fc]
[Messages: 2, Tokens: 27273]
