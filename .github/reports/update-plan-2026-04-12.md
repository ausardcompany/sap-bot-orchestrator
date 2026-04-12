# Update Plan for Alexi

Generated: 2026-04-12
Based on upstream commits: kilocode 7ea50aac1..6fc863f4e (113 commits), opencode 74b14a2..2719063 (27 commits)

## Summary
- Total changes planned: 24
- Critical: 2 | High: 8 | Medium: 10 | Low: 4

## Changes

### 1. Refactor Tool.define to use Effect-based init
**File**: `src/tool/tool.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Upstream has changed Tool.Info.init from returning `Promise<DefWithoutID>` to returning `Effect.Effect<DefWithoutID>`. This is a fundamental architectural change that affects all tool definitions.

**Current code**:
```typescript
export interface Info<Parameters extends z.ZodType = z.ZodType, M extends Metadata = Metadata> {
  id: string
  init: () => Promise<DefWithoutID<Parameters, M>>
}
```

**New code**:
```typescript
import { Effect } from "effect"

export interface Info<Parameters extends z.ZodType = z.ZodType, M extends Metadata = Metadata> {
  id: string
  init: () => Effect.Effect<DefWithoutID<Parameters, M>>
}

type Init<Parameters extends z.ZodType, M extends Metadata> =
  | DefWithoutID<Parameters, M>
  | (() => Effect.Effect<DefWithoutID<Parameters, M>>)

function wrap<Parameters extends z.ZodType, Result extends Metadata>(
  id: string,
  init: Init<Parameters, Result>,
  truncate: Truncate.Interface,
  agents: Agent.Interface,
) {
  return () =>
    Effect.gen(function* () {
      const toolInfo = typeof init === "function" ? yield* init() : { ...init }
      const execute = toolInfo.execute
      toolInfo.execute = (args, ctx) =>
        Effect.gen(function* () {
          yield* Effect.try({
            try: () => toolInfo.parameters.parse(args),
            catch: (error) => {
              if (error instanceof z.ZodError && toolInfo.formatValidationError) {
                return new Error(toolInfo.formatValidationError(error), { cause: error })
              }
              return new Error(
                `The ${id} tool was called with invalid arguments: ${error}.\nPlease rewrite the input so it satisfies the expected schema.`,
                { cause: error },
              )
            },
          })
          const result = yield* execute(args, ctx)
          if (result.metadata.truncated !== undefined) {
            return result
          }
          const agent = yield* agents.get(ctx.agent)
          // Continue with truncation logic...
          return result
        })
      return toolInfo
    })
}
```

### 2. Update Truncate module - remove facade pattern
**File**: `src/tool/truncate.ts`
**Priority**: critical
**Type**: refactor
**Reason**: Upstream destroyed the Truncate facade, moving to pure Effect-based implementation. This aligns with the broader Effect migration strategy.

**Current code**:
```typescript
export namespace Truncate {
  export const MAX_LINES = 2000
  export const MAX_BYTES = 32000

  export async function truncateOutput(output: string): Promise<string> {
    // ... implementation
  }
}
```

**New code**:
```typescript
import { Effect, Context, Layer } from "effect"

export namespace Truncate {
  export const MAX_LINES = 2000
  export const MAX_BYTES = 32000

  export interface Interface {
    readonly truncateOutput: (output: string) => Effect.Effect<string>
    readonly truncateFile: (content: string, filePath: string) => Effect.Effect<string>
  }

  export class Service extends Context.Tag("Truncate")<Service, Interface>() {}

  export const layer = Layer.succeed(
    Service,
    {
      truncateOutput: (output: string) =>
        Effect.sync(() => {
          const lines = output.split("\n")
          if (lines.length > MAX_LINES) {
            const truncated = lines.slice(0, MAX_LINES).join("\n")
            return `${truncated}\n\n[Output truncated: ${lines.length - MAX_LINES} lines omitted]`
          }
          if (output.length > MAX_BYTES) {
            return `${output.slice(0, MAX_BYTES)}\n\n[Output truncated: ${output.length - MAX_BYTES} bytes omitted]`
          }
          return output
        }),
      truncateFile: (content: string, filePath: string) =>
        Effect.sync(() => {
          // File-specific truncation logic
          const lines = content.split("\n")
          if (lines.length > MAX_LINES) {
            return `${lines.slice(0, MAX_LINES).join("\n")}\n\n[File ${filePath} truncated: ${lines.length - MAX_LINES} lines omitted]`
          }
          return content
        }),
    }
  )

