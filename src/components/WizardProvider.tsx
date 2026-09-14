"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import AvailabilityWizard from "./AvailabilityWizard";
import { WizardCopy, wizardCopyEn, wizardCopyEs } from "@/lib/wizard-copy";

/**
 * Mounts a single availability wizard for the whole app and hands every page a
 * way to open it.
 *
 * One instance, not one per button: the wizard holds the visitor's answers, so
 * mounting several would mean a visitor who closes the hero wizard and opens
 * the footer one starts over from question 1.
 */

export interface OpenWizardOptions {
  /** Recorded on the lead so we know which button produced it. */
  source: string;
  /** Pre-fills the ZIP, e.g. from a city page. */
  zip?: string;
  /** "es" switches the wizard to Spanish for the /espanol page. */
  lang?: "en" | "es";
}

interface WizardContextValue {
  openWizard: (options: OpenWizardOptions) => void;
  closeWizard: () => void;
  isOpen: boolean;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    // Rendering a wizard button outside the provider is a wiring mistake, but
    // it should degrade to a dead button rather than crash the page.
    return { openWizard: () => {}, closeWizard: () => {}, isOpen: false };
  }
  return ctx;
}

const COPY: Record<"en" | "es", WizardCopy> = { en: wizardCopyEn, es: wizardCopyEs };

export default function WizardProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<OpenWizardOptions | null>(null);

  const openWizard = useCallback((next: OpenWizardOptions) => setOptions(next), []);
  const closeWizard = useCallback(() => setOptions(null), []);

  const value = useMemo(
    () => ({ openWizard, closeWizard, isOpen: options !== null }),
    [openWizard, closeWizard, options]
  );

  return (
    <WizardContext.Provider value={value}>
      {children}
      {options && (
        <AvailabilityWizard
          source={options.source}
          initialZip={options.zip}
          copy={COPY[options.lang || "en"]}
          onClose={closeWizard}
        />
      )}
    </WizardContext.Provider>
  );
}
