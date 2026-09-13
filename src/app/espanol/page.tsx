"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AvailabilityModal from "@/components/AvailabilityModal";
import { espanolAddressFormLabels } from "@/components/AddressForm";
import { IconFiber, Icon5G, IconPhone } from "@/components/Icons";
import { phoneNumber, telHref } from "@/lib/site-config";

const servicios = [
  { title: "AT&T Fiber", desc: "Velocidades simétricas ultra rápidas en una red 100% de fibra.", Icon: IconFiber },
  { title: "AT&T Internet Air", desc: "Internet en casa sobre la red 5G de AT&T, sin contrato anual.", Icon: Icon5G },
  { title: "Teléfono Inalámbrico", desc: "Planes ilimitados y los últimos teléfonos con cobertura 5G.", Icon: IconPhone },
];

export default function EspanolPage() {
  const [showFormModal, setShowFormModal] = useState(false);

  return (
    <div lang="es-US" className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="att-container pt-5 pb-10 sm:pt-7 sm:pb-12" aria-labelledby="hero-title">
          <div className="surface-card px-6 py-14 sm:px-12 sm:py-20 text-center">
            <p className="att-eyebrow text-att-navy mb-3">AT&amp;T Preferred Dealer</p>
            <h1 id="hero-title" className="att-h2 mb-4 max-w-3xl mx-auto">AT&amp;T en Español</h1>
            <p className="att-lead mb-8 max-w-2xl mx-auto">
              Obtenga las mejores ofertas en Internet de fibra, telefonía inalámbrica y más.
              Soporte en español disponible 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setShowFormModal(true)} className="btn-primary">
                Ver ofertas
              </button>
              <a href={telHref(phoneNumber)} className="btn-outline">
                Llame al {phoneNumber}
              </a>
            </div>
          </div>
        </section>

        <section className="att-section bg-white" aria-labelledby="services-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="services-title" className="att-h2">Servicios disponibles</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6" role="list">
              {servicios.map((servicio) => (
                <article key={servicio.title} className="plan-card" role="listitem">
                  <div className="plan-body text-center">
                    <div className="icon-badge" aria-hidden="true">
                      <servicio.Icon />
                    </div>
                    <h3 className="feature-title mb-2">{servicio.title}</h3>
                    <p className="text-att-gray-600 text-sm mb-6 flex-1">{servicio.desc}</p>
                    <button onClick={() => setShowFormModal(true)} className="btn-secondary w-full">
                      Más info
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {showFormModal && (
        <AvailabilityModal
          source="espanol"
          title="Verificar Disponibilidad"
          submitLabel="Ver Planes"
          labels={espanolAddressFormLabels}
          showUnit={false}
          showMoving={false}
          showHelpText={false}
          onClose={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
}
