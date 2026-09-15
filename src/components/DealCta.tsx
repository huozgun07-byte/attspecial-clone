"use client";

import Link from "next/link";
import { phoneNumber, telHref } from "@/lib/site-config";
import { trackCall } from "@/lib/tracking";

/**
 * The two actions every campaign block on the site offers: call about this
 * deal, or read more about it. "More info" is either a route (detail page) or
 * a callback (opens a terms modal) — never both.
 */
interface DealCtaProps {
  /** Detail page for the campaign. */
  href?: string;
  /** Opens an in-page modal instead of navigating. */
  onMoreInfo?: () => void;
  callLabel?: string;
  moreLabel?: string;
  /** Use the white button pair on dark bands. */
  onDark?: boolean;
  /** Smaller pills for tiles and narrow columns. */
  small?: boolean;
  className?: string;
}

export default function DealCta({
  href,
  onMoreInfo,
  callLabel = "Call for this deal",
  moreLabel = "Get more info",
  onDark = false,
  small = false,
  className = "",
}: DealCtaProps) {
  const sz = small ? " !px-4 !py-2.5 !text-sm" : "";
  const more = (onDark ? "btn-outline-white" : "btn-outline") + sz;
  const call = (onDark ? "btn-on-dark" : "btn-primary") + sz;
  return (
    <div className={`flex ${small ? "flex-row" : "flex-col sm:flex-row"} flex-wrap gap-3 ${className}`}>
      <a href={telHref(phoneNumber)} onClick={() => trackCall(phoneNumber)} className={call}>
        {callLabel}
      </a>
      {href ? (
        <Link href={href} className={more}>
          {moreLabel}
        </Link>
      ) : onMoreInfo ? (
        <button type="button" onClick={onMoreInfo} className={more}>
          {moreLabel}
        </button>
      ) : null}
    </div>
  );
}
