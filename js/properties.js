/* ============================================================
   NESTORA REALTY — PROPERTY LISTINGS DATA
   Add, remove or edit listings here. The Properties page,
   the home page featured section and search all read this file.

   Fields:
     id, title, status ("sale" | "rent"), type, price,
     priceNote (optional, e.g. "per annum" or "per sqm"),
     location, beds, baths, sqm, description,
     features [], image, gallery [], badge (optional),
     featured (true = appears on the home page)
   ============================================================ */

const PROPERTIES = [
  {
    id: 1,
    title: "4-Bedroom Luxury Duplex with BQ",
    status: "sale",
    type: "Duplex",
    price: 185000000,
    location: "Lekki Phase 1, Lagos",
    beds: 4, baths: 5, sqm: 420,
    badge: "New",
    featured: true,
    description:
      "A beautifully finished 4-bedroom duplex in the heart of Lekki Phase 1. Features spacious living areas, fitted kitchen with island, en-suite bedrooms, family lounge, boys' quarters, ample parking and 24/7 security in a gated estate.",
    features: ["Fitted kitchen", "Boys' quarters (BQ)", "Gated estate", "Ample parking", "Fibre internet ready", "CCTV & 24/7 security"],
    image: "assets/img/properties/p1.jpg",
    gallery: ["assets/img/properties/p1.jpg", "assets/img/pages/int1.jpg", "assets/img/pages/int3.jpg", "assets/img/pages/int6.jpg"]
  },
  {
    id: 2,
    title: "5-Bedroom Detached Villa with Pool",
    status: "sale",
    type: "Detached",
    price: 450000000,
    location: "Banana Island, Ikoyi, Lagos",
    beds: 5, baths: 6, sqm: 650,
    badge: "Luxury",
    featured: true,
    description:
      "An executive waterfront villa on Banana Island. Private swimming pool, cinema room, gym, elevator, smart-home automation, staff quarters and a private boat dock. The definition of premium Lagos living.",
    features: ["Swimming pool", "Cinema room", "Gym", "Elevator", "Smart home", "Waterfront view", "Staff quarters"],
    image: "assets/img/properties/p2.jpg",
    gallery: ["assets/img/properties/p2.jpg", "assets/img/pages/int2.jpg", "assets/img/pages/int1.jpg", "assets/img/pages/int4.jpg"]
  },
  {
    id: 3,
    title: "3-Bedroom Serviced Apartment",
    status: "rent",
    type: "Apartment",
    price: 6500000,
    priceNote: "per annum",
    location: "Victoria Island, Lagos",
    beds: 3, baths: 3, sqm: 180,
    featured: true,
    description:
      "Fully serviced 3-bedroom apartment in a managed residence on Adeola Odeku. Rent includes 24/7 power (diesel + inverter), treated water, gym access, swimming pool and estate maintenance. Walking distance to business district.",
    features: ["24/7 power", "Gym & pool", "Air conditioned", "Furnished option", "Elevator", "Secure parking"],
    image: "assets/img/properties/p3.jpg",
    gallery: ["assets/img/properties/p3.jpg", "assets/img/pages/int4.jpg", "assets/img/pages/int5.jpg", "assets/img/pages/int7.jpg"]
  },
  {
    id: 4,
    title: "Modern 2-Bedroom Flat",
    status: "rent",
    type: "Apartment",
    price: 2500000,
    priceNote: "per annum",
    location: "Yaba, Lagos",
    beds: 2, baths: 2, sqm: 95,
    badge: "Popular",
    description:
      "Bright, newly renovated 2-bedroom flat minutes from Yaba tech cluster. POP ceilings, prepaid meter, borehole water, secure compound and easy access to the mainland business districts.",
    features: ["Newly renovated", "Prepaid meter", "Borehole water", "Tiled floors", "Secure compound"],
    image: "assets/img/properties/p4.jpg",
    gallery: ["assets/img/properties/p4.jpg", "assets/img/pages/int5.jpg", "assets/img/pages/int3.jpg"]
  },
  {
    id: 5,
    title: "4-Bedroom Terraced House",
    status: "sale",
    type: "Terraced",
    price: 95000000,
    location: "Chevron Drive, Lekki, Lagos",
    beds: 4, baths: 4, sqm: 280,
    featured: true,
    description:
      "Well-maintained 4-bedroom terrace in a quiet estate off Chevron Drive. Open-plan living room, guest toilet, fitted kitchen, rear garden and a dedicated residents' association with security.",
    features: ["Open-plan living", "Rear garden", "Guest toilet", "Estate security", "Children's play area"],
    image: "assets/img/properties/p5.jpg",
    gallery: ["assets/img/properties/p5.jpg", "assets/img/pages/int6.jpg", "assets/img/pages/int2.jpg"]
  },
  {
    id: 6,
    title: "5-Bedroom Family Home in GRA",
    status: "sale",
    type: "Detached",
    price: 220000000,
    location: "Ikeja GRA, Lagos",
    beds: 5, baths: 5, sqm: 500,
    description:
      "Classic GRA family residence on a large plot with mature gardens. Five generous bedrooms, two lounges, study, domestic staff annex and space for six cars. Ideal for executives who want mainland prestige.",
    features: ["Large plot", "Study", "Staff annex", "Six-car parking", "Mature garden"],
    image: "assets/img/properties/p6.jpg",
    gallery: ["assets/img/properties/p6.jpg", "assets/img/pages/int7.jpg", "assets/img/pages/int1.jpg"]
  },
  {
    id: 7,
    title: "Contemporary Country Retreat",
    status: "sale",
    type: "Bungalow",
    price: 68000000,
    location: "Epe, Lagos",
    beds: 3, baths: 3, sqm: 350,
    description:
      "A serene 3-bedroom bungalow retreat off the Epe resort corridor. Vaulted ceilings, wrap-around veranda, orchard and borehole. Perfect as a weekend home or quiet family base away from the city.",
    features: ["Wrap-around veranda", "Orchard", "Borehole", "Solar ready", "Quiet neighbourhood"],
    image: "assets/img/properties/p7.jpg",
    gallery: ["assets/img/properties/p7.jpg", "assets/img/pages/int2.jpg", "assets/img/pages/int5.jpg"]
  },
  {
    id: 8,
    title: "Duplex Penthouse with Sky Lounge",
    status: "sale",
    type: "Penthouse",
    price: 325000000,
    location: "Ikoyi, Lagos",
    beds: 4, baths: 5, sqm: 400,
    badge: "Luxury",
    description:
      "Duplex penthouse crowning one of Ikoyi's landmark towers. Private sky lounge, panoramic city views, premium Gaggenau kitchen, marble finishes, concierge service and two dedicated parking bays.",
    features: ["Sky lounge", "Panoramic views", "Concierge", "Two parking bays", "Marble finishes", "Smart home"],
    image: "assets/img/properties/p8.jpg",
    gallery: ["assets/img/properties/p8.jpg", "assets/img/pages/int1.jpg", "assets/img/pages/int4.jpg", "assets/img/pages/int6.jpg"]
  },
  {
    id: 9,
    title: "3-Bedroom Apartment with BQ",
    status: "rent",
    type: "Apartment",
    price: 4500000,
    priceNote: "per annum",
    location: "Ajah, Lagos",
    beds: 3, baths: 4, sqm: 150,
    description:
      "Spacious 3-bedroom apartment with attached BQ in a serviced Ajah compound. Steady power backup, treated water, secure gatehouse and quick access to the Lekki-Epe expressway.",
    features: ["Attached BQ", "Power backup", "Treated water", "Gatehouse security", "Expressway access"],
    image: "assets/img/properties/p9.jpg",
    gallery: ["assets/img/properties/p9.jpg", "assets/img/pages/int3.jpg", "assets/img/pages/int7.jpg"]
  }
];
