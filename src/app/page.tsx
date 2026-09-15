"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import AvailabilityCard from "@/components/AvailabilityCard";
import TrustStrip from "@/components/TrustStrip";
import HeroSwoosh from "@/components/HeroSwoosh";
import DealCta from "@/components/DealCta";
import WirelessPlanCard from "@/components/WirelessPlanCard";
import PhoneOffer from "@/components/PhoneOffer";
import { useWizard } from "@/components/WizardProvider";
import WizardButton from "@/components/WizardButton";
import { IconFiber, IconContract, IconInstall, IconSupport, IconGlobe, IconWireless, IconBox, IconShield, IconPhone } from "@/components/Icons";
import {
  plans, features, steps, faqs, bundleFootnote, bundleSavingsNote,
  wirelessPlans, wirelessFootnote, broadbandFactsUrl, serviceChoices, guarantee, switcherOffer, phoneOffers,
  type Plan, type Feature,
} from "@/lib/site-config";
import { dealHref } from "@/lib/deals";

const featureIcons: Record<Feature["icon"], (props: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  fiber: IconFiber,
  contract: IconContract,
  install: IconInstall,
  support: IconSupport,
};

const serviceIcons: Record<(typeof serviceChoices)[number]["value"], (props: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  internet: IconGlobe,
  wireless: IconWireless,
  bundle: IconBox,
};

const guaranteeIcons = [IconShield, IconSupport, IconPhone];

type PlanTab = "internet" | "wireless";
const isPlanTab = (v: string): v is PlanTab => v === "internet" || v === "wireless";

