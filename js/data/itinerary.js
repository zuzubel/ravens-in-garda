// Program po dnech. Položka s `placeId` odkazuje na místo v katalogu (data/places.js).
// `time` začátek (podle něj se ukládá odškrtnutí), volitelně `until` konec.
// `route` = přesun na zastávku: `mode` "car" | "walk" | "bus" | "ferry", `text`,
// volitelně `distance` a `duration`.
// `diningAreas` = lokality, kde se ten den pohybujeme; jejich gastro podniky (`area` v data/places.js)
// se ukážou pod zážitky v sekci „Kde se najíst“.
export const itinerary = [
  {
    key: "ut",
    short: "Út",
    name: "Úterý",
    date: "2026-10-27",
    title: "Příjezd do Rivy & skleněný výtah",
    diningAreas: ["riva", "torbole"],
    items: [
      {
        time: "14:00",
        until: "15:30",
        route: {
          mode: "car",
          text: "Z Prahy do Camping Brione přes Mnichov a Brenner",
          distance: "cca 750 km",
          duration: "cca 8 h bez přestávek",
        },
        name: "Příjezd a ubytování v Camping Brione",
        description: "Příjezd do Riva del Garda a check-in v kempu.",
      },
      {
        time: "16:00",
        until: "17:30",
        route: { mode: "walk", text: "Z kempu k výtahu v Rivě" },
        name: "Bastione di Riva — Skleněný výtah",
        description:
          "Odpočinková procházka a seznámení s okolím. Jízda proskleným výtahem nahoru i dolů.",
        placeId: "bastione",
      },
    ],
  },
  {
    key: "st",
    short: "St",
    name: "Středa",
    date: "2026-10-28",
    title: "Celý den na Lago di Ledro",
    diningAreas: ["riva", "torbole"],
    items: [
      {
        time: "10:00",
        until: "16:00",
        route: { mode: "car", text: "Odjezd z Rivy v 9:00" },
        name: "Lago di Ledro — Kola & kůlové stavby",
        description:
          "Půjčení kol a jízda po bezpečné cyklostezce, návštěva pravěkých kůlových staveb. Návrat do Rivy v 16:30.",
        placeId: "ledro",
      },
    ],
  },
  {
    key: "ct",
    short: "Čt",
    name: "Čtvrtek",
    date: "2026-10-29",
    title: "Lago di Tenno, Canale & trajektem do Limone",
    diningAreas: ["limone", "riva", "torbole"],
    items: [
      {
        time: "09:45",
        until: "13:00",
        route: { mode: "bus", text: "Autobusem z Rivy v 9:00" },
        name: "Lago di Tenno & vesnička Canale",
        description: "Pěší procházka bez kol, oběd.",
        placeId: "tenno",
      },
      {
        time: "14:30",
        until: "18:30",
        route: { mode: "ferry", text: "Odpoledním trajektem z Rivy" },
        name: "Limone sul Garda",
        description:
          "Procházka starým přístavem Porto Vecchio a citronové skleníky.",
        placeId: "limone",
      },
    ],
  },
  {
    key: "pa",
    short: "Pá",
    name: "Pátek",
    date: "2026-10-30",
    title: "Monte Baldo & městečko Arco",
    diningAreas: ["arco", "riva", "torbole"],
    items: [
      {
        time: "09:00",
        until: "13:30",
        route: {
          mode: "car",
          text: "Odjezd v 8:00 z kempu do Malcesine k lanovce (SS249)",
          distance: "17,2 km",
          duration: "25 min",
        },
        name: "Monte Baldo — Rotující lanovka",
        description:
          "Rotující lanovka a zvířata na vrcholu. Pak návrat do Rivy a oběd.",
        placeId: "funivia",
      },
      {
        time: "15:30",
        until: "17:30",
        route: { mode: "bus", text: "Autobusem z Rivy", duration: "10–15 min" },
        name: "Městečko Arco",
        description:
          "Klidná procházka malebným centrem a nejlepší zmrzlina v Gelateria Tarifa.",
        placeId: "arco",
      },
    ],
  },
  {
    key: "so",
    short: "So",
    name: "Sobota",
    date: "2026-10-31",
    title: "Vodopády Varone & cesta domů",
    diningAreas: ["riva"],
    items: [
      {
        time: "09:00",
        until: "10:30",
        route: {
          mode: "car",
          text: "V 8:30 ranní káva a rychlý přesun k vodopádům",
        },
        name: "Varone Waterfall Cave Park",
        description: "Návštěva obou jeskyní s pláštěnkami.",
        placeId: "varone",
      },
      {
        time: "10:30",
        until: "11:30",
        route: { mode: "car", text: "Z vodopádů zpět do kempu" },
        name: "Sbalení a late check-out",
        description: "Sbalení věcí a domluvený late check-out v kempu.",
      },
      {
        time: "11:30",
        until: "12:00",
        route: {
          mode: "car",
          text: "Z kempu do Prahy přes Brenner a Mnichov",
          distance: "cca 750 km",
          duration: "cca 8 h bez přestávek",
        },
        name: "Odjezd směr Praha",
        description: "Cesta domů.",
      },
    ],
  },
];
