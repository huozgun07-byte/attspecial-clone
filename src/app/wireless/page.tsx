"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AvailabilityModal from "@/components/AvailabilityModal";
import HeroPanel from "@/components/HeroPanel";
import { IconPhone } from "@/components/Icons";
import { phoneNumber, telHref } from "@/lib/site-config";

const phones = ["iPhone 15 Pro", "Samsung Galaxy S24", "Google Pixel 8"];

export default function WirelessPage() {
  const [showFormModal, setShowFormModal] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroPanel image="/images/hero-wireless.jpg" imagePosition="object-[62%_center]">
          <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Wireless</p>
          <h1 id="hero-title" className="att-display mb-5">
            The latest phones on America&apos;s most reliable 5G network
          </h1>
          <p className="text-white/90 text-lg max-w-xl mb-8">
            Unlimited plans, trade-in offers, and 5G coverage built for the whole family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setShowFormModal(true)} className="btn-on-dark">
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
              <h2 id="phones-title" className="att-h2">Popular phones</h2>
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
                      From $0/mo with eligible trade-in
                    </p>
                    <button onClick={() => setShowFormModal(true)} className="btn-secondary w-full">
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
            <h2 id="wireless-cta-title" className="att-h2 mb-3">Ready to switch?</h2>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Talk to an AT&amp;T Preferred Dealer specialist and find the plan that fits your household.
            </p>
            <a href={telHref(phoneNumber)} className="btn-primary">
              Call {phoneNumber}
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {showFormModal && (
        <AvailabilityModal
          source="wireless"
          title="Check For Deals"
          submitLabel="Shop Plans"
          showUnit={false}
          showMoving={false}
          showHelpText={false}
          onClose={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
}
