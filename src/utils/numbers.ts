/**
 * Formats a number to a currency format.
 * @example
 * formatCurrency(1234567) // returns "1,234,567"
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
  });
}
