import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "okdnmarketing@gmail.com";
// Resend's shared "onboarding@resend.dev" sender works with no domain setup, good for
// getting notifications flowing immediately. Once a domain is verified in the Resend
// dashboard, switch this to something like "AT&T Fiber Leads <leads@yourdomain.com>".
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "AT&T Fiber Leads <onboarding@resend.dev>";
// URL of a Google Apps Script Web App deployment that appends a row to a Google Sheet.
// See GOOGLE_SHEETS_SETUP.md for how to create and deploy it.
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

interface Lead {
  street?: string;
  unit?: string;
  zip: string;
  moving?: boolean;
  source: string;
  phone?: string;
  email?: string;
  available?: boolean;
  timestamp: string;
  ip: string;
  /**
   * "partial" arrives as soon as the wizard's address step is done, so an
   * abandoned wizard still leaves a usable address. "complete" arrives once
   * contact details are in and supersedes the partial for the same address.
   */
  stage?: "partial" | "complete";
  firstName?: string;
  lastName?: string;
  service?: string;
  customerType?: string;
  timeline?: string;
  callTime?: string;
}

/** Human-readable labels for the wizard's coded answers. */
const ANSWER_LABELS: Record<string, string> = {
  internet: "Internet",
  wireless: "Wireless",
  bundle: "Internet + wireless",
  unsure: "Not sure yet",
  new: "New AT&T customer",
  existing: "Existing AT&T customer",
  asap: "As soon as possible",
  week: "Within a week",
  month: "Within a month",
  researching: "Just comparing options",
};

function label(value?: string): string {
  if (!value) return "-";
  return ANSWER_LABELS[value] || value;
}

async function sendLeadEmail(lead: Lead) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping lead email notification.");
    return;
  }
  try {
    // A partial lead is an address captured before the visitor gave contact
    // details — worth chasing, but it should never look like a finished one in
    // the inbox.
    const prefix =
      lead.stage === "partial"
        ? "Address only (no contact yet)"
        : lead.phone
          ? "CALLABLE LEAD"
          : "New lead";

    const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ");

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `${prefix}: ${lead.street ? `${lead.street}, ` : ""}${lead.zip}`,
      text: [
        `${prefix} from: ${lead.source}`,
        "",
        `Name: ${name || "-"}`,
        `Phone: ${lead.phone || "-"}`,
        `Best time to call: ${lead.callTime || "-"}`,
        `Email: ${lead.email || "-"}`,
        "",
        `Street: ${lead.street || "- (ask on the call)"}`,
        `Unit: ${lead.unit || "-"}`,
        `Zip: ${lead.zip}`,
        `Moving to this address: ${lead.moving ? "Yes" : "No"}`,
        `Availability check result: ${lead.available === undefined ? "Not checked" : lead.available ? "Available" : "Not available"}`,
        "",
        `Looking for: ${label(lead.service)}`,
        `Customer status: ${label(lead.customerType)}`,
        `Needs service: ${label(lead.timeline)}`,
        "",
        `Time: ${lead.timestamp}`,
        `IP: ${lead.ip}`,
        "",
        "Dealer portal: https://youachieve.att.com/yourefer/",
      ].join("\n"),
    });
  } catch (error) {
    // A failed notification email should never fail the lead submission itself —
    // the lead is already logged/persisted above by the time this runs.
    console.error("Failed to send lead notification email:", error);
  }
}

async function appendToGoogleSheet(lead: Lead) {
  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL not set — skipping Google Sheets logging.");
    return;
  }
  try {
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error("Google Sheets webhook responded with", res.status, await res.text());
    }
  } catch (error) {
    // Same reasoning as sendLeadEmail: never fail the lead submission over this.
    console.error("Failed to log lead to Google Sheets:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    // The wizard files two records per completed journey (partial + complete),
    // so the allowance has to cover a visitor checking a couple of addresses.
    const { allowed } = rateLimit(`lead:${ip}`, 10, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const body = await request.json();
    const {
      street,
      unit,
      zip,
      moving,
      source,
      phone,
      email,
      website,
      available,
      stage,
      firstName,
      lastName,
      service,
      customerType,
      timeline,
      callTime,
    } = body;

    // Honeypot: real visitors never fill this hidden field in. Pretend success
    // so the bot doesn't learn its submission was caught, but skip notifying/
    // recording it as a real lead.
    if (typeof website === "string" && website.trim() !== "") {
      console.warn("Lead submission blocked (honeypot triggered):", { ip, timestamp: new Date().toISOString() });
      return NextResponse.json({
        success: true,
        message: "Thanks! We'll contact you shortly with the best deals.",
        leadId: `LEAD-${Date.now()}`,
      });
    }

    // Validation
    // A ZIP on its own is a workable lead — the wizard deliberately does not
    // ask for a street address, and a partial record with a ZIP plus the
    // qualifying answers is far better than nothing.
    if (!zip || String(zip).replace(/\D/g, "").length !== 5) {
      return NextResponse.json(
        { error: "A valid 5-digit ZIP code is required" },
        { status: 400 }
      );
    }

    // Log lead (replace with CRM integration - HubSpot, Salesforce, etc.)
    const lead: Lead = {
      street,
      unit,
      zip,
      moving,
      source: source || "website",
      phone,
      email,
      available,
      timestamp: new Date().toISOString(),
      ip,
      stage: stage === "partial" || stage === "complete" ? stage : undefined,
      firstName,
      lastName,
      service,
      customerType,
      timeline,
      callTime,
    };

    console.log("New lead:", lead);

    await Promise.allSettled([sendLeadEmail(lead), appendToGoogleSheet(lead)]);

    // TODO: Integrate with CRM
    // await fetch("https://api.hubspot.com/crm/v3/objects/contacts", { ... })
    // await fetch("https://api.salesforce.com/services/data/v58.0/sobjects/Lead", { ... })

    return NextResponse.json({
      success: true,
      message: "Thanks! We'll contact you shortly with the best deals.",
      leadId: `LEAD-${Date.now()}`,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