  export const defaultLayer = layer
}
```

### 3. Update BashTool to use Effect-based init
**File**: `src/tool/bash.ts`
**Priority**: high
**Type**: refactor
**Reason**: BashTool must be updated to return Effect from init function to align with new Tool.define signature.

**Current code**:
```typescript
export const BashTool = Tool.define(
  "bash",
  Effect.gen(function* () {
    // ... setup code
    return async () => {
      const shell = Shell.acceptable()
      // ... rest of implementation
      return {
        description: DESCRIPTION,
        parameters: Parameters,
        execute: (params, ctx) => Effect.gen(function* () {
          // ... execute logic
        })
      }
    }
  })
)
```

**New code**:
```typescript
export const BashTool = Tool.define(
  "bash",
  Effect.gen(function* () {
    // ... setup code
    return () =>
      Effect.gen(function* () {
        const shell = Shell.acceptable()
        const name = Shell.name(shell)
        const chain =
          name === "powershell"
            ? "If the commands depend on each other and must run sequentially, avoid '&&' in this shell because Windows PowerShell 5.1 does not support it. Use PowerShell conditionals such as `cmd1; if ($?) { cmd2 }` when later commands must depend on earlier success."
            : "If the commands depend on each other and must run sequentially, use a single Bash call with '&&' to chain them together."
        
        log.info("bash tool using shell", { shell })

        return {
          description: DESCRIPTION.replaceAll("${directory}", Instance.directory)
            .replaceAll("${os}", process.platform)
            .replaceAll("${shell}", name)
            .replaceAll("${chaining}", chain)
            .replaceAll("${maxLines}", String(Truncate.MAX_LINES))
            .replaceAll("${maxBytes}", String(Truncate.MAX_BYTES)),
          parameters: Parameters,
          execute: (params: z.infer<typeof Parameters>, ctx: Tool.Context) =>
            Effect.gen(function* () {
              const cwd = params.workdir
                ? yield* resolvePath(params.workdir, Instance.directory, shell)
                : Instance.directory
              if (params.timeout !== undefined && params.timeout < 0) {
                throw new Error(`Invalid timeout value: ${params.timeout}. Timeout must be a positive number.`)
              }
              const timeout = params.timeout ?? DEFAULT_TIMEOUT
              const ps = PS.has(name)
              const root = yield* parse(params.command, ps)
              const scan = yield* collect(root, cwd, ps, shell)
              if (!Instance.containsPath(cwd)) scan.dirs.add(cwd)
              yield* ask(ctx, scan)

              return yield* run({
                shell,
                name,
                command: params.command,
                cwd,
                env: yield* shellEnv(ctx, cwd),
                timeout,
                description: params.description,
              }, ctx)
            }),
        }
      })
  })
)
```

### 4. Update SkillTool to use Effect-based init
**File**: `src/tool/skill.ts`
**Priority**: high
**Type**: refactor
**Reason**: SkillTool needs to return Effect from init function for consistency with new architecture.

**Current code**:
```typescript
export const SkillTool = Tool.define(
  "skill",
  Effect.gen(function* () {
    const skill = yield* Skill.Service
    const rg = yield* Ripgrep.Service

    return async () => {
      const list = await Effect.runPromise(skill.available().pipe(Effect.provide(EffectLogger.layer)))
      // ... rest
    }
  })
)
```

**New code**:
```typescript
export const SkillTool = Tool.define(
  "skill",
  Effect.gen(function* () {
    const skill = yield* Skill.Service
    const rg = yield* Ripgrep.Service
    
    return () =>
      Effect.gen(function* () {
        const list = yield* skill.available().pipe(Effect.provide(EffectLogger.layer))

        const description =
          list.length === 0
            ? "Load a specialized skill that provides domain-specific instructions and workflows. No skills are currently available."
            : [
                "Load a specialized skill that provides domain-specific instructions and workflows.",
                "",
                "When you recognize that a task matches one of the available skills listed below, use this tool to load the full skill instructions.",
                "",
                "The skill will inject detailed instructions, workflows, and access to bundled resources (scripts, references, templates) into the conversation context.",
                "",
                'Tool output includes a `<skill_content name="...">` block with the loaded content.',
                "",
                "The following skills provide specialized sets of instructions for particular tasks",
                "Invoke this tool to load a skill when a task matches one of the available skills listed below:",
                "",
                Skill.fmt(list, { verbose: false }),
              ].join("\n")

        return {
          description,
          parameters: Parameters,
          execute: (params, ctx) =>
            Effect.gen(function* () {
              // ... existing execute logic
            }),
        }
      })
  })
)
```

### 5. Update MultiEditTool for Effect-based init
**File**: `src/tool/multiedit.ts`
**Priority**: high
**Type**: refactor
**Reason**: MultiEditTool calls EditTool.init() which now returns Effect instead of Promise.

**Current code**:
```typescript
export const MultiEditTool = Tool.define(
  "multiedit",
  Effect.gen(function* () {
    const editInfo = yield* EditTool
    const edit = yield* Effect.promise(() => editInfo.init())
    // ...
  })
)
```

**New code**:
```typescript
export const MultiEditTool = Tool.define(
  "multiedit",
  Effect.gen(function* () {
    const editInfo = yield* EditTool
    const edit = yield* editInfo.init()

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params, ctx) =>
        Effect.gen(function* () {
          // ... existing execute logic using edit
        }),
    }
  })
)
```

### 6. Consolidate Permission module
**File**: `src/permission/index.ts`
**Priority**: high
**Type**: refactor
**Reason**: Upstream consolidated permission/service.ts and permission/next.ts into a single permission/index.ts with 516 lines. This simplifies the permission system architecture.

**New code**:
```typescript
import { Effect, Context, Layer, Ref, Stream } from "effect"
import { z } from "zod"

