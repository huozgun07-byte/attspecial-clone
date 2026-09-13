// Centralized site configuration: contact numbers, nav, plans, and shared copy.
// Update values here instead of editing individual pages/components.
//
// Copy note: all marketing prose here is written for this site. Prices, speeds,
// discount amounts and offer terms mirror the AT&T offers being sold and must
// stay factually accurate — reword freely, but never change a number or a term.

export const phoneNumber = "866.307.3525";
export const businessPhone = "866.803.4362";
export const businessHours = "Mon–Fri 6AM–6PM | Sat 9AM–3PM MST";

/** Strips formatting so the number can be used in a `tel:` link. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\./g, "")}`;
}

export const navItems = [
  { label: "Internet", href: "/" },
  { label: "AT&T Internet Air", href: "/att-internet-air" },
  { label: "Wireless Phone", href: "/wireless" },
  { label: "Business", href: "/business" },
  { label: "ESPAÑOL", href: "/espanol" },
];

export interface Plan {
  name: string;
  speed: string;
  price: string;
  details: string;
  cta: string;
  modal: string;
  badge?: string;
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Basic",
    speed: "300 Mbps",
    price: "$35",
    details:
      "Room for a couple of 4K streams, video calls and everyday browsing at once. Reflects $15/mo off for 12 mos for new customers plus the $10/mo AutoPay & Paperless bill discount.",
    cta: "Shop internet",
    modal: "modal-terms-300",
    badge: "Best Value",
  },
  {
    name: "Home",
    speed: "500 Mbps",
    price: "$40",
    details:
      "A step up for households that upload as much as they download — cloud backups, large file shares and several people online together. Reflects $15/mo off for 12 mos for new customers plus $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-500",
    badge: "Popular",
  },
  {
    name: "Smart Home",
    speed: "1 GIG",
    price: "$50",
    details:
      "Our most-ordered plan: gigabit speed for smart-home devices, gaming and working from home without anyone slowing anyone else down. Ltd. avail/areas. Reflects $30/mo off for 12 mos for new customers plus $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-1g",
    badge: "Recommended",
    highlighted: true,
  },
  {
    name: "Elite",
    speed: "5 GIG",
    price: "$95",
    details:
      "The top tier, for home studios, self-hosted servers and anyone moving very large files daily. Ltd avail/areas. Reflects $30/mo off for 12 mos for new customers plus $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-5g",
    badge: "Ultimate",
  },
];

export interface Feature {
  title: string;
  desc: string;
  icon: "fiber" | "contract" | "install" | "support";
}

export const features: Feature[] = [
  {
    title: "Uploads as fast as downloads",
    desc: "Fiber carries data as light over glass, so upload speed matches download speed. Video calls, backups and livestreams stop being the bottleneck.",
    icon: "fiber",
  },
  {
    title: "No annual contract",
    desc: "Eligible plans are month to month. Nothing to sign, and no early termination fee if your plans change.",
    icon: "contract",
  },
  {
    title: "Professional install included",
    desc: "A certified technician runs the line, sets up your All-Fi Hub and confirms your speeds before leaving — included with Fiber plans.",
    icon: "install",
  },
  {
    title: "Someone answers at 2am",
    desc: "Our ordering line is staffed around the clock, every day of the year, in English and Spanish.",
    icon: "support",
  },
];

export interface Step {
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    title: "Check your address",
    desc: "Fiber is built street by street, so availability is decided address by address. Enter yours and we'll tell you exactly which plans reach your home.",
  },
  {
    title: "Pick a speed you'll actually use",
    desc: "More speed only helps if your household needs it. Tell us how many people and devices are online and we'll point you at the right tier, not the priciest one.",
  },
  {
    title: "Book the install",
    desc: "Choose an appointment window that suits you. Most Fiber installs finish in a single visit, and you're online before the technician leaves.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What makes AT&T Fiber different from cable internet?",
    a: "Fiber sends data as pulses of light down glass strands instead of electrical signals over copper. Two differences show up in daily use: upload speeds that match your download speeds, and steadier performance during peak evening hours. Plans here run from 300 Mbps up to 5 GIG.",
  },
  {
    q: "How do I find out if AT&T Fiber reaches my address?",
    a: "Enter your street address and ZIP code in the availability form on this page. Fiber is built out block by block, so two homes on the same street can get different answers — checking the exact address is the only reliable way to know.",
  },
  {
    q: "What equipment comes with the service?",
    a: "AT&T supplies the All-Fi Hub, the gateway that terminates the fiber line and broadcasts your Wi-Fi, at no extra cost on Fiber plans. Professional installation is included, and you can add your own router or mesh system behind the hub if you prefer.",
  },
  {
    q: "Is there a data cap?",
    a: "No. AT&T Fiber plans include unlimited data. There are no overage charges and no throttling after a monthly threshold, because there isn't one.",
  },
  {
    q: "How does the AutoPay & Paperless bill discount work?",
    a: "You save $10/mo when enrolled in AutoPay and paperless billing with a bank account or the AT&T Points Plus® Card from Citi. Paying by debit card reduces the discount to $5/mo, and other credit cards don't qualify. The discount usually appears within three billing cycles.",
  },
  {
    q: "How long does installation take?",
    a: "Plan on a two-to-four hour window. The technician runs fiber to the house, mounts and configures the All-Fi Hub, then tests the connection with you before finishing. Nearly all Fiber installs are completed in one visit.",
  },
  {
    q: "What happens to my price after the first 12 months?",
    a: "The new-customer discount applies for 12 months, after which the prevailing rate for your plan takes over. The AutoPay & Paperless bill discount is separate and continues for as long as you stay enrolled.",
  },
  {
    q: "Am I locked into a contract?",
    a: "No annual contract is required on eligible plans, so there's no early termination fee if you move or change your mind. Promotional pricing is tied to the 12-month discount period rather than to a commitment.",
  },
  {
    q: "Should I choose AT&T Fiber or AT&T Internet Air?",
    a: "If fiber reaches your address, take it: symmetrical speeds up to 5 GIG with professional installation included. AT&T Internet Air is the alternative where fiber hasn't been built yet — it runs over the AT&T 5G network at $55/mo with AutoPay, delivers up to 100 Mbps, and you plug it in yourself in minutes.",
  },
  {
    q: "Will I get the full advertised speed over Wi-Fi?",
    a: "Advertised speeds are measured on a wired connection. Wi-Fi throughput depends on your device, its distance from the hub and how many devices are active at the time. On the 5 GIG plan, a single wired device tops out at 4.7 Gbps.",
  },
  {
    q: "Can I keep my existing phone number?",
    a: "Yes. Existing wireless and landline numbers can usually be ported to AT&T. Most transfers finish within 2 to 24 hours, and your current service keeps working until the port completes.",
  },
  {
    q: "How does the $250 AT&T Visa® Reward Card work?",
    a: "New residential AT&T Fiber customers who order through this site qualify for a $250 AT&T Visa® Reward Card. Redemption is required within 75 days of the redemption notice. The card is issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc. Limited time offer, subject to change.",
  },
  {
    q: "I'm moving. Can I take the service with me?",
    a: "Usually yes — service can be transferred, though the plans available depend on what is built at the new address. Check the new address before moving day so there are no surprises, and we'll line the install up with your move date.",
  },
  {
    q: "What does ordering through an AT&T Preferred Dealer change?",
    a: "You get the same AT&T plans, speeds and pricing shown on this page, with a specialist confirming availability, walking you through the discounts and booking the installation. Our line is open 24/7, which is usually what matters on an evening or weekend order.",
  },
];
