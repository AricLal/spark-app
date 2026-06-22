import type { SceneType } from './feedData';

export interface MapSession {
  user: string;
  area: string;
  scene: SceneType;
  strain: string | null;
  mood: string | null;
  x: number; // 0-100, percentage position on the map
  y: number;
  friend: boolean;
  count: number; // >1 renders as a cluster pin
}

// Ported 1:1 from `mapSessions` in spark.html.
export const mapSessions: MapSession[] = [
  { user: 'maya', area: 'Highlands', scene: 'mountain', strain: 'Blue Dream', mood: '😌 Euphoric', x: 28, y: 24, friend: false, count: 1 },
  { user: 'deon', area: 'Eastside', scene: 'campfire', strain: 'Wedding Cake', mood: '🛋 Couch-lock', x: 62, y: 38, friend: true, count: 1 },
  { user: 'sage', area: 'Riverside', scene: 'beach', strain: 'Pineapple Express', mood: '😂 Giggly', x: 44, y: 72, friend: false, count: 3 },
  { user: 'kai', area: 'Downtown', scene: 'rooftop', strain: 'Gelato', mood: '🎨 Creative', x: 52, y: 50, friend: true, count: 1 },
  { user: 'rosa', area: 'North Park', scene: 'forest', strain: 'Northern Lights', mood: '🧘 Chill', x: 18, y: 18, friend: false, count: 1 },
  { user: 'theo', area: 'Lakeshore', scene: 'lake', strain: 'Runtz', mood: '😴 Sleepy', x: 80, y: 74, friend: false, count: 1 },
  { user: 'nova', area: 'West End', scene: 'lake', strain: null, mood: null, x: 14, y: 56, friend: true, count: 2 },
];
