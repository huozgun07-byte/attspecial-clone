"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AvailabilityModal from "@/components/AvailabilityModal";
import { phoneNumber, telHref } from "@/lib/site-config";

export default function ATTInternetAirPage() {
  const [showFormModal, setShowFormModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24" aria-labelledby="hero-title">
          <Image
            src="/images/hero-internet-air.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[70%_20%]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gray-900/70" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              AT&T Internet Air™
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              No annual contract. No hidden fees. Just fast, reliable home internet over the AT&T 5G network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setShowFormModal(true)}
                className="w-full sm:w-auto bg-blue-700 text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Check Availability
              </button>
              <a
                href={telHref(phoneNumber)}
                className="w-full sm:w-auto border-2 border-white text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Call {phoneNumber}
              </a>
            </div>
            <p className="text-sm text-gray-300">*Price after $5/mo AutoPay & Paperless bill discount. Taxes & fees extra.</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white" aria-labelledby="features-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="features-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why choose AT&T Internet Air?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Simple Setup", desc: "Plug in the All-Fi Hub and connect in minutes. No technician visit required.", icon: "📦" },
                { title: "No Annual Contract", desc: "Cancel anytime without early termination fees. Month-to-month flexibility.", icon: "📄" },
                { title: "5G Network", desc: "Powered by AT&T's nationwide 5G network for reliable connectivity.", icon: "📶" },
              ].map((feature, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-gray-50" aria-labelledby="pricing-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="pricing-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            </div>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <p className="text-blue-700 font-semibold mb-2">AT&T Internet Air</p>
                <div className="flex items-baseline justify-center gap-2" aria-label="Price">
                  <span className="text-5xl font-bold text-gray-900">$55</span>
                  <span className="text-gray-500">/mo*</span>
                </div>
              </div>
              <ul className="space-y-4 text-gray-600 mb-8" role="list">
                {[
                  "Up to 100 Mbps download speeds†",
                  "Unlimited data - no overage fees",
                  "All-Fi Hub included at no extra cost",
                  "No annual contract required",
                  "AutoPay & Paperless bill: Save $5/mo",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowFormModal(true)}
                className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Check Availability
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                *$55/mo w/ AutoPay & Paperless bill ($60/mo w/o). †Speeds based on wired connection. Actual speeds vary.
              </p>
            </div>
          </div>
        </section>

        {/* Coverage Check */}
        <section className="py-16 bg-white" aria-labelledby="coverage-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="coverage-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Check Availability in Your Area</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">AT&T Internet Air is expanding rapidly. Enter your address to see if you're covered.</p>
            <button
              onClick={() => setShowFormModal(true)}
              className="bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Check My Address
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      {showFormModal && (
        <AvailabilityModal
          source="att-internet-air"
          title="Check For Deals"
          submitLabel="Shop Plans"
          showHelpText={false}
          onClose={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
}
