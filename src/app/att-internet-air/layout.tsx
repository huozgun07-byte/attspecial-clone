import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AT&T Internet Air — 5G Home Internet",
  description:
    "AT&T Internet Air brings home internet over AT&T's 5G network for $55/mo with AutoPay. No annual contract, no technician visit, unlimited data. Check availability at your address.",
  path: "/att-internet-air",
  image: "/images/og-internet-air.png",
  locale: "en_US",
  keywords: ["AT&T Internet Air", "5G home internet", "wireless home internet", "no contract internet"],
});

export default function AttInternetAirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
