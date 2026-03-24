import { describe, it, expect, vi, beforeEach } from 'vitest';
import { drainCovered } from '../drain.js';

describe('drainCovered', () => {
  const mockEvents = {
    Replied: 'permission.replied',
  };

  class MockDeniedError extends Error {
    constructor(public rules: any[]) {
      super('Permission denied');
    }
  }

  const mockEvaluate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should auto-approve pending permissions covered by new allow rules', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/project/src/*'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved = [{ permission: 'file:write', pattern: '/project/*', action: 'allow' }];

    mockEvaluate.mockReturnValue({ action: 'allow' });

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError);

    expect(resolve).toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
  });

  it('should auto-deny pending permissions covered by new deny rules', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'bash',
          patterns: ['rm -rf /'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved = [{ permission: 'bash', pattern: '*', action: 'deny' }];

    mockEvaluate.mockReturnValue({ action: 'deny' });

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError);

    expect(reject).toHaveBeenCalled();
    expect(resolve).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
  });

  it('should skip the excluded request ID', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/project/*'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved = [{ permission: 'file:write', pattern: '/project/*', action: 'allow' }];

    mockEvaluate.mockReturnValue({ action: 'allow' });

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError, 'req-1');

    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeDefined();
  });

  it('should not resolve partially covered permissions', async () => {
    const resolve = vi.fn();
    const reject = vi.fn();

    const pending = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/project/src/*', '/project/config/*'],
        },
        ruleset: [],
        resolve,
        reject,
      },
    };

    const approved = [{ permission: 'file:write', pattern: '/project/src/*', action: 'allow' }];

    // First pattern allowed, second asks
    mockEvaluate
      .mockReturnValueOnce({ action: 'allow' })
      .mockReturnValueOnce({ action: 'ask' });

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError);

    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeDefined();
  });

  it('should handle multiple pending permissions', async () => {
    const resolve1 = vi.fn();
    const reject1 = vi.fn();
    const resolve2 = vi.fn();
    const reject2 = vi.fn();

    const pending = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/project/src/*'],
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
          patterns: ['/project/src/*'],
        },
        ruleset: [],
        resolve: resolve2,
        reject: reject2,
      },
    };

    const approved = [{ permission: 'file:write', pattern: '/project/*', action: 'allow' }];

    mockEvaluate.mockReturnValue({ action: 'allow' });

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError);

    expect(resolve1).toHaveBeenCalled();
    expect(resolve2).toHaveBeenCalled();
    expect(reject1).not.toHaveBeenCalled();
    expect(reject2).not.toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
    expect(pending['req-2']).toBeUndefined();
  });

  it('should handle mixed allow and deny outcomes', async () => {
    const resolve1 = vi.fn();
    const reject1 = vi.fn();
    const resolve2 = vi.fn();
    const reject2 = vi.fn();

    const pending = {
      'req-1': {
        info: {
          id: 'req-1',
          sessionID: 'session-1',
          permission: 'file:write',
          patterns: ['/project/src/*'],
        },
        ruleset: [],
        resolve: resolve1,
        reject: reject1,
      },
      'req-2': {
        info: {
          id: 'req-2',
          sessionID: 'session-2',
          permission: 'bash',
          patterns: ['rm -rf /'],
        },
        ruleset: [],
        resolve: resolve2,
        reject: reject2,
      },
    };

    const approved = [
      { permission: 'file:write', pattern: '/project/*', action: 'allow' },
      { permission: 'bash', pattern: '*', action: 'deny' },
    ];

    // First request: allow, second request: deny
    mockEvaluate
      .mockReturnValueOnce({ action: 'allow' })
      .mockReturnValueOnce({ action: 'deny' });

    await drainCovered(pending, approved, mockEvaluate, mockEvents, MockDeniedError);

    expect(resolve1).toHaveBeenCalled();
    expect(reject1).not.toHaveBeenCalled();
    expect(resolve2).not.toHaveBeenCalled();
    expect(reject2).toHaveBeenCalled();
    expect(pending['req-1']).toBeUndefined();
    expect(pending['req-2']).toBeUndefined();
  });
});
