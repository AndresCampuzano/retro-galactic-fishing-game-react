import { formatNumber } from "../../utils/numbers.ts";

export const Item = ({
  type,
  name,
  description,
  cost,
}: {
  type: Item["type"];
  name: string;
  description: string;
  cost: number;
}) => {
  return (
    <li
      className={`relative flex flex-col border-black m-5 p-2 border-2 text-center ${
        type === "poison_delay"
          ? "bg-[#6199E3]"
          : type === "poison_leveling"
            ? "bg-[#D3984A]"
            : type === "poison_recovery"
              ? "bg-[#E66D31]"
              : type === "poison_reveal_fishes"
                ? "bg-[#4CAF50]"
                : "bg-[#B6B5B5]"
      }`}
    >
      <img
        src={`images/${type}.png`}
        alt={type}
        className="w-7 absolute -top-7 left-1/2 transform -translate-x-1/2"
      />
      <p className="text-xl mx-4 leading-none my-3">{name}</p>
      <p className="leading-4">{description}</p>
      <p className="text-lg font-bold mt-auto mb-2 pt-2">
        <img src="images/coin_gold_x2.png" alt="gold" className="w-6 inline" />
        {formatNumber(cost)}
      </p>
    </li>
  );
};
