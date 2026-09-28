/* ============================================================
   NESTORA REALTY — SITE CONFIGURATION
   Edit the values below to customize the whole site.
   Every page reads its business details from this one file.
   ============================================================ */

const CONFIG = {
  brand: "Nestora Realty",
  brandInitials: "NR",
  tagline: "Find a place you'll love to live",
  phone: "+49 89 12345678",            // shown on the site
  phoneHref: "+498912345678",          // used in tel: links
  telegram: "Mathias66991",             // Telegram username to receive enquiries
  email: "hallo@nestorarealty.de",
  address: { en: "Marienplatz 8, 80331 Munich, Germany", de: "Marienplatz 8, 80331 München, Deutschland" },
  hours: "hours_value",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/"
  }
};

/* Format a price in euro, localized: €1,850,000 (en) / 1.850.000 € (de) */
function formatEuro(n) {
  if (typeof LANG !== "undefined" && LANG === "de") {
    return new Intl.NumberFormat("de-DE").format(n) + " €";
  }
  return "€" + new Intl.NumberFormat("en-US").format(n);
}

/* Build a Telegram chat link with a prefilled message */
function tgLink(message) {
  return "https://t.me/" + CONFIG.telegram + "?text=" + encodeURIComponent(message);
}
