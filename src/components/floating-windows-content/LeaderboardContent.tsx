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
            className="flex flex-col border-black m-5 p-2 bg-[#cacaca]"
          >
            <div className="flex flex-col items-center mb-2">
              <p className="text-lg">#{index + 1}</p>
              <p className="text-xl">{item.username}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="images/freecell.png"
                alt="freecell level icon"
                className="w-5 h-5"
              />
              <p className="ml-1">Level {item.level}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="images/joystick.png"
                alt="joystick xp icon"
                className="w-5 h-5"
              />
              <p className="ml-1">XP {item.xp}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="images/coin_gold.png"
                alt="coin gold icon"
                className="w-6 h-6"
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
