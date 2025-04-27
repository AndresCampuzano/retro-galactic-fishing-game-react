/**
 * Generic fetch utility for making API requests with robust error handling and response parsing.
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

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      ...(init?.headers ?? { "Content-Type": "application/json" }),
    },
  });

  if (!response.ok) {
    let errorMessage = `Error ${response.status}: ${response.statusText}`;

    const errorBody = await response.json();
    if (errorBody?.message) {
      errorMessage = errorBody.message;
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
  return text ? (JSON.parse(text) as T) : (null as T);
}
