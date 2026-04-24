# Quick Reference: Upstream Changes Implementation

## Installation

```bash
# Required dependencies for encoding support
npm install jschardet iconv-lite
npm install --save-dev @types/jschardet

# Verify installation
npm run typecheck
npm run build
npm test
```

## New Features

### 1. Encoding-Aware File Operations

```typescript
// Reading files with encoding detection
import { readTool } from './tool/tools/read.js';

const result = await readTool.execute({ filePath: '/path/to/file.txt' }, context);
// result.data.encoding contains detected encoding info

// Writing files with encoding preservation
import { writeTool } from './tool/tools/write.js';

await writeTool.execute({
  filePath: '/path/to/file.txt',
  content: 'new content',
  encoding: result.data.encoding, // Preserves original encoding
}, context);
```

### 2. Question Dismissal

```typescript
import { dismissQuestion, dismissAllQuestions, isQuestionBlocked } from './tool/tools/question.js';

// Dismiss a single question
const dismissedState = dismissQuestion(questionState);

// Dismiss all pending questions
const updatedMap = dismissAllQuestions(pendingQuestions);

// Check if question is blocked
if (isQuestionBlocked(questionState)) {
  // Handle blocked question
}
```

### 3. Compaction State Management

```typescript
import {
  createCompactionState,
  shouldAttemptCompaction,
  incrementCompactionAttempt,
  resetTurnCompactionCount,
} from './compaction/index.js';

// Create initial state
const state = createCompactionState();

// Check if compaction should proceed
if (shouldAttemptCompaction(state, currentTokens, maxTokens)) {
  // Perform compaction
  const newState = incrementCompactionAttempt(state);
}

// Reset at turn boundary
const resetState = resetTurnCompactionCount(state);
```

### 4. Permission Metadata

```typescript
// In tool definition
export const myTool = defineTool({
  name: 'mytool',
  // ...
  permission: {
    action: 'write',
    getResource: (params) => params.filePath,
    // NEW: Optional metadata for permission requests
    getMetadata: async (params, context) => {
      const diff = generateFileDiff(oldContent, newContent, params.filePath);
      return {
        fileDiff: diff,
        linesChanged: countChangedLines(diff),
      };
    },
  },
  // ...
});
```

## API Changes

### Tool Definition Interface

```typescript
// BEFORE
interface ToolDefinition {
  permission?: {
    action: PermissionAction;
    getResource: (params, context?) => string;
  };
}

// AFTER
interface ToolDefinition {
  permission?: {
    action: PermissionAction;
    getResource: (params, context?) => string;
    getMetadata?: (params, context?) => Promise<Record<string, unknown>> | Record<string, unknown>;
  };
}
```

### Permission Context

```typescript
// BEFORE
interface PermissionContext {
  toolName: string;
  action: PermissionAction;
  resource: string;
  description?: string;
}

// AFTER
interface PermissionContext {
  toolName: string;
  action: PermissionAction;
  resource: string;
  description?: string;
  metadata?: Record<string, unknown>; // NEW
}
```

### Read Tool Result

```typescript
// BEFORE
interface ReadFileResult {
  type: 'file';
  path: string;
  content: string;
  totalLines: number;
  shownLines: number;
  offset: number;
}

// AFTER
interface ReadFileResult {
  type: 'file';
  path: string;
  content: string;
  totalLines: number;
  shownLines: number;
  offset: number;
  encoding?: EncodingResult; // NEW
}
```

### Write Tool Parameters

```typescript
// BEFORE
const params = {
  filePath: string;
  content: string;
};

// AFTER
const params = {
  filePath: string;
  content: string;
  encoding?: EncodingResult; // NEW - optional encoding preservation
};
```

## Testing Examples

```typescript
// Test encoding detection
import { detectEncoding, decodeWithEncoding } from './tool/encoded-io.js';

const buffer = Buffer.from('Hello 世界', 'utf-8');
const result = detectEncoding(buffer);
expect(result.encoding).toBe('UTF-8');

// Test question dismissal
import { dismissQuestion } from './tool/tools/question.js';

const state = { id: '123', answered: false, dismissed: false };
const dismissed = dismissQuestion(state);
expect(dismissed.dismissed).toBe(true);
expect(dismissed.dismissedAt).toBeDefined();

// Test compaction limits
import { shouldAttemptCompaction, createCompactionState } from './compaction/index.js';

const state = createCompactionState();
state.attemptsThisTurn = 3;
expect(shouldAttemptCompaction(state, 100000, 100000)).toBe(false);
```

## Migration Guide

### For Existing Code

All changes are backward compatible. No migration needed for:
- Existing tool calls
- Permission configurations without metadata
- File operations using default UTF-8 encoding

### For New Features

To adopt new features:

1. **Encoding Support**: Pass encoding from read to write
2. **Permission Metadata**: Add `getMetadata()` to tool definitions
3. **Compaction Limits**: Use state management functions
4. **Question Dismissal**: Call dismissal helpers when needed

## Troubleshooting

### Encoding Issues

```typescript
// If encoding detection fails, it defaults to UTF-8
const result = detectEncoding(buffer);
if (result.confidence < 0.7) {
  console.warn('Low confidence encoding detection:', result.encoding);
  // Fallback to explicit encoding
}
```

### Permission Metadata Errors

```typescript
// Metadata generation is wrapped in try-catch
// Failures are non-fatal and proceed without metadata
getMetadata: async (params, context) => {
  try {
    return { /* metadata */ };
  } catch (error) {
    console.error('Metadata generation failed:', error);
    return {};
  }
}
```

### Compaction Loop Detection

```typescript
// Check state before attempting compaction
if (state.attemptsThisTurn >= 3) {
  console.warn('Max compaction attempts reached this turn');
  // Skip compaction or reset state
}
```

## Performance Considerations

1. **Encoding Detection**: ~1-5ms per file, cached by OS
2. **Diff Generation**: O(n) where n = file size, consider limiting for large files
3. **Question Dismissal**: O(1) for single, O(n) for batch
4. **Compaction State**: Minimal overhead, state is lightweight

## Best Practices

1. **Always preserve encoding** when editing existing files
2. **Include metadata** in permission requests for better UX
3. **Reset compaction state** at turn boundaries
4. **Dismiss questions** when user provides new input
5. **Log encoding decisions** for debugging

## Support

For issues or questions:
- Check test files for usage examples
- Review AGENTS.md for coding guidelines
- See full report: `.github/reports/update-execution-report.md`
