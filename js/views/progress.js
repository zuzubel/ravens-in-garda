// Pokrok: procento v hlavičce a stránka s navštívenými / naplánovanými zastávkami
import { checkBox, emptyState } from "../components/ui.js";
import { itinerary } from "../data/itinerary.js";
import { getProgress, isDone, itemKey, state } from "../state.js";
import { formatShortDate } from "../utils/date.js";
import { html, mount } from "../utils/html.js";

function progressRow(day, item, done) {
  const key = itemKey(day.key, item);
  return html` <div
    class="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex items-center gap-3"
  >
    ${checkBox(key, done)}
    <button
      data-action="go-to-day"
      data-day="${day.key}"
      class="flex-1 min-w-0 text-left flex items-center gap-2"
    >
      <div class="flex-1 min-w-0">
        <div
          class="text-sm font-bold ${done
            ? "text-slate-500"
            : "text-slate-800"} truncate"
        >
          ${item.name}
        </div>
        <div class="text-[11px] text-slate-400 font-medium">${item.time}</div>
      </div>
      <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
    </button>
  </div>`;
}

// Položky seskupené podle dne; `done` vybírá navštívené, nebo naplánované
function groupedRows(done) {
  return itinerary.flatMap((day) => {
    const rows = day.items.filter((item) => isDone(day.key, item) === done);
    if (!rows.length) return [];
    return [
      html`<div
        class="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-1 px-1"
      >
        ${day.name} · ${formatShortDate(day.date)}
      </div>`,
      ...rows.map((item) => progressRow(day, item, done)),
    ];
  });
}

function progressSection({ icon, title, count, badgeClass, rows, emptyText }) {
  return html` <div class="space-y-2">
    <h3
      class="text-sm font-extrabold text-slate-800 flex items-center gap-2 px-1"
    >
      <i class="${icon}"></i> ${title}
      <span class="${badgeClass} text-[11px] px-2 py-0.5 rounded-full"
        >${count}</span
      >
    </h3>
    ${rows.length ? rows : emptyState(emptyText)}
  </div>`;
}

function summary({ done, total, percent }) {
  return html` <div
    class="bg-gradient-to-br from-teal-700 to-emerald-800 text-white p-5 rounded-3xl shadow-md space-y-3"
  >
    <button
      data-action="go-to-day"
      data-day="${state.dayKey}"
      class="text-xs font-bold text-teal-100 hover:text-white flex items-center gap-1.5"
    >
      <i class="fa-solid fa-arrow-left"></i> Zpět na itinerář
    </button>
    <div class="flex items-end justify-between gap-3">
      <div>
        <h2 class="text-xl font-extrabold">Náš pokrok</h2>
        <p class="text-xs text-teal-100">
          ${done} z ${total} zastávek navštíveno
        </p>
      </div>
      <span class="text-3xl font-black text-amber-300">${percent}%</span>
    </div>
    <div class="h-2 bg-white/15 rounded-full overflow-hidden">
      <div
        class="h-full bg-amber-300 rounded-full transition-all"
        style="width: ${percent}%"
      ></div>
    </div>
  </div>`;
}

export function renderHeaderProgress() {
  document.getElementById("progress-percent").textContent =
    `${getProgress().percent}%`;
}

export function renderProgress() {
  const progress = getProgress();
  mount(
    "progress-content",
    html` ${summary(progress)}
    ${progressSection({
      icon: "fa-solid fa-circle-check text-teal-600",
      title: "Navštíveno",
      count: progress.done,
      badgeClass: "bg-teal-50 text-teal-700",
      rows: groupedRows(true),
      emptyText: "Zatím jsme nikde nebyli — odškrtávejte místa v itineráři.",
    })}
    ${progressSection({
      icon: "fa-regular fa-calendar text-blue-600",
      title: "Naplánováno",
      count: progress.total - progress.done,
      badgeClass: "bg-blue-50 text-blue-700",
      rows: groupedRows(false),
      emptyText: "Všechno splněno! 🎉",
    })}`,
  );
}
