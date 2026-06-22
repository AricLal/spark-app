import React from 'react';
import { PlaceholderScreen } from '../components/PlaceholderScreen';

// Stands in for <section id="map"> until the live map (friends' sessions as
// glowing pins, Everyone/Friends filter) gets built.
export function MapScreen() {
  return (
    <PlaceholderScreen
      icon="◈"
      title="Live map"
      subtitle="Friends' sessions will show up here as glowing pins. Not built yet."
    />
  );
}
