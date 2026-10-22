import { DINING_AREAS, STORAGE_KEYS, TRIP, categoryGroupOf } from "./config.js";
import { itinerary } from "./data/itinerary.js";
import { places } from "./data/places.js";
import { loadJson, saveJson } from "./services/storage.js";

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
  dayKey: TRIP.firstDay.key,
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

// Místo je navštívené, když je odškrtnutá jeho zastávka v itineráři, nebo odškrtnutý gastro tip
export function isPlaceVisited(placeId) {
  return (
    state.visitedPlaces.has(placeId) ||
    placeVisits(placeId).some(({ done }) => done)
  );
}

// Gastro tipy dne seskupené podle lokalit, kde se ten den pohybujeme
export function diningGroups(day) {
  return (day.diningAreas ?? [])
    .map((area) => ({
      area,
      label: DINING_AREAS[area],
      places: places.filter((place) => place.area === area),
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
