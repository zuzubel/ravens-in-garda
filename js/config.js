// Místo pro předpověď počasí
export const WEATHER_LOCATION = {
  name: "Riva del Garda",
  lat: 45.8858,
  lon: 10.8422,
  timezone: "Europe/Berlin",
};

// Klíče v localStorage — neměnit, jinak se ztratí uložené odškrtnutí a poznámky
export const STORAGE_KEYS = {
  doneItems: "garda_done_items",
  notes: "garda_user_notes",
};

// Záložky hlavního menu. Stránka pokroku (progress) nemá vlastní záložku.
export const TABS = [
  {
    key: "plan",
    label: "Itinerář (Út—So)",
    icon: "fa-regular fa-calendar-days",
  },
  {
    key: "places",
    label: "Všechna Místa (Katalog)",
    icon: "fa-solid fa-map-pin",
  },
  { key: "gallery", label: "Galerie Míst", emoji: "🖼️" },
  { key: "notes", label: "Poznámky", emoji: "📝" },
];

// Skupiny pro barevný proužek a filtr: gastro zvlášť, vše ostatní jsou zážitky
export const CATEGORY_GROUPS = {
  zazitky: {
    label: "Zážitky",
    stripe: "bg-emerald-500",
    tint: "bg-emerald-100",
  },
  gastro: { label: "Gastro", stripe: "bg-amber-300", tint: "bg-amber-100" },
};

export function categoryGroupOf(category) {
  return category === "gastro" ? "gastro" : "zazitky";
}
