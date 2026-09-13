"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const phoneNumber = "866.307.3525";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-blue-100 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Go Home
            </Link>
            <a
              href={`tel:${phoneNumber.replace(/\./g, "")}`}
              className="border-2 border-blue-700 text-blue-700 py-3 px-8 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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