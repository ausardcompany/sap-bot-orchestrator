# Update Plan for Alexi

Generated: 2026-04-23
Based on upstream commits: kilocode (60a1f3c36..74df86852), opencode (224548d..a419f1c)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Add BOM (Byte Order Mark) preservation support for file operations
**File**: `src/util/bom.ts` (new file)
**Priority**: critical
**Type**: bugfix
**Reason**: Text tools must preserve BOM in round-trips to avoid corrupting files that use UTF-8 BOM encoding

**New code**:
```typescript
/**
 * Byte Order Mark utilities for preserving file encoding markers
 */

const UTF8_BOM = "\ufeff"

export interface BomResult {
  text: string
  bom: boolean
}

/**
 * Split BOM from text content
 */
export function split(content: string): BomResult {
  if (content.startsWith(UTF8_BOM)) {
    return {
      text: content.slice(1),
      bom: true,
    }
  }
  return {
    text: content,
    bom: false,
  }
}

/**
 * Restore BOM to text content if it was present
 */
export function restore(text: string, bom: boolean): string {
  return bom ? UTF8_BOM + text : text
}
```

### 2. Update apply_patch tool to preserve BOM
**File**: `src/tool/apply_patch.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Patch operations must preserve BOM markers to avoid file corruption

**Current code**:
```typescript
const oldContent = ""
const newContent =
  hunk.contents.length === 0 || hunk.contents.endsWith("\n") ? hunk.contents : `${hunk.contents}\n`
const diff = trimDiff(createTwoFilesPatch(filePath, filePath, oldContent, newContent))
```

**New code**:
```typescript
import * as Bom from "@/util/bom"

// In file change processing:
const oldContent = ""
const newContent =
  hunk.contents.length === 0 || hunk.contents.endsWith("\n") ? hunk.contents : `${hunk.contents}\n`
const next = Bom.split(newContent)
const diff = trimDiff(createTwoFilesPatch(filePath, filePath, oldContent, next.text))

let additions = 0
let deletions = 0
for (const change of diffLines(oldContent, next.text)) {
  if (change.added) additions += change.count || 0
  if (change.removed) deletions += change.count || 0
}

fileChanges.push({
  filePath,
  oldContent,
  newContent: next.text,
  type: "add",
  diff,
  additions,
  deletions,
  bom: next.bom,
})
```

### 3. Update edit tool to preserve BOM
**File**: `src/tool/edit.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Edit operations must preserve BOM markers

**Current code**:
```typescript
// Assuming current implementation doesn't handle BOM
const content = await fs.readFile(filePath, "utf-8")
// ... editing logic
await fs.writeFile(filePath, newContent, "utf-8")
```

**New code**:
```typescript
import * as Bom from "@/util/bom"

// When reading file:
const rawContent = await fs.readFile(filePath, "utf-8")
const { text: content, bom } = Bom.split(rawContent)

// ... editing logic on `content`

// When writing file:
const finalContent = Bom.restore(newContent, bom)
await fs.writeFile(filePath, finalContent, "utf-8")
```

### 4. Update write tool to preserve BOM
**File**: `src/tool/write.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Write operations must preserve BOM when overwriting existing files

**New code** (add to existing write logic):
```typescript
import * as Bom from "@/util/bom"

