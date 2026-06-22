import React from 'react';
import { PlaceholderScreen } from '../components/PlaceholderScreen';

// Stands in for <section id="activity"> — cheers, comments, friend
// requests, and "sparked near you" notifications.
export function ActivityScreen() {
  return (
    <PlaceholderScreen
      icon="♡"
      title="Activity"
      subtitle="Cheers, comments, and friend requests will land here. Not built yet."
    />
  );
}
