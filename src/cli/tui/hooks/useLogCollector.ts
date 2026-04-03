import { useCallback, useEffect, useReducer } from 'react';

import {
  ToolExecutionStarted,
  ToolExecutionCompleted,
  ToolExecutionFailed,
  ErrorOccurred,
  AgentSwitched,
} from '../../../bus/index.js';
import type { LogEntry } from '../types/props.js';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface LogCollectorState {
  entries: LogEntry[];
}

type LogAction = { type: 'ADD_ENTRY'; entry: LogEntry } | { type: 'CLEAR' };

function logReducer(state: LogCollectorState, action: LogAction): LogCollectorState {
  switch (action.type) {
    case 'ADD_ENTRY':
      return { entries: [...state.entries, action.entry] };
    case 'CLEAR':
      return { entries: [] };
    default:
      return state;
  }
}

let entryCounter = 0;

function makeEntry(
  level: LogEntry['level'],
  source: string,
  message: string,
  data?: unknown
): LogEntry {
  entryCounter += 1;
  return {
    id: `log-${entryCounter}`,
    timestamp: Date.now(),
    level,
    source,
    message,
    data: data ?? null,
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface UseLogCollectorReturn {
  entries: LogEntry[];
  clear: () => void;
  filterByLevel: (level: LogEntry['level'] | 'all') => LogEntry[];
  search: (query: string) => LogEntry[];
}

export function useLogCollector(): UseLogCollectorReturn {
  const [state, dispatch] = useReducer(logReducer, { entries: [] });

  useEffect(() => {
    const unsubs: Array<() => void> = [];

    unsubs.push(
      ToolExecutionStarted.subscribe((p) => {
        dispatch({
          type: 'ADD_ENTRY',
          entry: makeEntry('info', `tool:${p.toolName}`, `Started: ${p.toolName}`, p.parameters),
        });
      })
    );

    unsubs.push(
      ToolExecutionCompleted.subscribe((p) => {
        dispatch({
          type: 'ADD_ENTRY',
          entry: makeEntry(
            'info',
            `tool:${p.toolName}`,
            `Completed: ${p.toolName} (${p.duration}ms)`,
            p.result
          ),
        });
      })
    );

    unsubs.push(
      ToolExecutionFailed.subscribe((p) => {
        dispatch({
          type: 'ADD_ENTRY',
          entry: makeEntry('error', `tool:${p.toolName}`, `Failed: ${p.toolName} — ${p.error}`),
        });
      })
    );

    unsubs.push(
      ErrorOccurred.subscribe((p) => {
        dispatch({
          type: 'ADD_ENTRY',
          entry: makeEntry('error', p.source, p.message),
        });
      })
    );

    unsubs.push(
      AgentSwitched.subscribe((p) => {
        dispatch({
          type: 'ADD_ENTRY',
          entry: makeEntry(
            'info',
            'router',
            `Agent switched: ${p.from ?? 'none'} → ${p.to}${p.reason ? ` (${p.reason})` : ''}`
          ),
        });
      })
    );

    return () => {
      for (const unsub of unsubs) {
        unsub();
      }
    };
  }, []);

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const filterByLevel = useCallback(
    (level: LogEntry['level'] | 'all'): LogEntry[] => {
      if (level === 'all') {
        return state.entries;
      }
      return state.entries.filter((e) => e.level === level);
    },
    [state.entries]
  );

  const search = useCallback(
    (query: string): LogEntry[] => {
      const lower = query.toLowerCase();
      return state.entries.filter(
        (e) => e.message.toLowerCase().includes(lower) || e.source.toLowerCase().includes(lower)
      );
    },
    [state.entries]
  );

  return {
    entries: state.entries,
    clear,
    filterByLevel,
    search,
  };
}
