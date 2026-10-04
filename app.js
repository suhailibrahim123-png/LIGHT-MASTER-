"use strict";
const WA = "919544488144";
/* Edit this list to change the catalogue. tier: Good | Better | Best */
const CATALOG = [
  { id: "LM-P01", name: "Prime Series LED Headlight Bulbs", tier: "Good", cat: "Headlight bulb", price: 2800, note: "Direct 1:1 halogen replacement. Compact heatsink fits 99% of OEM dust caps without retrofitting.", unit: "Pair", spec: "70W / 8,000 LM · 6000K white · H4, H7, H11, 9005" },
  { id: "LM-A02", name: "Apex Pro 130W Highway Touring", tier: "Better", cat: "Headlight bulb", price: 4600, note: "German matrix CSP diodes with dual sintered copper heatpipes for highway penetration through rain and darkness.", unit: "Pair", spec: "130W / 18,000 LM · 12k RPM hydraulic cooling · CANBUS zero-error decoder" },
  { id: "LM-H03", name: "Hyperion 3.0-inch Bi-LED Projector", tier: "Best", cat: "Projector", price: 9800, note: "Optical HD glass projector with electromagnetic high/low shutter and 700m laser throw.", unit: "Pair (complete kit)", spec: "160W / 24,000 LM · 3.0-inch optic glass · German E-Mark cutoff" },
  { id: "LM-F04", name: "StormGuard Tri-Color Fog System", tier: "Specialty", cat: "Fog lamp", price: 3400, note: "Switch between 6000K white, 4300K warm all-weather and 3000K deep gold from the standard fog switch.", unit: "Pair", spec: "3-colour switchback · IP68 · 90W / 12,000 LM" },
  { id: "LM-F05", name: "Phantom Bi-LED Fog Projector 3.0-inch", tier: "Specialty", cat: "Fog lamp", price: 6800, note: "Direct bumper projector with built-in high/low solenoids and a wide 160 degree beam spread.", unit: "Pair", spec: "110W / 14,000 LM · IP68 diecast · universal bracket" },
  { id: "LM-D06", name: "Ultra-Matrix Dynamic DRL Strips", tier: "Specialty", cat: "DRL", price: 1950, note: "Flexible waterproof daytime running light with sequential amber turn indicators.", unit: "Pair", spec: "60cm ultra-slim · dynamic startup flow · silicone encapsulated" },
  { id: "LM-I07", name: "Lumina 64-Color Symphony Ambient Kit", tier: "Specialty", cat: "Interior", price: 5500, note: "Optical acrylic light guides with Bluetooth app control, rhythm modes and an OEM finish.", unit: "Complete car set", spec: "18-in-1 master hub · iOS, Android or button · 210 colour modes" },
  { id: "LM-N08", name: "NightStalker 2.5-inch Mini Bi-LED", tier: "Specialty", cat: "Projector", price: 5900, note: "Compact depth and threaded shaft mount for motorcycles and compact sedan headlight housings.", unit: "Pair", spec: "90W / 12,500 LM · threaded shaft (H4/H7) · dual convex lens" },
  { id: "LM-T09", name: "Stealth CANBUS T10 Park and Plate LEDs", tier: "Specialty", cat: "Parking light", price: 650, note: "Zero-error parking lights with 360 degree aluminium heat dispersion and surge resistor protection.", unit: "Pair", spec: "900 LM pair · CANBUS non-polarized ceramic · 60,000-hour life" },
  { id: "LM-I10", name: "ThunderBolt Anti-Hyperflash Turn LEDs", tier: "Specialty", cat: "Indicator", price: 1600, note: "Instant amber flash with built-in load resistors. No harness cutting or splicing.", unit: "Pair", spec: "28W steady load · 2200K amber · micro-turbine cooled" },
  { id: "LM-X11", name: "Titan 24V Commercial Heavy Fleet LED", tier: "Specialty", cat: "Commercial", price: 3800, note: "Built for logistics trucks, buses and heavy equipment with spike protection circuits.", unit: "Pair", spec: "9V-36V wide band · 100W pair · 80V spike arrestor" },
  { id: "LM-S12", name: "SuperNova Laser Spot Auxiliary Pods", tier: "Specialty", cat: "Auxiliary", price: 8200, note: "Pencil-beam auxiliary spotlights reaching 1.2 km for desolate highway and dune driving.", unit: "Pair", spec: "1200+ m range · anodized 6063 alloy · 304 stainless mount" },
  { id: "LM-R13", name: "FrostBite 3000LM Backup Reverse LEDs", tier: "Specialty", cat: "Reverse light", price: 1100, note: "Lights up night reversing and gives backup cameras maximum clarity.", unit: "Pair", spec: "3,000 LM pair · T15 (921), 1156, 7440 · convex projector top" },
  { id: "LM-E14", name: "Heavy Duty Ceramic Relay Wiring Harness", tier: "Specialty", cat: "Electrical", price: 1250, note: "Ceramic sockets with fused 40A relays that protect the factory BCM computer.", unit: "Kit", spec: "14 AWG pure copper · dual 40A weatherproof · heat-resistant ceramic" },
  { id: "LM-G15", name: "GlareShield Ceramic Headlight Renewal Kit", tier: "Specialty", cat: "Lens restoration", price: 2400, note: "Polymer vapor kit that restores yellowed, cloudy polycarbonate lenses to factory clarity.", unit: "Pro kit", spec: "15-20 headlight pairs · anti-UV 9H nano glass · 3+ years clarity" }
];
const inr = n => "₹" + n.toLocaleString("en-IN");
const $ = s => document.querySelector(s);

