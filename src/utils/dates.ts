/**
 * Takes a given date and formats it to HH:MM
 * @example
 * timeToHHMM(new Date()) // returns "14:30"
 */
export function timeToHHMM(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
