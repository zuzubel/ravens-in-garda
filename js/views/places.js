// Záložka Všechna místa: celý katalog, nebo výsledky vyhledávání
import { categoryLegend, emptyCategoryState } from "../components/category.js";
import { placeCard } from "../components/placeCard.js";
import { emptyState } from "../components/ui.js";
import { places } from "../data/places.js";
import { isPlaceVisited, matchesCategoryFilter, state } from "../state.js";
import { mount } from "../utils/html.js";

const SEARCH_FIELDS = ["name", "mustDo", "address", "dayInfo"];

function matchesSearch(place, query) {
  const texts = [
    ...SEARCH_FIELDS.map((field) => place[field]),
    place.intro ?? "",
    ...(place.bestsellers ?? []).flatMap(({ name, note }) => [name, note]),
    ...(place.keywords ?? []),
  ];
  return texts.some((text) => text.toLowerCase().includes(query));
}

// Místa s prioritou (1 = nejvyšší) první, ostatní za nimi v pořadí z dat
const byPriority = (a, b) =>
  (a.priority ?? Number.MAX_SAFE_INTEGER) -
  (b.priority ?? Number.MAX_SAFE_INTEGER);

function renderList(query) {
  const visible = places
    .filter(
      (place) =>
        matchesCategoryFilter(place.category) &&
        (!query || matchesSearch(place, query)),
    )
    .sort(byPriority);
  if (visible.length) {
    return visible.map((place) =>
      placeCard(place, {
        highlighted: Boolean(query),
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
