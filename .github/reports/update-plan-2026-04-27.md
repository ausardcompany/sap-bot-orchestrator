# Update Plan for Alexi

Generated: 2026-04-27
Based on upstream commits: kilocode ede13b7ec (585 commits), opencode (0 commits)

## Summary
- Total changes planned: 42
- Critical: 3 | High: 12 | Medium: 18 | Low: 9

## Changes

### 1. Add encoding-aware file I/O utilities
**File**: `src/tool/encoded-io.ts`
**Priority**: critical
**Type**: feature
**Reason**: New encoding preservation system from kilocode prevents corruption of non-UTF-8 files (UTF-16, legacy encodings). Critical for international codebases.

**New code**:
```typescript
import * as iconv from "iconv-lite"
import jschardet from "jschardet"

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

  // Use jschardet for non-BOM detection
  const detected = jschardet.detect(buffer)
  return {
    encoding: detected.encoding?.toLowerCase() || "utf-8",
    confidence: detected.confidence || 0,
    hasBOM: false,
  }
}

/**
 * Decode buffer to string preserving encoding
 */
export function decodeWithEncoding(buffer: Buffer, encoding: EncodingInfo): string {
  const contentBuffer = encoding.hasBOM && encoding.bomBytes 
    ? buffer.slice(encoding.bomBytes.length)
    : buffer
  
  if (encoding.encoding === "utf-8") {
    return contentBuffer.toString("utf-8")
  }
  
  return iconv.decode(contentBuffer, encoding.encoding)
}

/**
 * Encode string back to buffer preserving original encoding and BOM
 */
export function encodeWithEncoding(content: string, encoding: EncodingInfo): Buffer {
  let encoded: Buffer
  
  if (encoding.encoding === "utf-8") {
    encoded = Buffer.from(content, "utf-8")
  } else {
    encoded = iconv.encode(content, encoding.encoding)
  }
  
  // Restore BOM if original had one
  if (encoding.hasBOM && encoding.bomBytes) {
    return Buffer.concat([encoding.bomBytes, encoded])
  }
  
  return encoded
}

/**
 * Check if buffer appears to be binary (not text)
 * Only considers UTF-16 BOM files as binary for legacy compatibility
 */
export function isBinaryFile(buffer: Buffer): boolean {
  // UTF-16 files with BOM are treated as binary to prevent corruption
  if (buffer.length >= 2) {
    if ((buffer[0] === 0xff && buffer[1] === 0xfe) ||
        (buffer[0] === 0xfe && buffer[1] === 0xff)) {
      return true
    }
  }
  return false
}
```

### 2. Update read tool with encoding preservation
**File**: `src/tool/read.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Prevents file corruption when reading non-UTF-8 encoded files. Integrates with new encoding detection.

**Current code** (if exists):
```typescript
async function readFile(path: string): Promise<string> {
  return fs.readFile(path, "utf-8")
}
```

**New code**:
```typescript
import { detectEncoding, decodeWithEncoding, isBinaryFile, EncodingInfo } from "./encoded-io"

interface ReadResult {
  content: string
  encoding: EncodingInfo
  isBinary: boolean
}

async function readFile(path: string): Promise<ReadResult> {
  const buffer = await fs.readFile(path)
  
  // Check for binary first
  if (isBinaryFile(buffer)) {
    return {
      content: `[Binary file: ${path}]`,
      encoding: { encoding: "binary", confidence: 1, hasBOM: false },
      isBinary: true,
    }
  }
  
  const encoding = detectEncoding(buffer)
  const content = decodeWithEncoding(buffer, encoding)
  
  return {
    content,
    encoding,
    isBinary: false,
  }
}

// Store encoding info for later write operations
const fileEncodings = new Map<string, EncodingInfo>()

export async function read(params: { path: string }): Promise<ToolResult> {
  const result = await readFile(params.path)
  
  if (!result.isBinary) {
    // Cache encoding for write operations
    fileEncodings.set(params.path, result.encoding)
  }
  
  return {
    success: true,
    content: result.content,
  }
}

