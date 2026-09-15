import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPanel from "@/components/HeroPanel";
import AvailabilityCard from "@/components/AvailabilityCard";
import WizardButton from "@/components/WizardButton";
import { deals, dealsBySlug } from "@/lib/deals";
import { plans, wirelessPlans, wirelessFootnote, phoneNumber, telHref } from "@/lib/site-config";
import { siteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const deal = dealsBySlug.get(slug);
  if (!deal) return {};
  return pageMetadata({
    title: `${deal.title} — AT&T Preferred Dealer`,
    description: deal.summary,
    path: `/deals/${deal.slug}`,
  });
}

export default async function DealPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deal = dealsBySlug.get(slug);
  if (!deal) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: deal.title, item: `${siteUrl}/deals/${deal.slug}` },
    ],
  };

  const fiber = deal.plans === "fiber";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="att-container pt-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-att-gray-600">
            <li><Link href="/" className="hover:text-att-navy">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-att-ink font-medium">{deal.eyebrow}</li>
          </ol>
        </nav>

        <HeroPanel image={deal.image} imagePosition={deal.imagePosition}>
          <p className="att-eyebrow text-att-sky mb-3">{deal.eyebrow}</p>
          <h1 id="hero-title" className="att-display mb-5">{deal.title}</h1>
          <p className="text-white/90 text-lg max-w-xl mb-8">{deal.summary}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={telHref(phoneNumber)} className="btn-on-dark">Call {phoneNumber}</a>
            <WizardButton source={deal.wizardSource} service={deal.wizardService} className="btn-outline-white">
              Check availability
            </WizardButton>
          </div>
        </HeroPanel>

        {/* How it works + sticky availability card */}
        <section className="reveal att-section bg-white" aria-labelledby="how-title">
          <div className="att-container grid lg:grid-cols-[minmax(0,7fr)_minmax(300px,5fr)] gap-10 lg:gap-16 items-start">
            <div>
              <p className="att-eyebrow text-att-navy mb-3">How it works</p>
              <h2 id="how-title" className="att-h2 mb-4">What you do, in order</h2>
              <p className="att-lead mb-8">{deal.description}</p>
              <ol className="timeline" role="list">
                {deal.steps.map((step, i) => (
                  <li key={step.title} className="timeline-item">
                    <span className="timeline-dot" aria-hidden="true">{i + 1}</span>
                    <h3 className="font-bold text-att-ink text-lg mb-1.5">{step.title}</h3>
                    <p className="text-att-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="surface-card p-6 sm:p-8 lg:sticky lg:top-40">
              <AvailabilityCard
                title="Ready when you are"
                subtitle="A few quick questions, starting with your ZIP. A specialist confirms what reaches your address and books everything on one call."
                source={deal.wizardSource}
                cta="Check my address"
              />
            </div>
          </div>
        </section>

        {/* Price table */}
        {deal.plans !== "none" && (
          <section className="reveal att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="prices-title">
            <div className="att-container max-w-4xl">
              <h2 id="prices-title" className="att-h2 mb-8 text-center">
                {fiber ? "Fiber plans with the bundle discount" : "Unlimited plans you can switch to"}
              </h2>
              <div className="overflow-x-auto bg-white rounded-2xl border border-att-gray-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-att-gray-200 att-fine uppercase tracking-wide text-att-gray-500">
                      <th className="px-5 py-4 font-bold">Plan</th>
                      <th className="px-5 py-4 font-bold">{fiber ? "Fiber only" : "Per line, 4 lines"}</th>
                      <th className="px-5 py-4 font-bold">{fiber ? "With unlimited wireless‡" : "Without AutoPay"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-att-gray-200">
                    {fiber
                      ? plans.map((plan) => (
                          <tr key={plan.name}>
                            <td className="px-5 py-4 font-bold text-att-ink">AT&amp;T Fiber {plan.speed}</td>
                            <td className="px-5 py-4 text-att-gray-700">{plan.price}/mo*</td>
                            <td className="px-5 py-4 font-bold text-att-navy">{plan.bundlePrice}/mo*</td>
                          </tr>
                        ))
                      : wirelessPlans.map((plan) => (
                          <tr key={plan.name}>
                            <td className="px-5 py-4 font-bold text-att-ink">AT&amp;T {plan.name}</td>
                            <td className="px-5 py-4 font-bold text-att-navy">{plan.price}/mo*</td>
                            <td className="px-5 py-4 text-att-gray-700">{plan.regularPrice}/mo</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              <p className="att-fine text-att-gray-500 mt-4 max-w-3xl mx-auto">
                {fiber
                  ? "* For 12 months with the new-customer discount and AutoPay & Paperless bill; prevailing rate applies after. ‡ See bundle terms below."
                  : `* ${wirelessFootnote}`}
              </p>
              <p className="mt-6 text-center">
                <Link href={fiber ? "/#internet" : "/#wireless"} className="text-att-navy font-bold underline underline-offset-2">
                  {fiber ? "Compare all fiber plans" : "Compare all wireless plans"}
                </Link>
              </p>
            </div>
          </section>
        )}

        {/* Terms */}
        <section className="reveal att-section bg-white" aria-labelledby="terms-title">
          <div className="att-container max-w-4xl">
            <h2 id="terms-title" className="att-h3 mb-4">Offer details</h2>
            <div className="att-fine text-att-gray-500 space-y-3">
              {deal.terms.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}
              <p>
                Source:{" "}
                <a href={deal.sourceUrl} className="underline underline-offset-2 hover:text-att-navy" rel="noopener" target="_blank">
                  {deal.sourceNote}
                </a>
                . Limited time offer, subject to change.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const dynamicParams = false;
