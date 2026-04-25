# Update Plan for Alexi

Generated: 2026-04-25
Based on upstream commits: kilocode 3af9b4a33..60a1f3c36 (551 commits)

## Summary
- Total changes planned: 28
- Critical: 3 | High: 8 | Medium: 12 | Low: 5

## Changes

### 1. Add Encoding-Aware File I/O Utilities
**File**: `src/tool/encoded-io.ts` (new file)
**Priority**: critical
**Type**: feature
**Reason**: Upstream added encoding detection and preservation to prevent file corruption when reading/writing non-UTF-8 files (UTF-16, UTF-8 BOM, etc.)

**New code**:
```typescript
import jschardet from "jschardet"
import * as iconv from "iconv-lite"

export interface EncodingInfo {
  encoding: string
  confidence: number
  hasBOM: boolean
  bomBytes?: Buffer
}

/**
 * Detect file encoding from buffer content
 * Handles UTF-8 BOM, UTF-16 LE/BE, UTF-32, and various legacy encodings
 */
export function detectEncoding(buffer: Buffer): EncodingInfo {
  // Check for BOM markers first
  if (buffer.length >= 4) {
    // UTF-32 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe && buffer[2] === 0x00 && buffer[3] === 0x00) {
      return { encoding: "UTF-32LE", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) }
    }
    // UTF-32 BE BOM
    if (buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0xfe && buffer[3] === 0xff) {
      return { encoding: "UTF-32BE", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) }
    }
  }
  
  if (buffer.length >= 3) {
    // UTF-8 BOM
    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      return { encoding: "UTF-8", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 3) }
    }
  }
  
  if (buffer.length >= 2) {
    // UTF-16 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
      return { encoding: "UTF-16LE", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) }
    }
    // UTF-16 BE BOM
    if (buffer[0] === 0xfe && buffer[1] === 0xff) {
      return { encoding: "UTF-16BE", confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) }
    }
  }

  // Fall back to jschardet for detection
  const detected = jschardet.detect(buffer)
  return {
    encoding: detected.encoding || "UTF-8",
    confidence: detected.confidence || 0,
    hasBOM: false
  }
}

/**
 * Decode buffer to string preserving original encoding info
 */
export function decodeWithEncoding(buffer: Buffer, encodingInfo: EncodingInfo): string {
  const dataBuffer = encodingInfo.hasBOM && encodingInfo.bomBytes 
    ? buffer.slice(encodingInfo.bomBytes.length)
    : buffer
  
  return iconv.decode(dataBuffer, encodingInfo.encoding)
}

/**
 * Encode string back to buffer, preserving original BOM if present
 */
export function encodeWithEncoding(content: string, encodingInfo: EncodingInfo): Buffer {
  const encoded = iconv.encode(content, encodingInfo.encoding)
  
  if (encodingInfo.hasBOM && encodingInfo.bomBytes) {
    return Buffer.concat([encodingInfo.bomBytes, encoded])
  }
  
  return encoded
}
```

### 2. Update Read Tool for Encoding Preservation
**File**: `src/tool/read.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Prevent binary detection false positives for UTF-16 encoded files and preserve encoding metadata

**Current code**:
```typescript
export async function readFile(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath)
  // Simple binary check
  if (isBinaryFile(buffer)) {
    throw new Error("Cannot read binary file")
  }
  return buffer.toString("utf-8")
}
```

**New code**:
```typescript
import { detectEncoding, decodeWithEncoding, EncodingInfo } from "./encoded-io"

export interface ReadResult {
  content: string
  encodingInfo: EncodingInfo
}

export async function readFile(filePath: string): Promise<ReadResult> {
  const buffer = await fs.readFile(filePath)
  const encodingInfo = detectEncoding(buffer)
  
  // Skip binary detection for files with UTF-16/UTF-32 BOM
  // These often trigger false positives due to null bytes
  const skipBinaryCheck = encodingInfo.hasBOM && 
    (encodingInfo.encoding.startsWith("UTF-16") || encodingInfo.encoding.startsWith("UTF-32"))
  
  if (!skipBinaryCheck && isBinaryFile(buffer)) {
    throw new Error("Cannot read binary file")
  }
  
  const content = decodeWithEncoding(buffer, encodingInfo)
  return { content, encodingInfo }
}
```

### 3. Update Write Tool for Encoding Preservation
**File**: `src/tool/write.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Preserve original file encoding and BOM when writing changes

