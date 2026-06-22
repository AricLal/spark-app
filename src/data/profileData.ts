import type { SceneType } from './feedData';

export interface TopStrainEntry {
  name: string;
  logs: number;
  rating: number;
}

// Ported 1:1 from the prototype's profile section — all static, same as
// spark.html (there's no real auth/profile data model yet, this is the
// same hardcoded "jmax" the rest of the app already uses as the current
// user, e.g. in the check-in screen).
export const profile = {
  username: 'jmax',
  location: 'Denver',
  joinedLabel: 'joined this spring',
  sessions: 137,
  strains: 24,
  spots: 9,
};

// Matches `topStrains`.
export const topStrains: TopStrainEntry[] = [
  { name: 'Blue Dream', logs: 23, rating: 5 },
  { name: 'Gelato', logs: 18, rating: 4 },
  { name: 'Runtz', logs: 14, rating: 4 },
  { name: 'Northern Lights', logs: 11, rating: 5 },
];

// Matches `cells` — the 3x3 session grid.
export const recentSessionScenes: SceneType[] = [
  'mountain', 'beach', 'campfire', 'rooftop', 'lake', 'forest', 'mountain', 'campfire', 'beach',
];
