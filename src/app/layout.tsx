import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Internet - AT&T Preferred Dealer",
  description: "Get AT&T Fiber Internet with speeds up to 5 GIG. Starting at $35/mo. Free installation. $250 Reward Card offer. Check availability in your area.",
  keywords: ["AT&T Fiber", "Internet", "High Speed Internet", "Fiber Optic", "AT&T Dealer"],
  openGraph: {
    title: "Internet - AT&T Preferred Dealer",
    description: "Get AT&T Fiber Internet with speeds up to 5 GIG. Starting at $35/mo.",
    type: "website",
    locale: "en_US",
    siteName: "AT&T Preferred Dealer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://attspecial.com" />
        <link rel="dns-prefetch" href="https://attspecial.com" />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white">
        <Analytics />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}