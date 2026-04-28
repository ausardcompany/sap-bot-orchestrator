# Alexi vs Upstream Architecture Analysis

**Date**: 2026-04-12  
**Purpose**: Document architectural differences to prevent future incompatible update plans

## Core Architectural Differences

### 1. Functional Programming Paradigm

| Aspect | Upstream (kilocode/opencode) | Alexi |
|--------|------------------------------|-------|
| **Primary Pattern** | Effect-based functional | Promise-based imperative |
| **Error Handling** | Effect.gen with yield* | try/catch with async/await |
| **Dependency Injection** | Effect Context & Layer | Direct imports & singletons |
| **Type System** | Effect types + Zod | Zod + TypeScript native |

### 2. Tool System Architecture

#### Upstream (Effect-based)
```typescript
// Tool definition with Effect
export const BashTool = Tool.define(
  "bash",
  Effect.gen(function* () {
    const shell = yield* Shell.Service
    return () => Effect.gen(function* () {
      // Tool implementation
    })
  })
)
```

#### Alexi (Promise-based)
```typescript
// Tool definition with defineTool
export const bashTool = defineTool({
  name: 'bash',
  description: '...',
  parameters: BashParamsSchema,
  permission: {
    action: 'execute',
    getResource: (params) => params.command
  },
  execute: async (params, context) => {
    // Tool implementation
    return { success: true, data: result }
  }
})
```

### 3. Provider Integration

#### Upstream
- Direct LLM provider integration (Anthropic, OpenAI)
- Custom streaming implementation
- No orchestration layer

#### Alexi
- SAP AI Core integration via @sap-ai-sdk/orchestration
- SAP Orchestration service handles routing
- Built-in content filtering and grounding

### 4. Permission System

#### Upstream (Effect-based)
```typescript
export namespace Permission {
  export interface Interface {
    readonly evaluate: (request: EvaluateRequest) => Effect.Effect<EvaluateResult>
  }
  export class Service extends Context.Tag("Permission")<Service, Interface>() {}
}
```

#### Alexi (Event-based)
```typescript
export class PermissionManager {
  async check(ctx: PermissionContext): Promise<PermissionResult> {
    // Event-driven permission flow
    PermissionRequested.publish({ ... })
    const response = await waitForEvent(PermissionResponse, ...)
    return { decision, granted }
  }
}
```

## Key Dependencies

### Upstream Dependencies
```json
{
  "effect": "^3.x",
  "@effect/platform": "^0.x",
  "@effect/schema": "^0.x"
}
```

### Alexi Dependencies
```json
{
  "@sap-ai-sdk/ai-api": "^2.9.0",
  "@sap-ai-sdk/orchestration": "^2.9.0",
  "zod": "^4.3.6",
  "nanoid": "^5.1.7"
}
```

## File Structure Comparison

### Upstream Structure
```
src/
├── tool/
│   ├── tool.ts          # Tool.define with Effect
│   ├── truncate.ts      # Truncate service
│   ├── bash.ts          # Bash tool
│   ├── skill.ts         # Skill tool
│   └── multiedit.ts     # Multi-edit tool
├── permission/
│   └── index.ts         # Effect-based permission
```

### Alexi Structure
```
src/
├── tool/
│   ├── index.ts         # defineTool + registry
│   ├── schema.ts        # Tool schemas
│   └── tools/           # Individual tool implementations
│       ├── bash.ts
│       ├── skill.ts
│       ├── multiedit.ts
│       └── ...
├── permission/
│   ├── index.ts         # PermissionManager class
│   ├── wildcard.ts      # Pattern matching
│   ├── config-paths.ts  # Config protection
│   └── prompt.ts        # Interactive prompts
```

## Pattern Comparison

### 1. Async Operations

#### Upstream (Effect)
```typescript
const result = yield* Effect.tryPromise({
  try: () => fs.readFile(path),
  catch: (error) => new Error(String(error))
})
```

