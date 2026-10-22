// Odkazy do Google Maps z textového dotazu (název a adresa místa)
const MAPS_BASE = "https://www.google.com/maps";

export function mapsSearchUrl(query) {
  return `${MAPS_BASE}/search/?api=1&query=${encodeURIComponent(query)}`;
}

// Trasa z aktuální polohy; `travelMode` "driving" | "walking" | "transit"
export function mapsDirectionsUrl(destination, travelMode) {
  return `${MAPS_BASE}/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;
}
