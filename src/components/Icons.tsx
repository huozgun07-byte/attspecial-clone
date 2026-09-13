// Small, consistent set of hand-drawn line icons used across the site's
// feature/benefit sections. Kept as inline SVG (not image files) so they
// stay crisp at any size, inherit currentColor, and never hit Next.js's
// SVG-through-next/image optimizer issue that broke the logo/hero assets.

import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconFiber(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v3.2" />
      <path d="M6.3 6.3l2.3 2.3" />
      <path d="M3 12h3.2" />
      <path d="M6.3 17.7l2.3-2.3" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M15.4 8.6l2.3-2.3" />
      <path d="M21 12h-3.2" />
      <path d="M17.7 17.7l-2.3-2.3" />
    </svg>
  );
}

export function IconContract(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );
}

export function IconInstall(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5.5 9.5V20a1 1 0 001 1H10v-5.5h4V21h3.5a1 1 0 001-1V9.5" />
    </svg>
  );
}

export function IconSupport(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13v-1a8 8 0 0116 0v1" />
      <rect x="3" y="13" width="4" height="5" rx="1.2" />
      <rect x="17" y="13" width="4" height="5" rx="1.2" />
      <path d="M20 18v1a3 3 0 01-3 3h-3" />
    </svg>
  );
}

export function IconBox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5L12 3l8.5 4.5" />
      <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
      <path d="M3.5 7.5L12 12l8.5-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}

export function IconDocument(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h7l4 4V20a.9.9 0 01-.9.9H7a.9.9 0 01-.9-.9V4.4a.9.9 0 01.9-.9z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 13h6" />
      <path d="M9 16.5h6" />
    </svg>
  );
}

export function Icon5G(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18V13" />
      <path d="M8.5 18V10" />
      <path d="M13 18V7" />
      <path d="M17.5 18V4.5" />
      <path d="M4 18h16" strokeOpacity="0" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.3h2" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.7 5.3 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.3-3.7-8.5S9.6 5.8 12 3.5z" />
    </svg>
  );
}

export function IconWireless(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8.8a10 10 0 0114 0" />
      <path d="M7.8 11.9a6.2 6.2 0 018.4 0" />
      <path d="M10.6 15a2.4 2.4 0 012.8 0" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V6l7-3z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  );
}
