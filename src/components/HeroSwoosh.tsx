/**
 * The AT&T brand swoosh that sweeps out of the bottom-left corner of a hero
 * panel — the same motif used on att.com and attspecial.com. Purely decorative.
 */
export default function HeroSwoosh() {
  return (
    <svg
      className="absolute bottom-0 left-0 h-[48%] w-[46%] max-w-[470px] pointer-events-none"
      viewBox="0 0 470 320"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 150 C 150 176 258 236 300 320 H0 Z" fill="#007AB5" fillOpacity="0.9" />
      <path d="M0 222 C 118 243 196 280 228 320 H0 Z" fill="#00A0E1" />
    </svg>
  );
}
