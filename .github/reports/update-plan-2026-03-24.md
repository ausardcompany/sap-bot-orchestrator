# Update Plan for Alexi

Generated: 2026-03-24
Based on upstream commits: c3fcc989, 7bbfa691, 9cd7bb32, dac229fe, 43391276, 5d543368, 2847ec4a, e1b67fe5, and related permission/agent changes

## Summary
- Total changes planned: 5
- Critical: 1 | High: 2 | Medium: 2 | Low: 0

## Changes

### 1. Add Default Bash Permission Rule to Ask Mode
**File**: `src/agent/index.ts`
**Priority**: critical
**Type**: security
**Reason**: Upstream changed the default bash auto-approve rule from implicit allow to explicit "ask" mode. This is a security-hardening change that ensures users must approve bash commands before execution, preventing potentially dangerous shell operations from running automatically.

**Current code** (if modifying):
```typescript
const defaults = PermissionNext.fromConfig({
  "*": "allow",
  doom_loop: "ask",
  external_directory: {
    "*": "ask",
    // ... other rules
  },
  // ... other rules
})
```

**New code**:
```typescript
const defaults = PermissionNext.fromConfig({
  "*": "allow",
  bash: "ask",  // Security: require explicit approval for bash commands
  doom_loop: "ask",
  external_directory: {
    "*": "ask",
    // ... other rules
  },
  // ... other rules
})
```

### 2. Implement Permission Drain for Sibling Subagent Auto-Resolution
**File**: `src/permission/drain.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: When a user approves/denies a permission rule for one subagent, sibling subagents with pending permissions for the same pattern should auto-resolve. This prevents redundant permission prompts and improves UX when working with multiple parallel agents.

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
    // Skip the permission request that triggered this drain
    if (id === exclude) continue
    
    // Evaluate all patterns in this pending request against current rules
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
      // Publish rejection event
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
      // Publish approval event
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

### 3. Integrate Permission Drain into Permission Next Module
**File**: `src/permission/next.ts`
**Priority**: high
**Type**: feature
**Reason**: The permission next module needs to store the ruleset with pending requests and call drainCovered after saving always-rules. This enables the sibling subagent auto-resolution feature.

**Current code** (if modifying):
```typescript
// In the pending record type definition
string,
{
  info: Request
  resolve: () => void
  reject: (e: any) => void
}

// In the code that adds to pending
s.pending[id] = {
  info,
  resolve,
  reject,
}

// In saveAlwaysRules, after updating config
if (newRules.length > 0) {
  await Config.updateGlobal({ permission: toConfig(newRules) }, { dispose: false })
}
```

**New code**:
```typescript
import { drainCovered } from "@/permission/drain"

// In the pending record type definition - add ruleset
string,
{
  info: Request
  ruleset: Ruleset  // Store ruleset for later evaluation
  resolve: () => void
  reject: (e: any) => void
}

// In the code that adds to pending - include ruleset
s.pending[id] = {
  info,
  ruleset,  // Capture current ruleset
  resolve,
  reject,
}

// In saveAlwaysRules, after updating config - drain covered permissions
if (newRules.length > 0) {
  await Config.updateGlobal({ permission: toConfig(newRules) }, { dispose: false })
}

// Auto-resolve sibling subagent permissions that are now covered
await drainCovered(s.pending, s.approved, evaluate, Event, DeniedError, input.requestID)
```

### 4. Inherit Parent Worktree Directory for Subagent Permission Responses
**File**: `src/permission/next.ts`
**Priority**: medium
**Type**: bugfix
**Reason**: When subagents request permissions, they should inherit the parent worktree directory context. This ensures permission patterns are evaluated correctly relative to the actual working directory, not a potentially different subagent directory.

**Current code** (if modifying):
```typescript
// In the permission evaluation for pending requests
for (const [id, pending] of Object.entries(s.pending)) {
  if (pending.info.sessionID !== sessionID) continue
  const ok = pending.info.patterns.every(
    (pattern) => evaluate(pending.info.permission, pattern, s.approved).action === "allow",
  )
```

**New code**:
```typescript
// In the permission evaluation for pending requests - use stored ruleset
for (const [id, pending] of Object.entries(s.pending)) {
  if (pending.info.sessionID !== sessionID) continue
  const ok = pending.info.patterns.every(
    (pattern) => evaluate(pending.info.permission, pattern, pending.ruleset, s.approved).action === "allow",
  )
```

### 5. Add Permission Drain Unit Tests
**File**: `src/permission/__tests__/drain.test.ts` (new file)
**Priority**: medium
**Type**: feature
**Reason**: The new drainCovered functionality needs comprehensive tests to ensure sibling subagent permissions are correctly auto-resolved when rules are approved or denied.

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

  it("should auto-approve pending permissions covered by new allow rules", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:write",
          patterns: ["/project/src/*"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    const approved = [{ permission: "file:write", pattern: "/project/*", action: "allow" }]
    
    mockEvaluate.mockReturnValue({ action: "allow" })
    
    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError)
    
    expect(resolve).toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeUndefined()
  })

  it("should auto-deny pending permissions covered by new deny rules", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "bash",
          patterns: ["rm -rf /"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    const approved = [{ permission: "bash", pattern: "*", action: "deny" }]
    
    mockEvaluate.mockReturnValue({ action: "deny" })
    
    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError)
    
    expect(reject).toHaveBeenCalled()
    expect(resolve).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeUndefined()
  })

  it("should skip the excluded request ID", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:write",
          patterns: ["/project/*"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    const approved = [{ permission: "file:write", pattern: "/project/*", action: "allow" }]
    
    mockEvaluate.mockReturnValue({ action: "allow" })
    
    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError, "req-1")
    
    expect(resolve).not.toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeDefined()
  })

  it("should not resolve partially covered permissions", async () => {
    const resolve = vi.fn()
    const reject = vi.fn()
    
    const pending = {
      "req-1": {
        info: {
          id: "req-1",
          sessionID: "session-1",
          permission: "file:write",
          patterns: ["/project/src/*", "/project/config/*"],
        },
        ruleset: [],
        resolve,
        reject,
      },
    }
    
    const approved = [{ permission: "file:write", pattern: "/project/src/*", action: "allow" }]
    
    // First pattern allowed, second asks
    mockEvaluate
      .mockReturnValueOnce({ action: "allow" })
      .mockReturnValueOnce({ action: "ask" })
    
    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError)
    
    expect(resolve).not.toHaveBeenCalled()
    expect(reject).not.toHaveBeenCalled()
    expect(pending["req-1"]).toBeDefined()
  })
})
```

## Testing Recommendations
- Test bash command execution now requires explicit approval
- Test that approving a permission for one subagent auto-resolves identical pending permissions for sibling subagents
- Test that denying a permission for one subagent auto-rejects identical pending permissions for sibling subagents
- Test that partially covered permissions remain pending (not auto-resolved)
- Test permission evaluation with inherited parent worktree directories
- Run existing permission test suite to ensure no regressions

## Potential Risks
- **Breaking Change**: The bash "ask" default may break existing workflows that relied on automatic bash command approval. Users will need to explicitly approve bash commands or configure rules to allow them.
- **Race Condition**: The drainCovered function operates on shared pending state. Ensure proper synchronization if multiple permission responses can occur simultaneously.
- **SAP AI Core Compatibility**: Verify that SAP AI Core integration does not have special bash command requirements that would be affected by the new default.
{"prompt_tokens":19942,"completion_tokens":3306,"total_tokens":23248}

[Session: 07e7dd73-dc48-4b94-b241-f1dd7d68f6ac]
[Messages: 2, Tokens: 23248]
