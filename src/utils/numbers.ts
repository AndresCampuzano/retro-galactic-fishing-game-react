/**
 * Formats a number to a string with commas as thousands separators.
 * @example
 * formatNumber(1234567) // returns "1,234,567"
 */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
  });
}
