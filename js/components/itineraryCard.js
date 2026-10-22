import { html } from "../utils/html.js";
import { categoryStripe } from "./category.js";
import { mustDoBox, plannedButton, priceLine, prosCons } from "./place.js";
import {
  CARD_CLASS,
  addressLine,
  checkBox,
  detailsPanel,
  detailsToggle,
  navigateLink,
} from "./ui.js";

function routeInfo(item) {
  return html` <div
    class="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200/80 flex items-center justify-between gap-1.5"
  >
    <span class="flex items-center gap-1.5"
      ><i class="fa-solid fa-car text-amber-600"></i> ${item.drive}</span
    >
    <span
      class="bg-amber-200/80 text-amber-950 font-extrabold px-2 py-0.5 rounded-md text-[10px] shrink-0"
      >📍 ${item.distance}</span
    >
  </div>`;
}

function placeDetails(id, place) {
  return html` ${detailsPanel(
    id,
    html` ${mustDoBox(place.mustDo)} ${prosCons(place)}
      <div class="flex justify-between items-center gap-2 pt-1">
        ${priceLine(place)} ${navigateLink(place.mapsUrl)}
      </div>`,
    "dim-when-done",
  )}
  ${detailsToggle(id, "dim-when-done")}`;
}

// `key` se používá i v plan.js pro přepnutí stavu bez překreslení karty
export function itineraryCard({ key, item, place, done, detailsId }) {
  return html` <div
    data-item-key="${key}"
    class="itin-card ${done
      ? "is-done"
      : ""} ${CARD_CLASS} border-slate-200 transition-all hover:border-teal-300"
  >
    ${categoryStripe(place?.category)}
    <div class="p-4 flex gap-3">
      ${checkBox(key, done)}
      <div class="dim-when-done flex-1 min-w-0 space-y-2">
        <div class="flex justify-between items-start gap-2">
          <span
            class="bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-1 rounded-xl shrink-0"
            >${item.time}</span
          >
          ${place ? plannedButton(place, "badge") : ""}
        </div>
        ${item.drive ? routeInfo(item) : ""}
        <div>
          <h3 class="text-base font-bold text-slate-800">${item.name}</h3>
          ${place ? addressLine(place.address) : ""}
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          ${item.description}
        </p>
      </div>
    </div>
    ${place ? placeDetails(detailsId, place) : ""}
  </div>`;
}
