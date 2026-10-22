// Části karty místa, které se opakují v itineráři, katalogu i gastro záložce
import { html } from "../utils/html.js";

export function mustDoBox(text, label = "💡 Co vyzkoušet & Bestseller:") {
  return html` <div
    class="bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 text-xs text-amber-900"
  >
    <strong>${label}</strong> ${text}
  </div>`;
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

// Odkaz na den, kdy je místo naplánované, ve třech velikostech
const PLANNED_VARIANTS = {
  badge: "bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded-lg text-right",
  chip: "bg-blue-50 text-blue-700 text-[11px] px-2.5 py-1 rounded-xl text-left",
  block:
    "w-full bg-blue-50 text-blue-700 p-2 rounded-xl text-xs flex items-center justify-center gap-1",
};

export function plannedButton(place, variant = "chip") {
  const label =
    variant === "badge"
      ? "🗓️ Naplánováno"
      : `🗓️ Naplánováno: ${place.dayInfo} ➔`;
  return html` <button
    data-action="go-to-day"
    data-day="${place.dayKey}"
    class="${PLANNED_VARIANTS[
      variant
    ]} font-bold hover:bg-blue-100 transition-all"
  >
    ${label}
  </button>`;
}
