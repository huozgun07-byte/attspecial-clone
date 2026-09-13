"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

const phoneNumber = "866.307.3525";

export default function EspanolPage() {
  const [showFormModal, setShowFormModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24" aria-labelledby="hero-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">AT&T en Español</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Obtenga las mejores ofertas en Internet de fibra, telefonía inalámbrica y más. Soporte en español disponible 24/7.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setShowFormModal(true)} className="w-full sm:w-auto bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ver Ofertas</button>
              <a href={`tel:${phoneNumber.replace(/\./g, "")}`} className="w-full sm:w-auto border-2 border-blue-700 text-blue-700 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Llame al {phoneNumber}</a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" aria-labelledby="services-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12"><h2 id="services-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Servicios Disponibles</h2></div>
            <div className="grid md:grid-cols-3 gap-8" role="list">
              {["AT&T Fiber", "AT&T Internet Air", "Teléfono Inalámbrico"].map((service, i) => (
                <article key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow" role="listitem">
                  <div className="text-4xl mb-4" aria-hidden="true">{i === 0 ? "🌐" : i === 1 ? "📶" : "📱"}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service}</h3>
                  <p className="text-gray-600 mb-4">Velocidades ultra rápidas, cobertura 5G, mejores planes</p>
                  <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Más Info</button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {showFormModal && (
        <Modal onClose={() => setShowFormModal(false)} title="Verificar Disponibilidad">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowFormModal(false); }}>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Dirección*</label><input type="text" placeholder="Calle Principal 123" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required autoComplete="street-address" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Código Postal*</label><input type="text" placeholder="23225" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required autoComplete="postal-code" /></div>
            <button type="submit" className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800">Ver Planes</button>
          </form>
        </Modal>
      )}
    </div>
  );
}