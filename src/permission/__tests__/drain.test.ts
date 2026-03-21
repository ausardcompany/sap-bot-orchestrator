import { describe, it, expect, vi, beforeEach } from 'vitest';
import { drainCovered, DeniedError, evaluate } from '../drain.js';
import type { PendingPermissionEntry, Ruleset } from '../drain.js';

describe('drainCovered', () => {
  const mockEvents = {
    Replied: {
      publish: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should resolve pending permissions covered by approved rules', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending: Record<string, PendingPermissionEntry> = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:read',
          patterns: ['/src/**'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'allow' },
    ];

    await drainCovered(pending, approved, evaluate, mockEvents, DeniedError);

    expect(resolve).toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
    expect(mockEvents.Replied.publish).toHaveBeenCalledWith({
      sessionID: 'session-1',
      requestID: 'req-1',
      reply: 'approve',
    });
  });

  it('should reject pending permissions covered by deny rules', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending: Record<string, PendingPermissionEntry> = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/etc/**'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved: Ruleset = [
      { permission: 'file:write', pattern: '/etc/**', action: 'deny' },
    ];

    await drainCovered(pending, approved, evaluate, mockEvents, DeniedError);

    expect(reject).toHaveBeenCalled();
    expect(resolve).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
    expect(mockEvents.Replied.publish).toHaveBeenCalledWith({
      sessionID: 'session-1',
      requestID: 'req-1',
      reply: 'reject',
    });
  });

  it('should exclude specified request ID from draining', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending: Record<string, PendingPermissionEntry> = {
      'req-exclude': {
        info: {
          id: 'req-exclude',
          sessionID: 'session-1',
          permission: 'file:read',
          patterns: ['/src/**'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'allow' },
    ];

    await drainCovered(pending, approved, evaluate, mockEvents, DeniedError, 'req-exclude');

    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(pending['req-exclude']).toBeDefined();
    expect(mockEvents.Replied.publish).not.toHaveBeenCalled();
  });

  it('should not drain permissions with partial coverage', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending: Record<string, PendingPermissionEntry> = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:read',
          patterns: ['/src/**', '/lib/**'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'allow' },
    ];

    await drainCovered(pending, approved, evaluate, mockEvents, DeniedError);

    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeDefined();
    expect(mockEvents.Replied.publish).not.toHaveBeenCalled();
  });

  it('should handle multiple pending permissions', async () => {
    const resolve1 = vi.fn();
    const reject1 = vi.fn();
    const resolve2 = vi.fn();
    const reject2 = vi.fn();

    const pending: Record<string, PendingPermissionEntry> = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:read',
          patterns: ['/src/**'],
        },
        ruleset: [],
        resolve: resolve1,
        reject: reject1,
      },
      'req-2': {
        info: {
          id: 'req-2',
          sessionID: 'session-2',
          permission: 'file:write',
          patterns: ['/tmp/**'],
        },
        ruleset: [],
        resolve: resolve2,
        reject: reject2,
      },
    };

    const approved: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'allow' },
      { permission: 'file:write', pattern: '/tmp/**', action: 'deny' },
    ];

    await drainCovered(pending, approved, evaluate, mockEvents, DeniedError);

    expect(resolve1).toHaveBeenCalled();
    expect(reject1).not.toHaveBeenCalled();
    expect(resolve2).not.toHaveBeenCalled();
    expect(reject2).toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
    expect(pending['req-2']).toBeUndefined();
  });

  it('should handle DeniedError correctly', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending: Record<string, PendingPermissionEntry> = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/etc/passwd'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved: Ruleset = [
      { permission: 'file:write', pattern: '/etc/**', action: 'deny' },
    ];

    await drainCovered(pending, approved, evaluate, mockEvents, DeniedError);

    expect(reject).toHaveBeenCalled();
    const error = reject.mock.calls[0][0];
    expect(error).toBeInstanceOf(DeniedError);
    expect(error.rules).toBeDefined();
  });
});

describe('evaluate', () => {
  it('should return allow for matching approved rule', () => {
    const approved: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'allow' },
    ];

    const result = evaluate('file:read', '/src/index.ts', [], approved);
    expect(result.action).toBe('allow');
  });

  it('should return deny for matching deny rule', () => {
    const approved: Ruleset = [
      { permission: 'file:write', pattern: '/etc/**', action: 'deny' },
    ];

    const result = evaluate('file:write', '/etc/passwd', [], approved);
    expect(result.action).toBe('deny');
  });

  it('should check ruleset if no approved match', () => {
    const ruleset: Ruleset = [
      { permission: 'file:read', pattern: '/lib/**', action: 'allow' },
    ];

    const result = evaluate('file:read', '/lib/util.ts', ruleset, []);
    expect(result.action).toBe('allow');
  });

  it('should return prompt if no matches', () => {
    const result = evaluate('file:read', '/unknown/path', [], []);
    expect(result.action).toBe('prompt');
  });

  it('should prioritize approved rules over ruleset', () => {
    const ruleset: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'deny' },
    ];
    const approved: Ruleset = [
      { permission: 'file:read', pattern: '/src/**', action: 'allow' },
    ];

    const result = evaluate('file:read', '/src/index.ts', ruleset, approved);
    expect(result.action).toBe('allow');
  });
});

describe('DeniedError', () => {
  it('should create error with rules', () => {
    const rules: Ruleset = [
      { permission: 'file:write', pattern: '/etc/**', action: 'deny' },
    ];

    const error = new DeniedError(rules);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('DeniedError');
    expect(error.rules).toEqual(rules);
    expect(error.message).toBe('Permission denied');
  });
});
