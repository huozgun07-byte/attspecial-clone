import type { Metadata } from "next";
import { phoneNumber, businessPhone, faqs, plans } from "./site-config";

/**
 * Canonical origin for the site. Set NEXT_PUBLIC_SITE_URL in Vercel once the
 * real domain is live; until then everything resolves against the Vercel URL.
 *
 * IMPORTANT: this must never point at attspecial.com. Canonical tags pointing
 * at another domain tell Google that the other site is the original, and social
 * crawlers (Facebook/Instagram/TikTok) would scrape that site's preview instead
 * of ours.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://attspecial-clone-test11-f8b0.vercel.app"
).replace(/\/+$/, "");

export const siteName = "AT&T Preferred Dealer";

export const defaultDescription =
  "Order AT&T Fiber internet from an AT&T Preferred Dealer. Plans from $35/mo with speeds up to 5 GIG, free professional installation, and a $200 AT&T Visa Reward Card. Check availability at your address.";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Social preview image under /public/images. Defaults to the site-wide card. */
  image?: string;
  locale?: "en_US" | "es_US";
  keywords?: string[];
};

/**
 * Builds a complete metadata block for a route: canonical URL, Open Graph
 * (used by Facebook, Instagram and TikTok link previews) and Twitter/X card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/og-image.png",
  locale = "en_US",
  keywords,
}: PageMetaInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      languages: { "en-US": "/", "es-US": "/espanol" },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Organization + website schema, rendered once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/images/att-preferred-dealer.png`,
        description: defaultDescription,
        areaServed: { "@type": "Country", name: "United States" },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: `+1-${phoneNumber.replace(/\./g, "-")}`,
            contactType: "sales",
            areaServed: "US",
            availableLanguage: ["English", "Spanish"],
          },
          {
            "@type": "ContactPoint",
            telephone: `+1-${businessPhone.replace(/\./g, "-")}`,
            contactType: "sales",
            name: "Business sales",
            areaServed: "US",
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

/** Offer catalogue for the fiber plans shown on the homepage. */
export function fiberOffersSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AT&T Fiber internet",
    serviceType: "Fiber internet service",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: `AT&T Fiber ${plan.speed}`,
      price: plan.price.replace("$", ""),
      priceCurrency: "USD",
      category: plan.name,
      url: siteUrl,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price.replace("$", ""),
        priceCurrency: "USD",
        unitCode: "MON",
      },
    })),
  };
}

/** FAQ rich result for /faq — uses the same copy shown on the page. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
