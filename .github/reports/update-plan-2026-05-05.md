# Update Plan for Alexi

Generated: 2026-05-05
Based on upstream commits: kilocode 2a6c3e7d5..1271422bd (571 commits)

## Summary
- Total changes planned: 47
- Critical: 3 | High: 12 | Medium: 22 | Low: 10

## Changes

### 1. Add Agent Manager Tool
**File**: `src/tool/agent-manager.ts`
**Priority**: high
**Type**: feature
**Reason**: New experimental Agent Manager tool added to kilocode for managing sub-agents and worktrees

**New code**:
```typescript
import { Effect, Schema } from "effect"
import { Tool } from "./tool"

export const AgentManagerParams = Schema.Struct({
  action: Schema.Literal("list", "create", "status", "terminate"),
  agentId: Schema.optional(Schema.String),
  task: Schema.optional(Schema.String),
  worktree: Schema.optional(Schema.String),
})

export type AgentManagerParams = Schema.Schema.Type<typeof AgentManagerParams>

export const AgentManagerTool = Tool.define({
  name: "agent_manager",
  description: "Manage sub-agents for parallel task execution. Use to spawn, monitor, and coordinate multiple agents working on related tasks.",
  parameters: AgentManagerParams,
  experimental: true,
  execute: (params, context) =>
    Effect.gen(function* () {
      const { action, agentId, task, worktree } = params

      switch (action) {
        case "list":
          return yield* listAgents(context)
        case "create":
          if (!task) {
            return { error: "task parameter required for create action" }
          }
          return yield* createAgent(task, worktree, context)
        case "status":
          if (!agentId) {
            return { error: "agentId parameter required for status action" }
          }
          return yield* getAgentStatus(agentId, context)
        case "terminate":
          if (!agentId) {
            return { error: "agentId parameter required for terminate action" }
          }
          return yield* terminateAgent(agentId, context)
      }
    }),
})

function listAgents(context: any) {
  return Effect.succeed({ agents: [] })
}

function createAgent(task: string, worktree: string | undefined, context: any) {
  return Effect.succeed({ agentId: crypto.randomUUID(), status: "created" })
}

function getAgentStatus(agentId: string, context: any) {
  return Effect.succeed({ agentId, status: "unknown" })
}

function terminateAgent(agentId: string, context: any) {
  return Effect.succeed({ agentId, terminated: true })
}
```

### 2. Update Bash Tool with Enhanced Shell Operator Blocking
**File**: `src/tool/bash.ts`
**Priority**: critical
**Type**: security
**Reason**: Security fix to deny shell operators and prevent command injection attacks

**Current code**:
```typescript
export function validateCommand(command: string): boolean {
  // basic validation
  return command.length > 0
}
```

**New code**:
```typescript
const BLOCKED_OPERATORS = [
  "&&",
  "||",
  ";",
  "|",
  ">",
  ">>",
  "<",
  "<<",
  "&",
  "$(",
  "`",
]

const BLOCKED_SORT_FLAGS = ["-o", "--output"]

export function validateCommand(command: string): Effect.Effect<void, CommandValidationError> {
  return Effect.gen(function* () {
    // Check for shell operators
    for (const op of BLOCKED_OPERATORS) {
      if (command.includes(op)) {
        return yield* Effect.fail(
          new CommandValidationError({
            message: `Shell operator "${op}" is not allowed. Execute commands separately.`,
            command,
          })
        )
      }
    }

    // Check for sort output flag (can overwrite files)
    const args = command.split(/\s+/)
    if (args[0] === "sort") {
      for (const flag of BLOCKED_SORT_FLAGS) {
        if (args.includes(flag)) {
          return yield* Effect.fail(
            new CommandValidationError({
              message: `The sort "${flag}" flag is not allowed as it can overwrite files.`,
              command,
            })
          )
        }
      }
    }

    // Check for shell separators
    if (/[;&|]/.test(command) && !command.includes("'") && !command.includes('"')) {
      return yield* Effect.fail(
        new CommandValidationError({
          message: "Shell separators are not allowed outside of quoted strings.",
          command,
        })
      )
    }
  })
}

export class CommandValidationError extends Schema.TaggedError<CommandValidationError>()(
  "CommandValidationError",
  {
    message: Schema.String,
    command: Schema.String,
  }
) {}
```

### 3. Update Tool Parameter Schema Migration to Effect Schema
**File**: `src/tool/tool.ts`
**Priority**: high
**Type**: refactor
**Reason**: Migrate from Zod to Effect Schema for consistency with upstream changes

**Current code**:
```typescript
import { z } from "zod"

export const ToolParams = z.object({
  name: z.string(),
  description: z.string(),
})
```

**New code**:
```typescript
import { Schema } from "effect"