export function getFileEncoding(path: string): EncodingInfo | undefined {
  return fileEncodings.get(path)
}
```

### 3. Update write tool with encoding preservation
**File**: `src/tool/write.ts`
**Priority**: critical
**Type**: bugfix
**Reason**: Ensures files are written back with their original encoding, preventing corruption.

**Current code** (if exists):
```typescript
async function writeFile(path: string, content: string): Promise<void> {
  await fs.writeFile(path, content, "utf-8")
}
```

**New code**:
```typescript
import { encodeWithEncoding, EncodingInfo } from "./encoded-io"
import { getFileEncoding } from "./read"

export async function write(params: { path: string; content: string }): Promise<ToolResult> {
  const { path, content } = params
  
  // Get cached encoding from previous read, default to UTF-8
  const encoding = getFileEncoding(path) || { 
    encoding: "utf-8", 
    confidence: 1, 
    hasBOM: false 
  }
  
  // Handle UTF-8 BOM preservation
  // If content starts with U+FEFF and we already have BOM, don't double it
  let finalContent = content
  if (encoding.hasBOM && encoding.encoding === "utf-8" && content.charCodeAt(0) === 0xfeff) {
    finalContent = content.slice(1)
  }
  
  const buffer = encodeWithEncoding(finalContent, encoding)
  await fs.writeFile(path, buffer)
  
  return {
    success: true,
    message: `Wrote ${buffer.length} bytes to ${path}`,
  }
}
```

### 4. Fix bash tool description parameter to be optional
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: Makes description parameter optional as recommended, reducing token usage while maintaining functionality.

**Current code**:
```typescript
export const bashToolSchema = {
  name: "bash",
  description: "Execute bash commands",
  parameters: {
    type: "object",
    properties: {
      command: { type: "string", description: "The command to execute" },
      description: { type: "string", description: "Description of what the command does" },
    },
    required: ["command", "description"],
  },
}
```

**New code**:
```typescript
export const bashToolSchema = {
  name: "bash",
  description: "Execute bash commands",
  parameters: {
    type: "object",
    properties: {
      command: { type: "string", description: "The command to execute" },
      description: { 
        type: "string", 
        description: "Optional description of what the command does (recommended for complex commands)" 
      },
    },
    required: ["command"],
  },
}

export async function bash(params: { command: string; description?: string }): Promise<ToolResult> {
  const { command, description } = params
  
  // Log description if provided for audit trail
  if (description) {
    logger.debug(`Executing: ${description}`)
  }
  
  // ... rest of implementation
}
```

### 5. Add interleaved reasoning content preservation for DeepSeek
**File**: `src/providers/transform.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Fixes OpenRouter DeepSeek reasoning content handling - empty reasoning_content must be preserved.

**New code** (add to transform functions):
```typescript
/**
 * Transform interleaved reasoning for DeepSeek models via OpenRouter
 * Preserves empty reasoning_content to maintain message structure
 */
export function transformInterleavedReasoning(
  messages: Message[],
  provider: string,
  model: string
): Message[] {
  // Skip transform for Kilo gateway - it handles this internally
  if (provider === "@kilocode/kilo-gateway") {
    return messages
  }
  
  // Only apply to OpenRouter DeepSeek models
  if (provider !== "openrouter" || !model.includes("deepseek")) {
    return messages
  }
  
  return messages.map(msg => {
    if (msg.role === "assistant") {
      // Ensure reasoning_content exists even if empty
      return {
        ...msg,
        reasoning_content: msg.reasoning_content ?? "",
      }
    }
    return msg
  })
}

/**
 * Ensure assistant messages always have reasoning for DeepSeek
 */
export function ensureDeepSeekReasoning(messages: Message[], model: string): Message[] {
  if (!model.includes("deepseek")) {
    return messages
  }
  
  return messages.map(msg => {
    if (msg.role === "assistant" && msg.reasoning_content === undefined) {
      return { ...msg, reasoning_content: "" }
    }
    return msg
  })
}
```

