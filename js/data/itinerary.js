// Program po dnech. Položka s `placeId` odkazuje na místo v katalogu (data/places.js).
export const itinerary = [
  {
    key: "ut",
    short: "Út",
    name: "Úterý",
    date: "2026-10-27",
    title: "Příjezd do Camping Brione, Výtah & Cornetto",
    items: [
      {
        time: "14:30",
        drive: "🚗 Příjezd z ČR ➔ Camping Brione (Via Brione 32)",
        distance: "0 km (Start)",
        name: "Ubytování v Camping Brione",
        description:
          "Příjezd do kempu, zabydlení v mobilheimu/bungalovu, děti si vyzkouší bazén a hřiště.",
      },
      {
        time: "15:30",
        drive: "🚶 Pěšky (nebo 🚗 auta 3 min) z Camping Brione",
        distance: "1,2 km (cca 3 min / 15 min pěšky)",
        name: "DelPane Bakery — První Cornetto",
        description:
          "První odpolední sladká zastávka na pistáciové cornetti a kávu.",
        placeId: "delpane",
      },
      {
        time: "16:30",
        drive: "🚗 Přejezd z pekařství k parkovišti v centru",
        distance: "1,8 km (cca 5 min)",
        name: "Bastione di Riva — Skleněný Výtah",
        description:
          "Jízda moderním panoramatickým výtahem na pevnost s vyhlídkou.",
        placeId: "bastione",
      },
      {
        time: "18:00",
        drive: "🚗 Přejezd z výtahu k pláži",
        distance: "1,5 km (cca 4 min)",
        name: "Bar dei pini — Relax u vody",
        description:
          "Pohodový podvečer na travnaté pláži u vody, děti si poběhají v parku.",
        placeId: "pini",
      },
      {
        time: "19:30",
        drive: "🚗 Přejezd z pláže do centra pizzerie",
        distance: "1,1 km (cca 3 min)",
        name: "Ristorante Pizzeria Leon d'Oro",
        description:
          "Večeře v tradiční pizzerii. Zpět do kempu Brione potom jen 1,9 km (5 min).",
        placeId: "leondoro",
      },
    ],
  },
  {
    key: "st",
    short: "St",
    name: "Středa",
    date: "2026-10-28",
    title: "Horské Monte Baldo & Obří Poháry u Flory",
    items: [
      {
        time: "09:00",
        drive: "🚗 Z Camping Brione po východním břehu jezera (SS249)",
        distance: "17,2 km (cca 25 min)",
        name: "Funivia Malcesine-Monte Baldo",
        description:
          "Výjezd otáčivou lanovkou nahoru za kravičkami a výhledy na celé jezero.",
        placeId: "funivia",
      },
      {
        time: "12:30",
        drive: "🚗 Přejezd z lanovky do historického centra",
        distance: "0,9 km (cca 2 min)",
        name: "Malcesine — Staré město & Oběd",
        description:
          "Klidná procházka historickým přístavem a oběd pod hradem Scaligerů.",
      },
      {
        time: "16:00",
        drive: "🚗 Přejezd z Malcesine po silnici směrem na Nago-Torbole",
        distance: "13,5 km (cca 18 min)",
        name: "Vyhlídka Panorama Sul Garda",
        description:
          "Krátká fotozastávka u silnice s výhledem na celé severní jezero.",
      },
      {
        time: "17:00",
        drive: "🚗 Přejezd z vyhlídky směrem k hotelu/kavárně Flora",
        distance: "4,1 km (cca 7 min)",
        name: "Bar Gelateria Flora® — Velké Gelato",
        description:
          "Relaxace v palmové zahradě nad obřími zmrzlinovými poháry (jen 400 m od kempu Brione!).",
        placeId: "flora",
      },
    ],
  },
  {
    key: "ct",
    short: "Čt",
    name: "Čtvrtek",
    date: "2026-10-29",
    title: "Jeskynní Vodopád Varone, Lago di Tenno & Kola",
    items: [
      {
        time: "08:30",
        drive: "🚗 Z Camping Brione směrem do Torbole",
        distance: "2,8 km (cca 5 min)",
        name: "Panificio San Giacomo — Nákup na piknik",
        description: "Ranní nákup čerstvé slané focaccie na rodinný výlet.",
        placeId: "sangiacomo",
      },
      {
        time: "09:30",
        drive: "🚗 Z pekařství Torbole k vodopádům Varone",
        distance: "6,2 km (cca 10 min)",
        name: "Varone Waterfall Cave Park",
        description: "Zážitkový hřmící vodopád v jeskyni v pláštěnkách.",
        placeId: "varone",
      },
      {
        time: "11:30",
        drive: "🚗 Z Varone do kopce k jezeru Tenno",
        distance: "8,1 km (cca 12 min)",
        name: "Lago di Tenno & Cyklookruh Canale",
        description:
          "Pohodové odpoledne u tyrkysové vody, piknik + projížďka na kolech přes kamennou vesničku Canale di Tenno (doporučeno půjčit e-biky/kola v Riva del Garda).",
        placeId: "tenno",
      },
      {
        time: "15:30",
        drive: "🚗 Z jezera Tenno dolů do městečka Arco",
        distance: "9,4 km (cca 14 min)",
        name: "Castello di Arco — Hrad pro princezny",
        description:
          "Nenáročný výstup mezi olivovníky k pohádkové hradní věži.",
        placeId: "arco",
      },
      {
        time: "18:30",
        drive: "🚗 Z Arca do restaurace v Riva del Garda",
        distance: "5,3 km (cca 9 min)",
        name: "Večeře v Restaurant Rialto",
        description:
          "Rybí speciality z jezera Garda a gnocchi pro děti. Zpět do kempu Brione cca 600 m.",
        placeId: "rialto",
      },
    ],
  },
  {
    key: "pa",
    short: "Pá",
    name: "Pátek",
    date: "2026-10-30",
    title: "Citrónové Limone & Cyklovýlet kolem Lago di Ledro",
    items: [
      {
        time: "09:30",
        drive:
          "🚗 Z Camping Brione přes skalní tunely západního břehu (SS45bis)",
        distance: "12,8 km (cca 16 min)",
        name: "Porto Vecchio Limone & I love Limone",
        description:
          "Procházka citrónovým městečkem, obchůdky a fotopoint u vody.",
        placeId: "limone",
      },
      {
        time: "12:00",
        drive: "🚶 Pěšky v přístavu Limone",
        distance: "0,1 km (pěšky)",
        name: "House of Lemonade & Molo Al Buongusto",
        description:
          "Čerstvá citronáda pro děti + mořské těstoviny k obědu u vody.",
        placeId: "houselemon",
      },
      {
        time: "14:30",
        drive: "🚗 Z Limone nahoru k horskému jezeru Ledro (SS240)",
        distance: "18,6 km (cca 24 min)",
        name: "Lago di Ledro — Palafitte & Cyklovýlet (10 km)",
        description:
          "Kůlové stavby Museo delle Palafitte + zapůjčení kol v Beach & Bike Rent a pohodový 10km okruh kolem jezera bez aut.",
        placeId: "ledro",
      },
      {
        time: "18:30",
        drive: "🚗 Z jezera Ledro dolů k jezeru Garda do Torbole",
        distance: "15,1 km (cca 20 min)",
        name: "Pizzeria Centrale / al Porto (Torbole)",
        description:
          "Večeře u přístavu v Torbole po cyklistickém dni. Zpět do kempu Brione pak jen 2,1 km (4 min).",
        placeId: "centrale",
      },
    ],
  },
  {
    key: "so",
    short: "So",
    name: "Sobota",
    date: "2026-10-31",
    title: "Poslední Cornetto & Rozloučení",
    items: [
      {
        time: "09:00",
        drive: "🚗 Z Camping Brione k pekařství",
        distance: "1,2 km (cca 3 min)",
        name: "DelPane Bakery — Poslední pistáciové cornetto",
        description: "Snídaňové rozloučení s nejlepšími croissanty.",
        placeId: "delpane",
      },
      {
        time: "10:00",
        drive: "🚗 Z pekařství k parku u jezera",
        distance: "0,8 km (cca 2 min)",
        name: "Nábřeží v Riva del Garda & Hřiště",
        description: "Pohodový nákup suvenýrů a dětské hřiště v parku u vody.",
      },
      {
        time: "11:30",
        drive: "🚗 Z parku k Bar Gelateria Flora",
        distance: "0,5 km (cca 1 min)",
        name: "Bar Gelateria Flora® — Zmrzlina na cestu",
        description:
          "Poslední kopeček vyhlášené zmrzliny a odjezd domů z Camping Brione.",
        placeId: "flora",
      },
    ],
  },
];
