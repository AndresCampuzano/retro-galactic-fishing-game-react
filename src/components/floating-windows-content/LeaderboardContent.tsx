import { useState, useEffect, useMemo } from "react";
import { ErrorMessage } from "../common/ErrorMessage";

enum SORTING {
  RANK = "rank",
  LEVEL = "level",
  XP = "xp",
  GOLD = "gold",
  INFECTED = "infected",
}

export const LeaderboardContent = ({
  data,
  loading,
  error,
  retryFetch,
}: {
  data: GameLeaderboard | null;
  loading: boolean;
  error: Error | null;
  retryFetch: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(SORTING.RANK); // Default sort by rank

  // NOTE: I'm simulating a delay here, debounce is often used to prevent excessive API requests,
  // but since we're not making any API calls when searchTerm changes, it's just for the sake of the example.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredPlayers = useMemo(() => {
    if (!data?.players) return [];
    const search = debouncedSearchTerm.toLowerCase();
    const filtered = data.players.filter((player) => {
      return (
        player.username.toLowerCase().includes(search) ||
        player.rank.toString().includes(search) ||
        player.level.toString().includes(search) ||
        player.xp.toString().includes(search) ||
        player.gold.toString().includes(search) ||
        player.fishEmojis.toLowerCase().includes(search) ||
        player.emojiDescription.toLowerCase().includes(search)
      );
    });

    // Sort based on the selected option
    return filtered.sort((a, b) => {
      if (sortOption === SORTING.RANK) return a.rank - b.rank;
      if (sortOption === SORTING.LEVEL) return b.level - a.level;
      if (sortOption === SORTING.XP) return b.xp - a.xp;
      if (sortOption === SORTING.GOLD) return b.gold - a.gold;
      if (sortOption === SORTING.INFECTED)
        return (b.isInfected ? 1 : 0) - (a.isInfected ? 1 : 0);
      return 0;
    });
  }, [debouncedSearchTerm, data?.players, sortOption]);

  return (
    <>
      <div className="flex gap-2">
        <h1 className="text-[40px]">Leader-board</h1>
        <img
          src="images/leaderboard.png"
          alt="leaderboard icon"
          className="w-6 object-contain"
        />
      </div>
      <div className="flex gap-2 mb-2">
        <p className="text-xl">
          Showing all players in the game, ranked by their performance.
        </p>
        <img
          src="images/coin_gold_x2.png"
          alt="gold coin"
          className="w-6 object-contain"
        />
        <img
          src="images/coin_silver_x2.png"
          alt="silver coin"
          className="w-6 object-contain"
        />
        <img
          src="images/coin_bronze_x2.png"
          alt="bronze coin"
          className="w-6 object-contain"
        />
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="relative flex items-center w-full md:max-w-[60%]">
          <input
            type="text"
            placeholder="Search by username, rank, level, xp, gold, fish emojis..."
            value={searchTerm}
            disabled={loading || error !== null}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 p-2 w-full bg-gray-200 text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm.trim() && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 flex justify-center items-center p-[2px] h-[23px] w-[23px] bg-[#c3c3c3] border-t-[2.5px] border-l-[2.5px] border-l-white border-t-white border-r-[2.5px] border-r-black border-b-[2.5px] border-b-black cursor-pointer active:bg-gray-500"
            >
              <img src="images/close-icon.png" alt="close" width={10} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p>Sort by:</p>
          <select
            value={sortOption}
            disabled={loading || error !== null}
            onChange={(e) => setSortOption(e.target.value as SORTING)}
            className="border border-gray-400 p-2 bg-gray-200 text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={SORTING.RANK}>Rank</option>
            <option value={SORTING.LEVEL}>Level</option>
            <option value={SORTING.XP}>XP</option>
            <option value={SORTING.GOLD}>Gold</option>
            <option value={SORTING.INFECTED}>Infected</option>
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage error={error} retryFetch={retryFetch} />}

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlayers?.map((item) => (
          <li
            key={item.username}
            className={`relative flex flex-col border-black m-5 p-2 border-2 ${
              item.rank === 1
                ? "bg-[#FFD700]"
                : item.rank === 2
                  ? "bg-[#E5E5E5]"
                  : item.rank === 3
                    ? "bg-[#b87333]"
                    : "bg-gray-300"
            }`}
          >
            {item.rank <= 3 && (
              <img
                src={`images/${
                  item.rank === 1
                    ? "coin_gold"
                    : item.rank === 2
                      ? "coin_silver"
                      : "coin_bronze"
                }_x2.png`}
                alt="rank coin"
                title={`Rank ${item.rank}`}
                className="w-10 absolute -top-4 -left-4"
              />
            )}

            {item.isInfected && (
              <img
                src="images/spider.png"
                alt="spider card"
                title="Infected player"
                className="w-8 absolute -top-4 -right-4"
              />
            )}
            <div className="flex flex-col items-center mb-2">
              <p className="text-lg leading-none">#{item.rank}</p>
              <p className="text-xl leading-none">{item.username}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="images/freecell.png"
                alt="freecell level"
                className="w-5"
              />
              <p className="ml-1">Level {item.level}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="images/joystick.png"
                alt="joystick xp"
                className="w-5"
              />
              <p className="ml-1">XP {item.xp}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="images/coin_gold_x2.png"
                alt="gold coin"
                className="w-6"
              />
              <p className="">Gold {item.gold}</p>
            </div>
            <p>
              {item.fishEmojis} {item.emojiDescription}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
