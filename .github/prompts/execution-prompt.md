# Execution Task: Apply Update Plan to Alexi

You are an expert software developer. Your task is to execute the update plan below precisely.

## Update Plan to Execute

# Update Plan for Alexi

Generated: 2026-04-28
Based on upstream commits: kilocode 2a6c3e7d5..ede13b7ec (228 commits), opencode 9d1f17d..2789b77 (38 commits)

## Summary
- Total changes planned: 24
- Critical: 2 | High: 8 | Medium: 10 | Low: 4

## Changes

### 1. Add Semantic Search Tool
**File**: `src/tool/semantic-search.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: New semantic search capability added to kilocode for codebase indexing integration

**New code**:
```typescript
import { Effect, Schema } from "effect"
import * as Tool from "./tool"
import { KiloIndexing } from "@/indexing"
import { Instance } from "@/project/instance"

const DESCRIPTION = `Search the codebase semantically using embeddings.

Use this tool to find code that is conceptually related to a query, even if it doesn't contain exact keyword matches. This is useful for:
- Finding implementations of concepts
- Locating related functionality
- Discovering code patterns

Returns ranked results with file paths, code snippets, and relevance scores.`

export const SemanticSearchTool = Effect.gen(function* () {
  const info: Tool.Info = {
    name: "semantic_search",
    description: DESCRIPTION,
    parameters: Schema.Struct({
      query: Schema.String.annotations({
        description: "Natural language description of what you're looking for",
      }),
      maxResults: Schema.optional(Schema.Number).annotations({
        description: "Maximum number of results to return (default: 10)",
      }),
      minScore: Schema.optional(Schema.Number).annotations({
        description: "Minimum relevance score threshold (0-1, default: 0.5)",
      }),
    }),
    execute: (args) =>
      Effect.gen(function* () {
        const indexing = yield* KiloIndexing
        const instance = yield* Instance
        
        if (!indexing.ready()) {
          return {
            output: "Semantic search is not available. Codebase indexing is not enabled or not ready.",
            status: "error" as const,
          }
        }

        const results = yield* indexing.search({
          query: args.query,
          workspacePath: instance.worktree,
          maxResults: args.maxResults ?? 10,
          minScore: args.minScore ?? 0.5,
        })

        if (results.length === 0) {
          return {
            output: "No relevant results found for the query.",
            status: "success" as const,
          }
        }

        const formatted = results
          .map((r, i) => `${i + 1}. ${r.filePath}:${r.startLine}-${r.endLine} (score: ${r.score.toFixed(2)})\n${r.snippet}`)
          .join("\n\n")

        return {
          output: formatted,
          status: "success" as const,
        }
      }),
  }

  return info
})
```

### 2. Update Tool Registry with Semantic Search
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Register semantic search tool and make it available to appropriate agents

**Current code**:
```typescript
export namespace ToolRegistry {
  export function infos() {
    return Effect.gen(function* () {
      const codebase = yield* CodebaseSearchTool
      const recall = yield* RecallTool
      return { codebase, recall }
    })
  }

  export function build(tools: { codebase: Tool.Info; recall: Tool.Info }) {
    return Effect.all({
      codebase: Tool.init(tools.codebase),
      recall: Tool.init(tools.recall),
    })
  }
```

**New code**:
```typescript
import { SemanticSearchTool } from "./semantic-search"
import { KiloIndexing } from "@/indexing"

export namespace ToolRegistry {
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

