export function formatRange(start: string, end: string | null, ongoing: boolean): string {
  if (ongoing) return `${start} — ongoing`;
  if (!end) return start;
  if (end === start) return start;
  return `${start} — ${end}`;
}

export function formatQuarter(q: string): string {
  const m = q.match(/^(\d{4})-Q([1-4])$/);
  if (!m) return q;
  return `Q${m[2]} ${m[1]}`;
}
