type RequestInitExtended = RequestInit & {
  params?: Record<string, number | Date | string>;
};

type GameLeaderboard = {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
};

type GameMarket = {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
};
