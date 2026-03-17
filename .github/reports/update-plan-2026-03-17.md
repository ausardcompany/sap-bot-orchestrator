[2026-03-17T07:08:59.691Z] [32mINFO[39m     (context): Found a service key in environment variable "AICORE_SERVICE_KEY". Using a service key is recommended for local testing only. Bind the AI Core service to the application for productive usage.
# Update Plan for Alexi

Generated: 2026-03-17
Based on upstream commits: 8120073a, 04843181, 88a55980, and related kilocode changes

## Summary
- Total changes planned: 8
- Critical: 1 | High: 3 | Medium: 3 | Low: 1

## Changes

### 1. Add Bash Command Hierarchy System for Granular Permissions
**File**: `src/tool/bash-hierarchy.ts` (new file)
**Priority**: high
**Type**: feature
**Reason**: Kilocode added a hierarchical permission rule system for bash commands that allows more granular "always allow" rules (e.g., "npm", "npm install", "npm install lodash"). This improves UX by letting users approve command prefixes.

**New code**:
```typescript
/**
 * BashHierarchy - Generates hierarchical permission rules for bash commands
 * 
 * For a command like "npm install lodash", generates rules:
 * - "npm"
 * - "npm install"
 * - "npm install lodash"
 * 
 * This allows users to approve at different granularity levels.
 */
export namespace BashHierarchy {
  /**
   * Add all hierarchy levels for a command to the rules set
   * @param rules - Set to add rules to
   * @param commandParts - Array of command parts (e.g., ["npm", "install", "lodash"])
   * @param fullCommandText - Original full command text for the final rule
   */
  export function addAll(rules: Set<string>, commandParts: string[], fullCommandText: string): void {
    if (commandParts.length === 0) return;

    // Add progressive prefixes: "npm", "npm install", etc.
    let prefix = "";
    for (let i = 0; i < commandParts.length - 1; i++) {
      prefix = prefix ? `${prefix} ${commandParts[i]}` : commandParts[i];
      rules.add(`${prefix} *`);
    }

    // Add the exact full command
    rules.add(fullCommandText);
  }

  /**
   * Check if a command matches any approved hierarchy rule
   * @param command - Command to check
   * @param approvedRules - Set of approved rules
   * @returns true if command matches an approved rule
   */
  export function matches(command: string, approvedRules: Set<string>): boolean {
    // Direct match
    if (approvedRules.has(command)) return true;

    // Check wildcard patterns
    const parts = command.split(/\s+/);
    let prefix = "";
    for (const part of parts) {
      prefix = prefix ? `${prefix} ${part}` : part;
      if (approvedRules.has(`${prefix} *`)) return true;
    }

    return false;
  }
}
```

### 2. Integrate Bash Hierarchy into Bash Tool Permission Request
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: feature
**Reason**: The bash tool needs to include hierarchy rules in permission requests so users can approve at different granularity levels.

**Current code** (approximate):
```typescript
// In permission request building
const patterns = new Set<string>();
const always = new Set<string>();

// ... command parsing ...

return {
  permission: "bash",
  patterns: Array.from(patterns),
  always: Array.from(always),
  metadata: { command: params.command },
};
```

**New code**:
```typescript
import { BashHierarchy } from "./bash-hierarchy";

// In permission request building
const patterns = new Set<string>();
const always = new Set<string>();
const rules = new Set<string>(); // Hierarchy rules for granular permissions

// ... command parsing ...

for (const node of commandNodes) {
  // ... existing command extraction ...
  
  if (command.length && command[0] !== "cd") {
    patterns.add(commandText);
    always.add(BashArity.prefix(command).join(" ") + " *");
    BashHierarchy.addAll(rules, command, commandText); // Add hierarchy rules
  }
}

return {
  permission: "bash",
  patterns: Array.from(patterns),
  always: Array.from(always),
  metadata: { 
    command: params.command, 
    rules: Array.from(rules)  // Include hierarchy rules
  },
};
```

### 3. Rename Pattern Rules to Always Rules in Permission System
**File**: `src/permission/next.ts` (or equivalent permission handler)
**Priority**: high
**Type**: refactor
**Reason**: Kilocode renamed `savePatternRules` to `saveAlwaysRules` and changed parameter names from `approvedPatterns`/`deniedPatterns` to `approvedAlways`/`deniedAlways` for clarity. The validation now uses `metadata.rules` instead of `info.patterns`.

**Current code** (if exists):
```typescript
export const savePatternRules = fn(
  z.object({
    requestID: Identifier.schema("permission"),
    approvedPatterns: z.string().array().optional(),
    deniedPatterns: z.string().array().optional(),
  }),
  async (input) => {
    const s = await state();
    const existing = s.pending[input.requestID];
    if (!existing) throw new NotFoundError({ message: `Permission request ${input.requestID} not found` });

    const validPatterns = new Set(existing.info.patterns);
    const permission = existing.info.permission;

    for (const pattern of input.approvedPatterns ?? []) {
      if (validPatterns.has(pattern)) s.approved.push({ permission, pattern, action: "allow" });
    }
    for (const pattern of input.deniedPatterns ?? []) {
      if (validPatterns.has(pattern)) s.approved.push({ permission, pattern, action: "deny" });
    }
  },
);
```

**New code**:
```typescript
export const saveAlwaysRules = fn(
  z.object({
    requestID: Identifier.schema("permission"),
    approvedAlways: z.string().array().optional(),
    deniedAlways: z.string().array().optional(),
  }),
  async (input) => {
    const s = await state();
    const existing = s.pending[input.requestID];
    if (!existing) throw new NotFoundError({ message: `Permission request ${input.requestID} not found` });

    // Validate against metadata.rules (hierarchy rules) instead of patterns
    const validRules = new Set(existing.info.metadata?.rules ?? []);
    const permission = existing.info.permission;

    for (const pattern of input.approvedAlways ?? []) {
      if (validRules.has(pattern)) s.approved.push({ permission, pattern, action: "allow" });
    }
    for (const pattern of input.deniedAlways ?? []) {
      if (validRules.has(pattern)) s.approved.push({ permission, pattern, action: "deny" });
    }
  },
);
```

### 4. Guard Temperature and Prevent Prompt Injection in Enhance Prompt
**File**: `src/tool/enhance-prompt.ts` (or equivalent)
**Priority**: critical
**Type**: security
**Reason**: Security fix to guard temperature parameter and prevent prompt injection attacks in the enhance-prompt feature. Also switches from LLM.stream to direct generateText for better control.

**Current code** (approximate):
```typescript
export async function enhancePrompt(input: { prompt: string; temperature?: number }) {
  const result = await LLM.stream({
    messages: [{ role: "user", content: input.prompt }],
    temperature: input.temperature,
    // ...
  });
  // ...
}
```

**New code**:
```typescript
import { generateText } from "ai";

export async function enhancePrompt(input: { prompt: string; temperature?: number }) {
  // Guard temperature to valid range [0, 2]
  const temperature = Math.max(0, Math.min(2, input.temperature ?? 0.7));
  
  // Sanitize prompt to prevent injection
  const sanitizedPrompt = sanitizePromptInput(input.prompt);
  
  // Use direct generateText instead of LLM.stream for better control
  const result = await generateText({
    model: getEnhanceModel(),
    messages: [
      {
        role: "system",
        content: ENHANCE_SYSTEM_PROMPT,
      },
      {
        role: "user", 
        content: sanitizedPrompt,
      }
    ],
    temperature,
    maxTokens: 1024,
  });
  
  return result.text;
}

function sanitizePromptInput(prompt: string): string {
  // Remove potential injection patterns
  return prompt
    .replace(/```[\s\S]*?```/g, '[CODE BLOCK REMOVED]')  // Remove code blocks that might contain instructions
    .slice(0, 10000);  // Limit length
}
```

### 5. Add Agent Removal Capability
**File**: `src/agent/agent.ts`
**Priority**: medium
**Type**: feature
**Reason**: Kilocode added the ability to remove custom agents by deleting their markdown source files and removing from legacy mode files. This enables users to manage custom agents from the UI.

**New code** (add to existing agent module):
```typescript
import { NamedError } from "@opencode-ai/util/error";
import { Glob } from "../util/glob";

export const RemoveError = NamedError.create(
  "AgentRemoveError",
  z.object({
    name: z.string(),
    message: z.string(),
  }),
);

/**
 * Remove a custom agent by deleting its markdown source file and/or
 * removing it from legacy mode files.
 * Scans all config directories for agent/mode .md files matching the name.
 */
export async function remove(name: string): Promise<void> {
  const agents = await state();
  const agent = agents[name];
  
  if (!agent) {
    throw new RemoveError({ name, message: "agent not found" });
  }
  
  if (agent.native) {
    throw new RemoveError({ name, message: "cannot remove native agent" });
  }

  const { unlink, readFile, writeFile } = await import("fs/promises");
  let found = false;

  // Delete .md files from config directories
  const dirs = await Config.directories();
  const patterns = [
    `{agent,agents}/**/${name}.md`,
    `{mode,modes}/${name}.md`
  ];
  
  for (const dir of dirs) {
    for (const pattern of patterns) {
      const matches = await Glob.scan(pattern, { cwd: dir, absolute: true, dot: true });
      for (const file of matches) {
        try {
          await unlink(file);
          found = true;
        } catch (err) {
          // File may not exist, continue
        }
      }
    }
  }

  // Also remove from legacy .kilocodemodes files if present
  await removeLegacyModeEntry(name, dirs);

  if (!found) {
    throw new RemoveError({ name, message: "no agent files found to remove" });
  }
}

async function removeLegacyModeEntry(name: string, dirs: string[]): Promise<void> {
  const { readFile, writeFile } = await import("fs/promises");
  const yaml = await import("yaml");
  
  for (const dir of dirs) {
    const legacyFile = path.join(dir, ".kilocodemodes");
    try {
      const content = await readFile(legacyFile, "utf-8");
      const modes = yaml.parse(content) as Record<string, unknown>[];
      const filtered = modes.filter((m) => m.slug !== name);
      if (filtered.length !== modes.length) {
        await writeFile(legacyFile, yaml.stringify(filtered));
      }
    } catch {
      // File doesn't exist or parse error, skip
    }
  }
}
```

### 6. Update Permission API Routes for Always Rules
**File**: `src/router/permission.ts` (or equivalent API routes)
**Priority**: medium
**Type**: refactor
**Reason**: API endpoint needs to be updated to use the new `saveAlwaysRules` function name and parameter schema.

**Current code** (if exists):
```typescript
router.post("/permission/pattern-rules", async (ctx) => {
  const body = await ctx.req.json();
  await PermissionNext.savePatternRules({
    requestID: body.requestID,
    approvedPatterns: body.approvedPatterns,
    deniedPatterns: body.deniedPatterns,
  });
  return ctx.json({ success: true });
});
```

**New code**:
```typescript
router.post("/permission/always-rules", async (ctx) => {
  const body = await ctx.req.json();
  await PermissionNext.saveAlwaysRules({
    requestID: body.requestID,
    approvedAlways: body.approvedAlways,
    deniedAlways: body.deniedAlways,
  });
  return ctx.json({ success: true });
});

// Keep old endpoint for backwards compatibility but mark deprecated
router.post("/permission/pattern-rules", async (ctx) => {
  console.warn("DEPRECATED: /permission/pattern-rules - use /permission/always-rules");
  const body = await ctx.req.json();
  await PermissionNext.saveAlwaysRules({
    requestID: body.requestID,
    approvedAlways: body.approvedPatterns,
    deniedAlways: body.deniedPatterns,
  });
  return ctx.json({ success: true });
});
```

### 7. Add Tests for Bash Hierarchy System
**File**: `src/tool/bash-hierarchy.test.ts` (new file)
**Priority**: medium
**Type**: feature
**Reason**: Tests for the new bash hierarchy system to ensure correct rule generation.

**New code**:
```typescript
import { describe, test, expect } from "bun:test";
import { BashHierarchy } from "./bash-hierarchy";

describe("BashHierarchy", () => {
  describe("addAll", () => {
    test("generates hierarchy rules for multi-part command", () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, ["npm", "install", "lodash"], "npm install lodash");
      
      expect(rules.has("npm *")).toBe(true);
      expect(rules.has("npm install *")).toBe(true);
      expect(rules.has("npm install lodash")).toBe(true);
    });

    test("handles single-part command", () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, ["ls"], "ls");
      
      expect(rules.has("ls")).toBe(true);
      expect(rules.size).toBe(1);
    });

    test("handles empty command", () => {
      const rules = new Set<string>();
      BashHierarchy.addAll(rules, [], "");
      
      expect(rules.size).toBe(0);
    });
  });

  describe("matches", () => {
    test("matches exact command", () => {
      const approved = new Set(["npm install lodash"]);
      expect(BashHierarchy.matches("npm install lodash", approved)).toBe(true);
    });

    test("matches wildcard prefix", () => {
      const approved = new Set(["npm *"]);
      expect(BashHierarchy.matches("npm install", approved)).toBe(true);
      expect(BashHierarchy.matches("npm run build", approved)).toBe(true);
    });

    test("does not match unrelated command", () => {
      const approved = new Set(["npm *"]);
      expect(BashHierarchy.matches("yarn install", approved)).toBe(false);
    });
  });
});
```

### 8. Add Tests for Always Rules Permission System
**File**: `src/permission/next.always-rules.test.ts` (new file)
**Priority**: low
**Type**: feature
**Reason**: Tests for the renamed always rules system to ensure approved/denied rules work correctly for future requests.

**New code**:
```typescript
import { test, expect, describe } from
{"prompt_tokens":14672,"completion_tokens":4096,"total_tokens":18768}

[Session: 72618e60-3d9c-4105-aefb-e9587754fa2b]
[Messages: 2, Tokens: 18768]
