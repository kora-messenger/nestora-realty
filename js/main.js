/* ============================================================
   NESTORA REALTY — SITE SCRIPTS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  hydrateConfig();
  initNav();
  initReveal();
  initCounters();

  if (document.getElementById("featured-grid")) renderFeatured();
  if (document.getElementById("listings-grid")) {
    renderListings();
    initFilters();
  }
  if (document.getElementById("agent-cards")) renderAgents();

  initTestimonials();
  initModal();
  initContactForm();
  initBackToTop();
});

/* ---------- Config hydration (brand, phone, links) ---------- */
function hydrateConfig() {
  document.querySelectorAll("[data-brand]").forEach(el => el.textContent = CONFIG.brand);
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = CONFIG.phone);
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = CONFIG.email);
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = CONFIG.address);
  document.querySelectorAll("[data-hours]").forEach(el => el.textContent = CONFIG.hours);

  document.querySelectorAll('a[data-tel]').forEach(a => a.href = "tel:" + CONFIG.phoneHref);
  document.querySelectorAll('a[data-mail]').forEach(a => a.href = "mailto:" + CONFIG.email);

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Generic WhatsApp buttons
  document.querySelectorAll("[data-wa]").forEach(a => {
    a.href = waLink(a.dataset.wa || "Hello " + CONFIG.brand + ", I'd like to make an enquiry.");
  });
}

/* ---------- Navigation ---------- */
function initNav() {
  const burger = document.querySelector(".nav-burger");
  const menu = document.querySelector(".nav-menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("open");
      burger.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });
  }
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(e => e.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      let start = null;
      const dur = 1600;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-NG") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

/* ---------- Property cards ---------- */
function cardHtml(p) {
  const price = formatNaira(p.price) + (p.priceNote ? `<span class="card-price-note">${p.priceNote}</span>` : "");
  const badge = p.badge ? `<span class="card-badge badge-gold">${p.badge}</span>` : "";
  return `
  <article class="property-card reveal" data-id="${p.id}">
    <div class="card-media">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <span class="card-status ${p.status}">${p.status === "sale" ? "For Sale" : "For Rent"}</span>
      ${badge}
    </div>
    <div class="card-body">
      <div class="card-price">${price}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-location"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${p.location}</p>
      <div class="card-specs">
        <span><strong>${p.beds}</strong> Beds</span>
        <span><strong>${p.baths}</strong> Baths</span>
        <span><strong>${p.sqm.toLocaleString("en-NG")}</strong> sqm</span>
      </div>
    </div>
    <button class="card-view" data-view="${p.id}">View details <span aria-hidden="true">&rarr;</span></button>
  </article>`;
}

function renderFeatured() {
  const grid = document.getElementById("featured-grid");
  const items = PROPERTIES.filter(p => p.featured).slice(0, 6);
  grid.innerHTML = items.map(cardHtml).join("");
  bindCards(grid);
  initReveal();
}

function renderListings() {
  const grid = document.getElementById("listings-grid");
  window._filtered = PROPERTIES.slice();
  drawListings();
}

function drawListings() {
  const grid = document.getElementById("listings-grid");
  const items = window._filtered;
  const count = document.getElementById("result-count");
  if (count) count.textContent = items.length + (items.length === 1 ? " property" : " properties") + " found";
  if (!items.length) {
    grid.innerHTML = `<div class="empty-state">
      <h3>No matches found</h3>
      <p>Try widening your price range or clearing filters.</p>
      <button class="btn btn-outline" id="clear-empty">Clear filters</button></div>`;
    const c = document.getElementById("clear-empty");
    if (c) c.addEventListener("click", clearFilters);
  } else {
    grid.innerHTML = items.map(cardHtml).join("");
  }
  bindCards(grid);
  grid.classList.add("visible");
}

/* ---------- Filters (properties page) ---------- */
function initFilters() {
  // populate location dropdown
  const locSel = document.getElementById("f-location");
  if (locSel) {
    [...new Set(PROPERTIES.map(p => p.location))].sort().forEach(l => {
      const o = document.createElement("option");
      o.value = l; o.textContent = l;
      locSel.appendChild(o);
    });
  }
  const apply = () => {
    const q = (document.getElementById("f-search")?.value || "").toLowerCase().trim();
    const status = document.getElementById("f-status")?.value || "all";
    const type = document.getElementById("f-type")?.value || "all";
    const loc = document.getElementById("f-location")?.value || "all";
    const min = parseInt(document.getElementById("f-min")?.value, 10) || 0;
    const max = parseInt(document.getElementById("f-max")?.value, 10) || Infinity;
    const beds = parseInt(document.getElementById("f-beds")?.value, 10) || 0;
    const sort = document.getElementById("f-sort")?.value || "default";

    let items = PROPERTIES.filter(p =>
      (status === "all" || p.status === status) &&
      (type === "all" || p.type === type) &&
      (loc === "all" || p.location === loc) &&
      p.price >= min && p.price <= max &&
      p.beds >= beds &&
      (!q || (p.title + " " + p.location + " " + p.type + " " + p.description).toLowerCase().includes(q))
    );

    if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort === "beds") items.sort((a, b) => b.beds - a.beds);

    window._filtered = items;
    drawListings();
  };

  document.querySelectorAll(".filters input, .filters select").forEach(el => el.addEventListener("input", apply));
  document.getElementById("filter-clear")?.addEventListener("click", clearFilters);

  // hero search on index page
  const heroForm = document.getElementById("hero-search");
  if (heroForm) {
    heroForm.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("hero-q").value;
      const status = document.getElementById("hero-status").value;
      const url = "properties.html?q=" + encodeURIComponent(q) + "&status=" + encodeURIComponent(status);
      window.location.href = url;
    });
  }

  // read query params (from hero search)
  const params = new URLSearchParams(window.location.search);
  if (params.has("q") || params.has("status")) {
    const q = params.get("q") || "";
    const s = params.get("status") || "all";
    const search = document.getElementById("f-search");
    const status = document.getElementById("f-status");
    if (search && q) search.value = q;
    if (status && s !== "all") status.value = s;
    apply();
  }
}

