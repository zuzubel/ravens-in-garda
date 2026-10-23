import { html } from "../utils/html.js";
import { mapsSearchUrl } from "../utils/maps.js";
import { categoryStripe } from "./category.js";
import {
  placeBadge,
  placeDetailsContent,
  plannedButton,
  tipsBox,
  visitedMark,
} from "./place.js";
import {
  CARD_CLASS,
  addressLine,
  detailsPanel,
  detailsToggle,
  mapLink,
} from "./ui.js";

function mapButton(place) {
  return html`<div class="dim-when-done ml-auto shrink-0">
    ${mapLink(mapsSearchUrl(place.mapsQuery))}
  </div>`;
}

// Horní řádek štítků: háček navštíveno (nezešedne), priorita, vlastní štítek, odkazy „Naplánováno“.
// Karta bez štítků ho nemá, aby byla co nejkratší — mapa je pak na řádku s názvem.
function cardTags(place, visits, visited) {
  return html` <div class="flex items-start gap-2">
    <div class="flex flex-wrap items-center gap-1.5">
      ${visited ? visitedMark() : ""}
      <span class="dim-when-done flex flex-wrap items-center gap-1.5">
        ${place.priority
          ? placeBadge(`Priorita ${place.priority}`, place.category)
          : ""}
        ${place.badge ? placeBadge(place.badge, place.category) : ""}
        ${visits.map(plannedButton)}
      </span>
    </div>
    ${mapButton(place)}
  </div>`;
}

// Karta v katalogu míst; `highlighted` = výsledek vyhledávání,
// `visits` = zastávky místa v itineráři (odkazy „Naplánováno“), `visited` = karta zešedne.
// Karta s úvodní větou (`intro`) ukazuje jen ji, tipy jsou až v rozbalovacích detailech.
export function placeCard(
  place,
  { highlighted = false, visits = [], visited = false } = {},
) {
  const detailsId = `place-details-${place.id}`;
  const hasTags =
    visited || place.priority || place.badge || visits.length > 0;
  return html` <div
    class="${visited ? "is-done" : ""} ${CARD_CLASS} ${highlighted
      ? "border-teal-300 shadow-md"
      : "border-slate-200"}"
  >
    ${categoryStripe(place.category)}
    <div class="p-4 space-y-2">
      ${hasTags ? cardTags(place, visits, visited) : ""}
      <div class="flex items-start gap-2">
        <div class="dim-when-done min-w-0">
          <h3 class="text-base font-bold text-slate-800">
            ${place.icon
              ? html`<span aria-hidden="true" class="mr-1 text-lg leading-none"
                  >${place.icon}</span
                > `
              : ""}${place.name}
          </h3>
          ${addressLine(place.address)}
        </div>
        ${hasTags ? "" : mapButton(place)}
      </div>
      <div class="dim-when-done">
        ${place.intro
          ? html`<p class="text-xs text-slate-600 leading-relaxed">
              ${place.intro}
            </p>`
          : tipsBox(place)}
      </div>
    </div>
    ${detailsPanel(
      detailsId,
      placeDetailsContent(place, { withTipsBox: Boolean(place.intro) }),
      "dim-when-done",
    )}
    ${detailsToggle(detailsId, "dim-when-done")}
  </div>`;
}
