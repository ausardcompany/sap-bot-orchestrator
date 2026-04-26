# Update Plan for Alexi

Generated: 2026-04-26
Based on upstream commits: kilocode f6be4ee44..60a1f3c36 (549 commits)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Add Encoding-Aware File I/O Utilities
**File**: `src/tool/encoded-io.ts` (new file)
**Priority**: critical
**Type**: feature
**Reason**: Upstream added encoding detection and preservation for non-UTF8 files (UTF-16, legacy encodings). This prevents data corruption when editing files with different encodings.

**New code**:
```typescript
import jschardet from "jschardet"
import iconv from "iconv-lite"

export interface EncodingInfo {
  encoding: string
  confidence: number
  hasBOM: boolean
  bomBytes?: Buffer
}

/**
 * Detect file encoding from buffer content
 * Handles UTF-8, UTF-16 LE/BE, UTF-32, and legacy encodings via jschardet
 */
export function detectEncoding(buffer: Buffer): EncodingInfo {
  // Check for BOM markers first
  if (buffer.length >= 4) {
    // UTF-32 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe && buffer[2] === 0x00 && buffer[3] === 0x00) {
      return { encoding: "utf-32le", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) }
    }
    // UTF-32 BE BOM
    if (buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0xfe && buffer[3] === 0xff) {
      return { encoding: "utf-32be", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) }
    }
  }
  
  if (buffer.length >= 3) {
    // UTF-8 BOM
    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      return { encoding: "utf-8", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 3) }
    }
  }
  
  if (buffer.length >= 2) {
    // UTF-16 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
      return { encoding: "utf-16le", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) }
    }
    // UTF-16 BE BOM
    if (buffer[0] === 0xfe && buffer[1] === 0xff) {
      return { encoding: "utf-16be", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) }
    }
  }
  
  // Fall back to jschardet for detection
  const detected = jschardet.detect(buffer)
  return {
    encoding: detected.encoding?.toLowerCase() || "utf-8",
    confidence: detected.confidence || 0,
    hasBOM: false
  }
}

/**
 * Decode buffer to string preserving encoding information
 */
export function decodeWithEncoding(buffer: Buffer, encoding: EncodingInfo): string {
  const contentBuffer = encoding.hasBOM && encoding.bomBytes 
    ? buffer.slice(encoding.bomBytes.length) 
    : buffer
  
  return iconv.decode(contentBuffer, encoding.encoding)
}

/**
 * Encode string back to buffer, preserving original BOM if present
 */
export function encodeWithEncoding(content: string, encoding: EncodingInfo): Buffer {
  const encoded = iconv.encode(content, encoding.encoding)
  
  if (encoding.hasBOM && encoding.bomBytes) {
    return Buffer.concat([encoding.bomBytes, encoded])
  }
  
  return encoded
}

/**
 * Check if buffer appears to be binary (non-text) content
 * Excludes UTF-16 BOM files from binary detection
 */
export function isBinaryFile(buffer: Buffer): boolean {
  // UTF-16 files with BOM are not binary
  if (buffer.length >= 2) {
    if ((buffer[0] === 0xff && buffer[1] === 0xfe) ||
        (buffer[0] === 0xfe && buffer[1] === 0xff)) {
      return false
    }
  }
  
  // Check for null bytes in first 8KB (common binary indicator)
  const checkLength = Math.min(buffer.length, 8192)
  for (let i = 0; i < checkLength; i++) {
    if (buffer[i] === 0) {
      return true
    }
  }
  
  return false
}
```

### 2. Update Read Tool with Encoding Preservation
**File**: `src/tool/read.ts`
**Priority**: critical
**Type**: feature
**Reason**: Read tool must detect and preserve file encoding to prevent corruption of non-UTF8 files.

**Current code**:
```typescript
export async function readFile(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf-8")
  return content
}
```

