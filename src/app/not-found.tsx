"use client";

import Link from "next/link";
import { phoneNumber, telHref } from "@/lib/site-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-att-light-blue mb-4">404</h1>
          <h2 className="text-3xl font-bold text-att-ink mb-4">Page Not Found</h2>
          <p className="text-att-gray-600 mb-8">Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-att-navy text-white py-3 px-8 rounded-lg font-semibold hover:bg-att-navy-dark transition-colors"
            >
              Go Home
            </Link>
            <a
              href={telHref(phoneNumber)}
              className="border-2 border-att-navy text-att-navy py-3 px-8 rounded-lg font-semibold hover:bg-att-light-blue transition-colors"
            >
              Call {phoneNumber}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}