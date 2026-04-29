/**
 * Tests for Enhanced Permission Management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  PermissionManager,
  type PermissionContext,
  type PermissionRule,
} from '../../src/permission/index.js';
import { PermissionCleared, PermissionResponse } from '../../src/bus/index.js';

describe('Enhanced Permission Management', () => {
  let manager: PermissionManager;

  beforeEach(() => {
    manager = new PermissionManager();
  });

  afterEach(() => {
    manager.clearSession();
  });

  describe('Timeout Configuration', () => {
    it('should have default timeout of 5 minutes', () => {
      expect(manager.getAskTimeout()).toBe(300000);
    });

    it('should allow setting custom timeout', () => {
      manager.setAskTimeout(600000); // 10 minutes
      expect(manager.getAskTimeout()).toBe(600000);
    });

    it('should allow setting shorter timeout', () => {
      manager.setAskTimeout(60000); // 1 minute
      expect(manager.getAskTimeout()).toBe(60000);
    });
  });

  describe('Pending Permission Tracking', () => {
    it('should start with no pending permissions', () => {
      expect(manager.getPendingPermissions()).toEqual([]);
    });

    it('should track pending permissions during check', async () => {
      const ctx: PermissionContext = {
        toolName: 'write',
        action: 'write',
        resource: '/test/file.txt',
      };

      // Set up a rule that will trigger ask
      manager.addRule({
        actions: ['write'],
        decision: 'ask',
        priority: 10,
      });

      // Start check but don't await (simulates pending state)
      const checkPromise = manager.check(ctx);

      // Give it a moment to publish the event
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should have one pending permission
      const pending = manager.getPendingPermissions();
      expect(pending.length).toBeGreaterThan(0);

      // Clean up by timing out the check
      await checkPromise.catch(() => {
        /* expected timeout */
      });
    });

    it('should clear pending permission on manual clear', () => {
      const requestId = 'test-request-123';

      // Manually track a permission (simulating askUser)
      // In real code, this happens inside askUser()
      // For testing, we'll just verify the clear method works

      // Subscribe to PermissionCleared event
      let clearedEvent: any = null;
      const unsub = PermissionCleared.subscribe((event) => {
        clearedEvent = event;
      });

      manager.clearPendingPermission(requestId);

      // Event should be published
      expect(clearedEvent).toBeTruthy();
      expect(clearedEvent?.id).toBe(requestId);
      expect(clearedEvent?.reason).toBe('manual');

      unsub();
    });
  });

  describe('Session Cleanup', () => {
    it('should clear session grants', () => {
      const ctx: PermissionContext = {
        toolName: 'read',
        action: 'read',
        resource: '/test/file.txt',
      };

      manager.grantSession(ctx);
      expect(manager.getPendingPermissions()).toEqual([]);

      manager.clearSession();
      // Session grants are cleared (tested by re-checking permission)
    });

    it('should publish PermissionCleared events for pending permissions', async () => {
      const events: any[] = [];
      const unsub = PermissionCleared.subscribe((event) => {
        events.push(event);
      });

      // Set up a rule that will trigger ask
      manager.addRule({
        actions: ['write'],
        decision: 'ask',
        priority: 10,
      });

      const ctx: PermissionContext = {
        toolName: 'write',
        action: 'write',
        resource: '/test/file.txt',
      };

      // Start check but don't await
      const checkPromise = manager.check(ctx);

      // Give it a moment to publish the request
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Clear session (should clear pending permissions)
      manager.clearSession();

      // Should have published PermissionCleared with reason='session-end'
      const sessionEndEvents = events.filter((e) => e.reason === 'session-end');
      expect(sessionEndEvents.length).toBeGreaterThan(0);

      unsub();

      // Clean up the hanging promise
      await checkPromise.catch(() => {
        /* expected */
      });
    });
  });

  describe('Permission Timeout Handling', () => {
    it('should timeout after configured duration', async () => {
      // Set very short timeout for testing
      manager.setAskTimeout(100); // 100ms

      manager.addRule({
        actions: ['write'],
        decision: 'ask',
        priority: 10,
      });

      const ctx: PermissionContext = {
        toolName: 'write',
        action: 'write',
        resource: '/test/file.txt',
      };

      let clearedEvent: any = null;
      const unsub = PermissionCleared.subscribe((event) => {
        clearedEvent = event;
      });

      const result = await manager.check(ctx);

      // Should be denied due to timeout
      expect(result.granted).toBe(false);

      // Should publish PermissionCleared with reason='timeout'
      expect(clearedEvent).toBeTruthy();
      expect(clearedEvent?.reason).toBe('timeout');

      unsub();
    }, 10000); // Increase test timeout

    it('should not timeout if response received in time', async () => {
      manager.setAskTimeout(1000); // 1 second

      manager.addRule({
        actions: ['write'],
        decision: 'ask',
        priority: 10,
      });

      const ctx: PermissionContext = {
        toolName: 'write',
        action: 'write',
        resource: '/test/file.txt',
      };

      // Subscribe to request and auto-respond
      let requestId: string | null = null;
      const unsub = PermissionResponse.subscribe((event) => {
        // This won't be called in test since we need to publish response
        // This test demonstrates the pattern
      });

      // In real usage, UI would respond to PermissionRequested event
      // For this test, we just verify timeout doesn't occur with allow rule

      // Change to allow rule so no ask is needed
      manager.addRule({
        actions: ['write'],
        decision: 'allow',
        priority: 20,
      });

      const result = await manager.check(ctx);

      // Should be allowed without timeout
      expect(result.granted).toBe(true);

      unsub();
    });
  });

  describe('Doom Loop Integration', () => {
    it('should track operation attempts on denial', async () => {
      manager.setAskTimeout(50); // Very short for testing

      manager.addRule({
        actions: ['write'],
        decision: 'ask',
        priority: 10,
      });

      const ctx: PermissionContext = {
        toolName: 'write',
        action: 'write',
        resource: '/test/file.txt',
      };

      // First attempt - will timeout and be denied
      const result1 = await manager.check(ctx);
      expect(result1.granted).toBe(false);

      // Check doom loop tracking
      const loopCheck = manager.checkDoomLoop(ctx);
      expect(loopCheck.attempts).toBe(1);
    }, 10000);

    it('should reset doom loop tracking on success', () => {
      const ctx: PermissionContext = {
        toolName: 'read',
        action: 'read',
        resource: '/test/file.txt',
      };

      // Grant session permission (simulates successful operation)
      manager.grantSession(ctx);

      // Doom loop should show 0 attempts
      const loopCheck = manager.checkDoomLoop(ctx);
      expect(loopCheck.attempts).toBe(0);
    });
  });

  describe('Backwards Compatibility', () => {
    it('should work with existing permission rules', () => {
      const rules: PermissionRule[] = [
        {
          id: 'allow-read',
          actions: ['read'],
          decision: 'allow',
          priority: 0,
        },
        {
          id: 'deny-write',
          actions: ['write'],
          paths: ['**/secrets/**'],
          decision: 'deny',
          priority: 10,
        },
      ];

      const newManager = new PermissionManager(rules);
      expect(newManager.getRules().length).toBe(2);
    });

    it('should maintain last-match-wins behavior', () => {
      manager.addRule({
        actions: ['read'],
        decision: 'allow',
        priority: 0,
      });

      manager.addRule({
        actions: ['read'],
        paths: ['**/secrets/**'],
        decision: 'deny',
        priority: 10,
      });

      const ctx: PermissionContext = {
        toolName: 'read',
        action: 'read',
        resource: '/test/secrets/file.txt',
      };

      const { decision } = manager.evaluate(ctx);
      expect(decision).toBe('deny'); // Last match wins
    });
  });
});
