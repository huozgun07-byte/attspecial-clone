<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: attspecial-clone

AT&T Fiber / DIRECTV Preferred Dealer lead-generation site (Next.js 16 App Router,
React 19, Tailwind CSS 4). Deployed on Vercel (`test11-f8b0/attspecial-clone`).
GitHub: `huozgun07-byte/attspecial-clone`.

## Architecture

- `src/lib/site-config.ts` — single source of truth for phone numbers, business
  hours, plans, FAQs, nav items, and `telHref()`. Never hardcode a phone number
  or plan price directly in a page — import from here.
- `src/components/AddressForm.tsx` / `AvailabilityModal.tsx` / `AddressCheckFlow.tsx`
  — shared form components used across the homepage hero, `att-internet-air`,
  `wireless`, and `espanol` pages. Includes an invisible honeypot field
  (`website`) for spam protection.
- `src/lib/api.ts` — `checkAvailability()` and `submitLead()` fetch wrappers
  used by `AddressCheckFlow`.
- `src/lib/rate-limit.ts` — simple in-memory per-IP rate limiter (not shared
  across serverless instances; swap for Upstash Redis if traffic grows).
- `src/app/api/check-availability/route.ts` — simulated availability check
  (no real public AT&T API exists for this). Always returns a plan list.
- `src/app/api/lead/route.ts` — on every real lead (honeypot not triggered),
  fires two things concurrently via `Promise.allSettled`:
  1. **Resend** email notification to `LEAD_NOTIFY_EMAIL` (default
     `okdnmarketing@gmail.com`), from `LEAD_FROM_EMAIL`.
  2. **Google Sheets** logging via a POST to `GOOGLE_SHEET_WEBHOOK_URL` — a
     Google Apps Script Web App deployment. Setup steps documented in
     `GOOGLE_SHEETS_SETUP.md`.

## Required environment variables

See `.env.example`. Set in both `.env.local` (local dev) and the Vercel
project's Environment Variables settings (Production + Preview + Development):

- `RESEND_API_KEY` — secret, from resend.com/api-keys
- `LEAD_NOTIFY_EMAIL` — where lead notifications are sent
- `LEAD_FROM_EMAIL` — sender shown on notification emails
- `GOOGLE_SHEET_WEBHOOK_URL` — secret-ish Apps Script Web App URL

`.env.local` is never committed (gitignored) and cannot be written by remote
file tools for security reasons — always edited by hand on the developer's
own machine.

## Known decisions / gotchas

- **Availability check is simulated** — there's no real public AT&T
  availability API. This is intentional; don't try to wire up a real one
  without discussing it first.
- **Phone number consistency**: verify which number is authoritative
  (866.878.7382 vs 866.307.3525) before changing `site-config.ts` — this was
  deliberately left as an open question.
- **Campaign offer text is evergreen** — reward card offers no longer carry
  hardcoded end dates (they used to, and went stale). Keep new offer copy
  date-free or clearly marked as needing periodic review.
- **No Netlify** — the project deploys to Vercel only. Do not reintroduce
  `netlify.toml` or `@netlify/plugin-nextjs`.
- **Images**: only `att-fiber-logo-whtblue.png`, `att-preferred-dealer.png`,
  `att-reward-card.png`, and `updater-logo.svg` in `public/images/` are
  actually used — sourced from the real attspecial.com site, not AT&T's
  internal "you Refer" employee-referral brand kit (that kit requires Legal
  approval and isn't for public-facing use).
