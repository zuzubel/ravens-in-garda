// Sekce „Kde se najíst“ pod zážitky dne: gastro tipy seskupené podle lokality
import { html } from "../utils/html.js";
import { mapsSearchUrl } from "../utils/maps.js";
import { categoryStripe } from "./category.js";
import { placeDetailsContent } from "./place.js";
import { CARD_CLASS, checkBox, detailsPanel, mapLink } from "./ui.js";

// Kompaktní řádek: zaškrtávátko, název s bestsellery (klik rozbalí detaily), mapa
function diningRow(place, visited, detailsId) {
  return html` <div
    data-done-key="${place.id}"
    class="${visited ? "is-done" : ""} ${CARD_CLASS} border-slate-200"
  >
    ${categoryStripe(place.category)}
    <div class="p-3 flex items-start gap-3">
      ${checkBox(place.id, visited, "toggle-place")}
      <button
        data-action="toggle-details"
        aria-controls="${detailsId}"
        aria-expanded="false"
        class="details-toggle dim-when-done flex-1 min-w-0 text-left"
      >
        <span
          class="flex items-center gap-1.5 text-sm font-bold text-slate-800"
        >
          <span aria-hidden="true">${place.icon}</span>
          <span class="truncate">${place.name}</span>
          <i
            class="fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200"
          ></i>
        </span>
        <span class="block text-[11px] text-slate-500 truncate"
          >${place.bestsellers.map(({ name }) => name).join(" · ")}</span
        >
      </button>
      <div class="dim-when-done">
        ${mapLink(mapsSearchUrl(place.mapsQuery))}
      </div>
    </div>
    ${detailsPanel(detailsId, placeDetailsContent(place), "dim-when-done")}
  </div>`;
}

export function diningSection(groups, isVisited) {
  return html` <section class="space-y-3 pt-2">
    <h3
      class="text-sm font-extrabold text-slate-800 flex items-center gap-2 px-1"
    >
      <i class="fa-solid fa-utensils text-amber-500"></i> Kde se najíst
    </h3>
    ${groups.map(
      ({ area, label, places }) =>
        html` <div class="space-y-2">
          <div
            class="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1"
          >
            ${label}
          </div>
          ${places.map((place) =>
            diningRow(place, isVisited(place.id), `dining-${area}-${place.id}`),
          )}
        </div>`,
    )}
  </section>`;
}
