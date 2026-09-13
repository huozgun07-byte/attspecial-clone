import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import MarketingPixels from "@/components/MarketingPixels";
import CookieConsent from "@/components/CookieConsent";
import { siteUrl, siteName, defaultDescription, organizationSchema, fiberOffersSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AT&T Fiber Internet from $35/mo | AT&T Preferred Dealer",
    template: "%s | AT&T Preferred Dealer",
  },
  description: defaultDescription,
  keywords: [
    "AT&T Fiber",
    "AT&T internet",
    "fiber internet",
    "gigabit internet",
    "AT&T Preferred Dealer",
    "AT&T Internet Air",
    "AT&T wireless plans",
    "internet deals",
    "check internet availability",
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Telecommunications",
  formatDetection: { telephone: true },
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "es-US": "/espanol" },
  },
  openGraph: {
    title: "AT&T Fiber Internet from $35/mo | AT&T Preferred Dealer",
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AT&T Fiber — 1 Gig internet for $50/mo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AT&T Fiber Internet from $35/mo | AT&T Preferred Dealer",
    description: defaultDescription,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/att-preferred-dealer.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fiberOffersSchema()) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white">
        <Analytics />
        <MarketingPixels />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
