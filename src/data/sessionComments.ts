export interface SessionComment {
  id: string;
  user: string;
  avatarIndex: number;
  text: string;
}

// Matches `sampleComments` in the prototype — the same two demo comments
// show under every session, exactly as in spark.html.
export const sampleComments: SessionComment[] = [
  { id: 'c1', user: 'kai', avatarIndex: 3, text: 'where is this?? need to go 🙏' },
  { id: 'c2', user: 'rosa', avatarIndex: 4, text: 'unreal 🔥' },
];
