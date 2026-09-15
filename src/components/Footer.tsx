"use client";

import Link from "next/link";
import Image from "next/image";
import { phoneNumber, businessPhone, telHref } from "@/lib/site-config";
import { deals, dealHref } from "@/lib/deals";

export default function Footer() {
  return (
    <footer className="bg-att-dark text-white" role="contentinfo">
      <div className="att-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          <div className="col-span-2">
            <Image
              src="/images/att-preferred-dealer-white.png"
              alt="AT&T Preferred Dealer"
              width={600}
              height={269}
              className="h-11 w-auto mb-4"
            />
            <p className="text-white/70 text-sm max-w-xs mb-4 leading-relaxed">
              An AT&amp;T Preferred Dealer helping households and businesses find the right
              AT&amp;T Fiber, Internet Air, and Wireless plan.
            </p>
            <a href={telHref(phoneNumber)} className="font-bold text-white hover:text-att-sky text-lg">
              {phoneNumber}
            </a>
            <p className="text-white/60 text-sm mt-1">Available 24/7</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-base">AT&amp;T Services</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Internet</Link></li>
              <li><Link href="/att-internet-air" className="hover:text-white">AT&amp;T Internet Air</Link></li>
              <li><Link href="/wireless" className="hover:text-white">Wireless Phone</Link></li>
              <li><Link href="/business" className="hover:text-white">Business</Link></li>
              <li><Link href="/att-fiber" className="hover:text-white">Fiber by city</Link></li>
              <li><Link href="/why-fiber" className="hover:text-white">Why AT&amp;T Fiber</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-base">Deals</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              {deals.map((deal) => (
                <li key={deal.slug}><Link href={dealHref(deal.slug)} className="hover:text-white">{deal.navLabel}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-base">Support</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href={telHref(phoneNumber)} className="hover:text-white">Call {phoneNumber}</a></li>
              <li><a href={telHref(businessPhone)} className="hover:text-white">Business: {businessPhone}</a></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-base">Legal</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/espanol" className="hover:text-white">ESPAÑOL</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 text-white/55 text-[13px] leading-relaxed">
          <p>
            AT&amp;T and the globe logo are registered trademarks of AT&amp;T Intellectual Property.
            © 2026 AT&amp;T Intellectual Property. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
