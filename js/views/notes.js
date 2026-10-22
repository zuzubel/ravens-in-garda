// Záložka Poznámky: seznam uložených poznámek (formulář je statický v index.html)
import { emptyState } from "../components/ui.js";
import { state } from "../state.js";
import { html, mount } from "../utils/html.js";

function noteItem(note, index) {
  return html` <div
    class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-3"
  >
    <p class="text-xs text-slate-700 leading-relaxed">
      <span class="whitespace-pre-wrap">${note}</span>
    </p>
    <button
      data-action="delete-note"
      data-index="${index}"
      class="text-slate-300 hover:text-rose-500 transition-colors p-1 shrink-0"
      aria-label="Smazat poznámku"
    >
      <i class="fa-solid fa-trash-can text-sm"></i>
    </button>
  </div>`;
}

export function renderNotes() {
  mount(
    "notes-list",
    state.notes.length
      ? state.notes.map(noteItem)
      : emptyState("Zatím nemáte žádné uložené poznámky."),
  );
}