**New code**:
```typescript
import { detectEncoding, decodeWithEncoding, isBinaryFile, EncodingInfo } from "./encoded-io"

export interface ReadResult {
  content: string
  encoding: EncodingInfo
  isBinary: boolean
}

export async function readFile(filePath: string): Promise<ReadResult> {
  const buffer = await fs.readFile(filePath)
  
  // Check for binary content first
  if (isBinaryFile(buffer)) {
    return {
      content: "",
      encoding: { encoding: "binary", confidence: 1, hasBOM: false },
      isBinary: true
    }
  }
  
  const encoding = detectEncoding(buffer)
  const content = decodeWithEncoding(buffer, encoding)
  
  return {
    content,
    encoding,
    isBinary: false
  }
}

// Store encoding metadata for write operations
const fileEncodingCache = new Map<string, EncodingInfo>()

export function cacheFileEncoding(filePath: string, encoding: EncodingInfo): void {
  fileEncodingCache.set(path.resolve(filePath), encoding)
}

export function getCachedEncoding(filePath: string): EncodingInfo | undefined {
  return fileEncodingCache.get(path.resolve(filePath))
}
```

### 3. Update Write Tool with Encoding Preservation
**File**: `src/tool/write.ts`
**Priority**: critical
**Type**: feature
**Reason**: Write tool must use cached encoding to preserve original file encoding on save.

**Current code**:
```typescript
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, "utf-8")
}
```

**New code**:
```typescript
import { encodeWithEncoding, EncodingInfo } from "./encoded-io"
import { getCachedEncoding } from "./read"

export async function writeFile(
  filePath: string, 
  content: string,
  explicitEncoding?: EncodingInfo
): Promise<void> {
  const encoding = explicitEncoding || getCachedEncoding(filePath) || {
    encoding: "utf-8",
    confidence: 1,
    hasBOM: false
  }
  
  const buffer = encodeWithEncoding(content, encoding)
  await fs.writeFile(filePath, buffer)
}

/**
 * Prevent double BOM when content already starts with U+FEFF
 */
export function sanitizeContentForWrite(content: string, encoding: EncodingInfo): string {
  if (encoding.hasBOM && content.charCodeAt(0) === 0xfeff) {
    return content.slice(1)
  }
  return content
}
```

### 4. Add Bash Tool Description Parameter as Optional
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream made bash description parameter optional but recommended, improving token efficiency.

**Current code**:
```typescript
export const bashToolSchema = z.object({
  command: z.string().describe("The bash command to execute"),
  description: z.string().describe("A description of what this command does")
})
```

**New code**:
```typescript
export const bashToolSchema = z.object({
  command: z.string().describe("The bash command to execute"),
  description: z.string().optional().describe(
    "Human-readable description of what this command does. " +
    "Recommended for complex commands to aid understanding and approval."
  )
})

export interface BashToolInput {
  command: string
  description?: string
}

export function formatBashPermissionRequest(input: BashToolInput): string {
  if (input.description) {
    return `Execute: ${input.command}\nPurpose: ${input.description}`
  }
  return `Execute: ${input.command}`
}
```

### 5. Add Question Tool Dismiss All Functionality
**File**: `src/tool/question.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream added ability to dismiss all pending questions when user queues a new message, preventing stale prompts from blocking execution.

**Current code**:
```typescript
export interface QuestionState {
  pending: Question | null
  answered: Map<string, string>
}
```

**New code**:
```typescript
export interface QuestionState {
  pending: Question | null
  answered: Map<string, string>
  dismissed: Set<string>
}

export interface Question {
  id: string
  text: string
  options?: string[]
  allowCustom?: boolean
  blocking?: boolean
}

/**
 * Dismiss a single question by ID
 */
export function dismissQuestion(state: QuestionState, questionId: string): QuestionState {
  const newDismissed = new Set(state.dismissed)
  newDismissed.add(questionId)
  
  return {
    ...state,
    pending: state.pending?.id === questionId ? null : state.pending,
    dismissed: newDismissed
  }
}

/**
 * Dismiss all pending questions - called when user queues a new message
 * This prevents blocking questions from stalling the session
 */
export function dismissAllQuestions(state: QuestionState): QuestionState {
  const newDismissed = new Set(state.dismissed)
  
  if (state.pending) {
    newDismissed.add(state.pending.id)
  }
  
  return {
    ...state,
    pending: null,
    dismissed: newDismissed
  }
}

/**
 * Check if a question was dismissed
 */
