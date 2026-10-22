// Záložka Cornetti & Gastro: zvýrazněné podniky nahoře, pod nimi ostatní gastro místa
import { gastroCard, gastroHighlightCard } from "../components/gastroCard.js";
import { places } from "../data/places.js";
import { mount } from "../utils/html.js";

export function renderGastro() {
  const gastro = places.filter((place) => place.category === "gastro");
  mount(
    "gastro-highlights",
    gastro.filter((p) => p.highlight).map(gastroHighlightCard),
  );
  mount("gastro-list", gastro.filter((p) => !p.highlight).map(gastroCard));
}
