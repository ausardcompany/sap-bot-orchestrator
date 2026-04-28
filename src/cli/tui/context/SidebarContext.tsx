import React, { createContext, useCallback, useContext, useReducer } from 'react';

import type { FileChange } from '../types/props.js';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface SidebarState {
  visible: boolean;
  width: number;
  files: FileChange[];
  selectedIndex: number;
}

const initialState: SidebarState = {
  visible: false,
  width: 30,
  files: [],
  selectedIndex: 0,
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type SidebarAction =
  | { type: 'TOGGLE_VISIBLE' }
  | { type: 'SET_VISIBLE'; visible: boolean }
  | { type: 'SET_WIDTH'; width: number }
  | { type: 'TRACK_FILE_CHANGE'; change: FileChange }
  | { type: 'CLEAR_FILE_CHANGES' }
  | { type: 'SET_SELECTED_INDEX'; index: number };

function sidebarReducer(state: SidebarState, action: SidebarAction): SidebarState {
  switch (action.type) {
    case 'TOGGLE_VISIBLE':
      return { ...state, visible: !state.visible };
    case 'SET_VISIBLE':
      return { ...state, visible: action.visible };
    case 'SET_WIDTH':
      return { ...state, width: Math.max(10, Math.min(80, action.width)) };
    case 'TRACK_FILE_CHANGE': {
      const existing = state.files.findIndex((f) => f.path === action.change.path);
      if (existing >= 0) {
        const updated = [...state.files];
        updated[existing] = action.change;
        return { ...state, files: updated };
      }
      return { ...state, files: [...state.files, action.change] };
    }
    case 'CLEAR_FILE_CHANGES':
      return { ...state, files: [], selectedIndex: 0 };
    case 'SET_SELECTED_INDEX':
      return {
        ...state,
        selectedIndex: Math.max(0, Math.min(action.index, state.files.length - 1)),
      };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface SidebarContextValue {
  visible: boolean;
  width: number;
  files: FileChange[];
  selectedIndex: number;
  toggle: () => void;
  setVisible: (visible: boolean) => void;
  setWidth: (width: number) => void;
  trackFileChange: (change: FileChange) => void;
  clearFileChanges: () => void;
  setSelectedIndex: (index: number) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const toggle = useCallback(() => dispatch({ type: 'TOGGLE_VISIBLE' }), []);
  const setVisible = useCallback(
    (visible: boolean) => dispatch({ type: 'SET_VISIBLE', visible }),
    []
  );
  const setWidth = useCallback((width: number) => dispatch({ type: 'SET_WIDTH', width }), []);
  const trackFileChange = useCallback(
    (change: FileChange) => dispatch({ type: 'TRACK_FILE_CHANGE', change }),
    []
  );
  const clearFileChanges = useCallback(() => dispatch({ type: 'CLEAR_FILE_CHANGES' }), []);
  const setSelectedIndex = useCallback(
    (index: number) => dispatch({ type: 'SET_SELECTED_INDEX', index }),
    []
  );

  const value: SidebarContextValue = {
    visible: state.visible,
    width: state.width,
    files: state.files,
    selectedIndex: state.selectedIndex,
    toggle,
    setVisible,
    setWidth,
    trackFileChange,
    clearFileChanges,
    setSelectedIndex,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (ctx === null) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return ctx;
}

export { SidebarContext };
