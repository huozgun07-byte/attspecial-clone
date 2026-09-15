# Site Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three people-hero photos, make the availability wizard feel alive and harder to abandon, and move the visual language to "premium minimal" while keeping the AT&T palette.

**Architecture:** Photos are file swaps only. Wizard work stays inside `AvailabilityWizard.tsx` + `wizard-copy.ts` (one pure helper gets a `node --test` check). Theme work is CSS-first in `globals.css` (native scroll-driven animations, gradient borders) plus one new `MobileCtaBar` client component.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Node 24 (`node --test` runs `.mjs` that imports `.ts` via type stripping). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-15-site-polish-design.md`

## Global Constraints

- Never claim service IS available at the visitor's address (AGENTS.md). Allowed: "offered near <ZIP>", "a specialist confirms your exact address".
- Phone numbers, plans, copy come from `src/lib/site-config.ts` / `src/lib/wizard-copy.ts` — never hardcode in components.
- AT&T palette tokens in `globals.css @theme` and pill buttons stay unchanged.
- No new npm dependencies. No Netlify.
- `prefers-reduced-motion` must disable every new animation (global rule exists; scroll-driven animations need an explicit override).
- Photo selection is on quality and composition only.
- Every task ends with `npm run build` passing (it type-checks and lints).

---

## Part A — Hero photos

### Task 1: Download candidates, owner picks, swap files

**Files:**
- Create (temporary): `public/images/candidates/family-{1..4}.jpg`, `air-{1..4}.jpg`, `wireless-{1..4}.jpg`
- Replace: `public/images/hero-family.jpg`, `public/images/hero-internet-air.jpg`, `public/images/hero-wireless.jpg`

**Interfaces:** none (file names unchanged; `src/app/page.tsx:40`, `att-internet-air/page.tsx:44`, `wireless/page.tsx:20`, `cities.ts:528` keep working).

- [ ] **Step 1: Find candidates on Unsplash with Chrome**

Load the Chrome tools (one ToolSearch call), open `https://unsplash.com/s/photos/<query>?orientation=landscape` for each query, note 3–4 photo IDs (the last segment of `unsplash.com/photos/<slug>-<id>`):

| Hero | Queries | Must show |
|---|---|---|
| family | `family laptop couch living room`, `family tablet sofa` | 2+ people, home interior, subject right of centre |
| air | `woman laptop home window`, `remote work living room` | one person relaxed with a device, bright room |
| wireless | `couple smartphone home`, `friends phone sofa` | phone in hand, faces visible, warm light |

Reject: black-and-white, heavy grain, busy backgrounds behind where the headline sits (left 55%), faces within the left 30% (they fall under the scrim), portrait orientation.

- [ ] **Step 2: Download at 2400px**

```bash
cd public/images && mkdir -p candidates && cd candidates
# repeat per id; the /download endpoint needs no API key and redirects to the CDN
curl -L "https://unsplash.com/photos/<ID>/download?w=2400&force=true" -o family-1.jpg
```

Verify size: `file *.jpg` must report width ≥ 2400 (or ≥ 2000 if the original is smaller — then reject).

- [ ] **Step 3: Preview each candidate cropped like the hero**

Read every candidate image (the Read tool renders it). Mentally overlay: headline column = left 55%, availability card = right 32% on desktop. The subject must sit in the right third and not be hidden by the card at `lg` widths. Drop any that fail; keep ≥ 2 per hero.

- [ ] **Step 4: Owner picks**

