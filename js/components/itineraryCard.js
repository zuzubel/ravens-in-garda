import { formatTimeRange } from "../utils/date.js";
import { html } from "../utils/html.js";
import { mapsDirectionsUrl } from "../utils/maps.js";
import { categoryStripe } from "./category.js";
import { placeDetailsContent } from "./place.js";
import {
  CARD_CLASS,
  addressLine,
  checkBox,
  detailsPanel,
  detailsToggle,
  mapLink,
} from "./ui.js";

// Způsob přesunu: ikona v itineráři a režim trasy v Google Maps
const ROUTE_MODES = {
  car: { icon: "fa-car", travelMode: "driving" },
  walk: { icon: "fa-person-walking", travelMode: "walking" },
  bus: { icon: "fa-bus", travelMode: "transit" },
  ferry: { icon: "fa-ferry", travelMode: "transit" },
};

// Úsek přesunu na jednom řádku: ikona podle způsobu, popis · vzdálenost · čas
function routeLeg({ mode, text, distance, duration }) {
  const { icon } = ROUTE_MODES[mode];
  const meta = [distance, duration].filter(Boolean).join(" · ");
  return html` <li class="flex items-start gap-1.5">
    <i class="fa-solid ${icon} text-amber-600 mt-0.5 w-3.5 text-center"></i>
    <span
      >${text}${meta
        ? html` <span class="whitespace-nowrap text-amber-700">· ${meta}</span>`
        : ""}</span
    >
  </li>`;
}

function routeInfo(route) {
  return html` <ul
    class="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200/80 space-y-1"
  >
    ${route.map(routeLeg)}
  </ul>`;
}

// Trasa k místu z aktuální polohy; režim podle hlavního úseku přesunu
// (první dopravní prostředek, pěšky jen když se jde celou cestu pěšky)
function routeUrl(place, route = []) {
  const main = route.find(({ mode }) => mode !== "walk") ?? route[0];
  return mapsDirectionsUrl(
    place.mapsQuery,
    ROUTE_MODES[main?.mode ?? "car"].travelMode,
  );
}

function placeDetails(id, place) {
  return html` ${detailsPanel(id, placeDetailsContent(place), "dim-when-done")}
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
        <div class="flex items-start justify-between gap-2">
          <span
            class="bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-1 rounded-xl"
            >${formatTimeRange(item)}</span
          >
          ${place ? mapLink(routeUrl(place, item.route)) : ""}
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
