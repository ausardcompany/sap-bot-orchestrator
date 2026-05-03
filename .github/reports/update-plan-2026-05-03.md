# Update Plan for Alexi

Generated: 2026-05-03
Based on upstream commits: kilocode 7103b707f (316 commits from 2a6c3e7d5)

## Summary
- Total changes planned: 42
- Critical: 3 | High: 12 | Medium: 18 | Low: 9

## Changes

### 1. Add Disposable Interface to Core Types
**File**: `src/core/types.ts`
**Priority**: high
**Type**: feature
**Reason**: New Disposable interface required for proper resource cleanup in autocomplete and context services

**New code**:
```typescript
export interface Disposable {
  dispose(): void
}

export interface IDE {
  getIdeInfo(): Promise<IdeInfo>
  // ... existing methods ...
  
  // Updated callback signature
  onDidChangeActiveTextEditor(callback: (fileUri: string) => void): Disposable | void
}
```

### 2. Add dispose() Method to ContextRetrievalService
**File**: `src/core/autocomplete/context/ContextRetrievalService.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Memory leak fix - ImportDefinitionsService needs proper disposal

**Current code**:
```typescript
export class ContextRetrievalService {
  // ... existing code without dispose
}
```

**New code**:
```typescript
export class ContextRetrievalService {
  // ... existing code ...
  
  public dispose(): void {
    this.importDefinitionsService.dispose()
  }
}
```

### 3. Add dispose() Method to ImportDefinitionsService
**File**: `src/core/autocomplete/context/ImportDefinitionsService.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix memory leak by properly disposing active editor listener

**Current code**:
```typescript
export class ImportDefinitionsService {
  constructor(private readonly ide: IDE) {
    ide.onDidChangeActiveTextEditor((filepath) => {
      this.cache
        .initKey(filepath)
        .catch((e) => console.warn(`Failed to initialize ImportDefinitionService: ${e.message}`))
    })
  }
}
```

**New code**:
```typescript
import { Disposable, IDE, RangeInFileWithContents } from "../.."

export class ImportDefinitionsService {
  private readonly disposable: Disposable | void

  constructor(private readonly ide: IDE) {
    this.disposable = ide.onDidChangeActiveTextEditor((filepath) => {
      this.cache
        .initKey(filepath)
        .catch((e) => console.warn(`Failed to initialize ImportDefinitionService: ${e.message}`))
    })
  }

  dispose(): void {
    this.disposable?.dispose()
  }
}
```

### 4. Create Agent Manager Tool
**File**: `src/tool/agent-manager.ts`
**Priority**: high
**Type**: feature
**Reason**: New experimental Agent Manager tool for managing agent worktrees and sessions

**New code**:
```typescript
import { Schema } from "@effect/schema"
import { Tool, ToolInput, ToolOutput } from "./tool"

const AgentManagerInput = Schema.Struct({
  action: Schema.Literal("create", "list", "switch", "delete"),
  worktree: Schema.optional(Schema.String),
  task: Schema.optional(Schema.String),
})

type AgentManagerInput = Schema.Schema.Type<typeof AgentManagerInput>

export const AgentManagerTool: Tool<AgentManagerInput> = {
  name: "agent_manager",
  description: `Manage agent worktrees and sessions for parallel task execution.

Actions:
- create: Create a new worktree for a task
- list: List all active worktrees
- switch: Switch to a different worktree
- delete: Remove a worktree

This tool is experimental and requires explicit enablement.`,
  
  inputSchema: AgentManagerInput,
  
  async execute(input: AgentManagerInput, context): Promise<ToolOutput> {
    const { action, worktree, task } = input
    
    switch (action) {
      case "create":
        if (!task) {
          return { success: false, error: "Task description required for create action" }
        }
        // Implementation for creating worktree
        return { success: true, message: `Created worktree for task: ${task}` }
        
      case "list":
        // Implementation for listing worktrees
        return { success: true, worktrees: [] }
        
      case "switch":
        if (!worktree) {
          return { success: false, error: "Worktree name required for switch action" }
        }
        return { success: true, message: `Switched to worktree: ${worktree}` }
        
      case "delete":
        if (!worktree) {
          return { success: false, error: "Worktree name required for delete action" }
        }
        return { success: true, message: `Deleted worktree: ${worktree}` }
        
      default:
        return { success: false, error: `Unknown action: ${action}` }
    }
  }
}
```

### 5. Create Agent Manager Tool Description
**File**: `src/tool/agent-manager.txt`
**Priority**: medium
**Type**: feature
**Reason**: Documentation for agent manager tool

