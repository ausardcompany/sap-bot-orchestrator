# Update Plan for Alexi

Generated: 2026-04-21
Based on upstream commits: kilocode 60a1f3c36..883f12819 (334 commits)

## Summary
- Total changes planned: 47
- Critical: 3 | High: 12 | Medium: 22 | Low: 10

## Changes

### 1. Add Suggestion Tool Permission to Agent Defaults
**File**: `src/agent/index.ts`
**Priority**: critical
**Type**: feature
**Reason**: New `suggest` permission added to agent permission defaults to support the code review suggestion tool. Without this, the suggest tool will be blocked.

**Current code**:
```typescript
const defaults = Permission.fromConfig({
  "*": "ask",
  ...Object.fromEntries(whitelistedDirs.map((dir) => [dir, "allow"])),
  question: "deny",
  plan_enter: "deny",
  plan_exit: "deny",
})
```

**New code**:
```typescript
const defaults = Permission.fromConfig({
  "*": "ask",
  ...Object.fromEntries(whitelistedDirs.map((dir) => [dir, "allow"])),
  suggest: "deny",
  question: "deny",
  plan_enter: "deny",
  plan_exit: "deny",
})
```

### 2. Add Suggest Permission to Kilo Agent Patches
**File**: `src/agent/index.ts`
**Priority**: critical
**Type**: feature
**Reason**: Multiple agent configurations need the `suggest: "allow"` permission to enable code review suggestions.

