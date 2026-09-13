import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AT&T Business Internet & Wireless Solutions",
  description:
    "AT&T Business fiber up to 5 GIGs with a 99.9% uptime SLA, wireless plans for your team, and managed security. Get a quote from an AT&T Preferred Dealer.",
  path: "/business",
  image: "/images/og-business.png",
  locale: "en_US",
  keywords: ["AT&T Business", "business fiber internet", "business wireless", "dedicated internet"],
});

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
