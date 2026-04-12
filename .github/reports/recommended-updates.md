# Recommended Updates for Alexi

**Date**: 2026-04-12  
**Status**: Proposed  
**Priority**: High

## Overview

After analyzing the upstream changes, this document proposes Alexi-specific improvements that adapt valuable concepts from upstream while maintaining compatibility with Alexi's Promise-based architecture and SAP AI Core integration.

## Proposed Updates

### 1. Enhanced Tool Output Truncation (High Priority)

**Concept from**: Upstream truncate.ts improvements  
**Alexi Adaptation**: Enhance existing truncation in `src/tool/index.ts`

#### Current Implementation
```typescript
// In src/tool/index.ts
const MAX_LINES = 2000;
const MAX_BYTES = 51200; // 50KB

function truncateOutput(output: string): { content: string; truncated: boolean } {
  // Basic truncation logic
}
```

#### Proposed Enhancement
```typescript
// Enhanced truncation with better feedback
interface TruncationOptions {
  maxLines?: number;
  maxBytes?: number;
  preserveEnds?: boolean; // Keep first and last N lines
  contextLines?: number;  // Lines to keep at boundaries
}

function truncateOutput(
  output: string, 
  options: TruncationOptions = {}
): { 
  content: string; 
  truncated: boolean;
  stats?: {
    originalLines: number;
    originalBytes: number;
    truncatedLines: number;
    truncatedBytes: number;
  }
} {
  const maxLines = options.maxLines ?? MAX_LINES;
  const maxBytes = options.maxBytes ?? MAX_BYTES;
  const lines = output.split('\n');
  const bytes = Buffer.byteLength(output, 'utf-8');
  
  if (lines.length <= maxLines && bytes <= maxBytes) {
    return { content: output, truncated: false };
  }
  
  let result: string;
  
  if (options.preserveEnds && lines.length > maxLines) {
    const contextLines = options.contextLines ?? 50;
    const head = lines.slice(0, contextLines);
    const tail = lines.slice(-contextLines);
    const omitted = lines.length - (contextLines * 2);
    result = [
      ...head,
      '',
      `[... ${omitted} lines omitted ...]`,
      '',
      ...tail
    ].join('\n');
  } else {
    result = lines.slice(0, maxLines).join('\n');
  }
  
  // Handle byte truncation
  if (Buffer.byteLength(result, 'utf-8') > maxBytes) {
    let left = 0;
    let right = result.length;
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      if (Buffer.byteLength(result.slice(0, mid), 'utf-8') <= maxBytes) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }
    result = result.slice(0, left);
  }
  
  return { 
    content: result, 
    truncated: true,
    stats: {
      originalLines: lines.length,
      originalBytes: bytes,
      truncatedLines: result.split('\n').length,
      truncatedBytes: Buffer.byteLength(result, 'utf-8')
    }
  };
}
```

**Benefits**:
- Better context preservation with preserveEnds option
- Detailed truncation statistics for debugging
- More flexible truncation strategies

### 2. Permission Evaluation Helpers (Medium Priority)

**Concept from**: Upstream permission/evaluate.ts  
**Alexi Adaptation**: Add helpers to `src/permission/` without Effect

#### Proposed New File: `src/permission/helpers.ts`
```typescript
import type { PermissionManager, PermissionContext, PermissionResult } from './index.js';
import { getPermissionManager } from './index.js';

/**
 * Helper to evaluate file access permission
 */
export async function checkFileAccess(
  filePath: string,
  action: 'read' | 'write',
  options?: {
    manager?: PermissionManager;
    sessionId?: string;
    description?: string;
  }
): Promise<PermissionResult> {
  const manager = options?.manager ?? getPermissionManager();
  return manager.check({
    toolName: 'file-access',
    action,
    resource: filePath,
    description: options?.description ?? `${action} file: ${filePath}`,
  });
}

/**
 * Helper to evaluate command execution permission
 */
export async function checkCommandExecution(
  command: string,
  options?: {
    manager?: PermissionManager;
    sessionId?: string;
    description?: string;
  }
): Promise<PermissionResult> {
  const manager = options?.manager ?? getPermissionManager();
  return manager.check({
    toolName: 'bash',
    action: 'execute',
    resource: command,
    description: options?.description ?? `execute: ${command}`,
  });
}

/**
 * Helper to evaluate directory access permission
 */
export async function checkDirectoryAccess(
  dirPath: string,
  action: 'read' | 'write',
  options?: {
    manager?: PermissionManager;
    sessionId?: string;
    description?: string;
  }
): Promise<PermissionResult> {
  const manager = options?.manager ?? getPermissionManager();
  return manager.check({
    toolName: 'directory-access',
    action,
    resource: dirPath,
    description: options?.description ?? `${action} directory: ${dirPath}`,
  });
}

/**
 * Batch permission check for multiple resources
 */
export async function checkBatch(
  requests: Array<{
    toolName: string;
    action: 'read' | 'write' | 'execute';
    resource: string;
    description?: string;
  }>,
  options?: {
    manager?: PermissionManager;
    failFast?: boolean; // Stop on first denial
  }
): Promise<Array<PermissionResult & { request: typeof requests[0] }>> {
  const manager = options?.manager ?? getPermissionManager();
  const results: Array<PermissionResult & { request: typeof requests[0] }> = [];
  
  for (const request of requests) {
    const result = await manager.check(request);
    results.push({ ...result, request });
    
    if (options?.failFast && !result.granted) {
      break;
    }
  }
  
  return results;
}
```

