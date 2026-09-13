import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { phoneNumber, businessPhone, telHref } from "@/lib/site-config";
import { siteName, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How this AT&T Preferred Dealer site collects, uses and shares the information you provide when checking availability, requesting a callback, or browsing the site.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="att-section bg-white" aria-labelledby="privacy-title">
          <div className="att-container max-w-3xl">
            <h1 id="privacy-title" className="att-h2 mb-3">Privacy Policy</h1>
            <p className="att-fine text-att-gray-500 mb-10">Last updated: September 2026</p>

            <div className="space-y-10 text-att-gray-700 leading-relaxed">
              <p>
                This policy explains what {siteName} (&quot;we&quot;, &quot;us&quot;) collects when
                you use this website, why we collect it, and who it is shared with. We are an
                authorised AT&amp;T Preferred Dealer; we sell AT&amp;T services and are not AT&amp;T
                itself.
              </p>

              <section>
                <h2 className="att-h3 mb-4">What we collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-att-ink">Address details you submit.</strong> The street
                    address, unit and ZIP code you enter in the availability form, plus whether you
                    marked it as a move-in address.
                  </li>
                  <li>
                    <strong className="text-att-ink">Contact details you give us.</strong> Anything
                    you provide by phone or in follow-up — name, phone number, email address.
                  </li>
                  <li>
                    <strong className="text-att-ink">Technical and usage data.</strong> Pages viewed,
                    referring site, approximate location derived from your IP address, browser and
                    device type, and which page a form was submitted from.
                  </li>
                </ul>
                <p className="mt-4">
                  We do not ask for payment card numbers, Social Security numbers or credit-check
                  details on this website. If an order requires them, they are collected directly by
                  AT&amp;T during order processing, not here.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Why we collect it</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To check which AT&amp;T services are available at your address.</li>
                  <li>To contact you about the order or question you started.</li>
                  <li>To place and support an AT&amp;T order you ask us to place.</li>
                  <li>To measure which pages and ads bring in enquiries, and to improve the site.</li>
                  <li>To meet legal, tax and record-keeping obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Who we share it with</h2>
                <p className="mb-4">
                  Availability submissions are sent to our own sales inbox and recorded in our
                  internal spreadsheet so a specialist can follow up. Beyond that, information is
                  shared with:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-att-ink">AT&amp;T</strong>, where necessary to check
                    availability or place and service an order you requested.
                  </li>
                  <li>
                    <strong className="text-att-ink">Service providers</strong> that run this site
                    and our tooling — hosting, email delivery, spreadsheet storage and analytics —
                    acting on our instructions.
                  </li>
                  <li>
                    <strong className="text-att-ink">Advertising platforms</strong>, where cookies
                    are allowed, as described below.
                  </li>
                  <li>
                    <strong className="text-att-ink">Authorities</strong>, if we are legally required
                    to disclose information.
                  </li>
                </ul>
                <p className="mt-4">
                  <strong className="text-att-ink">We do not sell your personal information</strong>{" "}
                  for money. Note that sharing data with advertising platforms for targeted
                  advertising can count as a &quot;sale&quot; or &quot;sharing&quot; under some state
                  privacy laws — declining cookies on this site stops that sharing.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Cookies and advertising pixels</h2>
                <p className="mb-4">
                  When you accept cookies, this site may load measurement and advertising tags from
                  Meta (Facebook and Instagram), TikTok and Google. These record page views, form
                  submissions and clicks on phone links, so we can see which ads produce enquiries
                  and show ads to people who have visited the site.
                </p>
                <p>
                  If you press <strong className="text-att-ink">Decline</strong> on the cookie
                  banner, those tags are not loaded at all. You can also change your choice at any
                  time by clearing this site&apos;s data in your browser, which brings the banner
                  back.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">How long we keep it</h2>
                <p>
                  Enquiry records are kept for as long as needed to serve the customer relationship
                  and to meet our record-keeping obligations, then deleted. Analytics and advertising
                  data are kept according to each platform&apos;s own retention settings.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Your choices and rights</h2>
                <p className="mb-4">
                  You can ask us to give you a copy of the information we hold about you, correct it,
                  or delete it. Residents of California and other states with comprehensive privacy
                  laws have these rights explicitly, including the right to opt out of targeted
                  advertising and not to be discriminated against for exercising them.
                </p>
                <p>
                  To make a request, call{" "}
                  <a href={telHref(phoneNumber)} className="text-att-navy font-bold underline underline-offset-2">
                    {phoneNumber}
                  </a>{" "}
                  and tell the specialist it is a privacy request. We may need to verify your
                  identity before acting.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Children</h2>
                <p>
                  This site is intended for adults ordering residential or business service. We do
                  not knowingly collect information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Changes to this policy</h2>
                <p>
                  If this policy changes we will update the date at the top of the page. Material
                  changes will be noted on the site.
                </p>
              </section>

              <section>
                <h2 className="att-h3 mb-4">Contact us</h2>
                <p>
                  Residential orders and privacy requests:{" "}
                  <a href={telHref(phoneNumber)} className="text-att-navy font-bold underline underline-offset-2">
                    {phoneNumber}
                  </a>{" "}
                  (available 24/7). Business enquiries:{" "}
                  <a href={telHref(businessPhone)} className="text-att-navy font-bold underline underline-offset-2">
                    {businessPhone}
                  </a>
                  . You can also read our{" "}
                  <Link href="/faq" className="text-att-navy font-bold underline underline-offset-2">
                    FAQ
                  </Link>{" "}
                  for service questions.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
