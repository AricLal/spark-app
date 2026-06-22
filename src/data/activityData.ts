import type { SceneType } from './feedData';

export interface ActivityEntry {
  id: string;
  user: string;
  avatarIndex: number;
  badgeIcon: string;
  badgeColor: string;
  /** Text after the bolded username, e.g. " passed you a hit" — leading space intentional. */
  actionText: string;
  time: string;
  thumb?: SceneType;
  isRequest?: boolean;
  unread?: boolean;
}

export interface ActivityGroup {
  day: string;
  items: ActivityEntry[];
}

// Ported 1:1 from the `activity` array in spark.html. Badge colors are the
// resolved values behind .k-cheer/.k-follow/.k-spark (k-puff exists in the
// prototype's CSS but isn't actually used by any entry here, same as the
// original).
const K_CHEER = '#ff7a36'; // colors.ember
const K_FOLLOW = '#b99cc9'; // colors.plum
const K_SPARK = '#6aa88a';

export const activityData: ActivityGroup[] = [
  {
    day: 'Today',
    items: [
      {
        id: 'a1',
        user: 'maya',
        avatarIndex: 0,
        badgeIcon: '💨',
        badgeColor: K_CHEER,
        actionText: ' passed you a hit',
        time: '12m ago',
        thumb: 'mountain',
        unread: true,
      },
      {
        id: 'a2',
        user: 'deon',
        avatarIndex: 1,
        badgeIcon: '🌿',
        badgeColor: K_SPARK,
        actionText: ' sparked one near you · Eastside',
        time: '34m ago',
        thumb: 'campfire',
        unread: true,
      },
      {
        id: 'a3',
        user: 'rosa',
        avatarIndex: 4,
        badgeIcon: '+',
        badgeColor: K_FOLLOW,
        actionText: ' sent you a friend request',
        time: '1h ago',
        isRequest: true,
        unread: true,
      },
    ],
  },
  {
    day: 'Earlier',
    items: [
      {
        id: 'a4',
        user: 'sage',
        avatarIndex: 2,
        badgeIcon: '♥',
        badgeColor: K_CHEER,
        actionText: ' and 3 others liked your Joshua Tree post',
        time: 'Yesterday',
        thumb: 'lake',
      },
      {
        id: 'a5',
        user: 'kai',
        avatarIndex: 3,
        badgeIcon: '💬',
        badgeColor: K_CHEER,
        actionText: ' commented: "where is this?? need to go"',
        time: 'Yesterday',
        thumb: 'rooftop',
      },
      {
        id: 'a6',
        user: 'theo',
        avatarIndex: 0,
        badgeIcon: '🌿',
        badgeColor: K_SPARK,
        actionText: ' sparked Runtz nearby · Lakeshore',
        time: '2d ago',
        thumb: 'lake',
      },
    ],
  },
];
