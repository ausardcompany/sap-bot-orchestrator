# Update Plan for Alexi

Generated: 2026-04-05
Based on upstream commits: 3a0e00d, 8b8d4fa, c796b9a, 280eb16, 629e866, c08fa56 (opencode)

## Summary
- Total changes planned: 8
- Critical: 1 | High: 3 | Medium: 3 | Low: 1

## Changes

### 1. Add Effect-based wrapper for external directory assertion
**File**: `src/tool/external-directory.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream is migrating to Effect.js for better error handling and composability. This adds an Effect-wrapped version of `assertExternalDirectory` to support the new read tool implementation.

**Current code** (if exists):
```typescript
import path from "path"
import type { Tool } from "./tool"
import { Instance } from "../project/instance"
import { Filesystem } from "@/util/filesystem"

type Kind = "file" | "directory"

interface Options {
  bypass?: boolean
  kind?: Kind
}

export async function assertExternalDirectory(ctx: Tool.Context, target?: string, options?: Options) {
  // existing implementation
}
```

**New code**:
```typescript
import path from "path"
import { Effect } from "effect"
import type { Tool } from "./tool"
import { Instance } from "../project/instance"
import { AppFileSystem } from "../filesystem"

type Kind = "file" | "directory"

interface Options {
  bypass?: boolean
  kind?: Kind
}

export async function assertExternalDirectory(ctx: Tool.Context, target?: string, options?: Options) {
  if (!target) return

  if (options?.bypass) return

  const full = process.platform === "win32" ? AppFileSystem.normalizePath(target) : target
  if (Instance.containsPath(full)) return

  const kind = options?.kind ?? "file"
  const dir = kind === "directory" ? full : path.dirname(full)
  const glob =
    process.platform === "win32"
      ? AppFileSystem.normalizePathPattern(path.join(dir, "*"))
      : path.join(dir, "*").replaceAll("\\", "/")

  await ctx.ask({
    type: "read",
    glob,
    metadata: {
      type: kind === "directory" ? "Directory" : "File",
      path: target,
    },
  })
}

export const assertExternalDirectoryEffect = Effect.fn("Tool.assertExternalDirectory")(function* (
  ctx: Tool.Context,
  target?: string,
  options?: Options,
) {
  yield* Effect.promise(() => assertExternalDirectory(ctx, target, options))
})
```

### 2. Refactor read tool to use Effect.js pattern
**File**: `src/tool/read.ts`
**Priority**: critical
**Type**: refactor
**Reason**: The read tool is being migrated to use Effect.js via `defineEffect` pattern. This improves error handling, resource management, and composability. Also fixes output formatting by adding newline between `<content>` and first line to prevent confusion.

**Current code** (if exists):
```typescript
import z from "zod"
import { createReadStream } from "fs"
import * as fs from "fs/promises"
import * as path from "path"
import { createInterface } from "readline"
import { Tool } from "./tool"
import { LSP } from "../lsp"
import { FileTime } from "../file/time"
import DESCRIPTION from "./read.txt"
import { Instance } from "../project/instance"
import { assertExternalDirectory } from "./external-directory"
import { Instruction } from "../session/instruction"
import { Filesystem } from "../util/filesystem"

const DEFAULT_READ_LIMIT = 2000
const MAX_LINE_LENGTH = 2000
const MAX_LINE_SUFFIX = `... (line truncated to ${MAX_LINE_LENGTH} chars)`
const MAX_BYTES = 50 * 1024
const MAX_BYTES_LABEL = `${MAX_BYTES / 1024} KB`

export const ReadTool = Tool.define("read", {
  // ... existing promise-based implementation
})
```

**New code**:
```typescript
import z from "zod"
import { Effect, Scope } from "effect"
import { createReadStream } from "fs"
import { open } from "fs/promises"
import * as path from "path"
import { createInterface } from "readline"
import { Tool } from "./tool"
import { AppFileSystem } from "../filesystem"
import { LSP } from "../lsp"
import { FileTime } from "../file/time"
import DESCRIPTION from "./read.txt"
import { Instance } from "../project/instance"
import { assertExternalDirectoryEffect } from "./external-directory"
import { Instruction } from "../session/instruction"

const DEFAULT_READ_LIMIT = 2000
const MAX_LINE_LENGTH = 2000
const MAX_LINE_SUFFIX = `... (line truncated to ${MAX_LINE_LENGTH} chars)`
const MAX_BYTES = 50 * 1024
const MAX_BYTES_LABEL = `${MAX_BYTES / 1024} KB`

