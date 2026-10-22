import { html } from "../utils/html.js";
import { categoryStripe } from "./category.js";
import { mustDoBox, plannedButton } from "./place.js";
import { CARD_CLASS, addressLine, mapLink } from "./ui.js";

function cardHeader(place, badge) {
  return html` <div class="flex justify-between items-start gap-2">
    <div>
      ${badge
        ? html`<span
            class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            >${badge}</span
          >`
        : ""}
      <h3 class="text-base font-bold text-slate-800 ${badge ? "mt-1" : ""}">
        ${place.name}
      </h3>
      ${addressLine(place.address)}
    </div>
    ${mapLink(place.mapsUrl)}
  </div>`;
}

export function gastroCard(place) {
  return html` <div class="${CARD_CLASS} border-slate-200 p-4 space-y-2.5">
    ${categoryStripe(place.category)} ${cardHeader(place)}
    ${mustDoBox(place.mustDo, "⭐ Bestsellery z recenzí:")}
    ${plannedButton(place, "block")}
  </div>`;
}

// Zvýrazněný podnik nahoře v gastro záložce (místo s `highlight` v datech)
export function gastroHighlightCard(place) {
  const { badge, description, bestsellers } = place.highlight;
  return html` <div class="${CARD_CLASS} border-amber-300 p-4 space-y-3">
    ${categoryStripe(place.category)} ${cardHeader(place, badge)}
    <p class="text-xs text-slate-600">${description}</p>
    <div
      class="bg-amber-50 p-3 rounded-xl border border-amber-200/60 space-y-1.5"
    >
      <p class="text-xs font-bold text-amber-900">⭐ Bestsellery z recenzí:</p>
      <ul class="text-xs text-amber-800 space-y-1 list-disc list-inside">
        ${bestsellers.map(
          ({ name, note }) => html`<li><strong>${name}:</strong> ${note}</li>`,
        )}
      </ul>
    </div>
    ${plannedButton(place, "block")}
  </div>`;
}
