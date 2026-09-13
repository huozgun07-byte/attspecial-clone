"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { IconGlobe, IconWireless, IconShield } from "@/components/Icons";
import { businessPhone, businessHours, telHref } from "@/lib/site-config";

const services = [
  {
    title: "Business Fiber",
    desc: "Dedicated fiber up to 5 GIGs with a 99.9% uptime SLA — symmetrical, so uploads to the cloud move as fast as downloads.",
    Icon: IconGlobe,
  },
  {
    title: "Wireless for teams",
    desc: "Unlimited lines with mobile hotspot and nationwide 5G, managed under one account and one bill.",
    Icon: IconWireless,
  },
  {
    title: "Security & IoT",
    desc: "Managed Wi-Fi, network security and connectivity for point-of-sale, sensors and fleet devices.",
    Icon: IconShield,
  },
];

export default function BusinessPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="att-container pt-5 pb-10 sm:pt-7 sm:pb-12" aria-labelledby="hero-title">
          <div className="surface-card px-6 py-14 sm:px-12 sm:py-20 text-center">
            <p className="att-eyebrow text-att-navy mb-3">AT&amp;T Business</p>
            <h1 id="hero-title" className="att-h2 mb-4 max-w-3xl mx-auto">
              AT&amp;T business internet and wireless
            </h1>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Fiber with an uptime guarantee, wireless lines for the team, and one account
              manager who knows your setup — quoted by an AT&amp;T Preferred Dealer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setShowModal(true)} className="btn-primary">
                Get a quote
              </button>
              <a href={telHref(businessPhone)} className="btn-outline">
                Call {businessPhone}
              </a>
            </div>
            <p className="att-fine text-att-gray-500 mt-5">{businessHours}</p>
          </div>
        </section>

        <section className="att-section bg-white" aria-labelledby="services-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="services-title" className="att-h2">What we quote for businesses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6" role="list">
              {services.map((service) => (
                <article key={service.title} className="plan-card" role="listitem">
                  <div className="plan-body text-center">
                    <div className="icon-badge" aria-hidden="true">
                      <service.Icon />
                    </div>
                    <h3 className="feature-title mb-2">{service.title}</h3>
                    <p className="text-att-gray-600 text-sm mb-6 flex-1">{service.desc}</p>
                    <button onClick={() => setShowModal(true)} className="btn-secondary w-full">
                      Learn more
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Business Inquiry">
          <div className="text-center">
            <p className="text-att-gray-600 mb-4">Call our business specialists:</p>
            <a href={telHref(businessPhone)} className="text-3xl font-bold text-att-navy hover:underline block mb-2">
              {businessPhone}
            </a>
            <p className="text-att-gray-500 text-sm">{businessHours}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