// When overwriting an existing file:
async function writeFile(filePath: string, content: string): Promise<void> {
  let bom = false
  
  // Check if file exists and has BOM
  try {
    const existing = await fs.readFile(filePath, "utf-8")
    const result = Bom.split(existing)
    bom = result.bom
  } catch {
    // File doesn't exist, no BOM to preserve
  }
  
  const finalContent = Bom.restore(content, bom)
  await fs.writeFile(filePath, finalContent, "utf-8")
}
```

### 5. Fix permission wildcard ordering for predictable rule evaluation
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Wildcard permissions (`*`, `mcp_*`) must come before specific ones so specific rules override fallbacks

**Current code**:
```typescript
export function fromConfig(permission: ConfigPermission.Info) {
  const ruleset: Ruleset = []
  for (const [key, value] of Object.entries(permission)) {
    // ... rule processing
  }
  return ruleset
}
```

**New code**:
```typescript
export function fromConfig(permission: ConfigPermission.Info) {
  // Sort top-level keys so wildcard permissions (`*`, `mcp_*`) come before
  // specific ones. Combined with `findLast` in evaluate(), this gives the
  // intuitive semantic "specific tool rules override the `*` fallback"
  // regardless of the user's JSON key order.
  const entries = Object.entries(permission).sort(([a], [b]) => {
    const aWild = a.includes("*")
    const bWild = b.includes("*")
    return aWild === bWild ? 0 : aWild ? -1 : 1
  })
  
  const ruleset: Ruleset = []
  for (const [key, value] of entries) {
    if (typeof value === "string") {
      ruleset.push({ permission: key, action: value, pattern: "*" })
      continue
    }
    // ... rest of rule processing
  }
  return ruleset
}
```

### 6. Remove multiedit tool from EDIT_TOOLS constant
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: multiedit tool has been removed upstream

**Current code**:
```typescript
const EDIT_TOOLS = ["edit", "write", "apply_patch", "multiedit"]
```

**New code**:
```typescript
const EDIT_TOOLS = ["edit", "write", "apply_patch"]
```

### 7. Remove multiedit tool entirely
**File**: `src/tool/multiedit.ts` (delete file)
**Priority**: high
**Type**: refactor
**Reason**: multiedit tool has been removed upstream; functionality consolidated into other tools

**Action**: Delete the file `src/tool/multiedit.ts` and remove from tool registry

### 8. Update tool registry to remove multiedit
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: refactor
**Reason**: Remove multiedit from available tools

**Current code**:
```typescript
import { MultiEditTool } from "./multiedit"

export const tools = [
  // ... other tools
  MultiEditTool,
]
```

**New code**:
```typescript
// Remove MultiEditTool import and registration
export const tools = [
  // ... other tools (without MultiEditTool)
]
```

### 9. Update bash tool with optional description parameter
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: Bash tool description is now marked as recommended but optional

**Current code**:
```typescript
const BashParams = z.object({
  command: z.string().describe("The bash command to execute"),
  description: z.string().describe("Description of what the command does"),
})
```

**New code**:
```typescript
const BashParams = z.object({
  command: z.string().describe("The bash command to execute"),
  description: z.string().optional().describe("(Recommended) Description of what the command does"),
})
```

### 10. Improve session compaction prompt
**File**: `src/agent/prompt/compaction.txt`
**Priority**: high
**Type**: feature
**Reason**: Updated compaction prompt provides better context preservation

**New code**:
```text
You are an anchored context summarization assistant for coding sessions.

Summarize only the conversation history you are given. The newest turns may be kept verbatim outside your summary, so focus on the older context that still matters for continuing the work.

If the prompt includes a <previous-summary> block, treat it as the current anchored summary. Update it with the new history by preserving still-true details, removing stale details, and merging in new facts.

Always follow the exact output structure requested by the user prompt. Keep every section, preserve exact file paths and identifiers when known, and prefer terse bullets over paragraphs.

Do not answer the conversation itself. Do not mention that you are summarizing, compacting, or merging context. Respond in the same language as the conversation.
```

### 11. Add session compaction improvements
**File**: `src/session/compaction.ts`
**Priority**: high
**Type**: feature
**Reason**: Improved compaction logic with better context preservation

**New code** (add/update compaction logic):
```typescript
interface CompactionConfig {
  maxAttempts: number
  preserveRecentTurns: number
  anchoredSummaryEnabled: boolean
}

const DEFAULT_COMPACTION_CONFIG: CompactionConfig = {
  maxAttempts: 3,
  preserveRecentTurns: 5,
  anchoredSummaryEnabled: true,
}

