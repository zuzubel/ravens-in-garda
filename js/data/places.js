// Katalog míst. `category`: "gastro" | "atrakce" | "příroda" | "památky" | "město"
// Gastro podnik má `area` (lokalita z DINING_AREAS v config.js), `icon` a `bestsellers` (seznam z recenzí
// místo řádku `mustDo`, který mají zážitky) — podle lokality se ukáže v itineráři v sekci „Kde se najíst“.
// Volitelná pole karty v katalogu:
// - `priority` (1 = nejvyšší) řadí místa a zobrazí štítek „Priorita N“; místa bez ní jsou až za nimi
// - `badge` vlastní štítek nad názvem
// - `intro` úvodní věta karty — tipy („Co vyzkoušet“ / bestsellery) se pak přesunou do detailů
// - `tips` praktické tipy, `duration` časový odhad, `guestCard` výhoda s Garda Guest Card (v detailech)
// - `keywords` skrytá klíčová slova — na kartě nejsou vidět, ale najde je vyhledávání
export const places = [
  {
    id: "delpane",
    name: "DelPane Bakery",
    category: "gastro",
    area: "riva",
    icon: "🥐",
    address: "Riva del Garda (Via Heinrich E. Thomas Mann 4)",
    price: "Cca 10–15 € za sladkosti a kávu pro celou rodinu",
    mapsUrl: "https://maps.app.goo.gl/q7V3nYP8tKJWQ5sT9",
    badge: "🏆 Vítěz na Cornetti",
    intro:
      "Čerstvě pečené italské croissanty (cornetti) plněné bohatou porcí krému těsně před podáváním.",
    bestsellers: [
      {
        name: "Cornetto al Pistacchio",
        note: "Hustý pistáciový krém (absolutní hit!)",
      },
      {
        name: "Cornetto alla Nutella / Cioccolato",
        note: "Nejoblíbenější u dětí",
      },
      {
        name: "Čerstvá Focaccia",
        note: "Slané pečivo ideální na svačinku",
      },
    ],
    tips: [
      "Pekárna je v rezidenci Ètra Suites, otevřeno denně 7:00–16:00.",
      "Výběrová káva pro rodiče.",
      "Ráno bývá občas kratší fronta.",
    ],
    keywords: ["pekarna", "pekárna", "pečivo"],
  },
  {
    id: "bastione",
    name: "Bastione di Riva & Skleněný Výtah",
    category: "atrakce",
    priority: 6,
    intro:
      "Moderní výtah děti určitě nadchne (a díky Garda Guest Card je jízda nahoru i dolů zdarma).",
    address: "Riva del Garda (Via Bastione)",
    mustDo: "Jízda panoramatickým skleněným výtahem & výhled na jezero",
    mapsUrl: "https://maps.app.goo.gl/DF9AomPn5KQ4M8NCA",
    duration: "1–1,5 hodiny",
    guestCard: "Jízda výtahem nahoru i dolů zdarma (1 jízda pro každého).",
    tips: [
      "Výtah má průhlednou podlahu.",
      "Nahoře je spíše jen plošina s kavárnou.",
    ],
  },
  {
    id: "pini",
    name: "Bar dei pini",
    category: "gastro",
    area: "riva",
    icon: "☕",
    intro:
      "Plážový bar na pláži Purfina — snídaně, káva nebo spritz s výhledem na jezero a trávníkem pro děti.",
    address: "Riva del Garda (Viale Rovereto 1, pláž Purfina)",
    price: "Cca 10–18 €",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bar+dei+pini%2C+Viale+Rovereto+1%2C+Riva+del+Garda",
    bestsellers: [
      {
        name: "Snídaně u vody",
        note: "Cornetto, brioška a cappuccino — recenze je chválí nejvíc",
      },
      { name: "Aperol Spritz", note: "Na terase s výhledem na jezero" },
      { name: "Hamburger a focaccia", note: "Rychlé jídlo přímo u pláže" },
    ],
    tips: [
      "Trávník hned u vody — holčičky si mohou bezpečně poběhat v parku.",
      "Při západu slunce bývá plněji.",
      "Ceny jsou vyšší a při plném provozu bývá obsluha pomalejší.",
    ],
  },
  {
    id: "leondoro",
    name: "Ristorante Pizzeria Leon d'Oro",
    category: "gastro",
    area: "riva",
    icon: "🍕",
    intro:
      "Oblíbená restaurace místních ve starém městě, známá hlavně risotty, rybami z Gardy a pizzou.",
    address: "Riva del Garda (Via Fiume 28)",
    price: "Cca 45–60 € rodina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pizzeria+Leon+d%27Oro%2C+Via+Fiume+28%2C+Riva+del+Garda",
    bestsellers: [
      {
        name: "Risotto",
        note: "Nejčastěji chválené — s krevetami, nebo s hříbky a lanýžem",
      },
      {
        name: "Pizza Frutti di Mare",
        note: "Křupavé těsto, podle recenzí jedna z nejlepších",
      },
      {
        name: "Pizza Diavola",
        note: "Pikantní, s chválou od dlouholetých hostů",
      },
      { name: "Ryby z Gardy", note: "Sarde del Garda a smažené kalamáry" },
    ],
    tips: [
      "Oblíbená restaurace místních ve starém městě.",
      "Večer doporučujeme rezervaci — bez ní se dlouho čeká.",
    ],
  },
  {
    id: "funivia",
    name: "Funivia Malcesine-Monte Baldo",
    category: "atrakce",
    priority: 1,
    intro:
      "Jízda rotující lanovkou je sama o sobě atrakce a volně se pasoucí zvířata na vrcholu (která se nekrmí) budou pro děti obrovským zážitkem.",
    address: "Malcesine (Via Navene 1)",
    mustDo:
      "Jízda otáčivou kabinou lanovky & pozorování krav, alpak a lam na pastvinách",
    price: "Cca 60–75 € rodinné vstupné",
    mapsUrl: "https://maps.app.goo.gl/4qxmJ2cRxCFygcrz6",
    duration: "3–5 hodin",
    guestCard: "Neplatí (Monte Baldo je mimo region Trentino).",
    tips: [
      "Nahoře je zima a fouká — vezměte pořádné teplé oblečení.",
      "Zvířata nekrmte a zeleninu pro ně neberte — mají vlastní dietu.",
      "Když je vrchol v mracích, přesuňte výlet na jiný den — nic neuvidíte.",
      "Fronty bývají i poslední týden v říjnu — kupte lístky online a jeďte co nejdřív ráno.",
    ],
  },
  {
    id: "flora",
    name: "Bar Gelateria Flora®",
    category: "gastro",
    area: "riva",
    icon: "🍦",
    intro:
      "Velká gelaterie s palmovou zahradou, proslulá obřími zmrzlinovými poháry.",
    address: "Riva del Garda (Viale Rovereto 52)",
    price: "Cca 15–22 € rodina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bar+Gelateria+Flora%2C+Viale+Rovereto+52%2C+Riva+del+Garda",
    bestsellers: [
      { name: "Zmrzlinové poháry", note: "Obří porce — jeden klidně na dva" },
      { name: "Tiramisu", note: "Recenze ho často doporučují" },
      { name: "Biscomuu, Nutella, karamel", note: "Nejzmiňovanější příchutě" },
      {
        name: "Veganská zmrzlina",
        note: "Lískový ořech a jahoda na sójovém základu",
      },
    ],
    tips: [
      "Velká palmová zahrada je ideální pro děti.",
      "V odpoledních špičkách bývá plno.",
    ],
  },
  {
    id: "sangiacomo",
    name: "Panificio San Giacomo",
    category: "gastro",
    area: "torbole",
    icon: "🥖",
    intro:
      "Pekárna s více než 35letou tradicí — sladké pečivo na snídani i focaccia na piknik.",
    address: "Torbole (Piazza Goethe 21)",
    price: "Cca 8–12 €",
    mapsUrl: "https://maps.app.goo.gl/JyNCK1hU7PEBLept6",
    bestsellers: [
      { name: "Cornetti a brioške", note: "Nejčastěji doporučované" },
      { name: "Štrúdl", note: "Chválený v recenzích" },
      {
        name: "Focaccia a rustikální chléb",
        note: "Pekárna peče kolem 50 druhů chleba",
      },
    ],
    tips: [
      "Křupavé slané pečivo se hodí na piknik.",
      "Jen prodejní okénko / obchůdek bez velkého posezení.",
      "Po–So 7:00–12:30 a 14:00–18:30, v neděli jen dopoledne.",
    ],
    keywords: ["pekarna", "pekárna", "pečivo"],
  },
  {
    id: "varone",
    name: "Varone Waterfall Cave Park",
    category: "atrakce",
    priority: 3,
    intro:
      "Akční zážitek s pláštěnkami v hlučné, mokré jeskyni s burácejícím vodopádem.",
    address: "Tenno (Località Le Foci 3)",
    mustDo: "Hřmící vodopád uvnitř skály v pláštěnkách & botanický park",
    price: "Cca 22–26 € rodina",
    mapsUrl: "https://maps.app.goo.gl/srUrRfcmuq5SQxpm6",
    duration: "max. 2 hodiny",
    guestCard: "Sleva na vstupném.",
    tips: [
      "Je tu mokro a chladno — pláštěnky nebo bundy jsou nutnost.",
      "Nenechte si ujít horní jeskyni — je mnohem působivější.",
      "Mezi spodní a horní jeskyní se prochází krásnou botanickou zahradou.",
      "Schody mohou klouzat, pozor.",
      "Je tu fajn pikniková zóna — vezměte si svačinu s sebou.",
      "Otevřeno od 9:00.",
    ],
  },
  {
    id: "tenno",
    name: "Lago di Tenno & vesnička Canale",
    category: "příroda",
    priority: 5,
    intro:
      "Vizuálně nádherné místo bez aut, tyrkysová voda a středověké uličky.",
    address: "Tenno (Lago di Tenno)",
    mustDo:
      "Piknik u tyrkysové vody + procházka středověkou vesničkou Canale di Tenno",
    price: "Zdarma (parkovné cca 5 €)",
    mapsUrl: "https://maps.app.goo.gl/inUhasxaANYsP8Lq9",
    duration: "3–4 hodiny (půl dne)",
    guestCard: "Autobus z Rivy k jezeru zdarma.",
    tips: [
      "S kolem se tento výlet spojit nedá — vše projdete pěšky.",
      "Vesnička Canale di Tenno je jen 15 minut chůze od jezera — úzké uličky, kamenné domy, žádná auta.",
      "Poslední týden v říjnu bývají parkoviště poloprázdná.",
      "Těsně u vody jsou schody — pro děti je lepší okruh po cestě přes Canale di Tenno.",
    ],
  },
  {
    id: "arco",
    name: "Městečko Arco & Castello di Arco",
    category: "město",
    priority: 7,
    intro:
      "Čistě odpočinková zastávka bez námahy, s nejlepší zmrzlinou pro děti v Gelateria Tarifa a kávou pro rodiče. Podle sil a nálady dětí buď vyšlápneme i nahoru na hrad, nebo zůstaneme jen dole ve městě na zmrzlině.",
    address: "Arco (centrum, Piazza III Novembre)",
    mustDo:
      "Procházka centrem, zmrzlina v Gelateria Tarifa & podle sil výstup na hrad s výhledem na údolí",
    price: "Město zdarma; hrad 5 € dospělý, děti do 12 let zdarma",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Piazza+III+Novembre%2C+38062+Arco+TN",
    duration: "1,5–2 hodiny",
    guestCard:
      "Autobus z Rivy do Arca (10–15 min) zdarma, vstup na hrad zdarma.",
    tips: [
      "Pravý hrad pro malé princezny.",
      "Výstup na hrad je cca 20 minut do kopce po štěrku.",
      "Hrad je koncem října otevřený 10:00–17:00.",
    ],
  },
  {
    id: "rialto",
    name: "Ristorante Pizzeria Rialto",
    category: "gastro",
    area: "riva",
    icon: "🍝",
    intro:
      "Hotelová restaurace s pizzou z pece na dřevo a velkými porcemi těstovin za rozumné ceny.",
    address: "Riva del Garda (Viale Rovereto 63)",
    price: "Cca 50–70 € rodina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Rialto+Ristorante+Pizzeria%2C+Viale+Rovereto+63%2C+Riva+del+Garda",
    bestsellers: [
      {
        name: "Těstoviny (i v XXL porci)",
        note: "Chválená bolognese a velké porce",
      },
      { name: "Pizza z pece na dřevo", note: "Levná, velký výběr" },
      { name: "Steak", note: "Podle recenzí perfektně propečený" },
    ],
    tips: [
      "Restaurace hotelu Rialto, vaří sám majitel.",
      "Recenze jsou smíšené — chválí porce a ceny, kritizují pomalou obsluhu.",
    ],
  },
  {
    id: "friggitoria",
    name: "Friggitoria al porto",
    category: "gastro",
    area: "riva",
    icon: "🦐",
    intro:
      "Pouliční stánek u přístavu s čerstvě smaženými rybami a mořskými plody s sebou.",
    address: "Riva del Garda (Piazza Catena)",
    price: "Cca 10–20 € na osobu",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Friggitoria+al+porto%2C+Piazza+Catena%2C+Riva+del+Garda",
    bestsellers: [
      {
        name: "Fritto misto",
        note: "Nejchválenější — čerstvě usmažené rybičky, kalamáry a krevety",
      },
      { name: "Spiedini di gamberi", note: "Krevetové špízy" },
      { name: "Panini", note: "Na rychlou svačinu" },
    ],
    tips: [
      "Pouliční stánek u přístavu — jídlo s sebou, nejlépe na lavičce s výhledem na jezero.",
      "Otevřeno denně zhruba 11:00–22:00.",
    ],
  },
  {
    id: "limone",
    name: "Porto Vecchio & Limone sul Garda",
    category: "město",
    priority: 4,
    intro:
      "Boduje hlavně obrovským zážitkem z plavby velkým trajektem. Ve městě pak děti vizuálně zaujmou citronové skleníky (Limonaia).",
    address: "Limone sul Garda (Via Porto)",
    mustDo: "Starý přístav, fotka u I love Limone & citrónová zmrzlina",
    price: "Denní lodní lístek „Lago Nord“",
    mapsUrl: "https://maps.app.goo.gl/WmChvGiqTVaSmF1b6",
    duration: "3–4 hodiny",
    guestCard:
      "Výrazná sleva: denní lístek za 12 € místo 20,50 € (kolo v ceně).",
    tips: [
      "Navštivte Limonaia del Castèl — uvidíte, jak se kdysi pěstovaly citrony.",
      "Autem se tu těžko parkuje — jeďte trajektem z Rivy a odpadne stres z parkování.",
      "Vydejte se do uliček dál od vody — tam jsou „hidden spots“.",
      "Obchůdky s citrony a krásná atmosféra.",
    ],
  },
  {
    id: "houselemon",
    name: "House of Lemonade and Spritz",
    category: "gastro",
    area: "limone",
    icon: "🍋",
    intro:
      "Okénko u přístavu s domácí limonádou a limoncello spritzem — Limone v kelímku.",
    address: "Limone sul Garda (Via Porto 17)",
    price: "Cca 5 € za nápoj",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=House+of+Lemonade+and+Spritz%2C+Via+Porto+17%2C+Limone+sul+Garda",
    bestsellers: [
      {
        name: "Limoncello Spritz",
        note: "Nejchválenější — „léto ve sklenici“",
      },
      {
        name: "Domácí limonáda",
        note: "Kyselá, sladkost si dosladíte sirupem sami",
      },
      { name: "Citronová granita", note: "Ledová tříšť, ideální pro děti" },
    ],
    tips: [
      "Hlavně okénko s sebou, k sezení je jen pár stolků.",
      "V sezóně se tvoří fronta.",
    ],
  },
  {
    id: "molo",
    name: "Molo Al Buongusto",
    category: "gastro",
    area: "limone",
    icon: "🍕",
    intro:
      "Levné bistro u přístavu s pizzou, focaccií a panini — ideální na rychlý oběd.",
    address: "Limone sul Garda (Via Porto 11)",
    price: "Levné, cca 1–10 € na osobu",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Molo+Al+Buongusto%2C+Via+Porto+11%2C+Limone+sul+Garda",
    bestsellers: [
      { name: "Pizza a focaccia", note: "Na kousky, i s sebou" },
      { name: "Panini", note: "Podle recenzí dobře zapečené" },
      { name: "Tiramisu a zmrzlina", note: "Na dezert" },
    ],
    tips: [
      "Bistro u přístavu hlavně s sebou, venku je pár míst k sezení.",
      "Otevřeno denně 9:00–17:30 — na oběd ideální, na večeři ne.",
    ],
  },
  {
    id: "ledro",
    name: "Lago di Ledro & Cyklovýlet (10 km)",
    category: "atrakce",
    priority: 2,
    intro:
      "Zážitek z pravěké vesnice (Museo delle Palafitte) je interaktivní a hravý. K tomu pohodová, bezpečná jízda na vypůjčených kolech podél krásného jezera.",
    address: "Molina di Ledro (Via al Lago 1)",
    mustDo:
      "Pravěké kůlové domky Museo delle Palafitte + 10km okruh kolem jezera na kolech",
    price: "Půjčení kol: dospělý cca 20–25 €/den, dítě 15–20 €/den",
    mapsUrl: "https://maps.app.goo.gl/rtZSp2PV12LKKKS56",
    duration: "celý den",
    guestCard: "Vstup do Museo delle Palafitte (kůlové stavby UNESCO) zdarma.",
    tips: [
      "Klidnější rodinné jezero s průzračnou, křišťálově čistou vodou.",
      "Dětská kola a vozíky půjčuje Beach & Bike Rent (Molina di Ledro), kola také E-bike Ledro (Tiarno).",
      "Cyklostezka je rovinatá a bez aut.",
      "Při chladnějším počasí fouká od jezera.",
    ],
    keywords: ["kolo", "kola", "kole", "cyklo", "cyklovýlet", "bike", "e-bike"],
  },
  {
    id: "centrale",
    name: "Pizzeria Centrale / al Porto",
    category: "gastro",
    area: "torbole",
    icon: "🍕",
    intro:
      "Nejlépe hodnocená restaurace v Torbole, u přístavu — velká pizza, těstoviny a obří tiramisu.",
    address: "Torbole (Piazza Goethe 18)",
    price: "Cca 45–60 € rodina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ristorante+Pizzeria+Al+Porto%2C+Piazza+Goethe+18%2C+Torbole",
    bestsellers: [
      { name: "Pizza (i s mořskými plody)", note: "Velká a bohatě obložená" },
      { name: "Tris di Pasta", note: "Ochutnávka tří těstovin" },
      { name: "Gnocchi s parmazánem a lanýžem", note: "Vřele doporučované" },
      { name: "Tiramisu", note: "Obří porce" },
    ],
    tips: [
      "Příjemné posezení u přístavu v Torbole.",
      "Od cca 18:30 se tvoří dlouhé fronty — rezervovat jde jen stůl uvnitř.",
      "V úterý zavřeno.",
    ],
  },
  {
    id: "tarifa",
    name: "Gelateria Tarifa",
    category: "gastro",
    area: "arco",
    icon: "🍦",
    intro:
      "Malá řemeslná gelaterie v uličce Arca, podle recenzí jedna z nejlepších v okolí.",
    address: "Arco (Via Giovanni Segantini 51)",
    price: "Cca 3 € za kelímek se třemi příchutěmi",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gelateria+Tarifa%2C+Via+Giovanni+Segantini+51%2C+Arco",
    bestsellers: [
      { name: "Semifreddo Kinder Pinguí", note: "Nejchválenější specialita" },
      { name: "Cremino bílé nebo černé", note: "S kousky polotekuté čokolády" },
      { name: "Maracuja", note: "Podle recenzí „nejlepší maracuja“" },
      { name: "Affogato", note: "Espresso se zmrzlinou tiramisu pro rodiče" },
    ],
    tips: [
      "Je v malé uličce a zvenku nenápadná.",
      "Hlavně s sebou, venku se nesedí. Otevřeno denně od 11:00.",
    ],
  },
];