function clearFilters() {
  document.querySelectorAll(".filters input, .filters select").forEach(el => { el.value = el.tagName === "SELECT" ? "all" : ""; });
  const sort = document.getElementById("f-sort"); if (sort) sort.value = "default";
  window._filtered = PROPERTIES.slice();
  drawListings();
}

function bindCards(scope) {
  scope.querySelectorAll(".property-card").forEach(card => {
    card.addEventListener("click", () => openModal(parseInt(card.dataset.id, 10)));
  });
}

/* ---------- Property detail modal ---------- */
function initModal() {
  const modal = document.getElementById("property-modal");
  if (!modal) return;
  const close = modal.querySelector(".modal-close");
  close.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // gallery
  modal.querySelector(".gal-prev").addEventListener("click", () => galStep(-1));
  modal.querySelector(".gal-next").addEventListener("click", () => galStep(1));
}

let galIndex = 0, galImages = [];

function openModal(id) {
  const p = PROPERTIES.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById("property-modal");

  modal.querySelector(".m-status").textContent = p.status === "sale" ? "For Sale" : "For Rent";
  modal.querySelector(".m-status").className = "m-status " + p.status;
  modal.querySelector(".m-title").textContent = p.title;
  modal.querySelector(".m-price").textContent = formatNaira(p.price) + (p.priceNote ? " " + p.priceNote : "");
  modal.querySelector(".m-location").textContent = p.location;
  modal.querySelector(".m-desc").textContent = p.description;
  modal.querySelector(".m-specs").innerHTML = `
    <div><strong>${p.beds}</strong><span>Bedrooms</span></div>
    <div><strong>${p.baths}</strong><span>Bathrooms</span></div>
    <div><strong>${p.sqm.toLocaleString("en-NG")}</strong><span>Square metres</span></div>
    <div><strong>${p.type}</strong><span>Property type</span></div>`;

  modal.querySelector(".m-features").innerHTML = p.features.map(f => `<li>${f}</li>`).join("");

  const waMsg = `Hello ${CONFIG.brand}, I'm interested in "${p.title}" (${formatNaira(p.price)}${p.priceNote ? " " + p.priceNote : ""}) in ${p.location}. Please share more details and viewing times. Thank you.`;
  modal.querySelector(".m-wa").href = waLink(waMsg);

  galImages = p.gallery && p.gallery.length ? p.gallery : [p.image];
  galIndex = 0;
  drawGallery();
  drawThumbs();

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("property-modal");
  if (modal) { modal.classList.remove("open"); document.body.style.overflow = ""; }
}

function drawGallery() {
  const modal = document.getElementById("property-modal");
  const img = modal.querySelector(".gal-main img");
  img.src = galImages[galIndex];
  modal.querySelector(".gal-count").textContent = (galIndex + 1) + " / " + galImages.length;
}

