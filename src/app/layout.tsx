import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
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
  title: {
    default: "Internet - AT&T Preferred Dealer",
    template: "%s | AT&T Preferred Dealer",
  },
  description: "Get AT&T Fiber Internet with speeds up to 5 GIG. Starting at $35/mo. Free professional installation. $250 Reward Card offer. Check availability in your area.",
  keywords: ["AT&T Fiber", "Internet", "High Speed Internet", "Fiber Optic", "AT&T Dealer", "Fiber Internet", "Gigabit Internet"],
  authors: [{ name: "AT&T Preferred Dealer" }],
  creator: "AT&T Preferred Dealer",
  publisher: "AT&T Preferred Dealer",
  formatDetection: {
    telephone: true,
  },
  metadataBase: new URL("https://attspecial.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-US": "/espanol",
    },
  },
  openGraph: {
    title: "Internet - AT&T Preferred Dealer",
    description: "Get AT&T Fiber Internet with speeds up to 5 GIG. Starting at $35/mo.",
    type: "website",
    locale: "en_US",
    siteName: "AT&T Preferred Dealer",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AT&T Fiber - High Speed Internet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet - AT&T Preferred Dealer",
    description: "Get AT&T Fiber Internet with speeds up to 5 GIG. Starting at $35/mo.",
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
        <link rel="dns-prefetch" href="https://attspecial.com" />
        <link rel="preload" as="image" href="/images/att-preferred-dealer.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AT&T Preferred Dealer",
              url: "https://attspecial.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://attspecial.com/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white">
        <Analytics />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}