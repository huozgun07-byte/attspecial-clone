"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWizard } from "@/components/WizardProvider";
import HeroPanel from "@/components/HeroPanel";
import { IconBox, IconDocument, Icon5G } from "@/components/Icons";
import { phoneNumber, telHref } from "@/lib/site-config";

const airFeatures = [
  {
    title: "You set it up yourself",
    desc: "The All-Fi Hub arrives ready to go. Plug it in, follow the app, and you're online in minutes — no technician appointment to wait around for.",
    Icon: IconBox,
  },
  {
    title: "Month to month",
    desc: "No annual contract and no early termination fee. Useful if you're renting, between homes, or waiting for fiber to reach your street.",
    Icon: IconDocument,
  },
  {
    title: "Runs on AT&T 5G",
    desc: "Your home connection uses the same nationwide 5G network as AT&T phones, with unlimited data and no overage charges.",
    Icon: Icon5G,
  },
];

const included = [
  "Up to 100 Mbps download speeds†",
  "Unlimited data — no overage fees",
  "All-Fi Hub included at no extra cost",
  "No annual contract required",
  "AutoPay & Paperless bill: Save $5/mo",
];

export default function ATTInternetAirPage() {
  const { openWizard } = useWizard();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroPanel image="/images/hero-internet-air-3.jpg" imagePosition="object-[70%_center]">
          <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Internet Air™</p>
          <h1 id="hero-title" className="att-display mb-5 max-w-2xl">
            AT&amp;T Internet Air™ — home internet over 5G
          </h1>
          <p className="text-white/90 text-lg max-w-xl mb-8">
            For addresses fiber hasn&apos;t reached yet: up to 100 Mbps, unlimited data,
            $55/mo with AutoPay, and you plug it in yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => openWizard({ source: "att-internet-air" })} className="btn-on-dark">
              Check availability
            </button>
            <a href={telHref(phoneNumber)} className="btn-outline-white">
              Call {phoneNumber}
            </a>
          </div>
          <p className="att-fine text-white/75 mt-6 max-w-xl">
            *Price after $5/mo AutoPay &amp; Paperless bill discount. Taxes &amp; fees extra.
          </p>
        </HeroPanel>

        {/* Features */}
        <section className="reveal att-section bg-white" aria-labelledby="features-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="features-title" className="att-h2">What AT&amp;T Internet Air is good at</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
              {airFeatures.map((feature) => (
                <div key={feature.title} className="feature-card">
                  <div className="icon-badge" aria-hidden="true">
                    <feature.Icon />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="reveal att-section bg-att-gray-100" aria-labelledby="pricing-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="pricing-title" className="att-h2">One plan, one price</h2>
            </div>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-att-gray-200">
              <div className="text-center mb-8">
                <p className="plan-label">AT&amp;T Internet Air</p>
                <div className="flex items-baseline justify-center gap-1" aria-label="Price">
                  <span className="text-att-ink font-bold text-5xl">$55</span>
                  <span className="text-att-gray-600">/mo*</span>
                </div>
              </div>
              <ul className="space-y-4 text-att-gray-700 mb-8" role="list">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-att-navy flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => openWizard({ source: "att-internet-air" })} className="btn-primary w-full">
                Check availability
              </button>
              <p className="att-fine text-att-gray-500 text-center mt-4">
                *$55/mo w/ AutoPay &amp; Paperless bill ($60/mo w/o). †Speeds based on wired connection. Actual speeds vary.
              </p>
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="reveal att-section bg-white" aria-labelledby="coverage-title">
          <div className="att-container text-center">
            <h2 id="coverage-title" className="att-h2 mb-3">Is it available where you live?</h2>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Coverage depends on the 5G signal at your specific address. Give us the address and
              we&apos;ll check both Internet Air and Fiber, then tell you which one you should actually take.
            </p>
            <button onClick={() => openWizard({ source: "att-internet-air" })} className="btn-primary">
              Check my address
            </button>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
