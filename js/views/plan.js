// Záložka Itinerář: výběr dne, hlavička s počasím, legenda a karty programu
import { WEATHER_LOCATION } from "../config.js";
import { categoryLegend, emptyCategoryState } from "../components/category.js";
import { itineraryCard } from "../components/itineraryCard.js";
import { itinerary } from "../data/itinerary.js";
import {
  findPlace,
  getDay,
  isDone,
  itemKey,
  matchesCategoryFilter,
  state,
} from "../state.js";
import { dayOfMonth, formatShortDate } from "../utils/date.js";
import { html, mount } from "../utils/html.js";

const WEATHER_STATUS = {
  loading: { icon: "fa-solid fa-spinner fa-spin", text: "Načítám počasí" },
  error: {
    icon: "fa-solid fa-triangle-exclamation",
    text: "Počasí nedostupné",
  },
  done: { icon: "fa-regular fa-calendar", text: "Předpověď zatím není" },
};

function daySelector(activeKey) {
  return itinerary.map(
    (day) =>
      html` <button
        data-action="switch-day"
        data-day="${day.key}"
        class="flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${day.key ===
        activeKey
          ? "bg-teal-700 text-white"
          : "text-slate-500"}"
      >
        ${day.short} ${dayOfMonth(day.date)}.
      </button>`,
  );
}

function weatherChip(forecast, status) {
  if (!forecast) {
    const { icon, text } = WEATHER_STATUS[status];
    return html` <div
      class="flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-medium text-teal-100 shrink-0"
    >
      <i class="${icon}"></i> ${text}
    </div>`;
  }
  const { icon, label, maxTemp, minTemp, precip } = forecast;
  return html` <div
    class="flex items-center gap-2 bg-white/10 border border-white/15 pl-2.5 pr-3 py-1.5 rounded-full shrink-0"
    title="Předpověď pro ${WEATHER_LOCATION.name}: ${label}, srážky ${precip} mm"
  >
    <i class="fa-solid ${icon} text-sm"></i>
    <span class="text-[11px] font-semibold text-teal-50">${label}</span>
    <span class="text-xs font-extrabold"
      >${maxTemp}°<span class="text-teal-300 font-semibold"
        >/${minTemp}°</span
      ></span
    >
    ${precip > 0
      ? html`<span class="text-[10px] font-semibold text-sky-200"
          ><i class="fa-solid fa-droplet mr-0.5"></i>${precip} mm</span
        >`
      : ""}
  </div>`;
}

function dayHeader(day) {
  return html` <div
    class="bg-teal-800 text-white p-4 rounded-2xl shadow-sm space-y-2"
  >
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <span class="text-[11px] font-bold uppercase tracking-wider text-teal-200"
        >${day.name} · ${formatShortDate(day.date)}</span
      >
      ${weatherChip(state.weather.byDate[day.date], state.weather.status)}
    </div>
    <h2 class="text-lg font-extrabold leading-snug">${day.title}</h2>
  </div>`;
}

export function renderPlan() {
  const day = getDay(state.dayKey);
  const cards = day.items
    .map((item, index) => ({ item, index, place: findPlace(item.placeId) }))
    .filter(({ place }) => matchesCategoryFilter(place?.category))
    .map(({ item, index, place }) =>
      itineraryCard({
        key: itemKey(day.key, item),
        item,
        place,
        done: isDone(day.key, item),
        detailsId: `itinerary-details-${day.key}-${index}`,
      }),
    );

  mount("day-selector", daySelector(day.key));
  mount(
    "day-content",
    html` ${dayHeader(day)} ${categoryLegend(state.categoryGroup)}
    ${cards.length ? cards : emptyCategoryState(state.categoryGroup)}`,
  );
}

// Odškrtnutí přepne jen třídy na kartě — rozbalené detaily zůstanou otevřené
export function syncDoneState(key, done) {
  document
    .querySelectorAll(`.itin-card[data-item-key="${CSS.escape(key)}"]`)
    .forEach((card) => {
      card.classList.toggle("is-done", done);
      card.querySelector(".check-box").setAttribute("aria-checked", done);
    });
}