export default function Home() {
  const [showTermsModal, setShowTermsModal] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);

  // Internet Packages | Wireless Plans. The hash is the deep link (/#wireless)
  // and is kept in sync so a shared URL opens on the right tab.
  const [tab, setTab] = useState<PlanTab>("internet");
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      if (isPlanTab(h)) {
        setTab(h);
        document.getElementById("plans")?.scrollIntoView({ block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  const selectTab = (next: PlanTab) => {
    setTab(next);
    window.history.replaceState(null, "", `#${next}`);
  };

  // Every "check availability" surface on the page opens the same step-by-step
  // wizard, which is mounted once at the app root.
  const { openWizard } = useWizard();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="att-container pt-5 pb-10 sm:pt-7 sm:pb-12" aria-labelledby="hero-title">
          <div className="att-hero-shell">
            <Image
              src="/images/hero-family-2.jpg"
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
                  <span className="text-white font-bold text-6xl sm:text-7xl tracking-tight">50</span>
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

              <AvailabilityCard
                className="att-hero-card"
                title="Check availability at your address"
                source="home-hero"
                cta="Check my address"
              />
            </div>
          </div>
        </section>

        {/* ---------------- What are you looking for? ---------------- */}
        <section className="reveal att-container pb-14 sm:pb-16" aria-labelledby="service-title">
          <div className="text-center mb-8">
            <h2 id="service-title" className="att-h2 mb-2">What are you looking for?</h2>
            <p className="att-lead">Pick one and we&apos;ll start your quote there — about 30 seconds.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6" role="list">
            {serviceChoices.map((choice) => {
              const Icon = serviceIcons[choice.value];
              return (
                <button
                  key={choice.value}
                  type="button"
                  role="listitem"
                  onClick={() => openWizard({ source: `home-service-${choice.value}`, service: choice.value })}
                  className="surface-card p-6 sm:p-8 text-left flex sm:flex-col items-center sm:items-start gap-4 focus:outline-none focus:ring-2 focus:ring-att-cyan"
                >
                  <Icon className="shrink-0 w-10 h-10 text-att-ink" strokeWidth={1.4} aria-hidden="true" />
                  <span>
                    <span className="block feature-title">{choice.label}</span>
                    <span className="block att-fine text-att-gray-600">{choice.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---------------- Plans: Internet | Wireless ---------------- */}
        <section id="plans" className="reveal att-section bg-white border-t border-att-gray-200 scroll-mt-28" aria-labelledby="plans-title">
          <div className="att-container">
            <div className="text-center mb-8 sm:mb-10">
              <h2 id="plans-title" className="att-h2 mb-3">Customize your bundle with AT&amp;T Fiber and AT&amp;T Wireless</h2>
              <p className="att-lead max-w-2xl mx-auto">
                Every price below already includes the new-customer and AutoPay &amp; Paperless discounts.
                Take one service or both — the bundle discount applies either way.
              </p>
              <div className="mt-8 inline-flex rounded-full bg-att-gray-150 p-1" role="tablist" aria-label="Plan type">
                {(["internet", "wireless"] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={tab === id}
                    aria-controls={`panel-${id}`}
                    onClick={() => selectTab(id)}
                    className={`min-h-11 rounded-full px-5 sm:px-7 font-bold text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-att-cyan ${
                      tab === id ? "bg-att-navy text-white" : "text-att-ink hover:bg-att-gray-200"
                    }`}
                  >
                    {id === "internet" ? "Internet Packages" : "Wireless Plans"}
                  </button>
                ))}
              </div>
            </div>

            {tab === "internet" ? (
              <div id="panel-internet" role="tabpanel" aria-labelledby="tab-internet">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.name}
                      plan={plan}
                      onCtaClick={() => openWizard({ source: "home-plan-card", service: "internet" })}
                      onDetailsClick={(modal) => setShowTermsModal(modal)}
                    />
                  ))}
                </div>

                <p className="mt-6 text-center att-fine text-att-gray-600">
                  <a href={broadbandFactsUrl} target="_blank" rel="noopener" className="text-att-navy font-bold underline underline-offset-2">
                    See Broadband Facts
                  </a>
                  {" · "}
                  <Link href="/att-fiber" className="text-att-navy font-bold underline underline-offset-2">
                    AT&amp;T Fiber by city
                  </Link>
                </p>

                <TrustStrip className="mt-10" />

                <div className="mt-10 att-fine text-att-gray-500 max-w-3xl mx-auto space-y-2" role="contentinfo">
                  <p>‡ Upload speed comparison against Xfinity, Spectrum and Cox cable service at comparable download tiers with uploads of 10, 20 and 35 Mbps. Speeds vary and are not guaranteed. See www.att.com/speed101.</p>
                  <p>† Speed based on wired connection. Actual speeds may vary. For 5GIG, single device wired speed maximum 4.7Gbps. For more info, go to www.att.com/speed101.</p>
                  <p>{bundleFootnote}</p>
                  <p>* Limited time offer. Subject to change. New AT&amp;T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&amp;T Fiber plan ($15/mo w/300M or 500M; $30/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
                </div>
              </div>
            ) : (
              <div id="panel-wireless" role="tabpanel" aria-labelledby="tab-wireless">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
                  {wirelessPlans.map((plan, i) => (
                    <WirelessPlanCard key={plan.name} plan={plan} highlighted={i === 2} source="home-wireless-card" />
                  ))}
                </div>
                <p className="mt-6 text-center att-fine text-att-gray-600">
                  <Link href="/wireless" className="text-att-navy font-bold underline underline-offset-2">
                    Phones, trade-ins and the full wireless page
                  </Link>
                </p>
                <p className="mt-10 att-fine text-att-gray-500 max-w-3xl mx-auto">* {wirelessFootnote}</p>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Bundle: fiber + wireless, $420/yr, $200 card ---------------- */}
        <section className="reveal att-container pb-14 sm:pb-16" aria-labelledby="bundle-title">
          <div className="rounded-att bg-att-light-blue p-6 sm:p-10 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-12 items-center">
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-att-ink font-bold text-xl sm:text-2xl tracking-tight" aria-label="AT&T Fiber plus AT&T Wireless">
                <span>AT&amp;T <span className="text-att-cyan font-normal">fiber</span></span>
                <span className="text-att-cyan text-2xl leading-none" aria-hidden="true">+</span>
                <span>AT&amp;T <span className="text-att-cyan font-normal">wireless</span></span>
              </p>
              <h2 id="bundle-title" className="att-h2 mb-3">
                Get America&apos;s fastest 1 Gig internet<sup className="att-reg">1</sup> for{" "}
                <span className="whitespace-nowrap">$30/mo.</span> for 12 mos.*
              </h2>
              <p className="att-lead mb-5">
                when you bundle with an unlimited wireless plan. <strong className="text-att-ink">Save up to $420/year.</strong>
              </p>
              <DealCta href={dealHref("fiber-wireless-bundle")} />
              <p className="att-fine text-att-gray-600 mt-5 max-w-xl">
                *Price after discounts: new customers only. $20/mo w/ elig. wireless svc, $30/mo for 12 mos for new customers, and $10/mo AutoPay &amp; Paperless bill. Discounts start w/in 3 bills. Ltd. avail/areas.{" "}
                <a
                  href="#modal-terms-bundle"
                  className="font-bold underline underline-offset-2 text-att-navy"
                  onClick={(e) => { e.preventDefault(); setShowBundleModal(true); }}
                >
                  See details
                </a>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-att-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <Image
                src="/images/att-reward-card.png"
                alt="AT&T Visa Reward Card"
                width={900}
                height={594}
                className="w-28 sm:w-36 shrink-0 h-auto rounded-sm drop-shadow-md"
              />
              <div>
                <p className="feature-title">+ $200 AT&amp;T Visa<sup className="att-reg">®</sup> Reward Card</p>
                <p className="att-fine text-att-gray-600 mb-2">with purchase of AT&amp;T Fiber. Redemption required.</p>
                <a
                  href="#modal-terms-250-visa"
                  className="att-fine text-att-navy font-bold underline underline-offset-2"
                  onClick={(e) => { e.preventDefault(); setShowRewardModal(true); }}
                >
                  See details
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- AT&T Guarantee ---------------- */}
        <section className="reveal att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="guarantee-title">
          <div className="att-container">
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
              <div>
                <p className="att-eyebrow text-att-navy mb-3">Backed by AT&amp;T</p>
                <h2 id="guarantee-title" className="att-h2 mb-4">{guarantee.headline}<sup className="att-reg">SM</sup></h2>
                <p className="att-lead mb-6">{guarantee.sub}</p>
                <DealCta href={dealHref("att-guarantee")} />
              </div>
              <ul className="grid sm:grid-cols-1 gap-6" role="list">
                {guarantee.items.map((item, i) => {
                  const Icon = guaranteeIcons[i];
                  return (
                    <li key={item.title} className="flex gap-4">
                      <Icon className="shrink-0 w-10 h-10 text-att-ink" strokeWidth={1.4} aria-hidden="true" />
                      <div>
                        <h3 className="feature-title">{item.title}</h3>
                        <p className="feature-desc">{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- Switcher + phone offer ---------------- */}
        <section className="reveal att-container py-14 sm:py-16 grid lg:grid-cols-2 gap-6" aria-label="Wireless offers">
          <div className="rounded-att bg-att-dark text-white p-6 sm:p-10 flex flex-col">
            <p className="att-eyebrow text-att-sky mb-3">Switching from another carrier?</p>
            <h2 className="att-h2 mb-3" style={{ color: "#fff" }}>{switcherOffer.headline}</h2>
            <p className="text-white/80 text-[1.0625rem] leading-relaxed mb-6 flex-1">{switcherOffer.sub}</p>
            <DealCta href={dealHref("switcher-800")} onDark />
          </div>

          <PhoneOffer offer={phoneOffers[0]} />
        </section>

        {/* ---------------- Why AT&T Fiber ---------------- */}
        <section className="reveal att-section bg-att-gray-100" aria-labelledby="why-title">
          <div className="att-container">
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-40">
                <p className="att-eyebrow text-att-navy mb-3">Why fiber</p>
                <h2 id="why-title" className="att-h2 mb-4">What you get with AT&amp;T Fiber</h2>
                <p className="att-lead">
                  A 100% fiber network behaves differently from cable, and the differences are
                  the ones you notice on a work call or a Saturday night.
                </p>
                <p className="mt-6">
                  <Link href="/why-fiber" className="text-att-navy font-bold underline underline-offset-2">
                    Read how fiber actually differs from cable
                  </Link>
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-8" role="list">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} feature={feature} />
                ))}
              </ul>
            </div>

            <div className="mt-12 lg:mt-16 border-t border-att-gray-200 pt-10">
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="font-bold text-att-ink text-base mb-2">Light, not electricity</h3>
                  <p className="att-fine text-att-gray-600">
                    Fiber carries laser light through glass instead of current through copper, so
                    interference, lightning and distance stop mattering the way they do on cable.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-att-ink text-base mb-2">The gateway is included</h3>
                  <p className="att-fine text-att-gray-600">
                    One box is your modem and your Wi-Fi 6 router, and it comes with the service
                    rather than as a monthly equipment rental.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-att-ink text-base mb-2">ActiveArmor is built in</h3>
                  <p className="att-fine text-att-gray-600">
                    Known threats are filtered at the network level, which covers the smart-home
                    devices you can&apos;t install security software on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="reveal att-section bg-att-dark text-white" aria-labelledby="steps-title">
          <div className="att-container">
            <div className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-16">
              <div>
                <p className="att-eyebrow text-att-sky mb-3">After you order</p>
                <h2 id="steps-title" className="att-h2 mb-4" style={{ color: "#fff" }}>
                  What happens next
                </h2>
                <p className="text-white/75 text-[1.0625rem] leading-relaxed">
                  Four things, in this order. Nothing here needs you to chase anyone.
                </p>
                <div className="mt-8">
                  <WizardButton source="home-steps" className="btn-on-dark">
                    Start with your ZIP
                  </WizardButton>
                </div>
              </div>
              <ol className="timeline" role="list">
                {steps.map((step, i) => (
                  <li key={step.title} className="timeline-item">
                    <span className="timeline-dot" aria-hidden="true">{i + 1}</span>
                    <p className="att-fine font-bold uppercase tracking-wide text-att-sky mb-1">{step.when}</p>
                    <h3 className="font-bold text-white text-lg mb-1.5">{step.title}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------------- Fiber vs Internet Air ---------------- */}
        <section className="reveal att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="compare-title">
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
        <section className="reveal att-section bg-white" aria-labelledby="faq-preview-title">
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
      {showTermsModal && (
        <Modal onClose={() => setShowTermsModal(null)} title="Pricing & Discount Details" large>
          <div className="space-y-4 text-sm text-att-gray-600">
            <p className="font-bold text-att-ink">DISCOUNTED FIBER OFFER: Subj to change.</p>
            <p>New AT&amp;T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&amp;T Fiber plan ($15/mo w/300M or 500M; $30/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
            <p className="font-bold text-att-ink">Autopay &amp; Paperless Bill Discount:</p>
            <p>$10/mo if enrolled in Autopay &amp; paperless billing w/ your bank account or the AT&amp;T Points Plus® Card from Citi. Discount reduced to $5/mo when enrolled with a debit card. No discount if enrolled with any other credit card.</p>
            <p className="font-bold text-att-ink">Taxes &amp; Fees:</p>
            <p>Up to $99 installation fee may apply, plus tax where applicable. Monthly State Cost Recovery charge applies in NV, OH, TX.</p>
          </div>
        </Modal>
      )}

      {showBundleModal && (
        <Modal onClose={() => setShowBundleModal(false)} title="Fiber + wireless bundle offer" large>
          <div className="space-y-4 text-sm text-att-gray-600">
            <p className="font-bold text-att-ink">1 GIG FOR $30/MO WITH AN AT&amp;T UNLIMITED WIRELESS PLAN: Limited time offer, subject to change.</p>
            <p>{bundleFootnote.replace(/^‡ /, "")}</p>
            <p>{bundleSavingsNote}</p>
            <p>¹ Best &amp; fastest internet: AT&amp;T Fiber, based on analysis by Ookla® of Speedtest Intelligence® data, 2H 2025. Ookla trademarks used under license and reprinted with permission. Limited availability in select areas.</p>
            <p>Reflects the $30/mo new-customer discount for 12 months, the $10/mo AutoPay &amp; Paperless bill discount and the $20/mo wireless bundle discount on the $90/mo 1 GIG rate. Taxes &amp; fees extra. After 12 months, prevailing rate applies.</p>
            <p>$200 AT&amp;T Visa® Reward Card for new residential AT&amp;T Fiber customers who order through this site. Redemption required within 75 days of the reward notice. Card issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p>
          </div>
        </Modal>
      )}

      {showRewardModal && (
        <Modal onClose={() => setShowRewardModal(false)} title="$200 AT&T Visa® Reward Card" large>
          <div className="space-y-4 text-sm text-att-gray-600">
            <p className="font-bold text-att-ink">$200 REWARD CARD OFFER: Limited time offer, subject to change.</p>
            <p>$200 AT&amp;T Visa® Reward Card for purchase of any AT&amp;T Fiber speeds. For new residential AT&amp;T Fiber customers who order through this site. Redemption req&apos;d within 75 days of the reward notice; card delivered within 3–4 weeks after redemption to customers who maintain and pay for qualifying service through reward fulfillment. Card expires at month-end 6 months after issuance. Employees and residents of select multi-dwelling units not eligible.</p>
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
    <li className="flex gap-4">
      {/* Bare, thin-line, ink — the way att.com draws benefit icons. */}
      <Icon className="shrink-0 w-10 h-10 text-att-ink" strokeWidth={1.4} aria-hidden="true" />
      <div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-desc">{feature.desc}</p>
      </div>
    </li>
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
        <p className="att-fine text-att-gray-500 mb-2">
          Reg. {plan.regularPrice}/mo after 12 mos.
        </p>
        <p className="att-fine font-bold text-att-navy bg-att-light-blue rounded-lg px-2.5 py-1.5 mb-3">
          {plan.bundlePrice}/mo with an AT&amp;T unlimited wireless plan‡
        </p>
        <ul className="mb-3 space-y-1.5" role="list">
          <li className="att-fine text-att-ink font-medium">{plan.devices}</li>
          <li className="att-fine text-att-gray-600">{plan.bestFor}</li>
          {plan.uploadVsCable && (
            <li className="att-fine text-att-navy font-bold">{plan.uploadVsCable}‡</li>
          )}
        </ul>
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