**Current code**:
```typescript
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, "utf-8")
}
```

**New code**:
```typescript
import { encodeWithEncoding, EncodingInfo } from "./encoded-io"

export async function writeFile(
  filePath: string, 
  content: string,
  encodingInfo?: EncodingInfo
): Promise<void> {
  if (encodingInfo) {
    // Preserve original encoding
    const buffer = encodeWithEncoding(content, encodingInfo)
    await fs.writeFile(filePath, buffer)
  } else {
    // Default to UTF-8 for new files
    await fs.writeFile(filePath, content, "utf-8")
  }
}
```

### 4. Add Bash Tool Description Parameter as Optional
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: Make bash description parameter optional with "recommended" marker per upstream change

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
    "(Recommended) A brief description of what this command does and why. " +
    "Helps with audit logging and understanding command intent."
  )
})

// Update execute function to handle optional description
export async function executeBash(params: z.infer<typeof bashToolSchema>): Promise<BashResult> {
  const { command, description } = params
  
  // Log with description if provided
  if (description) {
    logger.info(`Executing bash command: ${description}`)
  }
  
  // ... rest of execution logic
}
```

### 5. Add Model Matching Helper for Ling Models
**File**: `src/providers/model-match.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: Upstream added ling model detection with exclusions for similar-named models (kling, bling, spelling)

**New code**:
```typescript
/**
 * Check if a model ID represents a Ling model
 * Excludes false positives like "kling", "bling", "spelling"
 */
export function isLingModel(modelId: string): boolean {
  const lower = modelId.toLowerCase()
  
  // Must start with "ling" but not be part of another word
  if (!lower.includes("ling")) {
    return false
  }
  
  // Exclude known false positives
  const exclusions = ["kling", "bling", "spelling", "sibling", "tingling", "mingling"]
  for (const exclusion of exclusions) {
    if (lower.includes(exclusion)) {
      return false
    }
  }
  
  // Check if "ling" appears as a standalone prefix or model name component
  return lower.startsWith("ling") || 
         lower.includes("/ling") || 
         lower.includes("-ling") ||
         lower.includes("_ling")
}
```

### 6. Update Task Tool to Respect Configured Model for Subagents
**File**: `src/tool/task.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fix from upstream - subagents should respect the configured model setting

**Current code**:
```typescript
export async function executeTask(params: TaskParams, context: ToolContext): Promise<TaskResult> {
  const subagent = await createSubagent({
    task: params.task,
    // Uses default model
  })
  return subagent.execute()
}
```

**New code**:
```typescript
export async function executeTask(params: TaskParams, context: ToolContext): Promise<TaskResult> {
  // Get configured model from context or config
  const configuredModel = context.modelOverride ?? context.config?.defaultModel
  
  const subagent = await createSubagent({
    task: params.task,
    model: configuredModel, // Respect configured model
    parentSessionId: context.sessionId,
  })
  
  return subagent.execute()
}
```

### 7. Add Question Tool Auto-Dismiss on New User Message
**File**: `src/tool/question.ts`
**Priority**: high
**Type**: feature
**Reason**: Auto-dismiss pending question prompts when user queues a new message to prevent stalling

**Current code**:
```typescript
export async function askQuestion(params: QuestionParams): Promise<QuestionResult> {
  const response = await waitForUserResponse(params)
  return { answer: response }
}
```

**New code**:
```typescript
import { EventEmitter } from "events"

// Global event emitter for question dismissal
export const questionEvents = new EventEmitter()

export interface QuestionState {
  id: string
  dismissed: boolean
  blockedByNewMessage: boolean
}

const pendingQuestions = new Map<string, QuestionState>()

/**
 * Dismiss all pending questions when a new user message is queued
 */
