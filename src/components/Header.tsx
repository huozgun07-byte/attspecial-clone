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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">
      {/* Row 1 — logo + call block (attspecial.com / att.com: all white, no colored bar) */}
      <div className="att-container">
        <div className="flex items-center justify-between gap-4 pt-4 pb-3 sm:pt-5">
          <Link href="/" className="flex-shrink-0" aria-label="AT&T Preferred Dealer - Home">
            <Image
              src="/images/att-preferred-dealer.png"
              alt="AT&T Preferred Dealer"
              width={240}
              height={100}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>

          <div className="text-right leading-tight">
            <p className="text-att-ink text-xs sm:text-sm">Order AT&amp;T today!</p>
            <a
              href={telHref(phoneNumber)}
              className="block font-bold text-att-navy hover:text-att-navy-dark text-lg sm:text-2xl lg:text-[28px] tracking-tight"
            >
              <span className="hidden sm:inline">Call </span>{phoneNumber}
            </a>
            <p className="text-att-gray-600 text-xs sm:text-sm">Available 24/7</p>
          </div>
        </div>
      </div>

      {/* Row 2 — navigation */}
      <div className="att-container">
        <div className="flex items-center justify-between border-t border-att-gray-200 sm:border-t-0">
          <nav className="hidden md:flex items-center gap-9 py-3" aria-label="Main navigation">
            {navItems
              .filter((item) => item.href !== "/espanol")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors ${
                    pathname === item.href
                      ? "text-att-navy"
                      : "text-att-ink hover:text-att-navy"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden my-2 p-2 rounded-md text-att-ink hover:bg-att-gray-100 focus:outline-none focus:ring-2 focus:ring-att-cyan"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link
            href={pathname === "/espanol" ? "/" : "/espanol"}
            className="py-3 text-[15px] font-medium text-att-ink hover:text-att-navy"
          >
            {pathname === "/espanol" ? "ENGLISH" : "ESPAÑOL"}
          </Link>
        </div>
      </div>

      <div className="border-b border-att-gray-200" />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-b border-att-gray-200 bg-white animate-slide-down">
          <nav className="att-container py-3 flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-1 py-3 text-base font-medium border-b border-att-gray-100 last:border-b-0 ${
                  pathname === item.href ? "text-att-navy" : "text-att-ink"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={telHref(phoneNumber)}
              className="btn-primary w-full mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Call {phoneNumber}
            </Link>
          </nav>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.2s ease-out; }
      `}</style>
    </header>
  );
}
