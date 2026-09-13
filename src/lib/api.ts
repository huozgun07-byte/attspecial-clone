// Thin client helpers around the two lead-capture API routes.
// Centralized here so every form on the site talks to the backend the same way.

export interface AddressPayload {
  street: string;
  unit?: string;
  zip: string;
  moving: boolean;
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
