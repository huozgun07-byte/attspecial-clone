"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { IconGlobe, IconWireless, IconShield } from "@/components/Icons";
import { businessPhone, businessHours, telHref } from "@/lib/site-config";

const services = [
  { title: "Business Fiber", desc: "Dedicated fiber internet up to 5 GIGs with 99.9% uptime SLA.", Icon: IconGlobe },
  { title: "Wireless Plans", desc: "Unlimited data, mobile hotspot, and 5G access for your team.", Icon: IconWireless },
  { title: "Security & IoT", desc: "Cybersecurity solutions, managed Wi-Fi, and IoT connectivity.", Icon: IconShield },
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
              Connectivity, security, and support built for business
            </h1>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Reliable fiber and wireless for businesses of every size, backed by a dedicated
              AT&amp;T Preferred Dealer team.
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
              <h2 id="services-title" className="att-h2">Business services</h2>
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
