# Update Plan for Alexi

Generated: 2026-05-01
Based on upstream commits: kilocode 2a6c3e7d5..010fc16cf (310 commits)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Add Disposable Interface for Resource Cleanup
**File**: `src/core/types.ts`
**Priority**: critical
**Type**: feature
**Reason**: New Disposable interface added to core types for proper resource cleanup pattern, used across autocomplete and context services.

**New code**:
```typescript
export interface Disposable {
  dispose(): void
}
```

### 2. Add dispose() Method to ContextRetrievalService
**File**: `src/core/autocomplete/context/ContextRetrievalService.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Memory leak fix - ImportDefinitionsService listener was not being disposed, causing resource leaks.

**Current code**:
```typescript
export class ContextRetrievalService {
  // ... existing methods
}
```

**New code**:
```typescript
export class ContextRetrievalService {
  // ... existing methods

  public dispose(): void {
    this.importDefinitionsService.dispose()
  }
}
```

### 3. Add dispose() Method to ImportDefinitionsService
**File**: `src/core/autocomplete/context/ImportDefinitionsService.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Memory leak fix - active editor listener was not being disposed when service is destroyed.

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
import { Disposable } from "../../types"

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

### 4. Update IDE Interface for Disposable Return Type
**File**: `src/core/types.ts`
**Priority**: high
**Type**: feature
**Reason**: IDE interface callback methods should return Disposable for proper cleanup.

**Current code**:
```typescript
export interface IDE {
  // ...
  onDidChangeActiveTextEditor(callback: (fileUri: string) => void): void
}
```

**New code**:
```typescript
export interface IDE {
  // ...
  onDidChangeActiveTextEditor(callback: (fileUri: string) => void): Disposable | void
}
```

### 5. Add Experimental Agent Manager Tool
**File**: `src/tool/agent-manager.ts`
**Priority**: high
**Type**: feature
**Reason**: New experimental Agent Manager tool added for managing agent workflows and worktrees.

**New code**:
```typescript
import { Schema } from "@effect/schema"
import { Tool, ToolInput, ToolOutput } from "./tool"

const AgentManagerInput = Schema.Struct({
  action: Schema.Union(
    Schema.Literal("create"),
    Schema.Literal("list"),
    Schema.Literal("status"),
    Schema.Literal("terminate")
  ),
  taskId: Schema.optional(Schema.String),
  worktree: Schema.optional(Schema.String),
  prompt: Schema.optional(Schema.String),
})

const AgentManagerOutput = Schema.Struct({
  success: Schema.Boolean,
  message: Schema.String,
  data: Schema.optional(Schema.Unknown),
})

export const agentManagerTool: Tool<typeof AgentManagerInput, typeof AgentManagerOutput> = {
  name: "agent_manager",
  description: `Manage agent tasks and worktrees. Actions:
- create: Create a new agent task in a worktree
- list: List all active agent tasks
- status: Get status of a specific task
- terminate: Terminate a running task`,
  input: AgentManagerInput,
  output: AgentManagerOutput,
  experimental: true,
  
  async execute(input: ToolInput<typeof AgentManagerInput>): Promise<ToolOutput<typeof AgentManagerOutput>> {
    const { action, taskId, worktree, prompt } = input
    
    switch (action) {
      case "create":
        if (!worktree || !prompt) {
          return { success: false, message: "worktree and prompt required for create action" }
        }
        // Implementation for creating agent task
        return { success: true, message: `Task created in ${worktree}`, data: { taskId: crypto.randomUUID() } }
        
      case "list":
        // Implementation for listing tasks
        return { success: true, message: "Active tasks", data: [] }
        
      case "status":
        if (!taskId) {
          return { success: false, message: "taskId required for status action" }
        }
        return { success: true, message: `Status for ${taskId}`, data: {} }
        
      case "terminate":
        if (!taskId) {
          return { success: false, message: "taskId required for terminate action" }
        }
        return { success: true, message: `Terminated ${taskId}` }
        
      default:
        return { success: false, message: `Unknown action: ${action}` }
    }
  }
}
```

### 6. Add Agent Manager Tool Description File
**File**: `src/tool/agent-manager.txt`
**Priority**: low
**Type**: feature
**Reason**: Tool description for agent manager displayed in help and documentation.

