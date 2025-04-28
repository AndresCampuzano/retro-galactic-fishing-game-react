export const LeaderboardContent = ({
  data,
  loading,
  error,
}: {
  data: GameLeaderboard | null;
  loading: boolean;
  error: Error | null;
}) => {
  return (
    <>
      <p>LeaderboardContent here</p>
      <ul className="grid grid-cols-4 grid-rows-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data?.players?.map((item, index) => (
          <li
            key={item.username} // Assuming username is unique
            className={`relative flex flex-col border-black m-5 p-2 border-2 ${
              index === 0
                ? "bg-[#FFD700]"
                : index === 1
                  ? "bg-[#E5E5E5]"
                  : index === 2
                    ? "bg-[#b87333]"
                    : "bg-gray-300"
            }`}
          >
            {index < 3 && (
              <img
                src={`images/${
                  index === 0
                    ? "coin_gold"
                    : index === 1
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
              <p className="text-lg leading-none">#{index + 1}</p>
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
