import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for handling asynchronous data fetching with loading, error states and refetching capabilities.
 *
 * @template T The type of data to be fetched
 * @param fetchFunction An async function that returns a Promise resolving to data of type T
 * @param autoFetch Whether to automatically fetch data on mount (defaults to true)
 * @returns Object containing:
 *  - data: The fetched data (or null if not yet loaded)
 *  - loading: Boolean indicating if fetch is in progress
 *  - error: Error object if fetch failed, otherwise null
 *  - refetch: Function to manually trigger a new fetch
 *  - reset: Function to reset all states (data, loading, error)
 *
 * @example
 * ```
 * const { data, loading, error, refetch } = useFetch<User[]>(
 *   () => fetchUsers(),
 *   true
 * );
 * ```
 */
export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData, reset };
};
