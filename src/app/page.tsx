"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import TrustStrip from "@/components/TrustStrip";
import HeroSwoosh from "@/components/HeroSwoosh";
import DealCta from "@/components/DealCta";
import DealTile from "@/components/DealTile";
import WirelessPlanCard from "@/components/WirelessPlanCard";
import PhoneOffer from "@/components/PhoneOffer";
import { useWizard } from "@/components/WizardProvider";
import WizardButton from "@/components/WizardButton";
import { IconFiber, IconContract, IconInstall, IconSupport, IconShield, IconPhone, IconGlobe, IconWireless, IconBox } from "@/components/Icons";
import {
  plans, features, steps, faqs, bundleFootnote, bundleSavingsNote, phoneNumber, telHref,
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

/** Cyan checkmark used in every benefit list on the page. */
function Check() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5 text-att-cyan" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

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
        {/* ---------------- Hero: offer left, "what are you looking for?" picker right ---------------- */}
        <section className="att-container pt-4 sm:pt-5" aria-labelledby="hero-title">
          <div className="att-hero-shell lg:min-h-[400px]">
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
            <HeroSwoosh />

            <div className="relative grid lg:grid-cols-[1.1fr_minmax(300px,400px)] gap-6 lg:gap-12 items-center p-6 sm:p-8 lg:p-10">
              <div>
                <Image
                  src="/images/att-fiber-logo-whtblue.png"
                  alt="AT&T Fiber"
                  width={170}
                  height={36}
                  className="h-6 w-auto mb-4"
                />
                <h1 id="hero-title" className="att-display mb-4" style={{ fontSize: "clamp(2rem, 3.6vw, 2.9rem)" }}>
                  AT&amp;T Fiber<sup className="att-reg">®</sup> 1 Gig <br className="hidden sm:block" />
                  internet at your address
                </h1>

                <div className="flex items-baseline gap-1.5 mb-1" aria-label="Price">
                  <span className="text-white font-bold text-2xl sm:text-3xl">$</span>
                  <span className="text-white font-bold text-6xl sm:text-7xl tracking-tight">50</span>
                  <span className="text-white/90 text-lg">/mo*</span>
                  <span className="ml-3 text-white/60 line-through text-lg">$90/mo</span>
                </div>
                <p className="text-white font-bold text-base sm:text-lg mb-3">
                  + taxes &amp; fees for 12 mos.
                </p>
                <p className="text-white/85 max-w-xl att-fine">
                  w/ elig AutoPay &amp; Paperless bill. Ltd. avail/areas. Price after discounts $30/mo for 12 mos new customers, and $10/mo AutoPay &amp; Paperless bill. Discounts start w/in 3 bills.{" "}
                  <a
                    href="#modal-terms-1g"
                    className="font-bold underline underline-offset-2 text-white hover:text-att-sky"
                    onClick={(e) => { e.preventDefault(); setShowTermsModal("modal-terms-1g"); }}
                  >
                    See details
                  </a>
                </p>
              </div>

              {/* The picker: three rows, each starts the wizard with that answer filled in. */}
              <div className="att-hero-card">
                <h2 className="att-h3 mb-1">What are you looking for?</h2>
                <p className="text-att-gray-600 text-sm mb-3">Pick one — we check your address next. About 30 seconds.</p>
                <div className="divide-y divide-att-gray-200 border-y border-att-gray-200" role="list">
                  {serviceChoices.map((choice) => {
                    const Icon = serviceIcons[choice.value];
                    return (
                      <button
                        key={choice.value}
                        type="button"
                        role="listitem"
                        onClick={() => openWizard({ source: `home-service-${choice.value}`, service: choice.value })}
                        className="w-full flex items-center gap-3 py-3 text-left rounded-lg hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-att-cyan"
                      >
                        <Icon className="w-7 h-7 shrink-0 text-att-ink" strokeWidth={1.4} aria-hidden="true" />
                        <span className="flex-1 min-w-0">
                          <span className="block font-bold text-att-ink leading-tight">{choice.label}</span>
                          <span className="block att-fine text-att-gray-600">{choice.hint}</span>
                        </span>
                        <svg className="w-5 h-5 shrink-0 text-att-navy" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
                <p className="att-fine text-att-gray-500 mt-3">
                  Rather talk to someone? Call{" "}
                  <a href={telHref(phoneNumber)} className="text-att-navy font-bold underline underline-offset-2">{phoneNumber}</a>
                  {" "}— open 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Bundle: the headline offer, with the Reward Card ---------------- */}
        <section className="att-container pt-4 sm:pt-5" aria-labelledby="bundle-title">
          <div className="rounded-att overflow-hidden bg-att-light-blue grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="p-6 sm:p-10">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-att-ink font-bold text-xl sm:text-2xl tracking-tight" aria-label="AT&T Fiber plus AT&T Wireless">
                <span>AT&amp;T <span className="text-att-cyan font-normal">fiber</span></span>
                <span className="text-att-cyan text-2xl leading-none" aria-hidden="true">+</span>
                <span>AT&amp;T <span className="text-att-cyan font-normal">wireless</span></span>
              </p>
              <h2 id="bundle-title" className="att-h2 mb-2">
                Get America&apos;s fastest 1 Gig internet<sup className="att-reg">1</sup> for{" "}
                <span className="whitespace-nowrap">$30/mo.</span> for 12 mos.*
              </h2>
              <p className="att-lead mb-6">
                when you bundle with an unlimited wireless plan. Save up to $420/year when you combine AT&amp;T wireless and AT&amp;T Fiber.
              </p>

              <dl className="flex flex-wrap gap-x-10 gap-y-4 mb-6">
                <div>
                  <dd className="text-4xl sm:text-5xl font-bold text-att-navy tracking-tight leading-none">$30<span className="text-lg font-normal text-att-gray-600">/mo</span></dd>
                  <dt className="att-fine text-att-gray-600 mt-1">1 GIG for 12 months, <span className="line-through">$90/mo</span></dt>
                </div>
                <div>
                  <dd className="text-4xl sm:text-5xl font-bold text-att-navy tracking-tight leading-none">$420</dd>
                  <dt className="att-fine text-att-gray-600 mt-1">saved per year, up to</dt>
                </div>
              </dl>

              <ul className="space-y-2 mb-6 max-w-xl" role="list">
                <li className="flex items-start gap-2 text-att-gray-700 text-[15px]"><Check /><span>$20/mo off 1 GIG for 12 months with an eligible AT&amp;T unlimited wireless plan. $15 off 300M/500M, $25 off 5 GIG.</span></li>
                <li className="flex items-start gap-2 text-att-gray-700 text-[15px]"><Check /><span>$200 AT&amp;T Visa<sup className="att-reg">®</sup> Reward Card with your Fiber order.{" "}
                  <a href="#modal-terms-250-visa" className="text-att-navy font-bold underline underline-offset-2" onClick={(e) => { e.preventDefault(); setShowRewardModal(true); }}>See details</a></span></li>
                <li className="flex items-start gap-2 text-att-gray-700 text-[15px]"><Check /><span>Both services backed by the AT&amp;T Guarantee<sup className="att-reg">SM</sup>.</span></li>
              </ul>

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

            {/* The one loud element on the page: the card itself. */}
            <div className="relative overflow-hidden bg-gradient-to-br from-att-navy via-[#0B57B8] to-att-cyan text-white p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[320px]">
              <Image
                src="/images/att-reward-card.png"
                alt="AT&T Visa Reward Card"
                width={900}
                height={594}
                className="w-60 sm:w-72 h-auto rounded-lg shadow-2xl -rotate-6 mb-7"
              />
              <p className="text-3xl sm:text-4xl font-bold tracking-tight leading-none">$200 Reward Card</p>
              <p className="text-white/85 mt-2">AT&amp;T Visa<sup className="att-reg">®</sup> Reward Card with your AT&amp;T Fiber order. Redemption required.</p>
              <p className="mt-5 inline-block bg-white text-att-navy rounded-full px-4 py-1.5 font-bold text-sm">+ Save up to $420/year on the bundle</p>
            </div>
          </div>
        </section>

        {/* ---------------- Two more deals ---------------- */}
        <section className="att-container py-4 sm:py-5" aria-label="Current offers">
          <div className="grid lg:grid-cols-2 gap-4" role="list">
            <PhoneOffer offer={phoneOffers[0]} compact />
            <DealTile
              eyebrow="Switching carriers?"
              title={switcherOffer.headline}
              sub={switcherOffer.sub}
              href={dealHref("switcher-800")}
              image={{ src: "/images/hero-wireless-2.jpg", alt: "Couple looking at a phone together", position: "object-[62%_center]" }}
            />
          </div>
        </section>

        {/* ---------------- Plans: Internet | Wireless ---------------- */}
        <section id="plans" className="reveal py-10 sm:py-12 bg-white border-t border-att-gray-200 scroll-mt-40" aria-labelledby="plans-title">
          <div className="att-container">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 id="plans-title" className="att-h2 mb-1">Customize your bundle with AT&amp;T Fiber and AT&amp;T Wireless</h2>
                <p className="att-fine text-att-gray-600">Prices include the new-customer and AutoPay &amp; Paperless discounts. Take one service or both.</p>
              </div>
              <div className="inline-flex self-start rounded-full bg-att-gray-150 p-1" role="tablist" aria-label="Plan type">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.name}
                      plan={plan}
                      onCtaClick={() => openWizard({ source: "home-plan-card", service: "internet" })}
                      onDetailsClick={(modal) => setShowTermsModal(modal)}
                    />
                  ))}
                </div>

                <p className="mt-5 text-center att-fine text-att-gray-600">
                  <a href={broadbandFactsUrl} target="_blank" rel="noopener" className="text-att-navy font-bold underline underline-offset-2">
                    See Broadband Facts
                  </a>
                  {" · "}
                  <Link href="/att-fiber" className="text-att-navy font-bold underline underline-offset-2">
                    AT&amp;T Fiber by city
                  </Link>
                  {" · "}
                  <Link href="/att-internet-air" className="text-att-navy font-bold underline underline-offset-2">
                    Fiber not built at your address yet? AT&amp;T Internet Air from $55/mo
                  </Link>
                </p>

                <TrustStrip className="mt-6" />

                <details className="mt-5 att-fine text-att-gray-500 max-w-3xl mx-auto">
                  <summary className="cursor-pointer text-att-navy font-bold underline underline-offset-2 text-center list-none">Offer details &amp; footnotes</summary>
                  <div className="mt-3 space-y-2">
                    <p>‡ Upload speed comparison against Xfinity, Spectrum and Cox cable service at comparable download tiers with uploads of 10, 20 and 35 Mbps. Speeds vary and are not guaranteed. See www.att.com/speed101.</p>
                    <p>† Speed based on wired connection. Actual speeds may vary. For 5GIG, single device wired speed maximum 4.7Gbps. For more info, go to www.att.com/speed101.</p>
                    <p>{bundleFootnote}</p>
                    <p>* Limited time offer. Subject to change. New AT&amp;T Fiber customers will receive a discount for 12 months off the monthly recurring charge for an AT&amp;T Fiber plan ($15/mo w/300M or 500M; $30/mo w/1 Gig or higher). Pay full plan cost until discount starts w/in 3 bills. After 12 mos, prevailing rate for fiber plan applies.</p>
                  </div>
                </details>
              </div>
            ) : (
              <div id="panel-wireless" role="tabpanel" aria-labelledby="tab-wireless">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
                  {wirelessPlans.map((plan, i) => (
                    <WirelessPlanCard key={plan.name} plan={plan} highlighted={i === 2} source="home-wireless-card" />
                  ))}
                </div>
                <p className="mt-5 text-center att-fine text-att-gray-600">
                  <Link href="/wireless" className="text-att-navy font-bold underline underline-offset-2">
                    Phones, trade-ins and the full wireless page
                  </Link>
                </p>
                <p className="mt-5 att-fine text-att-gray-500 max-w-3xl mx-auto">* {wirelessFootnote}</p>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- AT&T Guarantee ---------------- */}
        <section className="reveal py-10 sm:py-12 bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="guarantee-title">
          <div className="att-container grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-8 lg:gap-14 items-start">
            <div>
              <p className="att-eyebrow text-att-navy mb-2">Backed by AT&amp;T</p>
              <h2 id="guarantee-title" className="att-h2 mb-3">{guarantee.headline}<sup className="att-reg">SM</sup></h2>
              <p className="text-att-gray-600 mb-5">{guarantee.sub}</p>
              <DealCta href={dealHref("att-guarantee")} />
            </div>
            <ul className="grid sm:grid-cols-3 gap-6" role="list">
              {guarantee.items.map((item, i) => {
                const Icon = guaranteeIcons[i];
                return (
                  <li key={item.title}>
                    <Icon className="w-9 h-9 text-att-ink mb-3" strokeWidth={1.4} aria-hidden="true" />
                    <h3 className="feature-title">{item.title}</h3>
                    <p className="feature-desc">{item.desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ---------------- Why AT&T Fiber: one row ---------------- */}
        <section className="reveal py-10 sm:py-12 bg-white" aria-labelledby="why-title">
          <div className="att-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
              <h2 id="why-title" className="att-h2">What you get with AT&amp;T Fiber</h2>
              <Link href="/why-fiber" className="text-att-navy font-bold underline underline-offset-2 att-fine">
                How fiber differs from cable
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="reveal py-10 sm:py-12 bg-att-dark text-white" aria-labelledby="steps-title">
          <div className="att-container grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-8 lg:gap-14">
            <div>
              <p className="att-eyebrow text-att-sky mb-2">After you order</p>
              <h2 id="steps-title" className="att-h2 mb-3" style={{ color: "#fff" }}>
                What happens next
              </h2>
              <p className="text-white/75">
                Four things, in this order. Nothing here needs you to chase anyone.
              </p>
              <div className="mt-6">
                <WizardButton source="home-steps" className="btn-on-dark">
                  Start with your ZIP
                </WizardButton>
              </div>
            </div>
            <ol className="timeline" role="list">
              {steps.map((step, i) => (
                <li key={step.title} className="timeline-item">
                  <span className="timeline-dot" aria-hidden="true">{i + 1}</span>
                  <p className="att-fine font-bold text-att-sky mb-1">{step.when}</p>
                  <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- FAQ preview ---------------- */}
        <section className="reveal py-10 sm:py-12 bg-white" aria-labelledby="faq-preview-title">
          <div className="att-container max-w-4xl">
            <div className="text-center mb-6">
              <h2 id="faq-preview-title" className="att-h2 mb-2">Before you order</h2>
              <p className="text-att-gray-600">The questions we answer most often on the ordering line.</p>
            </div>
            <dl className="divide-y divide-att-gray-200 border-y border-att-gray-200">
              {faqs.slice(0, 3).map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="font-bold text-att-ink mb-1.5">{faq.q}</dt>
                  <dd className="text-att-gray-600 text-[15px]">{faq.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-center">
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
    <li>
      {/* Bare, thin-line, ink — the way att.com draws benefit icons. */}
      <Icon className="w-9 h-9 text-att-ink mb-3" strokeWidth={1.4} aria-hidden="true" />
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-desc">{feature.desc}</p>
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
      <div className="plan-body !p-5">
        <p className="plan-label !mb-1">AT&amp;T Fiber</p>
        <div className="plan-speed !mb-2">{plan.speed}</div>
        <div className="plan-price !mb-0.5">
          <span className="plan-price-amount">{plan.price}</span>
          <span className="plan-price-period">/mo*</span>
          <span className="ml-2 text-att-gray-400 line-through text-sm">{plan.regularPrice}/mo</span>
        </div>
        <p className="text-xs text-att-gray-400 mb-3">
          Reg. {plan.regularPrice}/mo after 12 mos.
        </p>
        <p className="att-fine font-bold text-att-navy bg-att-light-blue rounded-lg px-2.5 py-1.5 mb-3">
          {plan.bundlePrice}/mo with an AT&amp;T unlimited wireless plan‡
        </p>
        <ul className="mb-4 space-y-1.5 flex-1" role="list">
          <li className="flex gap-2 att-fine text-att-ink"><Check />{plan.devices}</li>
          <li className="flex gap-2 att-fine text-att-gray-600"><Check />{plan.bestFor}</li>
          {plan.uploadVsCable && (
            <li className="flex gap-2 att-fine text-att-navy font-bold"><Check />{plan.uploadVsCable}‡</li>
          )}
        </ul>
        <a
          href={`#${plan.modal}`}
          className="plan-link !mb-3"
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
