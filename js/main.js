// Vstupní bod: první vykreslení, načtení počasí a obsluha kliknutí.
// Prvky v HTML ohlašují akci přes data-action (+ data-* parametry), viz `actions` níže.
import { WEATHER_LOCATION } from "./config.js";
import { fetchForecast } from "./services/weather.js";
import {
  addNote,
  clearCategoryFilter,
  deleteNote,
  state,
  toggleCategoryGroup,
  toggleDone,
} from "./state.js";
import { renderGallery } from "./views/gallery.js";
import { renderNavigation } from "./views/navigation.js";
import { renderNotes } from "./views/notes.js";
import { renderPlaces } from "./views/places.js";
import { renderPlan, syncDoneState } from "./views/plan.js";
import { renderHeaderProgress, renderProgress } from "./views/progress.js";

function showTab(tab) {
  state.tab = tab;
  renderNavigation();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleDetails(button) {
  const expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", expanded);
  document.getElementById(button.getAttribute("aria-controls")).hidden =
    !expanded;
}

const actions = {
  "switch-tab": ({ tab }) => showTab(tab),

  "switch-day": ({ day }) => {
    state.dayKey = day;
    renderPlan();
  },

  "go-to-day": ({ day }) => {
    state.dayKey = day;
    showTab("plan");
    renderPlan();
    scrollToTop();
  },

  "open-progress": () => {
    showTab("progress");
    renderProgress();
    scrollToTop();
  },

  "toggle-done": ({ key }) => {
    syncDoneState(key, toggleDone(key));
    renderHeaderProgress();
    if (state.tab === "progress") renderProgress();
  },

  "toggle-details": (_, button) => toggleDetails(button),

  "filter-category": ({ group }) => {
    toggleCategoryGroup(group);
    renderPlan();
    renderPlaces();
  },

  "clear-filter": () => {
    clearCategoryFilter();
    renderPlan();
    renderPlaces();
  },

  "add-note": () => {
    const input = document.getElementById("note-input");
    const text = input.value.trim();
    if (!text) return;
    addNote(text);
    input.value = "";
    renderNotes();
  },

  "delete-note": ({ index }) => {
    deleteNote(Number(index));
    renderNotes();
  },
};

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  actions[target.dataset.action]?.(target.dataset, target);
});

// Psaní do vyhledávání přepne na katalog míst; prázdné pole vrátí celý katalog
document.getElementById("search-input").addEventListener("input", (event) => {
  state.searchQuery = event.target.value.trim();
  if (state.searchQuery) showTab("places");
  renderPlaces();
});

async function loadWeather() {
  try {
    state.weather = {
      status: "done",
      byDate: await fetchForecast(WEATHER_LOCATION),
    };
  } catch (error) {
    console.warn("Chyba při načítání počasí:", error);
    state.weather = { status: "error", byDate: {} };
  }
  renderPlan();
}

renderNavigation();
renderPlan();
renderPlaces();
renderGallery();
renderNotes();
renderHeaderProgress();
loadWeather();
