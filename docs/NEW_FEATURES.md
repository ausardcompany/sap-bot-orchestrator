# New Features - Tool Output Truncation & Permission Management

## Configurable Tool Output Truncation

### Overview
Tool output truncation is now configurable, allowing you to control how much output is returned from tools before truncation occurs. This helps manage context window usage while ensuring important data isn't lost.

### Configuration

Add a `truncation` section to your `~/.alexi/config.json`:

```json
{
  "truncation": {
    "maxLines": 3000,
    "maxBytes": 100000,
    "toolSpecific": {
      "grep": {
        "maxLines": 5000,
        "maxBytes": 150000
      },
      "read": {
        "maxBytes": 50000
      }
    }
  }
}
```

### Configuration Options

- **`maxLines`** (number, optional): Maximum number of lines before truncation. Default: 2000
- **`maxBytes`** (number, optional): Maximum bytes before truncation. Default: 51200 (50KB)
- **`toolSpecific`** (object, optional): Per-tool override settings
  - Keys are tool names (e.g., "grep", "read", "write")
  - Values are objects with optional `maxLines` and `maxBytes`

### Tool-Specific Overrides

Tool-specific settings override global settings. For example:

```json
{
  "truncation": {
    "maxLines": 1000,
    "toolSpecific": {
      "grep": {
        "maxLines": 5000
      }
    }
  }
}
```

In this configuration:
- Most tools truncate at 1000 lines
- The `grep` tool can return up to 5000 lines
- All tools still respect the default 50KB byte limit

### Programmatic API

```typescript
import { getTruncationLimits, truncateOutput } from './tool/index.js';
import { getConfigTruncation } from './config/userConfig.js';

// Get current truncation config
const config = getConfigTruncation();

// Get limits for a specific tool
const limits = getTruncationLimits('grep', config);
console.log(limits); // { maxLines: 5000, maxBytes: 51200 }

// Truncate output with tool-specific settings
const result = truncateOutput(largeOutput, 'grep', config);
console.log(result.truncated); // true/false
console.log(result.content); // truncated content
```

### Use Cases

1. **Large Log Files**: Increase limits for `read` tool when analyzing logs
2. **Search Results**: Allow `grep` to return more matches
3. **Code Review**: Reduce limits for `write` tool to keep context focused
4. **Memory Constraints**: Lower global limits on resource-constrained systems

---

## Enhanced Permission Management

### Overview
Permission timeout and cleanup has been improved to prevent stale permission prompts from hanging the system. The system now properly tracks and cleans up pending permissions.

### Key Improvements

1. **Longer Default Timeout**: Increased from 1 minute to 5 minutes
2. **Pending Permission Tracking**: System tracks all pending permission requests
3. **Automatic Cleanup**: Permissions are cleared on timeout or session end
4. **Manual Clearing**: UI can manually clear pending permissions

### New Events

#### `PermissionCleared`
Published when a permission request is cleared (timeout, manual, or session end):

```typescript
{
  id: string;           // Permission request ID
  reason: 'timeout' | 'manual' | 'session-end';
  timestamp: number;
}
```

### API Changes

#### New Methods in `PermissionManager`

```typescript
// Get list of pending permission IDs
const pending = permissionManager.getPendingPermissions();

// Manually clear a specific permission
permissionManager.clearPendingPermission(requestId);

// Configure timeout (in milliseconds)
permissionManager.setAskTimeout(300000); // 5 minutes

// Get current timeout
const timeout = permissionManager.getAskTimeout();
```

#### Enhanced `clearSession()`
Now also clears all pending permissions and publishes `PermissionCleared` events:

```typescript
permissionManager.clearSession();
// Clears session grants AND pending permissions
```

### Subscribing to Permission Events

```typescript
import { PermissionCleared } from './bus/index.js';

// Listen for cleared permissions
const unsubscribe = PermissionCleared.subscribe((event) => {
  console.log(`Permission ${event.id} cleared: ${event.reason}`);
  
  // Update UI to remove prompt
  if (event.reason === 'timeout') {
    showNotification('Permission request timed out');
  }
});
```

### Timeout Behavior

When a permission request times out:
1. The pending permission is removed from tracking
2. A `PermissionCleared` event is published with reason='timeout'
3. The permission is automatically denied
4. The operation attempt is recorded for doom loop detection

### Best Practices

1. **Handle PermissionCleared Events**: Update UI to remove stale prompts
2. **Configure Timeout Appropriately**: 5 minutes default works for most cases
3. **Clear on Session End**: Always call `clearSession()` when ending a session
4. **Monitor Pending Permissions**: Use `getPendingPermissions()` for debugging

### Example: Custom Permission Handler

```typescript
import { PermissionManager, PermissionCleared } from './permission/index.js';

const manager = new PermissionManager();

// Set custom timeout (10 minutes)
manager.setAskTimeout(600000);

// Track cleared permissions
PermissionCleared.subscribe((event) => {
  if (event.reason === 'timeout') {
    console.warn(`Permission ${event.id} timed out`);
    // Notify user or log for debugging
  }
});

// Check permission with automatic cleanup
const result = await manager.check({
  toolName: 'write',
  action: 'write',
  resource: '/path/to/file',
  description: 'Write to configuration file'
});

// Clean up on exit
process.on('SIGINT', () => {
  manager.clearSession();
  process.exit(0);
});
```

### Migration from Previous Version

No breaking changes! Existing code continues to work:
- Default timeout increased from 60s to 300s (safer default)
- `clearSession()` now does additional cleanup (backwards compatible)
- New methods are optional additions

If you were relying on the 1-minute timeout, explicitly set it:

```typescript
permissionManager.setAskTimeout(60000); // Restore 1-minute timeout
```
