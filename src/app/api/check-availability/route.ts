import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { allowed } = rateLimit(`check-availability:${ip}`, 20, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const body = await request.json();
    const { street, unit, zip, moving, website } = body;

    // Honeypot: real visitors never fill this hidden field in. Respond as if
    // everything worked so the bot doesn't learn its submission was caught.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({
        available: true,
        message: "Great news! AT&T Fiber is available at your address.",
        plans: [],
      });
    }

    // Validation
    if (!street || !zip) {
      return NextResponse.json(
        { error: "Street address and zip code are required" },
        { status: 400 }
      );
    }

    // Simulate availability check (replace with real API call to AT&T)
    const isAvailable = Math.random() > 0.3; // 70% chance available

    // Log lead (replace with CRM integration)
    console.log("Availability check:", { street, unit, zip, moving, isAvailable, timestamp: new Date().toISOString() });

    return NextResponse.json({
      available: isAvailable,
      message: isAvailable
        ? "Great news! AT&T Fiber is available at your address."
        : "AT&T Fiber is not yet available at your address. Check back soon!",
      plans: isAvailable
        ? [
            { name: "Basic", speed: "300 Mbps", price: 35 },
            { name: "Home", speed: "500 Mbps", price: 50 },
            { name: "Smart Home", speed: "1 GIG", price: 50 },
            { name: "Elite", speed: "5 GIG", price: 95 },
          ]
        : [],
    });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
