/**
 * Session Validation Utilities
 * Validates session state before operations to prevent confusing errors
 */

import { SessionManager } from '../../core/sessionManager.js';

export interface SessionValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate a session before using it
 */
export async function validateSession(sessionId: string): Promise<SessionValidationResult> {
  try {
    const sessionManager = SessionManager.getInstance();
    const session = await sessionManager.get(sessionId);

    if (!session) {
      return {
        valid: false,
        error: `Session ${sessionId} not found`,
      };
    }

    // Check for corrupted state
    if (!session.messages || !Array.isArray(session.messages)) {
      return {
        valid: false,
        error: `Session ${sessionId} has corrupted message state`,
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Failed to validate session: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