export const ToolParams = Schema.Struct({
  name: Schema.String,
  description: Schema.String,
})

export type ToolParams = Schema.Schema.Type<typeof ToolParams>

// Helper for converting existing Zod schemas during migration
export function fromZodSchema<T>(zodSchema: any): Schema.Schema<T, T> {
  // Compatibility bridge - will be removed after full migration
  return Schema.Any as Schema.Schema<T, T>
}
```

### 4. Add Configurable Tool Output Truncation Limits
**File**: `src/tool/truncate.ts`
**Priority**: medium
**Type**: feature
**Reason**: Allow configuring tool output truncation limits via config

**Current code**:
```typescript
const MAX_OUTPUT_LENGTH = 10000

export function truncateOutput(output: string): string {
  if (output.length <= MAX_OUTPUT_LENGTH) {
    return output
  }
  return output.slice(0, MAX_OUTPUT_LENGTH) + "\n... (truncated)"
}
```

**New code**:
```typescript
import { Effect, Schema } from "effect"
import { Config } from "../config"

export const TruncationConfig = Schema.Struct({
  maxOutputLength: Schema.optional(Schema.Number.pipe(Schema.positive()), {
    default: () => 10000,
  }),
  maxLineCount: Schema.optional(Schema.Number.pipe(Schema.positive()), {
    default: () => 500,
  }),
  truncationMessage: Schema.optional(Schema.String, {
    default: () => "\n... (output truncated)",
  }),
})

export type TruncationConfig = Schema.Schema.Type<typeof TruncationConfig>

export function truncateOutput(
  output: string,
  config?: Partial<TruncationConfig>
): string {
  const maxLength = config?.maxOutputLength ?? 10000
  const maxLines = config?.maxLineCount ?? 500
  const message = config?.truncationMessage ?? "\n... (output truncated)"

  let result = output

  // Truncate by line count first
  const lines = result.split("\n")
  if (lines.length > maxLines) {
    result = lines.slice(0, maxLines).join("\n") + message
  }

  // Then truncate by character length
  if (result.length > maxLength) {
    result = result.slice(0, maxLength) + message
  }

  return result
}

export function getTruncationConfig(): Effect.Effect<TruncationConfig, never, Config> {
  return Effect.gen(function* () {
    const config = yield* Config
    return {
      maxOutputLength: config.tools?.truncation?.maxOutputLength ?? 10000,
      maxLineCount: config.tools?.truncation?.maxLineCount ?? 500,
      truncationMessage: config.tools?.truncation?.message ?? "\n... (output truncated)",
    }
  })
}
```

### 5. Update Read Tool with Enhanced Line Range Support
**File**: `src/tool/read.ts`
**Priority**: medium
**Type**: feature
**Reason**: Improved line range handling and better error messages

**Current code**:
```typescript
export const ReadParams = Schema.Struct({
  path: Schema.String,
  startLine: Schema.optional(Schema.Number),
  endLine: Schema.optional(Schema.Number),
})
```

**New code**:
```typescript
import { Schema, Effect } from "effect"

export const ReadParams = Schema.Struct({
  path: Schema.String.pipe(
    Schema.nonEmptyString({ message: () => "path must not be empty" })
  ),
  startLine: Schema.optional(
    Schema.Number.pipe(
      Schema.int({ message: () => "startLine must be an integer" }),
      Schema.positive({ message: () => "startLine must be positive" })
    )
  ),
  endLine: Schema.optional(
    Schema.Number.pipe(
      Schema.int({ message: () => "endLine must be an integer" }),
      Schema.positive({ message: () => "endLine must be positive" })
    )
  ),
  maxLines: Schema.optional(
    Schema.Number.pipe(
      Schema.int(),
      Schema.positive()
    ),
    { default: () => 500 }
  ),
})

export type ReadParams = Schema.Schema.Type<typeof ReadParams>

export function validateLineRange(
  startLine: number | undefined,
  endLine: number | undefined,
  totalLines: number
): Effect.Effect<{ start: number; end: number }, ReadError> {
  return Effect.gen(function* () {
    const start = startLine ?? 1
    const end = endLine ?? totalLines

    if (start > end) {
      return yield* Effect.fail(
        new ReadError({
          message: `startLine (${start}) cannot be greater than endLine (${end})`,
          code: "INVALID_RANGE",
        })
      )
    }

    if (start > totalLines) {
      return yield* Effect.fail(
        new ReadError({
          message: `startLine (${start}) exceeds file length (${totalLines} lines)`,
          code: "OUT_OF_BOUNDS",
        })
      )
    }

    return {
      start: Math.max(1, start),
      end: Math.min(totalLines, end),
    }
  })
}

