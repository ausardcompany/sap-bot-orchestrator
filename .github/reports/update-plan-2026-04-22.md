# Update Plan for Alexi

Generated: 2026-04-22
Based on upstream commits: kilocode fb3f76b83..60a1f3c36 (64 commits), opencode ed3d364..224548d (42 commits)

## Summary
- Total changes planned: 12
- Critical: 1 | High: 4 | Medium: 5 | Low: 2

## Changes

### 1. Remove MultiEdit Tool
**File**: `src/tool/multiedit.ts`
**Priority**: critical
**Type**: refactor
**Reason**: OpenCode has completely removed the multiedit tool. This simplifies the tool system and removes unused functionality. The edit tool handles single-file edits, and the multiedit was apparently not providing sufficient value.

**Current code** (if exists):
```typescript
// Full multiedit.ts file should be deleted
```

**Action**: Delete the entire `src/tool/multiedit.ts` file and associated `src/tool/multiedit.txt` description file.

---

### 2. Update Tool Registry to Remove MultiEdit
**File**: `src/tool/registry.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Must remove multiedit from the tool registry since the tool is being removed.

**Current code**:
```typescript
import { MultiEditTool } from "./multiedit"

// In registry array or map
MultiEditTool,
```

**New code**:
```typescript
// Remove the import entirely
// Remove MultiEditTool from the registry array/map
```

---

### 3. Make Bash Tool Description Parameter Optional
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: KiloCode made the bash tool's description parameter optional and changed the description text to indicate it's "recommended" rather than required. This provides more flexibility while still encouraging good practices.

**Current code**:
```typescript
const Parameters = z.object({
  command: z.string().describe("The bash command to execute"),
  timeout: z.number().optional().describe("Timeout in milliseconds"),
  description: z
    .string()
    .describe(
      "Clear, concise description of what this command does in 5-10 words. Examples:\nInput: ls\nOutput: Lists files in current directory\n\nInput: git status\nOutput: Shows working tree status\n\nInput: npm install\nOutput: Installs package dependencies\n\nInput: mkdir foo\nOutput: Creates directory 'foo'",
    ),
})
```

**New code**:
```typescript
const Parameters = z.object({
  command: z.string().describe("The bash command to execute"),
  timeout: z.number().optional().describe("Timeout in milliseconds"),
  description: z
    .string()
    .optional()
    .describe(
      "Recommended: a clear, concise description of what this command does in 5-10 words. Examples:\nInput: ls\nOutput: Lists files in current directory\n\nInput: git status\nOutput: Shows working tree status\n\nInput: npm install\nOutput: Installs package dependencies\n\nInput: mkdir foo\nOutput: Creates directory 'foo'",
    ),
})
```

---

### 4. Update Bash Tool Execute to Handle Missing Description
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Since description is now optional, the execute function must provide a fallback value (the command itself) when description is not provided.

**Current code**:
```typescript
const result = yield* executeCommand(
  {
    command: params.command,
    cwd,
    env: yield* shellEnv(ctx, cwd),
    timeout,
    description: params.description,
  },
  ctx,
)
```

**New code**:
```typescript
const result = yield* executeCommand(
  {
    command: params.command,
    cwd,
    env: yield* shellEnv(ctx, cwd),
    timeout,
    description: params.description ?? params.command,
  },
  ctx,
)
```

---

### 5. Update Edit Tool Diff Calculation
**File**: `src/tool/edit.ts`
**Priority**: medium
**Type**: refactor
**Reason**: OpenCode refactored the diff calculation to use local variables before constructing the FileDiff object. This is a cleaner pattern that separates calculation from object construction.

**Current code**:
```typescript
const filediff: Snapshot.FileDiff = {
  file: filePath,
  patch: diff,
  additions: 0,
  deletions: 0,
}
for (const change of diffLines(contentOld, contentNew)) {
  if (change.added) filediff.additions += change.count || 0
  if (change.removed) filediff.deletions += change.count || 0
}
```

**New code**:
```typescript
let additions = 0
let deletions = 0
for (const change of diffLines(contentOld, contentNew)) {
  if (change.added) additions += change.count || 0
  if (change.removed) deletions += change.count || 0
}
const filediff: Snapshot.FileDiff = {
  file: filePath,
  patch: diff,
  additions,
  deletions,
}
```

---

### 6. Update Permission System Edit Tools List
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Remove "multiedit" from the EDIT_TOOLS constant since the tool is being removed.

**Current code**:
```typescript
const EDIT_TOOLS = ["edit", "write", "apply_patch", "multiedit"]
```

**New code**:
```typescript
const EDIT_TOOLS = ["edit", "write", "apply_patch"]
```

---

### 7. Add Permission Wildcard Sorting for Intuitive Override Behavior
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: bugfix
**Reason**: OpenCode added sorting logic so that wildcard permissions (`*`, `mcp_*`) come before specific ones. This ensures specific tool rules override the `*` fallback regardless of JSON key order, providing more intuitive behavior.

**Current code**:
```typescript
export function fromConfig(permission: ConfigPermission.Info) {
  const ruleset: Ruleset = []
  for (const [key, value] of Object.entries(permission)) {
    if (typeof value === "string") {
      ruleset.push({ permission: key, action: value, pattern: "*" })
      continue
    }
    // ... rest of logic
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
  // regardless of the user's JSON key order. Sub-pattern order inside a
  // single permission key is preserved — only top-level keys are sorted.
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
    // ... rest of logic
  }
  return ruleset
}
```

---

### 8. Simplify Autocomplete Postprocessing
**File**: `src/core/autocomplete/postprocessing.ts` (if exists)
**Priority**: medium
**Type**: refactor
**Reason**: KiloCode significantly simplified the postprocessing logic, removing model-specific handling for qwen3, granite, gemini, and gemma models. Only mercury-specific handling remains. This reduces complexity and maintenance burden.

**Current code** (if applicable):
```typescript
if (llm.model.includes("qwen3")) {
  completion = completion.replace(/<think>.*?<\/think>/s, "")
  completion = completion.replace(/<\/think>/, "")
  completion = completion.replace(/^\n+|\n+$/g, "")
}

