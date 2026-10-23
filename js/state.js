import { DINING_AREAS, STORAGE_KEYS, TRIP, categoryGroupOf } from "./config.js";
import { itinerary } from "./data/itinerary.js";
import { places } from "./data/places.js";
import { loadJson, saveJson } from "./services/storage.js";
import { daysUntil, isoWeekday, todayIsoDate } from "./utils/date.js";

const isStringArray = (value) =>
  Array.isArray(value) && value.every((v) => typeof v === "string");

// Načte uložené klíče a nechá jen ty, které v datech pořád existují
// (po změně programu nebo katalogu se staré klíče zahodí)
function loadKeySet(storageKey, validKeys) {
  const saved = loadJson(storageKey, [], isStringArray);
  return new Set(saved.filter((key) => validKeys.includes(key)));
}

const ITEM_KEYS = itinerary.flatMap((day) =>
  day.items.map((item) => itemKey(day.key, item)),
);
const PLACE_IDS = places.map((place) => place.id);

export const state = {
  tab: "plan",
  dayKey: defaultDayKey(),
  categoryGroup: null, // null | "zazitky" | "gastro"
  searchQuery: "",
  doneItems: loadKeySet(STORAGE_KEYS.doneItems, ITEM_KEYS), // odškrtnuté zastávky itineráře
  visitedPlaces: loadKeySet(STORAGE_KEYS.visitedPlaces, PLACE_IDS), // odškrtnuté gastro tipy
  notes: loadJson(STORAGE_KEYS.notes, [], isStringArray),
  weather: { status: "loading", byDate: {} }, // status: "loading" | "done" | "error"
};

// --- Výběry z dat ---

const placesById = new Map(places.map((place) => [place.id, place]));

export function findPlace(placeId) {
  return placesById.get(placeId);
}

export function getDay(dayKey) {
  return itinerary.find((day) => day.key === dayKey);
}

// Během výletu se aplikace otevírá na dnešním dni, před ním a po něm na prvním
export function defaultDayKey() {
  const today = todayIsoDate();
  return (itinerary.find((day) => day.date === today) ?? TRIP.firstDay).key;
}

// Klíč položky "<den>-<začátek>", např. "ut-16:00" — takto se ukládá do localStorage
export function itemKey(dayKey, item) {
  return `${dayKey}-${item.time}`;
}

export function isDone(dayKey, item) {
  return state.doneItems.has(itemKey(dayKey, item));
}

// Zastávky itineráře u daného místa — místo může být v programu vícekrát, nebo vůbec
export function placeVisits(placeId) {
  return itinerary.flatMap((day) =>
    day.items
      .filter((item) => item.placeId === placeId)
      .map((item) => ({
        day,
        item,
        key: itemKey(day.key, item),
        done: isDone(day.key, item),
      })),
  );
}

// Zážitky (ne gastro) z itineráře v pořadí programu, každé místo jen jednou — jeho první zastávka
export function plannedExperiences() {
  const seen = new Set();
  const experiences = [];
  for (const day of itinerary) {
    for (const item of day.items) {
      const place = item.placeId && findPlace(item.placeId);
      if (!place || seen.has(place.id)) continue;
      if (categoryGroupOf(place.category) !== "zazitky") continue;
      seen.add(place.id);
      experiences.push({ day, item, place });
    }
  }
  return experiences;
}

// Místo je navštívené, když je odškrtnutá jeho zastávka v itineráři, nebo odškrtnutý gastro tip
export function isPlaceVisited(placeId) {
  return (
    state.visitedPlaces.has(placeId) ||
    placeVisits(placeId).some(({ done }) => done)
  );
}

// Od jaké šance na srážky zastávka s požadavkem „sucho“ dostane upozornění
const RAIN_CHANCE_LIMIT = 50;
// Předpověď na víc dní dopředu je nejistá — slunce na 5 dní vychází jen asi ze dvou třetin
const RELIABLE_FORECAST_DAYS = 3;

// Předpověď dne odporuje požadavku zastávky na počasí (`weatherNeed` v data/itinerary.js):
// "sun" chce slunečno nebo polojasno, "dry" chce den bez deště
export function weatherWarning(day, item) {
  const forecast = state.weather.byDate[day.date];
  if (!item.weatherNeed || !forecast) return null;
  const conflict =
    item.weatherNeed === "sun"
      ? forecast.sky !== "sunny"
      : forecast.sky === "wet" || forecast.rainChance >= RAIN_CHANCE_LIMIT;
  if (!conflict) return null;
  const daysAhead = daysUntil(day.date);
  return {
    need: item.weatherNeed,
    forecast,
    uncertainDays: daysAhead > RELIABLE_FORECAST_DAYS ? daysAhead : null,
  };
}

// Podnik má v den výletu zavírací den (`closedWeekdays` v data/places.js)
export function isClosedOn(place, day) {
  return place.closedWeekdays?.includes(isoWeekday(day.date)) ?? false;
}

// Gastro tipy dne seskupené podle lokalit, kde se ten den pohybujeme;
// podniky, které mají ten den zavřeno, jsou v lokalitě až na konci
export function diningGroups(day) {
  return (day.diningAreas ?? [])
    .map((area) => ({
      area,
      label: DINING_AREAS[area],
      places: places
        .filter((place) => place.area === area)
        .sort((a, b) => isClosedOn(a, day) - isClosedOn(b, day)),
    }))
    .filter(({ places: areaPlaces }) => areaPlaces.length);
}

// Pokrok počítá jen zastávky itineráře, gastro tipy ne
export function getProgress() {
  const total = ITEM_KEYS.length;
  const done = ITEM_KEYS.filter((key) => state.doneItems.has(key)).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function matchesCategoryFilter(category) {
  return (
    !state.categoryGroup || categoryGroupOf(category) === state.categoryGroup
  );
}

// --- Změny stavu ---

function toggleInSet(set, storageKey, key) {
  if (set.has(key)) set.delete(key);
  else set.add(key);
  saveJson(storageKey, [...set]);
  return set.has(key);
}

export function toggleDone(key) {
  return toggleInSet(state.doneItems, STORAGE_KEYS.doneItems, key);
}

export function toggleVisitedPlace(placeId) {
  return toggleInSet(state.visitedPlaces, STORAGE_KEYS.visitedPlaces, placeId);
}

// Klik na už vybranou skupinu filtr zruší
export function toggleCategoryGroup(group) {
  state.categoryGroup = state.categoryGroup === group ? null : group;
}

export function clearCategoryFilter() {
  state.categoryGroup = null;
}

export function addNote(text) {
  state.notes.unshift(text);
  saveJson(STORAGE_KEYS.notes, state.notes);
}

export function deleteNote(index) {
  state.notes.splice(index, 1);
  saveJson(STORAGE_KEYS.notes, state.notes);
}
