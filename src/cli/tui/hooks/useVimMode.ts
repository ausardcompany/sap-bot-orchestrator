import { useCallback, useReducer } from 'react';

export type VimMode = 'normal' | 'insert' | 'visual' | 'command';

export type VimAction =
  | { type: 'insert-char'; char: string }
  | { type: 'delete-char' }
  | { type: 'delete-line' }
  | { type: 'move'; direction: 'up' | 'down' | 'left' | 'right' | 'home' | 'end' }
  | { type: 'move-word'; direction: 'forward' | 'backward' }
  | { type: 'enter-mode'; mode: VimMode }
  | { type: 'submit' }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'yank' }
  | { type: 'paste' }
  | { type: 'command'; command: string };

interface VimState {
  mode: VimMode;
  enabled: boolean;
  pendingOperator: string | null;
  count: number | null;
  commandBuffer: string;
}

type StateAction =
  | { type: 'SET_MODE'; mode: VimMode }
  | { type: 'SET_ENABLED'; enabled: boolean }
  | { type: 'SET_PENDING_OPERATOR'; operator: string | null }
  | { type: 'SET_COUNT'; count: number | null }
  | { type: 'APPEND_COMMAND'; char: string }
  | { type: 'CLEAR_COMMAND' }
  | { type: 'BACKSPACE_COMMAND' };

function vimReducer(state: VimState, action: StateAction): VimState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.mode, pendingOperator: null, count: null };
    case 'SET_ENABLED':
      return { ...state, enabled: action.enabled, mode: action.enabled ? 'normal' : 'insert' };
    case 'SET_PENDING_OPERATOR':
      return { ...state, pendingOperator: action.operator };
    case 'SET_COUNT':
      return { ...state, count: action.count };
    case 'APPEND_COMMAND':
      return { ...state, commandBuffer: state.commandBuffer + action.char };
    case 'CLEAR_COMMAND':
      return { ...state, commandBuffer: '' };
    case 'BACKSPACE_COMMAND':
      return { ...state, commandBuffer: state.commandBuffer.slice(0, -1) };
    default:
      return state;
  }
}

const MODE_INDICATORS: Record<VimMode, string> = {
  normal: '-- NORMAL --',
  insert: '-- INSERT --',
  visual: '-- VISUAL --',
  command: ':',
};

export interface VimModeReturn {
  mode: VimMode;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  modeIndicator: string;
  commandBuffer: string;
  handleKey: (
    input: string,
    key: {
      escape?: boolean;
      return?: boolean;
      backspace?: boolean;
      delete?: boolean;
      ctrl?: boolean;
    }
  ) => VimAction | null;
}

