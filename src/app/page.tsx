"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import AddressCheckFlow from "@/components/AddressCheckFlow";
import AvailabilityModal from "@/components/AvailabilityModal";
import { AddressFormData } from "@/components/AddressForm";
import { AvailabilityResponse } from "@/lib/api";
import { plans, features, steps, phoneNumber, businessPhone, businessHours, telHref, type Plan, type Feature } from "@/lib/site-config";

export default function Home() {
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState<string | null>(null);
  // Shared across the hero form and the plan-card modal so a visitor who already
  // checked their address once isn't asked to re-enter it on the same page.
  const [checkedAddress, setCheckedAddress] = useState<AddressFormData | undefined>(undefined);
  const [checkedResult, setCheckedResult] = useState<AvailabilityResponse | undefined>(undefined);
  const handleAddressResult = (data: AddressFormData, result: AvailabilityResponse) => {
    setCheckedAddress(data);
    setCheckedResult(result);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24" aria-labelledby="hero-title">
          <Image
            src="/images/hero-family.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-900/10" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div>
                <Image
                  src="/images/att-fiber-logo-whtblue.png"
                  alt="AT&T Fiber"
                  width={170}
                  height={36}
                  className="h-6 w-auto mb-5"
                />
                <p className="text-blue-200 font-semibold text-sm mb-4" role="status">Get a $200 Reward Card with purchase of an AT&T Fiber plan (300 Mbps or higher).</p>
                <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Get started with <br />
                  <span className="text-blue-300">AT&T Fiber® 1 Gig</span>
                </h1>
                <div className="flex items-baseline gap-2 mb-2" aria-label="Price">
                  <span className="text-4xl sm:text-5xl font-bold text-white">$50</span>
                  <span className="text-gray-300">/mo*</span>
                </div>
                <p className="text-sm text-gray-200 mb-6">+ taxes & fees for 12 mos. w/ elig AutoPay & Paperless bill</p>
                <p className="text-sm text-gray-200 mb-8">
                  Price after discounts $30/mo for 12 mos new customers, and $10/mo AutoPay & Paperless bill. Discounts start w/in 3 bills.
                  <a
                    href="#modal-terms-1g"
                    className="text-blue-300 font-medium hover:underline ml-1"
                    onClick={(e) => { e.preventDefault(); setShowTermsModal("modal-terms-1g"); }}
                  >
                    See details
                  </a>
                </p>
              </div>

              {/* Right Side - Address Form */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100" role="region" aria-label="Check availability">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find the best plan for you</h3>
                <AddressCheckFlow
                  idPrefix="hero"
                  source="home-hero"
                  submitLabel="Shop internet"
                  initialData={checkedAddress}
                  initialResult={checkedResult}
                  onResult={handleAddressResult}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reward Card Promo Strip */}
        <section className="py-12 bg-blue-50 border-b border-gray-200" aria-labelledby="reward-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
              <Image
                src="/images/att-reward-card.png"
                alt="AT&T Reward Card"
                width={140}
                height={90}
                className="w-32 sm:w-40 flex-shrink-0"
              />
              <div>
                <h2 id="reward-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Get a $250 AT&T Visa® Reward Card</h2>
                <p className="text-base sm:text-lg text-gray-600">
                  with purchase of AT&T Fiber.{" "}
                  <a
                    href="#modal-terms-250-visa"
                    className="text-blue-700 font-semibold hover:underline"
                    onClick={(e) => { e.preventDefault(); setShowRewardModal("modal-terms-250-visa"); }}
                  >
                    See details.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why AT&T Fiber Section */}
        <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200" aria-labelledby="why-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="why-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why choose AT&T Fiber</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A 100% fiber network built for how your household actually uses the internet.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
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

        {/* How It Works Section */}
        <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-200" aria-labelledby="steps-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="steps-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Getting connected is easy</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center sm:text-left">
                  <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center mb-4 mx-auto sm:mx-0" aria-hidden="true">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
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
              href={telHref(businessPhone)}
              className="text-3xl font-bold text-blue-700 hover:underline block mb-2"
            >
              {businessPhone}
            </a>
            <p className="text-gray-600">{businessHours}</p>
          </div>
        </Modal>
      )}

      {showFormModal && (
        <AvailabilityModal
          source="home-plan-card"
          title="Check For Deals"
          submitLabel="Shop Plans"
          showHelpText={false}
          initialData={checkedAddress}
          initialResult={checkedResult}
          onResult={handleAddressResult}
          onClose={() => setShowFormModal(false)}
        />
      )}

      {showTermsModal && (
        <Modal onClose={() => setShowTermsModal(null)} title="Pricing & Discount Details" large>
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

      {showRewardModal && (
        <Modal onClose={() => setShowRewardModal(null)} title="$250 AT&T Visa® Reward Card" large>
          <div className="space-y-4 text-sm text-gray-600">
            <p className="font-semibold">$250 REWARD CARD OFFER: Limited time offer, subject to change.</p>
            <p>$250 AT&T Visa® Reward Card for purchase of any AT&T Fiber speeds. For new residential AT&T Fiber customers who purchase through attspecial.com. Redemption req'd. Employees and residents of select multi-dwelling units not eligible.</p>
            <p className="text-xs text-gray-500">Card issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

const featureIcons: Record<Feature["icon"], React.ReactNode> = {
  fiber: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  contract: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  install: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  support: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-1.414 1.414A9 9 0 105.636 18.364l1.414-1.414M12 8v4l2 2" />
    </svg>
  ),
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
        {featureIcons[feature.icon]}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
      <p className="text-sm text-gray-600">{feature.desc}</p>
    </div>
  );
}

function PlanCard({ plan, onCtaClick, onDetailsClick }: { plan: Plan; onCtaClick: () => void; onDetailsClick: (modal: string) => void }) {
  return (
    <article className={`relative bg-white rounded-xl border overflow-hidden ${plan.highlighted ? "border-blue-300 shadow-lg ring-2 ring-blue-200" : "border-gray-200 shadow-sm hover:shadow-md"} transition-all hover:-translate-y-1 flex flex-col h-full`} role="listitem">
      {/* Header bar uses AT&T's own "Fiber" wordmark cyan, matching attspecial.com's plan cards */}
      <div className="bg-[#00A8E0] px-5 py-3 flex items-center justify-between gap-2">
        <span className="text-white font-bold tracking-wide text-sm uppercase">{plan.name}</span>
        {plan.badge && (
          <span className="text-white text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
            {plan.badge}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-blue-700 font-semibold mb-4">AT&T Fiber</p>
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
          className={`w-full py-3 px-4 rounded-full font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            plan.highlighted
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </article>
  );
}
