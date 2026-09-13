import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { street, unit, zip, moving, source, phone, email } = body;

    // Validation
    if (!street || !zip) {
      return NextResponse.json(
        { error: "Street address and zip code are required" },
        { status: 400 }
      );
    }

    // Log lead (replace with CRM integration - HubSpot, Salesforce, etc.)
    const lead = {
      street,
      unit,
      zip,
      moving,
      source: source || "website",
      phone,
      email,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    };

    console.log("New lead:", lead);

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