**New code** (add to each agent's permission config):
```typescript
// In patchAgents function, for agents that should support suggestions:
Permission.fromConfig({
  question: "allow",
  suggest: "allow",
  plan_exit: "allow",
  bash: readOnlyBash,
  ...kilo.mcpRules,
})

// For plan agent:
Permission.fromConfig({
  question: "allow",
  suggest: "allow",
  plan_enter: "allow",
})

// For orchestrator agent:
Permission.fromConfig({
  glob: "allow",
  list: "allow",
  question: "allow",
  suggest: "allow",
  task: "allow",
  todoread: "allow",
  todowrite: "allow",
  // ... rest of permissions
})
```

### 3. Update Service Class to Use Context.Service
**File**: `src/agent/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: Effect library API change - `ServiceMap.Service` replaced with `Context.Service` for service definitions.

**Current code**:
```typescript
import { Effect, ServiceMap, Layer } from "effect"

export class Service extends ServiceMap.Service<Service, Interface>()("@opencode/Agent") {}
```

**New code**:
```typescript
import { Effect, Context, Layer } from "effect"

export class Service extends Context.Service<Service, Interface>()("@opencode/Agent") {}
```

### 4. Update Bus Service to Use Context.Service
**File**: `src/bus/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: Consistent with Effect library API changes across the codebase.

**Current code**:
```typescript
import { Effect, Exit, Layer, PubSub, Scope, ServiceMap, Stream } from "effect"

export class Service extends ServiceMap.Service<Service, Interface>()("@opencode/Bus") {}
```

**New code**:
```typescript
import { Effect, Exit, Layer, PubSub, Scope, Context, Stream } from "effect"
import { EffectLogger } from "@/effect/logger"

export class Service extends Context.Service<Service, Interface>()("@opencode/Bus") {}
```

### 5. Add Project and Workspace Context to Global Bus Events
**File**: `src/bus/global.ts`
**Priority**: high
**Type**: feature
**Reason**: Enhanced event routing with project and workspace context for multi-workspace support.

**Current code**:
```typescript
export const GlobalBus = new EventEmitter<{
  event: [
    {
      directory?: string
      payload: any
    },
  ]
}>()
```

**New code**:
```typescript
export const GlobalBus = new EventEmitter<{
  event: [
    {
      directory?: string
      project?: string
      workspace?: string
      payload: any
    },
  ]
}>()
```

### 6. Update Bus Event Publishing with Context
**File**: `src/bus/index.ts`
**Priority**: high
**Type**: feature
**Reason**: Include project and workspace context when publishing events for proper event routing.

**Current code**:
```typescript
const dir = yield* InstanceState.directory
GlobalBus.emit("event", {
  directory: dir,
  payload,
})
```

**New code**:
```typescript
const dir = yield* InstanceState.directory
const context = yield* InstanceState.context
const workspace = yield* InstanceState.workspaceID

GlobalBus.emit("event", {
  directory: dir,
  project: context.project.id,
  workspace,
  payload,
})
```

### 7. Add EffectLogger to Unsubscribe Cleanup
**File**: `src/bus/index.ts`
**Priority**: medium
**Type**: bugfix
**Reason**: Proper logging context when cleaning up subscriptions to prevent silent failures.

**Current code**:
```typescript
return () => {
  log.info("unsubscribing", { type })
  Effect.runFork(Scope.close(scope, Exit.void))
}
```

**New code**:
```typescript
return () => {
  log.info("unsubscribing", { type })
  Effect.runFork(Scope.close(scope, Exit.void).pipe(Effect.provide(EffectLogger.layer)))
}
```

### 8. Simplify BusEvent Payloads Schema
**File**: `src/bus/bus-event.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Simplified schema generation removing unnecessary discriminatedUnion wrapper.

**Current code**:
```typescript
export function payloads() {
  return z
    .discriminatedUnion(
      "type",
      registry
        .entries()
        .map(([type, def]) => {
          return z
            .object({
              type: z.literal(type),
              properties: def.properties,
            })
            .meta({
              ref: "Event" + "." + def.type,
            })
        })
        .toArray() as any,
    )
    .meta({
      ref: "Event",
    })
}
```

**New code**:
```typescript
export function payloads() {
  return registry
    .entries()
    .map(([type, def]) => {
      return z
        .object({
          type: z.literal(type),
          properties: def.properties,
        })
        .meta({
          ref: "Event" + "." + def.type,
        })
    })
    .toArray()
}
```

### 9. Create Suggestion Tool Module
**File**: `src/tool/suggest.ts`
**Priority**: critical
**Type**: feature
**Reason**: New suggest tool for code review functionality. This is a core feature addition.

**New code**:
```typescript
import { Tool } from "./tool"
import { Effect } from "effect"
import { z } from "zod"

export namespace SuggestTool {
  export const name = "suggest"
  
  export const schema = z.object({
    suggestion: z.string().describe("The code review suggestion to present to the user"),
    file: z.string().optional().describe("Optional file path the suggestion relates to"),
    line: z.number().optional().describe("Optional line number for the suggestion"),
  })

  export type Input = z.infer<typeof schema>

  export const definition = Tool.define({
    name,
    description: "Present a code review suggestion to the user for their consideration",
    parameters: schema,
    execute: (input: Input) =>
      Effect.gen(function* () {
        // Suggestion handling is done by the permission system
        // The tool itself just returns the suggestion for display
        return {
          type: "suggestion" as const,
          suggestion: input.suggestion,
          file: input.file,
          line: input.line,
        }
      }),
  })
}
```

### 10. Register Suggestion Tool in Registry
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Register the new suggest tool so it's available to agents.

**Current code**:
```typescript
import { QuestionTool } from "./question"
// ... other imports
```

**New code**:
```typescript
import { QuestionTool } from "./question"
import { SuggestTool } from "./suggest"
// ... other imports

// In the registry initialization:
registry.register(SuggestTool.definition)
```

### 11. Create Read Directory Tool
**File**: `src/tool/read-directory.ts`
**Priority**: high
**Type**: feature
**Reason**: New tool for reading directory contents, enhancing file exploration capabilities.

**New code**:
```typescript
import { Tool } from "./tool"
import { Effect } from "effect"
import { z } from "zod"
import * as fs from "fs/promises"
import * as path from "path"

export namespace ReadDirectoryTool {
  export const name = "read_directory"

  export const schema = z.object({
    path: z.string().describe("The directory path to read"),
    recursive: z.boolean().optional().default(false).describe("Whether to read recursively"),
    maxDepth: z.number().optional().default(3).describe("Maximum depth for recursive reading"),
  })

  export type Input = z.infer<typeof schema>

  export const definition = Tool.define({
    name,
    description: "Read the contents of a directory, optionally recursively",
    parameters: schema,
    execute: (input: Input) =>
      Effect.gen(function* () {
        const entries = yield* Effect.tryPromise(() => fs.readdir(input.path, { withFileTypes: true }))
        
        const result = entries.map((entry) => ({
          name: entry.name,
          type: entry.isDirectory() ? "directory" : "file",
          path: path.join(input.path, entry.name),
        }))

        return {
          type: "directory_contents" as const,
          path: input.path,
          entries: result,
        }
      }),
  })
}
```

### 12. Update Tool Registry with Read Directory
**File**: `src/tool/registry.ts`
**Priority**: medium
**Type**: feature
**Reason**: Register the read_directory tool.

**New code** (add to imports and registration):
```typescript
import { ReadDirectoryTool } from "./read-directory"

// In registry initialization:
registry.register(ReadDirectoryTool.definition)
```

### 13. Update Apply Patch Tool with Effect Improvements
**File**: `src/tool/apply_patch.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Significant refactoring with improved Effect usage patterns (+252, -242 lines indicates major restructuring).

**New code** (key pattern changes):
```typescript
import { Effect, pipe } from "effect"
import { InstanceState } from "@/effect/instance-state"

export const definition = Tool.define({
  name,
  description: "Apply a unified diff patch to files",
  parameters: schema,
  execute: (input: Input) =>
    Effect.gen(function* () {
      const directory = yield* InstanceState.directory
      
      // Use Effect.tryPromise for async operations
      const result = yield* Effect.tryPromise({
        try: () => applyPatch(input.patch, directory),
        catch: (error) => new PatchError({ message: String(error) }),
      })

      return {
        type: "patch_applied" as const,
        files: result.modifiedFiles,
        success: result.success,
      }
    }),
})
```

### 14. Update Bash Tool with Effect Patterns
**File**: `src/tool/bash.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Improved Effect integration and error handling patterns.

**New code** (key changes):
```typescript
import { Effect, Duration } from "effect"
import { InstanceState } from "@/effect/instance-state"

// Add timeout retry hint for long-running commands
const TIMEOUT_RETRY_HINT = "Command timed out. Consider increasing the timeout or breaking the command into smaller parts."

export const definition = Tool.define({
  name,
  description: "Execute a bash command",
  parameters: schema,
  execute: (input: Input) =>
    Effect.gen(function* () {
      const directory = yield* InstanceState.directory
      const config = yield* Config.Service

      const timeout = input.timeout ?? config.bash.defaultTimeout
      
      const result = yield* Effect.tryPromise({
        try: () => executeCommand(input.command, directory, timeout),
        catch: (error) => {
          if (error instanceof TimeoutError) {
            return new BashError({ 
              message: error.message,
              hint: TIMEOUT_RETRY_HINT,
            })
          }
          return new BashError({ message: String(error) })
        },
      })

      return {
        type: "bash_result" as const,
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
      }
    }),
})
```

### 15. Update Codesearch Tool with Simplified Logic
**File**: `src/tool/codesearch.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Significant simplification (-126 lines) indicating removal of redundant code.

**New code** (simplified structure):
```typescript
import { Effect } from "effect"
import { Ripgrep } from "@/file/ripgrep"

export const definition = Tool.define({
  name: "codesearch",
  description: "Search code using ripgrep with semantic understanding",
  parameters: schema,
  execute: (input: Input) =>
    Effect.gen(function* () {
      const ripgrep = yield* Ripgrep.Service
      
      // Simplified search logic
      const results = yield* ripgrep.search({
        pattern: input.query,
        path: input.path,
        options: {
          caseSensitive: input.caseSensitive ?? false,
          maxResults: input.maxResults ?? 100,
        },
      })

      return {
        type: "search_results" as const,
        matches: results,
        totalCount: results.length,
      }
    }),
})
```

### 16. Update Edit Tool with Effect Patterns
**File**: `src/tool/edit.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Improved Effect integration for file editing operations.

**New code** (key pattern):
```typescript
execute: (input: Input) =>
  Effect.gen(function* () {
    const directory = yield* InstanceState.directory
    const fullPath = yield* resolvePath(input.path, directory)
    
    // Read current content
    const currentContent = yield* Effect.tryPromise({
      try: () => fs.readFile(fullPath, "utf-8"),
      catch: () => new FileNotFoundError({ path: fullPath }),
    })

    // Apply edits
    const newContent = applyEdits(currentContent, input.edits)
    
    // Write back
    yield* Effect.tryPromise({
      try: () => fs.writeFile(fullPath, newContent),
      catch: (error) => new WriteError({ path: fullPath, message: String(error) }),
    })

    return {
      type: "edit_complete" as const,
      path: input.path,
      editsApplied: input.edits.length,
    }
  }),
```

### 17. Update Glob Tool with Effect Patterns
**File**: `src/tool/glob.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Improved Effect integration for glob operations.

**New code**:
```typescript
import { Effect } from "effect"
import { glob } from "glob"

execute: (input: Input) =>
  Effect.gen(function* () {
    const directory = yield* Instance
{"prompt_tokens":42308,"completion_tokens":4096,"total_tokens":46404}

[Session: 4e78ff97-b84d-48ec-b411-641448d7c0bd]
[Messages: 2, Tokens: 46404]
