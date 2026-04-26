import { describe, it, expect } from 'vitest';
import {
  createSuggestionState,
  autoDismissSuggestion,
  shouldBlockForSuggestion,
  type SuggestionState,
  type Suggestion,
} from '../../../src/tool/suggestion-state.js';

describe('Suggestion State', () => {
  describe('createSuggestionState', () => {
    it('should create initial state', () => {
      const state = createSuggestionState();

      expect(state.pending).toBeNull();
      expect(state.dismissed).toEqual(new Set());
      expect(state.blocking).toBe(false);
    });
  });

  describe('autoDismissSuggestion', () => {
    it('should dismiss pending suggestion on user message', () => {
      const suggestion: Suggestion = {
        id: 'test-1',
        text: 'Consider using const',
        options: ['Apply', 'Dismiss'],
        source: 'review',
      };

      const state: SuggestionState = {
        pending: suggestion,
        dismissed: new Set(),
        blocking: false,
      };

      const newState = autoDismissSuggestion(state, 'user_message');

      expect(newState.pending).toBeNull();
      expect(newState.dismissed.has('test-1')).toBe(true);
    });

    it('should dismiss on session end', () => {
      const suggestion: Suggestion = {
        id: 'test-2',
        text: 'Add error handling',
        options: ['Apply', 'Dismiss'],
        source: 'tool',
      };

      const state: SuggestionState = {
        pending: suggestion,
        dismissed: new Set(),
        blocking: false,
      };

      const newState = autoDismissSuggestion(state, 'session_end');

      expect(newState.pending).toBeNull();
      expect(newState.dismissed.has('test-2')).toBe(true);
    });

    it('should preserve existing dismissed suggestions', () => {
      const suggestion: Suggestion = {
        id: 'test-3',
        text: 'Refactor function',
        options: ['Apply', 'Dismiss'],
        source: 'followup',
      };

      const state: SuggestionState = {
        pending: suggestion,
        dismissed: new Set(['test-1', 'test-2']),
        blocking: false,
      };

      const newState = autoDismissSuggestion(state, 'user_message');

      expect(newState.dismissed.has('test-1')).toBe(true);
      expect(newState.dismissed.has('test-2')).toBe(true);
      expect(newState.dismissed.has('test-3')).toBe(true);
    });

    it('should handle no pending suggestion', () => {
      const state: SuggestionState = {
        pending: null,
        dismissed: new Set(['test-1']),
        blocking: false,
      };

      const newState = autoDismissSuggestion(state, 'user_message');

      expect(newState.pending).toBeNull();
      expect(newState.dismissed).toEqual(state.dismissed);
    });
  });

  describe('shouldBlockForSuggestion', () => {
    it('should block when blocking is true and suggestion is pending', () => {
      const suggestion: Suggestion = {
        id: 'test-4',
        text: 'Critical issue',
        options: ['Fix', 'Ignore'],
        source: 'review',
      };

      const state: SuggestionState = {
        pending: suggestion,
        dismissed: new Set(),
        blocking: true,
      };

      expect(shouldBlockForSuggestion(state)).toBe(true);
    });

    it('should not block when blocking is false', () => {
      const suggestion: Suggestion = {
        id: 'test-5',
        text: 'Minor suggestion',
        options: ['Apply', 'Dismiss'],
        source: 'tool',
      };

      const state: SuggestionState = {
        pending: suggestion,
        dismissed: new Set(),
        blocking: false,
      };

      expect(shouldBlockForSuggestion(state)).toBe(false);
    });

    it('should not block when no suggestion is pending', () => {
      const state: SuggestionState = {
        pending: null,
        dismissed: new Set(),
        blocking: true,
      };

      expect(shouldBlockForSuggestion(state)).toBe(false);
    });
  });
});
