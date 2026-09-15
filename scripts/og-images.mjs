// Regenerates the 1200x630 Open Graph cards in public/images from the hero
// photos, so the share image always matches the site.
//
// Needs playwright-core + a Chromium build; neither is a project dependency.
//   npm i -g playwright-core && npx playwright-core install chromium-headless-shell
//   node scripts/og-images.mjs
// Or point PW_MODULE at an existing playwright-core install and PW_EXE at the
// headless shell executable.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(process.env.PW_MODULE ? resolve(process.env.PW_MODULE, "package.json") : import.meta.url);
const { chromium } = require("playwright-core");

const CARDS = [
  { out: "og-image", photo: "hero-family-2.jpg", title: "AT&T Fiber® 1 Gig", sub: "$50/mo* for 12 months", line: "Free professional install · $200 Reward Card · No annual contract" },
  { out: "og-internet-air", photo: "hero-internet-air-2.jpg", title: "AT&T Internet Air™", sub: "$55/mo* home internet", line: "5G home internet · No annual contract · Set up in minutes" },
  { out: "og-wireless", photo: "hero-wireless-2.jpg", title: "AT&T Wireless", sub: "Phones from $0/mo*", line: "America's most reliable 5G network · Trade-in offers" },
  { out: "og-business", photo: "hero-business.jpg", title: "AT&T Business", sub: "Fiber up to 5 GIGs", line: "99.9% uptime SLA · Wireless for your team · Managed security" },
];

const img = (f) => `data:image/${f.endsWith(".png") ? "png" : "jpeg"};base64,${readFileSync(`public/images/${f}`).toString("base64")}`;
const html = (c) => `<!doctype html><style>
body{margin:0;width:1200px;height:630px;position:relative;overflow:hidden;font-family:Arial,Helvetica,sans-serif;background:#0b1b2b}
img.p{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% center;transform:scale(1.25);transform-origin:0% 30%}
.s{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,20,33,.9) 0%,rgba(8,20,33,.78) 50%,rgba(8,20,33,.3) 100%)}
svg{position:absolute;left:0;bottom:0;width:600px;height:330px}
.logo{position:absolute;left:64px;top:56px;height:64px}
.t{position:absolute;left:64px;top:190px;color:#fff;font-weight:700;font-size:74px;letter-spacing:-2px}
.u{position:absolute;left:64px;top:295px;color:#fff;font-weight:700;font-size:40px}
.l{position:absolute;left:64px;top:360px;color:rgba(255,255,255,.88);font-size:27px}
</style>
<img class="p" src="${img(c.photo)}"><div class="s"></div>
<svg viewBox="0 0 470 320" preserveAspectRatio="none"><path d="M0 150 C 150 176 258 236 300 320 H0 Z" fill="#007AB5" fill-opacity=".9"/><path d="M0 222 C 118 243 196 280 228 320 H0 Z" fill="#00A0E1"/></svg>
<img class="logo" src="${img("att-preferred-dealer-white.png")}">
<div class="t">${c.title}</div><div class="u">${c.sub}</div><div class="l">${c.line}</div>`;

const browser = await chromium.launch({ executablePath: process.env.PW_EXE });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of CARDS.filter((c) => !process.argv[2] || c.out === process.argv[2])) {
  try { readFileSync(`public/images/${c.photo}`); } catch { console.log(`skip ${c.out}: ${c.photo} missing`); continue; }
  await page.setContent(html(c));
  writeFileSync(`public/images/${c.out}.png`, await page.screenshot({ type: "png" }));
  console.log(`wrote public/images/${c.out}.png`);
}
await browser.close();
