import React from 'react';
import { PlaceholderScreen } from '../components/PlaceholderScreen';

// Stands in for <section id="checkin"> — the photo capture + optional
// strain/mood/rating flow, opened via the center Spark nav button.
export function CheckInScreen() {
  return (
    <PlaceholderScreen
      icon="✦"
      title="New session"
      subtitle="Photo capture and the optional strain/mood/rating flow go here. Not built yet."
    />
  );
}
