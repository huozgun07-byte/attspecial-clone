import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import AvailabilityCard from "@/components/AvailabilityCard";
import HeroSwoosh from "@/components/HeroSwoosh";
import { cities, citiesByState } from "@/lib/cities";
import { phoneNumber, telHref } from "@/lib/site-config";
import { siteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AT&T Fiber by City — Availability & Plans",
  description: `Check AT&T Fiber availability in ${cities.length} cities across AT&T's 21-state footprint. Plans from $35/mo, unlimited data, professional install included. Order 24/7 from an AT&T Preferred Dealer.`,
  path: "/att-fiber",
  keywords: ["AT&T Fiber cities", "AT&T Fiber availability", "AT&T internet by city", "fiber internet near me"],
});

const states = citiesByState();

export default function AttFiberHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "AT&T Fiber by city", item: `${siteUrl}/att-fiber` },
        ],
      },
      {
        "@type": "ItemList",
        name: "AT&T Fiber cities",
        numberOfItems: cities.length,
        itemListElement: cities.map((city, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${city.city}, ${city.state}`,
          url: `${siteUrl}/att-fiber/${city.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="att-container pt-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-att-gray-600">
            <li><Link href="/" className="hover:text-att-navy">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-att-ink font-medium">AT&amp;T Fiber by city</li>
          </ol>
        </nav>

        <section className="att-container pt-4 pb-10 sm:pt-6 sm:pb-12" aria-labelledby="hub-title">
          <div className="att-hero-shell">
            <Image
              src="/images/hero-cities.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1296px) 100vw, 1296px"
              className="object-cover object-[60%_center]"
              aria-hidden="true"
            />
            <div className="att-hero-scrim" aria-hidden="true" />
            <HeroSwoosh />
            <div className="relative grid lg:grid-cols-[1.15fr_minmax(300px,400px)] gap-10 lg:gap-16 items-center p-6 sm:p-9 lg:p-12">
              <div>
                <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Preferred Dealer</p>
                <h1 id="hub-title" className="att-display mb-5">
                  AT&amp;T Fiber availability by city
                </h1>
                <p className="text-white/85 text-lg mb-4">
                  AT&amp;T Fiber is sold across a 21-state footprint, and inside those states the
                  network is built out street by street rather than city-wide. These pages cover the{" "}
                  {cities.length} metros we take the most orders in — pick yours for local detail, or
                  just check your address on the right.
                </p>
                <p className="text-white/80">
                  Not on the list? We still order anywhere AT&amp;T Fiber is available. Call{" "}
                  <a href={telHref(phoneNumber)} className="text-white font-bold underline underline-offset-2 hover:text-att-sky">
                    {phoneNumber}
                  </a>{" "}
                  and a specialist will check it with you.
                </p>
              </div>

              <AvailabilityCard
                className="att-hero-card"
                title="Check any address"
                source="att-fiber-hub"
                cta="Check availability"
              />
            </div>
          </div>
        </section>

        <section className="reveal att-section bg-white" aria-labelledby="cities-title">
          <div className="att-container">
            <h2 id="cities-title" className="att-h2 mb-3">Cities we cover</h2>
            <p className="att-lead mb-10 max-w-2xl">
              Grouped by state. Every city page lists the neighborhoods we order in, the plans
              available in that market, and what tends to matter locally when the technician arrives.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
              {states.map((group) => (
                <div key={group.stateName}>
                  <h3 className="att-h3 mb-4 pb-2 border-b border-att-gray-200">{group.stateName}</h3>
                  <ul className="space-y-2.5" role="list">
                    {group.items.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/att-fiber/${city.slug}`}
                          className="text-att-gray-700 hover:text-att-navy"
                        >
                          AT&amp;T Fiber in {city.city}, {city.state}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal att-section bg-att-gray-100 border-t border-att-gray-200" aria-labelledby="footprint-title">
          <div className="att-container max-w-3xl">
            <h2 id="footprint-title" className="att-h2 mb-4">Where AT&amp;T Fiber is sold</h2>
            <p className="text-att-gray-700 text-lg leading-relaxed mb-4">
              AT&amp;T&apos;s wireline network covers 21 states: Alabama, Arkansas, California,
              Florida, Georgia, Illinois, Indiana, Kansas, Kentucky, Louisiana, Michigan,
              Mississippi, Missouri, Nevada, North Carolina, Ohio, Oklahoma, South Carolina,
              Tennessee, Texas and Wisconsin. Fiber is built inside that footprint — which is why
              an address in one of those states still needs checking, and an address outside them
              can&apos;t be served at all.
            </p>
            <p className="text-att-gray-700 text-lg leading-relaxed">
              Where fiber hasn&apos;t reached yet, <Link href="/att-internet-air" className="text-att-navy font-bold underline underline-offset-2">AT&amp;T Internet Air</Link>{" "}
              covers most of the gap over the AT&amp;T 5G network — with the exception of Nevada,
              where Internet Air isn&apos;t offered.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
