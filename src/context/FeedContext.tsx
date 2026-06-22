import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { feedData as initialFeedData, type FeedPost } from '../data/feedData';

interface FeedContextValue {
  posts: FeedPost[];
  addPost: (post: FeedPost) => void;
}

const FeedContext = createContext<FeedContextValue | undefined>(undefined);

// Holds the feed in memory so a post made on the check-in screen actually
// shows up back on the Feed tab — both screens read/write through here
// instead of each holding their own copy.
export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<FeedPost[]>(initialFeedData);

  const addPost = useCallback((post: FeedPost) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const value = useMemo(() => ({ posts, addPost }), [posts, addPost]);

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return ctx;
}