  export function extra(
    tools: { codebase: Tool.Def; semantic: Tool.Def; recall: Tool.Def },
    cfg: { experimental?: { codebase_search?: boolean } },
  ): Tool.Def[] {
    const ready = KiloIndexing.ready()
    return [
      ...(cfg.experimental?.codebase_search === true ? [tools.codebase] : []),
      ...(ready ? [tools.semantic] : []),
      tools.recall,
    ]
  }
}
```

### 3. Update Compaction Prompt for Better Context Preservation
**File**: `src/agent/prompt/compaction.txt`
**Priority**: critical
**Type**: bugfix
**Reason**: Improved compaction prompt prevents loss of critical context during session summarization

**Current code**:
```text
You are a helpful AI assistant tasked with summarizing conversations.

When asked to summarize, provide a detailed but concise summary of the conversation.
Focus on information that would be helpful for continuing the conversation, including:
- What was done
- What is currently being worked on
- Which files are being modified
- What needs to be done next
- Key user requests, constraints, or preferences that should persist
- Important technical decisions and why they were made

Your summary should be comprehensive enough to provide context but concise enough to be quickly understood.

Do not respond to any questions in the conversation, only output the summary.
Respond in the same language the user used in the conversation.
```

**New code**:
```text
You are an anchored context summarization assistant for coding sessions.

Summarize only the conversation history you are given. The newest turns may be kept verbatim outside your summary, so focus on the older context that still matters for continuing the work.

If the prompt includes a <previous-summary> block, treat it as the current anchored summary. Update it with the new history by preserving still-true details, removing stale details, and merging in new facts.

Always follow the exact output structure requested by the user prompt. Keep every section, preserve exact file paths and identifiers when known, and prefer terse bullets over paragraphs.

Do not answer the conversation itself. Do not mention that you are summarizing, compacting, or merging context. Respond in the same language as the conversation.
```

### 4. Add Semantic Search Permission to Agent Configurations
**File**: `src/agent/index.ts`
**Priority**: high
**Type**: feature
**Reason**: Enable semantic search for code, explore, plan, and orchestrator agents

**Current code**:
```typescript
export function patchAgents(
  agents: Record<string, AgentConfig>,
  defaults: Permission.Info,
  user: Permission.Info,
) {
  if (agents.build) {
    agents.code = { ...agents.build, name: "code" }
    delete agents.build
  }
```

**New code**:
```typescript
export function patchAgents(
  agents: Record<string, AgentConfig>,
  defaults: Permission.Info,
  user: Permission.Info,
) {
  if (agents.build) {
    agents.code = {
      ...agents.build,
      name: "code",
      permission: Permission.merge(
        defaults,
        Permission.fromConfig({ semantic_search: "allow" }),
        user
      ),
    }
    delete agents.build
  }

  // Add semantic_search to plan agent
  if (agents.plan) {
    agents.plan = {
      ...agents.plan,
      permission: Permission.merge(
        agents.plan.permission ?? defaults,
        Permission.fromConfig({ semantic_search: "allow" }),
        user
      ),
    }
  }

  // Add semantic_search to explore agent
  if (agents.explore) {
    agents.explore = {
      ...agents.explore,
      permission: Permission.merge(
        agents.explore.permission ?? defaults,
        Permission.fromConfig({
          semantic_search: "allow",
          codebase_search: "allow",
        }),
        user
      ),
    }
  }

  // Add semantic_search to orchestrator agent
  if (agents.orchestrator) {
    agents.orchestrator = {
      ...agents.orchestrator,
      permission: Permission.merge(
        agents.orchestrator.permission ?? defaults,
        Permission.fromConfig({ semantic_search: "allow" }),
        user
      ),
    }
  }
```

### 5. Guard External Directory Boundaries
**File**: `src/tool/external-directory.ts`
**Priority**: critical
**Type**: security
**Reason**: Prevent directory traversal attacks by properly validating external directory access

**Current code**:
```typescript
export function assertExternalDirectoryEffect(filePath: string) {
  return Effect.gen(function* () {
    const instance = yield* Instance
    const resolved = path.resolve(instance.worktree, filePath)
    
    if (!resolved.startsWith(instance.worktree)) {
      return yield* Effect.fail(new ExternalDirectoryError(filePath))
    }
    
    return resolved
  })
}
```

**New code**:
```typescript
import { containsPath } from "@/util/filesystem"

export function assertExternalDirectoryEffect(filePath: string) {
  return Effect.gen(function* () {
    const instance = yield* Instance
    const resolved = path.resolve(instance.worktree, filePath)
    
    // Use proper path containment check that handles edge cases
    if (!containsPath(instance.worktree, resolved)) {
      return yield* Effect.fail(new ExternalDirectoryError(filePath))
    }
    
    // Additional check for symlink resolution
    const realPath = yield* Effect.tryPromise(() => fs.realpath(resolved))
    if (!containsPath(instance.worktree, realPath)) {
      return yield* Effect.fail(new ExternalDirectoryError(filePath))
    }
    
    return resolved
  })
}
```

### 6. Update Permission Schema with Semantic Search
**File**: `src/permission/schema.ts`
**Priority**: high
**Type**: feature
**Reason**: Add semantic_search to the permission schema for proper permission evaluation

**Current code**:
```typescript
export const PermissionConfig = Schema.Struct({
  read: PermissionValue,
  write: PermissionValue,
  bash: PermissionValue,
  // ... other permissions
})
```

**New code**:
```typescript
export const PermissionConfig = Schema.Struct({
  read: PermissionValue,
  write: PermissionValue,
  bash: PermissionValue,
  semantic_search: Schema.optional(PermissionValue).annotations({
    description: "Permission for semantic codebase search",
  }),
  // ... other permissions
})
```

### 7. Add Subagent Cost Propagation
**File**: `src/session/cost-propagation.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: Track and propagate costs from subagent sessions to parent sessions

**New code**:
```typescript
import { Effect, Ref } from "effect"
import { Session } from "./session"
import { SessionID } from "./schema"
import * as Log from "@opencode-ai/core/util/log"

const log = Log.create({ service: "cost-propagation" })

export interface CostInfo {
  inputTokens: number
  outputTokens: number
  totalCost: number
}

const costLock = Ref.make(false)

export function propagateSubagentCost(
  parentSessionId: SessionID,
  childCost: CostInfo
) {
  return Effect.gen(function* () {
    // Serialize concurrent cost propagation
    yield* Ref.updateAndGet(costLock, () => true)
    
    try {
      const session = yield* Session.get(parentSessionId)
      if (!session) {
        log.warn("Parent session not found for cost propagation", { parentSessionId })
        return
      }

      const updatedCost = {
        inputTokens: (session.cost?.inputTokens ?? 0) + childCost.inputTokens,
        outputTokens: (session.cost?.outputTokens ?? 0) + childCost.outputTokens,
        totalCost: (session.cost?.totalCost ?? 0) + childCost.totalCost,
      }

      yield* Session.updateCost(parentSessionId, updatedCost)
      log.debug("Propagated subagent cost to parent", {
        parentSessionId,
        childCost,
        updatedCost,
      })
    } finally {
      yield* Ref.set(costLock, false)
    }
  })
}

export function excludeSubagentFromStats(sessionId: SessionID) {
  return Effect.gen(function* () {
    const session = yield* Session.get(sessionId)
    if (session?.parentSessionId) {
      // This is a subagent session, exclude from aggregate stats
      return true
    }
    return false
  })
}
```

### 8. Fix Compaction Media Safety for Large Images
**File**: `src/session/compaction.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Prevent sessions from becoming unusable after summary with large images

**Current code**:
```typescript
export function compactSession(sessionId: SessionID) {
  return Effect.gen(function* () {
    const messages = yield* Session.getMessages(sessionId)
    // ... compaction logic
  })
}
```

**New code**:
```typescript
export function compactSession(sessionId: SessionID) {
  return Effect.gen(function* () {
    const messages = yield* Session.getMessages(sessionId)
    
    // Filter out large media content before compaction
    const safeMessages = messages.map(msg => ({
      ...msg,
      parts: msg.parts?.map(part => {
        if (part.type === "image" && part.data && part.data.length > MAX_IMAGE_SIZE) {
          return {
            ...part,
            data: undefined,
            truncated: true,
            originalSize: part.data.length,
          }
        }
        return part
      })
    }))
    
    // Mark context as synthetic to preserve compaction boundaries
    const compactionContext = {
      synthetic: true,
      timestamp: Date.now(),
    }
    
    // ... rest of compaction logic with safeMessages
  })
}

const MAX_IMAGE_SIZE = 1024 * 1024 // 1MB threshold
```

### 9. Update Task Tool with Subagent Cost Tracking
**File**: `src/tool/task.ts`
**Priority**: medium
**Type**: feature
**Reason**: Track costs from subtasks and propagate to parent session

**Current code**:
```typescript
export const TaskTool = Effect.gen(function* () {
  const info: Tool.Info = {
    name: "task",
    // ...
    execute: (args) =>
      Effect.gen(function* () {
        const childSession = yield* Session.create({
          parentSessionId: args.parentSessionId,
          // ...
        })
        // ... execute subtask
      }),
  }
})
```

**New code**:
```typescript
import { propagateSubagentCost } from "@/session/cost-propagation"

export const TaskTool = Effect.gen(function* () {
  const info: Tool.Info = {
    name: "task",
    // ...
    execute: (args) =>
      Effect.gen(function* () {
        const parentSessionId = yield* Session.currentId()
        
        const childSession = yield* Session.create({
          parentSessionId,
          // ...
        })
        
        // ... execute subtask
        
        // Propagate child session cost to parent after completion
        const childCost = yield*
{"prompt_tokens":41776,"completion_tokens":4096,"total_tokens":45872}

[Session: 1c7432d5-a228-4834-b89b-d7d0f315261b]
[Messages: 2, Tokens: 45872]

## Execution Instructions

1. **Execute each change** in the plan above in order of priority (critical → high → medium → low)
2. **Make exact code changes** as specified in the plan
3. **Maintain SAP AI Core compatibility** - do not break existing integrations
4. **Follow existing code style** in this repository
5. **Create changes summary** at `.github/reports/changes-summary.md` with:
   - List of files modified
   - Summary of each change made
   - Any issues encountered

## Important

- Do NOT skip any items in the plan
- Do NOT add extra changes not in the plan
- Do NOT ask questions - just execute
- If a file doesn't exist, create it
- If code context is unclear, use your best judgment based on the plan

Execute the entire plan now.
