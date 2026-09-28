# Nestora Realty — Real Estate Website

A professional, fully static real estate website (no build step). Deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

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
Each property object supports: `id, title, status ("sale"|"rent"), type, price, priceNote, location, beds, baths, sqm, badge, featured, description, features[], image, gallery[]`. Add or edit entries and both the home page featured section and the listings page update automatically.

### 3. Images — `assets/img/`
Replace the photos with real client photography, keeping the same filenames (or update the paths in `properties.js`).

### 4. Team & testimonials — `js/main.js`
Edit the `AGENTS` and `TESTIMONIALS` arrays.

## Deploying
Just push to `main` — the workflow in `.github/workflows/deploy.yml` publishes the site to GitHub Pages. The Actions run must be green and Pages must be set to "GitHub Actions" as the source (already configured for this repo).