Send the survivors to the owner (paths + one line each: what's in frame, why it fits). Wait for the pick — do not choose for them.

- [ ] **Step 5: Swap and clean up**

```bash
cp public/images/candidates/family-2.jpg public/images/hero-family.jpg   # use picked numbers
cp public/images/candidates/air-1.jpg    public/images/hero-internet-air.jpg
cp public/images/candidates/wireless-3.jpg public/images/hero-wireless.jpg
rm -r public/images/candidates
```

- [ ] **Step 6: Check crop positions in the browser**

`npm run dev`, open `/`, `/att-internet-air`, `/wireless` at 1280px and 400px. If a face is cut, adjust only the `object-[N%_center]` class on that page (`page.tsx:45`, `att-internet-air/page.tsx:44`, `wireless/page.tsx:20`).

- [ ] **Step 7: Commit**

```bash
git add public/images/hero-*.jpg src/app
git commit -m "Replace hero photography with higher-quality Unsplash images"
```

---

## Part C — Wizard

### Task 2: Copy additions + `contactQuestion` helper with a runnable check

**Files:**
- Modify: `src/lib/wizard-copy.ts`
- Create: `scripts/wizard-copy.test.mjs`

**Interfaces:**
- Produces: `WizardCopy.lastStep: string`; `WizardCopy.scan: { lines: string[] }`; `WizardCopy.email.questionNearZip: (zip: string, fromPrice: string) => string`; `WizardCopy.contact.personalized: { timeline: Record<string,string>; customerType: Record<string,string> }`; `WizardCopy.exit: { title: string; help: string; callMe: string; leave: string }`; `export function contactQuestion(copy: WizardCopy, answers: { timeline: string; customerType: string }): string`.

- [ ] **Step 1: Write the failing check**

`scripts/wizard-copy.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { wizardCopyEn, wizardCopyEs, contactQuestion } from "../src/lib/wizard-copy.ts";

test("timeline wins over customerType", () => {
  const q = contactQuestion(wizardCopyEn, { timeline: "asap", customerType: "existing" });
  assert.equal(q, wizardCopyEn.contact.personalized.timeline.asap);
});

test("falls back to customerType, then default", () => {
  assert.equal(
    contactQuestion(wizardCopyEn, { timeline: "researching", customerType: "existing" }),
    wizardCopyEn.contact.personalized.customerType.existing
  );
  assert.equal(
    contactQuestion(wizardCopyEn, { timeline: "", customerType: "" }),
    wizardCopyEn.contact.question
  );
});

test("no copy claims availability at the address", () => {
  for (const copy of [wizardCopyEn, wizardCopyEs]) {
    const text = JSON.stringify(copy, (_k, v) => (typeof v === "function" ? v("30301", "$50") : v)).toLowerCase();
    assert.doesNotMatch(text, /available at your address|disponible en tu direcci/);
  }
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test scripts/`
Expected: FAIL — `contactQuestion` is not exported.

- [ ] **Step 3: Add the copy and helper**

In the `WizardCopy` interface add:
```ts
  /** Replaces the "Step N of N" label on the final question. */
  lastStep: string;
  /** Rotating lines shown during the short "scan" beat after the ZIP. */
  scan: { lines: string[] };
```
Inside `email` add `questionNearZip: (zip: string, fromPrice: string) => string;`.
Inside `contact` add:
```ts
    /** Heading overrides keyed by the visitor's earlier answers. */
    personalized: { timeline: Record<string, string>; customerType: Record<string, string> };
```
After `result` add:
```ts
  /** One-time prompt when the visitor tries to close after entering a ZIP. */
  exit: { title: string; help: string; callMe: string; leave: string };
```

EN values (place each next to its section):
```ts
  lastStep: "Last step",
  scan: { lines: ["Locating {zip}…", "Checking fiber build-out…", "Matching plans…"] },
  // email:
    questionNearZip: (zip, fromPrice) =>
      `Plans from ${fromPrice}/mo are offered near ${zip} — a specialist confirms your exact address. Where should we send the summary?`,
  // contact:
    personalized: {
      timeline: {
        asap: "Last step — we'll call within the hour. Who are we calling?",
        week: "Last step — we'll schedule installation this week. Who are we calling?",
        month: "Last step — we'll lock in today's price for your move-in. Who are we calling?",
      },
      customerType: {
        existing: "Last step — we'll check upgrade pricing on your account. Who are we calling?",
      },
    },
  exit: {
    title: "Your ZIP is saved — want us to call you?",
    help: "Leave a number and a specialist calls to confirm plans for your address. No obligation.",
    callMe: "Call me",
    leave: "Leave anyway",
  },
```
ES values:
```ts
  lastStep: "Último paso",
  scan: { lines: ["Ubicando {zip}…", "Revisando cobertura de fibra…", "Buscando planes…"] },
    questionNearZip: (zip, fromPrice) =>
      `Hay planes desde ${fromPrice}/mes cerca de ${zip} — un especialista confirma tu dirección exacta. ¿A dónde te enviamos el resumen?`,
    personalized: {
      timeline: {
        asap: "Último paso — te llamamos dentro de una hora. ¿A quién llamamos?",
        week: "Último paso — agendamos la instalación esta semana. ¿A quién llamamos?",
        month: "Último paso — aseguramos el precio de hoy para tu mudanza. ¿A quién llamamos?",
      },
      customerType: {
        existing: "Último paso — revisamos precios de mejora en tu cuenta. ¿A quién llamamos?",
      },
    },
  exit: {
    title: "Tu código postal quedó guardado — ¿te llamamos?",
    help: "Déjanos un número y un especialista te llama para confirmar planes en tu dirección. Sin compromiso.",
    callMe: "Llámenme",
    leave: "Salir de todos modos",
  },
```
At the bottom of the file:
```ts
/** Final-step heading, personalised by the earliest answer that has an override. */
export function contactQuestion(
  copy: WizardCopy,
  answers: { timeline: string; customerType: string }
): string {
  return (
    copy.contact.personalized.timeline[answers.timeline] ??
    copy.contact.personalized.customerType[answers.customerType] ??
    copy.contact.question
  );
}
```

- [ ] **Step 4: Run check + build**

Run: `node --test scripts/ && npm run build`
Expected: 3 tests pass; build green (the interface change forces both copy objects to be complete).

- [ ] **Step 5: Commit**

```bash
git add src/lib/wizard-copy.ts scripts/wizard-copy.test.mjs
git commit -m "Wizard copy: personalised headings, scan lines, exit prompt, runnable check"
```

### Task 3: Persist answers in sessionStorage

**Files:**
- Modify: `src/components/AvailabilityWizard.tsx` (state init ~line 98, `restart` ~line 253)

**Interfaces:**
- Produces: `answers`, `stepIndex`, `partialSentRef.current` survive close→reopen within the tab.

- [ ] **Step 1: Add storage helpers above the component**

```ts
const STORAGE_KEY = "att-wizard";
interface Saved { answers: Answers; stepIndex: number; partialSent: boolean }

// sessionStorage can throw (private mode, blocked storage) — treat as absent.
function loadSaved(): Saved | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch { return null; }
}
function save(data: Saved | null) {
  try {
    if (data) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}
```

- [ ] **Step 2: Initialise from storage**

Replace the `stepIndex` / `answers` / `partialSentRef` initialisers:
```ts
  const saved = useRef(loadSaved()).current;
  const [stepIndex, setStepIndex] = useState(saved?.stepIndex ?? 0);
  const [answers, setAnswers] = useState<Answers>(() => ({
    ...emptyAnswers,
    ...saved?.answers,
    zip: initialZip || saved?.answers.zip || "",
  }));
  const partialSentRef = useRef(saved?.partialSent ?? false);
```
(`useRef(loadSaved())` runs on the client only — the wizard is mounted by a click, never during SSR.)

- [ ] **Step 3: Save on change, clear on finish**

```ts
  useEffect(() => {
    if (!done) save({ answers, stepIndex, partialSent: partialSentRef.current });
  }, [answers, stepIndex, done]);
```
In `submitContact` after `setDone(true)` add `save(null);`. In `restart` add `save(null);` first.

- [ ] **Step 4: Verify in browser**

`npm run dev` → open wizard, answer two questions, close, reopen: lands on question 3 with selections kept. Finish the flow, reopen: starts fresh.

- [ ] **Step 5: Build + commit**

```bash
npm run build
git add src/components/AvailabilityWizard.tsx
git commit -m "Wizard: resume where the visitor left off within the session"
```

### Task 4: Motion — step transitions, tile pop, spinner, tick

**Files:**
- Modify: `src/app/globals.css` (append after the utilities block)
- Modify: `src/components/AvailabilityWizard.tsx`

**Interfaces:**
- Produces: CSS classes `.wizard-step[data-dir]`, `.animate-pop`, `.spinner`, `.tick-draw`, `.pulse-ring`; state `dir: "fwd" | "back"`.

- [ ] **Step 1: CSS**

Append to `globals.css` (outside layers, after the utilities block):
```css
/* ---- Wizard motion ---- */
@keyframes wizard-in-fwd  { from { opacity: 0; transform: translateX(24px); }  to { opacity: 1; transform: none; } }
@keyframes wizard-in-back { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: none; } }
@keyframes pop  { from { transform: scale(.4); opacity: 0; } 60% { transform: scale(1.15); } to { transform: scale(1); opacity: 1; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes pulse-ring { 0% { transform: scale(.8); opacity: .8; } 100% { transform: scale(1.6); opacity: 0; } }

.wizard-step { animation: wizard-in-fwd .28s cubic-bezier(.2,.7,.2,1) both; }
.wizard-step[data-dir="back"] { animation-name: wizard-in-back; }
.animate-pop { animation: pop .25s cubic-bezier(.2,.7,.2,1) both; }
.spinner {
  width: 18px; height: 18px; border-radius: 9999px;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: spin .7s linear infinite;
}
.tick-draw { stroke-dasharray: 24; stroke-dashoffset: 24; animation: draw .45s .15s ease-out forwards; }
.pulse-ring { animation: pulse-ring 1.2s ease-out infinite; }
```

- [ ] **Step 2: Direction state and wrapper**

In the component add `const [dir, setDir] = useState<"fwd" | "back">("fwd");`. In `goBack` add `setDir("back")`; in `advance` add `setDir("fwd")`.
Wrap the non-done body: replace the `<>` … `</>` fragment inside `{done ? … : (` with
```tsx
<div key={step} data-dir={dir} className="wizard-step">
  …existing step markup…
</div>
```
`key={step}` remounts the wrapper each step so the animation replays.

- [ ] **Step 3: Tile / choice pop**

In `TileStep`, inside the button after the icon span, add:
```tsx
{selected && (
  <span className="animate-pop absolute top-2 right-2 w-5 h-5 rounded-full bg-att-navy text-white flex items-center justify-center" aria-hidden="true">
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  </span>
)}
```
and add `relative` to that button's className. In `ChoiceStep` add `animate-pop` to the inner selected dot: `{selected && <span className="animate-pop w-2.5 h-2.5 rounded-full bg-att-navy" />}`.

- [ ] **Step 4: Spinner on submit**

Replace the contact submit button's label:
```tsx
{busy ? <><span className="spinner" aria-hidden="true" />{copy.contact.submitting}</> : copy.contact.submit}
```

- [ ] **Step 5: Tick draw on the done panel**

In `DonePanel` change the check `<path>` to `<path className="tick-draw" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />` and add `animate-pop` to the circle span's className.

- [ ] **Step 6: Verify**

Browser: steps slide in from the right going forward, from the left on Back; selected tile shows the pop badge; submit shows a spinner; done panel draws the tick. Toggle "Emulate prefers-reduced-motion" in DevTools → everything appears instantly.

- [ ] **Step 7: Build + commit**

```bash
npm run build
git add src/app/globals.css src/components/AvailabilityWizard.tsx
git commit -m "Wizard: step transitions, selection pop, submit spinner, tick draw"
```

### Task 5: Scan interstitial + ZIP-aware email heading + "Last step" label

**Files:**
- Modify: `src/components/AvailabilityWizard.tsx`

**Interfaces:**
- Consumes: `copy.scan.lines`, `copy.email.questionNearZip`, `copy.lastStep`, `contactQuestion` (Task 2); `plans[0].price` from `site-config`.
- Produces: `STEP_IDS` now includes `"scan"`; `QUESTION_STEPS` drives the progress bar.

- [ ] **Step 1: Step list**

```ts
const STEP_IDS = ["service", "customer", "timeline", "zip", "scan", "email", "contact"] as const;
type StepId = (typeof STEP_IDS)[number];
/** The scan is a beat, not a question — it gets no progress segment. */
const QUESTION_STEPS = STEP_IDS.filter((s) => s !== "scan");
const TOTAL_STEPS = STEP_IDS.length;
```
Add `contactQuestion` to the existing `@/lib/wizard-copy` import.

- [ ] **Step 2: Progress + label**

Inside the component:
```ts
  const questionNumber = STEP_IDS.slice(0, stepIndex + 1).filter((s) => s !== "scan").length;
  const stepLabel = done ? copy.doneLabel : step === "contact" ? copy.lastStep : copy.stepOf(questionNumber, QUESTION_STEPS.length);
```
Use `{stepLabel}` for the header span. Progress bar: `aria-valuemax={QUESTION_STEPS.length}`, `aria-valuenow={done ? QUESTION_STEPS.length : questionNumber}`, and map `QUESTION_STEPS` with `done || i < questionNumber ? "bg-att-cyan" : "bg-att-gray-150"`.

- [ ] **Step 3: Back skips the scan; tracking skips the scan**

```ts
  const goBack = () => {
    setError(null);
    setDir("back");
    setStepIndex((i) => (STEP_IDS[i - 1] === "scan" ? i - 2 : Math.max(0, i - 1)));
  };
```
Tracking effect: `if (!done && step !== "scan") trackWizardStep(questionNumber, step);`.
Restored `stepIndex` from Task 3 may point at the scan: change the initialiser to
```ts
  const savedIndex = saved?.stepIndex ?? 0;
  const [stepIndex, setStepIndex] = useState(STEP_IDS[savedIndex] === "scan" ? savedIndex - 1 : savedIndex);
```

- [ ] **Step 4: ScanStep component**

Add at the bottom of the file:
```tsx
/** 1.6 s beat after the ZIP: nothing is checked here, it only paces the flow. */
function ScanStep({ lines, zip, onDone }: { lines: string[]; zip: string; onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const cycle = window.setInterval(() => setI((n) => Math.min(n + 1, lines.length - 1)), 520);
    const finish = window.setTimeout(onDone, 1600);
    return () => { window.clearInterval(cycle); window.clearTimeout(finish); };
  }, [lines.length, onDone]);
  return (
    <div className="py-10 text-center" role="status" aria-live="polite">
      <span className="relative mx-auto mb-6 flex w-16 h-16 items-center justify-center" aria-hidden="true">
        <span className="pulse-ring absolute inset-0 rounded-full bg-att-cyan/40" />
        <span className="relative w-10 h-10 rounded-full bg-att-navy text-white flex items-center justify-center">
          <span className="spinner" />
        </span>
      </span>
      <p className="font-bold text-att-ink text-lg">{lines[i].replace("{zip}", zip)}</p>
    </div>
  );
}
```
Render it: `{step === "scan" && <ScanStep lines={copy.scan.lines} zip={answers.zip} onDone={advance} />}`. Make `advance` stable: `const advance = useCallback(() => { setError(null); setDir("fwd"); setStepIndex((i) => Math.min(TOTAL_STEPS - 1, i + 1)); }, []);` (add `useCallback` to the react import). Footer: the Next buttons are already keyed to `"zip"` / `"email"` / `"contact"`; hide Back on the scan: change `{stepIndex > 0 && (` to `{stepIndex > 0 && step !== "scan" && (`.

- [ ] **Step 5: Email + contact headings**

Email step: `question={copy.email.questionNearZip(answers.zip, plans[0].price)}` (`plans` is already imported).
Contact step: `question={contactQuestion(copy, answers)}`.

- [ ] **Step 6: Verify**

Browser: after ZIP → ring + three lines → email step heading mentions the ZIP and `$35`; Back from email returns to ZIP (not the scan); progress shows 6 segments, contact label reads "Last step". Pick "As soon as possible" earlier → contact heading is the asap line. ES on `/espanol`.

- [ ] **Step 7: Build + commit**

```bash
npm run build
git add src/components/AvailabilityWizard.tsx
git commit -m "Wizard: scan beat after ZIP, ZIP-aware and personalised headings"
```

### Task 6: One-time exit prompt after the ZIP

**Files:**
- Modify: `src/components/AvailabilityWizard.tsx`

**Interfaces:**
- Consumes: `copy.exit`, `copy.contact.errorPhone`, `submitLead` with `stage: "partial"` + `phone`.
- Produces: `requestClose()` used by X, backdrop and Escape.

- [ ] **Step 1: State and gate**

```ts
  const [exitPrompt, setExitPrompt] = useState(false);
  const exitShownRef = useRef(false);

  // First close attempt after a ZIP gets one ask for a number; the second closes.
  const requestClose = useCallback(() => {
    const hasZip = digitsOnly(answers.zip).length === 5;
    const hasPhone = digitsOnly(answers.phone).length === 10;
    if (hasZip && !hasPhone && !done && !exitShownRef.current) {
      exitShownRef.current = true;
      setExitPrompt(true);
      return;
    }
    onClose();
  }, [answers.zip, answers.phone, done, onClose]);
```
Replace `onClose` with `requestClose` in: the Escape listener (and its dependency array), the backdrop `onClick`, the header X button.

- [ ] **Step 2: Submit from the prompt**

```ts
  const submitExitPhone = async () => {
    if (digitsOnly(answers.phone).length !== 10) { setError(copy.contact.errorPhone); return; }
    setBusy(true); setError(null);
    try {
      await submitLead({
        zip: answers.zip, source: `${source}-exit`, website: answers.website, stage: "partial",
        phone: digitsOnly(answers.phone), email: answers.email,
        service: answers.service, customerType: answers.customerType, timeline: answers.timeline,
      });
      trackQualifiedLead({ source, zip: answers.zip });
      save(null);
      setExitPrompt(false);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : copy.genericError);
    } finally { setBusy(false); }
  };
```

- [ ] **Step 3: Panel markup**

In the body, turn the `done ?` ternary into a three-way: prompt first.
```tsx
{exitPrompt && !done ? (
  <form onSubmit={(e) => { e.preventDefault(); submitExitPhone(); }} noValidate className="wizard-step">
    <StepHeading headingRef={headingRef} question={copy.exit.title} help={copy.exit.help} />
    <label htmlFor="wizard-exit-phone" className="label-text">{copy.contact.phone}</label>
    <input id="wizard-exit-phone" type="tel" inputMode="tel" className="input-field" autoComplete="tel" autoFocus
      placeholder={copy.contact.phonePlaceholder} value={answers.phone}
      onChange={(e) => set("phone", formatPhone(e.target.value))} disabled={busy} />
    <p className="att-fine text-att-gray-500 mt-3">{copy.contact.consent}</p>
    {error && <p className="mt-4 text-sm text-red-700 font-medium" role="alert">{error}</p>}
    <div className="flex items-center gap-3 mt-5">
      <button type="submit" className="btn-primary flex-1 disabled:opacity-60" disabled={busy}>
        {busy ? <><span className="spinner" aria-hidden="true" />{copy.contact.submitting}</> : copy.exit.callMe}
      </button>
      <button type="button" onClick={onClose} className="text-sm font-bold text-att-navy underline underline-offset-2">
        {copy.exit.leave}
      </button>
    </div>
  </form>
) : done ? ( …existing DonePanel… ) : ( …existing steps… )}
```
Hide the normal footer while the prompt shows: `{!done && !exitPrompt && (`.

- [ ] **Step 4: Verify**

Browser: enter ZIP, press Escape → prompt appears; Escape again → closes. Reopen, enter ZIP, click X → prompt; enter a phone, "Call me" → done panel; the Google Sheet shows a `partial` row with the phone and source `home-hero-exit`. Enter ZIP, prompt, "Leave anyway" → closes.

- [ ] **Step 5: Build + commit**

```bash
npm run build
git add src/components/AvailabilityWizard.tsx
git commit -m "Wizard: one-time call-back prompt when leaving after the ZIP"
```

---

## Part B — Theme

### Task 7: CSS — reveal, gradient card borders, header blur, button polish, eyebrow dot, lighter scrim

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Header.tsx:14`
- Modify: `src/components/AvailabilityCard.tsx:52-54`

- [ ] **Step 1: Scroll reveal (native, no JS)**

Append to `globals.css` after the wizard motion block:
```css
/* ---- Scroll reveal: browsers without scroll-driven animations show static content ---- */
@keyframes reveal-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
}
```
In the existing `@media (prefers-reduced-motion: reduce)` block add `.reveal { animation: none; }` (the duration override does not stop timeline-driven animations).

- [ ] **Step 2: Cards**

Replace the `.plan-card` and `.plan-card-highlighted` rules:
```css
  .plan-card {
    @apply bg-white overflow-hidden flex flex-col h-full;
    border-radius: var(--radius-att);
    border: 1px solid transparent;
    background:
      linear-gradient(#fff, #fff) padding-box,
      linear-gradient(135deg, rgba(0,159,219,.45), rgba(0,56,143,.18)) border-box;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .plan-card:hover { transform: translateY(-2px); box-shadow: 0 14px 32px -14px rgba(0,56,143,.28); }
  .plan-card-highlighted {
    background:
      linear-gradient(#fff, #fff) padding-box,
      linear-gradient(135deg, #009FDB, #00388F) border-box;
    box-shadow: 0 10px 28px -12px rgba(0,56,143,.35);
  }
```
Give `.surface-card` the same lift: add `transition: transform .2s ease, box-shadow .2s ease;` and `.surface-card:hover { transform: translateY(-2px); box-shadow: 0 14px 32px -14px rgba(0,56,143,.2); }`. Leave `.att-hero-card` alone (it is a form, not a card to hover).

- [ ] **Step 3: Buttons, eyebrow, scrim**

```css
  .btn-primary { @apply bg-att-navy text-white hover:bg-att-navy-dark; box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
  .btn-primary .btn-arrow { transition: transform .2s ease; }
  .btn-primary:hover .btn-arrow { transform: translateX(4px); }
  .att-eyebrow { @apply text-base font-medium inline-flex items-center gap-2; }
  .att-eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 9999px; background: var(--color-att-cyan); }
```
Scrim: change the desktop stops to `.86 / .72 / .36 / .18` and the mobile stops to `.82 / .66 / .56`.
Section rhythm: `.att-section { @apply py-16 sm:py-20 lg:py-24; }`.
Hero price (`src/app/page.tsx:70`): `text-5xl sm:text-6xl` → `text-6xl sm:text-7xl`.

In `AvailabilityCard.tsx` the CTA becomes:
```tsx
<WizardButton source={source} zip={zip} lang={lang} className="btn-primary w-full">
  {cta}
  <svg className="btn-arrow w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
</WizardButton>
```

- [ ] **Step 4: Header**

`Header.tsx:14`: `<header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">`.

- [ ] **Step 5: Verify + build + commit**

Browser at 1280px: plan cards show a faint gradient edge, the highlighted card a strong one; hover lifts; header blurs content scrolling under it; eyebrows on `/att-fiber`, `/wireless` show the dot; hero copy still legible on all three heroes.
```bash
npm run build
git add src/app/globals.css src/app/page.tsx src/components/Header.tsx src/components/AvailabilityCard.tsx
git commit -m "Theme: gradient card borders, header blur, button arrow, eyebrow dot, lighter scrim"
```

### Task 8: Mobile sticky CTA bar

**Files:**
- Create: `src/components/MobileCtaBar.tsx`
- Modify: `src/app/layout.tsx:103` (inside `WizardProvider`), `src/app/globals.css` (body padding)

**Interfaces:**
- Consumes: `useWizard()` (`openWizard`, `isOpen`), `phoneNumber`, `telHref`, `trackCall`.

- [ ] **Step 1: Component**

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useWizard } from "./WizardProvider";
import { phoneNumber, telHref } from "@/lib/site-config";
import { trackCall } from "@/lib/tracking";

/** Two thumb-reach actions pinned to the bottom of every page below `lg`. */
export default function MobileCtaBar() {
  const { openWizard, isOpen } = useWizard();
  const es = usePathname() === "/espanol";
  if (isOpen) return null;
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-md border-t border-att-gray-200 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => openWizard({ source: "mobile-bar", lang: es ? "es" : "en" })}
          className="btn-primary flex-1"
        >
          {es ? "Verificar disponibilidad" : "Check availability"}
        </button>
        <a href={telHref(phoneNumber)} onClick={() => trackCall(phoneNumber)} className="btn-outline shrink-0" aria-label={`Call ${phoneNumber}`}>
          {es ? "Llamar" : "Call"}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Mount + reserve space**

`layout.tsx`: `<WizardProvider>{children}<MobileCtaBar /></WizardProvider>` with the import.
`globals.css` in `@layer base`: `@media (max-width: 1023px) { body { padding-bottom: calc(76px + env(safe-area-inset-bottom)); } }`.

- [ ] **Step 3: Verify**

Browser at 400px: bar visible on `/`, `/faq`, `/espanol` (Spanish labels); footer fully reachable above it; opening the wizard hides the bar; at 1280px no bar and no bottom padding.

- [ ] **Step 4: Build + commit**

```bash
npm run build
git add src/components/MobileCtaBar.tsx src/app/layout.tsx src/app/globals.css
git commit -m "Add mobile sticky availability/call bar"
```

### Task 9: Apply `.reveal` to sections

**Files:**
- Modify: `src/app/page.tsx` (every `<section>` after the hero), `src/app/why-fiber/page.tsx`, `src/app/att-fiber/page.tsx`, `src/app/att-fiber/[slug]/page.tsx`, `src/app/att-internet-air/page.tsx`, `src/app/wireless/page.tsx`

- [ ] **Step 1: Add the class**

For each non-hero `<section className="att-section …">` prepend `reveal `. Never on a hero section (LCP element; must render immediately). One-liner:
```bash
sed -i 's/<section className="att-section /<section className="reveal att-section /g' src/app/page.tsx src/app/why-fiber/page.tsx src/app/att-fiber/page.tsx "src/app/att-fiber/[slug]/page.tsx" src/app/att-internet-air/page.tsx src/app/wireless/page.tsx
```
Then hand-add `reveal ` to the homepage reward section (`page.tsx:102`, `className="reveal att-container pb-14 sm:pb-16"`). Check with `git diff` that no hero section (`aria-labelledby="hero-title"`) changed.

- [ ] **Step 2: Verify**

Chrome at 1280px: sections fade up as they enter; reload mid-page: sections already in view are fully visible (no stuck-invisible content). DevTools reduced-motion: static. If Firefox is available: static and visible.

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/app
git commit -m "Theme: scroll reveal on content sections"
```

### Task 10: Final verification + docs

- [ ] **Step 1: Full pass**

`npm run lint && node --test scripts/ && npm run build`. Chrome walkthrough at 400px and 1280px of `/`, `/att-fiber/atlanta-ga`, `/espanol`: wizard end-to-end including exit prompt; confirm a `partial` and a `complete` row in the Google Sheet.

- [ ] **Step 2: AGENTS.md**

Under "Architecture" replace the stale `AddressForm.tsx / AvailabilityModal.tsx / AddressCheckFlow.tsx` bullet with:
```
- `src/components/AvailabilityWizard.tsx` + `src/lib/wizard-copy.ts` — the step-by-step
  lead wizard (mounted once by `WizardProvider`, opened via `WizardButton` / `useWizard`).
  Answers persist in `sessionStorage` for the tab. `scripts/wizard-copy.test.mjs`
  (`node --test scripts/`) guards the personalised-heading helper and the "never claim
  availability at the address" copy rule.
- `src/components/MobileCtaBar.tsx` — sticky bottom bar below `lg`; body gets matching
  bottom padding in `globals.css`.
```
Under "Known decisions" add: `- **Scroll reveal is CSS-only** (`animation-timeline: view()`); don't add a JS IntersectionObserver for it.` Update the Images bullet to list the three `hero-*.jpg` files and `cities/*.jpg` as used.

- [ ] **Step 3: Commit + push**

```bash
git add AGENTS.md
git commit -m "Docs: wizard, mobile bar, reveal decisions"
git push
```
