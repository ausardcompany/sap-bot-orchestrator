[2026-03-21T06:46:57.184Z] [32mINFO[39m     (context): Found a service key in environment variable "AICORE_SERVICE_KEY". Using a service key is recommended for local testing only. Bind the AI Core service to the application for productive usage.
# Update Plan for Alexi

Generated: 2026-03-21
Based on upstream commits: 81edeee6, 6d4d7328, 05d606ad, 64442519, bcac6ac7, and related permission system changes

## Summary
- Total changes planned: 4
- Critical: 0 | High: 2 | Medium: 2 | Low: 0

## Changes

### 1. Add Permission Drain Module for Cross-Subagent Rule Resolution
**File**: `src/permission/drain.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: When a user approves/denies a permission rule for one subagent, sibling subagents with pending permissions matching the same pattern should automatically resolve or reject. This prevents duplicate permission prompts and improves UX in multi-agent scenarios.

**New code**:
```typescript
import { Bus } from "../bus"
import { Wildcard } from "../util/wildcard"
import type { PermissionNext } from "./next"

/**
 * Auto-resolve pending permissions now fully covered by approved or denied rules.
 * When the user approves/denies a rule on subagent A, sibling subagent B's
 * pending permission for the same pattern resolves or rejects automatically.
 */
export async function drainCovered(
  pending: Record<
    string,
    {
      info: PermissionNext.Request
      ruleset: PermissionNext.Ruleset
      resolve: () => void
      reject: (e: any) => void
    }
  >,
  approved: PermissionNext.Ruleset,
  evaluate: typeof PermissionNext.evaluate,
  events: typeof PermissionNext.Event,
  DeniedError: typeof PermissionNext.DeniedError,
  exclude?: string,
): Promise<void> {
  for (const [id, entry] of Object.entries(pending)) {
    if (id === exclude) continue
    
    const actions = entry.info.patterns.map((pattern) =>
      evaluate(entry.info.permission, pattern, entry.ruleset, approved),
    )
    
    const denied = actions.some((r) => r.action === "deny")
    const allowed = !denied && actions.every((r) => r.action === "allow")
    
    if (!denied && !allowed) continue
    
    delete pending[id]
    
    if (denied) {
      Bus.publish(events.Replied, {
        sessionID: entry.info.sessionID,
        requestID: entry.info.id,
        reply: "reject",
      })
      entry.reject(
        new DeniedError(
          approved.filter((r) => Wildcard.match(entry.info.permission, r.permission))
        )
      )
    } else {
      Bus.publish(events.Replied, {
        sessionID: entry.info.sessionID,
        requestID: entry.info.id,
        reply: "approve",
      })
      entry.resolve()
    }
  }
}
```

### 2. Update Permission Next Module to Store Ruleset and Integrate Drain
**File**: `src/permission/next.ts`
**Priority**: high
**Type**: feature
**Reason**: The pending permissions map needs to store the ruleset at request time so that drainCovered can properly evaluate whether new rules cover existing pending requests. This enables the cross-subagent permission resolution feature.

**Current code** (in pending type definition):
```typescript
const pending: Record<
  string,
  {
    info: Request
    resolve: () => void
    reject: (e: any) => void
  }
> = {}
```

**New code** (updated pending type and integration):
```typescript
import { drainCovered } from "./drain"

// Update the pending record type to include ruleset
const pending: Record<
  string,
  {
    info: Request
    ruleset: Ruleset
    resolve: () => void
    reject: (e: any) => void
  }
> = {}

// In the request handling logic where pending entries are created:
s.pending[id] = {
  info,
  ruleset, // Store the ruleset at request time
  resolve,
  reject,
}

// In saveAlwaysRules function, after saving new rules to config:
export const saveAlwaysRules = fn(
  z.object({
    requestID: Identifier.schema("permission"),
    rules: z.array(RuleSchema),
  }),
  async (input) => {
    // ... existing rule saving logic ...
    
    if (newRules.length > 0) {
      await Config.updateGlobal({ permission: toConfig(newRules) }, { dispose: false })
    }

    // Auto-resolve sibling pending permissions covered by new rules
    await drainCovered(s.pending, s.approved, evaluate, Event, DeniedError, input.requestID)
  },
)
```

### 3. Add Wildcard Utility for Permission Pattern Matching
**File**: `src/util/wildcard.ts` (verify exists or create)
**Priority**: medium
**Type**: feature
**Reason**: The drainCovered function relies on Wildcard.match for permission pattern matching. Ensure this utility exists and properly handles glob-style patterns for permission strings.

**New code** (if not already present):
```typescript
export namespace Wildcard {
  /**
   * Match a value against a glob-style pattern
   * Supports * for any characters and ? for single character
   */
  export function match(value: string, pattern: string): boolean {
    const regexPattern = pattern
      .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape regex special chars
      .replace(/\*/g, '.*')                   // * matches any characters
      .replace(/\?/g, '.')                    // ? matches single character
    
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(value)
  }

  /**
   * Check if a pattern covers another pattern (is more general)
   */
  export function covers(general: string, specific: string): boolean {
    // A pattern covers another if anything matching specific also matches general
    if (general === specific) return true
    if (general === '*') return true
    
    // Simple heuristic: count wildcards, more wildcards = more general
    const generalWildcards = (general.match(/\*/g) || []).length
    const specificWildcards = (specific.match(/\*/g) || []).length
    
    return generalWildcards > specificWildcards && match(specific.replace(/\*/g, 'x'), general)
  }
}
```

### 4. Add Tests for Permission Drain Functionality
**File**: `src/permission/__tests__/drain.test.ts` (new file)
**Priority**: medium
**Type**: feature
**Reason**: The upstream changes include comprehensive tests for the always-rules and drain functionality. These tests ensure cross-subagent permission resolution works correctly.

**New code**:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest"
import { drainCovered } from "../drain"

describe("drainCovered", () => {
  const mockEvents = {
    Replied: "permission.replied",
  }

  class MockDeniedError extends Error {
    constructor(public rules: any[]) {
      super("Permission denied")
    }
  }

  const mockEvaluate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should resolve pending permissions covered by approved rules", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: any = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:read",
          patterns: ["/src/**"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }

    const approved = [{ permission: "file:read", pattern: "/src/**", action: "allow" }]

    mockEvaluate.mockReturnValue({ action: "allow" })

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError)

    expect(resolve).toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeUndefined()
  })

  it("should reject pending permissions covered by deny rules", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: any = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:write",
          patterns: ["/etc/**"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }

    const approved = [{ permission: "file:write", pattern: "/etc/**", action: "deny" }]

    mockEvaluate.mockReturnValue({ action: "deny" })

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError)

    expect(reject).toHaveBeenCalled()
    expect(resolve).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeUndefined()
  })

  it("should exclude specified request ID from draining", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: any = {
      "req-exclude": {
        info: {
          id: "req-exclude",
          sessionID: "session-1",
          permission: "file:read",
          patterns: ["/src/**"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }

    const approved = [{ permission: "file:read", pattern: "/src/**", action: "allow" }]

    mockEvaluate.mockReturnValue({ action: "allow" })

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError, "req-exclude")

    expect(resolve).not.toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-exclude"]).toBeDefined()
  })

  it("should not drain permissions with partial coverage", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: any = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:read",
          patterns: ["/src/**", "/lib/**"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }

    const approved = [{ permission: "file:read", pattern: "/src/**", action: "allow" }]

    // First pattern allowed, second needs prompt
    mockEvaluate
      .mockReturnValueOnce({ action: "allow" })
      .mockReturnValueOnce({ action: "prompt" })

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError)

    expect(resolve).not.toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeDefined()
  })
})
```

## Testing Recommendations
- Test multi-agent scenarios where multiple subagents request similar permissions simultaneously
- Verify that approving a permission for one subagent correctly resolves pending permissions for sibling subagents
- Test deny rules propagation across subagents
- Ensure excluded request IDs are not affected by drainCovered
- Test edge cases with partial pattern coverage (some patterns approved, others pending)
- Verify Bus events are published correctly for both approve and reject scenarios
- Test integration with SAP AI Core provider to ensure permission system works with SAP-specific authentication

## Potential Risks
- **Event Bus Integration**: Ensure the Bus.publish calls in drain.ts are compatible with Alexi's event bus implementation
- **Wildcard Matching**: Verify the Wildcard utility handles all permission pattern formats used in Alexi
- **Concurrent Access**: The pending record is mutated during iteration; ensure no race conditions in async scenarios
- **SAP AI Core Compatibility**: The permission changes should be tested with SAP AI Core's authentication flow to ensure no conflicts with SAP-specific permission requirements
{"prompt_tokens":12296,"completion_tokens":3112,"total_tokens":15408}

[Session: b7295dcf-c1ea-4c7a-b406-a586d043d036]
[Messages: 2, Tokens: 15408]
