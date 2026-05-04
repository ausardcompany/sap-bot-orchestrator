# Update Plan for Alexi

Generated: 2026-05-04
Based on upstream commits: kilocode a1c08dbca (v7.2.34) - 317 commits analyzed

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Migrate Tool Framework to Effect Schema
**File**: `src/tool/tool.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Upstream migrated all 18 built-in tools from Zod to Effect Schema for better type safety and runtime validation. This is a foundational change affecting all tools.

**Current code** (if modifying):
```typescript
import { z } from "zod"

export const ToolParametersSchema = z.object({
  name: z.string(),
  description: z.string(),
  required: z.boolean().optional(),
})

export function defineTool<T extends z.ZodType>(options: {
  name: string
  description: string
  parameters: T
  execute: (params: z.infer<T>) => Promise<ToolResult>
}) {
  return options
}
```

**New code**:
```typescript
import { Schema } from "@effect/schema"
import { Effect, pipe } from "effect"

export const ToolParametersSchema = Schema.Struct({
  name: Schema.String,
  description: Schema.String,
  required: Schema.optional(Schema.Boolean),
})

export type ToolParameters = Schema.Schema.Type<typeof ToolParametersSchema>

export function defineTool<A, I, R>(options: {
  name: string
  description: string
  parameters: Schema.Schema<A, I, R>
  execute: (params: A) => Effect.Effect<ToolResult, ToolError, R>
}) {
  return {
    ...options,
    parseParameters: (input: unknown) => 
      Schema.decodeUnknown(options.parameters)(input),
  }
}

// Zod-to-Effect bridge for gradual migration
export function zodToEffectSchema<T>(zodSchema: z.ZodType<T>): Schema.Schema<T, unknown> {
  return Schema.declare(
    (input) => zodSchema.safeParse(input).success,
    {
      identifier: "ZodBridge",
      decode: (input) => {
        const result = zodSchema.safeParse(input)
        if (result.success) return result.data
        throw new Error(result.error.message)
      },
      encode: (value) => value,
    }
  )
}
```

### 2. Add Tool Output Truncation Configuration
**File**: `src/tool/truncate.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream added configurable truncation limits for tool outputs to prevent context overflow.

**Current code** (if modifying):
```typescript
const DEFAULT_MAX_OUTPUT = 10000

export function truncateOutput(output: string): string {
  if (output.length <= DEFAULT_MAX_OUTPUT) return output
  return output.slice(0, DEFAULT_MAX_OUTPUT) + "\n... (truncated)"
}
```

**New code**:
```typescript
import { Schema } from "@effect/schema"

export const TruncationConfigSchema = Schema.Struct({
  maxOutputLength: Schema.optional(Schema.Number.pipe(
    Schema.positive(),
    Schema.int()
  ), { default: () => 10000 }),
  maxLineCount: Schema.optional(Schema.Number.pipe(
    Schema.positive(),
    Schema.int()
  ), { default: () => 500 }),
  preserveEnds: Schema.optional(Schema.Boolean, { default: () => true }),
})

export type TruncationConfig = Schema.Schema.Type<typeof TruncationConfigSchema>

const DEFAULT_CONFIG: TruncationConfig = {
  maxOutputLength: 10000,
  maxLineCount: 500,
  preserveEnds: true,
}

export function truncateOutput(
  output: string, 
  config: Partial<TruncationConfig> = {}
): string {
  const { maxOutputLength, maxLineCount, preserveEnds } = {
    ...DEFAULT_CONFIG,
    ...config,
  }

  const lines = output.split("\n")
  
  // Truncate by line count first
  if (lines.length > maxLineCount) {
    if (preserveEnds) {
      const halfLines = Math.floor(maxLineCount / 2)
      const truncatedLines = [
        ...lines.slice(0, halfLines),
        `\n... (${lines.length - maxLineCount} lines truncated) ...\n`,
        ...lines.slice(-halfLines),
      ]
      output = truncatedLines.join("\n")
    } else {
      output = lines.slice(0, maxLineCount).join("\n") + "\n... (truncated)"
    }
  }

  // Then truncate by character count
  if (output.length > maxOutputLength) {
    if (preserveEnds) {
      const halfLength = Math.floor(maxOutputLength / 2)
      output = output.slice(0, halfLength) + 
        "\n... (truncated) ...\n" + 
        output.slice(-halfLength)
    } else {
      output = output.slice(0, maxOutputLength) + "\n... (truncated)"
    }
  }

  return output
}
```

