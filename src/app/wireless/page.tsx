"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AvailabilityModal from "@/components/AvailabilityModal";
import { phoneNumber, telHref } from "@/lib/site-config";

export default function WirelessPage() {
  const [showFormModal, setShowFormModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24" aria-labelledby="hero-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">AT&T Wireless</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Get the best deals on the latest smartphones with America's most reliable 5G network.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setShowFormModal(true)} className="w-full sm:w-auto bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Shop Phones</button>
              <a href={telHref(phoneNumber)} className="w-full sm:w-auto border-2 border-blue-700 text-blue-700 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Call {phoneNumber}</a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" aria-labelledby="phones-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12"><h2 id="phones-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Popular Phones</h2></div>
            <div className="grid md:grid-cols-3 gap-8" role="list">
              {["iPhone 15 Pro", "Samsung Galaxy S24", "Google Pixel 8"].map((phone, i) => (
                <article key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow" role="listitem">
                  <div className="text-6xl mb-4" aria-hidden="true">📱</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{phone}</h3>
                  <p className="text-gray-600 mb-4">From $0/mo with eligible trade-in</p>
                  <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">View Deals</button>
                </article>
              ))}
            </div>
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
