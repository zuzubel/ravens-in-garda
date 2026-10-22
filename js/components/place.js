// Části karty místa, které se opakují v itineráři a katalogu
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

export function placeBadge(text) {
  return html`<span
    class="inline-block mb-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
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
