"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const phoneNumber = "866.307.3525";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-white" aria-labelledby="privacy-title">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 id="privacy-title" className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose text-gray-600 space-y-6 max-w-none">
              <p><strong>Last Updated:</strong> January 2026</p>
              <p>This Privacy Policy describes how AT&T Preferred Dealer ("we", "us", "our") collects, uses, and shares your personal information when you visit our website attspecial.com.</p>
              
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact information (name, phone, email, address)</li>
                <li>Service address for availability checks</li>
                <li>Usage data and cookies</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Check service availability</li>
                <li>Process orders and communicate with you</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900">Sharing Information</h2>
              <p>We share information with AT&T and authorized partners to fulfill your service requests. We do not sell your personal information.</p>

              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              <p>You may request access, correction, or deletion of your data. Contact us at the number below.</p>

              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <p>Questions about this policy? Call <a href={`tel:${phoneNumber.replace(/\./g, "")}`} className="text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">{phoneNumber}</a> (Available 24/7).</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}