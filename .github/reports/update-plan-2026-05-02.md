# Update Plan for Alexi

Generated: 2026-05-02
Based on upstream commits: kilocode 4d1402bcd..2a6c3e7d5 (314 commits)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Add Disposable Interface for Resource Cleanup
**File**: `src/core/types.ts`
**Priority**: critical
**Type**: feature
**Reason**: New Disposable interface pattern is used across autocomplete and context services for proper resource cleanup, preventing memory leaks

**New code**:
```typescript
/**
 * Interface for disposable resources that need cleanup
 */
export interface Disposable {
  dispose(): void
}

/**
 * Composite disposable that manages multiple disposables
 */
export class CompositeDisposable implements Disposable {
  private disposables: Disposable[] = []

  add(disposable: Disposable): void {
    this.disposables.push(disposable)
  }

  dispose(): void {
    for (const disposable of this.disposables) {
      try {
        disposable.dispose()
      } catch (e) {
        console.warn('Error disposing resource:', e)
      }
    }
    this.disposables = []
  }
}
```

### 2. Fix Permission System - Honor Read-Only External Directory Allows
**File**: `src/permission/index.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: External directories with read-only permissions were incorrectly prompting for read access. This security-related fix ensures proper permission handling.

**Current code** (if modifying):
```typescript
export async function checkPermission(
  path: string,
  operation: 'read' | 'write' | 'execute',
  config: PermissionConfig
): Promise<PermissionResult> {
  // existing permission check logic
}
```

**New code**:
```typescript
export async function checkPermission(
  path: string,
  operation: 'read' | 'write' | 'execute',
  config: PermissionConfig
): Promise<PermissionResult> {
  // Check external directory allows first
  const externalAllow = config.externalDirectories?.find(dir => 
    path.startsWith(dir.path)
  )
  
  if (externalAllow) {
    // Honor read-only external directory allows
    if (operation === 'read' && externalAllow.permissions.includes('read')) {
      return { allowed: true, reason: 'external_directory_allow' }
    }
    if (operation === 'write' && externalAllow.permissions.includes('write')) {
      return { allowed: true, reason: 'external_directory_allow' }
    }
    // If operation not in permissions, fall through to normal check
  }
  
  // existing permission check logic continues...
}
```

### 3. Persist Command Permission Approvals
**File**: `src/permission/config-paths.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Command permission approvals were not being persisted, causing users to re-approve the same commands repeatedly

**Current code** (if modifying):
```typescript
export interface PermissionStore {
  load(): Promise<PermissionState>
  save(state: PermissionState): Promise<void>
}
```

**New code**:
```typescript
export interface PermissionStore {
  load(): Promise<PermissionState>
  save(state: PermissionState): Promise<void>
}

export interface PermissionState {
  // existing fields...
  commandApprovals: CommandApproval[]
}

export interface CommandApproval {
  command: string
  pattern: string // glob pattern for command matching
  approvedAt: number
  scope: 'session' | 'project' | 'global'
}

/**
 * Prune stale permission directory entries
 */
export function pruneStalePermissions(
  state: PermissionState,
  maxAge: number = 30 * 24 * 60 * 60 * 1000 // 30 days
): PermissionState {
  const now = Date.now()
  return {
    ...state,
    commandApprovals: state.commandApprovals.filter(
      approval => now - approval.approvedAt < maxAge
    )
  }
}
```

### 4. Add Tool Output Truncation Configuration
**File**: `src/tool/truncate.ts`
**Priority**: high
**Type**: feature
**Reason**: Allow configuring tool output truncation limits to handle large outputs more effectively

**Current code** (if modifying):
```typescript
const DEFAULT_MAX_OUTPUT = 10000

export function truncateOutput(output: string): string {
  if (output.length <= DEFAULT_MAX_OUTPUT) {
    return output
  }
  return output.slice(0, DEFAULT_MAX_OUTPUT) + '\n... (truncated)'
}
```