**New code**:
```text
The agent_manager tool allows you to manage parallel task execution through git worktrees.

Use this tool when:
- You need to work on multiple independent tasks simultaneously
- You want to isolate changes for different features
- You need to switch context between tasks

Actions:
- create: Set up a new worktree with a fresh session
- list: See all active worktrees and their status
- switch: Change to a different worktree context
- delete: Clean up completed worktrees
```

### 6. Update Tool Registry with Agent Manager
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Register the new Agent Manager tool in the tool registry

**Current code**:
```typescript
import { SemanticSearchTool } from "./semantic-search"

export function createToolRegistry(config: ToolRegistryConfig) {
  const tools: Tool[] = [
    // existing tools
  ]
  // ...
}
```

**New code**:
```typescript
import { SemanticSearchTool } from "./semantic-search"
import { AgentManagerTool } from "./agent-manager"

export function createToolRegistry(config: ToolRegistryConfig) {
  const tools: Tool[] = [
    // existing tools
  ]
  
  // Add experimental agent manager tool if enabled
  if (config.experimental?.agentManager) {
    tools.push(AgentManagerTool)
  }
  
  return {
    tools,
    getTool(name: string): Tool | undefined {
      return tools.find(t => t.name === name)
    },
    listTools(): Tool[] {
      return [...tools]
    }
  }
}
```

### 7. Update Bash Tool with Shell Separator Guards
**File**: `src/tool/bash.ts`
**Priority**: critical
**Type**: security
**Reason**: Security fix to block shell operators and prevent command injection

**Current code**:
```typescript
export async function executeBash(command: string, context: ToolContext): Promise<ToolOutput> {
  // existing validation
}
```