### 3. Add Experimental Agent Manager Tool
**File**: `src/tool/agent-manager.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream added an experimental Agent Manager tool for managing sub-agents and worktrees.

**New code**:
```typescript
import { Schema } from "@effect/schema"
import { Effect } from "effect"
import { defineTool, ToolResult } from "./tool"

export const AgentManagerParametersSchema = Schema.Struct({
  action: Schema.Literal("start", "stop", "list", "status"),
  agentId: Schema.optional(Schema.String),
  worktree: Schema.optional(Schema.String),
  task: Schema.optional(Schema.String),
})

export type AgentManagerParameters = Schema.Schema.Type<typeof AgentManagerParametersSchema>

export const AgentManagerTool = defineTool({
  name: "agent_manager",
  description: `Manage sub-agents for parallel task execution.
  
Actions:
- start: Start a new agent with a task in an optional worktree
- stop: Stop a running agent by ID
- list: List all running agents
- status: Get status of a specific agent`,
  parameters: AgentManagerParametersSchema,
  execute: (params: AgentManagerParameters): Effect.Effect<ToolResult, Error> =>
    Effect.gen(function* () {
      switch (params.action) {
        case "start":
          if (!params.task) {
            return { success: false, error: "Task is required for start action" }
          }
          // Implementation delegates to agent manager service
          return yield* startAgent(params.task, params.worktree)
        
        case "stop":
          if (!params.agentId) {
            return { success: false, error: "Agent ID is required for stop action" }
          }
          return yield* stopAgent(params.agentId)
        
        case "list":
          return yield* listAgents()
        
        case "status":
          if (!params.agentId) {
            return { success: false, error: "Agent ID is required for status action" }
          }
          return yield* getAgentStatus(params.agentId)
        
        default:
          return { success: false, error: `Unknown action: ${params.action}` }
      }
    }),
})

// Placeholder implementations - integrate with actual agent manager service
function startAgent(task: string, worktree?: string) {
  return Effect.succeed({ 
    success: true, 
    output: `Started agent for task: ${task}${worktree ? ` in worktree: ${worktree}` : ""}` 
  })
}

function stopAgent(agentId: string) {
  return Effect.succeed({ success: true, output: `Stopped agent: ${agentId}` })
}

function listAgents() {
  return Effect.succeed({ success: true, output: "No agents running" })
}

function getAgentStatus(agentId: string) {
  return Effect.succeed({ success: true, output: `Agent ${agentId}: idle` })
}
```

### 4. Harden Bash Tool Shell Operator Blocking
**File**: `src/tool/bash.ts`
**Priority**: critical
**Type**: security
**Reason**: Upstream added security hardening to block shell separators and dangerous operators.

**Current code** (if modifying):
```typescript
const BLOCKED_COMMANDS = ["rm -rf /", "mkfs", "dd if="]

export function validateCommand(command: string): boolean {
  return !BLOCKED_COMMANDS.some(blocked => command.includes(blocked))
}
```

**New code**:
```typescript
const BLOCKED_COMMANDS = ["rm -rf /", "mkfs", "dd if="]

// Shell operators that could be used for command injection
const SHELL_SEPARATORS = [";", "&&", "||", "|", "&", "\n", "$(", "`", "<(", ">("]
const REDIRECT_OPERATORS = [">", ">>", "<", "<<", "2>", "2>>", "&>", "&>>"]

export interface CommandValidationResult {
  valid: boolean
  reason?: string
  sanitized?: string
}

