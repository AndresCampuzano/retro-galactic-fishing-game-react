interface RequestInitExtended extends RequestInit {
  params?: Record<string, number | Date | string>;
}

interface Player {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
  fishEmojis: string;
  emojiDescription: string;
  isInfected: boolean;
}

interface Item {
  id: string;
  name: string;
  type:
    | "poison_delay"
    | "poison_recovery"
    | "poison_leveling"
    | "fishing_rod"
    | "poison_reveal_fishes";
  description: string;
  cost: number;
}

interface GameLeaderboard {
  players: Player[];
}

interface GameMarket {
  items: Item[];
}
