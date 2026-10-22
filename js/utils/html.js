// Bezpečné skládání HTML: vložené hodnoty se escapují, vnořené šablony html`` zůstávají tak, jak jsou.
// Díky tomu se text z dat ani z poznámek uživatele nemůže vykreslit jako HTML.

class SafeHtml {
  constructor(value) {
    this.value = value;
  }
}

const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

function toHtml(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(toHtml).join("");
  if (value instanceof SafeHtml) return value.value;
  return escapeHtml(value);
}

export function html(strings, ...values) {
  const out = strings.reduce(
    (acc, str, i) => acc + str + (i < values.length ? toHtml(values[i]) : ""),
    "",
  );
  return new SafeHtml(out);
}

export function mount(elementId, content) {
  document.getElementById(elementId).innerHTML = toHtml(content);
}
