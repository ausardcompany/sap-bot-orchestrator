/**
 * Permission Drain Module for Cross-Subagent Rule Resolution
 * Auto-resolves pending permissions now fully covered by approved or denied rules.
 * When the user approves/denies a rule on subagent A, sibling subagent B's
 * pending permission for the same pattern resolves or rejects automatically.
 */

import { matchPattern } from './wildcard.js';

export interface PendingPermissionEntry {
  info: {
    id: string;
    sessionID: string;
    permission: string;
    patterns: string[];
  };
  ruleset: Array<{ permission: string; pattern: string; action: string }>;
  resolve: () => void;
  reject: (e: any) => void;
}

export interface PermissionRule {
  permission: string;
  pattern: string;
  action: string;
}

export type Ruleset = PermissionRule[];

export interface EvaluateResult {
  action: 'allow' | 'deny' | 'prompt';
}

export class DeniedError extends Error {
  constructor(public rules: PermissionRule[]) {
    super('Permission denied');
    this.name = 'DeniedError';
  }
}

/**
 * Evaluate a permission against patterns using rulesets
 */
export function evaluate(
  permission: string,
  pattern: string,
  ruleset: Ruleset,
  approved: Ruleset
): EvaluateResult {
  // Check approved rules first
  for (const rule of approved) {
    if (rule.permission === permission && matchPattern(rule.pattern, pattern).matched) {
      return { action: rule.action as 'allow' | 'deny' | 'prompt' };
    }
  }

  // Check existing ruleset
  for (const rule of ruleset) {
    if (rule.permission === permission && matchPattern(rule.pattern, pattern).matched) {
      return { action: rule.action as 'allow' | 'deny' | 'prompt' };
    }
  }

  // Default to prompt
  return { action: 'prompt' };
}

/**
 * Auto-resolve pending permissions now fully covered by approved or denied rules.
 * When the user approves/denies a rule on subagent A, sibling subagent B's
 * pending permission for the same pattern resolves or rejects automatically.
 */
export async function drainCovered(
  pending: Record<string, PendingPermissionEntry>,
  approved: Ruleset,
  evaluateFn: typeof evaluate,
  events: {
    Replied: {
      publish: (payload: { sessionID: string; requestID: string; reply: string }) => void;
    };
  },
  DeniedErrorClass: typeof DeniedError,
  exclude?: string
): Promise<void> {
  for (const [id, entry] of Object.entries(pending)) {
    if (id === exclude) {
      continue;
    }

    const actions = entry.info.patterns.map((pattern) =>
      evaluateFn(entry.info.permission, pattern, entry.ruleset, approved)
    );

    const denied = actions.some((r) => r.action === 'deny');
    const allowed = !denied && actions.every((r) => r.action === 'allow');

    if (!denied && !allowed) {
      continue;
    }

    delete pending[id];

    if (denied) {
      events.Replied.publish({
        sessionID: entry.info.sessionID,
        requestID: entry.info.id,
        reply: 'reject',
      });
      entry.reject(
        new DeniedErrorClass(
          approved.filter((r) => matchPattern(r.permission, entry.info.permission).matched)
        )
      );
    } else {
      events.Replied.publish({
        sessionID: entry.info.sessionID,
        requestID: entry.info.id,
        reply: 'approve',
      });
      entry.resolve();
    }
  }
}
