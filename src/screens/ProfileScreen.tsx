import React from 'react';
import { PlaceholderScreen } from '../components/PlaceholderScreen';

// Stands in for <section id="profile"> — stats, top-strains leaderboard,
// and the session grid.
export function ProfileScreen() {
  return (
    <PlaceholderScreen
      icon="◔"
      title="You"
      subtitle="Your stats, top strains, and session grid will live here. Not built yet."
    />
  );
}
