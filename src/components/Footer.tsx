"use client";

import Link from "next/link";
import Image from "next/image";
import { phoneNumber, businessPhone, telHref } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-att-gray-50 border-t border-att-gray-200" role="contentinfo">
      <div className="att-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-2">
            <Image
              src="/images/att-preferred-dealer.png"
              alt="AT&T Preferred Dealer"
              width={180}
              height={45}
              className="h-9 w-auto mb-3"
            />
            <p className="text-sm text-att-gray-600 max-w-xs mb-3">
              An AT&T Preferred Dealer helping households and businesses find the right AT&T Fiber, Internet Air, and Wireless plan.
            </p>
            <a href={telHref(phoneNumber)} className="text-sm font-semibold text-att-blue hover:underline">
              Call {phoneNumber}
            </a>
            <p className="text-xs text-att-gray-500 mt-1">Available 24/7</p>
          </div>
          <div>
            <h4 className="font-semibold text-att-gray-900 mb-4">AT&T Services</h4>
            <ul className="space-y-2 text-sm text-att-gray-600">
              <li><Link href="/" className="hover:underline">Internet</Link></li>
              <li><Link href="/att-internet-air" className="hover:underline">AT&T Internet Air</Link></li>
              <li><Link href="/wireless" className="hover:underline">Wireless Phone</Link></li>
              <li><Link href="/business" className="hover:underline">Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-att-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-att-gray-600">
              <li><a href={telHref(phoneNumber)} className="hover:underline">Call {phoneNumber}</a></li>
              <li><a href={telHref(businessPhone)} className="hover:underline">Business: {businessPhone}</a></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-att-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-att-gray-600">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/espanol" className="hover:underline">ESPAÑOL</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-att-gray-200 text-sm text-att-gray-500">
          <p>AT&T and globe logo are registered trademarks of AT&T Intellectual Property. © 2026 AT&T Intellectual Property. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
