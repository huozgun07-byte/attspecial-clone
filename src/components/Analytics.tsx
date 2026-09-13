"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });

    // Load gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    const handleRouteChange = (url: string) => {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };

    // Listen for Next.js route changes
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleRouteChange(args[2] as string);
    };

    window.addEventListener("popstate", () => {
      handleRouteChange(window.location.pathname);
    });

    return () => {
      history.pushState = originalPushState;
    };
  }, [GA_MEASUREMENT_ID]);

  return null;
}