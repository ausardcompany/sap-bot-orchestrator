# Permission Drain System - Quick Reference

## Overview

The permission drain system automatically resolves pending permission requests when new rules are added, preventing redundant permission prompts across sessions.

## Basic Usage

### Adding Rules with Auto-Drain

```typescript
import { getPermissionManager } from './permission/index.js';

const manager = getPermissionManager();

// Add a single rule (triggers drain automatically)
await manager.addRule({
  id: 'allow-src-read',
  actions: ['read'],
  paths: ['/src/**'],
  decision: 'allow',
  priority: 10,
});

// Add multiple rules at once (single drain operation)
await manager.addRules([
  { actions: ['read'], paths: ['/src/**'], decision: 'allow', priority: 10 },
  { actions: ['write'], paths: ['/test/**'], decision: 'allow', priority: 20 },
]);
```

### Backward Compatible (No Drain)

```typescript
// For synchronous contexts where drain isn't needed
manager.addRuleSync({
  actions: ['read'],
  decision: 'allow',
  priority: 5,
});
```

## Advanced Usage

### Manual Drain Control

```typescript
import { drainCovered, registerPending } from './permission/index.js';

// Register a pending permission
registerPending({
  id: 'req-123',
  context: {
    toolName: 'read',
    action: 'read',
    resource: '/path/to/file.ts',
  },
  rules: currentRules,
  resolve: (granted) => console.log('Resolved:', granted),
  reject: (error) => console.error('Rejected:', error),
  timestamp: Date.now(),
});

// Manually trigger drain with new rules
await drainCovered(newRules, 'req-123'); // Exclude req-123 from drain
```

### Cleanup Expired Permissions

```typescript
import { cleanupExpired, clearPendingPermissions } from './permission/index.js';

// Cleanup permissions older than 60 seconds
cleanupExpired(60000);

// Clear all pending permissions
clearPendingPermissions();
```

## How It Works

### 1. Permission Request Flow

```
User Action → Permission Check → Ask User → Register Pending
                                              ↓
                                        Wait for Response
```

### 2. Drain Trigger Flow

```
Add Rule → Evaluate Pending → Match Found? → Resolve/Reject → Publish Event
                                ↓ No
                           Keep Pending
```

### 3. Evaluation Logic

Rules are evaluated with **last-match-wins** priority:

```typescript
// Higher priority rules override lower priority
const rules = [
  { paths: ['/src/**'], decision: 'deny', priority: 10 },
  { paths: ['/src/public/**'], decision: 'allow', priority: 20 }, // Wins
];
```

## Pattern Matching

### Path Patterns

```typescript
'/path/to/file.ts'     // Exact match
'/path/**'             // Recursive wildcard
'/path/*.ts'           // Single-level wildcard
'/path/file.?s'        // Single character wildcard
```

### Tool Patterns

```typescript
'read'                 // Exact tool name
'read*'                // Prefix match
'*read'                // Suffix match
'*read*'               // Contains match
```

### Command Patterns

```typescript
'git'                  // Exact command
'git*'                 // Git commands (git, git-pull, etc.)
'npm run *'            // npm run with any argument
```

## Events Published

### PermissionResponse Event

```typescript
PermissionResponse.subscribe((event) => {
  console.log('Permission resolved:', event.id, event.granted);
});

// Event payload:
{
  id: string;           // Request ID
  granted: boolean;     // true = allow, false = deny
  remember: boolean;    // Whether to remember for session
  timestamp: number;    // Resolution timestamp
}
```

## Testing

### Unit Test Example

```typescript
import { drainCovered, registerPending, clearPendingPermissions } from './permission/index.js';

describe('Drain System', () => {
  beforeEach(() => {
    clearPendingPermissions();
  });

  it('resolves pending when rule allows', async () => {
    const resolve = vi.fn();
    
    registerPending({
      id: 'test-1',
      context: { toolName: 'read', action: 'read', resource: '/src/file.ts' },
      rules: [],
      resolve,
      reject: vi.fn(),
      timestamp: Date.now(),
    });

    await drainCovered([
      { actions: ['read'], paths: ['/src/**'], decision: 'allow', priority: 10 }
    ]);

    expect(resolve).toHaveBeenCalledWith(true);
  });
});
```

