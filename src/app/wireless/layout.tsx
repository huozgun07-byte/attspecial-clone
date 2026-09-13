import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AT&T Wireless Plans & Phone Deals",
  description:
    "Shop AT&T wireless plans and the latest phones from $0/mo with eligible trade-in, on America's most reliable 5G network. Talk to an AT&T Preferred Dealer specialist.",
  path: "/wireless",
  image: "/images/og-wireless.png",
  locale: "en_US",
  keywords: ["AT&T wireless", "AT&T phone deals", "5G plans", "iPhone trade-in", "unlimited plans"],
});

export default function WirelessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
