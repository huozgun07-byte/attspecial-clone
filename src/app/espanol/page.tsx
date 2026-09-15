"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPanel from "@/components/HeroPanel";
import { useWizard } from "@/components/WizardProvider";
import { IconFiber, Icon5G, IconPhone } from "@/components/Icons";
import { phoneNumber, telHref } from "@/lib/site-config";

const servicios = [
  {
    title: "AT&T Fiber",
    desc: "Red 100% de fibra desde 300 Mbps hasta 5 GIG, con velocidad de subida igual a la de bajada, datos ilimitados e instalación profesional incluida.",
    Icon: IconFiber,
  },
  {
    title: "AT&T Internet Air",
    desc: "Internet en casa sobre la red 5G de AT&T para direcciones donde todavía no llega la fibra: hasta 100 Mbps, $55/mes con AutoPay y usted mismo lo instala.",
    Icon: Icon5G,
  },
  {
    title: "Teléfono Inalámbrico",
    desc: "Líneas ilimitadas, créditos por entregar su teléfono actual y cobertura 5G en todo el país.",
    Icon: IconPhone,
  },
];

export default function EspanolPage() {
  const { openWizard } = useWizard();

  return (
    <div lang="es-US" className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroPanel image="/images/hero-espanol.jpg" imagePosition="object-[65%_center]">
          <p className="att-eyebrow text-att-sky mb-3">AT&amp;T Preferred Dealer</p>
          <h1 id="hero-title" className="att-display mb-5">AT&amp;T en Español</h1>
          <p className="text-white/85 text-lg mb-8 max-w-xl">
            Verificamos la disponibilidad en su dirección, le explicamos los descuentos y
            agendamos la instalación. Atención en español las 24 horas, todos los días.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => openWizard({ source: "espanol", lang: "es" })} className="btn-on-dark">
              Verificar disponibilidad
            </button>
            <a href={telHref(phoneNumber)} className="btn-outline-white">
              Llame al {phoneNumber}
            </a>
          </div>
        </HeroPanel>

        <section className="att-section bg-white" aria-labelledby="services-title">
          <div className="att-container">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="services-title" className="att-h2">Qué puede ordenar con nosotros</h2>
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
                    <button onClick={() => openWizard({ source: "espanol-servicio", lang: "es" })} className="btn-secondary w-full">
                      Verificar disponibilidad
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
