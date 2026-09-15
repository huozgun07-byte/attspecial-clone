import type { Metadata } from "next";
import { pageMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AT&T Fiber FAQ — Speeds, Equipment & Installation",
  description:
    "Answers to the most common AT&T Fiber questions: availability, equipment, data caps, AutoPay discounts, installation times, and the $200 Reward Card offer.",
  path: "/faq",
  image: "/images/og-image.png",
  locale: "en_US",
  keywords: ["AT&T Fiber FAQ", "fiber internet questions", "AT&T installation", "AT&T data caps"],
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      {children}
    </>
  );
}