export async function compactSession(
  session: Session,
  config: CompactionConfig = DEFAULT_COMPACTION_CONFIG
): Promise<CompactionResult> {
  let attempts = 0
  
  while (attempts < config.maxAttempts) {
    attempts++
    
    try {
      const result = await performCompaction(session, config)
      if (result.success) {
        return result
      }
    } catch (error) {
      if (attempts >= config.maxAttempts) {
        throw new CompactionError(`Compaction failed after ${attempts} attempts`, { cause: error })
      }
    }
  }
  
  throw new CompactionError("Compaction exceeded maximum attempts")
}
```

### 12. Fix GitHub API headers handling
**File**: `src/tool/github-pr-search.ts`
**Priority**: medium
**Type**: bugfix
**Reason**: Headers spread must handle Headers object properly

**Current code**:
```typescript
async function githubFetch(endpoint: string, options: RequestInit = {}) {
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
}
```

**New code**:
```typescript
async function githubFetch(endpoint: string, options: RequestInit = {}) {
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(options.headers instanceof Headers 
        ? Object.fromEntries(options.headers.entries()) 
        : options.headers),
    },
  })
}
```

### 13. Update autocomplete postprocessing (remove dead code)
**File**: `src/core/autocomplete/postprocessing.ts`
**Priority**: medium
**Type**: refactor
**Reason**: Remove unreachable FIM template branches for unsupported models

**Current code**:
```typescript
if (llm.model.includes("qwen3")) {
  completion = completion.replace(/<think>.*?<\/think>/s, "")
  completion = completion.replace(/<\/think>/, "")
  completion = completion.replace(/^\n+|\n+$/g, "")
}

if (llm.model.includes("mercury") || llm.model.includes("granite")) {
  completion = removePrefixOverlap(completion, prefix)
}
```

**New code**:
```typescript
// Only Mercury Edit is exposed as autocomplete model
if (llm.model.includes("mercury")) {
  completion = removePrefixOverlap(completion, prefix)

  // If completion starts with multiple whitespaces, but the cursor is at the
  // end of the line then it should probably be on a new line
  if (
    (completion.startsWith("  ") || completion.startsWith("\t")) &&
    !prefix.endsWith("\n") &&
    (suffix.startsWith("\n") || suffix.trim().length === 0)
  ) {
    completion = "\n" + completion
  }
}
```

### 14. Add LSP pull diagnostics support
**File**: `src/lsp/client.ts`
**Priority**: medium
**Type**: feature
**Reason**: Support pull diagnostics for C#, Kotlin, and other languages

**New code** (add to LSP client):
```typescript
interface PullDiagnosticsOptions {
  textDocument: TextDocumentIdentifier
}

export async function pullDiagnostics(
  client: LanguageClient,
  options: PullDiagnosticsOptions
): Promise<Diagnostic[]> {
  if (!client.capabilities?.diagnosticProvider) {
    // Fall back to push diagnostics
    return []
  }
  
  const result = await client.sendRequest(
    "textDocument/diagnostic",
    {
      textDocument: options.textDocument,
    }
  )
  
  return result?.items ?? []
}
```

### 15. Add session validation on TUI startup
**File**: `src/cli/validate-session.ts` (new file)
**Priority**: medium
**Type**: bugfix
**Reason**: Fail fast on invalid session startup to prevent confusing errors

**New code**:
```typescript
import { Session } from "@/session"

export interface SessionValidationResult {
  valid: boolean
  error?: string
}

export async function validateSession(sessionId: string): Promise<SessionValidationResult> {
  try {
    const session = await Session.get(sessionId)
    
    if (!session) {
      return {
        valid: false,
        error: `Session ${sessionId} not found`,
      }
    }
    
    // Check for corrupted state
    if (!session.messages || !Array.isArray(session.messages)) {
      return {
        valid: false,
        error: `Session ${sessionId} has corrupted message state`,
      }
    }
    
    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: `Failed to validate session: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
```

### 16. Update TUI app to validate session on startup
**File**: `src/cli/cmd/tui/app.tsx`
**Priority**: medium
**Type**: bugfix
**Reason**: Integrate session validation for better error handling

**New code** (add to app initialization):
```typescript
import { validateSession } from "./validate-session"

// In app initialization:
async function initializeApp(sessionId?: string) {
  if (sessionId) {
    const validation = await validateSession(sessionId)
    if (!validation.valid) {
      console.error(`Invalid session: ${validation.error}`)
      process.exit(1)
    }
  }
  
  // ... rest of initialization
}
```

### 17. Add Mistral Small reasoning variant support
**File**: `src/providers/mistral.ts`
**Priority**: medium
**Type**: feature
**Reason**: Support Mistral Small reasoning variant

**New code** (add to Mistral provider):
```typescript
export const MISTRAL_MODELS = {
  // ... existing models
{"prompt_tokens":73073,"completion_tokens":4096,"total_tokens":77169}

[Session: 04efbcd0-2a4e-43c6-b295-28f71690760d]
[Messages: 2, Tokens: 77169]
