/* ============================================================
   NESTORA REALTY — SITE CONFIGURATION
   Edit the values below to customize the whole site.
   Every page reads its business details from this one file.
   ============================================================ */

const CONFIG = {
  brand: "Nestora Realty",
  brandInitials: "NR",
  tagline: "Find a place you'll love to live",
  phone: "+234 801 234 5678",          // shown on the site
  phoneHref: "+2348012345678",          // used in tel: links
  whatsapp: "2348012345678",            // digits only, with country code
  email: "hello@nestorarealty.com",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  hours: "Mon – Sat · 8:00am – 6:00pm",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/"
  }
};

/* Format a price in Naira, e.g. 185000000 -> "₦185,000,000" */
function formatNaira(n) {
  return "₦" + Number(n).toLocaleString("en-NG");
}

/* Build a WhatsApp chat link with a prefilled message */
function waLink(message) {
  return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(message);
}
