# Update Plan for Alexi

Generated: 2026-04-24
Based on upstream commits: b45792030..60a1f3c36 (kilocode - 429 commits)

## Summary
- Total changes planned: 32
- Critical: 4 | High: 12 | Medium: 12 | Low: 4

## Changes

### 1. Add Encoding-Aware File I/O Utilities
**File**: `src/tool/encoded-io.ts`
**Priority**: critical
**Type**: feature
**Reason**: New encoding detection and preservation system prevents data corruption when reading/writing files with non-UTF-8 encodings (Shift-JIS, GB2312, etc.)

**New code**:
```typescript
import * as jschardet from "jschardet"
import * as iconv from "iconv-lite"

export interface EncodingResult {
  encoding: string
  confidence: number
  content: string
  hasBOM: boolean
}

const BOM_MARKERS = {
  UTF8: Buffer.from([0xef, 0xbb, 0xbf]),
  UTF16LE: Buffer.from([0xff, 0xfe]),
  UTF16BE: Buffer.from([0xfe, 0xff]),
  UTF32LE: Buffer.from([0xff, 0xfe, 0x00, 0x00]),
  UTF32BE: Buffer.from([0x00, 0x00, 0xfe, 0xff]),
}

export function detectEncoding(buffer: Buffer): EncodingResult {
  // Check for BOM first
  if (buffer.length >= 4 && buffer.slice(0, 4).equals(BOM_MARKERS.UTF32LE)) {
    return { encoding: "UTF-32LE", confidence: 1, content: "", hasBOM: true }
  }
  if (buffer.length >= 4 && buffer.slice(0, 4).equals(BOM_MARKERS.UTF32BE)) {
    return { encoding: "UTF-32BE", confidence: 1, content: "", hasBOM: true }
  }
  if (buffer.length >= 3 && buffer.slice(0, 3).equals(BOM_MARKERS.UTF8)) {
    return { encoding: "UTF-8", confidence: 1, content: "", hasBOM: true }
  }
  if (buffer.length >= 2 && buffer.slice(0, 2).equals(BOM_MARKERS.UTF16BE)) {
    return { encoding: "UTF-16BE", confidence: 1, content: "", hasBOM: true }
  }
  if (buffer.length >= 2 && buffer.slice(0, 2).equals(BOM_MARKERS.UTF16LE)) {
    return { encoding: "UTF-16LE", confidence: 1, content: "", hasBOM: true }
  }

  // Use jschardet for detection
  const detected = jschardet.detect(buffer)
  return {
    encoding: detected.encoding || "UTF-8",
    confidence: detected.confidence || 0,
    content: "",
    hasBOM: false,
  }
}

export function decodeWithEncoding(buffer: Buffer, encoding: string): string {
  return iconv.decode(buffer, encoding)
}

export function encodeWithEncoding(content: string, encoding: string, preserveBOM: boolean = false): Buffer {
  const encoded = iconv.encode(content, encoding)
  if (preserveBOM && encoding.toUpperCase() === "UTF-8") {
    return Buffer.concat([BOM_MARKERS.UTF8, encoded])
  }
  return encoded
}
```

### 2. Update Read Tool for Encoding Detection
**File**: `src/tool/read.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Prevents binary file misdetection for non-Latin character files (Chinese, Japanese, etc.)

**Current code**:
```typescript
export async function readFile(path: string): Promise<string> {
  const content = await fs.readFile(path, "utf-8")
  return content
}
```

**New code**:
```typescript
import { detectEncoding, decodeWithEncoding, EncodingResult } from "./encoded-io"

export interface ReadResult {
  content: string
  encoding: EncodingResult
}

export async function readFile(path: string): Promise<ReadResult> {
  const buffer = await fs.readFile(path)
  const encoding = detectEncoding(buffer)
  
  // Skip BOM bytes when decoding
  let contentBuffer = buffer
  if (encoding.hasBOM) {
    const bomLength = encoding.encoding.includes("32") ? 4 : 
                      encoding.encoding.includes("16") ? 2 : 3
    contentBuffer = buffer.slice(bomLength)
  }
  
  const content = decodeWithEncoding(contentBuffer, encoding.encoding)
  
  return {
    content,
    encoding,
  }
}

// kilocode_change: improved binary detection for non-Latin files
export function isBinaryFile(buffer: Buffer): boolean {
  // Only treat UTF-16 BOM files as binary (not UTF-8 or ASCII)
  if (buffer.length >= 2) {
    if (buffer[0] === 0xff && buffer[1] === 0xfe) return true // UTF-16 LE
    if (buffer[0] === 0xfe && buffer[1] === 0xff) return true // UTF-16 BE
  }
  return false
}
```

### 3. Update Write Tool for Encoding Preservation
**File**: `src/tool/write.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Preserves original file encoding when writing, preventing encoding corruption

