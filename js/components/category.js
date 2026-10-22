// Barevné rozlišení gastro × zážitky: proužek na kartě a legenda, která slouží jako filtr
import { CATEGORY_GROUPS, categoryGroupOf } from "../config.js";
import { html } from "../utils/html.js";
import { emptyState } from "./ui.js";

export function categoryStripe(category) {
  const { stripe } = CATEGORY_GROUPS[categoryGroupOf(category)];
  return html`<span
    class="absolute inset-y-0 left-0 w-1 ${stripe}"
    aria-hidden="true"
  ></span>`;
}

function legendButton(group, activeGroup) {
  const { label, stripe, tint } = CATEGORY_GROUPS[group];
  const active = group === activeGroup;
  return html` <button
    data-action="filter-category"
    data-group="${group}"
    aria-pressed="${active}"
    class="flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${active
      ? `text-slate-800 ${tint}`
      : "hover:text-slate-700"}"
  >
    <span class="w-1 h-3 rounded-full ${stripe}"></span>${label}
  </button>`;
}

// -ml-2 vyrovná odsazení tlačítek, aby čárky v legendě seděly nad proužky karet
export function categoryLegend(activeGroup) {
  return html` <div
    class="flex items-center justify-start gap-1 -ml-2 text-[11px] font-semibold text-slate-500"
  >
    ${Object.keys(CATEGORY_GROUPS).map((group) =>
      legendButton(group, activeGroup),
    )}
    ${activeGroup
      ? html`<button
          data-action="clear-filter"
          class="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
          aria-label="Zrušit filtr"
        >
          <i class="fa-solid fa-xmark text-[10px]"></i>
        </button>`
      : ""}
  </div>`;
}

export function emptyCategoryState(group) {
  return emptyState(
    `Žádné položky v kategorii ${CATEGORY_GROUPS[group].label}.`,
  );
}