#### Alexi (Promise)
```typescript
try {
  const result = await fs.readFile(path)
} catch (error) {
  return { 
    success: false, 
    error: error instanceof Error ? error.message : String(error) 
  }
}
```

### 2. Service Access

#### Upstream (Effect Context)
```typescript
const skill = yield* Skill.Service
const list = yield* skill.available()
```

#### Alexi (Direct Import)
```typescript
import { getSkillManager } from '../skill/index.js'
const skillManager = getSkillManager()
const list = await skillManager.available()
```

### 3. Configuration

#### Upstream (Effect Layer)
```typescript
const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    return { /* implementation */ }
  })
)
```

#### Alexi (Singleton Pattern)
```typescript
let globalInstance: Manager | null = null

export function getManager(): Manager {
  if (!globalInstance) {
    globalInstance = new Manager()
  }
  return globalInstance
}
```

## Why These Differences Matter

### 1. Type Safety
- **Effect**: Compile-time guarantees for effects, dependencies, and errors
- **Alexi**: Runtime validation with Zod, simpler mental model

### 2. Testability
- **Effect**: Built-in mocking via Layer substitution
- **Alexi**: Traditional mocking with vitest/jest

### 3. Learning Curve
- **Effect**: Steep - requires understanding functional programming concepts
- **Alexi**: Gentle - familiar async/await patterns

### 4. Integration
- **Effect**: Works well with Effect ecosystem
- **Alexi**: Works well with SAP AI SDK and standard Node.js libraries

## Compatibility Strategy

### What CAN Be Ported
1. **Concepts**: Permission evaluation logic, pattern matching algorithms
2. **Algorithms**: Truncation logic, doom loop detection
3. **Schemas**: Zod schemas for validation
4. **Documentation**: Best practices, error messages

### What CANNOT Be Ported Directly
1. **Effect-based code**: Tool.define, Effect.gen, yield* patterns
2. **Context/Layer**: Dependency injection via Effect Context
3. **Service definitions**: Effect Service tags
4. **Stream processing**: Effect Stream APIs

### Adaptation Pattern

When adapting upstream changes:

```typescript
// Upstream (Effect)
export const MyTool = Tool.define(
  "my-tool",
  Effect.gen(function* () {
    const dep = yield* Dependency.Service
    return () => Effect.gen(function* () {
      const result = yield* dep.action()
      return { /* tool def */ }
    })
  })
)

// Alexi Adaptation (Promise)
import { getDependency } from '../dependency/index.js'

export const myTool = defineTool({
  name: 'my-tool',
  description: '...',
  parameters: MyToolParamsSchema,
  execute: async (params, context) => {
    const dep = getDependency()
    try {
      const result = await dep.action()
      // Implementation
      return { success: true, data: result }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      }
    }
  }
})
```

## Recommendations for Future Updates

### 1. Source Selection
- ✅ Monitor upstream for **concept** improvements
- ✅ Look for SAP AI SDK updates
- ❌ Don't auto-apply Effect-based code changes

### 2. Update Process
1. Identify upstream concept/feature
2. Analyze if applicable to Alexi
3. Design Alexi-specific implementation
4. Maintain Promise-based patterns
5. Ensure SAP AI Core compatibility

### 3. Testing Requirements
- All changes must pass existing tests
- SAP Orchestration integration must remain functional
- Permission system must work with event bus
- Tool execution must remain Promise-based

### 4. Documentation
- Document why changes were adapted differently
- Maintain architectural decision records
- Update this analysis when patterns change

## Conclusion

Alexi and the upstream kilocode/opencode repositories have fundamentally different architectures:

- **Upstream**: Effect-based functional programming for maximum type safety and composability
- **Alexi**: Promise-based imperative programming for SAP AI Core integration and simplicity

Future updates must respect these differences and adapt concepts rather than copying code directly.

---

**Maintained by**: Alexi Development Team  
**Last Updated**: 2026-04-12  
**Status**: Living Document