**Current code**:
```typescript
export async function writeFile(path: string, content: string): Promise<void> {
  await fs.writeFile(path, content, "utf-8")
}
```

**New code**:
```typescript
import { encodeWithEncoding, EncodingResult } from "./encoded-io"

export async function writeFile(
  path: string, 
  content: string, 
  encoding?: EncodingResult
): Promise<void> {
  if (encoding && encoding.encoding !== "UTF-8") {
    const buffer = encodeWithEncoding(content, encoding.encoding, encoding.hasBOM)
    await fs.writeFile(path, buffer)
  } else if (encoding?.hasBOM && encoding.encoding === "UTF-8") {
    // kilocode_change: preserve UTF-8 BOM through read/write round-trip
    const buffer = encodeWithEncoding(content, "UTF-8", true)
    await fs.writeFile(path, buffer)
  } else {
    await fs.writeFile(path, content, "utf-8")
  }
}
```

### 4. Add Bash Tool Description Parameter (Optional)
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: Makes description parameter optional but recommended, improving UX while maintaining context

**Current code**:
```typescript
export const bashToolSchema = z.object({
  command: z.string().describe("The bash command to execute"),
  description: z.string().describe("A description of what this command does"),
})
```

**New code**:
```typescript
export const bashToolSchema = z.object({
  command: z.string().describe("The bash command to execute"),
  // kilocode_change: mark bash description as recommended but optional
  description: z.string().optional().describe(
    "A description of what this command does. Recommended for clarity but not required."
  ),
})

// Update execution to handle missing description
export async function executeBash(args: z.infer<typeof bashToolSchema>) {
  const { command, description } = args
  
  // Log with description if provided
  if (description) {
    logger.info(`Executing: ${description}`)
  }
  
  // ... rest of execution logic
}
```

### 5. Add Question Tool Dismissal Helpers
**File**: `src/tool/question.ts`
**Priority**: high
**Type**: feature
**Reason**: Enables auto-dismissing questions when new user messages are queued, preventing stalled sessions

**Current code**:
```typescript
export interface QuestionState {
  id: string
  question: string
  options: string[]
  answered: boolean
}
```

**New code**:
```typescript
export interface QuestionState {
  id: string
  question: string
  options: string[]
  answered: boolean
  dismissed: boolean
  dismissedAt?: number
}

// kilocode_change: add question dismissal helpers
export function dismissQuestion(state: QuestionState): QuestionState {
  return {
    ...state,
    dismissed: true,
    dismissedAt: Date.now(),
  }
}

export function dismissAllQuestions(questions: Map<string, QuestionState>): Map<string, QuestionState> {
  const result = new Map<string, QuestionState>()
  for (const [id, question] of questions) {
    if (!question.answered && !question.dismissed) {
      result.set(id, dismissQuestion(question))
    } else {
      result.set(id, question)
    }
  }
  return result
}

export function isQuestionBlocked(state: QuestionState): boolean {
  return state.dismissed && !state.answered
}
```

### 6. Fix Apply Patch Self-Review Cleanup
**File**: `src/tool/apply_patch.ts`
**Priority**: high
**Type**: refactor
**Reason**: Post-merge cleanup improves code maintainability and removes unused code paths

**Current code**:
```typescript
export async function applyPatch(patch: string, targetFile: string): Promise<ApplyResult> {
  // ... existing implementation
}
```

**New code**:
```typescript
// kilocode_change: self-review post-merge cleanup in apply_patch
export async function applyPatch(patch: string, targetFile: string): Promise<ApplyResult> {
  // Validate patch format
  if (!patch.trim()) {
    return { success: false, error: "Empty patch provided" }
  }

  // Read file with encoding preservation
  const { content, encoding } = await readFile(targetFile)
  
  try {
    const result = applyUnifiedDiff(content, patch)
    
    // Write back with original encoding
    await writeFile(targetFile, result, encoding)
    
    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error applying patch"
    }
  }
}
```

### 7. Add Edit Tool File Diff Metadata for Permissions
**File**: `src/tool/edit.ts`
**Priority**: high
**Type**: feature
**Reason**: Includes file diff metadata in edit tool permission requests for better user context

**Current code**:
```typescript
export async function requestEditPermission(
  path: string,
  operation: EditOperation
): Promise<boolean> {
  return await permissionSystem.request({
    tool: "edit",
    path,
    operation: operation.type,
  })
}
```

