"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import AddressCheckFlow from "@/components/AddressCheckFlow";
import AvailabilityModal from "@/components/AvailabilityModal";
import HeroSwoosh from "@/components/HeroSwoosh";
import { AddressFormData } from "@/components/AddressForm";
import { AvailabilityResponse } from "@/lib/api";
import { IconFiber, IconContract, IconInstall, IconSupport } from "@/components/Icons";
import { plans, features, steps, faqs, businessPhone, businessHours, type Plan, type Feature } from "@/lib/site-config";

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="att-container pt-5 pb-10 sm:pt-7 sm:pb-12" aria-labelledby="hero-title">
          <div className="att-hero-shell">
            <Image
              src="/images/hero-family.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1296px) 100vw, 1296px"
              className="object-cover object-[68%_center]"
              aria-hidden="true"
            />
            <div className="att-hero-scrim" aria-hidden="true" />

            {/* AT&T brand swoosh, bottom-left — same motif as att.com / attspecial.com */}
            <HeroSwoosh />

            <div className="relative grid lg:grid-cols-[1.1fr_minmax(300px,410px)] gap-8 lg:gap-14 items-center p-6 sm:p-9 lg:p-12">
              {/* Left — offer copy */}
              <div>
                <Image
                  src="/images/att-fiber-logo-whtblue.png"
                  alt="AT&T Fiber"
                  width={170}
                  height={36}
                  className="h-7 w-auto mb-5"
                />
                <h1 id="hero-title" className="att-display mb-5">
                  AT&amp;T Fiber<sup className="att-reg">®</sup> 1 Gig <br className="hidden sm:block" />
                  internet at your address
                </h1>

                <div className="flex items-baseline gap-1.5 mb-1" aria-label="Price">
                  <span className="text-white font-bold text-2xl sm:text-3xl">$</span>
                  <span className="text-white font-bold text-5xl sm:text-6xl tracking-tight">50</span>
                  <span className="text-white/90 text-lg">/mo*</span>
                </div>
                <p className="text-white font-bold text-base sm:text-lg mb-3">
                  + taxes &amp; fees for 12 mos.
                </p>
                <div className="text-white/85 max-w-xl space-y-0.5 att-fine">
                  <p>w/ elig AutoPay &amp; Paperless bill. Ltd. avail/areas.</p>
                  <p>
                    Price after discounts $30/mo for 12 mos new customers, and $10/mo AutoPay &amp; Paperless bill. Discounts start w/in 3 bills.{" "}
                    <a
                      href="#modal-terms-1g"
                      className="font-bold underline underline-offset-2 text-white hover:text-att-sky"
                      onClick={(e) => { e.preventDefault(); setShowTermsModal("modal-terms-1g"); }}
                    >
                      See details
                    </a>
                  </p>
                </div>
              </div>

              {/* Right — availability card */}
              <div className="att-hero-card" role="region" aria-label="Check availability">
                <h2 className="att-h3 mb-4">Check availability at your address</h2>
                <AddressCheckFlow
                  idPrefix="hero"
                  source="home-hero"
                  submitLabel="Shop internet"
                  showHelpText={false}
                  initialData={checkedAddress}
                  initialResult={checkedResult}
                  onResult={handleAddressResult}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Reward card ---------------- */}
        <section className="att-container pb-14 sm:pb-16" aria-labelledby="reward-title">
          <div className="surface-card p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <Image
                src="/images/att-reward-card.png"
                alt="AT&T Visa Reward Card"
                width={900}
                height={594}
                className="w-64 sm:w-80 md:w-[360px] flex-shrink-0 drop-shadow-md"
              />
              <div className="text-center md:text-left">
                <h2 id="reward-title" className="att-h2 mb-3">
                  Get a $250 AT&amp;T Visa<sup className="att-reg">®</sup> Reward Card
                </h2>
                <p className="att-lead mb-4">
                  with purchase of AT&amp;T Fiber. Redemption required.
                </p>
                <a
                  href="#modal-terms-250-visa"
                  className="text-att-navy font-bold underline underline-offset-2 hover:text-att-navy-dark"
                  onClick={(e) => { e.preventDefault(); setShowRewardModal("modal-terms-250-visa"); }}
                >
                  See details
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Plans ---------------- */}
        <section className="att-section bg-white border-t border-att-gray-200" aria-labelledby="plans-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="plans-title" className="att-h2 mb-3">AT&amp;T Fiber plans and pricing</h2>
              <p className="att-lead max-w-2xl mx-auto">
                Four speeds, from 300 Mbps up to 5 GIG. Every plan is symmetrical, unlimited,
                and month to month on eligible terms — the prices below already include the
                new-customer and AutoPay discounts. Ordering from a specific metro?{" "}
                <Link href="/att-fiber" className="text-att-navy font-bold underline underline-offset-2">
                  See AT&amp;T Fiber by city
                </Link>
                .
              </p>
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

            <div className="mt-10 att-fine text-att-gray-500 max-w-3xl mx-auto space-y-2" role="contentinfo">
              <p>† Speed based on wired connection. Actual speeds may vary. For 5GIG, single device wired speed maximum 4.7Gbps. For more info, go to www.att.com/speed101.</p>
              <p>* Limited time offer. Subject to change. New AT&amp;T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&amp;T Fiber plan ($15/mo w/300M or 500M; $32/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
            </div>
          </div>
        </section>

        {/* ---------------- Why AT&T Fiber ---------------- */}
        <section className="att-section bg-att-gray-100" aria-labelledby="why-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="why-title" className="att-h2 mb-3">What you get with AT&amp;T Fiber</h2>
              <p className="att-lead max-w-2xl mx-auto">
                A 100% fiber network behaves differently from cable, and the differences are
                the ones you notice on a work call or a Saturday night.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="att-section bg-white" aria-labelledby="steps-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="steps-title" className="att-h2 mb-3">How ordering works</h2>
              <p className="att-lead max-w-2xl mx-auto">
                Three steps, one phone call if you'd rather talk to someone.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
              {steps.map((step, i) => (
                <div key={step.title} className="surface-card p-6">
                  <div className="step-number" aria-hidden="true">{i + 1}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Fiber vs Internet Air ---------------- */}
        <section className="att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="compare-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="compare-title" className="att-h2 mb-3">
                AT&amp;T Fiber or AT&amp;T Internet Air?
              </h2>
              <p className="att-lead max-w-2xl mx-auto">
                Fiber is the better service wherever it is built. Internet Air is how AT&amp;T
                covers addresses the fiber network hasn&apos;t reached yet.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <article className="bg-white rounded-2xl border border-att-gray-200 p-6 sm:p-8">
                <h3 className="att-h3 mb-4">AT&amp;T Fiber</h3>
                <ul className="space-y-3 text-att-gray-700 text-base" role="list">
                  <li>300 Mbps to 5 GIG, symmetrical upload and download</li>
                  <li>Unlimited data, no annual contract on eligible plans</li>
                  <li>Professional installation included</li>
                  <li>From $35/mo with AutoPay &amp; Paperless bill</li>
                </ul>
                <p className="att-fine text-att-gray-500 mt-5">
                  Available where the fiber network has been built — check your address above.
                </p>
              </article>

              <article className="bg-white rounded-2xl border border-att-gray-200 p-6 sm:p-8">
                <h3 className="att-h3 mb-4">AT&amp;T Internet Air™</h3>
                <ul className="space-y-3 text-att-gray-700 text-base" role="list">
                  <li>Up to 100 Mbps over the AT&amp;T 5G network</li>
                  <li>Unlimited data, no annual contract</li>
                  <li>Self-setup in minutes, no technician visit</li>
                  <li>$55/mo with AutoPay &amp; Paperless bill ($60/mo without)</li>
                </ul>
                <p className="att-fine text-att-gray-500 mt-5">
                  <Link href="/att-internet-air" className="text-att-navy font-bold underline underline-offset-2">
                    See AT&amp;T Internet Air details
                  </Link>
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ preview ---------------- */}
        <section className="att-section bg-white" aria-labelledby="faq-preview-title">
          <div className="att-container max-w-4xl">
            <div className="text-center mb-10">
              <h2 id="faq-preview-title" className="att-h2 mb-3">Before you order</h2>
              <p className="att-lead">
                The questions we answer most often on the ordering line.
              </p>
            </div>
            <dl className="divide-y divide-att-gray-200 border-y border-att-gray-200">
              {faqs.slice(0, 4).map((faq) => (
                <div key={faq.q} className="py-6">
                  <dt className="font-bold text-att-ink mb-2 text-lg">{faq.q}</dt>
                  <dd className="text-att-gray-600">{faq.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-center">
              <Link href="/faq" className="btn-outline">
                Read all questions
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* ---------------- Modals ---------------- */}
      {showBusinessModal && (
        <Modal onClose={() => setShowBusinessModal(false)} title="Looking for great deals on AT&T Business?">
          <div className="text-center">
            <h3 className="att-h3 mb-4">Call Now</h3>
            <a href={`tel:${businessPhone.replace(/\./g, "")}`} className="text-3xl font-bold text-att-navy hover:underline block mb-2">
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
            <p className="font-bold text-att-ink">DISCOUNTED FIBER OFFER: Subj to change.</p>
            <p>New AT&amp;T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&amp;T Fiber plan ($15/mo w/300M or 500M; $32/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
            <p className="font-bold text-att-ink">Autopay &amp; Paperless Bill Discount:</p>
            <p>$10/mo if enrolled in Autopay &amp; paperless billing w/ your bank account or the AT&amp;T Points Plus® Card from Citi. Discount reduced to $5/mo when enrolled with a debit card. No discount if enrolled with any other credit card.</p>
            <p className="font-bold text-att-ink">Taxes &amp; Fees:</p>
            <p>Up to $99 installation fee may apply, plus tax where applicable. Monthly State Cost Recovery charge applies in NV, OH, TX.</p>
          </div>
        </Modal>
      )}

      {showRewardModal && (
        <Modal onClose={() => setShowRewardModal(null)} title="$250 AT&T Visa® Reward Card" large>
          <div className="space-y-4 text-sm text-att-gray-600">
            <p className="font-bold text-att-ink">$250 REWARD CARD OFFER: Limited time offer, subject to change.</p>
            <p>$250 AT&amp;T Visa® Reward Card for purchase of any AT&amp;T Fiber speeds. For new residential AT&amp;T Fiber customers who order through this site. Redemption req&apos;d. Employees and residents of select multi-dwelling units not eligible.</p>
            <p className="att-fine text-att-gray-500">Card issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p>
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
        {plan.badge && <span className="plan-badge">{plan.badge}</span>}
      </div>
      <div className="plan-body">
        <p className="plan-label">AT&amp;T Fiber</p>
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
          className={`w-full ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
        >
          {plan.cta}
        </button>
      </div>
    </article>
  );
}