**Benefits**:
- Simplified permission checking for common scenarios
- Batch permission evaluation for efficiency
- Type-safe helper functions

### 3. Tool Parameter Validation Enhancement (Medium Priority)

**Concept from**: Upstream tool validation improvements  
**Alexi Adaptation**: Enhance validation in `src/tool/index.ts`

#### Proposed Enhancement
```typescript
// Add to src/tool/index.ts

/**
 * Enhanced parameter validation with custom error formatting
 */
export interface ValidationErrorFormatter {
  (error: z.ZodError, toolName: string): string;
}

const defaultErrorFormatter: ValidationErrorFormatter = (error, toolName) => {
  const issues = error.issues.map(issue => {
    const path = issue.path.join('.');
    return `  - ${path}: ${issue.message}`;
  }).join('\n');
  
  return `The ${toolName} tool was called with invalid arguments:\n${issues}\n\nPlease rewrite the input so it satisfies the expected schema.`;
};

export interface ToolDefinition<TParams extends z.ZodType, TResult> {
  name: string;
  description: string;
  parameters: TParams;
  permission?: {
    action: PermissionAction;
    getResource: (params: z.infer<TParams>, context?: ToolContext) => string;
  };
  execute: (params: z.infer<TParams>, context: ToolContext) => Promise<ToolResult<TResult>>;
  // New optional field
  formatValidationError?: ValidationErrorFormatter;
}

// Update executeUnsafe to use custom formatter
async executeUnsafe(
  params: z.infer<TParams>,
  context: ToolContext
): Promise<ToolResult<TResult>> {
  // ... existing code ...
  
  let validatedParams: z.infer<TParams>;
  try {
    validatedParams = definition.parameters.parse(params);
  } catch (err) {
    if (err instanceof z.ZodError && definition.formatValidationError) {
      return {
        success: false,
        error: definition.formatValidationError(err, definition.name),
      };
    }
    return {
      success: false,
      error: defaultErrorFormatter(err as z.ZodError, definition.name),
    };
  }
  
  // ... rest of implementation ...
}
```

**Benefits**:
- Better error messages for validation failures
- Tool-specific error formatting
- Improved developer experience

### 4. Tool Execution Metrics (Low Priority)

**Concept from**: Better observability  
**Alexi Adaptation**: Enhanced metrics in tool execution

#### Proposed Enhancement
```typescript
// Add to src/tool/index.ts

export interface ToolExecutionMetrics {
  toolName: string;
  toolId: string;
  startTime: number;
  endTime: number;
  duration: number;
  success: boolean;
  parameterSize: number; // Size of parameters in bytes
  resultSize: number;    // Size of result in bytes
  truncated: boolean;
  permissionCheckDuration?: number;
}

// Store metrics for analysis
const executionMetrics: ToolExecutionMetrics[] = [];
const MAX_METRICS = 1000; // Keep last 1000 executions

export function getToolMetrics(toolName?: string): ToolExecutionMetrics[] {
  if (toolName) {
    return executionMetrics.filter(m => m.toolName === toolName);
  }
  return [...executionMetrics];
}

export function clearToolMetrics(): void {
  executionMetrics.length = 0;
}

// Update executeUnsafe to collect metrics
async executeUnsafe(
  params: z.infer<TParams>,
  context: ToolContext
): Promise<ToolResult<TResult>> {
  const toolId = nanoid();
  const startTime = Date.now();
  const parameterSize = Buffer.byteLength(JSON.stringify(params), 'utf-8');
  
  // ... existing execution code ...
  
  const endTime = Date.now();
  const resultSize = Buffer.byteLength(JSON.stringify(result), 'utf-8');
  
  const metrics: ToolExecutionMetrics = {
    toolName: definition.name,
    toolId,
    startTime,
    endTime,
    duration: endTime - startTime,
    success: result.success,
    parameterSize,
    resultSize,
    truncated: result.truncated ?? false,
  };
  
  executionMetrics.push(metrics);
  if (executionMetrics.length > MAX_METRICS) {
    executionMetrics.shift();
  }
  
  return result;
}
```

