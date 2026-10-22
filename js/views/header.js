// Horní lišta: termín výletu a odkaz na první den, obojí odvozené z itineráře
import { TRIP } from "../config.js";
import { formatShortDate } from "../utils/date.js";

export function renderHeader() {
  const { firstDay, lastDay } = TRIP;
  document.getElementById("trip-dates").textContent =
    `${formatShortDate(firstDay.date)} — ${formatShortDate(lastDay.date)}`;
  document.getElementById("trip-home").dataset.day = firstDay.key;
}
