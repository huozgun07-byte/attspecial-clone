"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import HeroPanel from "@/components/HeroPanel";
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
        <HeroPanel image="/images/hero-business.jpg" imagePosition="object-[65%_center]">
          <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Business</p>
          <h1 id="hero-title" className="att-display mb-5">
            AT&amp;T business internet and wireless
          </h1>
          <p className="text-white/85 text-lg mb-8 max-w-xl">
            Fiber with an uptime guarantee, wireless lines for the team, and one account
            manager who knows your setup — quoted by an AT&amp;T Preferred Dealer.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowModal(true)} className="btn-on-dark">
              Get a quote
            </button>
            <a href={telHref(businessPhone)} className="btn-outline-white">
              Call {businessPhone}
            </a>
          </div>
          <p className="att-fine text-white/70 mt-5">{businessHours}</p>
        </HeroPanel>

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
