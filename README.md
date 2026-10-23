# Ravens in Garda

Rodinný itinerář na Lago di Garda (27.–31. 10. 2026). Statická stránka bez build kroku,
nasazená přes GitHub Pages: https://zuzubel.github.io/ravens-in-garda/

## Spuštění lokálně

JavaScript je rozdělený do ES modulů, které prohlížeč nenačte z disku (`file://`).
Stránku je potřeba otevřít přes lokální server, například:

```sh
npx serve .
```

nebo v VS Code rozšířením **Live Server** (pravým na `index.html` → _Open with Live Server_).

## Struktura

```
index.html              kostra stránky a statické texty
css/styles.css          vlastní styly navíc k Tailwindu
js/
  main.js               start aplikace a obsluha kliknutí (data-action)
  config.js             nastavení: záložky, kategorie, klíče úložiště, poloha pro počasí
  state.js              stav aplikace a jeho změny (odškrtnutí, filtr, poznámky)
  data/                 obsah: places.js, itinerary.js, gallery.js
  components/           znovupoužitelné části UI (karty, tlačítka, legenda…)
  views/                vykreslení jednotlivých záložek
  services/             počasí (Open-Meteo) a localStorage
  utils/                html`` šablony s escapováním, formát data, odkazy na Google Maps a Wikimedia Commons
```

## Jak upravit obsah

- **Místo** přidej do `js/data/places.js` (`category: "gastro"` = oranžový proužek, ostatní zelený).
- **Program dne** uprav v `js/data/itinerary.js`; `placeId` propojí položku s místem z katalogu.
- **Fotka do galerie**: pole `photo` u zážitku v `js/data/places.js` (soubor z Wikimedia Commons
  s autorem a licencí). Galerie ukáže zážitky z itineráře v pořadí programu, gastro vynechá.
- Klíč odškrtnutí je `<den>-<čas>` — změna času položky zruší její uložené odškrtnutí.

## Klikání

Prvky neobsahují `onclick`. Tlačítko ohlásí akci atributem `data-action`
(a parametry v `data-*`), `main.js` ji obslouží:

```html
<button data-action="go-to-day" data-day="ct">…</button>
```
