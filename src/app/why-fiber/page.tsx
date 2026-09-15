import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/TrustStrip";
import HeroPanel from "@/components/HeroPanel";
import WizardButton from "@/components/WizardButton";
import { IconFiber, IconGlobe, IconShield } from "@/components/Icons";
import {
  fiberVsCable,
  uploadComparison,
  wifiGateway,
  activeArmor,
  whyFiberFaqs,
} from "@/lib/knowledge";
import { plans, phoneNumber, telHref } from "@/lib/site-config";
import { siteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Why AT&T Fiber — Fiber vs Cable, Wi-Fi Gateway & ActiveArmor",
  description:
    "How AT&T Fiber differs from cable and copper, why upload speeds matter, what the AT&T Wi-Fi gateway does, and how ActiveArmor protects your devices. Plain answers from an AT&T Preferred Dealer.",
  path: "/why-fiber",
  keywords: [
    "fiber vs cable internet",
    "AT&T Fiber upload speed",
    "AT&T Wi-Fi gateway",
    "All-Fi Hub",
    "AT&T ActiveArmor",
    "is fiber internet better",
  ],
});

const sections = [
  { section: fiberVsCable, Icon: IconFiber },
  { section: wifiGateway, Icon: IconGlobe },
  { section: activeArmor, Icon: IconShield },
];

