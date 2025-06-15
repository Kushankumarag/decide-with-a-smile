
export type Mood = 'chaotic' | 'chill' | 'productivity' | 'sassy' | 'logical';

export interface DecisionHistoryItem {
  id: string;
  options: string[];
  context: string;
  selectedOption: string;
  mode: string;
  mood?: Mood;
  timestamp: Date;
  regretted?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface FriendPoll {
  id: string;
  question: string;
  options: string[];
  votes: { [option: string]: number };
  reactions: { [option: string]: string[] };
  createdAt: Date;
  isActive: boolean;
}

export type DecisionArchetype = 
  | 'vibe-chaser' 
  | 'spreadsheet-queen' 
  | 'procrastination-warrior' 
  | 'chaos-agent' 
  | 'overthinking-genius';

export interface UserProfile {
  archetype?: DecisionArchetype;
  mascot?: string;
  chaosLevel: number; // 0-100 scale
  completedQuiz: boolean;
}

export interface DailyDilemma {
  id: string;
  question: string;
  options: string[];
  date: string;
  category: string;
}
