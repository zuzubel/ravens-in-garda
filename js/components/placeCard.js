import { html } from "../utils/html.js";
import { categoryStripe } from "./category.js";
import {
  bestsellersBox,
  mustDoBox,
  placeBadge,
  plannedButton,
  visitedMark,
  priceLine,
  prosCons,
} from "./place.js";
import {
  CARD_CLASS,
  addressLine,
  detailsPanel,
  detailsToggle,
  mapLink,
} from "./ui.js";

function tipsBox(place) {
  return place.bestsellers
    ? bestsellersBox(place.bestsellers)
    : mustDoBox(place.mustDo);
}

// Řádek štítků nad názvem: háček navštíveno (nezešedne), priorita, vlastní štítek
function cardTags(place, visited) {
  if (!visited && !place.priority && !place.badge) return "";
  return html` <div class="flex flex-wrap items-center gap-1.5 mb-1">
    ${visited ? visitedMark() : ""}
    <span class="dim-when-done flex flex-wrap items-center gap-1.5">
      ${place.priority
        ? placeBadge(`Priorita ${place.priority}`, place.category)
        : ""}
      ${place.badge ? placeBadge(place.badge, place.category) : ""}
    </span>
  </div>`;
}

// Karta v katalogu míst; `highlighted` = výsledek vyhledávání,
// `visited` = místo je v itineráři odškrtnuté (karta zešedne, jako v itineráři).
// Karta s úvodní větou (`intro`) ukazuje jen ji, tipy jsou až v rozbalovacích detailech.
export function placeCard(
  place,
  { highlighted = false, visited = false } = {},
) {
  const detailsId = `place-details-${place.id}`;
  return html` <div
    class="${visited ? "is-done" : ""} ${CARD_CLASS} ${highlighted
      ? "border-teal-300 shadow-md"
      : "border-slate-200"}"
  >
    ${categoryStripe(place.category)}
    <div class="p-4 space-y-2">
      <div class="dim-when-done flex justify-between items-start gap-2">
        ${plannedButton(place)} ${mapLink(place.mapsUrl)}
      </div>
      <div>
        ${cardTags(place, visited)}
        <div class="dim-when-done">
          <h3 class="text-base font-bold text-slate-800">${place.name}</h3>
          ${addressLine(place.address)}
        </div>
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
      html`${place.intro ? tipsBox(place) : ""} ${prosCons(place)}
        <div class="pt-1">${priceLine(place)}</div>`,
      "dim-when-done",
    )}
    ${detailsToggle(detailsId, "dim-when-done")}
  </div>`;
}
