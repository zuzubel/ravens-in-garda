// Fotky z Wikimedia Commons podle názvu souboru, např. "Lago di Tenno 1.jpg"
const COMMONS_BASE = "https://commons.wikimedia.org/wiki";

// Commons má předgenerované náhledy jen v pevných šířkách (330, 500, 960 px…),
// jiná šířka se zaokrouhlí nahoru na větší soubor
export function commonsImageUrl(file, width = 500) {
  return `${COMMONS_BASE}/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

// Stránka souboru s autorem a licencí
export function commonsFilePageUrl(file) {
  return `${COMMONS_BASE}/File:${encodeURIComponent(file)}`;
}
