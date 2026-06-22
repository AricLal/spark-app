import type { SceneType } from '../data/feedData';

// The shape buildSessionView(s) takes in the prototype — whatever opens the
// detail view (a feed card, a map pin) normalizes its own data into this
// before calling openSession().
export interface SessionDetailData {
  user: string;
  avatarIndex: number;
  location: string;
  scene: SceneType;
  strain: string | null;
  mood: string | null;
  rating: number;
  likes: number;
  passes: number;
  caption: string;
}
