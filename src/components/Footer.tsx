"use client";

import Link from "next/link";
import Image from "next/image";

const phoneNumber = "866.307.3525";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href={`tel:${phoneNumber.replace(/\./g, "")}`} className="hover:underline">Call {phoneNumber}</a></li>
              <li>Available 24/7</li>
            </ul>
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
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <p className="text-sm text-gray-600">© 2026 AT&T Intellectual Property. All rights reserved.</p>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>AT&T and globe logo are registered trademarks of AT&T Intellectual Property.</p>
          <div className="flex items-center gap-2">
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