import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { SessionDetailData } from '../types/session';

interface SessionDetailContextValue {
  session: SessionDetailData | null;
  openSession: (session: SessionDetailData) => void;
  closeSession: () => void;
}

const SessionDetailContext = createContext<SessionDetailContextValue | undefined>(undefined);

// Mirrors the prototype's #sessionView: a single global overlay, not a
// routed screen, so it can slide in on top of everything — including the
// bottom nav bar — regardless of which tab is active underneath. Anything
// that can open a session (a feed card, a map pin) just calls openSession().
export function SessionDetailProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionDetailData | null>(null);

  const openSession = useCallback((s: SessionDetailData) => setSession(s), []);
  const closeSession = useCallback(() => setSession(null), []);

  const value = useMemo(
    () => ({ session, openSession, closeSession }),
    [session, openSession, closeSession]
  );

  return (
    <SessionDetailContext.Provider value={value}>{children}</SessionDetailContext.Provider>
  );
}

export function useSessionDetail() {
  const ctx = useContext(SessionDetailContext);
  if (!ctx) {
    throw new Error('useSessionDetail must be used within a SessionDetailProvider');
  }
  return ctx;
}