export function validateCommand(command: string): CommandValidationResult {
  // Check for blocked commands
  for (const blocked of BLOCKED_COMMANDS) {
    if (command.includes(blocked)) {
      return { valid: false, reason: `Blocked command pattern: ${blocked}` }
    }
  }

  // Check for shell separators (command chaining)
  for (const separator of SHELL_SEPARATORS) {
    if (command.includes(separator)) {
      return { 
        valid: false, 
        reason: `Shell operator not allowed: ${separator}. Execute commands separately.` 
      }
    }
  }

  // Check for output redirection that could overwrite files
  for (const redirect of REDIRECT_OPERATORS) {
    // Allow reading from files with < but not writing
    if (redirect !== "<" && command.includes(redirect)) {
      // Check if it's part of a heredoc (allowed)
      const heredocPattern = /<<[-']?\w+/
      if (redirect === "<<" && heredocPattern.test(command)) {
        continue
      }
      return { 
        valid: false, 
        reason: `Output redirection not allowed: ${redirect}. Use write_file tool instead.` 
      }
    }
  }

  // Check for sort output flag which can overwrite files
  if (/\bsort\b.*-o\b/.test(command)) {
    return { 
      valid: false, 
      reason: "sort -o flag not allowed. Use write_file tool for output." 
    }
  }

  return { valid: true }
}

export function sanitizeCommand(command: string): string {
  // Remove any null bytes
  return command.replace(/\0/g, "")
}
```

### 5. Fix External Directory Permission Handling
**File**: `src/permission/index.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Upstream fixed a bug where read-only external directory allows were not being honored correctly.

**Current code** (if modifying):
```typescript
export function checkPermission(
  path: string, 
  operation: "read" | "write",
  config: PermissionConfig
): PermissionResult {
  const isExternal = !path.startsWith(config.workspaceRoot)
  
  if (isExternal && !config.allowExternalDirs) {
    return { allowed: false, reason: "External directory access not allowed" }
  }
  
  return { allowed: true }
}
```

**New code**:
```typescript
import { Schema } from "@effect/schema"

export const ExternalDirectoryPermissionSchema = Schema.Struct({
  path: Schema.String,
  mode: Schema.Literal("read", "write", "readwrite"),
})

export type ExternalDirectoryPermission = Schema.Schema.Type<typeof ExternalDirectoryPermissionSchema>

export interface PermissionConfig {
  workspaceRoot: string
  allowExternalDirs: boolean
  externalDirectoryPermissions: ExternalDirectoryPermission[]
}

export function checkPermission(
  path: string, 
  operation: "read" | "write",
  config: PermissionConfig
): PermissionResult {
  const normalizedPath = normalizePath(path)
  const isExternal = !normalizedPath.startsWith(normalizePath(config.workspaceRoot))
  
  if (!isExternal) {
    return { allowed: true }
  }
  
  if (!config.allowExternalDirs) {
    return { allowed: false, reason: "External directory access not allowed" }
  }
  
  // Check explicit external directory permissions
  for (const perm of config.externalDirectoryPermissions) {
    const permPath = normalizePath(perm.path)
    if (normalizedPath.startsWith(permPath) || normalizedPath === permPath) {
      // Check if the operation is allowed
      if (perm.mode === "readwrite") {
        return { allowed: true }
      }
      if (perm.mode === "read" && operation === "read") {
        return { allowed: true }
      }
      if (perm.mode === "write" && operation === "write") {
        return { allowed: true }
      }
      // Found a matching permission but operation not allowed
      return { 
        allowed: false, 
        reason: `External directory ${perm.path} only allows ${perm.mode} operations` 
      }
    }
  }
  
  return { 
    allowed: false, 
    reason: "No permission configured for external directory" 
  }
}

function normalizePath(path: string): string {
  // Handle Windows drive letters and normalize separators
  return path.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, "")
}
```

### 6. Add Windows Worktree Cleanup Retry Logic
**File**: `src/tool/worktree-cleanup.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Upstream added retry logic for Windows worktree cleanup to handle file locks.

**New code**:
```typescript
import { Effect, Schedule, Duration } from "effect"
import * as fs from "fs/promises"
import * as path from "path"

const RETRY_DELAYS = [100, 200, 500, 1000, 2000] // ms

export interface CleanupResult {
  success: boolean
  path: string
  error?: string
  retries?: number
}

export function cleanupWorktree(worktreePath: string): Effect.Effect<CleanupResult, Error> {
  return Effect.gen(function* () {
    const normalizedPath = path.resolve(worktreePath)
    
    // Check if path exists
    try {
      await fs.access(normalizedPath)
    } catch {
      return { success: true, path: normalizedPath } // Already cleaned
    }

    // Try to remove with retries for Windows file locks
    let lastError: Error | undefined
    
    for (let i = 0; i < RETRY_DELAYS.length; i++) {
      try {
        await fs.rm(normalizedPath, { recursive: true, force: true })
        return { success: true, path: normalizedPath, retries: i }
      } catch (err) {
        lastError = err as Error
        
        // On Windows, EBUSY/EPERM often means file is locked
        if (isRetryableError(err)) {
          yield* Effect.sleep(Duration.millis(RETRY_DELAYS[i]))
          continue
        }
        
        // Non-retryable error
        break
      }
    }

    return { 
      success: false, 
      path: normalizedPath, 
      error: lastError?.message ?? "Unknown error",
      retries: RETRY_DELAYS.length 
    }
  })
}

function is
{"prompt_tokens":36434,"completion_tokens":4096,"total_tokens":40530}

[Session: c6d51363-46b4-47a4-a57f-43cb36ec9083]
[Messages: 2, Tokens: 40530]
