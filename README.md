# Nestora Realty — Real Estate Website

A professional, fully static real estate website for the German market (no build step). Prices in €, listings in German cities, and automatic language detection: visitors get German (DE) or English (EN) based on their browser language / timezone, with a DE/EN switcher in the header. Deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

**Live:** https://kora-messenger.github.io/nestora-realty/

## Pages
- `index.html` — hero with property search, featured listings, services, why-us, testimonials, CTA
- `properties.html` — full listings with filters (keyword, buy/rent, type, location, min beds, price range) + sorting and a photo-gallery detail modal
- `about.html` — story, values, team, process
- `contact.html` — contact card, enquiry form (opens WhatsApp pre-filled), FAQ

## Customizing

### 1. Business details — `js/config.js`
Brand name, phone, WhatsApp number, email, address, hours and social links. Everything on the site reads from this one file. When you bump any cached asset, increase the `?v=` version in the HTML `<link>`/`<script>` tags.

### 2. Listings — `js/properties.js`
German listings (Munich, Berlin, Hamburg, Frankfurt, Düsseldorf, Cologne, Stuttgart, Leipzig) priced in €. Text fields that differ per language are `{ en, de }` objects: `title, description, features, location, badge`. `type` is a key (`duplex, detached, apartment, terraced, penthouse, bungalow`); rent listings use `priceNote: "per_month"`. Add or edit entries and both the home page featured section and the listings page update automatically.

### 3. Images — `assets/img/`
Replace the photos with real client photography, keeping the same filenames (or update the paths in `properties.js`).

### 4. Team & testimonials — `js/main.js`
Edit the `AGENTS` and `TESTIMONIALS` arrays (names, roles and texts support `{ en, de }`).

### 5. Language — `js/i18n.js`
All UI strings live in the `I18N` dictionary (EN + DE). Detection order: `?lang=de|en` URL param, saved preference, browser language, Europe/Berlin timezone, fallback English. The DE/EN header switcher stores the visitor's choice.

## Deploying
Just push to `main` — the workflow in `.github/workflows/deploy.yml` publishes the site to GitHub Pages. The Actions run must be green and Pages must be set to "GitHub Actions" as the source (already configured for this repo).
