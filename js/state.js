import { STORAGE_KEYS, TRIP, categoryGroupOf } from "./config.js";
import { itinerary } from "./data/itinerary.js";
import { places } from "./data/places.js";
import { loadJson, saveJson } from "./services/storage.js";

const isStringArray = (value) =>
  Array.isArray(value) && value.every((v) => typeof v === "string");

export const state = {
  tab: "plan",
  dayKey: TRIP.firstDay.key,
  categoryGroup: null, // null | "zazitky" | "gastro"
  searchQuery: "",
  doneItems: new Set(loadJson(STORAGE_KEYS.doneItems, [], isStringArray)),
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

// Klíč položky "<den>-<čas>", např. "ut-15:30" — takto se ukládá do localStorage
export function itemKey(dayKey, item) {
  return `${dayKey}-${item.time}`;
}

export function isDone(dayKey, item) {
  return state.doneItems.has(itemKey(dayKey, item));
}

// Místo je navštívené, když je v itineráři odškrtnutá aspoň jedna jeho položka
export function isPlaceVisited(placeId) {
  return itinerary.some((day) =>
    day.items.some((item) => item.placeId === placeId && isDone(day.key, item)),
  );
}

export function getProgress() {
  const all = itinerary.flatMap((day) =>
    day.items.map((item) => [day.key, item]),
  );
  const done = all.filter(([dayKey, item]) => isDone(dayKey, item)).length;
  const total = all.length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function matchesCategoryFilter(category) {
  return (
    !state.categoryGroup || categoryGroupOf(category) === state.categoryGroup
  );
}

// --- Změny stavu ---

export function toggleDone(key) {
  if (state.doneItems.has(key)) state.doneItems.delete(key);
  else state.doneItems.add(key);
  saveJson(STORAGE_KEYS.doneItems, [...state.doneItems]);
  return state.doneItems.has(key);
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
