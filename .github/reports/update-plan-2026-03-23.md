[2026-03-23T07:13:31.965Z] [32mINFO[39m     (context): Found a service key in environment variable "AICORE_SERVICE_KEY". Using a service key is recommended for local testing only. Bind the AI Core service to the application for productive usage.
# Update Plan for Alexi

Generated: 2026-03-23
Based on upstream commits: 97eda63b, a2ae35e1, 79a87aee, 6d4d7328, 05d606ad, 64442519, and related permission system changes

## Summary
- Total changes planned: 4
- Critical: 1 | High: 2 | Medium: 1 | Low: 0

## Changes

### 1. Add Permission Drain Module for Cross-Subagent Rule Resolution
**File**: `src/permission/drain.ts` (new file)
**Priority**: critical
**Type**: feature
**Reason**: When a user approves/denies a permission rule on one subagent, sibling subagents with pending permissions for the same pattern should auto-resolve. This prevents redundant permission prompts and improves UX consistency across parallel subagent operations.

**New code**:
```typescript
import { Bus } from "@/bus"
import { Wildcard } from "@/util/wildcard"
import type { PermissionNext } from "@/permission/next"

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
    // Skip the request that triggered this drain
    if (id === exclude) continue
    
    // Evaluate all patterns against current ruleset
    const actions = entry.info.patterns.map((pattern) =>
      evaluate(entry.info.permission, pattern, entry.ruleset, approved),
    )
    
    const denied = actions.some((r) => r.action === "deny")
    const allowed = !denied && actions.every((r) => r.action === "allow")
    
    // Only process if fully resolved (all allowed or any denied)
    if (!denied && !allowed) continue
    
    // Remove from pending
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
        reply: "allow",
      })
      entry.resolve()
    }
  }
}
```

### 2. Update Permission State to Track Ruleset Per Pending Request
**File**: `src/permission/next.ts`
**Priority**: high
**Type**: bugfix
**Reason**: Each pending permission request needs to store the ruleset that was active at request time. This enables accurate evaluation when rules change (e.g., when another subagent's permission is approved/denied).

**Current code**:
```typescript
// In the pending record type definition
string,
{
  info: Request
  resolve: () => void
  reject: (e: any) => void
}
```

**New code**:
```typescript
// In the pending record type definition
string,
{
  info: Request
  ruleset: Ruleset  // Store ruleset snapshot at request time
  resolve: () => void
  reject: (e: any) => void
}
```

**Additional change in the same file - where pending is populated**:

**Current code**:
```typescript
s.pending[id] = {
  info,
  resolve,
  reject,
}
```

**New code**:
```typescript
s.pending[id] = {
  info,
  ruleset,  // Capture current ruleset
  resolve,
  reject,
}
```

### 3. Integrate Drain Logic into saveAlwaysRules Function
**File**: `src/permission/next.ts`
**Priority**: high
**Type**: feature
**Reason**: After saving new "always" rules (approved or denied), we must drain any pending permissions that are now covered by these rules. This ensures consistent behavior across all subagents.

**Current code** (in `saveAlwaysRules` function, after updating config):
```typescript
if (newRules.length > 0) {
  await Config.updateGlobal({ permission: toConfig(newRules) }, { dispose: false })
}
```

**New code**:
```typescript
import { drainCovered } from "@/permission/drain"

// ... in saveAlwaysRules function

if (newRules.length > 0) {
  await Config.updateGlobal({ permission: toConfig(newRules) }, { dispose: false })
}

// Auto-resolve sibling pending permissions now covered by new rules
await drainCovered(
  s.pending, 
  s.approved, 
  evaluate, 
  Event, 
  DeniedError, 
  input.requestID  // Exclude the request that triggered this save
)
```

### 4. Add Unit Tests for Permission Drain Functionality
**File**: `src/permission/__tests__/drain.test.ts` (new file)
**Priority**: medium
**Type**: feature
**Reason**: The drain functionality handles critical permission resolution logic that affects security. Comprehensive tests ensure cross-subagent permission resolution works correctly.

**New code**:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest"
import { drainCovered } from "../drain"
import type { PermissionNext } from "../next"

describe("drainCovered", () => {
  const mockEvents = {
    Replied: "permission.replied",
  }
  
  const mockEvaluate = vi.fn()
  const mockDeniedError = class extends Error {
    constructor(public rules: any[]) {
      super("Permission denied")
    }
  }
  
  let mockBusPublish: ReturnType<typeof vi.fn>
  
  beforeEach(() => {
    vi.clearAllMocks()
    mockBusPublish = vi.fn()
    vi.mock("@/bus", () => ({
      Bus: { publish: mockBusPublish }
    }))
  })

  it("should resolve pending permissions when all patterns are allowed", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: Record<string, any> = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:read",
          patterns: ["/path/to/file.ts"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    mockEvaluate.mockReturnValue({ action: "allow" })
    
    await drainCovered(
      pending,
      [{ permission: "file:read", pattern: "/path/**", action: "allow" }],
      mockEvaluate,
      mockEvents as any,
      mockDeniedError as any,
    )
    
    expect(resolve).toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeUndefined()
  })

  it("should reject pending permissions when any pattern is denied", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: Record<string, any> = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:write",
          patterns: ["/sensitive/file.ts"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    mockEvaluate.mockReturnValue({ action: "deny" })
    
    await drainCovered(
      pending,
      [{ permission: "file:write", pattern: "/sensitive/**", action: "deny" }],
      mockEvaluate,
      mockEvents as any,
      mockDeniedError as any,
    )
    
    expect(resolve).not.toHaveBeenCalled()
    expect(reject).toHaveBeenCalled()
    expect(pending["req-1"]).toBeUndefined()
  })

  it("should skip the excluded request ID", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: Record<string, any> = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:read",
          patterns: ["/path/to/file.ts"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    mockEvaluate.mockReturnValue({ action: "allow" })
    
    await drainCovered(
      pending,
      [],
      mockEvaluate,
      mockEvents as any,
      mockDeniedError as any,
      "req-1",  // Exclude this request
    )
    
    expect(resolve).not.toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeDefined()
  })

  it("should not modify pending when evaluation is inconclusive", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending: Record<string, any> = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:read",
          patterns: ["/path/to/file.ts"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    mockEvaluate.mockReturnValue({ action: "ask" })  // Neither allow nor deny
    
    await drainCovered(
      pending,
      [],
      mockEvaluate,
      mockEvents as any,
      mockDeniedError as any,
    )
    
    expect(resolve).not.toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeDefined()
  })
})
```

## Testing Recommendations

1. **Unit Tests**:
   - Run new drain.test.ts to verify cross-subagent permission resolution
   - Verify existing permission tests still pass after adding ruleset to pending state

2. **Integration Tests**:
   - Create two parallel subagent sessions requesting the same permission pattern
   - Approve permission on first subagent, verify second subagent auto-resolves
   - Deny permission on first subagent, verify second subagent auto-rejects

3. **Manual Testing**:
   - Start multiple subagents in Alexi
   - Trigger file read permissions from both
   - Approve "always allow" on one, verify the other doesn't prompt
   - Test with SAP AI Core backend to ensure no regressions

4. **Edge Cases**:
   - Test with wildcard patterns (e.g., `/src/**/*.ts`)
   - Test mixed allow/deny rules
   - Test rapid sequential permission requests

## Potential Risks

1. **Race Condition Risk**: If two permission requests are processed simultaneously, the drain function might operate on stale pending state. Mitigation: The upstream implementation uses synchronous iteration over `Object.entries()` which creates a snapshot, reducing but not eliminating this risk.

2. **Memory Leak Risk**: If `drainCovered` throws an exception, pending entries might not be properly cleaned up. Mitigation: Wrap the drain call in try-catch and log errors without blocking the main flow.

3. **SAP AI Core Compatibility**: The permission system changes are internal to Alexi and don't affect the provider interface. No impact expected on SAP AI Core integration.

4. **Backward Compatibility**: The new `ruleset` field in pending state is additive. Existing code that doesn't use it will continue to work, but won't benefit from cross-subagent resolution until updated.
{"prompt_tokens":12434,"completion_tokens":3171,"total_tokens":15605}

[Session: 54c86f38-e17f-49ca-8e14-4d45d894f634]
[Messages: 2, Tokens: 15605]