function drawThumbs() {
  const thumbs = document.getElementById("gal-thumbs");
  if (!thumbs) return;
  thumbs.innerHTML = galImages.map((src, i) =>
    `<img src="${src}" class="${i === galIndex ? "active" : ""}" data-i="${i}" alt="Photo ${i + 1}" loading="lazy">`
  ).join("");
  thumbs.querySelectorAll("img").forEach(t => t.addEventListener("click", () => { galIndex = parseInt(t.dataset.i, 10); drawGallery(); drawThumbs(); }));
}

function galStep(d) {
  galIndex = (galIndex + d + galImages.length) % galImages.length;
  drawGallery();
  drawThumbs();
}

/* ---------- Team ---------- */
const AGENTS = [
  { name: "Adewale Oguntayo", role: "Principal Consultant", photo: "assets/img/team/agent1.jpg", wa: "Hello, I'd like to speak with Adewale about a property." },
  { name: "Chiamaka Eze", role: "Head, Residential Sales", photo: "assets/img/team/agent2.jpg", wa: "Hello, I'd like to speak with Chiamaka about buying a home." },
  { name: "Tunde Bakare", role: "Lettings & Property Manager", photo: "assets/img/team/agent3.jpg", wa: "Hello, I'd like to speak with Tunde about renting a property." }
];

function renderAgents() {
  const wrap = document.getElementById("agent-cards");
  wrap.innerHTML = AGENTS.map(a => `
    <div class="agent-card reveal">
      <div class="agent-photo"><img src="${a.photo}" alt="${a.name}" loading="lazy"></div>
      <h3>${a.name}</h3>
      <p class="agent-role">${a.role}</p>
      <a class="btn btn-sm btn-outline" href="${waLink(a.wa)}" target="_blank" rel="noopener">Chat on WhatsApp</a>
    </div>`).join("");
  initReveal();
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  { name: "Mrs. Adebisi O.", role: "Homeowner, Lekki", photo: "assets/img/team/t1.jpg", text: "Nestora found us a home in two weeks after we had searched for over a year on our own. The paperwork was handled end to end. Truly professional." },
  { name: "Ifeanyi N.", role: "Tenant, Victoria Island", photo: "assets/img/team/t2.jpg", text: "The serviced apartment matched the listing exactly. No surprises, no hidden fees, and the viewing was arranged the same day I called." },
  { name: "Barr. Funke A.", role: "Investor, Ikoyi", photo: "assets/img/team/t3.jpg", text: "Their valuation advice saved me from a bad purchase. I have since bought two investment properties through them." },
  { name: "Engr. Emeka U.", role: "Homeowner, Ajah", photo: "assets/img/team/t4.jpg", text: "From inspection to keys in one month. They explained every charge upfront and followed up even after we moved in." }
];

function initTestimonials() {
  const track = document.getElementById("testimonial-track");
  const dots = document.getElementById("testimonial-dots");
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(t => `
    <figure class="testimonial">
      <blockquote>&ldquo;${t.text}&rdquo;</blockquote>
      <figcaption>
        <img src="${t.photo}" alt="${t.name}" loading="lazy">
        <div><strong>${t.name}</strong><span>${t.role}</span></div>
      </figcaption>
    </figure>`).join("");

  dots.innerHTML = TESTIMONIALS.map((_, i) => `<button class="${i === 0 ? "on" : ""}" aria-label="Testimonial ${i + 1}"></button>`).join("");

  let idx = 0, timer;
  const go = i => {
    idx = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.querySelectorAll("button").forEach((b, bi) => b.classList.toggle("on", bi === idx));
  };
  const auto = () => { timer = setInterval(() => go(idx + 1), 6000); };
  dots.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => { clearInterval(timer); go(i); auto(); }));
  auto();
}

/* ---------- Contact form -> WhatsApp ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg =
      `Hello ${CONFIG.brand}, I'd like to make an enquiry.\n\n` +
      `Name: ${d.get("name")}\n` +
      `Email: ${d.get("email")}\n` +
      `Phone: ${d.get("phone")}\n` +
      `Interest: ${d.get("interest")}\n\n` +
      `Message:\n${d.get("message")}`;
    window.open(waLink(msg), "_blank");
    form.reset();
    const ok = document.getElementById("form-ok");
    if (ok) { ok.classList.add("show"); setTimeout(() => ok.classList.remove("show"), 6000); }
  });
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById("to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 600));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
