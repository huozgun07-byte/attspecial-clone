// Centralized site configuration: contact numbers, nav, plans, and shared copy.
// Update values here instead of editing individual pages/components.

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
    details: "Price after discounts: $15/mo for 12 mos for new customers and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-300",
    badge: "Best Value",
  },
  {
    name: "Home",
    speed: "500 Mbps",
    price: "$40",
    details: "Price after discounts: $15/mo for 12 mos for new customers and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-500",
    badge: "Popular",
  },
  {
    name: "Smart Home",
    speed: "1 GIG",
    price: "$50",
    details: "Ltd. avail/areas. Price after discounts $30/mo for 12 mos for new customers, and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-1g",
    badge: "Recommended",
    highlighted: true,
  },
  {
    name: "Elite",
    speed: "5 GIG",
    price: "$95",
    details: "Ltd avail/areas. Price after discounts $30/mo for 12 mos for new customers and $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-5g",
    badge: "Ultimate",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  { q: "What is AT&T Fiber?", a: "AT&T Fiber is a 100% fiber optic network that delivers ultra-fast internet speeds up to 5 GIGs. It provides symmetrical upload/download speeds, low latency, and reliable connectivity for streaming, gaming, and working from home." },
  { q: "Is AT&T Fiber available in my area?", a: "AT&T Fiber is expanding rapidly. Enter your address in the availability checker on our homepage to see if service is available at your location." },
  { q: "What equipment do I need?", a: "AT&T provides the All-Fi Hub (gateway) at no extra cost with most plans. Professional installation is included for Fiber plans." },
  { q: "Are there data caps?", a: "No. AT&T Fiber plans include unlimited data - no overage fees or throttling." },
  { q: "What is the AutoPay & Paperless bill discount?", a: "Save $10/mo when enrolled in AutoPay with a bank account or AT&T Points Plus® Card from Citi. Save $5/mo with a debit card. No discount with other credit cards." },
  { q: "How long does installation take?", a: "Standard Fiber installation takes 2-4 hours. A technician will run fiber to your home and set up the All-Fi Hub." },
  { q: "Can I keep my current phone number?", a: "Yes, you can port your existing wireless or landline number to AT&T. The process typically takes 2-24 hours." },
  { q: "What is the $250 Reward Card offer?", a: "New AT&T Fiber customers who purchase through attspecial.com receive a $250 AT&T Visa® Reward Card. Redemption required within 75 days. Limited time offer, subject to change." },
];
