// Záložka Galerie: odkaz na sdílené album a fotky zážitků z itineráře
import { SHARED_ALBUM_URL } from "../data/gallery.js";
import { findPlace, itemKey, plannedExperiences } from "../state.js";
import { commonsFilePageUrl, commonsImageUrl } from "../utils/commons.js";
import { formatShortDate } from "../utils/date.js";
import { html, mount } from "../utils/html.js";

// Klik na fotku ji zvětší (s autorem fotky), klik na text pod ní otevře zastávku v itineráři
function galleryCard({ day, item, place }) {
  return html` <div
    class="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-1"
  >
    <button
      data-action="open-photo"
      data-place="${place.id}"
      class="block w-full"
      aria-label="Zvětšit fotku: ${place.name}"
    >
      <img
        src="${commonsImageUrl(place.photo.file)}"
        alt="${place.name}"
        loading="lazy"
        class="w-full h-28 object-cover rounded-xl"
      />
    </button>
    <button
      data-action="go-to-item"
      data-day="${day.key}"
      data-key="${itemKey(day.key, item)}"
      class="block w-full pt-0.5 space-y-0.5 rounded-lg hover:bg-slate-50 transition-colors"
    >
      <p class="text-xs font-bold text-slate-800 text-center leading-snug">
        ${place.name}
      </p>
      <p class="text-[10px] font-semibold text-teal-700 text-center">
        ${day.short} ${formatShortDate(day.date)}
        <i class="fa-solid fa-chevron-right text-[8px]"></i>
      </p>
    </button>
  </div>`;
}

export function renderGallery() {
  document.getElementById("shared-album-link").href = SHARED_ALBUM_URL;
  mount(
    "gallery-grid",
    plannedExperiences()
      .filter(({ place }) => place.photo)
      .map(galleryCard),
  );
}

export function openPhoto(placeId) {
  const { name, photo } = findPlace(placeId);
  const img = document.getElementById("photo-dialog-img");
  img.removeAttribute("src"); // ať při načítání neprobleskne předchozí fotka
  img.src = commonsImageUrl(photo.file, 960);
  img.alt = name;
  document.getElementById("photo-dialog-caption").textContent = name;
  // Licence CC BY-SA vyžaduje uvést autora; odkaz vede na stránku fotky na Commons
  const credit = document.getElementById("photo-dialog-credit");
  credit.href = commonsFilePageUrl(photo.file);
  credit.textContent = `Foto: ${photo.author} · ${photo.license} · Wikimedia Commons`;
  document.getElementById("photo-dialog").showModal();
}

export function closePhoto() {
  document.getElementById("photo-dialog").close();
}
