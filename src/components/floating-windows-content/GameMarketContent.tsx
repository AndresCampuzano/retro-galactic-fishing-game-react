import { ErrorMessage } from "../common/ErrorMessage";
import { formatCurrency } from "../../utils/numbers.ts";

export const GameMarketContent = ({
  data,
  loading,
  error,
  retryFetch,
}: {
  data: GameMarket | null;
  loading: boolean;
  error: Error | null;
  retryFetch: () => void;
}) => {
  return (
    <>
      <section className="mb-1 px-5">
        <div className="flex gap-2">
          <h1 className="text-[40px]">Game Market</h1>
          <img
            src="images/open-book.png"
            alt="game market open book icon"
            className="w-6 object-contain"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-2 mb-2">
          <p className="text-xl">
            Showing all items available in the game market, from the most
            expensive to the cheapest.
          </p>
        </div>
        {loading && <p>Loading...</p>}
        {error && <ErrorMessage error={error} retryFetch={retryFetch} />}
      </section>

      <section>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {data?.items?.map((item) => (
            <li
              className={`relative flex flex-col border-black m-5 p-2 border-2 text-center ${
                item.type === "poison_delay"
                  ? "bg-[#6199E3]"
                  : item.type === "poison_leveling"
                    ? "bg-[#D3984A]"
                    : item.type === "poison_recovery"
                      ? "bg-[#E66D31]"
                      : "bg-[#B6B5B5]"
              }`}
            >
              <img
                src={`images/${item.type}.png`}
                alt={item.type}
                className="w-7 absolute -top-7 left-1/2 transform -translate-x-1/2"
              />
              <p className="text-xl mx-4 leading-none my-3">{item.name}</p>
              <p className="leading-4">{item.description}</p>
              <p className="text-lg font-bold mt-auto mb-2 pt-2">
                <img
                  src="images/coin_gold_x2.png"
                  alt="gold"
                  className="w-6 inline"
                />
                {formatCurrency(item.cost)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
