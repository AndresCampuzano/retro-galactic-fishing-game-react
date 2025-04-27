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
