"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

const plans = [
  {
    name: "Basic",
    speed: "300 Mbps",
    price: "$35",
    details: "Price after discounts: $15/mo for 12 mos for new customers and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-300",
    badge: "Best Value",
  },
  {
    name: "Home",
    speed: "500 Mbps",
    price: "$40",
    details: "Price after discounts: $15/mo for 12 mos for new customers and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-500",
    badge: "Popular",
  },
  {
    name: "Smart Home",
    speed: "1 GIG",
    price: "$50",
    details: "Ltd. avail/areas. Price after discounts $30/mo for 12 mos for new customers, and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-1g",
    badge: "Recommended",
    highlighted: true,
  },
  {
    name: "Elite",
    speed: "5 GIG",
    price: "$95",
    details: "Ltd avail/areas. Price after discounts $30/mo for 12 mos for new customers and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-5g",
    badge: "Ultimate",
  },
];

const phoneNumber = "866.307.3525";
const businessPhone = "866.803.4362";

export default function Home() {
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24" aria-labelledby="hero-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <p className="text-blue-700 font-semibold text-sm mb-4" role="status">Get a $200 Reward Card with purchase of an AT&T Fiber plan (300 Mbps or higher).</p>
                <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Get started with <br />
                  <span className="text-blue-700">AT&T Fiber® 1 Gig</span>
                </h1>
                <div className="flex items-baseline gap-2 mb-2" aria-label="Price">
                  <span className="text-4xl sm:text-5xl font-bold text-gray-900">$50</span>
                  <span className="text-gray-500">/mo*</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">+ taxes & fees for 12 mos. w/ elig AutoPay & Paperless bill</p>
                <p className="text-sm text-gray-600 mb-8">
                  Price after discounts $30/mo for 12 mos new customers, and $10/mo AutoPay & Paperless bill. Discounts start w/in 3 bills.
                  <a
                    href="#modal-terms-1g"
                    className="text-blue-700 font-medium hover:underline ml-1"
                    onClick={(e) => { e.preventDefault(); setShowTermsModal("modal-terms-1g"); }}
                  >
                    See details
                  </a>
                </p>

                {/* Address Form */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" role="region" aria-label="Check availability">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Find the best plan for you</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setShowFormModal(true); }} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address*</label>
                      <input
                        type="text"
                        id="street"
                        placeholder="35 Magnolia RD"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                        autoComplete="street-address"
                      />
                      <p className="text-xs text-gray-500 mt-1">Please provide a street address (e.g. 35 Magnolia RD).</p>
                    </div>
                    <div>
                      <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Apt/Unit</label>
                      <input
                        type="text"
                        id="unit"
                        placeholder="Apt, Suite, Unit (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        autoComplete="address-line2"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip Code*</label>
                      <input
                        type="text"
                        id="zip"
                        placeholder="23225"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                        autoComplete="postal-code"
                      />
                      <p className="text-xs text-gray-500 mt-1">Please provide a valid zip code (e.g. 23225).</p>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      I'm moving to this address
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Shop internet
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side - Reward Card & Fiber Logo */}
              <div className="flex flex-col items-center gap-8">
<Image
                src="/images/att-reward-card.svg"
                alt="AT&T Reward Card"
                width={400}
                height={250}
                className="w-full max-w-md"
                priority
              />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get a $250 AT&T Visa® Reward Card</h3>
                  <p className="text-sm text-gray-600 mb-4">with purchase of AT&T Fiber.</p>
                  <a
                    href="#modal-terms-250-visa"
                    className="text-blue-700 text-sm font-medium hover:underline"
                    onClick={(e) => { e.preventDefault(); setShowRewardModal("modal-terms-250-visa"); }}
                  >
                    See details.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 sm:py-24 bg-white" aria-labelledby="plans-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="plans-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Find the best plan for you</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  plan={plan}
                  onCtaClick={() => setShowFormModal(true)}
                  onDetailsClick={(modal) => setShowTermsModal(modal)}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 text-xs text-gray-500 max-w-3xl mx-auto space-y-2" role="contentinfo">
              <p>† Speed based on wired connection. Actual speeds may vary. For 5GIG, single device wired speed maximum 4.7Gbps. For more info, go to www.att.com/speed101.</p>
              <p>* Limited time offer. Subject to change. New AT&T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&T Fiber plan ($15/mo w/300M or 500M; $32/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      {showBusinessModal && (
        <Modal onClose={() => setShowBusinessModal(false)} title="Looking for great deals on AT&T Business?">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Now</h3>
            <a
              href={`tel:${businessPhone.replace(/\./g, "")}`}
              className="text-3xl font-bold text-blue-700 hover:underline block mb-2"
            >
              {businessPhone}
            </a>
            <p className="text-gray-600">Mon–Fri 6AM–6PM | Sat 9AM–3PM MST</p>
          </div>
        </Modal>
      )}

      {showFormModal && (
        <Modal onClose={() => setShowFormModal(false)} title="Check For Deals">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowFormModal(false); }}>
            <div>
              <label htmlFor="modal-street" className="block text-sm font-medium text-gray-700 mb-1">Street Address*</label>
              <input
                type="text"
                id="modal-street"
                placeholder="35 Magnolia RD"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                autoComplete="street-address"
              />
            </div>
            <div>
              <label htmlFor="modal-unit" className="block text-sm font-medium text-gray-700 mb-1">Apt/Unit</label>
              <input
                type="text"
                id="modal-unit"
                placeholder="Apt, Suite, Unit (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                autoComplete="address-line2"
              />
            </div>
            <div>
              <label htmlFor="modal-zip" className="block text-sm font-medium text-gray-700 mb-1">Zip Code*</label>
              <input
                type="text"
                id="modal-zip"
                placeholder="23225"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                autoComplete="postal-code"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              I'm moving to this address
            </label>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors"
            >
              Shop Plans
            </button>
          </form>
        </Modal>
      )}

      {showTermsModal && (
        <Modal onClose={() => setShowTermsModal(null)} title={showTermsModal.includes("250") ? "Up to a $250 Reward Cards" : "$200 Reward Card"} large>
          <div className="space-y-4 text-sm text-gray-600">
            {showTermsModal.includes("250") ? (
              <>
                <p className="font-semibold">$250 REWARD CARD OFFER: Ends 12/27/25.</p>
                <p>$250 AT&T Visa® Reward Card for purchase of any AT&T Fiber speeds. For new residential AT&T Fiber customers who purchase through attspecial.com. Redemption req'd. Employees and residents of select multi-dwelling units not eligible.</p>
              </>
            ) : (
              <>
                <p className="font-semibold">$200 REWARD CARD OFFER: Ends 3/31/26.</p>
                <p>$200 AT&T Visa® Reward Card for purchase of an AT&T Fiber plan (300Mbps or higher). For new residential AT&T Fiber customers who order through attspecial.com or by calling the number on the site. Redemption req'd.</p>
              </>
            )}
            <p className="text-xs text-gray-500">Card issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p>
          </div>
        </Modal>
      )}

      {showRewardModal && (
        <Modal onClose={() => setShowRewardModal(null)} title="Plan Details" large>
          <div className="space-y-4 text-sm text-gray-600">
            <p className="font-semibold">DISCOUNTED FIBER OFFER: Subj to change.</p>
            <p>New AT&T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&T Fiber plan ($15/mo w/300M or 500M; $32/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
            <p className="font-semibold">Autopay & Paperless Bill Discount:</p>
            <p>$10/mo if enrolled in Autopay & paperless billing w/ your bank account or the AT&T Points Plus® Card from Citi. Discount reduced to $5/mo when enrolled with a debit card. No discount if enrolled with any other credit card.</p>
            <p className="font-semibold">Taxes & Fees:</p>
            <p>Up to $99 installation fee may apply, plus tax where applicable. Monthly State Cost Recovery charge applies in NV, OH, TX.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function PlanCard({ plan, onCtaClick, onDetailsClick }: { plan: typeof plans[0]; onCtaClick: () => void; onDetailsClick: (modal: string) => void }) {
  return (
    <article className={`relative bg-white rounded-xl border ${plan.highlighted ? "border-blue-300 shadow-lg ring-2 ring-blue-200" : "border-gray-200 shadow-sm hover:shadow-md"} transition-shadow p-6 flex flex-col h-full`} role="listitem">
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded-full">
          {plan.badge}
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
        <p className="text-blue-700 font-semibold">AT&T Fiber</p>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">{plan.speed}</p>
      </div>
      <div className="mb-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
        <span className="text-gray-500">/mo*</span>
      </div>
      <p className="text-xs text-gray-500 mb-4 flex-1">{plan.details}</p>
      <a
        href={`#${plan.modal}`}
        className="text-blue-700 text-sm font-medium hover:underline block text-center mb-3"
        onClick={(e) => { e.preventDefault(); onDetailsClick(plan.modal); }}
      >
        See details
      </a>
      <button
        onClick={onCtaClick}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          plan.highlighted
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {plan.cta}
      </button>
    </article>
  );
}