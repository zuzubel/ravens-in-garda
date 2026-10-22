// Záložka Galerie: odkaz na sdílené album a náhledy míst
import { SHARED_ALBUM_URL, gallery } from "../data/gallery.js";
import { html, mount } from "../utils/html.js";

function galleryCard({ title, image }) {
  return html` <div
    class="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-1.5"
  >
    <img
      src="${image}"
      alt="${title}"
      loading="lazy"
      class="w-full h-28 object-cover rounded-xl"
    />
    <p class="text-xs font-bold text-slate-800 text-center">${title}</p>
  </div>`;
}

export function renderGallery() {
  document.getElementById("shared-album-link").href = SHARED_ALBUM_URL;
  mount("gallery-grid", gallery.map(galleryCard));
}
