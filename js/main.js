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
  initContactForm();
  initBackToTop();
});

/* Re-render dynamic parts when the language changes */
function refreshDynamic() {
  hydrateConfig();
  if (document.querySelector(".detail-wrap") && typeof renderDetail === "function") renderDetail();
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
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(e => e.classList.add("visible"));
    return;
  }
  window._revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); window._revealIO.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(e => window._revealIO.observe(e));
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
function fmtPm2(v) {
  const d = v >= 100 ? 0 : (v >= 20 ? 1 : 2);
  return v.toLocaleString(LANG === "de" ? "de-DE" : "en-US", { minimumFractionDigits: 0, maximumFractionDigits: d }) + " \u20AC";
}

function cardHtml(p) {
  const price = formatEuro(p.price) + (p.priceNote ? `<span class="card-price-note">${t(p.priceNote)}</span>` : "");
  const badge = p.badge ? `<span class="card-badge badge-gold">${L(p.badge)}</span>` : "";
  const pm2 = `<span class="card-pm2">${t("per_m2", { p: fmtPm2(p.price / p.sqm) })}</span>`;
  const ec = p.energyClass ? `<span class="ec ec-${p.energyClass.replace("+", "p")}">${p.energyClass}</span>` : "";
  const hearted = FAVS.has(p.id) ? " active" : "";
  return `
  <article class="property-card reveal" data-id="${p.id}">
    <button class="fav-btn${hearted}" data-fav="${p.id}" aria-label="Save" title="${t("d_fav")}">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="${hearted ? "#E5484D" : "rgba(255,255,255,.9)"}" stroke="rgba(20,30,45,.55)" stroke-width="1.5"><path d="M12 21s-7.5-4.9-9.7-9.2C.6 8.6 2.4 5 5.9 5c2 0 3.4 1.1 4.1 2.4C10.7 6.1 12.1 5 14.1 5c3.5 0 5.3 3.6 3.6 6.8C19.5 16.1 12 21 12 21z"/></svg>
    </button>
    <div class="card-media">
      <img src="${p.image}" alt="${L(p.title)}" loading="lazy">
      <span class="card-status ${p.status}">${p.status === "sale" ? t("for_sale") : t("for_rent")}</span>
      ${ec}
      ${badge}
    </div>
    <div class="card-body">
      <div class="card-price">${price}${pm2}</div>
      <h3 class="card-title">${L(p.title)}</h3>
      <p class="card-location"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${L(p.location)}</p>
      <div class="card-specs">
        <span><strong>${p.beds}</strong> ${t("beds")}</span>
        <span><strong>${p.baths}</strong> ${t("baths")}</span>
        <span><strong>${p.sqm.toLocaleString("en-US")}</strong> m&#178;</span>
      </div>
    </div>
    <button class="card-view" data-view="${p.id}">${t("view_details")} <span aria-hidden="true">&rarr;</span></button>
  </article>`;
}

/* ---------- Favorites (localStorage, no login) ---------- */
function favsLoad() { try { return new Set(JSON.parse(localStorage.getItem("nestora_favs") || "[]")); } catch (e) { return new Set(); } }
function favsSave() { localStorage.setItem("nestora_favs", JSON.stringify([...FAVS])); }
const FAVS = favsLoad();

function updateFavChip() {
  const chip = document.getElementById("chip-favs");
  if (!chip) return;
  chip.innerHTML = t("chip_favs") + (FAVS.size ? ` <span class="chip-count">${FAVS.size}</span>` : "");
}

