"use client";

import { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import { submitLead, ApiError } from "@/lib/api";
import { trackLead, trackQualifiedLead, trackWizardStep, trackCall } from "@/lib/tracking";
import { phoneNumber, telHref, plans } from "@/lib/site-config";
import { WizardCopy, wizardCopyEn, contactQuestion } from "@/lib/wizard-copy";
import { IconGlobe, IconWireless, IconBox, IconDocument } from "./Icons";

/**
 * Step-by-step availability check.
 *
 * A visitor is never shown more than one question at a time. Asking for a
 * street address, a ZIP, an email and a phone number on one screen is what
 * makes people close the tab; asking "what are you looking for?" with four
 * big tiles costs them nothing and starts the commitment.
 *
 * Three deliberate decisions:
 *  - The first three questions are one tap each and advance on their own, so
 *    half the flow is done before the visitor types anything.
 *  - Only the ZIP is asked, not a full street address. The exact address is
 *    confirmed by the specialist on the call; asking for it here is the single
 *    biggest reason people abandon.
 *  - The phone number is asked LAST, and the ZIP is filed as a "partial" lead
 *    the moment it is entered — so a visitor who quits at the email or phone
 *    step still leaves us something to work with.
 */

const STEP_IDS = ["service", "customer", "timeline", "zip", "scan", "email", "contact"] as const;
type StepId = (typeof STEP_IDS)[number];
/** The scan is a beat, not a question — it gets no progress segment. */
const QUESTION_STEPS = STEP_IDS.filter((s) => s !== "scan");
const TOTAL_STEPS = STEP_IDS.length;

const SERVICE_ICONS: Record<string, (props: { className?: string }) => ReactNode> = {
  internet: IconGlobe,
  wireless: IconWireless,
  bundle: IconBox,
  unsure: IconDocument,
};

interface Answers {
  service: string;
  customerType: string;
  timeline: string;
  zip: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  callTime: string;
  callDay: string;
  /** Honeypot — real visitors leave this blank. */
  website: string;
}

const emptyAnswers: Answers = {
  service: "",
  customerType: "",
  timeline: "",
  zip: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  callTime: "Any time",
  callDay: "Any day",
  website: "",
};

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

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formats as the visitor types, so the field never looks like raw data entry. */
function formatPhone(value: string): string {
  const d = digitsOnly(value).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export interface AvailabilityWizardProps {
  /** Identifies where the wizard was opened from, recorded on the lead. */
  source: string;
  onClose: () => void;
  copy?: WizardCopy;
  /** Pre-fills the ZIP, e.g. when opened from a city page. */
  initialZip?: string;
  /** Pre-answers "What are you looking for?" so the flow opens on question 2. */
  initialService?: string;
}

export default function AvailabilityWizard({
  source,
  onClose,
  copy = wizardCopyEn,
  initialZip,
  initialService,
}: AvailabilityWizardProps) {
  // Restored from the tab's sessionStorage so close → reopen resumes. The
  // wizard only mounts on a click, never during SSR, so this is client-safe.
  const [saved] = useState(loadSaved);
  const savedIndex = saved?.stepIndex ?? 0;
  // A pre-answered service skips question 1, but never rewinds a resumed session.
  const [stepIndex, setStepIndex] = useState(
    STEP_IDS[savedIndex] === "scan" ? savedIndex - 1 : initialService && savedIndex === 0 ? 1 : savedIndex
  );
  const [answers, setAnswers] = useState<Answers>(() => ({
    ...emptyAnswers,
    ...saved?.answers,
    zip: initialZip || saved?.answers.zip || "",
    service: initialService || saved?.answers.service || "",
  }));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  /** Which way the next step slides in from. */
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [exitPrompt, setExitPrompt] = useState(false);
  const exitShownRef = useRef(false);
  const [closing, setClosing] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  /** Set once the partial lead has gone out, so it is never filed twice. */
  const partialSentRef = useRef(saved?.partialSent ?? false);

  /** Plays the exit animation, then lets the provider unmount us. */
  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(onClose, 180);
  }, [onClose]);

  // First close attempt after a ZIP gets one ask for a number; the second closes.
  const requestClose = useCallback(() => {
    const hasZip = digitsOnly(answers.zip).length === 5;
    const hasPhone = digitsOnly(answers.phone).length === 10;
    if (hasZip && !hasPhone && !done && !exitShownRef.current) {
      exitShownRef.current = true;
      setExitPrompt(true);
      return;
    }
    close();
  }, [answers.zip, answers.phone, done, close]);

  const step: StepId = STEP_IDS[stepIndex];
  const questionNumber = STEP_IDS.slice(0, stepIndex + 1).filter((s) => s !== "scan").length;
  const stepLabel = done
    ? copy.doneLabel
    : step === "contact"
      ? copy.lastStep
      : copy.stepOf(questionNumber, QUESTION_STEPS.length);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  // --- Dialog plumbing: remember the opener, lock scroll, restore focus ---
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus?.();
    };
  }, []);

  // Move focus to the new question on every step change so screen-reader users
  // hear the question rather than being left on a button that has moved.
  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex, done, exitPrompt]);

  useEffect(() => {
    if (!done && step !== "scan") trackWizardStep(questionNumber, step);
  }, [questionNumber, step, done]);

  useEffect(() => {
    if (!done) save({ answers, stepIndex, partialSent: partialSentRef.current });
  }, [answers, stepIndex, done]);

  // Escape is bound at the document, not the dialog: focus can end up on the
  // body (for instance after the final step replaces the button that had it),
  // and a React handler on the dialog would then never see the key.
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [requestClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const goBack = () => {
    setError(null);
    setDir("back");
    // Back from the email step lands on the ZIP, not on the scan beat.
    setStepIndex((i) => (STEP_IDS[i - 1] === "scan" ? i - 2 : Math.max(0, i - 1)));
  };

  const advance = useCallback(() => {
    setError(null);
    setDir("fwd");
    setStepIndex((i) => Math.min(TOTAL_STEPS - 1, i + 1));
  }, []);

  /** Choice steps advance on tap — no separate Next press. */
  const choose = (key: "service" | "customerType" | "timeline", value: string) => {
    set(key, value);
    setError(null);
    // A short beat so the selected state is visible before the step swaps.
    window.setTimeout(advance, 180);
  };

  const submitZip = () => {
    if (digitsOnly(answers.zip).length !== 5) {
      setError(copy.zip.error);
      return;
    }

    // File the ZIP immediately. If the visitor walks away from the next two
    // steps, this is the record that saves the lead.
    if (!partialSentRef.current) {
      partialSentRef.current = true;
      submitLead({
        zip: answers.zip,
        source,
        website: answers.website,
        stage: "partial",
        service: answers.service,
        customerType: answers.customerType,
        timeline: answers.timeline,
      }).catch((err) => {
        // Never block the visitor on lead delivery.
        console.error("Partial lead submission failed:", err);
        partialSentRef.current = false;
      });
      trackLead({ source, zip: answers.zip });
    }

    advance();
  };

  const submitEmail = () => {
    if (answers.email.trim() && !looksLikeEmail(answers.email)) {
      setError(copy.email.error);
      return;
    }
    advance();
  };

  const submitContact = async () => {
    if (!answers.firstName.trim()) {
      setError(copy.contact.errorFirstName);
      return;
    }
    if (digitsOnly(answers.phone).length !== 10) {
      setError(copy.contact.errorPhone);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await submitLead({
        zip: answers.zip,
        source,
        website: answers.website,
        stage: "complete",
        firstName: answers.firstName,
        lastName: answers.lastName,
        phone: digitsOnly(answers.phone),
        email: answers.email,
        service: answers.service,
        customerType: answers.customerType,
        timeline: answers.timeline,
        callTime: `${answers.callDay}, ${answers.callTime}`,
      });
      trackQualifiedLead({ source, zip: answers.zip });
      save(null);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : copy.genericError);
    } finally {
      setBusy(false);
    }
  };

  const submitExitPhone = async () => {
    if (digitsOnly(answers.phone).length !== 10) {
      setError(copy.contact.errorPhone);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await submitLead({
        zip: answers.zip,
        source: `${source}-exit`,
        website: answers.website,
        stage: "partial",
        phone: digitsOnly(answers.phone),
        email: answers.email,
        service: answers.service,
        customerType: answers.customerType,
        timeline: answers.timeline,
      });
      trackQualifiedLead({ source, zip: answers.zip });
      save(null);
      setExitPrompt(false);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : copy.genericError);
    } finally {
      setBusy(false);
    }
  };

  const restart = () => {
    save(null);
    partialSentRef.current = false;
    setAnswers({ ...emptyAnswers, zip: initialZip || "" });
    setDone(false);
    setError(null);
    setStepIndex(0);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={copy.dialogLabel}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`${closing ? "overlay-out" : "overlay-in"} fixed inset-0 bg-att-ink/60 backdrop-blur-[2px]`}
        onClick={requestClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        className={`${closing ? "panel-out" : "panel-in"} relative w-full sm:max-w-[580px] bg-white sm:rounded-[20px] shadow-2xl flex flex-col max-h-[100dvh] sm:max-h-[94vh] h-[100dvh] sm:h-auto overflow-hidden`}
      >
        {/* Header: segmented progress + close */}
        <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="att-fine font-bold text-att-navy tracking-wide uppercase">
              {stepLabel}
            </span>
            <button
              type="button"
              onClick={requestClose}
              aria-label={copy.close}
              className="-mr-1 p-1.5 text-att-gray-500 hover:text-att-ink rounded-full hover:bg-att-gray-100 focus:outline-none focus:ring-2 focus:ring-att-cyan"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* One segment per question — the visitor can see how short this is. */}
          <div
            className="flex gap-1.5"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={QUESTION_STEPS.length}
            aria-valuenow={done ? QUESTION_STEPS.length : questionNumber}
            aria-label={copy.dialogLabel}
          >
            {QUESTION_STEPS.map((id, i) => (
              <span
                key={id}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  done || i < questionNumber ? "bg-att-cyan" : "bg-att-gray-150"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-8 pb-6 overflow-y-auto flex-1">
          {exitPrompt && !done ? (
            <form onSubmit={(e) => { e.preventDefault(); submitExitPhone(); }} noValidate className="wizard-step">
              <StepHeading headingRef={headingRef} question={copy.exit.title} help={copy.exit.help} />
              <label htmlFor="wizard-exit-phone" className="label-text">{copy.contact.phone}</label>
              <input
                id="wizard-exit-phone"
                type="tel"
                inputMode="tel"
                className="input-field"
                autoComplete="tel"
                autoFocus
                placeholder={copy.contact.phonePlaceholder}
                value={answers.phone}
                onChange={(e) => set("phone", formatPhone(e.target.value))}
                disabled={busy}
              />
              <p className="att-fine text-att-gray-500 mt-3">{copy.contact.consent}</p>
              {error && (
                <p className="mt-4 text-sm text-red-700 font-medium" role="alert">{error}</p>
              )}
              <div className="flex items-center gap-3 mt-5">
                <button type="submit" className="btn-primary flex-1 disabled:opacity-60" disabled={busy}>
                  {busy ? <><span className="spinner" aria-hidden="true" />{copy.contact.submitting}</> : copy.exit.callMe}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="text-sm font-bold text-att-navy underline underline-offset-2 hover:text-att-navy-dark focus:outline-none focus:ring-2 focus:ring-att-cyan rounded"
                >
                  {copy.exit.leave}
                </button>
              </div>
            </form>
          ) : done ? (
            <DonePanel copy={copy} zip={answers.zip} onRestart={restart} headingRef={headingRef} />
          ) : (
            // Keyed by step so the wrapper remounts and the slide-in replays.
            <div key={step} data-dir={dir} className="wizard-step">
              {step === "service" && (
                <TileStep
                  headingRef={headingRef}
                  question={copy.service.question}
                  help={copy.service.help}
                  choices={copy.service.choices}
                  value={answers.service}
                  onChoose={(v) => choose("service", v)}
                />
              )}

              {step === "customer" && (
                <ChoiceStep
                  headingRef={headingRef}
                  question={copy.customer.question}
                  help={copy.customer.help}
                  choices={copy.customer.choices}
                  value={answers.customerType}
                  onChoose={(v) => choose("customerType", v)}
                />
              )}

              {step === "timeline" && (
                <ChoiceStep
                  headingRef={headingRef}
                  question={copy.timeline.question}
                  help={copy.timeline.help}
                  choices={copy.timeline.choices}
                  value={answers.timeline}
                  onChoose={(v) => choose("timeline", v)}
                />
              )}

              {step === "zip" && (
                <form onSubmit={(e) => { e.preventDefault(); submitZip(); }} noValidate>
                  <StepHeading headingRef={headingRef} question={copy.zip.question} help={copy.zip.help} />

                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="wizard-website">Website</label>
                    <input
                      id="wizard-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={answers.website}
                      onChange={(e) => set("website", e.target.value)}
                    />
                  </div>

                  <label htmlFor="wizard-zip" className="label-text">{copy.zip.label}</label>
                  <input
                    id="wizard-zip"
                    type="text"
                    inputMode="numeric"
                    className="input-field text-2xl font-bold tracking-[0.2em] text-center py-4"
                    placeholder={copy.zip.placeholder}
                    autoComplete="postal-code"
                    autoFocus
                    maxLength={5}
                    value={answers.zip}
                    onChange={(e) => set("zip", digitsOnly(e.target.value).slice(0, 5))}
                  />
                  <SubmitOnEnter />
                </form>
              )}

              {step === "scan" && (
                <ScanStep lines={copy.scan.lines} zip={answers.zip} onDone={advance} />
              )}

              {step === "email" && (
                <form onSubmit={(e) => { e.preventDefault(); submitEmail(); }} noValidate>
                  <StepHeading
                    headingRef={headingRef}
                    question={copy.email.questionNearZip(answers.zip, plans[0].price)}
                    help={copy.email.help}
                  />
                  <label htmlFor="wizard-email" className="label-text">{copy.email.label}</label>
                  <input
                    id="wizard-email"
                    type="email"
                    className="input-field"
                    placeholder={copy.email.placeholder}
                    autoComplete="email"
                    autoFocus
                    value={answers.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={advance}
                    className="mt-3 text-sm font-bold text-att-navy underline underline-offset-2 hover:text-att-navy-dark focus:outline-none focus:ring-2 focus:ring-att-cyan rounded"
                  >
                    {copy.email.skip}
                  </button>
                  <SubmitOnEnter />
                </form>
              )}

              {step === "contact" && (
                <form onSubmit={(e) => { e.preventDefault(); submitContact(); }} noValidate>
                  <StepHeading headingRef={headingRef} question={contactQuestion(copy, answers)} help={copy.contact.help} />
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="wizard-first" className="label-text">{copy.contact.firstName}</label>
                        <input
                          id="wizard-first"
                          type="text"
                          className="input-field"
                          autoComplete="given-name"
                          autoFocus
                          value={answers.firstName}
                          onChange={(e) => set("firstName", e.target.value)}
                          disabled={busy}
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-last" className="label-text">{copy.contact.lastName}</label>
                        <input
                          id="wizard-last"
                          type="text"
                          className="input-field"
                          autoComplete="family-name"
                          value={answers.lastName}
                          onChange={(e) => set("lastName", e.target.value)}
                          disabled={busy}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="wizard-phone" className="label-text">{copy.contact.phone}</label>
                      <input
                        id="wizard-phone"
                        type="tel"
                        inputMode="tel"
                        className="input-field"
                        placeholder={copy.contact.phonePlaceholder}
                        autoComplete="tel"
                        value={answers.phone}
                        onChange={(e) => set("phone", formatPhone(e.target.value))}
                        disabled={busy}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="wizard-callday" className="label-text">{copy.contact.callDay}</label>
                        <select
                          id="wizard-callday"
                          className="input-field"
                          value={answers.callDay}
                          onChange={(e) => set("callDay", e.target.value)}
                          disabled={busy}
                        >
                          {copy.contact.callDayChoices.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="wizard-calltime" className="label-text">{copy.contact.callTime}</label>
                        <select
                          id="wizard-calltime"
                          className="input-field"
                          value={answers.callTime}
                          onChange={(e) => set("callTime", e.target.value)}
                          disabled={busy}
                        >
                          {copy.contact.callTimeChoices.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="att-fine text-att-gray-500 bg-att-gray-100 rounded-xl p-3">
                      {copy.contact.consent}
                    </p>
                  </div>
                  <SubmitOnEnter />
                </form>
              )}

              {error && (
                <p className="mt-4 text-sm text-red-700 font-medium" role="alert">{error}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer: navigation + trust line */}
        {!done && !exitPrompt && (
          <div className="px-5 sm:px-8 pb-5 sm:pb-6 pt-4 bg-white border-t border-att-gray-200">
            <div className="flex items-center gap-3">
              {stepIndex > 0 && step !== "scan" && (
                <button type="button" onClick={goBack} className="btn-outline shrink-0" disabled={busy}>
                  ← {copy.back}
                </button>
              )}
              {step === "zip" && (
                <button type="button" onClick={submitZip} className="btn-primary flex-1">
                  {copy.next}
                </button>
              )}
              {step === "email" && (
                <button type="button" onClick={submitEmail} className="btn-primary flex-1">
                  {copy.next}
                </button>
              )}
              {step === "contact" && (
                <button
                  type="button"
                  onClick={submitContact}
                  className="btn-primary flex-1 disabled:opacity-60"
                  disabled={busy}
                >
                  {busy ? <><span className="spinner" aria-hidden="true" />{copy.contact.submitting}</> : copy.contact.submit}
                </button>
              )}
            </div>
            <p className="att-fine text-att-gray-500 mt-3 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 1 0-8 0v4" />
                <rect x="5" y="11" width="14" height="10" rx="2" />
              </svg>
              {copy.secure}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Present only so pressing Enter in a field submits the step. The visible
 * control lives in the footer, so this one stays out of the tab order and out
 * of the accessibility tree.
 */
function SubmitOnEnter() {
  return <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true" />;
}

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

function StepHeading({
  headingRef,
  question,
  help,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  question: string;
  help: string;
}) {
  return (
    <div className="mb-6">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-att-ink font-bold tracking-tight focus:outline-none"
        style={{ fontSize: "clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem)", lineHeight: 1.2 }}
      >
        {question}
      </h2>
      <p className="text-att-gray-600 text-sm mt-2">{help}</p>
    </div>
  );
}

/** Step 1: four large icon tiles, two per row. */
function TileStep({
  headingRef,
  question,
  help,
  choices,
  value,
  onChoose,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  question: string;
  help: string;
  choices: { value: string; label: string; hint?: string }[];
  value: string;
  onChoose: (value: string) => void;
}) {
  return (
    <div>
      <StepHeading headingRef={headingRef} question={question} help={help} />
      <div role="radiogroup" aria-label={question} className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const selected = value === choice.value;
          const Icon = SERVICE_ICONS[choice.value];
          return (
            <button
              key={choice.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChoose(choice.value)}
              className={`relative text-center rounded-2xl border-2 px-3 py-5 transition-all focus:outline-none focus:ring-2 focus:ring-att-cyan focus:ring-offset-2 ${
                selected
                  ? "border-att-navy bg-att-light-blue"
                  : "border-att-gray-200 hover:border-att-navy hover:bg-att-gray-100"
              }`}
            >
              {selected && (
                <span
                  className="animate-pop absolute top-2 right-2 w-5 h-5 rounded-full bg-att-navy text-white flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              {Icon && (
                <span
                  className={`mx-auto mb-3 flex w-12 h-12 items-center justify-center rounded-full ${
                    selected ? "bg-att-navy text-white" : "bg-att-light-blue text-att-navy"
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </span>
              )}
              <span className="block font-bold text-att-ink text-[15px] leading-snug">{choice.label}</span>
              {choice.hint && (
                <span className="block att-fine text-att-gray-500 mt-1">{choice.hint}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Steps 2 and 3: stacked rows with a visible radio dot. */
function ChoiceStep({
  headingRef,
  question,
  help,
  choices,
  value,
  onChoose,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  question: string;
  help: string;
  choices: { value: string; label: string; hint?: string }[];
  value: string;
  onChoose: (value: string) => void;
}) {
  return (
    <div>
      <StepHeading headingRef={headingRef} question={question} help={help} />
      <div role="radiogroup" aria-label={question} className="space-y-2.5">
        {choices.map((choice) => {
          const selected = value === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChoose(choice.value)}
              className={`w-full flex items-center gap-3.5 text-left rounded-2xl border-2 px-5 py-4 transition-all focus:outline-none focus:ring-2 focus:ring-att-cyan focus:ring-offset-2 ${
                selected
                  ? "border-att-navy bg-att-light-blue"
                  : "border-att-gray-200 hover:border-att-navy hover:bg-att-gray-100"
              }`}
            >
              <span
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected ? "border-att-navy" : "border-att-gray-400"
                }`}
                aria-hidden="true"
              >
                {selected && <span className="animate-pop w-2.5 h-2.5 rounded-full bg-att-navy" />}
              </span>
              <span>
                <span className="block font-bold text-att-ink">{choice.label}</span>
                {choice.hint && (
                  <span className="block att-fine text-att-gray-500 mt-0.5">{choice.hint}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Confirmation screen.
 *
 * It does not claim a verified availability result: fiber is built street by
 * street and nothing here has checked the visitor's actual address, so the
 * honest promise is that a specialist confirms it on the call.
 */
function DonePanel({
  copy,
  zip,
  onRestart,
  headingRef,
}: {
  copy: WizardCopy;
  zip: string;
  onRestart: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="pb-6">
      <div className="flex items-start gap-3 mb-4">
        <span
          className="animate-pop shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-att-light-blue text-att-navy"
          aria-hidden="true"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path className="tick-draw" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <div>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-att-ink font-bold tracking-tight focus:outline-none"
            style={{ fontSize: "clamp(1.25rem, 1rem + 1vw, 1.625rem)", lineHeight: 1.2 }}
          >
            {copy.result.title}
          </h2>
          {zip && (
            <p className="att-fine text-att-gray-500 mt-1">
              {copy.result.showingFor} {zip}
            </p>
          )}
        </div>
      </div>

      <p className="text-att-gray-700 mb-5">{copy.result.thanks}</p>

      <h3 className="att-fine font-bold text-att-navy uppercase tracking-wide mb-2">
        {copy.result.plansTitle}
      </h3>
      <ul className="divide-y divide-att-gray-200 border-y border-att-gray-200 mb-5" role="list">
        {plans.map((plan) => (
          <li key={plan.name} className="flex justify-between items-baseline py-2.5 text-sm">
            <span className="text-att-gray-700">{plan.speed}</span>
            <span className="font-bold text-att-ink">{plan.price}/mo*</span>
          </li>
        ))}
      </ul>

      <a
        href={telHref(phoneNumber)}
        onClick={() => trackCall(phoneNumber)}
        className="btn-primary w-full mb-2"
      >
        {copy.result.callNow} · {phoneNumber}
      </a>
      <p className="att-fine text-att-gray-500 mb-5">{copy.result.callHelp}</p>

      <button
        type="button"
        onClick={onRestart}
        className="text-sm font-bold text-att-navy underline underline-offset-2 hover:text-att-navy-dark focus:outline-none focus:ring-2 focus:ring-att-cyan rounded"
      >
        {copy.result.restart}
      </button>
    </div>
  );
}
