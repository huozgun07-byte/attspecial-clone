# Site polish: hero photos, premium-minimal theme, wizard psychology

Date: 2026-09-15. Scope: three independent sub-projects, built in the order
A → C → B. AT&T palette, pill buttons and all copy rules in AGENTS.md stay.

## A. Hero photographs

Replace the three people-hero photos: `public/images/hero-family.jpg`
(homepage + city-page fallback), `hero-internet-air.jpg`, `hero-wireless.jpg`.
City skylines in `public/images/cities/` are untouched.

- Source: Unsplash (free commercial use). 3–4 candidates per hero downloaded
  to `public/images/candidates/<hero>-<n>.jpg`; the owner picks; winners are
  renamed over the originals; the folder is deleted.
- Selection criteria: landscape ≥ 2400px wide, subject in the right third
  (copy sits left), natural home lighting, no staged stock look, face not cut
  at the `object-[68%_center]` crop, legible under the scrim.
- Photos are chosen on quality and composition only.
- No code changes.

## B. Theme — premium minimal

All in `src/app/globals.css` plus small edits to Header, plan cards, page
sections. No new dependencies.

1. Scroll reveal: `animation-timeline: view()` fade-up on sections, wrapped in
   `@supports`. Browsers without support show static content. No JS.
2. Cards: 1px gradient border (cyan→navy at ~20% alpha) via double
   `background` trick; hover `translateY(-2px)` + soft shadow. Highlighted plan
   card gets the gradient border at full strength and a "Most popular" pill.
3. Header: sticky, `backdrop-blur`, bottom hairline.
4. Hero: scrim lightened ~15% (new photos are cleaner); price block larger.
5. Primary button: arrow icon slides 4px on hover; subtle inset highlight.
6. Mobile sticky bottom bar (< lg): "Check availability" (opens wizard) +
   "Call" (`telHref`). Hidden while the wizard is open.
7. Section eyebrows get a small cyan dot; section padding grows slightly.

Explicitly out: bento/glass, animated counters, marquee.

## C. Wizard

Existing six-step flow in `AvailabilityWizard.tsx` stays. Added:

1. Step transitions: direction-aware slide+fade keyframes, triggered by
   `key={step}` remount and a `data-dir` attribute. Tile selection gets a
   check-pop; submit shows a spinner; done panel draws the SVG tick with
   `stroke-dasharray`.
2. "Scan" interstitial after ZIP: ~1.6 s animated ring with three rotating
   lines ("Locating 30301…", "Checking fiber build-out…", "Matching plans…"),
   then auto-advances. Progress bar keeps six segments (scan is not a
   question). Email-step heading becomes: "Plans starting at $50/mo are offered
   near 30301 — a specialist confirms your exact address. Where should we send
   the summary?" Never claims service is available at the address.
3. Personalised contact heading keyed by `timeline`, falling back to
   `customerType`, then the default. Map lives in `wizard-copy.ts`, EN + ES.
4. Loss aversion: contact step label "Last step". If ZIP has been entered and
   the visitor tries to close (X / backdrop / Esc), show a one-time inline
   panel: "Your ZIP is saved — leave a number and we'll call you?" with a phone
   field, "Call me" (files a `partial` lead with phone) and "Leave anyway".
   Second close attempt closes immediately.
5. Answers persist in `sessionStorage` (try/catch) so close→reopen resumes.
6. `prefers-reduced-motion` already zeroes animation globally; the scan step
   advances on `setTimeout` regardless.

## Verification

`npm run build`, `npm run lint`, full flow in Chrome at 400px and desktop,
partial lead visible in the Google Sheet.
