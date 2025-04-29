/**
 * Formats a number to a currency format.
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
  });
}
