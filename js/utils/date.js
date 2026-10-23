// "2026-10-27" → "27. 10."
export function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-").map(Number);
  return `${day}. ${month}.`;
}

// "2026-10-27" → 2 (den v týdnu podle ISO: 1 = pondělí … 7 = neděle)
export function isoWeekday(isoDate) {
  return new Date(`${isoDate}T12:00:00Z`).getUTCDay() || 7;
}

const WEEKDAY_NAMES = [
  "pondělí",
  "úterý",
  "středa",
  "čtvrtek",
  "pátek",
  "sobota",
  "neděle",
];

// 2 → "úterý"
export function weekdayName(weekday) {
  return WEEKDAY_NAMES[weekday - 1];
}

// Kolik dní zbývá od dneška (podle místního data) do "2026-10-27"; dnes = 0
export function daysUntil(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((Date.UTC(year, month - 1, day) - today) / 86_400_000);
}

// "2026-10-27" → 27
export function dayOfMonth(isoDate) {
  return Number(isoDate.split("-")[2]);
}

// { time: "16:00", until: "17:30" } → "16:00 – 17:30"; bez `until` jen začátek
export function formatTimeRange({ time, until }) {
  return until ? `${time} – ${until}` : time;
}
