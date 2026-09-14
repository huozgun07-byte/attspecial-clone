// Thin client helpers around the two lead-capture API routes.
// Centralized here so every form on the site talks to the backend the same way.

export interface AddressPayload {
  /**
   * Optional: the step-by-step wizard collects only a ZIP, because asking for
   * a full street address up front is the single biggest cause of abandonment.
   * The specialist confirms the exact address on the call.
   */
  street?: string;
  unit?: string;
  zip: string;
  moving?: boolean;
}

export interface AvailabilityPlan {
  name: string;
  speed: string;
  price: number;
}

export interface AvailabilityResponse {
  available: boolean;
  message: string;
  plans: AvailabilityPlan[];
}

export class ApiError extends Error {}

async function parseJsonResponse<T>(res: Response): Promise<T> {
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data && typeof (data as { error?: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Something went wrong. Please try again or call us.";
    throw new ApiError(message);
  }
  return data as T;
}

/** Calls /api/check-availability with the address the visitor entered. */
export async function checkAvailability(payload: AddressPayload): Promise<AvailabilityResponse> {
  const res = await fetch("/api/check-availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonResponse<AvailabilityResponse>(res);
}

export interface LeadPayload extends AddressPayload {
  /** Which page/form this lead came from, e.g. "home-hero", "wireless-modal". */
  source: string;
  /** Result of the availability check, when one was run first. */
  available?: boolean;
  /** Honeypot field — real visitors never fill this in. Left undefined when not present. */
  website?: string;

  // --- Fields the step-by-step wizard collects ---
  /**
   * "partial" is sent the moment the address step completes, so an abandoned
   * wizard still leaves us a usable address. "complete" is sent once contact
   * details are in. A visitor who finishes therefore produces two records for
   * the same address — the complete one supersedes the partial.
   */
  stage?: "partial" | "complete";
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  /** internet | wireless | bundle | unsure */
  service?: string;
  /** new | existing | unsure */
  customerType?: string;
  /** asap | week | month | researching */
  timeline?: string;
  /** Preferred callback window, free text from a fixed list. */
  callTime?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  leadId: string;
}

/** Calls /api/lead to record/notify on a new lead. */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonResponse<LeadResponse>(res);
}
