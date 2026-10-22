// Hlavní menu záložek + zobrazení odpovídající sekce
import { TABS } from "../config.js";
import { state } from "../state.js";
import { html, mount } from "../utils/html.js";

function tabButton(tab, active) {
  return html` <button
    data-action="switch-tab"
    data-tab="${tab.key}"
    class="px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm flex items-center gap-2 border ${active
      ? "bg-teal-700 text-white border-teal-700"
      : "bg-white text-slate-600 border-slate-200"}"
  >
    ${tab.icon
      ? html`<i class="${tab.icon}"></i>`
      : html`<span>${tab.emoji}</span>`}
    ${tab.label}
  </button>`;
}

export function renderNavigation() {
  mount(
    "tab-bar",
    TABS.map((tab) => tabButton(tab, tab.key === state.tab)),
  );
  document.querySelectorAll(".tab-content").forEach((section) => {
    section.hidden = section.id !== `tab-${state.tab}`;
  });
}
