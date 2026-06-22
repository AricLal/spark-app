import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { IncomingRequest, SuggestedPerson } from '../types/friend';

// Ported 1:1 from `incoming` / `suggested` in spark.html.
const initialIncoming: IncomingRequest[] = [
  { id: 'rosa', user: 'rosa', avatarIndex: 4, subtitle: '3 mutual friends', status: 'pending' },
  { id: 'leo', user: 'leo', avatarIndex: 1, subtitle: '2 mutual friends', status: 'pending' },
];

const initialSuggested: SuggestedPerson[] = [
  { id: 'priya', user: 'priya', avatarIndex: 3, subtitle: 'Friends with maya', status: 'idle' },
  { id: 'marcus', user: 'marcus', avatarIndex: 0, subtitle: '5 mutual friends', status: 'idle' },
  { id: 'jade', user: 'jade', avatarIndex: 2, subtitle: 'Friends with kai', status: 'idle' },
];

interface FriendsContextValue {
  isOpen: boolean;
  openFriends: () => void;
  closeFriends: () => void;
  incoming: IncomingRequest[];
  suggested: SuggestedPerson[];
  pendingCount: number;
  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
  sendRequest: (id: string) => void;
}

const FriendsContext = createContext<FriendsContextValue | undefined>(undefined);

// One mutual-accept friend model shared by both the Friends panel and the
// Activity screen — Rosa's request shows up in both places in the
// prototype, so a single source of truth here means accepting it in
// either spot reflects everywhere, rather than each screen tracking its
// own disconnected copy of the same request.
export function FriendsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [incoming, setIncoming] = useState<IncomingRequest[]>(initialIncoming);
  const [suggested, setSuggested] = useState<SuggestedPerson[]>(initialSuggested);

  const openFriends = useCallback(() => setIsOpen(true), []);
  const closeFriends = useCallback(() => setIsOpen(false), []);

  const acceptRequest = useCallback((id: string) => {
    setIncoming((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
  }, []);

  const declineRequest = useCallback((id: string) => {
    setIncoming((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'declined' } : r))
    );
  }, []);

  const sendRequest = useCallback((id: string) => {
    setSuggested((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'sent' } : s))
    );
  }, []);

  const pendingCount = useMemo(
    () => incoming.filter((r) => r.status === 'pending').length,
    [incoming]
  );

  const value = useMemo<FriendsContextValue>(
    () => ({
      isOpen,
      openFriends,
      closeFriends,
      incoming,
      suggested,
      pendingCount,
      acceptRequest,
      declineRequest,
      sendRequest,
    }),
    [isOpen, openFriends, closeFriends, incoming, suggested, pendingCount, acceptRequest, declineRequest, sendRequest]
  );

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export function useFriends() {
  const ctx = useContext(FriendsContext);
  if (!ctx) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return ctx;
}
