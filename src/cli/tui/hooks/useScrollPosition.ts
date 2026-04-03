import { useCallback, useEffect, useReducer } from 'react';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface ScrollPositionState {
  offset: number;
  totalLines: number;
  viewportHeight: number;
  isAtBottom: boolean;
}

const initialState: ScrollPositionState = {
  offset: 0,
  totalLines: 0,
  viewportHeight: 0,
  isAtBottom: true,
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type ScrollAction =
  | { type: 'SCROLL_UP'; lines: number }
  | { type: 'SCROLL_DOWN'; lines: number }
  | { type: 'SCROLL_TO_TOP' }
  | { type: 'SCROLL_TO_BOTTOM' }
  | { type: 'PAGE_UP' }
  | { type: 'PAGE_DOWN' }
  | { type: 'SET_TOTAL_LINES'; totalLines: number }
  | { type: 'SET_VIEWPORT_HEIGHT'; viewportHeight: number };

function clampOffset(offset: number, totalLines: number, viewportHeight: number): number {
  const maxOffset = Math.max(0, totalLines - viewportHeight);
  return Math.max(0, Math.min(offset, maxOffset));
}

function scrollReducer(state: ScrollPositionState, action: ScrollAction): ScrollPositionState {
  const maxOffset = Math.max(0, state.totalLines - state.viewportHeight);

  switch (action.type) {
    case 'SCROLL_UP': {
      const newOffset = clampOffset(
        state.offset - action.lines,
        state.totalLines,
        state.viewportHeight
      );
      return { ...state, offset: newOffset, isAtBottom: newOffset >= maxOffset };
    }
    case 'SCROLL_DOWN': {
      const newOffset = clampOffset(
        state.offset + action.lines,
        state.totalLines,
        state.viewportHeight
      );
      return { ...state, offset: newOffset, isAtBottom: newOffset >= maxOffset };
    }
    case 'SCROLL_TO_TOP':
      return { ...state, offset: 0, isAtBottom: maxOffset === 0 };
    case 'SCROLL_TO_BOTTOM':
      return { ...state, offset: maxOffset, isAtBottom: true };
    case 'PAGE_UP': {
      const newOffset = clampOffset(
        state.offset - state.viewportHeight,
        state.totalLines,
        state.viewportHeight
      );
      return { ...state, offset: newOffset, isAtBottom: newOffset >= maxOffset };
    }
    case 'PAGE_DOWN': {
      const newOffset = clampOffset(
        state.offset + state.viewportHeight,
        state.totalLines,
        state.viewportHeight
      );
      return { ...state, offset: newOffset, isAtBottom: newOffset >= maxOffset };
    }
    case 'SET_TOTAL_LINES': {
      const newMaxOffset = Math.max(0, action.totalLines - state.viewportHeight);
      const newOffset = state.isAtBottom
        ? newMaxOffset
        : clampOffset(state.offset, action.totalLines, state.viewportHeight);
      return {
        ...state,
        totalLines: action.totalLines,
        offset: newOffset,
        isAtBottom: newOffset >= newMaxOffset,
      };
    }
    case 'SET_VIEWPORT_HEIGHT': {
      const newMaxOffset = Math.max(0, state.totalLines - action.viewportHeight);
      const newOffset = state.isAtBottom
        ? newMaxOffset
        : clampOffset(state.offset, state.totalLines, action.viewportHeight);
      return {
        ...state,
        viewportHeight: action.viewportHeight,
        offset: newOffset,
        isAtBottom: newOffset >= newMaxOffset,
      };
    }
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface UseScrollPositionOptions {
  totalLines: number;
  viewportHeight: number;
  autoScroll?: boolean;
}

export interface UseScrollPositionReturn {
  offset: number;
  isAtBottom: boolean;
  scrollUp: (lines?: number) => void;
  scrollDown: (lines?: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  pageUp: () => void;
  pageDown: () => void;
}

export function useScrollPosition(options: UseScrollPositionOptions): UseScrollPositionReturn {
  const { totalLines, viewportHeight, autoScroll = true } = options;
  const [state, dispatch] = useReducer(scrollReducer, initialState);

  // Sync totalLines from options
  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_LINES', totalLines });
  }, [totalLines]);

  // Sync viewportHeight from options
  useEffect(() => {
    dispatch({ type: 'SET_VIEWPORT_HEIGHT', viewportHeight });
  }, [viewportHeight]);

  // Auto-scroll to bottom when new content arrives (if at bottom)
  useEffect(() => {
    if (autoScroll && state.isAtBottom && totalLines > viewportHeight) {
      dispatch({ type: 'SCROLL_TO_BOTTOM' });
    }
  }, [autoScroll, state.isAtBottom, totalLines, viewportHeight]);

  const scrollUp = useCallback((lines = 1) => dispatch({ type: 'SCROLL_UP', lines }), []);
  const scrollDown = useCallback((lines = 1) => dispatch({ type: 'SCROLL_DOWN', lines }), []);
  const scrollToTop = useCallback(() => dispatch({ type: 'SCROLL_TO_TOP' }), []);
  const scrollToBottom = useCallback(() => dispatch({ type: 'SCROLL_TO_BOTTOM' }), []);
  const pageUp = useCallback(() => dispatch({ type: 'PAGE_UP' }), []);
  const pageDown = useCallback(() => dispatch({ type: 'PAGE_DOWN' }), []);

  return {
    offset: state.offset,
    isAtBottom: state.isAtBottom,
    scrollUp,
    scrollDown,
    scrollToTop,
    scrollToBottom,
    pageUp,
    pageDown,
  };
}
