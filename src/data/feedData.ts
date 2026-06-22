export type SceneType =
  | 'mountain'
  | 'campfire'
  | 'beach'
  | 'rooftop'
  | 'forest'
  | 'lake';

export interface FeedPost {
  id: string;
  user: string;
  location: string;
  scene: SceneType;
  strain: string | null;
  mood: string | null;
  rating: number; // 0 = no rating given
  likes: number;
  passes: number;
  caption: string;
  avatarIndex: number; // cycles through avatarGradients
}

// Ported 1:1 from the `feed` array in spark.html.
export const feedData: FeedPost[] = [
  {
    id: '1',
    user: 'maya',
    location: 'Rocky Mtn Summit',
    scene: 'mountain',
    strain: 'Blue Dream',
    mood: '😌 Euphoric',
    rating: 5,
    likes: 48,
    passes: 12,
    caption: 'made it to the top for golden hour. worth every step ⛰',
    avatarIndex: 0,
  },
  {
    id: '2',
    user: 'deon',
    location: 'Backyard Bonfire',
    scene: 'campfire',
    strain: 'Wedding Cake',
    mood: '🛋 Couch-lock',
    rating: 4,
    likes: 31,
    passes: 7,
    caption: 'fire going, crew here, nowhere to be',
    avatarIndex: 1,
  },
  {
    id: '3',
    user: 'sage',
    location: 'Venice Beach',
    scene: 'beach',
    strain: 'Pineapple Express',
    mood: '😂 Giggly',
    rating: 5,
    likes: 64,
    passes: 21,
    caption: 'sunset sesh by the water 🌅',
    avatarIndex: 2,
  },
  {
    id: '4',
    user: 'kai',
    location: 'Downtown Rooftop',
    scene: 'rooftop',
    strain: 'Gelato',
    mood: '🎨 Creative',
    rating: 4,
    likes: 27,
    passes: 5,
    caption: 'city lights hitting different tonight',
    avatarIndex: 3,
  },
  {
    id: '5',
    user: 'nova',
    location: 'Joshua Tree',
    scene: 'lake',
    strain: null,
    mood: null,
    rating: 0,
    likes: 55,
    passes: 18,
    caption: 'no notes. just this 🌅',
    avatarIndex: 1,
  },
  {
    id: '6',
    user: 'rosa',
    location: 'Aspen Trailhead',
    scene: 'forest',
    strain: 'Northern Lights',
    mood: '🧘 Chill',
    rating: 5,
    likes: 39,
    passes: 9,
    caption: 'just me and the pines',
    avatarIndex: 4,
  },
  {
    id: '7',
    user: 'theo',
    location: 'Lake Tahoe',
    scene: 'lake',
    strain: 'Runtz',
    mood: '😴 Sleepy',
    rating: 4,
    likes: 42,
    passes: 11,
    caption: 'last light on the water, perfect end to the day',
    avatarIndex: 0,
  },
];
