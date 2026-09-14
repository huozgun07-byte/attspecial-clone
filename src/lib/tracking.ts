/**
 * Conversion tracking helpers.
 *
 * Every call is a no-op when the corresponding pixel isn't loaded (no ID
 * configured, or the visitor declined cookies), so these are safe to call
 * unconditionally from components.
 */

type Fbq = (...args: unknown[]) => void;
type Ttq = { track: (event: string, params?: Record<string, unknown>) => void };
type Gtag = (...args: unknown[]) => void;

function win() {
  if (typeof window === "undefined") return undefined;
  return window as unknown as { fbq?: Fbq; ttq?: Ttq; gtag?: Gtag };
}

/**
 * Fires when a visitor submits the availability form — the conversion that
 * Meta and TikTok ad campaigns optimise against.
 */
export function trackLead(params: { source: string; available?: boolean; zip?: string }) {
  const w = win();
  if (!w) return;

  try {
    w.fbq?.("track", "Lead", {
      content_name: params.source,
      content_category: params.available ? "available" : "unavailable",
    });
  } catch {
    /* pixel not loaded */
  }

  try {
    w.ttq?.track("SubmitForm", {
      content_name: params.source,
      description: params.available ? "available" : "unavailable",
    });
  } catch {
    /* pixel not loaded */
  }

  try {
    w.gtag?.("event", "generate_lead", {
      source: params.source,
      available: params.available,
    });
  } catch {
    /* analytics not loaded */
  }
}

/**
 * Fires on every step transition in the availability wizard, so the ad
 * platforms show where people drop out rather than just whether they finished.
 */
export function trackWizardStep(step: number, stepName: string) {
  const w = win();
  if (!w) return;

  try {
    w.fbq?.("trackCustom", "WizardStep", { step, step_name: stepName });
  } catch {
    /* pixel not loaded */
  }

  try {
    w.ttq?.track("ClickButton", { content_name: `wizard-step-${step}-${stepName}` });
  } catch {
    /* pixel not loaded */
  }

  try {
    w.gtag?.("event", "wizard_step", { step, step_name: stepName });
  } catch {
    /* analytics not loaded */
  }
}

/**
 * Fires when the wizard's contact step is submitted — the point at which we
 * have a phone number and the lead is actually callable.
 */
export function trackQualifiedLead(params: { source: string; available?: boolean; zip?: string }) {
  const w = win();
  if (!w) return;

  try {
    w.fbq?.("track", "CompleteRegistration", {
      content_name: params.source,
      content_category: params.available ? "available" : "unavailable",
    });
  } catch {
    /* pixel not loaded */
  }

  try {
    w.ttq?.track("CompleteRegistration", { content_name: params.source });
  } catch {
    /* pixel not loaded */
  }

  try {
    w.gtag?.("event", "qualified_lead", { source: params.source, available: params.available });
  } catch {
    /* analytics not loaded */
  }
}

/** Fires when a visitor taps a phone number. */
export function trackCall(phone: string) {
  const w = win();
  if (!w) return;
  try {
    w.fbq?.("track", "Contact", { content_name: phone });
  } catch {
    /* pixel not loaded */
  }
  try {
    w.ttq?.track("Contact", { content_name: phone });
  } catch {
    /* pixel not loaded */
  }
  try {
    w.gtag?.("event", "click_to_call", { phone });
  } catch {
    /* analytics not loaded */
  }
}
