import { formatTimeRange } from "../utils/date.js";
import { html } from "../utils/html.js";
import { categoryStripe } from "./category.js";
import { placeDetailsContent } from "./place.js";
import {
  CARD_CLASS,
  addressLine,
  checkBox,
  detailsPanel,
  detailsToggle,
  navigateLink,
} from "./ui.js";

const ROUTE_ICONS = {
  car: "fa-car",
  walk: "fa-person-walking",
  bus: "fa-bus",
  ferry: "fa-ferry",
};

// Přesun na zastávku v jednom řádku: ikona podle způsobu, popis · vzdálenost · čas
function routeInfo({ mode, text, distance, duration }) {
  const meta = [distance, duration].filter(Boolean).join(" · ");
  return html` <div
    class="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200/80 flex items-start gap-1.5"
  >
    <i class="fa-solid ${ROUTE_ICONS[mode]} text-amber-600 mt-0.5"></i>
    <span
      >${text}${meta
        ? html` <span class="whitespace-nowrap text-amber-700">· ${meta}</span>`
        : ""}</span
    >
  </div>`;
}

function placeDetails(id, place) {
  return html` ${detailsPanel(
    id,
    placeDetailsContent(place, { action: navigateLink(place.mapsUrl) }),
    "dim-when-done",
  )}
  ${detailsToggle(id, "dim-when-done")}`;
}

// `data-done-key` používá plan.js pro přepnutí stavu bez překreslení karty
export function itineraryCard({ key, item, place, done, detailsId }) {
  return html` <div
    data-done-key="${key}"
    class="itin-card ${done
      ? "is-done"
      : ""} ${CARD_CLASS} border-slate-200 transition-all hover:border-teal-300"
  >
    ${categoryStripe(place?.category)}
    <div class="p-4 flex gap-3">
      ${checkBox(key, done)}
      <div class="dim-when-done flex-1 min-w-0 space-y-2">
        <div class="flex">
          <span
            class="bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-1 rounded-xl"
            >${formatTimeRange(item)}</span
          >
        </div>
        ${item.route ? routeInfo(item.route) : ""}
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
