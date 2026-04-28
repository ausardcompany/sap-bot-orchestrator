# Update Plan for Alexi

Generated: 2026-04-11
Based on upstream commits: kilocode 1a5be52c7..6fc863f4e (602 commits)

## Summary
- Total changes planned: 47
- Critical: 3 | High: 12 | Medium: 22 | Low: 10

## Changes

### 1. Add Recall Tool for Cross-Session Search
**File**: `src/tool/recall.ts`
**Priority**: high
**Type**: feature
**Reason**: New tool added in kilocode that enables searching across sessions for context recall, improving agent memory capabilities.

**New code**:
```typescript
import { Effect, Schema } from "effect"
import { Tool, ToolError } from "./tool.js"
import { Session } from "../session/index.js"
import { Project } from "../project/project.js"

export const RecallToolInput = Schema.Struct({
  query: Schema.String.pipe(
    Schema.annotations({
      description: "Search query to find relevant information from past sessions"
    })
  ),
  sessionLimit: Schema.optional(Schema.Number.pipe(
    Schema.annotations({
      description: "Maximum number of sessions to search (default: 10)"
    })
  )),
  includeCurrentSession: Schema.optional(Schema.Boolean.pipe(
    Schema.annotations({
      description: "Whether to include the current session in results (default: false)"
    })
  ))
})

export type RecallToolInput = Schema.Schema.Type<typeof RecallToolInput>

export const RecallToolOutput = Schema.Struct({
  results: Schema.Array(Schema.Struct({
    sessionId: Schema.String,
    messageId: Schema.String,
    content: Schema.String,
    relevance: Schema.Number,
    timestamp: Schema.String
  })),
  totalMatches: Schema.Number
})

export type RecallToolOutput = Schema.Schema.Type<typeof RecallToolOutput>

export const RecallTool = Tool.define({
  name: "kilo_local_recall",
  description: `Search through past conversation sessions to recall relevant context and information.
Use this tool when you need to:
- Remember what was discussed in previous sessions
- Find code or solutions from past conversations
- Retrieve context that might be relevant to the current task`,
  input: RecallToolInput,
  output: RecallToolOutput,
  
  execute: (input, context) => Effect.gen(function* () {
    const project = yield* Project
    const sessions = yield* Session.listForProject(project.id, {
      limit: input.sessionLimit ?? 10,
      excludeCurrent: !input.includeCurrentSession
    })
    
    const results: Array<{
      sessionId: string
      messageId: string
      content: string
      relevance: number
      timestamp: string
    }> = []
    
    for (const session of sessions) {
      const messages = yield* Session.getMessages(session.id)
      for (const message of messages) {
        if (message.content.toLowerCase().includes(input.query.toLowerCase())) {
          results.push({
            sessionId: session.id,
            messageId: message.id,
            content: message.content.slice(0, 500),
            relevance: calculateRelevance(message.content, input.query),
            timestamp: message.createdAt.toISOString()
          })
        }
      }
    }
    
    results.sort((a, b) => b.relevance - a.relevance)
    
    return {
      results: results.slice(0, 20),
      totalMatches: results.length
    }
  })
})

function calculateRelevance(content: string, query: string): number {
  const lowerContent = content.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const occurrences = (lowerContent.match(new RegExp(lowerQuery, 'g')) || []).length
  const density = occurrences / (content.length / 100)
  return Math.min(density * 10, 100)
}
```

### 2. Add Tool Schema Definitions
**File**: `src/tool/schema.ts`
**Priority**: high
**Type**: feature
**Reason**: New schema file added in kilocode for centralized tool type definitions with branded IDs.

**New code**:
```typescript
import { Schema } from "effect"

// Branded ID types for type safety
export const ToolID = Schema.String.pipe(
  Schema.brand("ToolID"),
  Schema.annotations({
    description: "Unique identifier for a tool"
  })
)
export type ToolID = Schema.Schema.Type<typeof ToolID>

export const ToolCallID = Schema.String.pipe(
  Schema.brand("ToolCallID"),
  Schema.annotations({
    description: "Unique identifier for a tool call instance"
  })
)
export type ToolCallID = Schema.Schema.Type<typeof ToolCallID>

export const ToolResultID = Schema.String.pipe(
  Schema.brand("ToolResultID"),
  Schema.annotations({
    description: "Unique identifier for a tool result"
  })
)
export type ToolResultID = Schema.Schema.Type<typeof ToolResultID>

// Tool execution state
export const ToolExecutionState = Schema.Literal(
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
)
export type ToolExecutionState = Schema.Schema.Type<typeof ToolExecutionState>

// Tool permission level
export const ToolPermissionLevel = Schema.Literal(
  "allow",
  "ask",
  "deny"
)
export type ToolPermissionLevel = Schema.Schema.Type<typeof ToolPermissionLevel>

// Tool metadata for registration
export const ToolMetadata = Schema.Struct({
  id: ToolID,
  name: Schema.String,
  description: Schema.String,
  category: Schema.optional(Schema.String),
  requiresPermission: Schema.Boolean,
  defaultPermission: ToolPermissionLevel
})
export type ToolMetadata = Schema.Schema.Type<typeof ToolMetadata>
```

