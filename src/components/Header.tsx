"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { phoneNumber, navItems, telHref } from "@/lib/site-config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-att-dark-blue text-white py-2">
        <div className="att-container flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <span>Order AT&T today!</span>
            <a href={telHref(phoneNumber)} className="font-bold hover:underline">
              Call {phoneNumber}
            </a>
            <span className="hidden sm:inline">Available 24/7</span>
          </div>
          <Link href={pathname === "/espanol" ? "/" : "/espanol"} className="text-sm hover:underline">
            {pathname === "/espanol" ? "ENGLISH" : "ESPAÑOL"}
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-att-gray-200 sticky top-0 z-50">
        <div className="att-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="AT&T Preferred Dealer - Home">
              {/* Using the raster logo: the generated .svg version has an
                  unescaped "&" in its "AT&T" text node, which is invalid XML
                  and fails to render in the browser (that's what broke the
                  header logo). The .png is the proven, working asset. */}
              <Image
                src="/images/att-preferred-dealer.png"
                alt="AT&T Preferred Dealer"
                width={220}
                height={55}
                className="h-12 w-auto sm:h-14"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-att-blue"
                      : "text-att-gray-700 hover:text-att-blue"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-att-gray-700 hover:bg-att-gray-100 focus:outline-none focus:ring-2 focus:ring-att-cyan"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href={telHref(phoneNumber)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-att-blue text-white text-sm font-semibold rounded-full hover:bg-att-dark-blue transition-colors focus:outline-none focus:ring-2 focus:ring-att-cyan focus:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </Link>
              <a
                href={telHref(phoneNumber)}
                className="text-att-blue font-bold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-att-cyan rounded"
              >
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-att-gray-200 animate-slide-down">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-att-blue/5 text-att-blue"
                      : "text-att-gray-700 hover:bg-att-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-att-gray-200 flex flex-col gap-3">
                <Link
                  href={telHref(phoneNumber)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-att-blue text-white font-semibold rounded-full hover:bg-att-dark-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now: {phoneNumber}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <style jsx global>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
