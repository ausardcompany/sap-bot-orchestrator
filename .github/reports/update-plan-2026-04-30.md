# Update Plan for Alexi

Generated: 2026-04-30
Based on upstream commits: kilocode (2a6c3e7d5..82254696e - 245 commits), opencode (9d1f17d..908e281 - 64 commits)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Migrate BusEvent to Effect Schema
**File**: `src/bus/bus-event.ts`
**Priority**: critical
**Type**: refactor
**Reason**: The event bus now uses Effect Schema instead of Zod for type definitions. This is a foundational change that affects event publishing and subscription across the system.

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
  return registry
    .entries()
    .map(([type, def]) =>
      z
        .object({
          type: z.literal(type),
          properties: zodObject(def.properties),
        })
        .meta({
          ref: `Event.${def.type}`,
        }),
    )
    .toArray()
}

export function effectPayloads() {
  return registry
    .entries()
    .map(([type, def]) =>
      Schema.Struct({
        type: Schema.Literal(type),
        properties: def.properties,
      }).annotate({ identifier: `Event.${type}` }),
    )
    .toArray()
}
```

---

### 2. Update Bus Index with Effect Schema Types
**File**: `src/bus/index.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Bus publish/subscribe signatures must align with new Effect Schema-based event definitions.

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
}
```

**New code**:
```typescript
import { Effect, Exit, Layer, PubSub, Scope, Context, Stream, Schema } from "effect"
import { EffectBridge } from "@/effect"
import { Log } from "../util"
import { BusEvent } from "./bus-event"

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
  ) => Effect.Effect<void, never, Scope.Scope>
}
```

---

### 3. Fix Bash Tool Memory Leak - Release Parsed Syntax Trees
**File**: `src/tool/bash.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Memory leak fix - parsed syntax trees must be released after use to prevent memory exhaustion during long-running sessions.

**Current code**:
```typescript
const parse = Effect.fn("BashTool.parse")(function* (command: string, ps: boolean) {
  const tree = yield* Effect.promise(() => parser().then((p) => (ps ? p.ps : p.bash).parse(command)))
  if (!tree) throw new Error("Failed to parse command")
  return tree.rootNode
})
```

**New code**:
```typescript
const parse = Effect.fn("BashTool.parse")(function* (command: string, ps: boolean) {
  const tree = yield* Effect.promise(() => parser().then((p) => (ps ? p.ps : p.bash).parse(command)))
  if (!tree) throw new Error("Failed to parse command")
  return tree
})

// In the tool execution:
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

---

### 4. Add PositiveInt Schema Type for Bash Timeout
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: refactor
**Reason**: Use proper schema validation for timeout parameter to ensure positive integers only.

**Current code**:
```typescript
export const Parameters = Schema.Struct({
  command: Schema.String.annotate({ description: "The command to execute" }),
  timeout: Schema.optional(Schema.Number).annotate({ description: "Optional timeout in milliseconds" }),
})
```

**New code**:
```typescript
import { PositiveInt } from "@/util/schema"

export const Parameters = Schema.Struct({
  command: Schema.String.annotate({ description: "The command to execute" }),
  timeout: Schema.optional(PositiveInt).annotate({ description: "Optional timeout in milliseconds" }),
  workdir: Schema.optional(Schema.String).annotate({
    description: `The working directory to run the command in. Defaults to the current directory. Use this instead of 'cd' commands.`,
  }),
})
```

---

### 5. Add Schema Utility for PositiveInt and NonNegativeInt
**File**: `src/util/schema.ts`
**Priority**: high
**Type**: feature
**Reason**: Consolidated integer schema types for consistent validation across tools.

**New code**:
```typescript
import { Schema } from "effect"

export const PositiveInt = Schema.Int.pipe(
  Schema.positive(),
  Schema.annotate({ identifier: "PositiveInt" })
)

export const NonNegativeInt = Schema.Int.pipe(
  Schema.nonNegative(),
  Schema.annotate({ identifier: "NonNegativeInt" })
)
```

---

### 6. Remove Codesearch Tool
**File**: `src/tool/codesearch.ts`
**Priority**: high
**Type**: refactor
**Reason**: Codesearch tool has been removed from opencode upstream as it was broken. Remove to align with upstream.

**Current code**:
```typescript
// Full codesearch.ts file
export const CodesearchTool = Tool.define(...)
```

**New code**:
```typescript
// Delete file entirely or replace with deprecation notice
// File: src/tool/codesearch.ts - DELETE
```

---

### 7. Update Tool Registry to Remove Codesearch
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: refactor
**Reason**: Remove codesearch from default tool registry since tool is removed.

**Current code**:
```typescript
import { CodesearchTool } from "./codesearch"

const defaultTools = [
  // ...
  CodesearchTool,
  // ...
]
```

**New code**:
```typescript
// Remove CodesearchTool import and from defaultTools array
const defaultTools = [
  // ... other tools without CodesearchTool
]
```

---

### 8. Update Agent Default Permissions - Remove Codesearch
**File**: `src/agent/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: Remove codesearch from default agent permissions since tool is removed.

**Current code**:
```typescript
permission: {
  bash: "allow",
  webfetch: "allow",
  websearch: "allow",
  codesearch: "allow",
  read: "allow",
}
```

**New code**:
```typescript
permission: {
  bash: "allow",
  webfetch: "allow",
  websearch: "allow",
  read: "allow",
}
```

---

### 9. Add Configurable Tool Output Truncation Limits
**File**: `src/tool/truncate.ts`
**Priority**: high
**Type**: feature
**Reason**: Allow configuring tool output truncation limits for different use cases.

