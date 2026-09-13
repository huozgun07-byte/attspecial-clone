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
import { IconFiber, IconContract, IconInstall, IconSupport } from "@/components/Icons";
import { plans, features, steps, businessPhone, businessHours, type Plan, type Feature } from "@/lib/site-config";

const featureIcons: Record<Feature["icon"], (props: { className?: string }) => React.ReactElement> = {
  fiber: IconFiber,
  contract: IconContract,
  install: IconInstall,
  support: IconSupport,
};

export default function Home() {
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState<string | null>(null);
  // Shared across the hero form and the plan-card modal so a visitor who already
  // checked their address once isn't asked to re-enter it on the same page.
  const [checkedAddress, setCheckedAddress] = useState<AddressFormData | undefined>(undefined);
  const [checkedResult, setCheckedResult] = useState<AvailabilityResponse | undefined>(undefined);
  const [showFormModal, setShowFormModal] = useState(false);
  const handleAddressResult = (data: AddressFormData, result: AvailabilityResponse) => {
    setCheckedAddress(data);
    setCheckedResult(result);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden att-section" aria-labelledby="hero-title">
          <Image
            src="/images/hero-family.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            aria-hidden="true"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="relative att-container">
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
                <p className="text-att-cyan/90 font-semibold text-sm mb-4" role="status">
                  Get a $200 Reward Card with purchase of an AT&T Fiber plan (300 Mbps or higher).
                </p>
                <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Get started with <br />
                  <span className="text-att-cyan">AT&T Fiber® 1 Gig</span>
                </h1>
                <div className="flex items-baseline gap-2 mb-2" aria-label="Price">
                  <span className="text-4xl sm:text-5xl font-bold text-white">$50</span>
                  <span className="text-att-gray-300">/mo*</span>
                </div>
                <p className="text-sm text-att-gray-200 mb-6">
                  + taxes & fees for 12 mos. w/ elig AutoPay & Paperless bill
                </p>
                <p className="text-sm text-att-gray-200 mb-8">
                  Price after discounts $30/mo for 12 mos new customers, and $10/mo AutoPay & Paperless bill. Discounts start w/in 3 bills.
                  <a
                    href="#modal-terms-1g"
                    className="text-att-cyan font-medium hover:underline ml-1"
                    onClick={(e) => { e.preventDefault(); setShowTermsModal("modal-terms-1g"); }}
                  >
                    See details
                  </a>
                </p>
              </div>

              {/* Right Side - Address Form */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-att-gray-100" role="region" aria-label="Check availability">
                <h3 className="text-lg font-semibold text-att-gray-900 mb-4">Find the best plan for you</h3>
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
        <section className="py-12 bg-att-blue/5 border-b border-att-gray-200" aria-labelledby="reward-title">
          <div className="att-container">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
              <Image
                src="/images/att-reward-card.png"
                alt="AT&T Reward Card"
                width={140}
                height={90}
                className="w-32 sm:w-40 flex-shrink-0"
              />
              <div>
                <h2 id="reward-title" className="text-2xl sm:text-3xl font-bold text-att-gray-900 mb-1">
                  Get a $250 AT&T Visa® Reward Card
                </h2>
                <p className="text-base sm:text-lg text-att-gray-600">
                  with purchase of AT&T Fiber.{" "}
                  <a
                    href="#modal-terms-250-visa"
                    className="text-att-blue font-semibold hover:underline"
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
        <section className="att-section bg-att-gray-50 border-y border-att-gray-200" aria-labelledby="why-title">
          <div className="att-container">
            <div className="text-center mb-12">
              <h2 id="why-title" className="text-3xl sm:text-4xl font-bold text-att-gray-900 mb-3">
                Why choose AT&T Fiber
              </h2>
              <p className="text-att-gray-600 max-w-2xl mx-auto">
                A 100% fiber network built for how your household actually uses the internet.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="att-section bg-white" aria-labelledby="plans-title">
          <div className="att-container">
            <div className="text-center mb-12">
              <h2 id="plans-title" className="text-3xl sm:text-4xl font-bold text-att-gray-900 mb-4">
                Find the best plan for you
              </h2>
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
            <div className="mt-12 text-xs text-att-gray-500 max-w-3xl mx-auto space-y-2" role="contentinfo">
              <p>† Speed based on wired connection. Actual speeds may vary. For 5GIG, single device wired speed maximum 4.7Gbps. For more info, go to www.att.com/speed101.</p>
              <p>* Limited time offer. Subject to change. New AT&T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&T Fiber plan ($15/mo w/300M or 500M; $32/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="att-section bg-att-gray-50 border-t border-att-gray-200" aria-labelledby="steps-title">
          <div className="att-container">
            <div className="text-center mb-12">
              <h2 id="steps-title" className="text-3xl sm:text-4xl font-bold text-att-gray-900 mb-3">
                Getting connected is easy
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center sm:text-left">
                  <div className="step-number" aria-hidden="true">{i + 1}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
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
            <h3 className="text-2xl font-bold text-att-gray-900 mb-4">Call Now</h3>
            <a href={`tel:${businessPhone.replace(/\./g, "")}`} className="text-3xl font-bold text-att-blue hover:underline block mb-2">
              {businessPhone}
            </a>
            <p className="text-att-gray-600">{businessHours}</p>
          </div>
        </Modal>
      )}

      {showFormModal && (
        <AvailabilityModal
          source="home-plan-card"
          submitLabel="Shop internet"
          initialData={checkedAddress}
          initialResult={checkedResult}
          onResult={handleAddressResult}
          onClose={() => setShowFormModal(false)}
        />
      )}

      {showTermsModal && (
        <Modal onClose={() => setShowTermsModal(null)} title="Pricing & Discount Details" large>
          <div className="space-y-4 text-sm text-att-gray-600">
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
          <div className="space-y-4 text-sm text-att-gray-600">
            <p className="font-semibold">$250 REWARD CARD OFFER: Limited time offer, subject to change.</p>
            <p>$250 AT&T Visa® Reward Card for purchase of any AT&T Fiber speeds. For new residential AT&T Fiber customers who purchase through attspecial.com. Redemption req&apos;d. Employees and residents of select multi-dwelling units not eligible.</p>
            <p className="text-xs text-att-gray-500">Card issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = featureIcons[feature.icon];
  return (
    <div className="feature-card">
      <div className="feature-icon" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-desc">{feature.desc}</p>
    </div>
  );
}

function PlanCard({ plan, onCtaClick, onDetailsClick }: { plan: Plan; onCtaClick: () => void; onDetailsClick: (modal: string) => void }) {
  return (
    <article className={`plan-card ${plan.highlighted ? "plan-card-highlighted" : ""}`} role="listitem">
      <div className="plan-header">
        <span className="text-white font-bold tracking-wide text-sm uppercase">{plan.name}</span>
        {plan.badge && (
          <span className="plan-badge">{plan.badge}</span>
        )}
      </div>
      <div className="plan-body">
        <p className="plan-label">AT&T Fiber</p>
        <div className="plan-speed">{plan.speed}</div>
        <div className="plan-price">
          <span className="plan-price-amount">{plan.price}</span>
          <span className="plan-price-period">/mo*</span>
        </div>
        <p className="plan-details">{plan.details}</p>
        <a
          href={`#${plan.modal}`}
          className="plan-link"
          onClick={(e) => { e.preventDefault(); onDetailsClick(plan.modal); }}
        >
          See details
        </a>
        <button
          onClick={onCtaClick}
          className={`plan-cta ${plan.highlighted ? "plan-cta-primary" : "plan-cta-secondary"}`}
        >
          {plan.cta}
        </button>
      </div>
    </article>
  );
}