export function dismissAllPendingQuestions(reason: "new_message" | "user_action" = "user_action"): void {
  for (const [id, state] of pendingQuestions) {
    if (!state.dismissed) {
      state.dismissed = true
      state.blockedByNewMessage = reason === "new_message"
      questionEvents.emit("dismissed", { id, reason })
    }
  }
}

export async function askQuestion(params: QuestionParams): Promise<QuestionResult> {
  const questionId = generateId()
  const state: QuestionState = { id: questionId, dismissed: false, blockedByNewMessage: false }
  pendingQuestions.set(questionId, state)
  
  try {
    const response = await Promise.race([
      waitForUserResponse(params),
      new Promise<null>((resolve) => {
        questionEvents.once("dismissed", (event) => {
          if (event.id === questionId) resolve(null)
        })
      })
    ])
    
    if (response === null || state.dismissed) {
      return { 
        answer: null, 
        dismissed: true,
        blockedByNewMessage: state.blockedByNewMessage 
      }
    }
    
    return { answer: response, dismissed: false }
  } finally {
    pendingQuestions.delete(questionId)
  }
}
```

### 8. Fix Apply Patch Tool for Better Error Context
**File**: `src/tool/apply_patch.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Upstream improved error handling and context preservation in patch application

**Current code**:
```typescript
export async function applyPatch(params: PatchParams): Promise<PatchResult> {
  try {
    const result = await patch.apply(params.patch, params.targetFile)
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

**New code**:
```typescript
export async function applyPatch(params: PatchParams): Promise<PatchResult> {
  const { patch: patchContent, targetFile } = params
  
  try {
    // Read file with encoding preservation
    const { content: originalContent, encodingInfo } = await readFile(targetFile)
    
    const result = await patch.apply(patchContent, originalContent)
    
    if (!result.success) {
      return {
        success: false,
        error: result.error,
        context: {
          originalLines: originalContent.split("\n").length,
          patchHunks: countPatchHunks(patchContent),
          failedHunk: result.failedHunk
        }
      }
    }
    
    // Write back with original encoding
    await writeFile(targetFile, result.content, encodingInfo)
    
    return { 
      success: true, 
      result: result.content,
      linesChanged: result.linesChanged 
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error),
      context: { targetFile }
    }
  }
}

function countPatchHunks(patch: string): number {
  return (patch.match(/^@@/gm) || []).length
}
```

### 9. Update Edit Tool with FileDiff Metadata in Permission Ask
**File**: `src/tool/edit.ts`
**Priority**: high
**Type**: feature
**Reason**: Include file diff metadata when asking for edit permission to improve user context

**Current code**:
```typescript
async function requestEditPermission(filePath: string): Promise<boolean> {
  return await askPermission({
    action: "edit",
    resource: filePath
  })
}
```

**New code**:
```typescript
interface FileDiffMetadata {
  additions: number
  deletions: number
  hunks: number
  preview?: string
}

async function computeFileDiff(
  originalContent: string, 
  newContent: string
): Promise<FileDiffMetadata> {
  const diff = createPatch("file", originalContent, newContent)
  const lines = diff.split("\n")
  
  let additions = 0
  let deletions = 0
  let hunks = 0
  
  for (const line of lines) {
    if (line.startsWith("+") && !line.startsWith("+++")) additions++
    if (line.startsWith("-") && !line.startsWith("---")) deletions++
    if (line.startsWith("@@")) hunks++
  }
  
  // Generate preview (first 10 changed lines)
  const previewLines = lines
    .filter(l => l.startsWith("+") || l.startsWith("-"))
    .filter(l => !l.startsWith("+++") && !l.startsWith("---"))
    .slice(0, 10)
  
  return {
    additions,
    deletions,
    hunks,
    preview: previewLines.join("\n")
  }
}

async function requestEditPermission(
{"prompt_tokens":79397,"completion_tokens":4096,"total_tokens":83493}

[Session: 2f2ef322-8590-4bec-9892-cb542acfca19]
[Messages: 2, Tokens: 83493]