**New code**:
```typescript
import { generateFileDiff } from "../util/diff"

export interface EditPermissionMetadata {
  path: string
  operation: EditOperation
  fileDiff?: string
  linesChanged?: number
}

// kilocode_change: include filediff metadata in edit tool permission ask
export async function requestEditPermission(
  path: string,
  operation: EditOperation,
  originalContent?: string,
  newContent?: string
): Promise<boolean> {
  const metadata: EditPermissionMetadata = {
    path,
    operation,
  }

  // Generate diff if we have both contents
  if (originalContent !== undefined && newContent !== undefined) {
    metadata.fileDiff = generateFileDiff(originalContent, newContent, path)
    metadata.linesChanged = countChangedLines(metadata.fileDiff)
  }

  return await permissionSystem.request({
    tool: "edit",
    ...metadata,
  })
}

function countChangedLines(diff: string): number {
  const lines = diff.split("\n")
  return lines.filter(l => l.startsWith("+") || l.startsWith("-")).length
}
```

### 8. Update Tool Registry with New Tools
**File**: `src/tool/registry.ts`
**Priority**: high
**Type**: feature
**Reason**: Register new encoding-aware tools and update existing registrations

**Current code**:
```typescript
export const toolRegistry = new Map<string, Tool>([
  ["read", readTool],
  ["write", writeTool],
  ["bash", bashTool],
  // ...
])
```

**New code**:
```typescript
import { encodedReadTool } from "./read"
import { encodedWriteTool } from "./write"

export const toolRegistry = new Map<string, Tool>([
  ["read", encodedReadTool],
  ["write", encodedWriteTool],
  ["bash", bashTool],
  // ... other tools
])

// kilocode_change: add tool capability flags
export interface ToolCapabilities {
  supportsEncoding: boolean
  requiresPermission: boolean
  canModifyFiles: boolean
}

export const toolCapabilities = new Map<string, ToolCapabilities>([
  ["read", { supportsEncoding: true, requiresPermission: false, canModifyFiles: false }],
  ["write", { supportsEncoding: true, requiresPermission: true, canModifyFiles: true }],
  ["edit", { supportsEncoding: true, requiresPermission: true, canModifyFiles: true }],
  ["bash", { supportsEncoding: false, requiresPermission: true, canModifyFiles: true }],
])
```

### 9. Add Session Compaction Cap
**File**: `src/core/session/compaction.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Caps per-turn compaction attempts to prevent infinite busy loops

**New code**:
```typescript
// kilocode_change: cap per-turn compaction attempts to stop infinite busy loop
const MAX_COMPACTION_ATTEMPTS_PER_TURN = 3

export interface CompactionState {
  attemptsThisTurn: number
  lastCompactionTime: number
  totalCompactions: number
}

export function shouldAttemptCompaction(
  state: CompactionState,
  contextLength: number,
  maxContextLength: number
): boolean {
  // Don't compact if we've hit the per-turn limit
  if (state.attemptsThisTurn >= MAX_COMPACTION_ATTEMPTS_PER_TURN) {
    logger.warn(
      `Compaction attempt limit reached (${MAX_COMPACTION_ATTEMPTS_PER_TURN}), ` +
      `skipping further compaction this turn`
    )
    return false
  }

  // Only compact if we're over the threshold
  const threshold = maxContextLength * 0.9
  return contextLength > threshold
}

export function incrementCompactionAttempt(state: CompactionState): CompactionState {
  return {
    ...state,
    attemptsThisTurn: state.attemptsThisTurn + 1,
    lastCompactionTime: Date.now(),
    totalCompactions: state.totalCompactions + 1,
  }
}

export function resetTurnCompactionCount(state: CompactionState): CompactionState {
  return {
    ...state,
    attemptsThisTurn: 0,
  }
}
```

### 10. Fix Snapshot Diff Freeze for Large Files
**File**: `src/core/snapshot/diff.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Prevents TUI freeze when viewing diffs of huge files by adding size caps

**New code**:
```typescript
// kilocode_change: stop TUI freeze when viewing diffs of huge files
const MAX_DIFF_FILE_SIZE = 1024 * 1024 // 1MB
const MAX_DIFF_LINES = 10000

export interface DiffOptions {
  maxFileSize?: number
  maxLines?: number
  truncateMessage?: string
}

export function generateDiff(
  oldContent: string,
  newContent: string,
  options: DiffOptions = {}
): string {
  const maxFileSize = options.maxFileSize ?? MAX_DIFF_
{"prompt_tokens":73035,"completion_tokens":4096,"total_tokens":77131}

[Session: f3a0b3d8-89ff-4a05-ae10-c013be0c2e7d]
[Messages: 2, Tokens: 77131]
