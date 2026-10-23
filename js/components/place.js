// Části karty místa, které se opakují v itineráři a katalogu
import { CATEGORY_GROUPS, categoryGroupOf } from "../config.js";
import { weekdayName } from "../utils/date.js";
import { html } from "../utils/html.js";

function mustDoBox(text) {
  return html` <div
    class="bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 text-xs text-amber-900"
  >
    <strong>💡 Co vyzkoušet & Bestseller:</strong> ${text}
  </div>`;
}

function bestsellersBox(bestsellers) {
  return html` <div
    class="bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 space-y-1.5"
  >
    <p class="text-xs font-bold text-amber-900">⭐ Bestsellery z recenzí:</p>
    <ul class="text-xs text-amber-800 space-y-1 list-disc list-inside">
      ${bestsellers.map(
        ({ name, note }) => html`<li><strong>${name}:</strong> ${note}</li>`,
      )}
    </ul>
  </div>`;
}

// Zelený háček u místa, které jsme už navštívili
export function visitedMark() {
  return html`<span
    role="img"
    aria-label="Navštíveno"
    title="Navštíveno"
    class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-200"
    ><i class="fa-solid fa-check text-[10px]"></i
  ></span>`;
}

// Štítek místa (priorita, vlastní štítek) v barvě jeho skupiny (gastro oranžově, zážitky zeleně)
export function placeBadge(text, category) {
  const { badge } = CATEGORY_GROUPS[categoryGroupOf(category)];
  return html`<span
    class="inline-block ${badge} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
    >${text}</span
  >`;
}

// Tipy na kartě: seznam bestsellerů, pokud ho místo má, jinak řádek „Co vyzkoušet“
export function tipsBox(place) {
  return place.bestsellers
    ? bestsellersBox(place.bestsellers)
    : mustDoBox(place.mustDo);
}

function practicalTips(tips) {
  return html` <div
    class="bg-sky-50 text-sky-900 p-2.5 rounded-xl border border-sky-100 space-y-1"
  >
    <p class="font-bold">📌 Praktické tipy:</p>
    <ul class="space-y-1 list-disc list-inside">
      ${tips.map((tip) => html`<li>${tip}</li>`)}
    </ul>
  </div>`;
}

// Fakta o návštěvě — zobrazí se jen ta, která místo v datech má
const FACTS = [
  { field: "price", label: "💰 Ceník rodina" },
  { field: "duration", label: "⏱️ Časový odhad" },
  { field: "guestCard", label: "🎫 Garda Guest Card" },
];

function placeFacts(place) {
  return html` <div class="text-[11px] text-slate-500 space-y-0.5 pt-1">
    ${FACTS.filter(({ field }) => place[field]).map(
      ({ field, label }) =>
        html`<div>${label}: <strong>${place[field]}</strong></div>`,
    )}
    ${place.closedWeekdays?.length
      ? html`<div>
          🚫 Zavřeno:
          <strong>${place.closedWeekdays.map(weekdayName).join(", ")}</strong>
        </div>`
      : ""}
  </div>`;
}

// Obsah rozbalovacích detailů místa — stejný v itineráři i v katalogu.
// `withTipsBox: false`, když jsou tipy vidět už na kartě.
export function placeDetailsContent(place, { withTipsBox = true } = {}) {
  return html` ${withTipsBox ? tipsBox(place) : ""}
  ${place.tips ? practicalTips(place.tips) : ""} ${placeFacts(place)}`;
}

// Odkaz z katalogu přímo na zastávku v itineráři
export function plannedButton({ day, item, key }) {
  return html` <button
    data-action="go-to-item"
    data-day="${day.key}"
    data-key="${key}"
    class="bg-blue-50 text-blue-700 text-[11px] px-2.5 py-1 rounded-xl text-left font-bold hover:bg-blue-100 transition-all"
  >
    🗓️ Naplánováno: ${day.name} ${item.time} ➔
  </button>`;
}