**New code**:
```typescript
export interface TruncationConfig {
  maxOutputLength: number
  maxLineCount: number
  preserveEnds: boolean // keep beginning and end
  endPreserveRatio: number // 0.2 = keep 20% at end
}

const DEFAULT_CONFIG: TruncationConfig = {
  maxOutputLength: 10000,
  maxLineCount: 500,
  preserveEnds: true,
  endPreserveRatio: 0.2
}

export function truncateOutput(
  output: string,
  config: Partial<TruncationConfig> = {}
): string {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  
  if (output.length <= cfg.maxOutputLength) {
    return output
  }
  
  if (cfg.preserveEnds) {
    const endLength = Math.floor(cfg.maxOutputLength * cfg.endPreserveRatio)
    const startLength = cfg.maxOutputLength - endLength - 50 // 50 for separator
    return (
      output.slice(0, startLength) +
      '\n\n... [truncated ' + (output.length - cfg.maxOutputLength) + ' characters] ...\n\n' +
      output.slice(-endLength)
    )
  }
  
  return output.slice(0, cfg.maxOutputLength) + '\n... (truncated)'
}
```

### 5. Enhance Bash Tool with Shell Operator Blocking
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: security
**Reason**: Block shell separators and dangerous operators to prevent command injection

**Current code** (if modifying):
```typescript
export async function executeBash(
  command: string,
  options: BashOptions
): Promise<BashResult> {
  // execute command
}
```

**New code**:
```typescript
const BLOCKED_OPERATORS = [
  '&&', '||', ';', '|', '`', '$(',
  '>', '>>', '<', '<<', '&>', '2>'
]

const BLOCKED_PATTERNS = [
  /\$\{.*\}/, // variable expansion
  /`.*`/, // backtick command substitution
]

function validateCommand(command: string): { valid: boolean; reason?: string } {
  // Check for blocked operators
  for (const op of BLOCKED_OPERATORS) {
    if (command.includes(op)) {
      return { 
        valid: false, 
        reason: `Shell operator '${op}' is not allowed for security reasons` 
      }
    }
  }
  
  // Check for blocked patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      return { 
        valid: false, 
        reason: `Command contains blocked pattern: ${pattern}` 
      }
    }
  }
  
  return { valid: true }
}

export async function executeBash(
  command: string,
  options: BashOptions
): Promise<BashResult> {
  const validation = validateCommand(command)
  if (!validation.valid) {
    return {
      success: false,
      error: validation.reason,
      exitCode: 1
    }
  }
  
  // execute command
}
```

### 6. Add Agent Manager Tool
**File**: `src/tool/agent-manager.ts`
**Priority**: high
**Type**: feature
**Reason**: New experimental Agent Manager tool for managing agent worktrees and tasks

**New code**:
```typescript
import { Tool, ToolResult } from './tool'
import { Schema } from '@effect/schema'

export const AgentManagerToolSchema = Schema.Struct({
  action: Schema.Union(
    Schema.Literal('create'),
    Schema.Literal('list'),
    Schema.Literal('status'),
    Schema.Literal('terminate')
  ),
  taskId: Schema.optional(Schema.String),
  worktree: Schema.optional(Schema.String),
  prompt: Schema.optional(Schema.String)
})

export type AgentManagerInput = Schema.Schema.Type<typeof AgentManagerToolSchema>

export const agentManagerTool: Tool<AgentManagerInput> = {
  name: 'agent_manager',
  description: `Manage agent worktrees and tasks. Actions:
- create: Create a new agent task in a worktree
- list: List all active agent tasks
- status: Get status of a specific task
- terminate: Stop a running task`,
  
  schema: AgentManagerToolSchema,
  
  async execute(input: AgentManagerInput): Promise<ToolResult> {
    switch (input.action) {
      case 'create':
        return await createAgentTask(input.worktree, input.prompt)
      case 'list':
        return await listAgentTasks()
      case 'status':
        return await getTaskStatus(input.taskId!)
      case 'terminate':
        return await terminateTask(input.taskId!)
      default:
        return { success: false, error: 'Unknown action' }
    }
  }
}

async function createAgentTask(worktree?: string, prompt?: string): Promise<ToolResult> {
  // Implementation for creating agent tasks
  return { success: true, data: { taskId: 'new-task-id' } }
}

async function listAgentTasks(): Promise<ToolResult> {
  return { success: true, data: { tasks: [] } }
}

async function getTaskStatus(taskId: string): Promise<ToolResult> {
  return { success: true, data: { status: 'running' } }
}

async function terminateTask(taskId: string): Promise<ToolResult> {
  return { success: true, data: { terminated: true } }
}
```

### 7. Register Agent Manager Tool in Registry
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Register the new Agent Manager tool in the tool registry

**Current code** (if modifying):
```typescript
import { readTool } from './read'
import { writeTool } from './write'
// other imports...

export const defaultTools: Tool[] = [
  readTool,
  writeTool,
  // other tools...
]
```

**New code**:
```typescript
import { readTool } from './read'
import { writeTool } from './write'
import { agentManagerTool } from './agent-manager'
// other imports...

