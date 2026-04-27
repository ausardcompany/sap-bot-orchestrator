/**
 * Question state management
 * Handles pending questions and dismissal tracking
 */

export interface QuestionState {
  questionId: string;
  dismissed: boolean;
  customAnswer?: string;
  timestamp: number;
}

// Store for question states
const questionStates = new Map<string, QuestionState>();

/**
 * Mark a question as dismissed
 */
export function dismissQuestion(questionId: string): void {
  const state = questionStates.get(questionId);
  if (state) {
    state.dismissed = true;
  } else {
    questionStates.set(questionId, {
      questionId,
      dismissed: true,
      timestamp: Date.now(),
    });
  }
}

/**
 * Check if a question was dismissed
 */
export function isQuestionDismissed(questionId: string): boolean {
  return questionStates.get(questionId)?.dismissed ?? false;
}

/**
 * Set custom answer for a question
 */
export function setCustomAnswer(questionId: string, answer: string): void {
  const state = questionStates.get(questionId);
  if (state) {
    state.customAnswer = answer;
  } else {
    questionStates.set(questionId, {
      questionId,
      dismissed: false,
      customAnswer: answer,
      timestamp: Date.now(),
    });
  }
}

/**
 * Get custom answer for a question
 */
export function getCustomAnswer(questionId: string): string | undefined {
  return questionStates.get(questionId)?.customAnswer;
}

/**
 * Clear question state
 */
export function clearQuestionState(questionId: string): void {
  questionStates.delete(questionId);
}

/**
 * Clear all question states (useful for testing)
 */
export function clearAllQuestionStates(): void {
  questionStates.clear();
}