export function isQuestionDismissed(state: QuestionState, questionId: string): boolean {
  return state.dismissed.has(questionId)
}
```

### 6. Add Suggestion Auto-Dismiss on New User Message
**File**: `src/tool/suggestion.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: Upstream added auto-dismissal of suggestion prompts when user queues follow-up, enabling non-blocking suggestions.

**New code**:
```typescript
export interface SuggestionState {
  pending: Suggestion | null
  dismissed: Set<string>
  blocking: boolean
}

export interface Suggestion {
  id: string
  text: string
  options: string[]
  source: "review" | "followup" | "tool"
}

/**
 * Create initial suggestion state
 */
export function createSuggestionState(): SuggestionState {
  return {
    pending: null,
    dismissed: new Set(),
    blocking: false
  }
}

/**
 * Auto-dismiss suggestion when user queues a new message
 * This allows suggestions to be non-blocking
 */
export function autoDismissSuggestion(
  state: SuggestionState, 
  reason: "user_message" | "session_end"
): SuggestionState {
  if (!state.pending) {
    return state
  }
  
  const newDismissed = new Set(state.dismissed)
  newDismissed.add(state.pending.id)
  
  return {
    ...state,
    pending: null,
    dismissed: newDismissed
  }
}

/**
 * Check if suggestion should block execution
 * Non-blocking suggestions render inline in conversation
 */
export function shouldBlockForSuggestion(state: SuggestionState): boolean {
  return state.blocking && state.pending !== null
}
```

### 7. Update Task Tool to Respect Configured Model for Subagents
**File**: `src/tool/task.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix from upstream - subagents now respect the configured model instead of using hardcoded defaults.

**Current code**:
```typescript
export async function executeTask(task: TaskInput, context: ToolContext): Promise<TaskResult> {
  const agent = createSubagent({
    task: task.description,
    tools: task.allowedTools
  })
  return agent.run()
}
```

**New code**:
```typescript
export interface TaskConfig {
  description: string
  allowedTools?: string[]
  modelOverride?: string
}

export async function executeTask(
  task: TaskConfig, 
  context: ToolContext
): Promise<TaskResult> {
  // Respect configured model for subagents - fix from upstream #7549
  const modelId = task.modelOverride || context.config?.subagentModel || context.config?.model
  
  const agent = createSubagent({
    task: task.description,
    tools: task.allowedTools,
    model: modelId
  })
  
  return agent.run()
}

/**
 * Get the effective model for a subagent task
 * Priority: task override > subagent config > session model
 */
export function getSubagentModel(
  taskOverride: string | undefined,
  config: { subagentModel?: string; model?: string }
): string {
  return taskOverride || config.subagentModel || config.model || "default"
}
```

### 8. Add Ling Model Detection Helper
**File**: `src/tool/model-match.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: Upstream added Ling model support with specific exclusions for similar-named models.

**New code**:
```typescript
/**
 * Check if a model ID represents a Ling model
 * Excludes false positives like "kling", "bling", "spelling"
 */
export function isLingModel(modelId: string): boolean {
  const lower = modelId.toLowerCase()
  
  // Must start with "ling" to be a Ling model
  if (!lower.startsWith("ling")) {
    return false
  }
  
  // Exclude known false positives
  const exclusions = ["kling", "bling", "spelling", "darling", "sterling"]
  for (const exclusion of exclusions) {
    if (lower.startsWith(exclusion)) {
      return false
    }
  }
  
  return true
}

/**
 * Check if model supports multilingual prompts
 */
export function supportsMultilingual(modelId: string): boolean {
  // Ling models have special multilingual handling
  if (isLingModel(modelId)) {
    return true
  }
  
  const lower = modelId.toLowerCase()
  return lower.includes("multilingual") || lower.includes("polyglot")
}
```

### 9. Update Edit Tool with FileDiff Metadata in Permission Ask
**File**: `src/tool/edit.ts`
**Priority**: high
**Type**: feature
**Reason**: Upstream now includes file diff metadata in edit permission requests for better context.

**Current code**:
```typescript
export async function requestEditPermission(
  filePath: string,
  changes: string
): Promise<boolean
{"prompt_tokens":79304,"completion_tokens":4096,"total_tokens":83400}

[Session: 92aa2b62-3a6c-4487-bd90-c79baa3d3ef5]
[Messages: 2, Tokens: 83400]
