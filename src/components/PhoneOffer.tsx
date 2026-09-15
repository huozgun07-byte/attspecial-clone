"use client";

import { useState } from "react";
import Modal from "./Modal";
import DealCta from "./DealCta";
import { phoneOffers } from "@/lib/site-config";

/**
 * A verified phone offer as a card, with its terms behind "Get more info".
 * The terms are two sentences, so a modal rather than a /deals page.
 */
export default function PhoneOffer({ offer, className = "" }: { offer: (typeof phoneOffers)[number]; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`surface-card p-6 sm:p-10 flex flex-col ${className}`}>
        <p className="att-eyebrow text-att-navy mb-3">Phone deal</p>
        <h2 className="att-h2 mb-3">{offer.headline}</h2>
        <p className="att-lead mb-6 flex-1">{offer.sub}</p>
        <DealCta onMoreInfo={() => setOpen(true)} />
        <p className="att-fine text-att-gray-500 mt-5">
          Req. trade-in of iPhone 14 or higher (excl. 16e) &amp; eligible plan. Limited time offer, subject to change.
        </p>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title={offer.headline} large>
          <div className="space-y-4 text-sm text-att-gray-600">
            <p className="font-bold text-att-ink">{offer.device} {offer.sub}</p>
            <p>{offer.terms}</p>
            <p className="att-fine text-att-gray-500">
              Trade-in credits are applied monthly over the credit period and stop if the line is cancelled. Call to confirm the credit for your specific phone and plan. Source:{" "}
              <a href={offer.sourceUrl} target="_blank" rel="noopener" className="underline underline-offset-2">att.com</a>, subject to change.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
