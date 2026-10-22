// Záložka Všechna místa: celý katalog, nebo výsledky vyhledávání
import { categoryLegend, emptyCategoryState } from "../components/category.js";
import { placeCard } from "../components/placeCard.js";
import { emptyState } from "../components/ui.js";
import { places } from "../data/places.js";
import {
  isPlaceVisited,
  matchesCategoryFilter,
  placeVisits,
  state,
} from "../state.js";
import { mount } from "../utils/html.js";

// Textová pole místa, ve kterých se hledá (chybějící se přeskočí)
const SEARCH_FIELDS = ["name", "mustDo", "address", "intro", "guestCard"];

function matchesSearch(place, visits, query) {
  const texts = [
    ...SEARCH_FIELDS.map((field) => place[field]),
    ...visits.map(({ day }) => day.name),
    ...(place.tips ?? []),
    ...(place.bestsellers ?? []).flatMap(({ name, note }) => [name, note]),
    ...(place.keywords ?? []),
  ];
  return texts.some((text) => text?.toLowerCase().includes(query));
}

// Místa s prioritou (1 = nejvyšší) první, ostatní za nimi v pořadí z dat
const byPriority = (a, b) =>
  (a.priority ?? Number.MAX_SAFE_INTEGER) -
  (b.priority ?? Number.MAX_SAFE_INTEGER);

function renderList(query) {
  const visible = places
    .map((place) => ({ place, visits: placeVisits(place.id) }))
    .filter(
      ({ place, visits }) =>
        matchesCategoryFilter(place.category) &&
        (!query || matchesSearch(place, visits, query)),
    )
    .sort((a, b) => byPriority(a.place, b.place));
  if (visible.length) {
    return visible.map(({ place, visits }) =>
      placeCard(place, {
        highlighted: Boolean(query),
        visits,
        visited: isPlaceVisited(place.id),
      }),
    );
  }
  return query
    ? emptyState(`Nenalezeny žádné výsledky pro "${query}".`)
    : emptyCategoryState(state.categoryGroup);
}

export function renderPlaces() {
  mount("places-legend", categoryLegend(state.categoryGroup));
  mount("places-container", renderList(state.searchQuery.toLowerCase()));
}
