import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How this AT&T Preferred Dealer site collects, uses, and protects the information you share when checking availability or requesting a callback.",
  path: "/privacy",
  image: "/images/og-image.png",
  locale: "en_US",
  keywords: [],
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
