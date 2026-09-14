"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWizard } from "@/components/WizardProvider";
import HeroPanel from "@/components/HeroPanel";
import { IconPhone } from "@/components/Icons";
import { phoneNumber, telHref } from "@/lib/site-config";

const phones = ["iPhone 15 Pro", "Samsung Galaxy S24", "Google Pixel 8"];

export default function WirelessPage() {
  const { openWizard } = useWizard();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroPanel image="/images/hero-wireless.jpg" imagePosition="object-[62%_center]">
          <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Wireless</p>
          <h1 id="hero-title" className="att-display mb-5">
            AT&amp;T wireless plans and phone deals
          </h1>
          <p className="text-white/90 text-lg max-w-xl mb-8">
            Unlimited lines, trade-in credits on the latest handsets, and nationwide 5G —
            bundled with your internet if you want a single bill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => openWizard({ source: "wireless" })} className="btn-on-dark">
              Shop phones
            </button>
            <a href={telHref(phoneNumber)} className="btn-outline-white">
              Call {phoneNumber}
            </a>
          </div>
        </HeroPanel>

        <section className="att-section bg-white" aria-labelledby="phones-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="phones-title" className="att-h2">Phones people order most</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6" role="list">
              {phones.map((phone) => (
                <article key={phone} className="plan-card" role="listitem">
                  <div className="plan-body text-center">
                    <div className="icon-badge" aria-hidden="true">
                      <IconPhone />
                    </div>
                    <h3 className="feature-title mb-2">{phone}</h3>
                    <p className="text-att-gray-600 text-sm mb-6 flex-1">
                      From $0/mo with an eligible trade-in and unlimited plan
                    </p>
                    <button onClick={() => openWizard({ source: "wireless" })} className="btn-secondary w-full">
                      View deals
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="att-fine text-att-gray-500 text-center mt-8 max-w-3xl mx-auto">
              Trade-in offers require eligible device in good condition and qualifying unlimited plan.
              Credits applied over 36 months. Limited time offer, subject to change.
            </p>
          </div>
        </section>

        <section className="att-section bg-att-gray-100" aria-labelledby="wireless-cta-title">
          <div className="att-container text-center">
            <h2 id="wireless-cta-title" className="att-h2 mb-3">Not sure how many lines you need?</h2>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Tell a specialist what phones you have now and how many people are on the account.
              They&apos;ll work out the trade-in credits and what the bill actually lands at.
            </p>
            <a href={telHref(phoneNumber)} className="btn-primary">
              Call {phoneNumber}
            </a>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