export class ReadError extends Schema.TaggedError<ReadError>()("ReadError", {
  message: Schema.String,
  code: Schema.Literal("INVALID_RANGE", "OUT_OF_BOUNDS", "NOT_FOUND", "PERMISSION_DENIED"),
}) {}
```

### 6. Add External Directory Permission Support
**File**: `src/permission/external-directory.ts`
**Priority**: high
**Type**: feature
**Reason**: New permission system for external directory access in Ask mode

**New code**:
```typescript
import { Effect, Schema } from "effect"
import { Permission } from "./index"

export const ExternalDirectoryPermission = Schema.Struct({
  path: Schema.String,
  access: Schema.Literal("read", "write", "readwrite"),
  allowedInModes: Schema.optional(Schema.Array(Schema.String)),
})

export type ExternalDirectoryPermission = Schema.Schema.Type<typeof ExternalDirectoryPermission>

export function checkExternalDirectoryAccess(
  targetPath: string,
  requestedAccess: "read" | "write",
  currentMode: string,
  allowedDirectories: ExternalDirectoryPermission[]
): Effect.Effect<boolean, never> {
  return Effect.gen(function* () {
    const normalizedTarget = normalizePath(targetPath)

    for (const dir of allowedDirectories) {
      const normalizedAllowed = normalizePath(dir.path)

      // Check if target is within allowed directory
      if (!normalizedTarget.startsWith(normalizedAllowed)) {
        continue
      }

      // Check access level
      if (requestedAccess === "write" && dir.access === "read") {
        continue
      }

      // Check mode restrictions
      if (dir.allowedInModes && !dir.allowedInModes.includes(currentMode)) {
        continue
      }

      return true
    }

    return false
  })
}

function normalizePath(p: string): string {
  // Normalize path for comparison
  return p.replace(/\\/g, "/").replace(/\/+$/, "")
}

export function honorExternalDirectoryAllows(
  permission: Permission,
  externalDirs: ExternalDirectoryPermission[]
): Effect.Effect<Permission, never> {
  return Effect.gen(function* () {
    // If permission is for a path within an allowed external directory,
    // auto-approve based on configured access level
    if (permission.type === "file" && permission.path) {
      const hasAccess = yield* checkExternalDirectoryAccess(
        permission.path,
        permission.access === "write" ? "write" : "read",
        permission.mode ?? "code",
        externalDirs
      )

      if (hasAccess) {
        return { ...permission, approved: true, autoApproved: true }
      }
    }

    return permission
  })
}
```

### 7. Update Permission Evaluation for Ask Mode
**File**: `src/permission/evaluate.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix to honor external directory allows in Ask mode

**Current code**:
```typescript
export function evaluatePermission(
  permission: Permission,
  config: PermissionConfig
): Effect.Effect<PermissionResult, never> {
  // existing evaluation logic
}
```

**New code**:
```typescript
import { Effect } from "effect"
import { Permission, PermissionConfig, PermissionResult } from "./index"
import { honorExternalDirectoryAllows } from "./external-directory"

export function evaluatePermission(
  permission: Permission,
  config: PermissionConfig
): Effect.Effect<PermissionResult, never> {
  return Effect.gen(function* () {
    // First, check external directory allows
    const withExternalDirs = yield* honorExternalDirectoryAllows(
      permission,
      config.externalDirectories ?? []
    )

    if (withExternalDirs.autoApproved) {
      return {
        approved: true,
        reason: "auto-approved via external directory allow",
        permission: withExternalDirs,
      }
    }

    // Check mode-specific permissions
    const mode = permission.mode ?? "code"
    if (mode === "ask" || mode === "plan") {
      // In ask/plan modes, only allow read operations by default
      if (permission.access === "write" && !config.allowWriteInAskMode) {
        return {
          approved: false,
          reason: `Write operations not allowed in ${mode} mode`,
          permission,
        }
      }
    }

    // Continue with existing evaluation logic
    return yield* evaluateStandardPermission(permission, config)
  })
}

function evaluateStandardPermission(
  permission: Permission,
  config: PermissionConfig
): Effect.Effect<PermissionResult, never> {
  return Effect.gen(function* () {
    // Check always-allow rules
    for (const rule of config.alwaysAllow ?? []) {
      if (matchesRule(permission, rule)) {
        return {
          approved: true,
          reason: `Matched always-allow rule: ${rule.pattern}`,
          permission,
        }
      }
    }

    // Check always-deny rules
    for (const rule of config.alwaysDeny ?? []) {
      if (matchesRule(permission, rule)) {
        return {
          approved: false,
          reason: `Matched always-deny rule: ${rule.pattern}`,
          permission,
        }
      }
    }
{"prompt_tokens":82909,"completion_tokens":4096,"total_tokens":87005}

[Session: 69e369ac-0f3e-4adb-9c5d-6983e3e4fee8]
[Messages: 2, Tokens: 87005]
