import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for handling asynchronous data fetching with loading, error states and refetching capabilities.
 * Automatically retries fetching when network connectivity is restored.
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
 * const { data, loading, error, refetch } = useFetch<Player[]>(
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
  const [wasOffline, setWasOffline] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
      setWasOffline(false);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );

      // If error happens due to being offline, mark it so we can retry when back online
      if (
        !navigator.onLine ||
        (err instanceof Error &&
          (err.message.includes("offline") || err.message.includes("network")))
      ) {
        setWasOffline(true);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
    setWasOffline(false);
  };

  // Initial fetch on mount if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  // Setup online/offline event listeners to automatically refetch when coming back online
  useEffect(() => {
    const handleOnline = () => {
      // Only refetch if we had an error while offline or if marked as previously offline
      if (error || wasOffline) {
        console.log("Network connection restored. Refetching data...");
        fetchData();
      }
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [error, fetchData, wasOffline]);

  return { data, loading, error, refetch: fetchData, reset };
};
