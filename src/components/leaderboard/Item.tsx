import { formatNumber } from "../../utils/numbers.ts";

export const Item = ({
  rank,
  username,
  level,
  xp,
  gold,
  fishEmojis,
  emojiDescription,
  isInfected,
}: {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
  fishEmojis: string;
  emojiDescription: string;
  isInfected: boolean;
}) => {
  return (
    <li
      className={`relative flex flex-col border-black m-5 p-2 border-2 ${
        rank === 1
          ? "bg-[#FFD700]"
          : rank === 2
            ? "bg-[#E5E5E5]"
            : rank === 3
              ? "bg-[#b87333]"
              : "bg-gray-300"
      }`}
    >
      {rank <= 3 && (
        <img
          src={`images/${
            rank === 1
              ? "coin_gold"
              : rank === 2
                ? "coin_silver"
                : "coin_bronze"
          }_x2.png`}
          alt="pixeled rank coin"
          title={`Rank ${rank}`}
          className="w-10 absolute -top-4 -left-4"
        />
      )}

      {isInfected && (
        <img
          src="images/spider.png"
          alt="pixeled spider card"
          title="Infected player"
          className="w-8 absolute -top-4 -right-4"
        />
      )}
      <div className="flex flex-col items-center mb-2">
        <p className="text-lg leading-none">#{rank}</p>
        <p className="text-xl leading-none">{username}</p>
      </div>
      <div className="flex gap-1 items-center">
        <img
          src="images/freecell.png"
          alt="pixeled freecell level"
          className="w-5"
        />
        <p className="ml-1">Level {formatNumber(level)}</p>
      </div>
      <div className="flex gap-1 items-center">
        <img
          src="images/joystick.png"
          alt="pixeled joystick xp"
          className="w-5"
        />
        <p className="ml-1">XP {formatNumber(xp)}</p>
      </div>
      <div className="flex gap-1 items-center">
        <img
          src="images/coin_gold_x2.png"
          alt="pixeled gold coin"
          className="w-6"
        />
        <p className="">Gold {formatNumber(gold)}</p>
      </div>
      <p>
        {fishEmojis} {emojiDescription}
      </p>
    </li>
  );
};