/* Beam pattern selector */
const stage = $("#stage");
if (stage) document.querySelectorAll("[data-beam]").forEach(b => b.addEventListener("click", () => {
  stage.classList.toggle("on", b.dataset.beam === "led");
  document.querySelectorAll("[data-beam]").forEach(x => x.setAttribute("aria-pressed", x === b));
}));

/* Touch-friendly dropdown */
const dd = $(".dd");
if (dd) {
  dd.querySelector("button").addEventListener("click", e => { e.stopPropagation(); dd.classList.toggle("open"); });
  document.addEventListener("click", () => dd.classList.remove("open"));
}

/* Catalogue grid with tier filter */
const cat = $("#cat");
if (cat) {
  const draw = t => {
    cat.innerHTML = CATALOG.filter(p => t === "All" || p.tier === t).map(p =>
      `<article class="card p"><span class="tag${p.tier === "Good" ? " b" : ""}">${p.tier === "Specialty" ? p.cat : p.tier}</span><h3>${p.name}</h3><p>${p.note}</p><p class="spec">${p.spec}</p><div class="pr"><b>${inr(p.price)} <small>/ ${p.unit}</small></b><a class="btn" href="purchase.html?p=${p.id}">Order</a></div></article>`).join("");
  };
  document.querySelectorAll("[data-tier]").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll("[data-tier]").forEach(x => x.setAttribute("aria-pressed", x === b));
    draw(b.dataset.tier);
  }));
  draw("All");
}

/* WhatsApp hand-off with popup-blocker fallback */
function sendWA(text) {
  const url = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const fb = $("#fb");
  fb.innerHTML = `Your message is ready. If WhatsApp did not open, <a href="${url}" target="_blank" rel="noopener">tap here to send it on WhatsApp</a>.`;
  fb.style.display = "block";
  const w = window.open(url, "_blank", "noopener");
  if (!w) fb.focus();
}

/* Purchase form */
const pf = $("#pf");
if (pf) {
  const sel = $("#variant"), qty = $("#qty"), est = $("#est");
  sel.innerHTML = CATALOG.map(p => `<option value="${p.id}">${p.name} - ${inr(p.price)} / ${p.unit}</option>`).join("");
  const pre = new URLSearchParams(location.search).get("p");
  if (pre) sel.value = pre;
  const calc = () => { const p = CATALOG.find(x => x.id === sel.value); est.textContent = inr(p.price * Math.max(1, +qty.value || 1)); };
  sel.onchange = qty.oninput = calc; calc();
  pf.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(pf), p = CATALOG.find(x => x.id === f.get("variant"));
    sendWA(["*NEW ORDER - LIGHT MASTER AUTOMOTIVE*", "", `Name: ${f.get("name")}`, `Product: ${p.name} [${p.id}] - ${p.tier === "Specialty" ? p.cat : p.tier}`, `Quantity: ${f.get("qty")} x ${p.unit}`, `Estimate: ${est.textContent}`, `Vehicle: ${f.get("vehicle")}`, `Bulb socket: ${f.get("socket")}`, `Delivery address: ${f.get("address")}`, `Contact: ${f.get("phone")}`, `Notes: ${f.get("notes") || "None"}`].join("\n"));
  });
}

/* Warranty form */
const wf = $("#wf");
if (wf) wf.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(wf), id = "LM-W" + Date.now().toString().slice(-7);
  sendWA(["*WARRANTY CLAIM - LIGHT MASTER AUTOMOTIVE*", `Ticket: ${id}`, "", `Invoice / GST ref: ${f.get("invoice")}`, `Purchase date: ${f.get("pdate")}`, `Customer: ${f.get("name")}`, `WhatsApp: ${f.get("phone")}`, `Product: ${f.get("product")}`, `Issue: ${f.get("issue")}`].join("\n"));
});
