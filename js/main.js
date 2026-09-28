/* ============================================================
   NESTORA REALTY — SITE SCRIPTS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  hydrateConfig();
  applyI18n();
  initLangSwitch();
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

/* Re-render dynamic parts when the language changes */
function refreshDynamic() {
  hydrateConfig();
  if (document.getElementById("featured-grid")) renderFeatured();
  if (document.getElementById("listings-grid")) { renderListings(); initFilters(); }
  if (document.getElementById("agent-cards")) renderAgents();
  initTestimonials();
  initReveal();
}

function initLangSwitch() {
  document.querySelectorAll(".lang-switch button").forEach(b => {
    b.addEventListener("click", () => setLang(b.dataset.lang, true));
  });
}

/* ---------- Config hydration (brand, phone, links) ---------- */
function hydrateConfig() {
  document.querySelectorAll("[data-brand]").forEach(el => el.textContent = CONFIG.brand);
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = CONFIG.phone);
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = CONFIG.email);
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = L(CONFIG.address));
  document.querySelectorAll("[data-hours]").forEach(el => el.textContent = t(CONFIG.hours));

  document.querySelectorAll('a[data-tel]').forEach(a => a.href = "tel:" + CONFIG.phoneHref);
  document.querySelectorAll('a[data-mail]').forEach(a => a.href = "mailto:" + CONFIG.email);

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Generic Telegram buttons: value is an i18n key
  document.querySelectorAll("[data-tg]").forEach(a => {
    a.href = tgLink(t(a.dataset.tg || "tg_general"));
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
        el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

/* ---------- Property cards ---------- */
function cardHtml(p) {
  const price = formatEuro(p.price) + (p.priceNote ? `<span class="card-price-note">${t(p.priceNote)}</span>` : "");
  const badge = p.badge ? `<span class="card-badge badge-gold">${L(p.badge)}</span>` : "";
  return `
  <article class="property-card reveal" data-id="${p.id}">
    <div class="card-media">
      <img src="${p.image}" alt="${L(p.title)}" loading="lazy">
      <span class="card-status ${p.status}">${p.status === "sale" ? t("for_sale") : t("for_rent")}</span>
      ${badge}
    </div>
    <div class="card-body">
      <div class="card-price">${price}</div>
      <h3 class="card-title">${L(p.title)}</h3>
      <p class="card-location"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${L(p.location)}</p>
      <div class="card-specs">
        <span><strong>${p.beds}</strong> ${t("beds")}</span>
        <span><strong>${p.baths}</strong> ${t("baths")}</span>
        <span><strong>${p.sqm.toLocaleString("en-US")}</strong> m²</span>
      </div>
    </div>
    <button class="card-view" data-view="${p.id}">${t("view_details")} <span aria-hidden="true">&rarr;</span></button>
  </article>`;
}

function renderFeatured() {
  const grid = document.getElementById("featured-grid");
  const items = PROPERTIES.filter(p => p.featured).slice(0, 9);
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
  if (count) count.textContent = t(items.length === 1 ? "results_one" : "results", { n: items.length });
  const PAGE_SIZE = 12;
  window._shown = window._shown || PAGE_SIZE;
  if (!items.length) {
    grid.innerHTML = `<div class="empty-state">
      <h3>${t("empty_h")}</h3>
      <p>${t("empty_p")}</p>
      <button class="btn btn-outline" id="clear-empty">${t("empty_clear")}</button></div>`;
    const c = document.getElementById("clear-empty");
    if (c) c.addEventListener("click", clearFilters);
    removeLoadMore(grid);
  } else {
    const visible = items.slice(0, window._shown);
    grid.innerHTML = visible.map(cardHtml).join("");
    updateLoadMore(grid, items.length);
  }
  bindCards(grid);
  grid.classList.add("visible");
}


function removeLoadMore(grid) {
  const b = document.getElementById("load-more");
  if (b) b.remove();
}

function updateLoadMore(grid, total) {
  let btn = document.getElementById("load-more");
  if (window._shown < total) {
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "load-more";
      btn.className = "btn btn-outline";
      btn.style.margin = "34px auto 10px";
      btn.style.display = "block";
      btn.addEventListener("click", () => {
        window._shown += 12;
        drawListings();
        btn.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      grid.after(btn);
    }
    btn.textContent = t("load_more") + " (" + Math.min(window._shown, total) + " / " + total + ")";
  } else if (btn) btn.remove();
}

/* ---------- Filters (properties page) ---------- */
function initFilters() {
  const typeSel = document.getElementById("f-type");
  const locSel = document.getElementById("f-location");
  if (typeSel) {
    typeSel.innerHTML = `<option value="all">${t("f_any")}</option>` +
      [...new Set(PROPERTIES.map(p => p.type))].map(ty => `<option value="${ty}">${t("type_" + ty)}</option>`).join("");
  }
  if (locSel) {
    const locs = [...new Set(PROPERTIES.map(p => L(p.location)))].sort((a, b) => a.localeCompare(b));
    locSel.innerHTML = `<option value="all">${t("f_anywhere")}</option>` +
      locs.map(l => `<option value="${l}">${l}</option>`).join("");
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
      (loc === "all" || L(p.location) === loc) &&
      p.price >= min && p.price <= max &&
      p.beds >= beds &&
      (!q || (L(p.title) + " " + L(p.location) + " " + t("type_" + p.type) + " " + L(p.description)).toLowerCase().includes(q))
    );

    if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort === "beds") items.sort((a, b) => b.beds - a.beds);

    window._filtered = items;
    drawListings();
  };

  document.querySelectorAll(".filters input, .filters select").forEach(el => el.addEventListener("input", () => {
    window._shown = 12;
    apply();
  }));
  document.getElementById("filter-clear")?.addEventListener("click", clearFilters);

  // hero search on index page
  const heroForm = document.getElementById("hero-search");
  if (heroForm && !heroForm.dataset.bound) {
    heroForm.dataset.bound = "1";
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
  if ((params.has("q") || params.has("status")) && !window._qApplied) {
    window._qApplied = true;
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
  window._shown = 12;
  document.querySelectorAll(".filters input").forEach(el => { el.value = ""; });
  document.querySelectorAll(".filters select").forEach(el => { el.value = "all"; });
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

  modal.querySelector(".gal-prev").addEventListener("click", () => galStep(-1));
  modal.querySelector(".gal-next").addEventListener("click", () => galStep(1));
}

let galIndex = 0, galImages = [];

function openModal(id) {
  const p = PROPERTIES.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById("property-modal");

  modal.querySelector(".m-status").textContent = p.status === "sale" ? t("for_sale") : t("for_rent");
  modal.querySelector(".m-status").className = "m-status " + p.status;
  modal.querySelector(".m-title").textContent = L(p.title);
  modal.querySelector(".m-price").textContent = formatEuro(p.price) + (p.priceNote ? " " + t(p.priceNote) : "");
  modal.querySelector(".m-location").textContent = L(p.location);
  modal.querySelector(".m-desc").textContent = L(p.description);
  modal.querySelector(".m-specs").innerHTML = `
    <div><strong>${p.beds}</strong><span>${t("m_beds")}</span></div>
    <div><strong>${p.baths}</strong><span>${t("m_baths")}</span></div>
    <div><strong>${p.sqm.toLocaleString("en-US")}</strong><span>${t("m_sqm")}</span></div>
    <div><strong>${t("type_" + p.type)}</strong><span>${t("m_type")}</span></div>`;

  modal.querySelector(".m-features").innerHTML = L(p.features).map(f => `<li>${f}</li>`).join("");

  const waMsg = t("m_msg", {
    brand: CONFIG.brand,
    title: L(p.title),
    price: formatEuro(p.price) + (p.priceNote ? " " + t(p.priceNote) : ""),
    location: L(p.location)
  });
  modal.querySelector(".m-tg").href = tgLink(waMsg);
  modal.querySelector(".m-tg").textContent = t("m_viewing");
  modal.querySelector(".m-call").textContent = t("m_call");

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
    `<img src="${src}" class="${i === galIndex ? "active" : ""}" data-i="${i}" alt="" loading="lazy">`
  ).join("");
  thumbs.querySelectorAll("img").forEach(t2 => t2.addEventListener("click", () => { galIndex = parseInt(t2.dataset.i, 10); drawGallery(); drawThumbs(); }));
}

function galStep(d) {
  galIndex = (galIndex + d + galImages.length) % galImages.length;
  drawGallery();
  drawThumbs();
}

/* ---------- Team ---------- */
const AGENTS = [
  { name: "Stefan Vogel", role: { en: "Principal Consultant", de: "Geschäftsführer" }, photo: "assets/img/team/agent1.jpg", wa: { en: "Hello, I'd like to speak with Stefan about a property.", de: "Hallo, ich möchte mit Stefan über eine Immobilie sprechen." } },
  { name: "Annika Brandt", role: { en: "Head of Residential Sales", de: "Leiterin Wohnungsbau-Verkauf" }, photo: "assets/img/team/agent2.jpg", wa: { en: "Hello, I'd like to speak with Annika about buying a home.", de: "Hallo, ich möchte mit Annika über einen Immobilienkauf sprechen." } },
  { name: "Lukas Weber", role: { en: "Lettings & Property Manager", de: "Mietverwaltung & Objektbetreuung" }, photo: "assets/img/team/agent3.jpg", wa: { en: "Hello, I'd like to speak with Lukas about renting a property.", de: "Hallo, ich möchte mit Lukas über eine Mietimmobilie sprechen." } }
];

function renderAgents() {
  const wrap = document.getElementById("agent-cards");
  wrap.innerHTML = AGENTS.map(a => `
    <div class="agent-card reveal">
      <div class="agent-photo"><img src="${a.photo}" alt="${a.name}" loading="lazy"></div>
      <h3>${a.name}</h3>
      <p class="agent-role">${L(a.role)}</p>
      <a class="btn btn-sm btn-outline" href="${tgLink(L(a.wa))}" target="_blank" rel="noopener">${t("team_chat")}</a>
    </div>`).join("");
  initReveal();
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  { name: "Familie Hoffmann", photo: "assets/img/team/t1.jpg",
    role: { en: "Homeowner, Munich", de: "Eigenheimbesitzer, München" },
    text: { en: "Nestora found us a home in two weeks after we had searched for over a year on our own. The paperwork was handled end to end. Truly professional.",
            de: "Nestora hat in zwei Wochen ein Zuhause für uns gefunden, nachdem wir über ein Jahr allein gesucht hatten. Die Formalitäten wurden komplett übernommen. Wirklich professionell." } },
  { name: "Jonas K.", photo: "assets/img/team/t2.jpg",
    role: { en: "Tenant, Berlin", de: "Mieter, Berlin" },
    text: { en: "The furnished apartment matched the listing exactly. No surprises, no hidden fees, and the viewing was arranged the same day I called.",
            de: "Die Wohnung entsprach exakt dem Angebot. Keine Überraschungen, keine versteckten Kosten – und die Besichtigung fand am selben Tag statt." } },
  { name: "Funke A.", photo: "assets/img/team/t3.jpg",
    role: { en: "Investor, Frankfurt", de: "Investorin, Frankfurt" },
    text: { en: "Their valuation advice saved me from a bad purchase. I have since bought two investment properties through them.",
            de: "Ihre Bewertung hat mich vor einem Fehlkauf bewahrt. Seitdem habe ich zwei Anlageobjekte über sie gekauft." } },
  { name: "Erik U.", photo: "assets/img/team/t4.jpg",
    role: { en: "Homeowner, Stuttgart", de: "Eigenheimbesitzer, Stuttgart" },
    text: { en: "From viewing to keys in one month. They explained every charge upfront and followed up even after we moved in.",
            de: "Von der Besichtigung bis zu den Schlüsseln in einem Monat. Jede Position vorab erklärt – und auch nach dem Einzug erreichbar." } }
];

function initTestimonials() {
  const track = document.getElementById("testimonial-track");
  const dots = document.getElementById("testimonial-dots");
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(x => `
    <figure class="testimonial">
      <blockquote>&ldquo;${L(x.text)}&rdquo;</blockquote>
      <figcaption>
        <img src="${x.photo}" alt="${x.name}" loading="lazy">
        <div><strong>${x.name}</strong><span>${L(x.role)}</span></div>
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

/* ---------- Contact form -> Telegram ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = t("cf_msg", {
      brand: CONFIG.brand,
      name: d.get("name"),
      email: d.get("email"),
      phone: d.get("phone"),
      interest: d.get("interest"),
      message: d.get("message")
    });
    window.open(tgLink(msg), "_blank");
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