**New code**:
```
The Agent Manager tool allows you to create and manage parallel agent tasks.

Each task runs in an isolated git worktree, allowing multiple agents to work
on different parts of a codebase simultaneously without conflicts.

Actions:
- create: Start a new agent task with a specific prompt
- list: View all running agent tasks
- status: Check the progress of a specific task
- terminate: Stop a running task

Example usage:
- Create task: agent_manager(action="create", worktree="feature-x", prompt="Implement feature X")
- List tasks: agent_manager(action="list")
- Check status: agent_manager(action="status", taskId="abc-123")
- Stop task: agent_manager(action="terminate", taskId="abc-123")
```

### 7. Update Tool Registry with Agent Manager
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Register the new agent manager tool and add experimental tool filtering.

**Current code**:
```typescript
import { readTool } from "./read"
import { writeTool } from "./write"
// ... other imports

export const defaultTools = [
  readTool,
  writeTool,
  // ... other tools
]
```

**New code**:
```typescript
import { readTool } from "./read"
import { writeTool } from "./write"
import { agentManagerTool } from "./agent-manager"
// ... other imports

export const defaultTools = [
  readTool,
  writeTool,
  // ... other tools
]

export const experimentalTools = [
  agentManagerTool,
]

export function getTools(options: { includeExperimental?: boolean } = {}): Tool[] {
  const tools = [...defaultTools]
  if (options.includeExperimental) {
    tools.push(...experimentalTools)
  }
  return tools
}

export function getToolByName(name: string, options: { includeExperimental?: boolean } = {}): Tool | undefined {
  return getTools(options).find(t => t.name === name)
}
```

### 8. Update Bash Tool with Shell Operator Blocking
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: security
**Reason**: Security fix to block shell separators and dangerous operators that could allow command injection.

**Current code**:
```typescript
async execute(input: ToolInput<typeof BashInput>): Promise<ToolOutput<typeof BashOutput>> {
  const { command, timeout } = input
  // ... execution logic
}
```

**New code**:
```typescript
const BLOCKED_SHELL_OPERATORS = [
  '&&', '||', ';', '|', '`', '$(',
  '>', '>>', '<', '<<', '2>', '2>>',
  '&>', '&>>'
]

function containsBlockedOperator(command: string): string | null {
  for (const op of BLOCKED_SHELL_OPERATORS) {
    // Check for operator not inside quotes
    const regex = new RegExp(`(?<!['"\\\\])${escapeRegExp(op)}(?!['"\\\\])`)
    if (regex.test(command)) {
      return op
    }
  }
  return null
}

async execute(input: ToolInput<typeof BashInput>): Promise<ToolOutput<typeof BashOutput>> {
  const { command, timeout } = input
  
  // Security: Block shell operators
  const blockedOp = containsBlockedOperator(command)
  if (blockedOp) {
    return {
      success: false,
      exitCode: 1,
      stdout: "",
      stderr: `Shell operator '${blockedOp}' is not allowed. Please use separate commands.`
    }
  }
  
  // ... existing execution logic
}
```

### 9. Add Configurable Tool Output Truncation
**File**: `src/tool/truncate.ts`
**Priority**: medium
**Type**: feature
**Reason**: Allow configuring tool output truncation limits via settings.

**Current code**:
```typescript
const DEFAULT_MAX_OUTPUT_LENGTH = 10000

export function truncateOutput(output: string): string {
  if (output.length <= DEFAULT_MAX_OUTPUT_LENGTH) {
    return output
  }
  return output.slice(0, DEFAULT_MAX_OUTPUT_LENGTH) + "\n... (truncated)"
}
```

**New code**:
```typescript
export interface TruncationConfig {
  maxOutputLength?: number
  maxLineCount?: number
  preserveEnds?: boolean
}

const DEFAULT_CONFIG: Required<TruncationConfig> = {
  maxOutputLength: 10000,
  maxLineCount: 500,
  preserveEnds: true
}

