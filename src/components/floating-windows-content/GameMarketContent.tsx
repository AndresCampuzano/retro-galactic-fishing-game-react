import { ErrorMessage } from "../common/ErrorMessage";

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
          {data?.items.toString()}
        </ul>
      </section>
    </>
  );
};
