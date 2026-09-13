import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AT&T en Español — Internet de Fibra y Planes",
  description:
    "Ordene AT&T Fiber con un Distribuidor Preferido de AT&T. Internet de fibra desde $35/mes, instalación profesional gratuita y soporte en español disponible 24/7.",
  path: "/espanol",
  image: "/images/og-image.png",
  locale: "es_US",
  keywords: ["AT&T en español", "internet de fibra", "AT&T Fiber español", "planes AT&T"],
});

export default function EspanolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
