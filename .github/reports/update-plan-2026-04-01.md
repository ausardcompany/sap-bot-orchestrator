# Update Plan for Alexi

Generated: 2026-04-01
Based on upstream commits: 4abe3485..121f6e3c (kilocode - 272 commits)

## Summary
- Total changes planned: 12
- Critical: 1 | High: 4 | Medium: 5 | Low: 2

## Changes

### 1. Add Config Path Protection System
**File**: `src/permission/config-paths.ts` (new file)
**Priority**: critical
**Type**: security
**Reason**: Prevents AI agents from silently modifying configuration files (.kilo/, .kilocode/, .opencode/) which could lead to security vulnerabilities or unexpected behavior changes. This is a critical security feature that forces user approval for config edits.

**New code**:
```typescript
import path from "path"
import { Global } from "@/global"

export namespace ConfigProtection {
  /**
   * Config directory prefixes (relative paths, forward-slash normalized).
   * Matches .kilo/, .kilocode/, .opencode/, .alexi/ at any depth within the project.
   */
  const CONFIG_DIRS = [".kilo/", ".kilocode/", ".opencode/", ".alexi/"]

  /**
   * Subdirectories under CONFIG_DIRS that are NOT config files (e.g. plan files).
   * Paths under these subdirs are exempt from config protection.
   */
  const EXCLUDED_SUBDIRS = ["plans/"]

  /**
   * Root-level config files that must be protected.
   * Matched only when the relative path has no directory component.
   */
  const CONFIG_ROOT_FILES = new Set([
    "kilo.json",
    "kilo.jsonc",
    "opencode.json",
    "opencode.jsonc",
    "alexi.json",
    "alexi.jsonc",
    "AGENTS.md"
  ])

  /** Metadata key used to signal the UI to hide the "Allow always" option. */
  export const DISABLE_ALWAYS_KEY = "disableAlways" as const

  function normalize(p: string): string {
    return path.posix.normalize(p.replaceAll("\\", "/"))
  }

  /** Return true if the remainder path is in an excluded subdir. */
  function excluded(remainder: string): boolean {
    return EXCLUDED_SUBDIRS.some((sub) => remainder.startsWith(sub))
  }

  /** Check if a project-relative path points to a config file or directory. */
  export function isRelative(pattern: string): boolean {
    const normalized = normalize(pattern)
    for (const dir of CONFIG_DIRS) {
      const bare = dir.slice(0, -1) // e.g. ".kilo"
      // Match at root (e.g. ".kilo/foo") or nested (e.g. "packages/sub/.kilo/foo")
      if (normalized === bare || normalized.endsWith("/" + bare)) return true
      if (normalized.startsWith(dir)) {
        if (excluded(normalized.slice(dir.length))) continue
        return true
      }
      const nested = "/" + dir
      const idx = normalized.indexOf(nested)
      if (idx !== -1) {
        const remainder = normalized.slice(idx + nested.length)
        if (!excluded(remainder)) return true
      }
    }
    // Check root-level config files
    if (!normalized.includes("/") && CONFIG_ROOT_FILES.has(normalized)) {
      return true
    }
    return false
  }

  /** Check if an absolute path points to a config file. */
  export function isAbsolute(absolutePath: string, projectRoot: string): boolean {
    const normalized = normalize(absolutePath)
    const normalizedRoot = normalize(projectRoot)
    
    // Check if path is within project
    if (!normalized.startsWith(normalizedRoot)) {
      // Check global config directory
      const globalConfig = normalize(Global.Path.config)
      if (normalized.startsWith(globalConfig)) return true
      return false
    }
    
    // Get relative path and check
    const relative = normalized.slice(normalizedRoot.length).replace(/^\//, "")
    return isRelative(relative)
  }

  /** Check if a permission request involves config files. */
  export function isRequest(info: { patterns: string[]; permission: string }): boolean {
    if (!["write", "edit", "patch", "apply_patch"].includes(info.permission)) {
      return false
    }
    return info.patterns.some((p) => isRelative(p))
  }

  /** Get metadata to disable "always allow" for config file edits. */
  export function getMetadata(): Record<string, boolean> {
    return { [DISABLE_ALWAYS_KEY]: true }
  }
}
```

### 2. Integrate Config Protection into Permission Drain
**File**: `src/permission/drain.ts`
**Priority**: high
**Type**: security
**Reason**: Ensures config file edit permissions are never auto-resolved, requiring explicit user approval each time.

**Current code**:
```typescript
export async function drainCovered(
  pending: Record<string, PendingEntry>,
  approved: ApprovedRules,
  exclude?: string
) {
  for (const [id, entry] of Object.entries(pending)) {
    if (id === exclude) continue
    const actions = entry.info.patterns.map((pattern) =>
      evaluate(entry.info.permission, pattern, entry.ruleset, approved),
    )
    // ... rest of function
  }
}
```