export function truncateOutput(output: string, config: TruncationConfig = {}): string {
  const { maxOutputLength, maxLineCount, preserveEnds } = { ...DEFAULT_CONFIG, ...config }
  
  // Check line count first
  const lines = output.split('\n')
  if (lines.length > maxLineCount) {
    if (preserveEnds) {
      const headLines = Math.floor(maxLineCount * 0.4)
      const tailLines = Math.floor(maxLineCount * 0.4)
      const head = lines.slice(0, headLines).join('\n')
      const tail = lines.slice(-tailLines).join('\n')
      return `${head}\n\n... (${lines.length - headLines - tailLines} lines truncated) ...\n\n${tail}`
    }
    return lines.slice(0, maxLineCount).join('\n') + `\n... (${lines.length - maxLineCount} lines truncated)`
  }
  
  // Then check character length
  if (output.length <= maxOutputLength) {
    return output
  }
  
  if (preserveEnds) {
    const headLength = Math.floor(maxOutputLength * 0.4)
    const tailLength = Math.floor(maxOutputLength * 0.4)
    return output.slice(0, headLength) + 
           `\n\n... (${output.length - headLength - tailLength} chars truncated) ...\n\n` + 
           output.slice(-tailLength)
  }
  
  return output.slice(0, maxOutputLength) + `\n... (${output.length - maxOutputLength} chars truncated)`
}
```

### 10. Update Permission System for External Directory Reads
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix external directory read permission prompts - honor read-only allows correctly.

**Current code**:
```typescript
async checkPermission(path: string, operation: "read" | "write"): Promise<boolean> {
  // ... permission checking logic
}
```

**New code**:
```typescript
interface PermissionRule {
  path: string
  operations: ("read" | "write")[]
  allow: boolean
}

async checkPermission(path: string, operation: "read" | "write"): Promise<boolean> {
  const normalizedPath = this.normalizePath(path)
  
  // Check explicit rules first
  for (const rule of this.rules) {
    if (this.pathMatches(normalizedPath, rule.path)) {
      if (rule.operations.includes(operation)) {
        return rule.allow
      }
      // If rule exists but doesn't include this operation, continue checking
    }
  }
  
  // Check external directories with read-only consideration
  if (this.isExternalPath(normalizedPath)) {
    const externalRule = this.externalDirectoryRules.find(r => 
      this.pathMatches(normalizedPath, r.path)
    )
    
    if (externalRule) {
      // Allow read if rule exists (even if write-only specified)
      if (operation === "read") {
        return true
      }
      return externalRule.operations.includes("write")
    }
    
    // No rule for this external path - prompt user
    return this.promptForPermission(normalizedPath, operation)
  }
  
  // Default to project directory rules
  return this.checkProjectPermission(normalizedPath, operation)
}
```

### 11. Add Permission Config Path Handling for Windows
**File**: `src/permission/config-paths.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix Windows config path handling with drive letter stripping and symlink resolution.

**Current code**:
```typescript
export function getConfigPath(): string {
  return path.join(os.homedir(), ".alexi", "config.json")
}
```

**New code**:
```typescript
import * as os from "os"
import * as path from "path"
import * as fs from "fs"

export function getConfigPath(): string {
  return path.join(getConfigDir(), "config.json")
}

export function getConfigDir(): string {
  const homeDir = os.homedir()
  
  if (process.platform === "win32") {
    // Handle Windows-specific paths
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming")
    return path.join(appData, "alexi")
  }
  
  // Unix-like systems
  const xdgConfig = process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config")
  return path.join(xdgConfig, "alexi")
}

export function normalizePath(filePath: string): string {
  let normalized = path.normalize(filePath)
  
  // Resolve symlinks
  try {
    normalized = fs.realpathSync(normalized)
  } catch {
    // Path may not exist yet, use normalized version
  }
  
  // Handle Windows drive letter casing
  if (process.platform === "win32" && /^[a-zA-Z]:/.test(normalized)) {
    normalized = normalized[0].toUpperCase() + normalized.slice(1)
  }
  
  return normalized
}

export function comparePaths(path1: string, path2: string): boolean {
  const norm1 = normalizePath(path1)
  const norm2 = normalizePath(path2)
  
  if (process.platform === "win32") {
    return norm1.toLowerCase() === norm2.toLowerCase()
  }
  
  return norm1 === norm2
}
{"prompt_tokens":36410,"completion_tokens":4096,"total_tokens":40506}

[Session: 90a8c594-73c2-4b98-81e6-456a34a583cb]
[Messages: 2, Tokens: 40506]
