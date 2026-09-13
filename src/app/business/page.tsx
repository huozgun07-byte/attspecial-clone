"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { IconGlobe, IconWireless, IconShield } from "@/components/Icons";
import { businessPhone, businessHours, telHref } from "@/lib/site-config";

const services = [
  { title: "Business Fiber", desc: "Dedicated fiber internet up to 5 GIGs with 99.9% uptime SLA", Icon: IconGlobe },
  { title: "Wireless Plans", desc: "Unlimited data, mobile hotspot, and 5G access for your team", Icon: IconWireless },
  { title: "Security & IoT", desc: "Cybersecurity solutions, managed Wi-Fi, and IoT connectivity", Icon: IconShield },
];

export default function BusinessPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24" aria-labelledby="hero-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">AT&T Business Solutions</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Reliable connectivity, advanced security, and dedicated support for businesses of all sizes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto bg-blue-700 text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Get a Quote</button>
              <a href={telHref(businessPhone)} className="w-full sm:w-auto border-2 border-blue-700 text-blue-700 py-4 px-8 rounded-full font-semibold text-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Call {businessPhone}</a>
            </div>
            <p className="text-sm text-gray-500 mt-4">{businessHours}</p>
          </div>
        </section>

        <section className="py-16 bg-white" aria-labelledby="services-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12"><h2 id="services-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Business Services</h2></div>
            <div className="grid md:grid-cols-3 gap-8" role="list">
              {services.map((service) => (
                <article key={service.title} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow" role="listitem">
                  <div className="icon-badge" aria-hidden="true">
                    <service.Icon />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Learn More</button>
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
            <p className="text-gray-600 mb-4">Call our business specialists:</p>
            <a href={telHref(businessPhone)} className="text-2xl font-bold text-blue-700 hover:underline block mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">{businessPhone}</a>
            <p className="text-gray-500">{businessHours}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
