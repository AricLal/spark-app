import type { SceneType } from './feedData';

// Ported 1:1 from the `strains` array in spark.html — the full searchable
// catalog the check-in screen's strain field matches against.
export const strains: string[] = [
  'Blue Dream', 'Gelato', 'Wedding Cake', 'Northern Lights', 'Sour Diesel',
  'Runtz', 'OG Kush', 'Zkittlez', 'Pineapple Express', 'Girl Scout Cookies',
  'Granddaddy Purple', 'Jack Herer', 'Green Crack', 'White Widow', 'Purple Punch',
  'Gorilla Glue', 'Durban Poison', 'Bubba Kush', 'Sour Apple', 'Lemon Haze',
  'Strawberry Cough', 'AK-47', 'Trainwreck', 'Cherry Pie', 'Mimosa',
  'Sunset Sherbet', 'Do-Si-Dos', 'Forbidden Fruit', 'Apple Fritter', 'Biscotti',
  'Ice Cream Cake', 'Gushers', 'MAC', 'Animal Cookies', 'Tangie',
  'Blueberry', 'Maui Wowie', 'Super Lemon Haze', 'Pink Kush', 'Banana Kush',
];

// Matches `popular` — the quick-pick pills shown under the search field.
export const popularStrains: string[] = [
  'Blue Dream', 'Gelato', 'Runtz', 'Wedding Cake', 'Zkittlez', 'Purple Punch',
];

// Matches `moods`.
export const moods: string[] = [
  '😌 Euphoric', '🎨 Creative', '😂 Giggly', '🧘 Chill', '🛋 Couch-lock', '😴 Sleepy', '🔥 Energized',
];

// Matches `sceneCycle` — the pool the "camera" randomly picks from when you
// tap to capture, since there's no real photo (same simulated-capture
// behavior as the prototype).
export const sceneCycle: SceneType[] = [
  'mountain', 'campfire', 'beach', 'rooftop', 'forest', 'lake',
];
