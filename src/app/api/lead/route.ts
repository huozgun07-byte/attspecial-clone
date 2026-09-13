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
  street: string;
  unit?: string;
  zip: string;
  moving?: boolean;
  source: string;
  phone?: string;
  email?: string;
  available?: boolean;
  timestamp: string;
  ip: string;
}

async function sendLeadEmail(lead: Lead) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping lead email notification.");
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New lead: ${lead.street}, ${lead.zip}`,
      text: [
        `New lead from: ${lead.source}`,
        "",
        `Street: ${lead.street}`,
        `Unit: ${lead.unit || "-"}`,
        `Zip: ${lead.zip}`,
        `Moving to this address: ${lead.moving ? "Yes" : "No"}`,
        `Availability check result: ${lead.available === undefined ? "Not checked" : lead.available ? "Available" : "Not available"}`,
        `Phone: ${lead.phone || "-"}`,
        `Email: ${lead.email || "-"}`,
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
    const { allowed } = rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const body = await request.json();
    const { street, unit, zip, moving, source, phone, email, website, available } = body;

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
    if (!street || !zip) {
      return NextResponse.json(
        { error: "Street address and zip code are required" },
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
