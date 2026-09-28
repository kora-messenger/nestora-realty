/* ============================================================
   NESTORA REALTY — I18N
   The site auto-detects the visitor's language:
     1. ?lang=de|en URL parameter (testing / deep links)
     2. Saved preference (localStorage)
     3. Browser language (any German variant -> German)
     4. Timezone (Europe/Berlin -> German)
     5. Fallback: English
   Manual override via the DE/EN switcher in the header.
   ============================================================ */

const I18N = {
  /* ---------------- ENGLISH ---------------- */
  en: {
    title_home: "Nestora Realty — Real estate in Germany | Buy & rent",
    title_properties: "Properties for Sale & Rent — Nestora Realty",
    title_about: "About Us — Nestora Realty",
    title_contact: "Contact Us — Nestora Realty",
    title_404: "Page not found — Nestora Realty",

    nav_home: "Home", nav_properties: "Properties", nav_about: "About Us", nav_contact: "Contact",
    nav_browse: "Browse Listings", nav_sell: "Sell With Us",

    hero_eyebrow: "Real Estate in Germany, Done Right",
    hero_h1: "Find a place <em>you'll love</em> to live",
    hero_lead: "Verified listings, honest valuations and end-to-end support — from first viewing to notary appointment.",
    hero_ph: "Search location, e.g. Munich, Berlin…",
    hero_buyrent: "Buy or Rent", hero_buy: "Buy", hero_rent: "Rent", hero_search: "Search",
    stat1: "Homes sold & leased", stat2: "Years of experience",
    stat3: "Client satisfaction", stat4: "Active listings",

    feat_eyebrow: "Featured Properties",
    feat_h2: "Hand-picked homes, ready to move in",
    feat_p: "A selection of our most requested listings — each one inspected and verified by our team.",
    feat_viewall: "View all properties",

    serv_eyebrow: "What We Do",
    serv_h2: "Everything property, under one roof",
    serv1_h: "Buy a Home",
    serv1_p: "Curated homes for sale with verified documents. We negotiate, review and walk you to the finish line.",
    serv2_h: "Rent with Confidence",
    serv2_p: "Furnished and unfurnished apartments and houses with transparent terms. No hidden agency fees, ever.",
    serv3_h: "Sell Your Property",
    serv3_p: "Professional valuation, photography and marketing that puts your property in front of serious buyers.",
    serv4_h: "Property Management",
    serv4_p: "Tenant sourcing, rent collection and maintenance for owners who want zero stress.",

    why_eyebrow: "Why Clients Choose Us",
    why_h2: "The safe pair of hands for your biggest decision",
    why1_h: "Every listing verified",
    why1_p: "Documents checked, properties inspected. What you see is what exists.",
    why2_h: "Transparent fees",
    why2_p: "All charges stated upfront in writing. No surprise \"agency costs\".",
    why3_h: "End-to-end support",
    why3_p: "Viewing, negotiation, notary and handover — one team all the way.",
    why4_h: "After-move-in care",
    why4_p: "We stay reachable after you move in. Referrals are our biggest source of business.",
    why_more: "More about us",

    test_eyebrow: "Client Stories",
    test_h2: "Trusted by families & investors",

    cta_h2: "Ready to find your next home?",
    cta_p: "Tell us what you're looking for and we'll send matching listings within 24 hours.",
    cta_chat: "Chat on Telegram", cta_browse: "Browse listings", cta_contact: "Contact us",

    ph_eyebrow: "Our Listings",
    ph_h1: "Properties for sale & rent",
    ph_p: "Every listing below is inspected and document-verified by our team before it goes live.",
    f_keyword: "Keyword", f_buyrent: "Buy / Rent", f_any: "Any",
    f_forsale: "For Sale", f_forrent: "For Rent",
    f_type: "Type", f_location: "Location", f_anywhere: "Anywhere",
    f_minbeds: "Min bedrooms", f_clear: "Clear",
    f_minprice: "Min price (€)", f_maxprice: "Max price (€)",
    sortby: "Sort by", sort_new: "Newest", sort_asc: "Price: low to high",
    sort_desc: "Price: high to low", sort_beds: "Most bedrooms",
    results: "{n} properties found", results_one: "1 property found",
    load_more: "Show more",

    /* --- Phase 1: search, filters, detail page --- */
    ai_ph: "Describe your home — e.g. \"3 rooms, balcony, Munich under 1,200€\"",
    ai_applied: "Applied filters",
    loc_ph: "City, district, state or ZIP…",
    loc_all: "All of Germany",
    loc_states: "Federal states", loc_cities: "Cities", loc_districts: "Districts", loc_zips: "ZIP codes",
    loc_no_match: "No matching place — check the spelling",
    loc_none_here_h: "Nothing listed here yet",
    loc_none_here_p: "We have no listings in {loc} right now — tell us what you need and we will send matching homes within 24 hours.",
    loc_notify: "Send a request",
    radius: "Radius",
    adv_filters: "More filters",
    adv_hide: "Hide filters",
    f_area: "Living area (m²)", f_rooms: "Rooms", f_year: "Built from", f_energy: "Energy class",
    f_features: "Features",
    feat_balcony: "Balcony / terrace", feat_garden: "Garden", feat_elevator: "Elevator",
    feat_kitchen: "Fitted kitchen", feat_garage: "Garage / parking",
    chip_balcony: "Balcony", chip_garden: "Garden", chip_elevator: "Elevator",
    chip_3plus: "3+ rooms", chip_favs: "Favorites",
    favs_empty: "Tap the heart on a listing to save it here.",
    rooms_any: "Any", rooms_1: "1+", rooms_2: "2+", rooms_3: "3+", rooms_4: "4+", rooms_5: "5+",
    year_any: "Any", year_1950: "1950+", year_1970: "1970+", year_1990: "1990+",
    year_2000: "2000+", year_2010: "2010+", year_2020: "2020+",
    per_m2: "{p}/m²",
    detail_back: "Back to results",
    d_price: "Purchase price", d_rent: "Base rent (cold)",
    d_utilities: "Service charges", d_heating: "Heating (est.)", d_total: "Total (warm)",
    d_deposit: "Deposit",
    d_price_m2: "Price per m²",
    d_facts: "Key facts",
    d_type: "Property type", d_rooms: "Rooms", d_bedrooms: "Bedrooms", d_baths: "Bathrooms",
    d_area: "Living area", d_year: "Built in", d_energy: "Energy class",
    d_heating_type: "Heating", d_available: "Available from", d_pets: "Pets",
    d_pets_ok: "Allowed", d_pets_no: "Not allowed", d_now: "Immediately",
    d_floor: "Floor", d_address: "Address", d_state: "Federal state",
    d_features: "Features & amenities",
    d_description: "Description",
    d_location: "Location & surroundings",
    d_map_hint: "Approximate location",
    d_similar: "Similar listings",
    d_viewing: "Request a viewing",
    d_tg_msg: "Hello Nestora team, I would like to view the property \"{title}\" ({loc}).",
    d_share: "Share", d_copied: "Link copied",
    d_fav: "Save", d_fav_done: "Saved",
    d_contact_name: "Contact agent",
    price_verygood: "Excellent price", price_good: "Good price",
        empty_h: "No matches found",
    empty_p: "Try widening your price range or clearing filters.",
    empty_clear: "Clear filters",
    req_h2: "Can't find what you're looking for?",
    req_p: "Tell us your budget and preferred area — new listings often go before they're published.",
    req_btn: "Send a request",

    for_sale: "For Sale", for_rent: "For Rent",
    beds: "Beds", baths: "Baths", view_details: "View details",
    m_beds: "Bedrooms", m_baths: "Bathrooms", m_sqm: "Square metres", m_type: "Property type",
    m_viewing: "Request viewing via Telegram", m_call: "Call agent",
    m_msg: "Hello {brand}, I'm interested in \"{title}\" ({price}) in {location}. Please share more details and viewing times. Thank you.",
    per_month: "per month",

    type_duplex: "Maisonette", type_detached: "Detached House", type_apartment: "Apartment",
    type_terraced: "Terraced House", type_penthouse: "Penthouse", type_bungalow: "Bungalow",

    foot_about: "A full-service real estate company helping people across Germany buy, sell and rent homes with total confidence.",
    foot_quick: "Quick Links", foot_services: "Services", foot_gettouch: "Get in Touch",
    foot_buy: "Buy a Home", foot_rent: "Rent a Home", foot_sell: "Sell Your Property",
    foot_manage: "Property Management",
    foot_rights: "All rights reserved.",
    foot_made: "Made with care in Munich, Germany.",

    ch_eyebrow: "Contact",
    ch_h1: "Let's talk about your next move",
    ch_p: "Call, message or visit us — we respond to every enquiry within one business day.",
    ci_h3: "Reach us directly",
    ci_phone: "Phone", ci_email: "Email", ci_office: "Office", ci_hours: "Opening hours",
    hours_value: "Mon – Fri · 9:00am – 6:00pm",
    cf_h3: "Send an enquiry",
    cf_p: "Fill the form and we'll continue on Telegram — the fastest way to reach our team.",
    cf_name: "Full name *", cf_name_ph: "Your name",
    cf_phone: "Phone *", cf_email: "Email", cf_interest: "I'm interested in",
    int1: "Buying a property", int2: "Renting a property", int3: "Selling my property",
    int4: "Property management", int5: "General enquiry",
    cf_message: "Message *", cf_msg_ph: "Tell us what you're looking for — budget, area, size…",
    cf_send: "Send enquiry",
    cf_note: "Your enquiry opens Telegram with your message pre-filled. We typically respond within a few hours during business hours.",
    cf_ok: "✓ Message prepared! If Telegram didn't open, call or email us directly.",
    cf_msg: "Hello {brand}, I'd like to make an enquiry.\n\nName: {name}\nEmail: {email}\nPhone: {phone}\nInterest: {interest}\n\nMessage:\n{message}",

    faq_eyebrow: "Common Questions", faq_h2: "Frequently asked questions",
    faq1_q: "What are your agency fees?",
    faq1_a: "Fees are quoted in writing before any commitment. For rentals they follow the local market structure; for sales we quote per transaction. No hidden charges, ever.",
    faq2_q: "How do you verify listings?",
    faq2_a: "Every property is physically inspected and its ownership documents reviewed before publication. We decline listings we cannot verify.",
    faq3_q: "Can you help with financing and notary appointments?",
    faq3_a: "Yes. We coordinate with banks, notaries and surveyors, and guide you through the full documentation chain.",
    faq4_q: "Do you manage properties for owners?",
    faq4_a: "Yes — tenant sourcing, rent collection, inspections and maintenance, with monthly statements and a dedicated account manager.",
    faq5_q: "Which areas do you cover?",
    faq5_a: "Munich, Berlin, Hamburg, Frankfurt, Düsseldorf, Cologne, Stuttgart, Leipzig and other key German cities. Ask if you have a specific area in mind.",

    ah_eyebrow: "About Us",
    ah_h1: "Real estate you can trust",
    ah_p: "Years of German property experience, one simple promise: do right by the client.",
    story_eyebrow: "Our Story",
    story_h2: "Built on one frustration: too many bad deals",
    story_p1: "We started after seeing too many buyers lose money to unverified listings and unclear contracts. So we built the company we wished existed: verify everything first, charge fairly, and stay answerable long after the deal closes.",
    story_p2: "Today we serve buyers, tenants, sellers and landlords across Germany's most sought-after cities — from first-time renters to seasoned investors — with the same standard of care on every transaction.",
    ab1_h: "Integrity first", ab1_p: "We would rather lose a deal than close a bad one.",
    ab2_h: "Local expertise", ab2_p: "Deep knowledge of Germany's neighbourhoods, prices and paperwork.",
    ab3_h: "Long-term relationships", ab3_p: "Most of our clients come from referrals — we intend to keep it that way.",
    team_eyebrow: "Our Team", team_h2: "Meet the people behind the deals",
    team_chat: "Chat on Telegram",
    proc_eyebrow: "Our Process", proc_h2: "How we work with you",
    pr1_h: "1. Listen", pr1_p: "We start with your budget, lifestyle and timeline — not our inventory.",
    pr2_h: "2. Curate & verify", pr2_p: "We shortlist genuine matches, inspect them and check the documents before you visit.",
    pr3_h: "3. Negotiate", pr3_p: "Our negotiators work the price and terms in your favour — in writing.",
    pr4_h: "4. Handover & beyond", pr4_p: "Documentation, notary and keys — then we stay reachable for anything that comes up.",
    about_cta_h2: "Let's find you a home together",
    about_cta_p: "Whether you're buying, renting, selling or letting — we're one message away.",

    e404_h: "This page has moved",
    e404_p: "The page you're looking for doesn't exist or is no longer available.",
    e404_home: "Back to home", e404_browse: "Browse properties",

    tg_general: "Hello, I'd like to make an enquiry about a property.",
    ci_chat: "Chat on Telegram",
    tg_cta: "Hello, I'm looking for a property. Please send me matching listings.",
    tg_req: "Hello, I couldn't find a property on your site. Here's what I'm looking for: "
  },

  /* ---------------- GERMAN ---------------- */
  de: {
    title_home: "Nestora Realty — Immobilien in Deutschland | Kaufen & Mieten",
    title_properties: "Immobilien zum Kaufen & Mieten — Nestora Realty",
    title_about: "Über uns — Nestora Realty",
    title_contact: "Kontakt — Nestora Realty",
    title_404: "Seite nicht gefunden — Nestora Realty",

    nav_home: "Startseite", nav_properties: "Immobilien", nav_about: "Über uns", nav_contact: "Kontakt",
    nav_browse: "Angebote ansehen", nav_sell: "Mit uns verkaufen",

    hero_eyebrow: "Immobilien in Deutschland — seriös & transparent",
    hero_h1: "Finden Sie ein Zuhause, <em>das Sie lieben</em>",
    hero_lead: "Geprüfte Angebote, ehrliche Bewertungen und Rundum-Betreuung – von der ersten Besichtigung bis zum Notartermin.",
    hero_ph: "Ort suchen, z. B. München, Berlin…",
    hero_buyrent: "Kaufen oder Mieten", hero_buy: "Kaufen", hero_rent: "Mieten", hero_search: "Suchen",
    stat1: "Verkaufte & vermietete Immobilien", stat2: "Jahre Erfahrung",
    stat3: "Kundenzufriedenheit", stat4: "Aktuelle Angebote",

    feat_eyebrow: "Aktuelle Highlights",
    feat_h2: "Ausgewählte Immobilien – bezugsbereit",
    feat_p: "Eine Auswahl unserer gefragtesten Objekte – jedes von unserem Team persönlich geprüft.",
    feat_viewall: "Alle Immobilien ansehen",

    serv_eyebrow: "Unsere Leistungen",
    serv_h2: "Alles rund um Ihre Immobilie",
    serv1_h: "Immobilie kaufen",
    serv1_p: "Geprüfte Kaufobjekte mit abgesicherten Unterlagen. Wir verhandeln, prüfen und begleiten Sie bis zur Schlussübergabe.",
    serv2_h: "Mieten mit Sicherheit",
    serv2_p: "Möblierte und unmöblierte Wohnungen und Häuser mit transparenten Konditionen. Ohne versteckte Gebühren.",
    serv3_h: "Immobilie verkaufen",
    serv3_p: "Professionelle Bewertung, Fotografie und Marketing, das Ihre Immobilie vor qualifizierte Käufer bringt.",
    serv4_h: "Immobilienverwaltung",
    serv4_p: "Mietersuche, Mieteinnahmen und Instandhaltung – für Eigentümer, die sich um nichts kümmern wollen.",

    why_eyebrow: "Warum Kunden uns wählen",
    why_h2: "Die sicheren Hände für Ihre wichtigste Entscheidung",
    why1_h: "Jedes Angebot geprüft",
    why1_p: "Grundbücher geprüft, Objekte besichtigt. Was Sie sehen, gibt es wirklich.",
    why2_h: "Transparente Kosten",
    why2_p: "Alle Kosten vorab und schriftlich. Keine versteckten \"Maklergebühren\".",
    why3_h: "Rundum-Betreuung",
    why3_p: "Besichtigung, Verhandlung, Notar und Übergabe – ein Team bis zum Ende.",
    why4_h: "Auch danach für Sie da",
    why4_p: "Wir sind auch nach dem Einzug erreichbar. Empfehlungen sind unsere wichtigste Quelle.",
    why_more: "Mehr über uns",

    test_eyebrow: "Kundengeschichten",
    test_h2: "Familien & Investoren vertrauen uns",

    cta_h2: "Bereit für Ihr neues Zuhause?",
    cta_p: "Sagen Sie uns, wonach Sie suchen – wir senden Ihnen passende Objekte innerhalb von 24 Stunden.",
    cta_chat: "Per Telegram schreiben", cta_browse: "Angebote ansehen", cta_contact: "Kontakt aufnehmen",

    ph_eyebrow: "Unsere Angebote",
    ph_h1: "Immobilien zum Kaufen & Mieten",
    ph_p: "Jedes Angebot wird von unserem Team geprüft und dokumentiert, bevor es online geht.",
    f_keyword: "Stichwort", f_buyrent: "Kaufen / Mieten", f_any: "Beliebig",
    f_forsale: "Zu verkaufen", f_forrent: "Zur Miete",
    f_type: "Haustyp", f_location: "Ort", f_anywhere: "Überall",
    f_minbeds: "Min. Schlafzimmer", f_clear: "Zurücksetzen",
    f_minprice: "Mindestpreis (€)", f_maxprice: "Höchstpreis (€)",
    sortby: "Sortieren", sort_new: "Neueste", sort_asc: "Preis: aufsteigend",
    sort_desc: "Preis: absteigend", sort_beds: "Meiste Schlafzimmer",
    results: "{n} Objekte gefunden", results_one: "1 Objekt gefunden",
    load_more: "Weitere anzeigen",

    /* --- Phase 1: Suche, Filter, Detailseite --- */
    ai_ph: "Beschreiben Sie Ihr Zuhause — z. B. \"3 Zimmer, Balkon, München bis 1.200 €\"",
    ai_applied: "Angewendete Filter",
    loc_ph: "Stadt, Stadtteil, Bundesland oder PLZ…",
    loc_all: "Ganz Deutschland",
    loc_states: "Bundesländer", loc_cities: "Städte", loc_districts: "Stadtteile", loc_zips: "Postleitzahlen",
    loc_no_match: "Kein Ort gefunden — bitte Schreibweise prüfen",
    loc_none_here_h: "Hier noch nichts im Angebot",
    loc_none_here_p: "In {loc} haben wir aktuell keine Objekte — teilen Sie uns Ihre Wünsche mit, wir senden passende Angebote innerhalb von 24 Stunden.",
    loc_notify: "Anfrage senden",
    radius: "Umkreis",
    adv_filters: "Weitere Filter",
    adv_hide: "Filter ausblenden",
    f_area: "Wohnfläche (m²)", f_rooms: "Zimmer", f_year: "Baujahr ab", f_energy: "Energieklasse",
    f_features: "Ausstattung",
    feat_balcony: "Balkon / Terrasse", feat_garden: "Garten", feat_elevator: "Aufzug",
    feat_kitchen: "Einbauküche", feat_garage: "Garage / Stellplatz",
    chip_balcony: "Balkon", chip_garden: "Garten", chip_elevator: "Aufzug",
    chip_3plus: "3+ Zimmer", chip_favs: "Merkliste",
    favs_empty: "Tippen Sie auf das Herz bei einem Objekt, um es hier zu speichern.",
    rooms_any: "Beliebig", rooms_1: "1+", rooms_2: "2+", rooms_3: "3+", rooms_4: "4+", rooms_5: "5+",
    year_any: "Beliebig", year_1950: "ab 1950", year_1970: "ab 1970", year_1990: "ab 1990",
    year_2000: "ab 2000", year_2010: "ab 2010", year_2020: "ab 2020",
    per_m2: "{p}/m²",
    detail_back: "Zurück zur Übersicht",
    d_price: "Kaufpreis", d_rent: "Kaltmiete",
    d_utilities: "Nebenkosten", d_heating: "Heizkosten (ca.)", d_total: "Gesamtmiete (warm)",
    d_deposit: "Kaution",
    d_price_m2: "Preis pro m²",
    d_facts: "Eckdaten",
    d_type: "Objekttyp", d_rooms: "Zimmer", d_bedrooms: "Schlafzimmer", d_baths: "Badezimmer",
    d_area: "Wohnfläche", d_year: "Baujahr", d_energy: "Energieklasse",
    d_heating_type: "Heizung", d_available: "Bezugsfrei ab", d_pets: "Haustiere",
    d_pets_ok: "Erlaubt", d_pets_no: "Nicht erlaubt", d_now: "Sofort",
    d_floor: "Etage", d_address: "Adresse", d_state: "Bundesland",
    d_features: "Ausstattung & Merkmale",
    d_description: "Beschreibung",
    d_location: "Lage & Umgebung",
    d_map_hint: "Ungefähre Lage",
    d_similar: "Ähnliche Objekte",
    d_viewing: "Besichtigung anfragen",
    d_tg_msg: "Hallo Nestora-Team, ich möchte das Objekt \"{title}\" ({loc}) besichtigen.",
    d_share: "Teilen", d_copied: "Link kopiert",
    d_fav: "Merken", d_fav_done: "Gemerkt",
    d_contact_name: "Makler kontaktieren",
    price_verygood: "Ausgezeichneter Preis", price_good: "Guter Preis",
        empty_h: "Keine Treffer",
    empty_p: "Erweitern Sie Ihre Suche oder setzen Sie die Filter zurück.",
    empty_clear: "Filter zurücksetzen",
    req_h2: "Nichts Passendes dabei?",
    req_p: "Nennen Sie uns Budget und Wunschlage – viele Objekte sind verkauft oder vermietet, bevor sie online gehen.",
    req_btn: "Anfrage senden",

    for_sale: "Zu verkaufen", for_rent: "Zur Miete",
    beds: "Zi.", baths: "Bäder", view_details: "Details ansehen",
    m_beds: "Schlafzimmer", m_baths: "Badezimmer", m_sqm: "Quadratmeter", m_type: "Objekttyp",
    m_viewing: "Besichtigung per Telegram anfragen", m_call: "Makler anrufen",
    m_msg: "Hallo {brand}, ich interessiere mich für \"{title}\" ({price}) in {location}. Bitte senden Sie mir weitere Details und Besichtigungstermine. Vielen Dank.",
    per_month: "pro Monat",

    type_duplex: "Maisonette", type_detached: "Einfamilienhaus", type_apartment: "Wohnung",
    type_terraced: "Reihenhaus", type_penthouse: "Penthouse", type_bungalow: "Bungalow",

    foot_about: "Ihr Full-Service-Immobilienunternehmen in Deutschland – für Kauf, Verkauf und Vermietung mit voller Sicherheit.",
    foot_quick: "Schnellzugriff", foot_services: "Leistungen", foot_gettouch: "Kontakt",
    foot_buy: "Immobilie kaufen", foot_rent: "Immobilie mieten", foot_sell: "Immobilie verkaufen",
    foot_manage: "Immobilienverwaltung",
    foot_rights: "Alle Rechte vorbehalten.",
    foot_made: "Mit Sorgfalt in München, Deutschland.",

    ch_eyebrow: "Kontakt",
    ch_h1: "Sprechen wir über Ihren nächsten Schritt",
    ch_p: "Rufen Sie an, schreiben Sie oder besuchen Sie uns – wir antworten auf jede Anfrage innerhalb eines Werktages.",
    ci_h3: "Direkt erreichbar",
    ci_phone: "Telefon", ci_email: "E-Mail", ci_office: "Büro", ci_hours: "Öffnungszeiten",
    hours_value: "Mo – Fr · 9:00 – 18:00 Uhr",
    cf_h3: "Anfrage senden",
    cf_p: "Füllen Sie das Formular aus – wir melden uns umgehend per Telegram.",
    cf_name: "Vollständiger Name *", cf_name_ph: "Ihr Name",
    cf_phone: "Telefon *", cf_email: "E-Mail", cf_interest: "Ich interessiere mich für",
    int1: "Immobilie kaufen", int2: "Immobilie mieten", int3: "Meine Immobilie verkaufen",
    int4: "Immobilienverwaltung", int5: "Allgemeine Anfrage",
    cf_message: "Nachricht *", cf_msg_ph: "Wonach suchen Sie – Budget, Lage, Größe…",
    cf_send: "Anfrage senden",
    cf_note: "Ihre Anfrage öffnet Telegram mit vorbereiteter Nachricht. In der Regel antworten wir innerhalb weniger Stunden.",
    cf_ok: "✓ Nachricht vorbereitet! Falls Telegram sich nicht geöffnet hat, rufen Sie uns an oder schreiben Sie uns.",
    cf_msg: "Hallo {brand}, ich möchte eine Anfrage stellen.\n\nName: {name}\nE-Mail: {email}\nTelefon: {phone}\nInteresse: {interest}\n\nNachricht:\n{message}",

    faq_eyebrow: "Häufige Fragen", faq_h2: "Häufig gestellte Fragen",
    faq1_q: "Wie hoch sind Ihre Maklergebühren?",
    faq1_a: "Alle Gebühren werden vorab und schriftlich genannt. Bei Mieten richten wir uns nach der ortsüblichen Struktur, bei Verkäufen nach Objekt. Keine versteckten Kosten.",
    faq2_q: "Wie prüfen Sie Ihre Angebote?",
    faq2_a: "Jedes Objekt wird persönlich besichtigt und die Eigentumsunterlagen geprüft, bevor wir es veröffentlichen. Nicht prüfbare Objekte lehnen wir ab.",
    faq3_q: "Unterstützen Sie bei Finanzierung und Notartermin?",
    faq3_a: "Ja. Wir koordinieren Banken, Notare und Sachverständige und begleiten Sie durch alle Formalitäten.",
    faq4_q: "Verwalten Sie Immobilien für Eigentümer?",
    faq4_a: "Ja – Mietersuche, Mieteinnahmen, Kontrollen und Instandhaltung, mit monatlichen Abrechnungen und festem Ansprechpartner.",
    faq5_q: "Welche Regionen betreuen Sie?",
    faq5_a: "München, Berlin, Hamburg, Frankfurt, Düsseldorf, Köln, Stuttgart, Leipzig und weitere deutsche Städte. Fragen Sie einfach nach.",

    ah_eyebrow: "Über uns",
    ah_h1: "Immobilien, denen Sie vertrauen können",
    ah_p: "Jahre Erfahrung mit deutschen Immobilien – ein einfaches Versprechen: ehrlich zum Kunden.",
    story_eyebrow: "Unsere Geschichte",
    story_h2: "Entstanden aus einem Ärger: zu viele schlechte Deals",
    story_p1: "Wir haben gegründet, nachdem zu viele Käufer bei ungeprüften Angeboten und unklaren Verträgen Geld verloren hatten. Wir bauten das Unternehmen, das wir uns gewünscht hätten: erst alles prüfen, fair abrechnen und auch nach Abschluss verantwortlich bleiben.",
    story_p2: "Heute betreuen wir Käufer, Mieter, Verkäufer und Eigentümer in den begehrtesten Städten Deutschlands – vom Erstmieter bis zum erfahrenen Investor – mit gleichem Anspruch bei jeder Transaktion.",
    ab1_h: "Ehrlichkeit zuerst", ab1_p: "Lieber ein Geschäft verlieren als schlecht abschließen.",
    ab2_h: "Lokale Expertise", ab2_p: "Tiefes Wissen über Lagen, Preise und Formalitäten in Deutschland.",
    ab3_h: "Langfristige Beziehungen", ab3_p: "Die meisten Kunden kommen durch Empfehlungen – so soll es bleiben.",
    team_eyebrow: "Unser Team", team_h2: "Die Menschen hinter den Deals",
    team_chat: "Per Telegram schreiben",
    proc_eyebrow: "Unser Ablauf", proc_h2: "So arbeiten wir mit Ihnen",
    pr1_h: "1. Zuhören", pr1_p: "Wir beginnen mit Budget, Lebenssituation und Zeitleiste – nicht mit unserem Bestand.",
    pr2_h: "2. Auswählen & prüfen", pr2_p: "Wir erstellen eine echte Kurzliste, besichtigen die Objekte und prüfen die Unterlagen, bevor Sie anreisen.",
    pr3_h: "3. Verhandeln", pr3_p: "Wir verhandeln Preis und Konditionen zu Ihren Gunsten – schriftlich.",
    pr4_h: "4. Übergabe & darüber hinaus", pr4_p: "Unterlagen, Notar und Schlüssel – und danach bleiben wir für alles Erreichbare erreichbar.",
    about_cta_h2: "Finden wir gemeinsam Ihr Zuhause",
    about_cta_p: "Ob Kauf, Miete, Verkauf oder Vermietung – wir sind nur eine Nachricht entfernt.",

    e404_h: "Diese Seite ist umgezogen",
    e404_p: "Die gesuchte Seite existiert nicht oder ist nicht mehr verfügbar.",
    e404_home: "Zur Startseite", e404_browse: "Immobilien ansehen",

    tg_general: "Hallo, ich möchte eine Anfrage zu einer Immobilie stellen.",
    ci_chat: "Per Telegram schreiben",
    tg_cta: "Hallo, ich suche eine Immobilie. Bitte senden Sie mir passende Angebote.",
    tg_req: "Hallo, auf Ihrer Website habe ich nichts Passendes gefunden. Ich suche: "
  }
};