export const defaultTools: Tool[] = [
  readTool,
  writeTool,
  // other tools...
]

// Experimental tools that can be enabled via config
export const experimentalTools: Tool[] = [
  agentManagerTool,
]

export function getTools(config: { enableExperimental?: boolean } = {}): Tool[] {
  if (config.enableExperimental) {
    return [...defaultTools, ...experimentalTools]
  }
  return defaultTools
}
```

### 8. Migrate Tool Schemas to Effect Schema
**File**: `src/tool/tool.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream is migrating from Zod to Effect Schema for better type safety and composition

**Current code** (if modifying):
```typescript
import { z } from 'zod'

export interface Tool<T = unknown> {
  name: string
  description: string
  schema: z.ZodSchema<T>
  execute(input: T): Promise<ToolResult>
}
```

**New code**:
```typescript
import { Schema } from '@effect/schema'
import { z } from 'zod'

// Support both Zod and Effect Schema during migration
export type ToolSchema<T> = z.ZodSchema<T> | Schema.Schema<T>

export interface Tool<T = unknown> {
  name: string
  description: string
  schema: ToolSchema<T>
  execute(input: T): Promise<ToolResult>
}

// Helper to check schema type
export function isEffectSchema<T>(schema: ToolSchema<T>): schema is Schema.Schema<T> {
  return '_tag' in schema && schema._tag === 'Schema'
}

// Parse input with either schema type
export function parseToolInput<T>(schema: ToolSchema<T>, input: unknown): T {
  if (isEffectSchema(schema)) {
    return Schema.decodeUnknownSync(schema)(input)
  }
  return schema.parse(input)
}
```

### 9. Update Read Tool with Improved Line Range Handling
**File**: `src/tool/read.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Improved line range handling and better error messages for file reading

**Current code** (if modifying):
```typescript
export async function readFile(
  path: string,
  options?: { startLine?: number; endLine?: number }
): Promise<string> {
  const content = await fs.readFile(path, 'utf-8')
  // handle line ranges
}
```

**New code**:
```typescript
export interface ReadOptions {
  startLine?: number
  endLine?: number
  maxLines?: number
  encoding?: BufferEncoding
}

export async function readFile(
  path: string,
  options: ReadOptions = {}
): Promise<{ content: string; totalLines: number; truncated: boolean }> {
  const { startLine = 1, endLine, maxLines = 2000, encoding = 'utf-8' } = options
  
  const content = await fs.readFile(path, encoding)
  const lines = content.split('\n')
  const totalLines = lines.length
  
  // Validate line numbers
  const start = Math.max(1, startLine) - 1 // Convert to 0-indexed
  const end = endLine ? Math.min(endLine, totalLines) : totalLines
  
  if (start >= totalLines) {
    return { 
      content: '', 
      totalLines, 
      truncated: false 
    }
  }
  
  let selectedLines = lines.slice(start, end)
  let truncated = false
  
  if (selectedLines.length > maxLines) {
    selectedLines = selectedLines.slice(0, maxLines)
    truncated = true
  }
  
  return {
    content: selectedLines.join('\n'),
    totalLines,
    truncated
  }
}
```

### 10. Add Semantic Search Tool Updates
**File**: `src/tool/semantic-search.ts`
**Priority**: high
**Type**: feature
**Reason**: Update semantic search tool with Effect Schema migration and improved search capabilities

**Current code** (if modifying):
```typescript
import { z } from 'zod'

export const semanticSearchSchema = z.object({
  query: z.string(),
  maxResults: z.number().optional()
})
```

**New code**:
```typescript
import { Schema } from '@effect/schema'

export const SemanticSearchSchema = Schema.Struct({
  query: Schema.String.pipe(Schema.minLength(1)),
  maxResults: Schema.optional(Schema.Number.pipe(Schema.positive())),
  fileTypes: Schema.optional(Schema.Array(Schema.String)),
  excludePaths: Schema.optional(Schema.Array(Schema.String)),
  includeContext: Schema.optional(Schema.Boolean)
})

export type SemanticSearchInput = Schema.Schema.Type<typeof SemanticSearchSchema>

export interface SemanticSearchResult {
  file: string
{"prompt_tokens":36313,"completion_tokens":4096,"total_tokens":40409}

[Session: 0dc090d0-4832-4c4d-97c4-b782223d11d9]
[Messages: 2, Tokens: 40409]
