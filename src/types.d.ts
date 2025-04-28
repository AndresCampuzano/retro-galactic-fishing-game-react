interface RequestInitExtended extends RequestInit {
  params?: Record<string, number | Date | string>;
}

interface User {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
  fishEmojis: string;
  emojiDescription: string;
  isInfected: boolean;
}

interface GameLeaderboard {
  players: User[];
}

interface GameMarket {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
}
