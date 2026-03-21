/**
 * Permission Pattern Matching Utilities
 * Supports glob patterns with wildcards for granular permission control
 * Enhanced with cross-subagent permission resolution
 */

import { z } from 'zod';
import { nanoid } from 'nanoid';
import { drainCovered, DeniedError as DrainDeniedError } from './drain.js';
import { matchPattern } from './wildcard.js';
import { defineEvent } from '../bus/index.js';

/**
 * Evaluates a permission pattern against a path.
 * Supports glob patterns with wildcards.
 *
 * @param pattern - The permission pattern (e.g., "*.md", "src/**")
 * @param targetPath - The path to check
 * @returns true if pattern matches the path
 */
export function matchesPattern(pattern: string, targetPath: string): boolean {
  // Handle exact matches
  if (pattern === targetPath) return true;

  // Handle wildcard patterns
  if (pattern === '*') return true;

  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\*\*/g, '{{GLOBSTAR}}')
    .replace(/\*/g, '[^/]*')
    .replace(/{{GLOBSTAR}}/g, '.*')
    .replace(/\?/g, '.');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(targetPath);
}

/**
 * Evaluates permission rules in order, returning the first matching rule's action.
 * Rules are evaluated from most specific to least specific.
 */
export function evaluatePatternRules(
  rules: Array<{ pattern: string; action: 'allow' | 'deny' }>,
  targetPath: string
): 'allow' | 'deny' | undefined {
  for (const rule of rules) {
    if (matchesPattern(rule.pattern, targetPath)) {
      return rule.action;
    }
  }
  return undefined;
}

/**
 * Permission configuration types and utilities
 */
export type Action = 'allow' | 'deny' | 'ask';

export type PermissionRule = Action | { [pattern: string]: Action | null } | null;

export interface PermissionConfig {
  [permission: string]: PermissionRule;
}

export interface Rule {
  permission: string;
  pattern: string;
  action: Action;
}

export type Ruleset = Rule[];

/**
 * Expand pattern shorthand (currently just returns the pattern as-is)
 */
function expand(pattern: string): string {
  return pattern;
}

/**
 * Permission configuration parsing and serialization utilities
 * Handles null sentinels for deletion in config patches
 */
export const PermissionNext = {
  fromConfig(config: PermissionConfig): Ruleset {
    const ruleset: Ruleset = [];
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string') {
        ruleset.push({
          permission: key,
          pattern: '*',
          action: value,
        });
        continue;
      }
      // null is a delete sentinel — skip it (it only appears in patches, not in stored config)
      if (value === null) {
        continue;
      }
      ruleset.push(
        // Filter out null entries (delete sentinels) — they don't represent real rules
        ...Object.entries(value)
          .filter(([, action]) => action !== null)
          .map(([pattern, action]) => ({
            permission: key,
            pattern: expand(pattern),
            action: action as Action,
          }))
      );
    }
    return ruleset;
  },

  toConfig(rules: Ruleset): PermissionConfig {
    const result: PermissionConfig = {};
    for (const rule of rules) {
      const existing = result[rule.permission];
      if (existing === undefined || existing === null) {
        // Use object format to avoid replacing existing granular rules
        // when merged via updateGlobal (e.g. { read: "allow" } would wipe
        // { read: { "*": "ask", "src/*": "allow" } })
        result[rule.permission] = { [rule.pattern]: rule.action };
      } else if (typeof existing === 'string') {
        // Convert string to object format and add new pattern
        result[rule.permission] = {
          '*': existing,
          [rule.pattern]: rule.action,
        };
      } else {
        // Add to existing object
        existing[rule.pattern] = rule.action;
      }
    }
    return result;
  },
};

// ============ Session Management for Cross-Subagent Permissions ============

export interface Request {
  id: string;
  sessionID: string;
  permission: string;
  patterns: string[];
}

const RuleSchema = z.object({
  permission: z.string(),
  pattern: z.string(),
  action: z.enum(['allow', 'deny', 'ask']),
});

const Identifier = {
  schema: (prefix: string) => z.string().refine((id) => id.startsWith(prefix)),
};

// Session state for managing pending permissions
interface SessionState {
  pending: Record<
    string,
    {
      info: Request;
      ruleset: Ruleset;
      resolve: () => void;
      reject: (e: any) => void;
    }
  >;
  approved: Ruleset;
}

const sessionState: SessionState = {
  pending: {},
  approved: [],
};

// Permission events for cross-subagent coordination
export const Event = {
  Replied: defineEvent(
    'permission.next.replied',
    z.object({
      sessionID: z.string(),
      requestID: z.string(),
      reply: z.enum(['approve', 'reject']),
    })
  ),
};

export { DeniedError } from './drain.js';

/**
 * Evaluate a permission against patterns using rulesets
 */
export function evaluate(
  permission: string,
  pattern: string,
  ruleset: Ruleset,
  approved: Ruleset
): { action: 'allow' | 'deny' | 'prompt' } {
  // Check approved rules first
  for (const rule of approved) {
    if (rule.permission === permission && matchPattern(rule.pattern, pattern).matched) {
      return { action: rule.action === 'ask' ? 'prompt' : (rule.action as 'allow' | 'deny') };
    }
  }

  // Check existing ruleset
  for (const rule of ruleset) {
    if (rule.permission === permission && matchPattern(rule.pattern, pattern).matched) {
      return { action: rule.action === 'ask' ? 'prompt' : (rule.action as 'allow' | 'deny') };
    }
  }

  // Default to prompt
  return { action: 'prompt' };
}

/**
 * Request permission with cross-subagent awareness
 */
export async function request(info: Request, ruleset: Ruleset): Promise<void> {
  return new Promise((resolve, reject) => {
    sessionState.pending[info.id] = {
      info,
      ruleset,
      resolve,
      reject,
    };
  });
}

/**
 * Save always-rules and trigger cross-subagent drain
 */
export async function saveAlwaysRules(input: {
  requestID: string;
  rules: Array<{ permission: string; pattern: string; action: Action }>;
}): Promise<void> {
  const validated = z
    .object({
      requestID: Identifier.schema('permission'),
      rules: z.array(RuleSchema),
    })
    .parse(input);

  const newRules = validated.rules.filter(
    (rule) => !sessionState.approved.some((r) => r.permission === rule.permission && r.pattern === rule.pattern)
  );

  if (newRules.length > 0) {
    sessionState.approved.push(...newRules);
    // Here you would save to config - omitted for now as it depends on config system
    // await Config.updateGlobal({ permission: PermissionNext.toConfig(newRules) }, { dispose: false })
  }

  // Auto-resolve sibling pending permissions covered by new rules
  await drainCovered(
    sessionState.pending,
    sessionState.approved,
    evaluate,
    Event,
    DrainDeniedError,
    validated.requestID
  );
}

/**
 * Get current session state (for testing/debugging)
 */
export function getSessionState(): SessionState {
  return sessionState;
}

/**
 * Clear session state (for testing)
 */
export function clearSessionState(): void {
  sessionState.pending = {};
  sessionState.approved = [];
}

