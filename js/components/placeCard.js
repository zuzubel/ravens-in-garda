import { html } from "../utils/html.js";
import { categoryStripe } from "./category.js";
import {
  bestsellersBox,
  mustDoBox,
  placeBadge,
  plannedButton,
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

// Karta v katalogu míst; `highlighted` = výsledek vyhledávání
export function placeCard(place, { highlighted = false } = {}) {
  const detailsId = `place-details-${place.id}`;
  return html` <div
    class="${CARD_CLASS} ${highlighted
      ? "border-teal-300 shadow-md"
      : "border-slate-200"}"
  >
    ${categoryStripe(place.category)}
    <div class="p-4 space-y-2">
      <div class="flex justify-between items-start gap-2">
        ${plannedButton(place)} ${mapLink(place.mapsUrl)}
      </div>
      <div>
        ${place.badge ? placeBadge(place.badge) : ""}
        <h3 class="text-base font-bold text-slate-800">${place.name}</h3>
        ${addressLine(place.address)}
      </div>
      ${place.description
        ? html`<p class="text-xs text-slate-600">${place.description}</p>`
        : ""}
      ${place.bestsellers
        ? bestsellersBox(place.bestsellers)
        : mustDoBox(place.mustDo)}
    </div>
    ${detailsPanel(
      detailsId,
      html`${prosCons(place)}
        <div class="pt-1">${priceLine(place)}</div>`,
    )}
    ${detailsToggle(detailsId)}
  </div>`;
}