// Effect-based read tool implementation
export const ReadTool = Tool.defineEffect("read", {
  description: DESCRIPTION,
  parameters: z.object({
    filePath: z.string().describe("The absolute path to the file or directory to read"),
    offset: z.coerce.number().describe("The line number to start reading from (1-indexed)").optional(),
    limit: z.coerce.number().describe("The maximum number of lines to read (defaults to 2000)").optional(),
  }),
  execute: Effect.fn("ReadTool.execute")(function* (params, ctx) {
    if (params.offset !== undefined && params.offset < 1) {
      return yield* Effect.fail(new Error("offset must be greater than or equal to 1"))
    }

    let filepath = params.filePath
    if (!path.isAbsolute(filepath)) {
      filepath = path.resolve(Instance.directory, filepath)
    }
    if (process.platform === "win32") {
      filepath = AppFileSystem.normalizePath(filepath)
    }

    const title = path.relative(Instance.worktree, filepath)
    const fs = yield* AppFileSystem.Service
    const stat = yield* fs.stat(filepath)

    if (stat.isDirectory()) {
      yield* assertExternalDirectoryEffect(ctx, filepath, { kind: "directory" })
      const entries = yield* fs.readdir(filepath)
      // Format directory listing
      const output = entries.map(entry => entry.name).join("\n")
      return {
        title,
        output: `<content>\n${output}</content>`,
        metadata: { type: "directory", path: filepath }
      }
    }

    // File reading with proper resource management
    yield* assertExternalDirectoryEffect(ctx, filepath)
    
    const offset = params.offset ?? 1
    const limit = params.limit ?? DEFAULT_READ_LIMIT

    // Use Scope for resource management
    const content = yield* Effect.scoped(
      Effect.gen(function* () {
        const fileHandle = yield* Effect.acquireRelease(
          Effect.promise(() => open(filepath, "r")),
          (handle) => Effect.promise(() => handle.close())
        )
        
        const lines: string[] = []
        const stream = createReadStream(filepath, { 
          start: 0,
          highWaterMark: MAX_BYTES 
        })
        
        const rl = createInterface({ input: stream, crlfDelay: Infinity })
        
        let lineNum = 0
        for await (const line of rl) {
          lineNum++
          if (lineNum < offset) continue
          if (lines.length >= limit) break
          
          // Truncate long lines
          const truncatedLine = line.length > MAX_LINE_LENGTH 
            ? line.slice(0, MAX_LINE_LENGTH) + MAX_LINE_SUFFIX
            : line
          lines.push(truncatedLine)
        }
        
        rl.close()
        stream.destroy()
        
        return lines.join("\n")
      })
    )

    // Record file access time
    const fileTime = yield* FileTime.Service
    yield* Effect.promise(() => fileTime.record(filepath))

    // Get LSP diagnostics if available
    const lsp = yield* LSP.Service
    const diagnostics = yield* Effect.promise(() => lsp.getDiagnostics(filepath))

    return {
      title,
      // Note: newline after <content> tag to prevent confusion
      output: `<content>\n${content}</content>`,
      metadata: {
        type: "file",
        path: filepath,
        offset,
        limit,
        diagnostics: diagnostics?.length > 0 ? diagnostics : undefined
      }
    }
  })
})
```

### 3. Update tool registry with new dependencies and Effect integration
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: refactor
**Reason**: The registry needs additional service dependencies (LSP, FileTime, Instruction, AppFileSystem) to support the Effect-based read tool and other tools being migrated.

**Current code** (partial):
```typescript
import { Tool } from "./tool"
import { Config } from "../config"
import { Plugin } from "../plugin"
// ... other imports

export namespace ToolRegistry {
  // ... existing implementation
}
```

**New code** (additions):
```typescript
import { Tool } from "./tool"
import { Config } from "../config"
import { Plugin } from "../plugin"
import { makeRuntime } from "@/effect/run-service"
import { Env } from "../env"
import { Question } from "../question"
import { Todo } from "../session/todo"
import { LSP } from "../lsp"
import { FileTime } from "../file/time"
import { Instruction } from "../session/instruction"
import { AppFileSystem } from "../filesystem"

export namespace ToolRegistry {
  const log = Log.create({ service: "tool.registry" })

  // ... existing types and interfaces

  export class Service extends ServiceMap.Service<Service, Interface>()("@opencode/ToolRegistry") {}

  export const layer: Layer.Layer<
    Service, 
    never, 
    | Config.Service 
    | Plugin.Service 
    | Question.Service 
    | Todo.Service
    | LSP.Service
    | FileTime.Service
    | Instruction.Service
    | AppFileSystem.Service
  > = Layer.effect(
    Service,
    Effect.gen(function* () {
      const config = yield* Config.Service
      const plugin = yield* Plugin.Service
      const lsp = yield* LSP.Service
      const fileTime = yield* FileTime.Service
      const instruction = yield* Instruction.Service
      const appFs = yield* AppFileSystem.Service

      const build = <T extends Tool.Info>(tool: T | Effect.Effect<T, never, any>) =>
        Effect.isEffect(tool) ? tool : Effect.succeed(tool)

      // ... rest of implementation with access to new services
    })
  )
}
```

### 4. Add AppFileSystem service with normalization utilities
**File**: `src/filesystem/index.ts`
**Priority**: high
**Type**: feature
**Reason**: Centralizes filesystem operations with proper path normalization for cross-platform support. Required by the refactored read tool and external-directory assertion.

**New code**:
```typescript
import { Effect, Layer, Context } from "effect"
import * as fs from "fs/promises"
import * as path from "path"

