import React, { createContext, useCallback, useContext, useState } from 'react';

export type PageName = 'chat' | 'logs';

export interface PageContextValue {
  page: PageName;
  setPage: (page: PageName) => void;
  togglePage: () => void;
}

const PageContext = createContext<PageContextValue | null>(null);

export function PageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [page, setPageState] = useState<PageName>('chat');

  const setPage = useCallback((p: PageName) => {
    setPageState(p);
  }, []);

  const togglePage = useCallback(() => {
    setPageState((prev) => (prev === 'chat' ? 'logs' : 'chat'));
  }, []);

  const value: PageContextValue = {
    page,
    setPage,
    togglePage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage(): PageContextValue {
  const ctx = useContext(PageContext);
  if (ctx === null) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return ctx;
}

export { PageContext };
