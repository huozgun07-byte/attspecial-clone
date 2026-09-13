import Image from "next/image";
import { ReactNode } from "react";
import HeroSwoosh from "./HeroSwoosh";

interface HeroPanelProps {
  /** Background photograph for the panel. */
  image: string;
  /** Tailwind object-position utility, e.g. "object-[70%_center]". */
  imagePosition?: string;
  children: ReactNode;
}

/**
 * The rounded hero panel AT&T uses across att.com: a 16px-radius card inset in
 * the content column, photography on the right, a dark scrim so copy stays
 * legible, and the brand swoosh sweeping out of the bottom-left corner.
 */
export default function HeroPanel({ image, imagePosition = "object-center", children }: HeroPanelProps) {
  return (
    <section className="att-container pt-5 pb-10 sm:pt-7 sm:pb-12" aria-labelledby="hero-title">
      <div className="att-hero-shell">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(max-width: 1296px) 100vw, 1296px"
          className={`object-cover ${imagePosition}`}
          aria-hidden="true"
        />
        <div className="att-hero-scrim" aria-hidden="true" />

        <HeroSwoosh />

        <div className="relative p-6 sm:p-9 lg:p-12 flex flex-col justify-center min-h-[520px]">
          <div className="max-w-2xl">{children}</div>
        </div>
      </div>
    </section>
  );
}
