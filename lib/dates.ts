const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Turn "2025-03" into { year: 2025, month: 3 }. Throws on malformed input. */
export function parseMonth(value: string): { year: number; month: number } {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`Expected "YYYY-MM", received "${value}"`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) throw new Error(`Month out of range in "${value}"`);
  return { year, month };
}

/** "2025-03" -> "Mar 2025" */
export function formatMonth(value: string): string {
  const { year, month } = parseMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "2025-03" + null -> "Mar 2025 – Present" */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

/** Whole months between two points, inclusive of both endpoints. */
export function monthsBetween(start: string, end: string): number {
  const a = parseMonth(start);
  const b = parseMonth(end);
  return (b.year - a.year) * 12 + (b.month - a.month) + 1;
}

/**
 * "1 yr 6 mos" in the same shape LinkedIn uses, so the site reads consistently
 * with the profile people arrive from.
 */
export function formatDuration(months: number): string {
  if (months <= 0) return "";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest > 0) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/** Sort key: later start dates first. */
export function startSortValue(start: string): number {
  const { year, month } = parseMonth(start);
  return year * 12 + month;
}