/* ---------- Language detection ---------- */
function detectLang() {
  try {
    const urlLang = new URLSearchParams(location.search).get("lang");
    if (urlLang && I18N[urlLang]) return urlLang;
    const stored = localStorage.getItem("nestora_lang");
    if (stored && I18N[stored]) return stored;
  } catch (e) { /* ignore */ }
  const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "en"];
  for (const l of langs) {
    if (l && l.toLowerCase().indexOf("de") === 0) return "de";
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Europe/Berlin" || tz === "Europe/Vienna") return "de";
  } catch (e) { /* ignore */ }
  return "en";
}

let LANG = detectLang();

/* ---------- Helpers ---------- */
function t(key, vars) {
  let s = (I18N[LANG] && I18N[LANG][key]) != null ? I18N[LANG][key] : I18N.en[key];
  if (s == null) return key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}

/* Pick the right side of a {en, de} data field */
function L(obj) {
  if (typeof obj === "string") return obj;
  return (obj && (obj[LANG] || obj.en)) || "";
}

/* ---------- Apply language to static DOM ---------- */
function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  if (document.body.dataset.page) document.title = t("title_" + document.body.dataset.page);
  document.querySelectorAll(".lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === LANG));
  document.documentElement.dispatchEvent(new CustomEvent("langchange", { detail: LANG }));
}

function setLang(l, store) {
  if (!I18N[l]) return;
  LANG = l;
  if (store) { try { localStorage.setItem("nestora_lang", l); } catch (e) {} }
  applyI18n();
  if (typeof refreshDynamic === "function") refreshDynamic();
}
