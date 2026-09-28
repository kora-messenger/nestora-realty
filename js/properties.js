/* ============================================================
   NESTORA REALTY — PROPERTY LISTINGS DATA (Germany)
   Add, remove or edit listings here. The Properties page,
   the home page featured section and search all read this file.

   Text fields that differ per language are objects: { en: "...", de: "..." }.
   type is one of: duplex, detached, apartment, terraced, penthouse, bungalow
   ============================================================ */

const PROPERTIES = [
  {
    id: 1,
    title: { en: "Renovated 5-Room Maisonette with Balcony", de: "Renovierte 5-Zimmer-Maisonette mit Balkon" },
    status: "sale",
    type: "duplex",
    price: 1850000,
    location: { en: "Munich – Bogenhausen", de: "München – Bogenhausen" },
    beds: 4, baths: 3, sqm: 220,
    badge: { en: "New", de: "Neu" },
    featured: true,
    description: {
      en: "A beautifully renovated maisonette in sought-after Bogenhausen. Spacious living-dining area, fitted kitchen, en-suite master bedroom, south-facing balcony and an underground parking space.",
      de: "Eine wunderschön renovierte Maisonette im begehrten Bogenhausen. Großzügiger Wohn-Essbereich, hochwertige Einbauküche, Schlafzimmer mit Bad en Suite, Süd-Balkon und ein Tiefgaragenstellplatz."
    },
    features: {
      en: ["Fitted kitchen", "Underground parking", "South-facing balcony", "Elevator", "Energy certificate class B", "Built 1998, renovated 2023"],
      de: ["Einbauküche", "Tiefgaragenstellplatz", "Südbalkon", "Aufzug", "Energieklasse B", "Baujahr 1998, saniert 2023"]
    },
    image: "assets/img/properties/p1.jpg",
    gallery: ["assets/img/properties/p1.jpg", "assets/img/pages/int1.jpg", "assets/img/pages/int3.jpg", "assets/img/pages/int6.jpg"]
  },
  {
    id: 2,
    title: { en: "Detached Villa with Pool & Garden", de: "Freistehende Villa mit Pool & Garten" },
    status: "sale",
    type: "detached",
    price: 3200000,
    location: { en: "Hamburg – Blankenese", de: "Hamburg – Blankenese" },
    beds: 5, baths: 5, sqm: 420,
    badge: { en: "Luxury", de: "Luxus" },
    featured: true,
    description: {
      en: "An executive villa on a large plot in Blankenese. Private swimming pool, sauna, home office, five generous bedrooms, double garage and mature trees — the definition of premium Hamburg living.",
      de: "Eine repräsentative Villa auf großem Grundstück in Blankenese. Privater Pool, Sauna, Home-Office, fünf großzügige Zimmer, Doppelgarage und alter Baumbestand – Premium-Wohnen in Hamburg."
    },
    features: {
      en: ["Swimming pool", "Sauna", "Home office", "Double garage", "Mature garden", "Alarm system"],
      de: ["Pool", "Sauna", "Home-Office", "Doppelgarage", "Garten mit altem Baumbestand", "Alarmanlage"]
    },
    image: "assets/img/properties/p2.jpg",
    gallery: ["assets/img/properties/p2.jpg", "assets/img/pages/int2.jpg", "assets/img/pages/int1.jpg", "assets/img/pages/int4.jpg"]
  },
  {
    id: 3,
    title: { en: "3-Room Furnished Apartment", de: "3-Zimmer-Wohnung möbliert" },
    status: "rent",
    type: "apartment",
    price: 2900,
    priceNote: "per_month",
    location: { en: "Berlin – Mitte", de: "Berlin – Mitte" },
    beds: 3, baths: 2, sqm: 110,
    featured: true,
    description: {
      en: "Fully furnished 3-room apartment in an Altbaubuilding in Berlin Mitte. High ceilings, oak floors, fitted kitchen, fast internet and building management included. Walking distance to Hackescher Markt.",
      de: "Vollmöblierte 3-Zimmer-Wohnung in einem Altbau in Berlin-Mitte. Stuckdecken, Eichendielen, Einbauküche, schnelles Internet und Hausverwaltung inklusive. Wenige Minuten zum Hackeschen Markt."
    },
    features: {
      en: ["Fully furnished", "Fitted kitchen", "Fast internet", "Altbau charm", "Elevator", "Bicycle room"],
      de: ["Vollmöbliert", "Einbauküche", "Schnelles Internet", "Altbau-Charme", "Aufzug", "Fahrradraum"]
    },
    image: "assets/img/properties/p3.jpg",
    gallery: ["assets/img/properties/p3.jpg", "assets/img/pages/int4.jpg", "assets/img/pages/int5.jpg", "assets/img/pages/int7.jpg"]
  },
  {
    id: 4,
    title: { en: "Modern 2-Bedroom Flat", de: "Moderne 2-Zimmer-Wohnung" },
    status: "rent",
    type: "apartment",
    price: 1150,
    priceNote: "per_month",
    location: { en: "Cologne – Ehrenfeld", de: "Köln – Ehrenfeld" },
    beds: 2, baths: 1, sqm: 78,
    badge: { en: "Popular", de: "Gefragt" },
    description: {
      en: "Bright, newly renovated 2-bedroom flat in lively Ehrenfeld. Fitted kitchen, balcony, cellar space and excellent public transport links to the city centre.",
      de: "Helle, frisch renovierte 2-Zimmer-Wohnung im lebendigen Ehrenfeld. Einbauküche, Balkon, Kellerabteil und hervorragende Anbindung an den ÖPNV."
    },
    features: {
      en: ["Newly renovated", "Fitted kitchen", "Balcony", "Cellar space", "Public transport nearby"],
      de: ["Frisch renoviert", "Einbauküche", "Balkon", "Kellerabteil", "Gute ÖPNV-Anbindung"]
    },
    image: "assets/img/properties/p4.jpg",
    gallery: ["assets/img/properties/p4.jpg", "assets/img/pages/int5.jpg", "assets/img/pages/int3.jpg"]
  },
  {
    id: 5,
    title: { en: "4-Bedroom Terraced House", de: "Reihenhaus mit 4 Zimmern" },
    status: "sale",
    type: "terraced",
    price: 780000,
    location: { en: "Düsseldorf – Gerresheim", de: "Düsseldorf – Gerresheim" },
    beds: 4, baths: 3, sqm: 195,
    featured: true,
    description: {
      en: "Well-maintained terraced house in a quiet Gerresheim cul-de-sac. Open-plan living room, guest WC, fitted kitchen, south-west garden and a family-friendly neighbourhood with schools nearby.",
      de: "Gepflegtes Reihenhaus in ruhiger Gerresheimer Wohnstraße. Offener Wohnbereich, Gäste-WC, Einbauküche, Süd-West-Garten und kindgerechte Nachbarschaft mit Schulen in der Nähe."
    },
    features: {
      en: ["Open-plan living", "Private garden", "Guest WC", "Terrace", "Car space"],
      de: ["Offener Wohnbereich", "Eigener Garten", "Gäste-WC", "Terrasse", "Stellplatz"]
    },
    image: "assets/img/properties/p5.jpg",
    gallery: ["assets/img/properties/p5.jpg", "assets/img/pages/int6.jpg", "assets/img/pages/int2.jpg"]
  },
  {
    id: 6,
    title: { en: "5-Bedroom Family Home in Westend", de: "Einfamilienhaus mit 5 Zimmern in Westend" },
    status: "sale",
    type: "detached",
    price: 2100000,
    location: { en: "Frankfurt – Westend", de: "Frankfurt – Westend" },
    beds: 5, baths: 4, sqm: 310,
    description: {
      en: "Classic Westend residence on a large plot with mature gardens. Five generous bedrooms, two lounges, study, staff annex and space for three cars. Ideal for executives who want central prestige.",
      de: "Klassisches Westend-Wohnhaus auf großem Grundstück mit altem Garten. Fünf großzügige Zimmer, zwei Wohnbereiche, Arbeitszimmer, Einliegerwohnung und Platz für drei Autos."
    },
    features: {
      en: ["Large plot", "Study", "Staff annex", "Three-car parking", "Mature garden"],
      de: ["Großes Grundstück", "Arbeitszimmer", "Einliegerwohnung", "Drei Stellplätze", "Alter Garten"]
    },
    image: "assets/img/properties/p6.jpg",
    gallery: ["assets/img/properties/p6.jpg", "assets/img/pages/int7.jpg", "assets/img/pages/int1.jpg"]
  },
  {
    id: 7,
    title: { en: "Contemporary Bungalow by the Vineyards", de: "Moderner Bungalow an den Weinbergen" },
    status: "sale",
    type: "bungalow",
    price: 950000,
    location: { en: "Stuttgart – Rotenberg", de: "Stuttgart – Rotenberg" },
    beds: 3, baths: 2, sqm: 180,
    description: {
      en: "A serene single-level bungalow overlooking the Rotenberg vineyards. Floor-to-ceiling windows, wrap-around terrace, wine cellar and a quiet, established neighbourhood.",
      de: "Ein ruhiger Bungalow mit Blick über die Rotenberger Weinberge. bodentiefe Fenster, umlaufende Terrasse, Weinkeller in etablierter, ruhiger Nachbarschaft."
    },
    features: {
      en: ["Wrap-around terrace", "Wine cellar", "Vineyard view", "Underfloor heating", "Quiet neighbourhood"],
      de: ["Umlaufende Terrasse", "Weinkeller", "Weinbergsblick", "Fußbodenheizung", "Ruhige Nachbarschaft"]
    },
    image: "assets/img/properties/p7.jpg",
    gallery: ["assets/img/properties/p7.jpg", "assets/img/pages/int2.jpg", "assets/img/pages/int5.jpg"]
  },
  {
    id: 8,
    title: { en: "Duplex Penthouse with Roof Terrace", de: "Penthouse-Duplex mit Dachterrasse" },
    status: "sale",
    type: "penthouse",
    price: 4500000,
    location: { en: "Munich – Altstadt", de: "München – Altstadt" },
    beds: 4, baths: 4, sqm: 260,
    badge: { en: "Luxury", de: "Luxus" },
    description: {
      en: "Duplex penthouse crowning one of Munich's landmark buildings. Private roof terrace with old-town views, premium kitchen, marble bathrooms, concierge service and two underground parking bays.",
      de: "Penthouse-Duplex über den Dächern Münchens. Private Dachterrasse mit Altstadtblick, hochwertige Küche, Marmorbäder, Concierge-Service und zwei Tiefgaragenstellplätze."
    },
    features: {
      en: ["Roof terrace", "Old-town view", "Concierge", "Two parking bays", "Marble bathrooms", "Smart home"],
      de: ["Dachterrasse", "Altstadtblick", "Concierge", "Zwei Stellplätze", "Marmorbäder", "Smart Home"]
    },
    image: "assets/img/properties/p8.jpg",
    gallery: ["assets/img/properties/p8.jpg", "assets/img/pages/int1.jpg", "assets/img/pages/int4.jpg", "assets/img/pages/int6.jpg"]
  },
  {
    id: 9,
    title: { en: "3-Bedroom Apartment with Balcony", de: "3-Zimmer-Wohnung mit Balkon" },
    status: "rent",
    type: "apartment",
    price: 1450,
    priceNote: "per_month",
    location: { en: "Leipzig – Plagwitz", de: "Leipzig – Plagwitz" },
    beds: 3, baths: 2, sqm: 105,
    description: {
      en: "Spacious 3-room apartment with balcony in trendy Plagwitz. New building quality, fitted kitchen, cellar space and quick connections to the city centre and Clara-Zetkin-Park.",
      de: "Großzügige 3-Zimmer-Wohnung mit Balkon im trendigen Plagwitz. Neubauqualität, Einbauküche, Kellerabteil und schnelle Verbindungen ins Zentrum und zum Clara-Zetkin-Park."
    },
    features: {
      en: ["New building", "Fitted kitchen", "Balcony", "Cellar space", "Near park"],
      de: ["Neubau", "Einbauküche", "Balkon", "Kellerabteil", "Park in der Nähe"]
    },
    image: "assets/img/properties/p9.jpg",
    gallery: ["assets/img/properties/p9.jpg", "assets/img/pages/int3.jpg", "assets/img/pages/int7.jpg"]
  }
];
