// Horní lišta: termín výletu a odkaz na výchozí den (během výletu dnešní), obojí odvozené z itineráře
import { TRIP } from "../config.js";
import { defaultDayKey } from "../state.js";
import { formatShortDate } from "../utils/date.js";

export function renderHeader() {
  const { firstDay, lastDay } = TRIP;
  document.getElementById("trip-dates").textContent =
    `${formatShortDate(firstDay.date)} — ${formatShortDate(lastDay.date)}`;
  document.getElementById("trip-home").dataset.day = defaultDayKey();
}
