import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSwoosh from "@/components/HeroSwoosh";
import AddressCheckFlow from "@/components/AddressCheckFlow";
import { cities, citiesBySlug } from "@/lib/cities";
import { plans, phoneNumber, telHref, faqs } from "@/lib/site-config";
import { siteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug.get(slug);
  if (!city) return {};

  return pageMetadata({
    title: `AT&T Fiber in ${city.city}, ${city.state} — Plans & Availability`,
    description: `Check AT&T Fiber availability at your ${city.city} address. Plans from $35/mo with speeds up to 5 GIG, unlimited data, free professional installation and a $250 Reward Card. Order 24/7 from an AT&T Preferred Dealer.`,
    path: `/att-fiber/${city.slug}`,
    keywords: [
      `AT&T Fiber ${city.city}`,
      `AT&T internet ${city.city} ${city.state}`,
      `fiber internet ${city.city}`,
      `internet providers ${city.city}`,
      `AT&T availability ${city.city}`,
    ],
  });
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = citiesBySlug.get(slug);
  if (!city) notFound();

  const nearby = city.nearby
    .map((s) => citiesBySlug.get(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // City-specific questions — the answers differ per market, which is the point.
  const cityFaqs = [
    {
      q: `Is AT&T Fiber available everywhere in ${city.city}?`,
      a: `Not yet. Across ${city.metro} the network is built block by block, so availability is decided at the address level — two homes on the same street can get different answers. The check on this page looks at the address record rather than a ZIP-level estimate.`,
    },
    {
      q: `How long does an AT&T Fiber install take in ${city.city}?`,
      a: `Most ${city.city} appointments run two to four hours. The technician brings the line to the property, mounts and configures the All-Fi Hub, then tests the connection with you before leaving. Professional installation is included with Fiber plans, and the large majority of installs finish in a single visit.`,
    },
    {
      q: `What if fiber hasn't reached my ${city.city} address yet?`,
      a:
        city.state === "NV"
          ? `In Nevada, AT&T Internet Air is not offered, so fiber is the AT&T option here. If it isn't built at your address yet we'll tell you plainly rather than leave you waiting.`
          : `AT&T Internet Air is usually the alternative: home internet over the AT&T 5G network at $55/mo with AutoPay, up to 100 Mbps, with self-setup in minutes. We check both in the same call.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `AT&T Fiber internet in ${city.city}, ${city.state}`,
        serviceType: "Fiber internet service",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: {
          "@type": "City",
          name: city.city,
          containedInPlace: { "@type": "State", name: city.stateName },
        },
        url: `${siteUrl}/att-fiber/${city.slug}`,
        offers: plans.map((plan) => ({
          "@type": "Offer",
          name: `AT&T Fiber ${plan.speed}`,
          price: plan.price.replace("$", ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "AT&T Fiber by city", item: `${siteUrl}/att-fiber` },
          { "@type": "ListItem", position: 3, name: `${city.city}, ${city.state}`, item: `${siteUrl}/att-fiber/${city.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: cityFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="att-container pt-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-att-gray-600">
            <li><Link href="/" className="hover:text-att-navy">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/att-fiber" className="hover:text-att-navy">AT&amp;T Fiber by city</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-att-ink font-medium">{city.city}, {city.state}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="att-container pt-4 pb-10 sm:pt-5 sm:pb-12" aria-labelledby="hero-title">
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
            <HeroSwoosh />

            <div className="relative grid lg:grid-cols-[1.1fr_minmax(300px,410px)] gap-8 lg:gap-14 items-center p-6 sm:p-9 lg:p-12">
              <div>
                <p className="att-eyebrow text-att-sky mb-3">{city.metro}</p>
                <h1 id="hero-title" className="att-display mb-5">
                  AT&amp;T Fiber in {city.city}, {city.state}
                </h1>
                <p className="text-white/90 text-lg max-w-xl mb-6">{city.blurb}</p>
                <p className="text-white/85 att-fine max-w-xl">
                  Plans from $35/mo with AutoPay &amp; Paperless bill. Unlimited data, no annual
                  contract on eligible plans, professional installation included.
                </p>
              </div>

              <div className="att-hero-card" id="check" role="region" aria-label={`Check availability in ${city.city}`}>
                <h2 className="att-h3 mb-4">Check your {city.city} address</h2>
                <AddressCheckFlow
                  idPrefix={`city-${city.slug}`}
                  source={`city-${city.slug}`}
                  submitLabel="Check availability"
                  showHelpText={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="att-section bg-white border-t border-att-gray-200" aria-labelledby="plans-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="plans-title" className="att-h2 mb-3">
                AT&amp;T Fiber plans in {city.city}
              </h2>
              <p className="att-lead max-w-2xl mx-auto">
                Pricing is the same across the AT&amp;T Fiber footprint — what changes by address
                is which speed tiers are built. Check yours and we&apos;ll tell you which of these
                four you can actually order.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`plan-card ${plan.highlighted ? "plan-card-highlighted" : ""}`}
                  role="listitem"
                >
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
                    <a href="#check" className={`w-full ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}>
                      {plan.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-10 att-fine text-att-gray-500 max-w-3xl mx-auto">
              * Limited time offer, subject to change. Prices shown include the new-customer
              discount for 12 mos and the $10/mo AutoPay &amp; Paperless bill discount; the
              prevailing rate applies after 12 mos. † Speeds based on wired connection; on 5 GIG a
              single wired device tops out at 4.7 Gbps. Ltd. avail/areas.
            </p>
          </div>
        </section>

        {/* Areas covered */}
        <section className="att-section bg-att-gray-100" aria-labelledby="areas-title">
          <div className="att-container">
            <div className="max-w-3xl">
              <h2 id="areas-title" className="att-h2 mb-3">
                Areas we order for around {city.city}
              </h2>
              <p className="att-lead mb-8">
                These are neighborhoods and suburbs we take orders in across {city.metro}. Being on
                the list doesn&apos;t guarantee fiber at a specific house — it means we can check it
                and, where fiber isn&apos;t built, tell you what else is available.
              </p>
            </div>
            <ul className="flex flex-wrap gap-3" role="list">
              {city.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="bg-white border border-att-gray-200 rounded-full px-4 py-2 text-sm text-att-gray-700"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Local ordering notes */}
        <section className="att-section bg-white" aria-labelledby="local-title">
          <div className="att-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 id="local-title" className="att-h2 mb-4">
                Ordering in {city.city}: what actually matters
              </h2>
              <p className="text-att-gray-700 text-lg leading-relaxed mb-4">{city.localNote}</p>
              <p className="text-att-gray-700 text-lg leading-relaxed">
                Everything else works the way it does anywhere in the AT&amp;T footprint: unlimited
                data, no annual contract on eligible plans, and the All-Fi Hub included. If you
                would rather talk it through than fill in a form, the line is open 24/7.
              </p>
              <p className="mt-8">
                <a href={telHref(phoneNumber)} className="btn-primary">
                  Call {phoneNumber}
                </a>
              </p>
            </div>

            <div className="surface-card p-6 sm:p-8">
              <h3 className="att-h3 mb-4">{city.city} questions</h3>
              <dl className="divide-y divide-att-gray-200">
                {cityFaqs.map((faq) => (
                  <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                    <dt className="font-bold text-att-ink mb-1.5">{faq.q}</dt>
                    <dd className="text-att-gray-600 text-sm leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6">
                <Link href="/faq" className="text-att-navy font-bold underline underline-offset-2">
                  Read the full FAQ
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Nearby cities */}
        {nearby.length > 0 && (
          <section className="att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="nearby-title">
            <div className="att-container">
              <h2 id="nearby-title" className="att-h2 mb-8">Nearby cities</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/att-fiber/${n.slug}`}
                    className="bg-white rounded-2xl border border-att-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <p className="att-h3 mb-2">{n.city}, {n.state}</p>
                    <p className="text-att-gray-600 text-sm">{n.metro}</p>
                  </Link>
                ))}
              </div>
              <p className="mt-8">
                <Link href="/att-fiber" className="text-att-navy font-bold underline underline-offset-2">
                  See all cities we cover
                </Link>
              </p>
            </div>
          </section>
        )}

        {/* Shared FAQ teaser */}
        <section className="att-section bg-white" aria-labelledby="general-faq-title">
          <div className="att-container max-w-4xl">
            <h2 id="general-faq-title" className="att-h2 mb-8 text-center">Before you order</h2>
            <dl className="divide-y divide-att-gray-200 border-y border-att-gray-200">
              {faqs.slice(0, 3).map((faq) => (
                <div key={faq.q} className="py-6">
                  <dt className="font-bold text-att-ink mb-2 text-lg">{faq.q}</dt>
                  <dd className="text-att-gray-600">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const dynamicParams = false;
