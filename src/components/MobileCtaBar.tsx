"use client";

import { usePathname } from "next/navigation";
import { useWizard } from "./WizardProvider";
import { phoneNumber, telHref } from "@/lib/site-config";
import { trackCall } from "@/lib/tracking";

/** Two thumb-reach actions pinned to the bottom of every page below `lg`. */
export default function MobileCtaBar() {
  const { openWizard, isOpen } = useWizard();
  const es = usePathname() === "/espanol";
  if (isOpen) return null;
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-md border-t border-att-gray-200 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => openWizard({ source: "mobile-bar", lang: es ? "es" : "en" })}
          className="btn-primary flex-1"
        >
          {es ? "Verificar disponibilidad" : "Check availability"}
        </button>
        <a
          href={telHref(phoneNumber)}
          onClick={() => trackCall(phoneNumber)}
          className="btn-outline shrink-0"
          aria-label={`Call ${phoneNumber}`}
        >
          {es ? "Llamar" : "Call"}
        </a>
      </div>
    </div>
  );
}
