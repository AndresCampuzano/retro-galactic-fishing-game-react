/**
 * Generic fetch utility for making API requests with robust error handling and response parsing.
 * Supports offline mode by storing and retrieving cached responses when network is unavailable.
 *
 * @template T The expected return type from the API
 * @param baseUrl The base URL of the API service
 * @param path The specific endpoint path to request
 * @param init Optional request configuration including custom headers and URL parameters
 * @returns Promise resolving to data of type T, or null for empty responses
 *
 * @throws Error
 *
 * @example
 * ```
 * // Basic usage
 * const data = await fetchFromService<UserData>('https://api.example.com', '/users/123');
 *
 * // With params and headers
 * const result = await fetchFromService<SearchResults>('https://api.example.com', '/search', {
 *   method: 'GET',
 *   params: { query: 'example', limit: 10 },
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 * ```
 */
export async function fetchFromService<T>(
  baseUrl: string,
  path: string,
  init?: RequestInitExtended,
): Promise<T> {
  const url = new URL(`${baseUrl}${path}`);

  // Append URL parameters if provided
  if (init?.params) {
    Object.entries(init.params).forEach(([key, value]) => {
      if (typeof value === "undefined" || value === null) return;
      url.searchParams.append(key, `${value}`);
    });
  }

  const cacheKey = `api-cache:${url.toString()}:${init?.method || 'GET'}`;

  // Check if we're offline
  if (!navigator.onLine) {
    console.log('Offline mode: fetching from cache for', url.toString());
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as T;
      } catch (e) {
        console.error('Error parsing cached data:', e);
        throw new Error('You are offline and cached data is unavailable');
      }
    } else {
      throw new Error('You are offline and no cached data is available for this request');
    }
  }

  try {
    const response = await fetch(url.toString(), {
      ...init,
      headers: {
        ...(init?.headers ?? { "Content-Type": "application/json" }),
      },
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;

      try {
        const errorBody = await response.json();
        if (errorBody?.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        // If parsing JSON fails, use the default error message
      }

      throw new Error(errorMessage);
    }

    if (
      response.status === 204 ||
      response.headers.get("Content-Length") === "0"
    ) {
      return null as T;
    }

    const text = await response.text();
    if (!text) return null as T;
    
    const data = JSON.parse(text) as T;
    
    // Cache successful responses for offline use
    if (init?.method === undefined || init?.method === 'GET') {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to cache API response:', e);
      }
    }
    
    return data;
  } catch (error) {
    // For network errors, try to return cached data as fallback
    if (!navigator.onLine || error instanceof TypeError && error.message.includes('network')) {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        console.log('Network error, using cached data for', url.toString());
        return JSON.parse(cachedData) as T;
      }
    }
    throw error;
  }
}
