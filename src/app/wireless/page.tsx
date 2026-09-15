"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWizard } from "@/components/WizardProvider";
import HeroPanel from "@/components/HeroPanel";
import DealCta from "@/components/DealCta";
import WirelessPlanCard from "@/components/WirelessPlanCard";
import PhoneOffer from "@/components/PhoneOffer";
import { phoneNumber, telHref, wirelessPlans, wirelessFootnote, switcherOffer, phoneOffers } from "@/lib/site-config";
import { dealHref } from "@/lib/deals";

export default function WirelessPage() {
  const { openWizard } = useWizard();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroPanel image="/images/hero-wireless-2.jpg" imagePosition="object-[62%_center]">
          <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Wireless</p>
          <h1 id="hero-title" className="att-display mb-5">
            AT&amp;T wireless plans and phone deals
          </h1>
          <p className="text-white/90 text-lg max-w-xl mb-8">
            Unlimited lines, trade-in credits on the latest handsets, and nationwide 5G —
            bundled with your internet if you want a single bill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => openWizard({ source: "wireless", service: "wireless" })} className="btn-on-dark">
              Shop phones
            </button>
            <a href={telHref(phoneNumber)} className="btn-outline-white">
              Call {phoneNumber}
            </a>
          </div>
        </HeroPanel>

        <section className="reveal att-container pt-2 pb-4" aria-labelledby="switch-title">
          <div className="rounded-att bg-att-light-blue p-6 sm:p-10 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-6 lg:gap-12 items-center">
            <div>
              <p className="att-eyebrow text-att-navy mb-3">Switching from another carrier?</p>
              <h2 id="switch-title" className="att-h2 mb-3">{switcherOffer.headline}</h2>
              <p className="att-lead mb-5">{switcherOffer.sub}</p>
              <DealCta href={dealHref("switcher-800")} />
            </div>
            <p className="att-fine text-att-gray-600 lg:border-l lg:border-att-navy/15 lg:pl-8">{switcherOffer.terms}</p>
          </div>
        </section>

        <section className="reveal att-section bg-white border-b border-att-gray-200" aria-labelledby="wplans-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="wplans-title" className="att-h2 mb-3">Unlimited plans</h2>
              <p className="att-lead max-w-2xl mx-auto">
                Four unlimited tiers on the same 5G network. Mix and match plans across lines;
                the price below is per line with four lines.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {wirelessPlans.map((plan, i) => (
                <WirelessPlanCard key={plan.name} plan={plan} highlighted={i === 2} source="wireless-plan" />
              ))}
            </div>
            <p className="att-fine text-att-gray-500 text-center mt-8 max-w-3xl mx-auto">* {wirelessFootnote}</p>
          </div>
        </section>

        <section className="reveal att-section bg-white" aria-labelledby="phones-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="phones-title" className="att-h2 mb-3">Phone deals</h2>
              <p className="att-lead max-w-2xl mx-auto">
                Trade-in credits on the current flagships, applied to your bill monthly. Verified against att.com; a specialist confirms the credit for your exact phone.
              </p>
            </div>
            <div className={`grid gap-6 mx-auto ${phoneOffers.length > 1 ? "md:grid-cols-2 max-w-4xl" : "max-w-xl"}`}>
              {phoneOffers.map((offer) => (
                <PhoneOffer key={offer.slug} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        <section className="reveal att-section bg-att-gray-100" aria-labelledby="wireless-cta-title">
          <div className="att-container text-center">
            <h2 id="wireless-cta-title" className="att-h2 mb-3">Not sure how many lines you need?</h2>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Tell a specialist what phones you have now and how many people are on the account.
              They&apos;ll work out the trade-in credits and what the bill actually lands at.
            </p>
            <a href={telHref(phoneNumber)} className="btn-primary">
              Call {phoneNumber}
            </a>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
