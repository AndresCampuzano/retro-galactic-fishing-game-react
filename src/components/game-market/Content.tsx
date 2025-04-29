import { useState, useEffect, useMemo } from "react";
import { ErrorMessage } from "../common/ErrorMessage";
import { Item } from "./Item.tsx";

const SORTING = {
  COST_HIGH_TO_LOW: "cost_high_to_low",
  COST_LOW_TO_HIGH: "cost_low_to_high",
  NAME_A_TO_Z: "name_a_to_z",
  NAME_Z_TO_A: "name_z_to_a",
};

export const Content = ({
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(SORTING.COST_HIGH_TO_LOW); // Default sort by cost high to low

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

  const filteredItems = useMemo(() => {
    if (!data?.items) return [];
    const search = debouncedSearchTerm.toLowerCase();
    const filtered = data.items.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.type.toLowerCase().includes(search) ||
        item.cost.toString().includes(search)
      );
    });

    return filtered.sort((a, b) => {
      if (sortOption === SORTING.COST_HIGH_TO_LOW) return b.cost - a.cost;
      if (sortOption === SORTING.COST_LOW_TO_HIGH) return a.cost - b.cost;
      if (sortOption === SORTING.NAME_A_TO_Z)
        return a.name.localeCompare(b.name);
      if (sortOption === SORTING.NAME_Z_TO_A)
        return b.name.localeCompare(a.name);
      return 0;
    });
  }, [debouncedSearchTerm, data?.items, sortOption]);

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
            Showing all items available in the game market.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <div className="relative flex items-center w-full md:max-w-[60%]">
            <input
              type="text"
              placeholder="Search by name, description, type or cost..."
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
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-400 p-2 bg-gray-200 text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={SORTING.COST_HIGH_TO_LOW}>
                Cost: High to Low
              </option>
              <option value={SORTING.COST_LOW_TO_HIGH}>
                Cost: Low to High
              </option>
              <option value={SORTING.NAME_A_TO_Z}>Name: A to Z</option>
              <option value={SORTING.NAME_Z_TO_A}>Name: Z to A</option>
            </select>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <ErrorMessage error={error} retryFetch={retryFetch} />}
      </section>

      <section>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems?.map((item) => (
            <Item
              key={item.id}
              type={item.type}
              name={item.name}
              description={item.description}
              cost={item.cost}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
