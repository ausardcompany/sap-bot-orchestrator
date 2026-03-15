[2026-03-15T07:35:08.376Z] [32mINFO[39m     (context): Found a service key in environment variable "AICORE_SERVICE_KEY". Using a service key is recommended for local testing only. Bind the AI Core service to the application for productive usage.
# Update Plan for Alexi

Generated: 2026-03-15
Based on upstream commits: 4bf437da, 72a2963f, 673ab875 (kilocode)

## Summary
- Total changes planned: 3
- Critical: 0 | High: 0 | Medium: 2 | Low: 1

## Changes

### 1. Update Permission Dock Component Layout and Styling
**File**: `src/ui/components/PermissionDock.tsx` (or equivalent webview component)
**Priority**: medium
**Type**: refactor
**Reason**: Upstream kilocode has significantly refactored the PermissionDock component with improved layout (+104, -90 lines). This improves user experience when permission prompts are displayed. The changes likely include better visual hierarchy, spacing, and button arrangements for permission approval workflows.

**Current code** (if exists - typical permission dock structure):
```typescript
export const PermissionDock: React.FC<PermissionDockProps> = ({ 
  permission, 
  onApprove, 
  onDeny 
}) => {
  return (
    <div className="permission-dock">
      <div className="permission-content">
        <span className="permission-message">{permission.message}</span>
      </div>
      <div className="permission-actions">
        <button onClick={onDeny}>Deny</button>
        <button onClick={onApprove}>Approve</button>
      </div>
    </div>
  );
};
```

**New code**:
```typescript
export const PermissionDock: React.FC<PermissionDockProps> = ({ 
  permission, 
  onApprove, 
  onDeny,
  onApproveSession // New: session-level approval
}) => {
  return (
    <div className="permission-dock permission-dock--improved">
      <div className="permission-dock__header">
        <span className="permission-dock__icon">{getPermissionIcon(permission.type)}</span>
        <span className="permission-dock__title">{permission.title}</span>
      </div>
      <div className="permission-dock__content">
        <p className="permission-dock__message">{permission.message}</p>
        {permission.details && (
          <div className="permission-dock__details">
            <code>{permission.details}</code>
          </div>
        )}
      </div>
      <div className="permission-dock__actions">
        <button 
          className="permission-dock__btn permission-dock__btn--deny" 
          onClick={onDeny}
        >
          {t("deny")}
        </button>
        <button 
          className="permission-dock__btn permission-dock__btn--approve-session" 
          onClick={onApproveSession}
        >
          {t("approveForSession")}
        </button>
        <button 
          className="permission-dock__btn permission-dock__btn--approve" 
          onClick={onApprove}
        >
          {t("approve")}
        </button>
      </div>
    </div>
  );
};

function getPermissionIcon(type: string): string {
  const icons: Record<string, string> = {
    'bash': '⚡',
    'write': '✏️',
    'glob': '📁',
    'todo': '📋',
    'default': '🔐'
  };
  return icons[type] || icons['default'];
}
```

---

### 2. Update Permission Prompt Styles
**File**: `src/ui/styles/chat.css` (or equivalent stylesheet)
**Priority**: medium
**Type**: refactor
**Reason**: Upstream added 92 new lines of CSS and modified 15 existing lines for improved permission prompt styling. This enhances visual clarity and consistency of permission dialogs, improving user experience when approving tool executions.

**Current code** (typical permission styles):
```css
.permission-dock {
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin: 8px 0;
}

.permission-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.permission-actions button {
  padding: 4px 12px;
  border-radius: 4px;
}
```

**New code**:
```css
/* Permission Dock - Improved Layout */
.permission-dock {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid var(--vscode-editorWidget-border, var(--border-color));
  border-radius: 8px;
  margin: 12px 0;
  background: var(--vscode-editorWidget-background, var(--bg-secondary));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.permission-dock--improved {
  animation: permission-slide-in 0.2s ease-out;
}

@keyframes permission-slide-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.permission-dock__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.permission-dock__icon {
  font-size: 18px;
  line-height: 1;
}

.permission-dock__title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vscode-foreground);
}

.permission-dock__content {
  margin-bottom: 12px;
}

.permission-dock__message {
  margin: 0 0 8px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vscode-descriptionForeground);
}

.permission-dock__details {
  padding: 8px 12px;
  background: var(--vscode-textCodeBlock-background, rgba(0, 0, 0, 0.1));
  border-radius: 4px;
  overflow-x: auto;
}

.permission-dock__details code {
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
}

.permission-dock__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--vscode-editorWidget-border, var(--border-color));
}

.permission-dock__btn {
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  border: 1px solid transparent;
}

.permission-dock__btn--deny {
  background: transparent;
  color: var(--vscode-foreground);
  border-color: var(--vscode-button-secondaryBackground, var(--border-color));
}

.permission-dock__btn--deny:hover {
  background: var(--vscode-button-secondaryHoverBackground, rgba(255, 255, 255, 0.1));
}

.permission-dock__btn--approve-session {
  background: var(--vscode-button-secondaryBackground, var(--bg-tertiary));
  color: var(--vscode-button-secondaryForeground, var(--text-primary));
}

.permission-dock__btn--approve-session:hover {
  background: var(--vscode-button-secondaryHoverBackground);
}

.permission-dock__btn--approve {
  background: var(--vscode-button-background, #0e639c);
  color: var(--vscode-button-foreground, #ffffff);
}

.permission-dock__btn--approve:hover {
  background: var(--vscode-button-hoverBackground, #1177bb);
}

/* Focus states for accessibility */
.permission-dock__btn:focus-visible {
  outline: 2px solid var(--vscode-focusBorder);
  outline-offset: 2px;
}
```

---

### 3. Add New i18n Translation Key
**File**: `src/i18n/locales/en.ts` (and other locale files)
**Priority**: low
**Type**: feature
**Reason**: Upstream added a new translation key across all 16 locale files (+1 line each). This is likely for a new label in the permission prompt UI (possibly "approveForSession" or similar based on the permission dock changes).

**Current code** (example en.ts):
```typescript
export const en = {
  // ... existing keys
  permission: {
    approve: "Approve",
    deny: "Deny",
    title: "Permission Required",
    // ... other permission keys
  }
};
```

**New code**:
```typescript
export const en = {
  // ... existing keys
  permission: {
    approve: "Approve",
    approveForSession: "Approve for Session", // New key
    deny: "Deny",
    title: "Permission Required",
    // ... other permission keys
  }
};

// Also update other locale files:
// src/i18n/locales/de.ts - "Für Sitzung genehmigen"
// src/i18n/locales/fr.ts - "Approuver pour la session"
// src/i18n/locales/es.ts - "Aprobar para la sesión"
// src/i18n/locales/ja.ts - "セッションで承認"
// src/i18n/locales/ko.ts - "세션에 대해 승인"
// src/i18n/locales/zh.ts - "批准此会话"
// src/i18n/locales/ru.ts - "Одобрить для сессии"
// ... (other locales as needed)
```

---

## Testing Recommendations

1. **Visual Regression Testing**: 
   - Compare permission dock appearance before/after changes
   - Test with different permission types (bash, write, glob, todo)
   - Verify styling in both light and dark VS Code themes

2. **Functional Testing**:
   - Verify all three buttons (Deny, Approve for Session, Approve) trigger correct callbacks
   - Test permission dock animation renders smoothly
   - Confirm i18n keys load correctly for all supported locales

3. **Accessibility Testing**:
   - Verify keyboard navigation works for permission buttons
   - Check focus states are visible
   - Test with screen readers

4. **SAP AI Core Integration**:
   - Ensure permission prompts display correctly when using SAP AI Core as provider
   - Verify no regressions in existing SAP-specific permission flows

## Potential Risks

1. **CSS Specificity Conflicts**: New CSS classes may conflict with existing Alexi styles if different naming conventions are used. Review existing class names before applying.

2. **Component Props Changes**: The PermissionDock component may have different prop interfaces in Alexi. Adapt the `onApproveSession` callback to match existing permission handling architecture.

3. **i18n Key Collisions**: Verify the new translation key doesn't conflict with existing keys in Alexi's i18n setup.

4. **Visual Regression Snapshots**: If Alexi has visual regression tests, all permission-related snapshots will need updating after these changes (similar to the 5 snapshot updates in upstream).
{"prompt_tokens":1903,"completion_tokens":2949,"total_tokens":4852}

[Session: 1cc0130c-17d8-40b3-981c-25d0e5155dfe]
[Messages: 2, Tokens: 4852]
