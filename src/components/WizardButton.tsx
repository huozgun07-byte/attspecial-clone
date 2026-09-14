"use client";

import { ReactNode } from "react";
import { useWizard, OpenWizardOptions } from "./WizardProvider";

/**
 * The one way to open the availability wizard from anywhere on the site.
 *
 * It is a client component on purpose: the 36 city pages, the fiber hub and the
 * FAQ are all server-rendered, and this lets them drop in an interactive button
 * without becoming client components themselves.
 */

interface WizardButtonProps extends OpenWizardOptions {
  children: ReactNode;
  /** Any of the site's button utility classes, plus layout classes. */
  className?: string;
  /** Rendered as a plain text link instead of a button. */
  variant?: "button" | "link";
}

export default function WizardButton({
  children,
  className = "btn-primary",
  variant = "button",
  ...options
}: WizardButtonProps) {
  const { openWizard } = useWizard();

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={() => openWizard(options)}
        className={
          className ||
          "text-att-navy font-bold underline underline-offset-2 hover:text-att-navy-dark focus:outline-none focus:ring-2 focus:ring-att-cyan rounded"
        }
      >
        {children}
      </button>
    );
  }

  return (
    <button type="button" onClick={() => openWizard(options)} className={className}>
      {children}
    </button>
  );
}