## Best Practices

### ✅ DO

- Use `addRule()` or `addRules()` for rule changes that should trigger drain
- Provide `excludeRequestId` when adding rules in response to a permission request
- Clean up expired permissions periodically
- Use appropriate rule priorities to avoid conflicts
- Test drain behavior with multiple pending permissions

### ❌ DON'T

- Don't use `addRuleSync()` when you need drain behavior
- Don't forget to handle both resolve and reject callbacks
- Don't create overlapping rules without considering priority
- Don't keep pending permissions indefinitely (use timeouts)
- Don't modify the pending permissions Map directly

## Troubleshooting

### Pending Permissions Not Resolving

**Cause**: Rule doesn't match the pending context  
**Solution**: Check that actions, paths, and patterns match exactly

```typescript
// ❌ Won't match
pending: { action: 'write', resource: '/src/file.ts' }
rule: { actions: ['read'], paths: ['/src/**'] }

// ✅ Will match
pending: { action: 'write', resource: '/src/file.ts' }
rule: { actions: ['write'], paths: ['/src/**'] }
```

### Memory Leaks

**Cause**: Pending permissions not cleaned up  
**Solution**: Call `cleanupExpired()` periodically

```typescript
// Setup periodic cleanup (every 60 seconds)
setInterval(() => {
  cleanupExpired(60000);
}, 60000);
```

### Race Conditions

**Cause**: Multiple drain operations simultaneously  
**Solution**: Use `addRules()` for batch operations

```typescript
// ❌ Multiple drains
await manager.addRule(rule1);
await manager.addRule(rule2);
await manager.addRule(rule3);

// ✅ Single drain
await manager.addRules([rule1, rule2, rule3]);
```

## Future Enhancements

### Planned Features

1. **Multi-Subagent Support**: Per-subagent permission managers with shared drain
2. **Rule Synchronization**: Sync rules across subagent instances
3. **Drain Mutex**: Lock mechanism to prevent race conditions
4. **Pending UI**: Visualization of pending permissions
5. **Rule Conflict Detection**: Warn about overlapping rules

### Migration Path

Current implementation provides foundation for future subagent support:

```typescript
// Phase 1 (Current): Single manager
const manager = getPermissionManager();

// Phase 2 (Future): Per-subagent managers
const manager = getPermissionManager(subagentId);

// Phase 3 (Future): Shared drain across subagents
await drainCoveredGlobal(newRules);
```

## API Reference

### Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `drainCovered(rules, excludeId?)` | `Promise<void>` | Auto-resolve pending permissions |
| `registerPending(pending)` | `void` | Register pending permission |
| `removePending(id)` | `boolean` | Remove pending permission |
| `getPendingPermissions()` | `PendingPermission[]` | Get all pending |
| `clearPendingPermissions()` | `void` | Clear all pending |
| `cleanupExpired(timeoutMs?)` | `void` | Remove expired pending |

### Types

```typescript
interface PendingPermission {
  id: string;
  context: PermissionContext;
  rules: PermissionRule[];
  resolve: (granted: boolean) => void;
  reject: (error: Error) => void;
  timestamp: number;
}

interface PermissionContext {
  toolName: string;
  action: PermissionAction;
  resource: string;
  description?: string;
}

interface PermissionRule {
  id?: string;
  actions?: PermissionAction[];
  paths?: string[];
  commands?: string[];
  hosts?: string[];
  decision: 'allow' | 'deny' | 'ask';
  priority?: number;
}
```

## Support

- **Documentation**: See inline JSDoc comments in `src/permission/drain.ts`
- **Tests**: Reference `src/permission/__tests__/drain.test.ts`
- **Issues**: Check `.github/reports/changes-summary.md` for known limitations
