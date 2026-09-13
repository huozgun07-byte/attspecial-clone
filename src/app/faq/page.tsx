"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { phoneNumber, telHref, faqs } from "@/lib/site-config";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-white" aria-labelledby="faq-title">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 id="faq-title" className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-xl p-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    {faq.q}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="mt-4 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <a href={telHref(phoneNumber)} className="text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Call {phoneNumber} - Available 24/7</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