function bindCards(scope) {
  scope.querySelectorAll(".property-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = "property.html?id=" + card.dataset.id;
    });
  });
  scope.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.fav, 10);
      if (FAVS.has(id)) FAVS.delete(id); else FAVS.add(id);
      favsSave();
      const on = FAVS.has(id);
      btn.classList.toggle("active", on);
      btn.querySelector("svg").setAttribute("fill", on ? "#E5484D" : "rgba(255,255,255,.9)");
      updateFavChip();
    });
  });
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
  grid.querySelectorAll(".reveal:not(.visible)").forEach(el => {
    if (window._revealIO) window._revealIO.observe(el);
    else el.classList.add("visible");
  });
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
  if (typeSel) {
    typeSel.innerHTML = `<option value="all">${t("f_any")}</option>` +
      [...new Set(PROPERTIES.map(p => p.type))].map(ty => `<option value="${ty}">${t("type_" + ty)}</option>`).join("");
  }

  /* ---- location autocomplete (states / cities / districts / ZIP) ---- */
  const locq = document.getElementById("f-locq");
  const drop = document.getElementById("loc-drop");
  const radiusSel = document.getElementById("f-radius");
  window._locSel = null;

  const norm = x => x.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss");
  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371, r = Math.PI / 180;
    const dLat = (lat2 - lat1) * r, dLng = (lng2 - lng1) * r;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }
  window._haversine = haversine;

  function suggestions(qRaw) {
    const q = norm(qRaw.trim());
    if (q.length < 2) return [];
    const out = [];
    for (const st of STATES) {
      if (norm(st.en).includes(q) || norm(st.de).includes(q))
        out.push({ kind: "state", label: st });
    }
    for (const c of CITIES) {
      if (norm(c.en).includes(q) || norm(c.de).includes(q))
        out.push({ kind: "city", label: c, sub: c.state });
      else if (q.length >= 3 && c.zip.slice(0, q.length) === q)
        out.push({ kind: "zip", label: c, sub: c.zip + " — " + c.de, zip: c.zip });
    }
    for (const d of DISTRICTS) {
      if (norm(d.en).includes(q) || norm(d.de).includes(q))
        out.push({ kind: "district", label: d, sub: d.city });
    }
    return out.slice(0, 9);
  }

  function pickLoc(sug) {
    const kind = sug.kind;
    if (kind === "state") {
      window._locSel = { kind, name: sug.label.en, nameDe: sug.label.de, lat: sug.label.lat, lng: sug.label.lng };
      locq.value = sug.label[L({en:"en",de:"de"})] || sug.label.en;
    } else if (kind === "city") {
      window._locSel = { kind, name: sug.label.en, nameDe: sug.label.de, lat: sug.label.lat, lng: sug.label.lng, zip: sug.label.zip };
      locq.value = sug.label[L({en:"en",de:"de"})] || sug.label.en;
    } else if (kind === "zip") {
      const c = sug.label;
      window._locSel = { kind: "city", name: c.en, nameDe: c.de, lat: c.lat, lng: c.lng, zip: sug.zip };
      locq.value = sug.zip + " " + (L({en:"en",de:"de"}) === "de" ? c.de : c.en);
    } else {
      window._locSel = { kind, name: sug.label.en, nameDe: sug.label.de, lat: sug.label.lat, lng: sug.label.lng };
      locq.value = sug.label[L({en:"en",de:"de"})] || sug.label.en;
    }
    drop.hidden = true;
    if (radiusSel) radiusSel.hidden = false;
    apply();
  }
  window._pickLoc = pickLoc;

  if (locq) {
    locq.addEventListener("input", () => {
      window._locSel = null;
      if (radiusSel) { radiusSel.hidden = true; radiusSel.value = "0"; }
      const sugg = suggestions(locq.value);
      if (!sugg.length) { drop.hidden = true; return; }
      drop.innerHTML = sugg.map((g, i) =>
        `<div class="loc-item" data-i="${i}">
           <span class="loc-name">${g.kind === "zip" ? g.sub.split(" — ")[0] : (L({en:"en",de:"de"}) === "de" ? g.label.de : g.label.en)}${g.kind === "zip" ? " · " + (L({en:"en",de:"de"}) === "de" ? g.label.de : g.label.en) : ""}</span>
           <span class="loc-sub">${g.kind === "state" ? t("loc_states") : g.kind === "city" ? (t("loc_cities") + " · " + g.sub) : g.kind === "zip" ? t("loc_zips") : (t("loc_districts") + " · " + g.sub)}</span>
         </div>`).join("");
      drop.hidden = false;
      [...drop.children].forEach(el => el.addEventListener("click", () => pickLoc(sugg[parseInt(el.dataset.i, 10)])));
    });
    locq.addEventListener("keydown", e => {
      if (e.key === "Enter" && !drop.hidden) {
        e.preventDefault();
        const first = drop.querySelector(".loc-item");
        if (first) pickLoc(suggestions(locq.value)[parseInt(first.dataset.i, 10)]);
      }
    });
    document.addEventListener("click", e => { if (!e.target.closest(".loc-wrap")) drop.hidden = true; });
  }

  /* ---- advanced filters toggle ---- */
  const advBtn = document.getElementById("adv-toggle");
  const advPanel = document.getElementById("adv-panel");
  if (advBtn) advBtn.addEventListener("click", () => {
    advPanel.hidden = !advPanel.hidden;
    advBtn.textContent = advPanel.hidden ? t("adv_filters") : t("adv_hide");
    const tg = document.querySelector(".telegram-float");
    if (tg) tg.classList.toggle("tg-hidden", !advPanel.hidden);
  });

  /* ---- energy chips ---- */
  document.querySelectorAll("#f-energy .ec-chip").forEach(ch => {
    ch.addEventListener("click", () => ch.classList.toggle("on"));
  });

  /* ---- quick chips ---- */
  document.querySelectorAll(".qchip[data-qfeat]").forEach(ch => {
    ch.addEventListener("click", () => {
      ch.classList.toggle("on");
      const box = document.querySelector(`#f-feats input[value="${ch.dataset.qfeat}"]`);
      if (box) box.checked = ch.classList.contains("on");
      window._shown = 12;
      apply();
    });
  });
  const chip3 = document.getElementById("chip-3plus");
  if (chip3) chip3.addEventListener("click", () => {
    chip3.classList.toggle("on");
    const rm = document.getElementById("f-rmin");
    if (rm) rm.value = chip3.classList.contains("on") ? "3" : "0";
    window._shown = 12;
    apply();
  });
  updateFavChip();
  const chipF = document.getElementById("chip-favs");
  if (chipF) chipF.addEventListener("click", () => {
    chipF.classList.toggle("on");
    window._shown = 12;
    apply();
  });

  /* ---- AI-style natural language search ---- */
  const aiInput = document.getElementById("ai-search");
  const aiBtn = document.getElementById("ai-go");
  function aiParse() {
    const raw = (aiInput.value || "").trim();
    if (!raw) return null;
    const low = raw.toLowerCase();
    const applied = [];
    const num = (re) => { const m = raw.match(re); return m ? parseInt(m[1].replace(/\./g,""), 10) : null; };
    // rooms
    const rmin = num(/(\d+)\s*(?:zimmer|rooms|zi\b)/) || num(/(\d+)\s*(?:bed|schlaf)/);
    if (rmin && document.getElementById("f-rmin")) { document.getElementById("f-rmin").value = String(Math.min(rmin, 5)); applied.push(rmin + "+ " + (L({en:"en",de:"de"}) === "de" ? "Zimmer" : "rooms")); }
    // price cap
    const cap = num(/(?:under|unter|bis|max(?:\.|imum)?|up to)\s*([\d.,]+)\s*(?:€|eur|euro)?/);
    if (cap && document.getElementById("f-max")) { document.getElementById("f-max").value = cap; applied.push("≤ " + cap.toLocaleString("en-US") + " €"); }
    const floor = num(/(?:over|über|ab|min(?:\.|imum)?|from)\s*([\d.,]+)\s*(?:€|eur|euro)?/);
    if (floor && document.getElementById("f-min")) { document.getElementById("f-min").value = floor; applied.push("≥ " + floor.toLocaleString("en-US") + " €"); }
    // area
    const m2 = num(/(\d+)\s*m(?:²|2)/);
    if (m2 && document.getElementById("f-amin")) { document.getElementById("f-amin").value = m2; applied.push(m2 + " m²"); }
    // features
    [["balcony", /balkon|balcony|terrasse|terrace|loggia/],
     ["garden", /garten|garden/],
     ["elevator", /aufzug|elevator|lift/],
     ["kitchen", /einbauküche|fitted kitchen|küche|kitchen/],
     ["garage", /garage|stellplatz|parking|carport/]].forEach(([f, re]) => {
      if (re.test(low)) {
        const box = document.querySelector(`#f-feats input[value="${f}"]`);
        const chip = document.querySelector(`.qchip[data-qfeat="${f}"]`);
        if (box) box.checked = true;
        if (chip) chip.classList.add("on");
        applied.push(t("feat_" + f));
      }
    });
    // buy/rent
    if (/\bmiete|rent|mieten|rented\b/.test(low) && document.getElementById("f-status")) { document.getElementById("f-status").value = "rent"; applied.push(t("f_forrent")); }
    if (/\bkauf|buy|kaufen\b/.test(low) && document.getElementById("f-status")) { document.getElementById("f-status").value = "sale"; applied.push(t("f_forsale")); }
    // place: longest matching city/state/district
    let bestPlace = null, bestLen = 0;
    const lown = norm(raw);
    for (const c of CITIES) for (const nm of [c.en, c.de]) {
      if (norm(nm).length > bestLen && lown.includes(norm(nm))) { bestPlace = { kind: "city", label: c }; bestLen = nm.length; }
    }
    for (const st of STATES) for (const nm of [st.en, st.de]) {
      if (norm(nm).length > bestLen && lown.includes(norm(nm))) { bestPlace = { kind: "state", label: st }; bestLen = nm.length; }
    }
    for (const d of DISTRICTS) for (const nm of [d.en, d.de]) {
      if (norm(nm).length > bestLen && lown.includes(norm(nm))) { bestPlace = { kind: "district", label: d }; bestLen = nm.length; }
    }
    if (bestPlace) { pickLoc(bestPlace); applied.push(locq.value); }
    window._shown = 12;
    apply();
    const info = document.getElementById("ai-applied");
    if (info) {
      info.hidden = !applied.length;
      info.innerHTML = applied.length ? t("ai_applied") + ": " + applied.map(a => `<span class="ai-tag">${a}</span>`).join(" ") : "";
    }
    if (advPanel && applied.some(a => a.includes("m²") || a.includes("Zimmer") || a.includes("rooms"))) advPanel.hidden = false;
  }
  if (aiBtn) aiBtn.addEventListener("click", aiParse);
  if (aiInput) aiInput.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); aiParse(); } });

  /* ---- main apply ---- */
  const apply = () => {
    const q = (document.getElementById("f-search")?.value || "").toLowerCase().trim();
    const status = document.getElementById("f-status")?.value || "all";
    const type = document.getElementById("f-type")?.value || "all";
    const min = parseInt(document.getElementById("f-min")?.value, 10) || 0;
    const max = parseInt(document.getElementById("f-max")?.value, 10) || Infinity;
    const beds = parseInt(document.getElementById("f-beds")?.value, 10) || 0;
    const sort = document.getElementById("f-sort")?.value || "default";
    const amin = parseInt(document.getElementById("f-amin")?.value, 10) || 0;
    const amax = parseInt(document.getElementById("f-amax")?.value, 10) || Infinity;
    const rmin = parseInt(document.getElementById("f-rmin")?.value, 10) || 0;
    const rmax = parseInt(document.getElementById("f-rmax")?.value, 10) || 99;
    const yearMin = parseInt(document.getElementById("f-year")?.value, 10) || 0;
    const eSel = [...document.querySelectorAll("#f-energy .ec-chip.on")].map(c => c.textContent.trim());
    const feats = [...document.querySelectorAll("#f-feats input:checked")].map(i => i.value);
    const favsOnly = document.getElementById("chip-favs")?.classList.contains("on") || false;
    const loc = window._locSel;
    const radius = radiusSel && !radiusSel.hidden ? (parseFloat(radiusSel.value) || 0) : 0;

    let items = PROPERTIES.filter(p => {
      if (status !== "all" && p.status !== status) return false;
      if (type !== "all" && p.type !== type) return false;
      if (p.price < min || p.price > max) return false;
      if (p.beds < beds) return false;
      if (p.sqm < amin || p.sqm > amax) return false;
      if (p.beds + 1 < rmin || (rmax < 99 && p.beds + 1 > rmax)) return false;
      if (yearMin && p.year < yearMin) return false;
      if (eSel.length && !eSel.includes(p.energyClass)) return false;
      for (const f of feats) if (!p.flags || !p.flags[f]) return false;
      if (favsOnly && !FAVS.has(p.id)) return false;
      if (loc) {
        if (loc.kind === "state" && p.state.en !== loc.name) return false;
        if (loc.kind === "city") {
          const sameCity = p.city.en === loc.name || p.city.de === loc.nameDe;
          if (!sameCity) {
            if (radius > 0 && window._haversine(p.lat, p.lng, loc.lat, loc.lng) > radius) return false;
            if (radius === 0) return false;
          }
        }
        if (loc.kind === "district") {
          const sameDistrict = (p.district.en === loc.name) || (p.city.en === loc.name && !p.district.en);
          if (!sameDistrict) {
            if (radius > 0 && window._haversine(p.lat, p.lng, loc.lat, loc.lng) > radius) return false;
            if (radius === 0) return false;
          }
        }
      }
      if (q) {
        const hay = (L(p.title) + " " + L(p.location) + " " + t("type_" + p.type) + " " + L(p.description) + " " + L(p.state) + " " + p.address).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort === "beds") items.sort((a, b) => b.beds - a.beds);

    window._filtered = items;
    drawListings();

    /* location-aware empty state */
    const grid = document.getElementById("listings-grid");
    if (!items.length && loc && grid) {
      const anyInLoc = PROPERTIES.some(p =>
        (loc.kind === "state" && p.state.en === loc.name) ||
        (loc.kind === "city" && (p.city.en === loc.name || p.city.de === loc.nameDe)) ||
        (loc.kind === "district" && p.district.en === loc.name));
      const msgKey = anyInLoc ? "loc_filtered" : "loc_none_here";
      grid.innerHTML = `<div class="empty-state loc-empty">
        <h3>${t(msgKey + "_h", { loc: locq.value })}</h3>
        <p>${t(msgKey + "_p", { loc: locq.value })}</p>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
          ${anyInLoc ? `<button class="btn btn-gold" onclick="clearFilters()">${t("empty_clear")}</button>` : `<a class="btn btn-gold" target="_blank" rel="noopener" href="${tgLink(t("loc_none_here_p", { loc: locq.value }))}">${t("loc_notify")} (Telegram)</a>`}
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${tgLink(t(msgKey + "_p", { loc: locq.value }))}">${t("loc_notify")} (Telegram)</a>
        </div>
      </div>`;
      removeLoadMore(grid);
    }
  };
  window._applyFilters = apply;

  document.querySelectorAll(".filters input, .filters select, #adv-panel input, #adv-panel select").forEach(el => el.addEventListener("input", () => {
    window._shown = 12;
    apply();
  }));
  if (radiusSel) radiusSel.addEventListener("change", () => { window._shown = 12; apply(); });
  const sortSel = document.getElementById("f-sort");
  if (sortSel) sortSel.addEventListener("change", () => { window._shown = 12; apply(); });
  document.getElementById("filter-clear")?.addEventListener("click", clearFilters);

  /* ---- smart empty state for keyword search ---- */
  const origDraw = drawListings;

  // hero search on index page
  const heroForm = document.getElementById("hero-search");
  if (heroForm && !heroForm.dataset.bound) {
    heroForm.dataset.bound = "1";
    heroForm.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("hero-q").value;
      const status = document.getElementById("hero-status").value;
      const url = "properties.html?ai=" + encodeURIComponent(q) + "&status=" + encodeURIComponent(status);
      window.location.href = url;
    });
  }

  /* AI search deep link: properties.html?ai=... */
  const params = new URLSearchParams(window.location.search);
  if (params.has("ai") && aiInput && !window._qApplied) {
    window._qApplied = true;
    aiInput.value = params.get("ai");
    const stParam = params.get("status");
    if (stParam && stParam !== "all") document.getElementById("f-status").value = stParam;
    setTimeout(aiParse, 50);
  } else if ((params.has("q") || params.has("status")) && !window._qApplied) {
    window._qApplied = true;
    const q = params.get("q") || "";
    const s = params.get("status") || "all";
    const search = document.getElementById("f-search");
    const status = document.getElementById("f-status");
    if (search && q) search.value = q;
    if (status && s !== "all") status.value = s;
    apply();
  } else {
    apply();
  }
}

function clearFilters() {
  window._shown = 12;
  document.querySelectorAll(".filters input, #adv-panel input").forEach(el => { el.value = ""; });
  document.querySelectorAll(".filters select, #adv-panel select").forEach(el => { el.value = el.querySelector("option")?.value || "all"; });
  const sort = document.getElementById("f-sort"); if (sort) sort.value = "default";
  document.querySelectorAll("#f-feats input").forEach(i => i.checked = false);
  document.querySelectorAll("#f-energy .ec-chip").forEach(c => c.classList.remove("on"));
  document.querySelectorAll(".qchip").forEach(c => c.classList.remove("on"));
  const locq = document.getElementById("f-locq");
  if (locq) locq.value = "";
  window._locSel = null;
  const radiusSel = document.getElementById("f-radius");
  if (radiusSel) { radiusSel.hidden = true; radiusSel.value = "0"; }
  const aiIn = document.getElementById("ai-search");
  if (aiIn) aiIn.value = "";
  const info = document.getElementById("ai-applied");
  if (info) info.hidden = true;
  window._filtered = PROPERTIES.slice();
  drawListings();
}

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