### 3. Update Tool Registry with Recall Tool
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Registry needs to include the new recall tool and support dynamic tool registration.

**Current code**:
```typescript
import { BashTool } from "./bash.js"
import { EditTool } from "./edit.js"
import { WriteTool } from "./write.js"
// ... other imports

const defaultTools = [
  BashTool,
  EditTool,
  WriteTool,
  // ... other tools
]
```

**New code**:
```typescript
import { BashTool } from "./bash.js"
import { EditTool } from "./edit.js"
import { WriteTool } from "./write.js"
import { RecallTool } from "./recall.js"
import { ToolID, ToolMetadata } from "./schema.js"
// ... other imports

const defaultTools = [
  BashTool,
  EditTool,
  WriteTool,
  RecallTool,
  // ... other tools
]

// Dynamic tool registration support
const registeredTools = new Map<ToolID, Tool>()

export function registerTool(tool: Tool): void {
  const id = tool.metadata.id as ToolID
  if (registeredTools.has(id)) {
    throw new Error(`Tool with ID ${id} is already registered`)
  }
  registeredTools.set(id, tool)
}

export function unregisterTool(id: ToolID): boolean {
  return registeredTools.delete(id)
}

export function getTool(id: ToolID): Tool | undefined {
  return registeredTools.get(id) ?? defaultTools.find(t => t.metadata.id === id)
}

export function getAllTools(): Tool[] {
  return [...defaultTools, ...registeredTools.values()]
}
```

### 4. Update Bash Tool with Improved Error Handling
**File**: `src/tool/bash.ts`
**Priority**: medium
**Type**: bugfix
**Reason**: Kilocode simplified bash tool implementation and improved error handling.

**Current code**:
```typescript
execute: (input, context) => Effect.gen(function* () {
  const shell = yield* Shell
  const result = yield* shell.execute(input.command, {
    cwd: input.workingDirectory,
    timeout: input.timeout
  })
  return result
})
```

**New code**:
```typescript
execute: (input, context) => Effect.gen(function* () {
  const shell = yield* Shell
  const result = yield* shell.execute(input.command, {
    cwd: input.workingDirectory,
    timeout: input.timeout
  }).pipe(
    Effect.catchTag("ShellError", (error) => 
      Effect.succeed({
        exitCode: error.exitCode ?? 1,
        stdout: error.stdout ?? "",
        stderr: error.stderr ?? error.message,
        timedOut: error.timedOut ?? false
      })
    )
  )
  return result
})
```

### 5. Update Edit Tool with Enhanced Diff Handling
**File**: `src/tool/edit.ts`
**Priority**: high
**Type**: feature
**Reason**: Kilocode added improved diff handling and line number tracking (+30, -13 changes).

**Current code**:
```typescript
export const EditToolInput = Schema.Struct({
  path: Schema.String,
  oldText: Schema.String,
  newText: Schema.String
})
```

**New code**:
```typescript
export const EditToolInput = Schema.Struct({
  path: Schema.String.pipe(
    Schema.annotations({
      description: "Path to the file to edit, relative to the project root"
    })
  ),
  oldText: Schema.String.pipe(
    Schema.annotations({
      description: "The exact text to find and replace. Must match exactly including whitespace."
    })
  ),
  newText: Schema.String.pipe(
    Schema.annotations({
      description: "The new text to replace the old text with"
    })
  ),
  startLine: Schema.optional(Schema.Number.pipe(
    Schema.annotations({
      description: "Optional: Starting line number hint for faster matching"
    })
  )),
  endLine: Schema.optional(Schema.Number.pipe(
    Schema.annotations({
      description: "Optional: Ending line number hint for faster matching"
    })
  ))
})

// Add change marker support
interface EditChange {
  startLine: number
  endLine: number
  oldContent: string
  newContent: string
}

function generateChangeMarkers(changes: EditChange[]): string {
  return changes.map(change => 
    `// kilocode_change: lines ${change.startLine}-${change.endLine}`
  ).join('\n')
}
```

### 6. Update Batch Tool with Improved Type Safety
**File**: `src/tool/batch.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Kilocode improved batch tool with better type handling (+6, -5 changes).