if (llm.model.includes("mercury") || llm.model.includes("granite")) {
  completion = removePrefixOverlap(completion, prefix)
}

if (
  llm.model.includes("mercury") &&
  (completion.startsWith("  ") || completion.startsWith("\t")) &&
  !prefix.endsWith("\n") &&
  (suffix.startsWith("\n") || suffix.trim().length === 0)
) {
  completion = "\n" + completion
}

if ((llm.model.includes("gemini") || llm.model.includes("gemma")) && completion.endsWith("<|file_separator|>")) {
  completion = completion.slice(0, -18)
}
```

**New code**:
```typescript
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

---

### 9. Add Ling Model Support Helper
**File**: `src/providers/model-match.ts` (create if not exists)
**Priority**: medium
**Type**: feature
**Reason**: KiloCode added a shared `isLing` helper function to properly identify Ling models while excluding false positives like "kling", "bling", "spelling".

**New code**:
```typescript
/**
 * Check if a model ID represents a Ling model.
 * Excludes false positives like "kling", "bling", "spelling".
 */
export function isLing(modelId: string): boolean {
  const lower = modelId.toLowerCase()
  // Must start with "ling" or contain "/ling" or "-ling" or "_ling"
  if (lower.startsWith("ling")) return true
  if (lower.includes("/ling")) return true
  if (lower.includes("-ling")) return true
  if (lower.includes("_ling")) return true
  return false
}
```

---

### 10. Add Ling Model System Prompt
**File**: `src/session/prompt/ling.txt` (create)
**Priority**: medium
**Type**: feature
**Reason**: KiloCode added a dedicated system prompt for Ling models with 129 lines of specialized instructions.

**New code**:
```text
You are an expert AI coding assistant powered by the Ling model. Your role is to help developers write, understand, and improve code.

[Note: The full 129-line prompt should be copied from packages/opencode/src/session/prompt/ling.txt in the kilocode repository]
```

---

### 11. Update Provider Transform for Alibaba Format
**File**: `src/providers/transform.ts`
**Priority**: medium
**Type**: feature
**Reason**: OpenCode added handling for Alibaba's message format in the provider transform layer.

**Current code**:
```typescript
export function transformMessages(messages: Message[], provider: string): Message[] {
  // existing transformations
}
```

**New code**:
```typescript
export function transformMessages(messages: Message[], provider: string): Message[] {
  // Handle Alibaba format
  if (provider === "alibaba" || provider === "qwen") {
    return messages.map(msg => {
      // Alibaba-specific message transformations
      if (msg.role === "assistant" && msg.content) {
        // Handle Alibaba's specific content format
        return {
          ...msg,
          content: typeof msg.content === "string" 
            ? msg.content 
            : msg.content
        }
      }
      return msg
    })
  }
  
  // existing transformations
}
```

---

### 12. Add Mistral Small Reasoning Variant Support
**File**: `src/providers/mistral.ts` (or provider config)
**Priority**: low
**Type**: feature
**Reason**: OpenCode added support for Mistral Small reasoning variant.

**New code** (add to model definitions):
```typescript
export const MISTRAL_MODELS = {
  // ... existing models
  "mistral-small-reasoning": {
    id: "mistral-small-reasoning",
    name: "Mistral Small (Reasoning)",
    contextWindow: 32000,
    supportsReasoning: true,
    variants: ["reasoning"],
  },
}
```

---

## Testing Recommendations

1. **Tool System Tests**:
   - Verify bash tool works with and without description parameter
   - Confirm multiedit tool is completely removed and not accessible
   - Test edit tool diff calculations produce correct addition/deletion counts

2. **Permission System Tests**:
   - Test wildcard permission sorting with various configurations
   - Verify specific rules override wildcard rules regardless of JSON order
   - Confirm EDIT_TOOLS list no longer includes multiedit

3. **Provider Tests**:
   - Test Ling model detection with various model IDs including edge cases
   - Verify Alibaba format transformation works correctly
   - Test Mistral Small reasoning variant if applicable

4. **Integration Tests**:
   - Run full agent workflow without multiedit tool
   - Verify bash commands execute correctly with auto-generated descriptions

## Potential Risks

1. **Breaking Change - MultiEdit Removal**: Any existing workflows or user configurations that rely on the multiedit tool will break. Consider adding a deprecation warning or migration path if multiedit was exposed to users.

2. **Permission Sorting Change**: The new wildcard sorting behavior could change existing permission evaluation results for users who relied on the previous order-dependent behavior. This is generally an improvement but could surprise some users.

3. **Bash Description Optional**: Tools or integrations that expected the description field to always be present may need updates. The fallback to command text should be safe but verify logging and UI display.

4. **Autocomplete Simplification**: If Alexi supports any of the removed models (qwen3, granite, gemini, gemma) for autocomplete, their specific postprocessing is now removed. Verify these models still work acceptably without the special handling.
{"prompt_tokens":38929,"completion_tokens":3644,"total_tokens":42573}

[Session: 5fc46a1d-3fa1-4cd9-a1aa-a96b74787ca0]
[Messages: 2, Tokens: 42573]
