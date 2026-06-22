export interface IncomingRequest {
  id: string;
  user: string;
  avatarIndex: number;
  subtitle: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface SuggestedPerson {
  id: string;
  user: string;
  avatarIndex: number;
  subtitle: string;
  status: 'idle' | 'sent';
}
