// Části karty místa, které se opakují v itineráři a katalogu
import { CATEGORY_GROUPS, categoryGroupOf } from "../config.js";
import { html } from "../utils/html.js";

export function mustDoBox(text) {
  return html` <div
    class="bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 text-xs text-amber-900"
  >
    <strong>💡 Co vyzkoušet & Bestseller:</strong> ${text}
  </div>`;
}

export function bestsellersBox(bestsellers) {
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

// Štítek nad názvem místa v barvě jeho skupiny (gastro oranžově, zážitky zeleně)
export function placeBadge(text, category) {
  const { badge } = CATEGORY_GROUPS[categoryGroupOf(category)];
  return html`<span
    class="inline-block ${badge} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
    >${text}</span
  >`;
}

export function prosCons(place) {
  return html` <div class="grid grid-cols-2 gap-2">
    <div
      class="bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-100"
    >
      <strong>👍 Pro děti:</strong> ${place.pros}
    </div>
    <div class="bg-rose-50 text-rose-800 p-2 rounded-xl border border-rose-100">
      <strong>⚠️ Mínusy:</strong> ${place.cons}
    </div>
  </div>`;
}

export function priceLine(place) {
  return html`<div class="text-[11px] text-slate-500">
    💰 Ceník rodina: <strong>${place.price}</strong>
  </div>`;
}

// Odkaz z katalogu na den, kdy je místo naplánované
export function plannedButton(place) {
  return html` <button
    data-action="go-to-day"
    data-day="${place.dayKey}"
    class="bg-blue-50 text-blue-700 text-[11px] px-2.5 py-1 rounded-xl text-left font-bold hover:bg-blue-100 transition-all"
  >
    🗓️ Naplánováno: ${place.dayInfo} ➔
  </button>`;
}
