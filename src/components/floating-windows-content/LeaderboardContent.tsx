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
      <ul className="flex flex-col gap-2">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data?.players?.map((item) => (
          <li
            key={item.username}
            className="flex justify-between items-center p-2 border-b border-gray-300"
          >
            <span>{item.username}</span>
            <span>xp: {item.xp}</span>
            <span>gold: {item.gold}</span>
            <span>level: {item.level}</span>
            <span>rank: {item.rank}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