**New code**:
```typescript
import { ConfigProtection } from "@/permission/config-paths"

export async function drainCovered(
  pending: Record<string, PendingEntry>,
  approved: ApprovedRules,
  exclude?: string
) {
  for (const [id, entry] of Object.entries(pending)) {
    if (id === exclude) continue
    // Never auto-resolve config file edit permissions
    if (ConfigProtection.isRequest(entry.info)) continue
    const actions = entry.info.patterns.map((pattern) =>
      evaluate(entry.info.permission, pattern, entry.ruleset, approved),
    )
    // ... rest of function
  }
}
```

### 3. Add Deprecated Field to Agent Schema
**File**: `src/agent/index.ts`
**Priority**: high
**Type**: feature
**Reason**: Supports deprecation of agents (like orchestrator) with visual indicators in UI. Allows graceful migration path for users.

**Current code**:
```typescript
export namespace Agent {
  export const schema = z.object({
    name: z.string(),
    mode: z.enum(["subagent", "primary", "all"]),
    native: z.boolean().optional(),
    hidden: z.boolean().optional(),
    topP: z.number().optional(),
    temperature: z.number().optional(),
    // ... other fields
  })
}
```

**New code**:
```typescript
export namespace Agent {
  export const schema = z.object({
    name: z.string(),
    mode: z.enum(["subagent", "primary", "all"]),
    native: z.boolean().optional(),
    hidden: z.boolean().optional(),
    deprecated: z.boolean().optional(),
    topP: z.number().optional(),
    temperature: z.number().optional(),
    // ... other fields
  })
}
```

### 4. Add Read-Only Bash Commands for Ask Agent
**File**: `src/agent/index.ts`
**Priority**: high
**Type**: feature
**Reason**: Enables the Ask agent to gather information via read-only commands while preventing any filesystem modifications. This improves Ask agent capabilities while maintaining safety.

**Current code**:
```typescript
// Default bash allowlist (if exists)
const defaultBash: Record<string, "allow" | "ask" | "deny"> = {
  "*": "ask",
  // ... existing rules
}
```

**New code**:
```typescript
// Default bash allowlist
const defaultBash: Record<string, "allow" | "ask" | "deny"> = {
  "*": "ask",
  // ... existing rules
}

// Read-only bash commands for the ask agent.
// Unlike the default bash allowlist, unknown commands are DENIED (not "ask")
// because the ask agent must never modify the filesystem.
const readOnlyBash: Record<string, "allow" | "ask" | "deny"> = {
  "*": "deny",
  // read-only / informational
  "cat *": "allow",
  "head *": "allow",
  "tail *": "allow",
  "less *": "allow",
  "ls *": "allow",
  "tree *": "allow",
  "pwd *": "allow",
  "echo *": "allow",
  "wc *": "allow",
  "which *": "allow",
  "type *": "allow",
  "file *": "allow",
  "diff *": "allow",
  "du *": "allow",
  "df *": "allow",
  "date *": "allow",
  "uname *": "allow",
  "whoami *": "allow",
  "printenv *": "allow",
  "man *": "allow",
  // text processing (stdout only, no file modification)
  "grep *": "allow",
  "rg *": "allow",
  "ag *": "allow",
  "sort *": "allow",
  "uniq *": "allow",
  "cut *": "allow",
  "awk *": "allow",
  "sed *": "allow",
  "tr *": "allow",
  "jq *": "allow",
  "yq *": "allow",
  // git read-only commands
  "git status *": "allow",
  "git log *": "allow",
  "git diff *": "allow",
  "git show *": "allow",
  "git branch --list *": "allow",
  "git tag --list *": "allow",
  "git remote -v *": "allow",
  "git rev-parse *": "allow",
  "git ls-files *": "allow",
  "git ls-tree *": "allow",
  "git blame *": "allow",
  "git shortlog *": "allow",
  // explicitly deny git write operations
  "git add *": "deny",
  "git commit *": "deny",
  "git push *": "deny",
  "git pull *": "deny",
  "git checkout *": "deny",
  "git merge *": "deny",
  "git rebase *": "deny",
  "git reset *": "deny",
  "git stash *": "deny",
}

export function getAskAgentBashRules(): Record<string, "allow" | "ask" | "deny"> {
  return readOnlyBash
}
```

### 5. Update Ask Agent Prompt
**File**: `src/agent/prompts/ask.txt` (or equivalent prompt file)
**Priority**: high
**Type**: feature
**Reason**: Updates Ask agent instructions to reflect new read-only bash capabilities and MCP tool access.

**Current code**:
```text
Guidelines:
- Answer questions thoroughly with clear explanations and relevant examples
- Analyze code, explain concepts, and provide recommendations without making changes
- Use Mermaid diagrams when they help clarify your response
- Do not edit files or execute commands; this agent is read-only
- If a question requires implementation, suggest switching to a different agent
```

