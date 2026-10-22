// localStorage může být nedostupné (anonymní okno, zablokovaná data webu)
// nebo obsahovat poškozená data — aplikace pak běží dál jen s daty v paměti.

export function loadJson(key, fallback, isValid = () => true) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    return isValid(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Uložení se nepovedlo — změna platí do zavření stránky.
  }
}
