import { ReactNode } from "react";
import DealCta from "./DealCta";

/** Compact campaign tile for the offer strip under the hero: eyebrow, headline, one line, call/more-info. */
export default function DealTile({
  eyebrow,
  title,
  sub,
  href,
  onMoreInfo,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  href?: string;
  onMoreInfo?: () => void;
  children?: ReactNode;
}) {
  return (
    <article className="bg-white rounded-2xl border border-att-gray-200 p-5 sm:p-6 flex flex-col">
      <p className="att-fine font-bold uppercase tracking-wide text-att-cyan mb-1.5">{eyebrow}</p>
      <h3 className="att-h3 mb-1.5">{title}</h3>
      <p className="att-fine text-att-gray-600 flex-1">{sub}</p>
      {children}
      <DealCta href={href} onMoreInfo={onMoreInfo} small className="mt-4" />
    </article>
  );
}
