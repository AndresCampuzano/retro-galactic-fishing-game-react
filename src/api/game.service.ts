import { fetchFromService } from "../utils/fetchFromService.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export function fetchGameLeaderboard(): Promise<GameLeaderboard[]> {
  return fetchFromService<GameLeaderboard[]>(BASE_URL, "/game/leaderboard", {
    method: "GET",
  });
}

export function fetchGameMarket(): Promise<GameMarket[]> {
  return fetchFromService<GameMarket[]>(BASE_URL, "/game/market", {
    method: "GET",
  });
}
