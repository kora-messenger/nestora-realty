/* ============================================================
   NESTORA REALTY — PROPERTY DETAIL PAGE (Exposé)
   ============================================================ */

function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const p = PROPERTIES.find(x => x.id === id);
  const grid = document.querySelector(".detail-wrap");
  if (!p) {
    if (grid) grid.innerHTML = `<div class="empty-state" style="margin-top:40px"><h3>404</h3><p>Property not found.</p><a class="btn btn-outline" href="properties.html">${t("detail_back")}</a></div>`;
    return;
  }
  document.title = L(p.title) + " — Nestora Realty";

  const ec = document.getElementById("d-ec");
  if (p.energyClass) { ec.className = "ec ec-" + p.energyClass.replace("+", "p"); ec.textContent = p.energyClass; }
  const badge = document.getElementById("d-badge");
  if (p.badge) { badge.hidden = false; badge.textContent = L(p.badge); }
  const st = document.getElementById("d-status");
  st.className = "m-status " + p.status;
  st.textContent = p.status === "sale" ? t("for_sale") : t("for_rent");

  document.getElementById("d-title").textContent = L(p.title);
  document.getElementById("d-loc").innerHTML =
    `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${p.address}`;
  document.getElementById("d-loc-text").textContent = L(p.description);

  /* price box */
  const priceEl = document.getElementById("d-price");
  const subEl = document.getElementById("d-price-sub");
  const costsEl = document.getElementById("d-costs");
  if (p.status === "rent") {
    priceEl.innerHTML = formatEuro(p.price) + `<span class="d-note">${t("d_rent")}</span>`;
    subEl.innerHTML = t("d_price_m2") + ": " + t("per_m2", { p: fmtPm2(p.price / p.sqm) });
    const total = p.price + (p.utilities || 0) + (p.heating || 0);
    costsEl.innerHTML = `
      <div class="cost-row"><span>${t("d_utilities")}</span><span>+ ${formatEuro(p.utilities || 0)}</span></div>
      <div class="cost-row"><span>${t("d_heating")}</span><span>+ ${formatEuro(p.heating || 0)}</span></div>
      <div class="cost-row total"><span>${t("d_total")}</span><span>${formatEuro(total)}</span></div>
      <div class="cost-row"><span>${t("d_deposit")}</span><span>${formatEuro(p.deposit || 0)}</span></div>`;
  } else {
    priceEl.innerHTML = formatEuro(p.price);
    subEl.innerHTML = t("d_price_m2") + ": " + t("per_m2", { p: fmtPm2(p.price / p.sqm) });
    costsEl.innerHTML = "";
  }

  /* facts table */
  const facts = [
    [t("d_type"), t("type_" + p.type)],
    [t("d_rooms"), String(p.beds + 1)],
    [t("d_bedrooms"), String(p.beds)],
    [t("d_baths"), String(p.baths)],
    [t("d_area"), p.sqm.toLocaleString("en-US") + " m²"],
    [t("d_year"), String(p.year)],
    [t("d_energy"), p.energyClass],
    p.floor ? [t("d_floor"), p.floor] : null,
    [t("d_state"), L(p.state)],
    [t("d_pets"), p.pets ? t("d_pets_ok") : t("d_pets_no")],
    [t("d_available"), p.available === "sofort" ? t("d_now") : p.available],
  ].filter(Boolean);
  document.getElementById("d-facts-table").innerHTML =
    facts.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");

  /* description + features */
  document.getElementById("d-desc").textContent = L(p.description);
  document.getElementById("d-feats").innerHTML = L(p.features).map(f => `<li>${f}</li>`).join("");

  /* gallery */
  let gi = 0;
  const img = document.getElementById("d-img");
  const count = document.getElementById("d-count");
  const thumbs = document.getElementById("d-thumbs");
  function draw() {
    img.src = p.gallery[gi];
    count.textContent = (gi + 1) + " / " + p.gallery.length;
    [...thumbs.children].forEach((th, i) => th.classList.toggle("active", i === gi));
  }
  thumbs.innerHTML = p.gallery.map((g, i) => `<img src="${g}" data-i="${i}" alt="">`).join("");
  [...thumbs.children].forEach(th => th.addEventListener("click", () => { gi = parseInt(th.dataset.i, 10); draw(); }));
  document.getElementById("d-prev").addEventListener("click", () => { gi = (gi - 1 + p.gallery.length) % p.gallery.length; draw(); });
  document.getElementById("d-next").addEventListener("click", () => { gi = (gi + 1) % p.gallery.length; draw(); });
  draw();

  /* map (OpenStreetMap embed, no API key) */
  const d = 0.012;
  const map = document.getElementById("d-map");
  map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${p.lng - d}%2C${p.lat - d}%2C${p.lng + d}%2C${p.lat + d}&layer=mapnik&marker=${p.lat}%2C${p.lng}`;

  /* actions */
  const tgMsg = t("d_tg_msg", { title: L(p.title), loc: L(p.location) });
  document.getElementById("d-tg").href = tgLink(tgMsg);
  document.getElementById("d-share").addEventListener("click", () => {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: L(p.title), url }).catch(() => {}); return; }
    navigator.clipboard?.writeText(url);
    const b = document.getElementById("d-share");
    const old = b.textContent; b.textContent = t("d_copied");
    setTimeout(() => b.textContent = old, 1600);
  });
  const favBtn = document.getElementById("d-fav");
  function drawFav() {
    const on = FAVS.has(p.id);
    favBtn.textContent = on ? t("d_fav_done") : t("d_fav");
    favBtn.classList.toggle("btn-gold", on);
    favBtn.classList.toggle("btn-outline", !on);
  }
  favBtn.addEventListener("click", () => {
    if (FAVS.has(p.id)) FAVS.delete(p.id); else FAVS.add(p.id);
    favsSave(); drawFav();
  });
  drawFav();

  /* similar listings: same status + same city/state, else same status, max 3 */
  const same = PROPERTIES.filter(x => x.id !== p.id && x.status === p.status &&
    (x.city.en === p.city.en || x.state.en === p.state.en));
  const pool = same.length >= 3 ? same : PROPERTIES.filter(x => x.id !== p.id && x.status === p.status);
  const sim = pool.slice(0, 3);
  const sg = document.getElementById("d-similar-grid");
  sg.innerHTML = sim.map(cardHtml).join("");
  bindCards(sg);
  initReveal();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".detail-wrap")) renderDetail();
});