**Current code**:
```typescript
execute: (input, context) => Effect.gen(function* () {
  const results = []
  for (const call of input.calls) {
    const tool = getTool(call.toolName)
    const result = yield* tool.execute(call.input, context)
    results.push(result)
  }
  return { results }
})
```

**New code**:
```typescript
execute: (input, context) => Effect.gen(function* () {
  const results: Array<{
    toolName: string
    success: boolean
    result?: unknown
    error?: string
  }> = []
  
  for (const call of input.calls) {
    const tool = getTool(call.toolName as ToolID)
    if (!tool) {
      results.push({
        toolName: call.toolName,
        success: false,
        error: `Tool '${call.toolName}' not found`
      })
      continue
    }
    
    const result = yield* tool.execute(call.input, context).pipe(
      Effect.map(r => ({
        toolName: call.toolName,
        success: true,
        result: r
      })),
      Effect.catchAll(e => Effect.succeed({
        toolName: call.toolName,
        success: false,
        error: e instanceof Error ? e.message : String(e)
      }))
    )
    results.push(result)
  }
  
  return { 
    results,
    successCount: results.filter(r => r.success).length,
    failureCount: results.filter(r => !r.success).length
  }
})
```

### 7. Update Task Tool with Subagent Restrictions
**File**: `src/tool/task.ts`
**Priority**: critical
**Type**: security
**Reason**: Kilocode added security fix to unconditionally deny task tool for subagent sessions.

**Current code**:
```typescript
execute: (input, context) => Effect.gen(function* () {
  const session = yield* Session.current
  // ... task execution
})
```

**New code**:
```typescript
execute: (input, context) => Effect.gen(function* () {
  const session = yield* Session.current
  
  // Security: Deny task tool for subagent sessions to prevent recursive spawning
  if (session.isSubagent || session.parentSessionId) {
    return yield* Effect.fail(new ToolError({
      code: "PERMISSION_DENIED",
      message: "Task tool is not available for subagent sessions",
      recoverable: false
    }))
  }
  
  // Validate that we're not spawning a primary agent from a task
  if (input.agentType === "primary") {
    return yield* Effect.fail(new ToolError({
      code: "INVALID_AGENT_TYPE",
      message: "Cannot spawn primary agents from task tool. Use 'worker' or 'specialist' agent types.",
      recoverable: true
    }))
  }
  
  // ... rest of task execution
})
```

### 8. Update Skill Tool with Reduced Complexity
**File**: `src/tool/skill.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Kilocode simplified skill tool implementation (+7, -32 changes).

**Current code**:
```typescript
export function loadSkill(name: string): Effect.Effect<Skill, SkillError> {
  return Effect.gen(function* () {
    const skillPath = yield* resolveSkillPath(name)
    const content = yield* readSkillFile(skillPath)
    const parsed = yield* parseSkillContent(content)
    const validated = yield* validateSkill(parsed)
    return validated
  })
}
```

**New code**:
```typescript
export function loadSkill(name: string): Effect.Effect<Skill, SkillError> {
  return Effect.gen(function* () {
    const skillPath = yield* resolveSkillPath(name)
    const content = yield* Effect.tryPromise({
      try: () => fs.readFile(skillPath, 'utf-8'),
      catch: (e) => new SkillError({ 
        code: "READ_ERROR", 
        message: `Failed to read skill file: ${e}` 
      })
    })
    
    // Simplified parsing - skills are now plain text with optional YAML frontmatter
    const skill = parseSkillContent(content, name)
    return skill
  })
}

function parseSkillContent(content: string, name: string): Skill {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  
  if (frontmatterMatch) {
    const metadata = yaml.parse(frontmatterMatch[1])
    return {
      name,
      description: metadata.description ?? "",
      content: frontmatterMatch[2].trim(),
      triggers: metadata.triggers ?? []
    }
  }
  
  return {
    name,
    description: "",
    content: content.trim(),
    triggers: []
  }
}
```

### 9. Update Write Tool with GPT-5 Compatibility
**File**: `src/tool/write.ts`
**Priority**: high
**Type**: bug
{"prompt_tokens":61195,"completion_tokens":4096,"total_tokens":65291}

[Session: 98dabe5d-3616-4afd-8eda-938e13448a10]
[Messages: 2, Tokens: 65291]