export namespace Permission {
  export const RuleSchema = z.object({
    pattern: z.string(),
    action: z.enum(["allow", "deny", "ask"]),
    scope: z.enum(["file", "directory", "command", "all"]).optional(),
  })

  export type Rule = z.infer<typeof RuleSchema>

  export interface Interface {
    readonly evaluate: (request: EvaluateRequest) => Effect.Effect<EvaluateResult>
    readonly addRule: (rule: Rule) => Effect.Effect<void>
    readonly removeRule: (pattern: string) => Effect.Effect<void>
    readonly getRules: () => Effect.Effect<Rule[]>
    readonly toConfig: () => Effect.Effect<PermissionConfig>
  }

  export interface EvaluateRequest {
    type: "file" | "directory" | "command"
    path: string
    action: "read" | "write" | "execute"
    sessionId?: string
  }

  export interface EvaluateResult {
    allowed: boolean
    rule?: Rule
    reason?: string
  }

  export interface PermissionConfig {
    rules: Rule[]
    defaultAction: "allow" | "deny" | "ask"
  }

  export class Service extends Context.Tag("Permission")<Service, Interface>() {}

  export const make = (initialConfig: PermissionConfig) =>
    Effect.gen(function* () {
      const rulesRef = yield* Ref.make<Rule[]>(initialConfig.rules)
      const defaultAction = initialConfig.defaultAction

      const matchRule = (request: EvaluateRequest, rule: Rule): boolean => {
        if (rule.scope && rule.scope !== "all" && rule.scope !== request.type) {
          return false
        }
        const regex = new RegExp(rule.pattern.replace(/\*/g, ".*"))
        return regex.test(request.path)
      }

      return {
        evaluate: (request: EvaluateRequest) =>
          Effect.gen(function* () {
            const rules = yield* Ref.get(rulesRef)
            for (const rule of rules) {
              if (matchRule(request, rule)) {
                return {
                  allowed: rule.action === "allow",
                  rule,
                  reason: `Matched rule: ${rule.pattern}`,
                }
              }
            }
            return {
              allowed: defaultAction === "allow",
              reason: `Default action: ${defaultAction}`,
            }
          }),

        addRule: (rule: Rule) =>
          Ref.update(rulesRef, (rules) => [...rules, rule]),

        removeRule: (pattern: string) =>
          Ref.update(rulesRef, (rules) => rules.filter((r) => r.pattern !== pattern)),

        getRules: () => Ref.get(rulesRef),

        toConfig: () =>
          Effect.gen(function* () {
            const rules = yield* Ref.get(rulesRef)
            return { rules, defaultAction }
          }),
      } satisfies Interface
    })

  export const layer = (config: PermissionConfig) =>
    Layer.effect(Service, make(config))

  export const defaultLayer = layer({
    rules: [],
    defaultAction: "ask",
  })
}
```

### 7. Add evaluate.ts for permission evaluation helpers
**File**: `src/permission/evaluate.ts`
**Priority**: medium
**Type**: feature
**Reason**: Upstream added a dedicated evaluate.ts with helper functions for permission evaluation.

**New code**:
```typescript
import { Effect } from "effect"
import { Permission } from "./index"

export const evaluateFileAccess = (
  filePath: string,
  action: "read" | "write",
  sessionId?: string
) =>
  Effect.gen(function* () {
    const permission = yield* Permission.Service
    return yield* permission.evaluate({
      type: "file",
      path: filePath,
      action,
      sessionId,
    })
  })

export const evaluateCommandExecution = (
  command: string,
  sessionId?: string
) =>
  Effect.gen(function* () {
    const permission = yield* Permission.Service
    return yield* permission.evaluate({
      type: "command",
      path: command,
      action: "execute",
      sessionId,
    })
  })

export const evaluateDirectoryAccess = (
  dirPath: string
{"prompt_tokens":24818,"completion_tokens":4096,"total_tokens":28914}

[Session: 057a4874-8b3f-45af-90ee-34fcdf5ef075]
[Messages: 2, Tokens: 28914]
