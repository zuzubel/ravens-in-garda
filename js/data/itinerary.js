// Program po dnech. Položka s `placeId` odkazuje na místo v katalogu (data/places.js).
// `time` začátek (podle něj se ukládá odškrtnutí), volitelně `until` konec.
// `route` = přesun na zastávku po úsecích (každý na vlastním řádku): `mode` "car" | "walk" | "bus" | "ferry",
// `text`, volitelně `distance` a `duration`. Vzdálenosti a časy z kempu, autobusy a trajekty
// podle podzimních jízdních řádů 2026.
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
        route: [
          {
            mode: "car",
            text: "Z Prahy do Camping Brione přes Mnichov a Brenner",
            distance: "cca 750 km",
            duration: "cca 8 h bez přestávek",
          },
        ],
        name: "Příjezd a ubytování v Camping Brione",
        description: "Příjezd do Riva del Garda a check-in v kempu.",
      },
      {
        time: "16:00",
        until: "17:30",
        route: [
          {
            mode: "walk",
            text: "Pěšky z kempu po nábřeží k dolní stanici výtahu (Via Monte Oro)",
            distance: "2,3 km",
            duration: "cca 30 min",
          },
        ],
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
        route: [
          {
            mode: "car",
            text: "Autem z kempu k muzeu v Molina di Ledro, odjezd v 9:00",
            distance: "14 km",
            duration: "cca 20 min",
          },
        ],
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
        route: [
          {
            mode: "car",
            text: "Autem z kempu k parkovišti u jezera (cca 5 €), odjezd v 9:20",
            distance: "13 km",
            duration: "cca 20 min",
          },
        ],
        name: "Lago di Tenno & vesnička Canale",
        description: "Pěší procházka bez kol, oběd.",
        placeId: "tenno",
      },
      {
        time: "14:30",
        until: "18:30",
        route: [
          {
            mode: "walk",
            text: "Pěšky z kempu do přístavu v Rivě (Piazza Catena)",
            distance: "2,2 km",
            duration: "cca 30 min",
          },
          {
            mode: "ferry",
            text: "Trajektem z Rivy ve 14:25, v Limone 15:10 · zpět v 18:05, v Rivě 18:50",
            duration: "45 min",
          },
        ],
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
        route: [
          {
            mode: "car",
            text: "Autem z kempu po SS249 k dolní stanici lanovky v Malcesine (podzemní parkoviště), odjezd v 8:00",
            distance: "17,2 km",
            duration: "cca 25 min",
          },
        ],
        name: "Monte Baldo — Rotující lanovka",
        description:
          "Rotující lanovka a zvířata na vrcholu. Pak návrat do Rivy a oběd.",
        placeId: "funivia",
      },
      {
        time: "15:30",
        until: "17:30",
        route: [
          {
            mode: "bus",
            text: "Linkou 2 ze zastávky Brione, Campeggio (u kempu) v 15:35 do Arco, Autostazione",
            duration: "17 min",
          },
          {
            mode: "walk",
            text: "Pěšky z autobusového nádraží na Piazza III Novembre",
            distance: "550 m",
            duration: "cca 8 min",
          },
          {
            mode: "bus",
            text: "Zpět linkou 1 z Arco, Autostazione v 17:23, u kempu v 17:38",
            duration: "15 min",
          },
        ],
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
        route: [
          {
            mode: "car",
            text: "V 8:30 ranní káva, pak autem z kempu k vodopádům",
            distance: "7 km",
            duration: "cca 15 min",
          },
        ],
        name: "Varone Waterfall Cave Park",
        description: "Návštěva obou jeskyní s pláštěnkami.",
        placeId: "varone",
      },
      {
        time: "10:30",
        until: "11:30",
        route: [
          {
            mode: "car",
            text: "Autem od vodopádů zpět do kempu",
            distance: "7,7 km",
            duration: "cca 15 min",
          },
        ],
        name: "Sbalení a late check-out",
        description: "Sbalení věcí a domluvený late check-out v kempu.",
      },
      {
        time: "11:30",
        until: "12:00",
        route: [
          {
            mode: "car",
            text: "Z kempu do Prahy přes Brenner a Mnichov",
            distance: "cca 750 km",
            duration: "cca 8 h bez přestávek",
          },
        ],
        name: "Odjezd směr Praha",
        description: "Cesta domů.",
      },
    ],
  },
];