export namespace AppFileSystem {
  export interface Interface {
    stat(filepath: string): Effect.Effect<fs.Stats>
    readdir(filepath: string): Effect.Effect<fs.Dirent[]>
    readFile(filepath: string, encoding?: BufferEncoding): Effect.Effect<string>
    writeFile(filepath: string, content: string): Effect.Effect<void>
    exists(filepath: string): Effect.Effect<boolean>
  }

  export class Service extends Context.Tag("@alexi/AppFileSystem")<Service, Interface>() {}

  /**
   * Normalize path for Windows compatibility
   */
  export function normalizePath(filepath: string): string {
    if (process.platform !== "win32") return filepath
    // Convert forward slashes to backslashes and normalize
    return path.normalize(filepath.replace(/\//g, "\\"))
  }

  /**
   * Normalize glob pattern for Windows compatibility
   */
  export function normalizePathPattern(pattern: string): string {
    if (process.platform !== "win32") return pattern
    // Glob patterns should use forward slashes even on Windows
    return pattern.replace(/\\/g, "/")
  }

  export const defaultLayer = Layer.succeed(
    Service,
    {
      stat: (filepath) => Effect.promise(() => fs.stat(filepath)),
      readdir: (filepath) => Effect.promise(() => fs.readdir(filepath, { withFileTypes: true })),
      readFile: (filepath, encoding = "utf-8") => 
        Effect.promise(() => fs.readFile(filepath, encoding)),
      writeFile: (filepath, content) => 
        Effect.promise(() => fs.writeFile(filepath, content, "utf-8")),
      exists: (filepath) => 
        Effect.promise(async () => {
          try {
            await fs.access(filepath)
            return true
          } catch {
            return false
          }
        })
    }
  )
}
```

### 5. Fix reasoning tokens double counting in usage calculation
**File**: `src/session/index.ts`
**Priority**: medium
**Type**: bugfix
**Reason**: Upstream fix ensures reasoning tokens aren't double counted when calculating usage, which affects cost tracking and rate limiting.

**Current code** (if exists):
```typescript
// In usage calculation logic
function calculateUsage(response: ModelResponse): Usage {
  const inputTokens = response.usage?.input_tokens ?? 0
  const outputTokens = response.usage?.output_tokens ?? 0
  const reasoningTokens = response.usage?.reasoning_tokens ?? 0
  
  return {
    inputTokens,
    outputTokens: outputTokens + reasoningTokens, // BUG: double counting
    totalTokens: inputTokens + outputTokens + reasoningTokens
  }
}
```

**New code**:
```typescript
// In usage calculation logic
function calculateUsage(response: ModelResponse): Usage {
  const inputTokens = response.usage?.input_tokens ?? 0
  const outputTokens = response.usage?.output_tokens ?? 0
  const reasoningTokens = response.usage?.reasoning_tokens ?? 0
  
  // Note: reasoning_tokens are already included in output_tokens for most providers
  // Only add them separately if the provider explicitly separates them
  const effectiveOutputTokens = response.usage?.reasoning_tokens_separate 
    ? outputTokens + reasoningTokens 
    : outputTokens
  
  return {
    inputTokens,
    outputTokens: effectiveOutputTokens,
    reasoningTokens, // Track separately for display purposes
    totalTokens: inputTokens + effectiveOutputTokens
  }
}
```

### 6. Update read tool tests for Effect-based implementation
**File**: `src/tool/read.test.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Tests need to be updated to work with the Effect-based read tool implementation, using proper Effect test utilities and layer composition.

**New code**:
```typescript
import { afterEach, describe, expect } from "bun:test"
import { Cause, Effect, Exit, Layer } from "effect"
import path from "path"
import { Agent } from "../agent/agent"
import * as CrossSpawnSpawner from "../effect/cross-spawn-spawner"
import { AppFileSystem } from "../filesystem"
import { FileTime } from "../file/time"
import { LSP } from "../lsp"
import { Permission } from "../permission"
import { Instance } from "../project/instance"
import { SessionID, MessageID } from "../session/schema"
import { Instruction } from "../session/instruction"
import { ReadTool } from "./read"
import { Tool } from "./tool"
import { Filesystem } from "../util/filesystem"
import { provideInstance, tmpdirScoped } from "../test/fixture"
import { testEffect } from "../test/lib/effect"

const FIXTURES_DIR = path.join(import
{"prompt_tokens":5420,"completion_tokens":4096,"total_tokens":9516}

[Session: d987bfa6-49e7-4276-838d-95faefbf1671]
[Messages: 2, Tokens: 9516]