### 6. Add support for DeepSeek `max` token parameter
**File**: `src/providers/deepseek.ts`
**Priority**: high
**Type**: feature
**Reason**: DeepSeek models support `max` as a special value for max_tokens.

**New code**:
```typescript
export interface DeepSeekOptions {
  maxTokens?: number | "max"
  reasoningEffort?: "low" | "medium" | "high"
}

export function buildDeepSeekRequest(
  messages: Message[],
  options: DeepSeekOptions
): ProviderRequest {
  const request: ProviderRequest = {
    messages,
  }
  
  // Handle special "max" value for max_tokens
  if (options.maxTokens === "max") {
    request.max_tokens = undefined // Let provider use maximum
    request.max_completion_tokens = "max" as any // DeepSeek-specific
  } else if (options.maxTokens) {
    request.max_tokens = options.maxTokens
  }
  
  return request
}
```

### 7. Add Ling model detection and support
**File**: `src/providers/model-match.ts`
**Priority**: high
**Type**: feature
**Reason**: Adds support for Ling models with proper detection excluding false positives like kling/bling/spelling.

**New code**:
```typescript
/**
 * Check if model ID represents a Ling model
 * Excludes false positives: kling, bling, spelling, etc.
 */
export function isLing(modelId: string): boolean {
  const lower = modelId.toLowerCase()
  
  // Must start with "ling" as a word boundary
  if (!lower.startsWith("ling")) {
    // Check for ling after a separator
    const lingIndex = lower.indexOf("ling")
    if (lingIndex === -1) return false
    
    // Ensure it's a word boundary (preceded by separator)
    const prevChar = lower[lingIndex - 1]
    if (prevChar !== "-" && prevChar !== "_" && prevChar !== "/" && prevChar !== ":") {
      return false
    }
  }
  
  // Exclude known false positives
  const exclusions = ["kling", "bling", "spelling", "sibling", "handling", "enabling"]
  for (const exclusion of exclusions) {
    if (lower.includes(exclusion)) {
      return false
    }
  }
  
  return true
}

/**
 * Get model family for routing decisions
 */
export function getModelFamily(modelId: string): string {
  if (isLing(modelId)) return "ling"
  if (modelId.includes("deepseek")) return "deepseek"
  if (modelId.includes("claude")) return "claude"
  if (modelId.includes("gpt")) return "openai"
  if (modelId.includes("gemini")) return "google"
  return "unknown"
}
```

### 8. Add Ling-specific system prompt
**File**: `src/prompts/ling.txt`
**Priority**: high
**Type**: feature
**Reason**: Ling models require specialized prompting for optimal performance.

**New code**:
```typescript
// src/prompts/ling.ts
export const LING_SYSTEM_PROMPT = `You are an expert software engineer assistant powered by the Ling model architecture.

## Key Capabilities
- Deep understanding of code structure and patterns
- Multi-language support with emphasis on accuracy
- Careful reasoning before making changes

## Guidelines
1. Always analyze the full context before suggesting changes
2. Prefer minimal, targeted modifications over broad rewrites
3. Explain your reasoning when making non-obvious decisions
4. When uncertain, ask clarifying questions

## Code Style
- Follow existing project conventions
- Maintain consistent formatting
- Add comments for complex logic
- Preserve existing documentation

## Safety
- Never execute destructive operations without confirmation
- Validate file paths before operations
- Respect .gitignore and security boundaries
`
```

### 9. Fix question tool dismissal handling
**File**: `src/tool/question.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Properly handles question dismissal and prevents duplicate custom answers.

**Current code**:
```typescript
export async function question(params: QuestionParams): Promise<ToolResult> {
  // ... existing implementation
}
```

**New code**:
```typescript
import { QuestionState } from "../bus/question-state"

export interface QuestionParams {
  question: string
  options?: string[]
  allowCustom?: boolean
}

export interface QuestionResult {
  answer:
{"prompt_tokens":80835,"completion_tokens":4096,"total_tokens":84931}

[Session: 0fb3fa01-a216-45a1-9387-72dc02cd994e]
[Messages: 2, Tokens: 84931]
