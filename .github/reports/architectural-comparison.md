# Architectural Comparison: Alexi vs Opencode

**Date**: 2026-04-05  
**Purpose**: Document architectural differences to guide future update decisions

## High-Level Architecture

### Alexi
```
SAP AI Core Orchestration SDK
        ↓
Promise-based Tool System
        ↓
Standard Node.js APIs (fs/promises)
        ↓
Simple Permission System
```

### Opencode (Upstream)
```
Effect.js Framework
        ↓
Effect-based Tool System
        ↓
Service Layer Abstraction (AppFileSystem, LSP, etc.)
        ↓
Complex Permission with External Directory Handling
```

## Key Architectural Differences

### 1. Error Handling & Control Flow

#### Alexi
```typescript
// Promise-based with try-catch
async function execute(params, context): Promise<ToolResult> {
  try {
    const result = await fs.readFile(filePath, 'utf-8');
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
```

#### Opencode
```typescript
// Effect-based with generator functions
execute: Effect.fn("ReadTool.execute")(function* (params, ctx) {
  const fs = yield* AppFileSystem.Service
  const content = yield* fs.readFile(filepath)
  return { success: true, data: content }
})
```

**Impact**: Cannot mix patterns without major refactoring

### 2. Tool Definition

#### Alexi
```typescript
export const readTool = defineTool({
  name: 'read',
  description: '...',
  parameters: ReadParamsSchema,
  permission: { action: 'read', getResource: (p) => p.filePath },
  async execute(params, context) { /* Promise-based */ }
});
```

#### Opencode
```typescript
export const ReadTool = Tool.defineEffect("read", {
  description: DESCRIPTION,
  parameters: z.object({ /* ... */ }),
  execute: Effect.fn("ReadTool.execute")(function* (params, ctx) {
    /* Effect-based generator */
  })
});
```

**Impact**: Different tool registry systems, incompatible signatures

### 3. Dependency Injection

#### Alexi
```typescript
// Direct imports and usage
import * as fs from 'fs/promises';
import { getPermissionManager } from '../permission/index.js';

// Use directly
const stat = await fs.stat(filePath);
const pm = getPermissionManager();
```

#### Opencode
```typescript
// Service layer with Effect context
const fs = yield* AppFileSystem.Service
const lsp = yield* LSP.Service
const fileTime = yield* FileTime.Service

// Services must be provided via Layer composition
```

**Impact**: Opencode requires complex service layer setup; Alexi keeps it simple

### 4. Resource Management

#### Alexi
```typescript
// Standard async/await with automatic cleanup
async function readFile(path: string): Promise<string> {
  const content = await fs.readFile(path, 'utf-8');
  return content; // Node.js handles file descriptor cleanup
}
```

#### Opencode
```typescript
// Manual resource management with Effect.Scope
const content = yield* Effect.scoped(
  Effect.gen(function* () {
    const fileHandle = yield* Effect.acquireRelease(
      Effect.promise(() => open(filepath, "r")),
      (handle) => Effect.promise(() => handle.close())
    )
    // Use fileHandle
  })
)
```

**Impact**: Effect.js provides more control but adds complexity

## Dependency Analysis

### Alexi Dependencies (Relevant to Tool System)
```json
{
  "zod": "^4.3.6",           // Schema validation
  "nanoid": "^5.1.7",         // ID generation
  "@sap-ai-sdk/orchestration": "^2.9.0"  // SAP AI Core
}
```
**Total**: ~3 core dependencies for tool system

### Opencode Dependencies (Equivalent Functionality)
```json
{
  "effect": "^3.x.x",         // Effect framework
  "zod": "^3.x.x",           // Schema validation
  "nanoid": "^5.x.x",         // ID generation
  // Plus service layer dependencies
}
```
**Total**: ~5+ dependencies with Effect.js adding ~500KB

## Performance Comparison

### Alexi (Promise-based)
- ✅ Native JavaScript async/await
- ✅ V8-optimized Promise handling
- ✅ Minimal overhead
- ✅ Fast startup time

### Opencode (Effect-based)
- ⚠️ Additional abstraction layer
- ⚠️ Generator function overhead
- ⚠️ Service layer initialization cost
- ✅ Better composability for complex scenarios

## When Effect.js Makes Sense

Effect.js would be beneficial if Alexi needed:

1. **Complex resource management** - Multiple file handles, database connections, etc.
2. **Advanced concurrency** - Structured concurrency, fiber-based parallelism
3. **Dependency injection at scale** - Large service graph with many dependencies
4. **Algebraic effects** - Custom effect handlers for testing/mocking
5. **Type-safe error channels** - Multiple error types with compile-time guarantees

## Why Alexi Doesn't Need Effect.js

Current Alexi use cases:

1. **Simple file operations** - Read/write files with standard Node.js APIs
2. **SAP AI Core integration** - Single provider with straightforward API
3. **Tool execution** - Linear async workflows without complex concurrency
4. **Permission checks** - Simple allow/deny logic
5. **Error handling** - Standard try-catch is sufficient

## Migration Path (If Ever Needed)

If Alexi were to adopt Effect.js in the future:

### Phase 1: Add Effect.js (Non-Breaking)
```typescript
// Keep existing Promise-based tools
// Add Effect.js as optional dependency
// Create Effect wrappers for new tools only
```

### Phase 2: Hybrid Approach
```typescript
// Support both patterns in tool registry
// Gradually migrate tools one by one
// Maintain backward compatibility
```

### Phase 3: Full Migration (Breaking)
```typescript
// Convert all tools to Effect-based
// Update tool registry
// Major version bump (v2.0.0)
```

**Estimated Effort**: 40-80 hours for full migration  
**Risk**: High - could break SAP AI Core integration  
**Benefit**: Low - current architecture works well

## Recommendations

### For Alexi Maintainers

1. ✅ **Keep current architecture** - Promise-based is simpler and sufficient
2. ✅ **Monitor SAP SDK updates** - Follow SAP's patterns, not third-party frameworks
3. ✅ **Focus on SAP AI Core features** - Tool calling, streaming, embeddings, etc.
4. ❌ **Don't adopt Effect.js** - unless requirements fundamentally change

### For Upstream Compatibility

1. **Accept divergence** - Alexi and opencode serve different purposes
2. **Cherry-pick applicable changes** - Bug fixes, not architectural changes
3. **Maintain separate docs** - Don't assume upstream patterns apply
4. **Independent versioning** - Alexi evolves based on SAP AI Core needs

## Conclusion

**Alexi's Promise-based architecture is the right choice** for its use case:

- ✅ Simpler to understand and maintain
- ✅ Better aligned with SAP AI Core SDK patterns
- ✅ Sufficient for current and foreseeable requirements
- ✅ Easier onboarding for contributors
- ✅ Smaller dependency footprint

**Opencode's Effect-based architecture makes sense** for their use case:

- ✅ Complex IDE-like features (LSP, file watching, etc.)
- ✅ Advanced concurrency requirements
- ✅ Large service graph with many dependencies
- ✅ Need for structured resource management

**Both architectures are valid** - they just serve different needs.

---

**Author**: AI Agent  
**Date**: 2026-04-05  
**Status**: Reference Document
