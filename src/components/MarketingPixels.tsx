"use client";

import { useEffect, useState } from "react";
import { trackCall } from "@/lib/tracking";

/**
 * Meta (Facebook/Instagram) and TikTok advertising pixels.
 *
 * Both are opt-in by configuration: if the corresponding environment variable
 * is missing, nothing is injected at all. Set these in Vercel → Settings →
 * Environment Variables once the ad accounts exist:
 *
 *   NEXT_PUBLIC_META_PIXEL_ID     e.g. 1234567890123456
 *   NEXT_PUBLIC_TIKTOK_PIXEL_ID   e.g. CQABCDEFGHIJKLMNOPQR
 *
 * Pixels are also gated on cookie consent: a visitor who pressed "Decline"
 * never gets them.
 */
export default function MarketingPixels() {
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setAllowed(localStorage.getItem("cookie-consent") !== "declined");
      } catch {
        setAllowed(true);
      }
    };
    read();
    window.addEventListener("cookie-consent-changed", read);
    return () => window.removeEventListener("cookie-consent-changed", read);
  }, []);

  useEffect(() => {
    if (!allowed || !metaId) return;
    if (document.getElementById("meta-pixel")) return;

    const script = document.createElement("script");
    script.id = "meta-pixel";
    script.async = true;
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${metaId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }, [allowed, metaId]);

  useEffect(() => {
    if (!allowed || !tiktokId) return;
    if (document.getElementById("tiktok-pixel")) return;

    const script = document.createElement("script");
    script.id = "tiktok-pixel";
    script.async = true;
    script.innerHTML = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
        ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
        ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
        ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
        var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=r+"?sdkid="+e+"&lib="+t;
        var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
        ttq.load('${tiktokId}');
        ttq.page();
      }(window, document, 'ttq');
    `;
    document.head.appendChild(script);
  }, [allowed, tiktokId]);

  // One delegated listener covers every `tel:` link on the site, so phone taps
  // are reported as conversions without touching each component.
  useEffect(() => {
    if (!allowed) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (link) trackCall(link.getAttribute("href")!.replace("tel:", ""));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [allowed]);

  return null;
}
