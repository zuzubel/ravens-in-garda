// Obecné stavební prvky sdílené napříč záložkami
import { html } from "../utils/html.js";

// Základ bílé karty; `relative overflow-hidden` kvůli barevnému proužku vlevo,
// `card` pro společný vzhled navštívené karty (`is-done`) v css/styles.css
export const CARD_CLASS =
  "card relative overflow-hidden bg-white rounded-2xl border shadow-sm";

export function emptyState(text) {
  return html`<div
    class="bg-white/80 p-6 rounded-2xl text-center text-xs text-slate-400 border border-dashed border-slate-200"
  >
    ${text}
  </div>`;
}

export function checkBox(key, checked) {
  return html` <button
    data-action="toggle-done"
    data-key="${key}"
    class="check-box"
    role="checkbox"
    aria-checked="${checked}"
    aria-label="Navštíveno"
  >
    <i class="fa-solid fa-check"></i>
  </button>`;
}

export function addressLine(address) {
  return html`<p class="text-[11px] text-slate-500 font-medium mt-0.5">
    <i class="fa-solid fa-location-dot text-rose-500 mr-1"></i>${address}
  </p>`;
}

export function mapLink(url) {
  return html` <a
    href="${url}"
    target="_blank"
    rel="noopener"
    class="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
  >
    <i class="fa-solid fa-location-arrow"></i> Mapa
  </a>`;
}

export function navigateLink(url) {
  return html` <a
    href="${url}"
    target="_blank"
    rel="noopener"
    class="bg-teal-600 text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-teal-700 shrink-0"
  >
    <i class="fa-solid fa-location-arrow"></i> Navigovat
  </a>`;
}

// Rozbalovací detaily: panel + tlačítko. Popisek a šipku přepíná CSS podle aria-expanded.
export function detailsPanel(id, content, extraClass = "") {
  return html` <div
    id="${id}"
    hidden
    class="${extraClass} px-4 pb-4 pt-1 space-y-2 border-t border-slate-100 bg-slate-50/50 text-[11px]"
  >
    ${content}
  </div>`;
}

export function detailsToggle(panelId, extraClass = "") {
  return html` <button
    data-action="toggle-details"
    aria-controls="${panelId}"
    aria-expanded="false"
    class="${extraClass} details-toggle w-full bg-slate-100/80 hover:bg-slate-200/70 text-slate-700 py-2 px-4 text-xs font-bold flex items-center justify-between border-t border-slate-200/80 transition-all"
  >
    <span class="when-collapsed">Zobrazit detaily & bestsellery</span>
    <span class="when-expanded">Skrýt detaily</span>
    <i
      class="fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-200"
    ></i>
  </button>`;
}