**New code**:
```typescript
const BLOCKED_SHELL_OPERATORS = [';', '&&', '||', '|', '>', '>>', '<', '`', '$(' ]

function containsBlockedOperator(command: string): boolean {
  // Check for shell separators/operators that could enable injection
  return BLOCKED_SHELL_OPERATORS.some(op => command.includes(op))
}

export async function executeBash(command: string, context: ToolContext): Promise<ToolOutput> {
  // Security: Block shell operators to prevent command chaining
  if (containsBlockedOperator(command)) {
    return {
      success: false,
      error: "Command contains blocked shell operators. Use separate commands instead."
    }
  }
  
  // existing validation and execution
}
```

### 8. Update Bash Tool with Sort Output Flag Denial
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: security
**Reason**: Deny sort output flag that could be used for file overwrite attacks

**New code** (add to existing validation):
```typescript
const BLOCKED_FLAGS = [
  { command: 'sort', flags: ['-o', '--output'] },
]

function hasBlockedFlags(command: string): { blocked: boolean; reason?: string } {
  for (const rule of BLOCKED_FLAGS) {
    if (command.startsWith(rule.command) || command.includes(` ${rule.command} `)) {
      for (const flag of rule.flags) {
        if (command.includes(flag)) {
          return { 
            blocked: true, 
            reason: `Flag '${flag}' is not allowed with '${rule.command}' command` 
          }
        }
      }
    }
  }
  return { blocked: false }
}

export async function executeBash(command: string, context: ToolContext): Promise<ToolOutput> {
  const flagCheck = hasBlockedFlags(command)
  if (flagCheck.blocked) {
    return { success: false, error: flagCheck.reason }
  }
  // ... rest of implementation
}
```

### 9. Migrate Tool Schemas to Effect Schema
**File**: `src/tool/tool.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream migrated from Zod to Effect Schema for better type safety and composability

**Current code**:
```typescript
import { z } from "zod"

export const ToolInputSchema = z.object({
  // ... zod schema
})
```

**New code**:
```typescript
import { Schema } from "@effect/schema"

export const ToolInputSchema = Schema.Struct({
  name: Schema.String,
  description: Schema.String,
  parameters: Schema.Record(Schema.String, Schema.Unknown),
})

export type ToolInput = Schema.Schema.Type<typeof ToolInputSchema>

// Helper for schema validation
export function validateToolInput<T>(schema: Schema.Schema<T>, input: unknown): T {
  return Schema.decodeUnknownSync(schema)(input)
}
```

### 10. Update Apply Patch Tool Schema
**File**: `src/tool/apply_patch.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Migrate to Effect Schema following upstream pattern

**Current code**:
```typescript
import { z } from "zod"

const ApplyPatchInput = z.object({
  patch: z.string(),
  path: z.string(),
})
```

**New code**:
```typescript
import { Schema } from "@effect/schema"

const ApplyPatchInput = Schema.Struct({
  patch: Schema.String.pipe(
    Schema.annotations({ description: "The unified diff patch to apply" })
  ),
  path: Schema.String.pipe(
    Schema.annotations({ description: "The file path to apply the patch to" })
  ),
})

type ApplyPatchInput = Schema.Schema.Type<typeof ApplyPatchInput>
```

### 11. Update Read Tool with Enhanced Path Handling
**File**: `src/tool/read.ts`
**Priority**: medium
**Type**: feature
**Reason**: Improved path handling and validation from upstream

**New code** (additions to existing):
```typescript
import { Schema } from "@effect/schema"

const ReadToolInput = Schema.Struct({
  path: Schema.String.pipe(
    Schema.annotations({ description: "Absolute or relative file path to read" })
  ),
  startLine: Schema.optional(Schema.Number.pipe(
    Schema.int(),
    Schema.positive(),
    Schema.annotations({ description: "Starting line number (1-indexed)" })
  )),
  endLine: Schema.optional(Schema.Number.pipe(
    Schema.int(),
    Schema.positive(),
    Schema.annotations({ description: "Ending line number (inclusive)" })
  )),
})

// Add path normalization
function normalizePath(path: string, workingDir: string): string {
  if (path.startsWith('/')) {
    return path
  }
  return join(workingDir, path)
}
```

### 12. Add Truncation Configuration to Tool System
**File**: `src/tool/truncate.ts`
**Priority**: medium
**Type**: feature
**Reason**: Allow configuring tool output truncation limits

**Current code**:
```typescript
const DEFAULT_MAX_OUTPUT = 10000

export function truncateOutput(output: string): string {
  if (output.length > DEFAULT_MAX_OUTPUT) {
    return output.slice(0, DEFAULT_MAX_OUTPUT) + "\n... (truncated)"
  }
  return output
}
```

**New code**:
```typescript
import { Schema } from "@effect/schema"

export const TruncationConfig = Schema.Struct({
  maxOutputLength: Schema.optional(Schema.Number.pipe(
    Schema.int(),
    Schema.positive()
  ), { default: () => 10000 }),
  maxLineCount: Schema.optional(Schema.Number.pipe(
    Schema.int(),
    Schema.positive()
  ), { default: () => 500 }),
  truncationMessage: Schema.optional(Schema.String, {
    default: () => "\n... (output truncated)"
  }),
})

export type TruncationConfig = Schema.Schema.Type<typeof TruncationConfig>

export function truncateOutput(
  output: string, 
  config: TruncationConfig = Schema.decodeUnknownSync(TruncationConfig)({})
): string {
  const lines = output.split('\n')
  
  // Check line count first
  if (lines.length > config.maxLineCount) {
    output = lines.slice(0, config.maxLineCount).join('\n')
  }
  
  // Then check character length
  if (output.length > config.maxOutputLength) {
    output = output.slice(0, config.maxOutputLength)
  }
  
  if (output !== arguments[0]) {
    output += config.truncationMessage
  }
  
  return output
}
```

### 13. Update Permission System for External Directory Handling
**File**: `src/permission/index.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Fix external directory read permission prompts and honor read-only allows

**Current code**:
```typescript
export async function checkPermission(
  action: PermissionAction,
  path: string,
  context: PermissionContext
): Promise<PermissionResult> {
  // existing logic
}
```

**New code**:
```typescript
export async function checkPermission(
  action: PermissionAction,
  path: string,
  context: PermissionContext
): Promise<PermissionResult> {
  const normalizedPath = normalizePath(path)
  
  // Check if path is in an allowed external directory
  const externalAllow = context.externalDirectories?.find(dir => 
    normalizedPath.startsWith(normalizePath(dir.path))
  )
  
  if (externalAllow) {
    // Honor read-only external directory allows
    if (action === 'read') {
      return { allowed: true, reason: 'External directory read allowed' }
    }
    if (action === 'write' && !externalAllow.readOnly) {
      return { allowed: true, reason: 'External directory write allowed' }
    }
    if (action === 'write' && externalAllow.readOnly) {
      return { 
        allowed: false, 
        reason: 'External directory is read-only',
        requiresPrompt: true 
      }
    }
  }
  
  // Check if path is outside working directory
  if (!normalizedPath.startsWith(context.workingDirectory)) {
    return {
      allowed: false,
      reason: 'Path is outside working directory',
      requiresPrompt: true
    }
  }
  
  // ... rest of existing permission logic
}
```

### 14. Add Config Path Handling for Windows
**File**: `src/permission/config-paths.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix Windows config path handling with drive letter stripping

**New code**:
```typescript
{"prompt_tokens":36397,"completion_tokens":4096,"total_tokens":40493}

[Session: a75936fd-4d2b-40e4-baa9-bea851b117e9]
[Messages: 2, Tokens: 40493]