**Current code**:
```typescript
export const DEFAULT_MAX_LINES = 1000
export const DEFAULT_MAX_BYTES = 100000

export function truncate(text: string): string {
  // fixed truncation logic
}
```

**New code**:
```typescript
import { Config } from "../config"

export const DEFAULT_MAX_LINES = 1000
export const DEFAULT_MAX_BYTES = 100000

export interface TruncateOptions {
  maxLines?: number
  maxBytes?: number
}

export function truncate(text: string, options?: TruncateOptions): string {
  const maxLines = options?.maxLines ?? DEFAULT_MAX_LINES
  const maxBytes = options?.maxBytes ?? DEFAULT_MAX_BYTES
  
  let result = text
  
  // Truncate by bytes first
  if (Buffer.byteLength(result, 'utf8') > maxBytes) {
    const buffer = Buffer.from(result, 'utf8')
    result = buffer.subarray(0, maxBytes).toString('utf8')
    // Ensure we don't cut in the middle of a multi-byte character
    while (result.length > 0 && Buffer.byteLength(result, 'utf8') > maxBytes) {
      result = result.slice(0, -1)
    }
    result += '\n... [truncated by size]'
  }
  
  // Then truncate by lines
  const lines = result.split('\n')
  if (lines.length > maxLines) {
    result = lines.slice(0, maxLines).join('\n') + '\n... [truncated by lines]'
  }
  
  return result
}

export function getTruncationConfig(): TruncateOptions {
  return {
    maxLines: Config.get("tool.truncate.maxLines") ?? DEFAULT_MAX_LINES,
    maxBytes: Config.get("tool.truncate.maxBytes") ?? DEFAULT_MAX_BYTES,
  }
}
```

---

### 10. Preserve External Directory and Deny Permissions in Task Child Sessions
**File**: `src/tool/task.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Child sessions created by task tool must inherit external_dir and deny permissions from parent to maintain security boundaries.

**Current code**:
```typescript
export const TaskTool = Tool.define(
  "task",
  Parameters,
  async (ctx, params) => {
    const childSession = await Session.create({
      // ... session config
    })
  }
)
```

**New code**:
```typescript
export const TaskTool = Tool.define(
  "task",
  Parameters,
  async (ctx, params) => {
    // Get parent session permissions
    const parentPermissions = ctx.session.permissions
    
    const childSession = await Session.create({
      // ... session config
      permissions: {
        ...params.permissions,
        // Preserve security-critical permissions from parent
        external_dir: parentPermissions?.external_dir ?? params.permissions?.external_dir,
        deny: parentPermissions?.deny ?? params.permissions?.deny,
      }
    })
  }
)
```

---

### 11. Add Windows Config Path Fallback Support
**File**: `src/permission/config-paths.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Windows path handling for config protection needs to handle various path formats including MSYS-style paths.

**New code**:
```typescript
export namespace ConfigProtection {
  function keys(p: string): string[] {
    if (process.platform !== "win32") return [path.resolve(p)]

    const expand = (value: string) => {
      const full = path.posix.normalize(value.replaceAll("\\", "/")).toLowerCase()
      const msys = full.replace(/^\/([a-z])(?=\/)/, "$1:")
      return [full, full.replace(/^[a-z]:/, ""), msys, msys.replace(/^[a-z]:/, "")]
    }

    return Array.from(new Set([...expand(p), ...expand(path.resolve(p))]))
  }

  function configs(): string[] {
    return Array.from(
      new Set([Global.Path.config, process.env.XDG_CONFIG_HOME ? path.join(process.env.XDG_CONFIG_HOME, "alexi") : ""]),
    ).filter(Boolean)
  }

  function fallback(p: string): boolean {
    if (process.platform !== "win32") return false
    return keys(p).some(
      (key) =>
        key.endsWith("/config/alexi") ||
        key.includes("/config/alexi/") ||
        key.endsWith("/.config/alexi") ||
        key.includes("/.config/alexi/"),
    )
  }

  /** Check if `child` is equal to or nested inside `parent`. */
  function within(child: string, parent: string): boolean {
    const sep = process.platform === "win32" ? "/" : path.sep
    return keys(child).some((child) =>
      keys(parent).some((parent) => child === parent || child.startsWith(parent + sep)),
    )
  }

  /** Check if an absolute path is inside a known CLI config directory. */
  export function isAbsolute(filepath: string): boolean {
    if (fallback(filepath)) return true
    // ... rest of implementation
  }
}
```

---

### 12. Add Effect-Zod Bridge Utility
**File**: `src/util/effect-zod.ts`
**Priority**: medium
**Type**: feature
**Reason**: Bridge utility needed to convert Effect Schema to Zod for backward compatibility during migration.

**New code**:
```typescript
import { Schema } from "effect"
import z from "zod"

/**
 * Convert an Effect Schema to a Zod schema for backward compatibility
 */
export function zodObject<T extends Schema.Top>(schema: T): z.ZodType<Schema.Schema.Type<T>> {
  // Implementation depends on schema structure
  // This is a simplified version - full implementation should handle all schema types
  
  const ast = schema.ast
  
  if (ast._tag === "Struct") {
    const shape: Record<string, z.ZodType> = {}
    for (const [key, prop] of Object.entries(ast.propertySignatures)) {
      shape[key] = convertToZod
{"prompt_tokens":42560,"completion_tokens":4096,"total_tokens":46656}

[Session: 04ddcf30-c571-4b7d-ab3f-9ed8ac964419]
[Messages: 2, Tokens: 46656]
