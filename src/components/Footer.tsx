"use client";

import Link from "next/link";
import Image from "next/image";
import { phoneNumber, businessHours, telHref } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-2">
            <Image
              src="/images/att-preferred-dealer.png"
              alt="AT&T Preferred Dealer"
              width={200}
              height={80}
              className="h-9 w-auto mb-4"
            />
            <p className="text-sm text-gray-600 max-w-xs mb-4">
              An authorized AT&T Preferred Dealer helping you find the right AT&T Fiber plan for your home.
            </p>
            <a href={telHref(phoneNumber)} className="text-blue-700 font-bold hover:underline block">
              {phoneNumber}
            </a>
            <p className="text-sm text-gray-500">{businessHours}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">AT&T Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:underline">Internet</Link></li>
              <li><Link href="/att-internet-air" className="hover:underline">AT&T Internet Air</Link></li>
              <li><Link href="/wireless" className="hover:underline">Wireless Phone</Link></li>
              <li><Link href="/business" className="hover:underline">Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href={telHref(phoneNumber)} className="hover:underline">Call {phoneNumber}</a></li>
              <li>Available 24/7</li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 AT&T Intellectual Property. All rights reserved. AT&T and globe logo are registered trademarks of AT&T Intellectual Property.</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/updater-logo.svg"
              alt="Powered by Updater"
              width={100}
              height={30}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
