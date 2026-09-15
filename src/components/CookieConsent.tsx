"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setShow(false);
    // Initialize analytics here
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-[76px] lg:bottom-0 left-0 right-0 z-50 bg-white border-t border-att-gray-200 shadow-lg animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-desc"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          <div className="flex-1">
            <p id="cookie-desc" className="text-sm text-att-gray-600">
              We use cookies to enhance your experience, analyze traffic, and personalize content.
              By clicking "Accept", you consent to our use of cookies.{" "}
              <Link href="/privacy" className="text-att-navy underline hover:no-underline">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm font-medium text-att-gray-700 bg-att-gray-150 rounded-lg hover:bg-att-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-att-cyan"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm font-medium text-white bg-att-navy rounded-lg hover:bg-att-navy-dark transition-colors focus:outline-none focus:ring-2 focus:ring-att-cyan"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}