export default function WhyFiberPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Why AT&T Fiber", item: `${siteUrl}/why-fiber` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: whyFiberFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="att-container pt-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-att-gray-600">
            <li><Link href="/" className="hover:text-att-navy">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-att-ink font-medium">Why AT&amp;T Fiber</li>
          </ol>
        </nav>

        {/* Intro */}
        <HeroPanel image="/images/hero-why-fiber.jpg" imagePosition="object-[70%_center]">
              <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Preferred Dealer</p>
              <h1 id="hero-title" className="att-display mb-5">Why AT&amp;T Fiber is different</h1>
              <p className="text-white/85 text-lg mb-6 max-w-xl">
                At the same download tier every provider looks alike. What actually differs at home
                is the line itself, upload speed, the hardware you pay for and what filters your
                traffic — this page covers all four.
              </p>
              <div className="flex flex-wrap gap-3">
                <WizardButton source="why-fiber-hero" className="btn-on-dark">
                  Check my address
                </WizardButton>
                <a href={telHref(phoneNumber)} className="btn-outline-white">
                  Call {phoneNumber}
                </a>
              </div>
        </HeroPanel>

        {/* Upload comparison */}
        <section className="reveal att-section bg-att-gray-100 border-y border-att-gray-200" aria-labelledby="upload-title">
          <div className="att-container">
            <div className="max-w-2xl mb-8">
              <h2 id="upload-title" className="att-h2 mb-3">{uploadComparison.title}</h2>
              <p className="att-lead">{uploadComparison.lead}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {uploadComparison.rows.map((row) => (
                <div key={row.plan} className="bg-white rounded-att p-6 border border-att-gray-200">
                  <p className="att-fine font-bold text-att-navy uppercase tracking-wide mb-2">{row.plan}</p>
                  <p className="text-2xl font-bold text-att-ink leading-tight">{row.claim}</p>
                  <p className="att-fine text-att-gray-600 mt-2">than comparable cable service</p>
                </div>
              ))}
            </div>

            <p className="att-fine text-att-gray-500 mt-6 max-w-3xl">{uploadComparison.footnote}</p>
          </div>
        </section>

        {/* The three knowledge sections */}
        {sections.map(({ section, Icon }, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`att-section ${index % 2 === 1 ? "bg-att-gray-100 border-y border-att-gray-200" : "bg-white"}`}
            aria-labelledby={`${section.id}-title`}
          >
            <div className="att-container">
              <div className="max-w-2xl mb-10">
                <span className="icon-badge mb-4" aria-hidden="true">
                  <Icon />
                </span>
                <h2 id={`${section.id}-title`} className="att-h2 mb-3">{section.title}</h2>
                <p className="att-lead">{section.lead}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {section.points.map((point) => (
                  <div key={point.title}>
                    <h3 className="font-bold text-att-ink text-[17px] mb-2">{point.title}</h3>
                    <p className="text-att-gray-600 leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>

              {section.footnote && (
                <p className="att-fine text-att-gray-500 mt-8 max-w-3xl">{section.footnote}</p>
              )}
            </div>
          </section>
        ))}

        {/* Sizing a plan */}
        <section className="reveal att-section bg-white" aria-labelledby="sizing-title">
          <div className="att-container">
            <div className="max-w-2xl mb-8">
              <h2 id="sizing-title" className="att-h2 mb-3">How much speed does your house actually need?</h2>
              <p className="att-lead">
                Device counts are a rough guide, not a limit. What matters is how many devices are
                doing something demanding at the same moment — a dozen idle smart bulbs cost you
                nothing, two simultaneous 4K uploads do.
              </p>
            </div>

            {/* Phones get one card per plan; the four-column table needs sm+ width. */}
            <ul className="sm:hidden space-y-3" role="list">
              {plans.map((plan) => (
                <li key={plan.name} className="rounded-att border border-att-gray-200 bg-white p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-bold text-att-ink text-lg">{plan.speed}</span>
                    <span className="font-bold text-att-ink">{plan.price}/mo</span>
                  </div>
                  <p className="text-sm text-att-gray-600 mt-1">{plan.devices}</p>
                  <p className="text-sm text-att-gray-600">{plan.bestFor}</p>
                </li>
              ))}
            </ul>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <caption className="sr-only">AT&amp;T Fiber plans by household size and typical use</caption>
                <thead>
                  <tr className="border-b-2 border-att-gray-200">
                    <th scope="col" className="py-3 pr-4 att-fine font-bold text-att-navy uppercase tracking-wide">Plan</th>
                    <th scope="col" className="py-3 pr-4 att-fine font-bold text-att-navy uppercase tracking-wide">Devices at once</th>
                    <th scope="col" className="py-3 pr-4 att-fine font-bold text-att-navy uppercase tracking-wide">Sized for</th>
                    <th scope="col" className="py-3 att-fine font-bold text-att-navy uppercase tracking-wide">From</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.name} className="border-b border-att-gray-200 align-top">
                      <th scope="row" className="py-4 pr-4 font-bold text-att-ink whitespace-nowrap">
                        {plan.speed}
                      </th>
                      <td className="py-4 pr-4 text-att-gray-600 text-sm">{plan.devices}</td>
                      <td className="py-4 pr-4 text-att-gray-600 text-sm">{plan.bestFor}</td>
                      <td className="py-4 font-bold text-att-ink whitespace-nowrap">{plan.price}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="att-fine text-att-gray-500 mt-4">
              Pricing shown reflects new-customer discounts for 12 months plus the $10/mo AutoPay
              &amp; Paperless bill discount. Speeds quoted on a wired connection; 1 GIG and 5 GIG have
              limited availability by area.
            </p>

            <TrustStrip className="mt-10" />
          </div>
        </section>

        {/* FAQ */}
        <section className="reveal att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="why-faq-title">
          <div className="att-container max-w-3xl">
            <h2 id="why-faq-title" className="att-h2 mb-8">Questions people ask before ordering</h2>
            <div className="space-y-6">
              {whyFiberFaqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-att p-6 border border-att-gray-200">
                  <h3 className="font-bold text-att-ink text-[17px] mb-2">{faq.q}</h3>
                  <p className="text-att-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-att-gray-600">
              More answers are on the{" "}
              <Link href="/faq" className="text-att-navy font-bold underline underline-offset-2">
                full FAQ
              </Link>
              , or compare{" "}
              <Link href="/att-internet-air" className="text-att-navy font-bold underline underline-offset-2">
                AT&amp;T Internet Air
              </Link>{" "}
              if fiber hasn&apos;t reached your street yet.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal att-section bg-att-dark" aria-labelledby="why-cta-title">
          <div className="att-container text-center max-w-2xl">
            <h2 id="why-cta-title" className="att-display mb-3">
              See which of these you can actually get
            </h2>
            <p className="text-white/80 text-lg mb-7">
              Fiber is built street by street. Answer a few quick questions and we&apos;ll tell you
              exactly what reaches your address.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <WizardButton source="why-fiber-footer" className="btn-on-dark">
                Check my address
              </WizardButton>
              <a href={telHref(phoneNumber)} className="btn-outline-white">
                Call {phoneNumber}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
