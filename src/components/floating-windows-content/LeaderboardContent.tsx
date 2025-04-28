import { useState, useEffect, useMemo } from "react";

export const LeaderboardContent = ({
  data,
  loading,
  error,
}: {
  data: GameLeaderboard | null;
  loading: boolean;
  error: Error | null;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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
    return data.players.filter((player) => {
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
  }, [debouncedSearchTerm, data?.players]);

  return (
    <>
      <h1 className="text-xl">Leader-board</h1>
      <input
        type="text"
        placeholder="Search by username, rank, level, xp, gold, fish emojis..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-400 p-2 mb-4 w-full bg-gray-200 text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {filteredPlayers.map((item) => (
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
                className="w-10 absolute -top-4 -left-4"
              />
            )}

            {item.isInfected && (
              <img
                src="images/spider.png"
                alt="spider card"
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
