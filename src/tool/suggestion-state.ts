/**
 * Suggestion state management for auto-dismissal
 */

export interface SuggestionState {
  pending: Suggestion | null;
  dismissed: Set<string>;
  blocking: boolean;
}

export interface Suggestion {
  id: string;
  text: string;
  options: string[];
  source: 'review' | 'followup' | 'tool';
}

/**
 * Create initial suggestion state
 */
export function createSuggestionState(): SuggestionState {
  return {
    pending: null,
    dismissed: new Set(),
    blocking: false,
  };
}

/**
 * Auto-dismiss suggestion when user queues a new message
 * This allows suggestions to be non-blocking
 */
export function autoDismissSuggestion(
  state: SuggestionState,
  reason: 'user_message' | 'session_end'
): SuggestionState {
  if (!state.pending) {
    return state;
  }

  const newDismissed = new Set(state.dismissed);
  newDismissed.add(state.pending.id);

  return {
    ...state,
    pending: null,
    dismissed: newDismissed,
  };
}

/**
 * Check if suggestion should block execution
 * Non-blocking suggestions render inline in conversation
 */
export function shouldBlockForSuggestion(state: SuggestionState): boolean {
  return state.blocking && state.pending !== null;
}
