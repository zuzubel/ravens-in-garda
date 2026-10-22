// "2026-10-27" → "27. 10."
export function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-").map(Number);
  return `${day}. ${month}.`;
}

// "2026-10-27" → 27
export function dayOfMonth(isoDate) {
  return Number(isoDate.split("-")[2]);
}

// { time: "16:00", until: "17:30" } → "16:00 – 17:30"; bez `until` jen začátek
export function formatTimeRange({ time, until }) {
  return until ? `${time} – ${until}` : time;
}
