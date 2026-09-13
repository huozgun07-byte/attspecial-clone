"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const phoneNumber = "866.307.3525";

const faqs = [
  { q: "What is AT&T Fiber?", a: "AT&T Fiber is a 100% fiber optic network that delivers ultra-fast internet speeds up to 5 GIGs. It provides symmetrical upload/download speeds, low latency, and reliable connectivity for streaming, gaming, and working from home." },
  { q: "Is AT&T Fiber available in my area?", a: "AT&T Fiber is expanding rapidly. Enter your address in the availability checker on our homepage to see if service is available at your location." },
  { q: "What equipment do I need?", a: "AT&T provides the All-Fi Hub (gateway) at no extra cost with most plans. Professional installation is included for Fiber plans." },
  { q: "Are there data caps?", a: "No. AT&T Fiber plans include unlimited data - no overage fees or throttling." },
  { q: "What is the AutoPay & Paperless bill discount?", a: "Save $10/mo when enrolled in AutoPay with a bank account or AT&T Points Plus® Card from Citi. Save $5/mo with a debit card. No discount with other credit cards." },
  { q: "How long does installation take?", a: "Standard Fiber installation takes 2-4 hours. A technician will run fiber to your home and set up the All-Fi Hub." },
  { q: "Can I keep my current phone number?", a: "Yes, you can port your existing wireless or landline number to AT&T. The process typically takes 2-24 hours." },
  { q: "What is the $250 Reward Card offer?", a: "New AT&T Fiber customers who purchase through attspecial.com receive a $250 AT&T Visa® Reward Card. Redemption required within 75 days. Ends 12/27/25." },
];

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
              <a href={`tel:${phoneNumber.replace(/\./g, "")}`} className="text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Call {phoneNumber} - Available 24/7</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}