**Benefits**:
- Performance monitoring
- Tool usage analytics
- Debugging support

### 5. Enhanced Pattern Matching (Medium Priority)

**Concept from**: Upstream permission pattern improvements  
**Alexi Adaptation**: Enhance `src/permission/wildcard.ts`

#### Current Implementation Review
The current `wildcard.ts` already has good pattern matching. Consider adding:

```typescript
// Add to src/permission/wildcard.ts

/**
 * Match multiple patterns with priority
 */
export interface PatternWithPriority {
  pattern: string;
  priority: number;
}

export function matchPatternsWithPriority(
  patterns: PatternWithPriority[],
  value: string
): { matched: boolean; pattern?: PatternWithPriority; score: number } {
  const sorted = [...patterns].sort((a, b) => b.priority - a.priority);
  
  for (const item of sorted) {
    const result = matchPattern(item.pattern, value);
    if (result.matched) {
      return {
        matched: true,
        pattern: item,
        score: item.priority,
      };
    }
  }
  
  return { matched: false, score: 0 };
}

/**
 * Explain why a pattern matched or didn't match
 */
export function explainMatch(
  pattern: string,
  value: string
): { matched: boolean; reason: string } {
  const result = matchPattern(pattern, value);
  
  if (result.matched) {
    return {
      matched: true,
      reason: `Pattern "${pattern}" matched "${value}" (wildcards: ${result.wildcardCount})`,
    };
  }
  
  // Provide helpful feedback on why it didn't match
  const patternParts = pattern.split('*');
  const missing = patternParts.find(part => part && !value.includes(part));
  
  if (missing) {
    return {
      matched: false,
      reason: `Pattern "${pattern}" did not match "${value}": missing segment "${missing}"`,
    };
  }
  
  return {
    matched: false,
    reason: `Pattern "${pattern}" did not match "${value}": segment order mismatch`,
  };
}
```

**Benefits**:
- Priority-based pattern matching
- Better debugging with match explanations
- Enhanced permission rule evaluation

## Implementation Priority

### Phase 1 (Immediate - High Value, Low Risk)
1. ✅ Permission evaluation helpers (`src/permission/helpers.ts`)
2. ✅ Enhanced pattern matching explanations

### Phase 2 (Short Term - 1-2 weeks)
3. ✅ Tool output truncation enhancements
4. ✅ Tool parameter validation improvements

### Phase 3 (Medium Term - 1 month)
5. ✅ Tool execution metrics
6. ⏸️ Additional observability features

## Testing Requirements

Each enhancement must include:
- ✅ Unit tests with vitest
- ✅ Integration tests with existing tools
- ✅ Backward compatibility verification
- ✅ SAP AI Core integration validation

## Migration Path

All enhancements are designed to be:
- **Backward compatible**: Existing code continues to work
- **Opt-in**: New features require explicit usage
- **Non-breaking**: Default behavior unchanged

## Success Metrics

- ✅ All existing tests pass
- ✅ No breaking changes to public APIs
- ✅ SAP Orchestration integration remains functional
- ✅ Code coverage maintained or improved
- ✅ Performance not degraded

## Conclusion

These recommendations adapt valuable concepts from upstream while respecting Alexi's architecture:
- Promise-based async patterns
- SAP AI Core integration
- Event-driven permission system
- Simple, maintainable code

Each enhancement adds value without requiring a major refactor or introducing the Effect library.

---

**Status**: Awaiting Approval  
**Next Steps**: Review and prioritize enhancements  
**Estimated Effort**: 2-3 weeks for Phase 1-2