export function useVimMode(options?: { initialEnabled?: boolean }): VimModeReturn {
  const [state, dispatch] = useReducer(vimReducer, {
    mode: options?.initialEnabled ? 'normal' : 'insert',
    enabled: options?.initialEnabled ?? false,
    pendingOperator: null,
    count: null,
    commandBuffer: '',
  });

  const setEnabled = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_ENABLED', enabled });
  }, []);

  const handleKey = useCallback(
    (
      input: string,
      key: {
        escape?: boolean;
        return?: boolean;
        backspace?: boolean;
        delete?: boolean;
        ctrl?: boolean;
      }
    ): VimAction | null => {
      if (!state.enabled) {
        return null;
      }

      // Insert mode — pass through to editor
      if (state.mode === 'insert') {
        if (key.escape) {
          dispatch({ type: 'SET_MODE', mode: 'normal' });
          return { type: 'enter-mode', mode: 'normal' };
        }
        // All other input handled by the editor directly
        return null;
      }

      // Command mode
      if (state.mode === 'command') {
        if (key.escape) {
          dispatch({ type: 'SET_MODE', mode: 'normal' });
          dispatch({ type: 'CLEAR_COMMAND' });
          return { type: 'enter-mode', mode: 'normal' };
        }
        if (key.return) {
          const cmd = state.commandBuffer;
          dispatch({ type: 'SET_MODE', mode: 'normal' });
          dispatch({ type: 'CLEAR_COMMAND' });
          return { type: 'command', command: cmd };
        }
        if (key.backspace || key.delete) {
          if (state.commandBuffer.length === 0) {
            dispatch({ type: 'SET_MODE', mode: 'normal' });
            return { type: 'enter-mode', mode: 'normal' };
          }
          dispatch({ type: 'BACKSPACE_COMMAND' });
          return null;
        }
        if (input && input.length === 1) {
          dispatch({ type: 'APPEND_COMMAND', char: input });
          return null;
        }
        return null;
      }

      // Normal mode
      if (state.mode === 'normal') {
        // Mode transitions
        if (input === 'i') {
          dispatch({ type: 'SET_MODE', mode: 'insert' });
          return { type: 'enter-mode', mode: 'insert' };
        }
        if (input === 'a') {
          dispatch({ type: 'SET_MODE', mode: 'insert' });
          return { type: 'move', direction: 'right' };
        }
        if (input === 'I') {
          dispatch({ type: 'SET_MODE', mode: 'insert' });
          return { type: 'move', direction: 'home' };
        }
        if (input === 'A') {
          dispatch({ type: 'SET_MODE', mode: 'insert' });
          return { type: 'move', direction: 'end' };
        }
        if (input === 'o' || input === 'O') {
          dispatch({ type: 'SET_MODE', mode: 'insert' });
          return { type: 'enter-mode', mode: 'insert' };
        }
        if (input === 'v') {
          dispatch({ type: 'SET_MODE', mode: 'visual' });
          return { type: 'enter-mode', mode: 'visual' };
        }
        if (input === ':') {
          dispatch({ type: 'SET_MODE', mode: 'command' });
          dispatch({ type: 'CLEAR_COMMAND' });
          return { type: 'enter-mode', mode: 'command' };
        }

        // Motion keys
        if (input === 'h') {
          return { type: 'move', direction: 'left' };
        }
        if (input === 'j') {
          return { type: 'move', direction: 'down' };
        }
        if (input === 'k') {
          return { type: 'move', direction: 'up' };
        }
        if (input === 'l') {
          return { type: 'move', direction: 'right' };
        }
        if (input === '0') {
          return { type: 'move', direction: 'home' };
        }
        if (input === '$') {
          return { type: 'move', direction: 'end' };
        }
        if (input === 'w') {
          return { type: 'move-word', direction: 'forward' };
        }
        if (input === 'b') {
          return { type: 'move-word', direction: 'backward' };
        }

        // Operators
        if (input === 'x') {
          return { type: 'delete-char' };
        }
        if (input === 'u') {
          return { type: 'undo' };
        }
        if (key.ctrl && input === 'r') {
          return { type: 'redo' };
        }
        if (input === 'y') {
          return { type: 'yank' };
        }
        if (input === 'p') {
          return { type: 'paste' };
        }

        // dd — delete line (pending operator)
        if (input === 'd') {
          if (state.pendingOperator === 'd') {
            dispatch({ type: 'SET_PENDING_OPERATOR', operator: null });
            return { type: 'delete-line' };
          }
          dispatch({ type: 'SET_PENDING_OPERATOR', operator: 'd' });
          return null;
        }
      }

      // Visual mode
      if (state.mode === 'visual') {
        if (key.escape) {
          dispatch({ type: 'SET_MODE', mode: 'normal' });
          return { type: 'enter-mode', mode: 'normal' };
        }
        // Motion keys in visual mode
        if (input === 'h') {
          return { type: 'move', direction: 'left' };
        }
        if (input === 'j') {
          return { type: 'move', direction: 'down' };
        }
        if (input === 'k') {
          return { type: 'move', direction: 'up' };
        }
        if (input === 'l') {
          return { type: 'move', direction: 'right' };
        }
      }

      return null;
    },
    [state.mode, state.enabled, state.pendingOperator, state.commandBuffer]
  );

  return {
    mode: state.mode,
    enabled: state.enabled,
    setEnabled,
    modeIndicator:
      state.mode === 'command' ? `:${state.commandBuffer}` : MODE_INDICATORS[state.mode],
    commandBuffer: state.commandBuffer,
    handleKey,
  };
}
