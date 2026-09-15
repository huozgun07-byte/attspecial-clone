import { ReactNode } from "react";
import Image from "next/image";
import DealCta from "./DealCta";

/**
 * Campaign tile: optional photo on the left (stacked on phones), eyebrow,
 * headline, one line of context and the call / more-info pair.
 */
export default function DealTile({
  eyebrow,
  title,
  sub,
  href,
  onMoreInfo,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  href?: string;
  onMoreInfo?: () => void;
  image?: { src: string; alt: string; position?: string };
  children?: ReactNode;
}) {
  return (
    <article className="bg-white rounded-2xl border border-att-gray-200 overflow-hidden flex flex-col sm:flex-row">
      {image && (
        <div className="relative aspect-[16/9] sm:aspect-auto sm:w-[38%] sm:min-h-[220px] shrink-0">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 320px" className={`object-cover ${image.position ?? "object-center"}`} />
        </div>
      )}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="att-eyebrow text-att-navy att-fine mb-1.5">{eyebrow}</p>
        <h3 className="att-h3 mb-1.5">{title}</h3>
        <p className="att-fine text-att-gray-600 flex-1">{sub}</p>
        {children}
        <DealCta href={href} onMoreInfo={onMoreInfo} small className="mt-4" />
      </div>
    </article>
  );
}