**New code**:
```text
Guidelines:
- Answer questions thoroughly with clear explanations and relevant examples
- Analyze code, explain concepts, and provide recommendations without making changes
- Use Mermaid diagrams when they help clarify your response
- You may run read-only bash commands (ls, cat, grep, git log, git diff, etc.) to gather information
- You must NOT modify files, run write commands, or execute code — you are read-only
- MCP tools are available if configured — each call requires user approval
- If a question requires implementation, suggest switching to a different agent
```

### 6. Add Skill Directory Precedence Fix
**File**: `src/tool/skill.ts`
**Priority**: medium
**Type**: bugfix
**Reason**: Fixes issue where global skills were incorrectly overriding project-specific skills. Project skills should take precedence.

**Current code**:
```typescript
export function skillDirectories(): string[] {
  const dirs: string[] = []
  // Add global skills
  dirs.push(Global.Path.skills)
  // Add project skills
  dirs.push(path.join(projectRoot, ".alexi", "skills"))
  return dirs
}
```

**New code**:
```typescript
export function skillDirectories(): string[] {
  const dirs: string[] = []
  // Add project skills FIRST (higher precedence)
  const projectSkillsDir = path.join(projectRoot, ".alexi", "skills")
  if (fs.existsSync(projectSkillsDir)) {
    dirs.push(projectSkillsDir)
  }
  // Add global skills (lower precedence)
  const globalSkillsDir = Global.Path.skills
  if (fs.existsSync(globalSkillsDir)) {
    dirs.push(globalSkillsDir)
  }
  return dirs
}
```

### 7. Add Built-in Skills Protection
**File**: `src/tool/skill.ts`
**Priority**: medium
**Type**: security
**Reason**: Prevents removal of built-in skills that are essential for system operation.

**New code** (add to existing file):
```typescript
const BUILTIN_SKILLS = new Set([
  "alexi-config",
  "kilo-config",
  // Add other built-in skill names
])

export function isBuiltinSkill(skillName: string): boolean {
  return BUILTIN_SKILLS.has(skillName)
}

export function removeSkill(skillName: string): { success: boolean; error?: string } {
  if (isBuiltinSkill(skillName)) {
    return {
      success: false,
      error: `Cannot remove built-in skill: ${skillName}`
    }
  }
  // ... existing removal logic
  return { success: true }
}
```

### 8. Add Permission Next Enhancement for Config Protection
**File**: `src/permission/next.ts`
**Priority**: medium
**Type**: security
**Reason**: Integrates config protection into the permission request flow, ensuring config file edits always require explicit approval.

**Current code**:
```typescript
export async function requestPermission(
  info: PermissionInfo,
  ruleset: RuleSet
): Promise<PermissionResult> {
  // ... existing logic
}
```

**New code**:
```typescript
import { ConfigProtection } from "@/permission/config-paths"

export async function requestPermission(
  info: PermissionInfo,
  ruleset: RuleSet
): Promise<PermissionResult> {
  // Check if this is a config file edit
  const isConfigEdit = ConfigProtection.isRequest(info)
  
  // For config edits, add metadata to disable "always allow" option
  const metadata = isConfigEdit ? ConfigProtection.getMetadata() : {}
  
  // ... existing logic with metadata passed through
  
  return {
    ...result,
    metadata: { ...result.metadata, ...metadata }
  }
}
```

### 9. Add MCP Tool Caching
**File**: `src/mcp/index.ts`
**Priority**: medium
**Type**: performance
**Reason**: Caches MCP listTools results to avoid redundant RPC calls per loop step, improving performance.

**New code** (add to existing file):
```typescript
interface ToolCache {
  tools: MCPTool[]
  timestamp: number
}

const toolCache = new Map<string, ToolCache>()
const CACHE_TTL_MS = 30000 // 30 seconds

export async function listTools(serverId: string): Promise<MCPTool[]> {
  const cached = toolCache.get(serverId)
  const now = Date.now()
  
  if (cached && (now - cached.timestamp) < CACHE_TTL_MS) {
    return cached.tools
  }
  
  const tools = await fetchToolsFromServer(serverId)
  toolCache.set(serverId, { tools, timestamp: now })
  return tools
}

export function invalidateToolCache(serverId?: string): void {
  if (serverId) {
    toolCache.delete(serverId)
  } else {
    toolCache.clear()
  }
}
```

### 10. Add Empty Tool Calls Loop Prevention
**File**:
{"prompt_tokens":24263,"completion_tokens":4096,"total_tokens":28359}

[Session: 33835407-5511-4cd9-9646-c4ed578bd141]
[Messages: 2, Tokens: 28359]
