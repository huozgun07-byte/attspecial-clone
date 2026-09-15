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
  { label: "Why Fiber", href: "/why-fiber" },
  { label: "AT&T Internet Air", href: "/att-internet-air" },
  { label: "Wireless Phone", href: "/wireless" },
  { label: "Business", href: "/business" },
  { label: "ESPAÑOL", href: "/espanol" },
];

export interface Plan {
  name: string;
  speed: string;
  price: string;
  /** Prevailing rate once the 12-month new-customer discount ends. */
  regularPrice: string;
  /**
   * Monthly price with an eligible AT&T unlimited wireless plan on the same
   * name/address. att.com/bundles/internet-wireless (Sept 2026): $15 off
   * 300M/500M, $20 off 1 GIG, $25 off 5 GIG, for the first 12 months.
   */
  bundlePrice: string;
  details: string;
  cta: string;
  modal: string;
  badge?: string;
  highlighted?: boolean;
  /** Rough guide to how many devices can be active at once on this tier. */
  devices: string;
  /** One line on the household this tier is sized for. */
  bestFor: string;
  /** How the upload speed compares with cable at a similar download tier. */
  uploadVsCable?: string;
}

export const plans: Plan[] = [
  {
    name: "Basic",
    speed: "300 Mbps",
    price: "$35",
    regularPrice: "$60",
    bundlePrice: "$20",
    details:
      "Room for a couple of 4K streams, video calls and everyday browsing at once. Reflects $15/mo off for 12 mos for new customers plus the $10/mo AutoPay & Paperless bill discount.",
    cta: "Shop internet",
    modal: "modal-terms-300",
    badge: "Best Value",
    devices: "Around 12 devices online at once",
    bestFor: "Streaming, video calls and homework in a small household",
    uploadVsCable: "15X faster uploads than cable",
  },
  {
    name: "Home",
    speed: "500 Mbps",
    price: "$50",
    regularPrice: "$75",
    bundlePrice: "$35",
    details:
      "A step up for households that upload as much as they download — cloud backups, large file shares and several people online together. Reflects $15/mo off for 12 mos for new customers plus $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-500",
    badge: "Popular",
    devices: "Around 13 devices online at once",
    bestFor: "Several people streaming, uploading and working at the same time",
    uploadVsCable: "20X faster uploads than cable",
  },
  {
    name: "Smart Home",
    speed: "1 GIG",
    price: "$50",
    regularPrice: "$90",
    bundlePrice: "$30",
    details:
      "Our most-ordered plan: gigabit speed for smart-home devices, gaming and working from home without anyone slowing anyone else down. Ltd. avail/areas. Reflects $30/mo off for 12 mos for new customers plus $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-1g",
    badge: "Recommended",
    highlighted: true,
    devices: "Around 14 devices online at once",
    bestFor: "Competitive gaming, 4K binge-watching and a house full of smart devices",
    uploadVsCable: "25X faster uploads than cable",
  },
  {
    name: "Elite",
    speed: "5 GIG",
    price: "$95",
    regularPrice: "$135",
    bundlePrice: "$70",
    details:
      "The top tier, for home studios, self-hosted servers and anyone moving very large files daily. Ltd avail/areas. Reflects $30/mo off for 12 mos for new customers plus $10/mo AutoPay & Paperless bill.",
    cta: "Shop internet",
    modal: "modal-terms-5g",
    badge: "Ultimate",
    devices: "Effectively no practical device limit at home",
    bestFor: "Home studios, creators moving huge files and self-hosted servers",
  },
];

/** Shown wherever a bundle price appears. Keep in sync with the Plan.bundlePrice note. */
export const bundleFootnote =
  "‡ Bundle price for new residential customers who purchase AT&T Fiber and an eligible AT&T unlimited postpaid wireless plan under the same name and address: $15/mo off 300M or 500M, $20/mo off 1 GIG, $25/mo off 5 GIG for 12 months. Discount starts within 3 bills and is applied before the AutoPay & Paperless discount. Must maintain eligible wireless service. Services billed separately.";

/** att.com/bundles (Sept 2026): "$420 savings for new customers based on combined discounts of $35/mo on 5-GIG internet w/ elig wireless svc and elig. AutoPay & paperless bill." */
export const bundleSavingsNote =
  "Save up to $420/year: for new customers, based on combined discounts of $35/mo on 5 GIG with eligible wireless service and AutoPay & Paperless bill. Limited availability/areas.";

/** att.com/wireless/switch-and-save (Sept 2026). */
export const switcherOffer = {
  headline: "Get up to $800/line to break your contract",
  sub: "Switch to any plan and we'll pay off your phone balance or early termination fee.",
  terms:
    "Up to $800 per line on up to 10 lines, paid as a Visa Reward Card, for new AT&T wireless customers who port a number from an eligible carrier (Cricket and other AT&T brands excluded) with a phone balance or ETF. Upload your most recent bill showing the payoff amount at att.com/switcherpayoff within 60 days of activation; account must be active and in good standing for 60 days. Card arrives 8–10 weeks after that and expires 6 months after issuance. Card amount equals the balance owed and will not exceed $800 per line.",
};

export interface WirelessPlan {
  name: string;
  /** Per line per month with 4 lines, AutoPay & Paperless bill. att.com/plans/wireless (Sept 2026). */
  price: string;
  regularPrice: string;
  tagline: string;
}

export const wirelessPlans: WirelessPlan[] = [
  { name: "Value 2.0", price: "$30", regularPrice: "$40", tagline: "Unlimited talk, text and data on AT&T 5G at the lowest per-line price." },
  { name: "Extra 2.0", price: "$40", regularPrice: "$50", tagline: "More high-speed data and hotspot for people who use their phone all day." },
  { name: "Premium 2.0", price: "$50", regularPrice: "$60", tagline: "Everything in Extra 2.0 with more of what heavy users need to stay connected." },
  { name: "Elite 2.0", price: "$70", regularPrice: "$80", tagline: "AT&T's best plan: all the perks of Premium 2.0 plus more." },
];

export const wirelessFootnote =
  "Prices per line per month with 4 lines, eligible AutoPay & Paperless bill; the $10/mo discount starts within 2 bills. Single-line and 2–3 line pricing differs — a specialist quotes your exact lines. Taxes and fees extra. AT&T may temporarily slow data speeds if the network is busy. Limited time offer, subject to change.";

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
  /** Short timing label, e.g. "Install day". */
  when: string;
  title: string;
  desc: string;
}

/** What happens after the visitor gives us a ZIP, in order, with the timing we can stand behind. */
export const steps: Step[] = [
  {
    when: "Within minutes",
    title: "A specialist calls you back",
    desc: "They confirm your street address against the fiber map and tell you which plans reach it. If fiber isn't built there yet, they'll say so and quote Internet Air instead.",
  },
  {
    when: "Same call",
    title: "Pick a plan, pick a slot",
    desc: "You choose the speed and an installation window. The order goes in while you're on the phone; AT&T emails the confirmation and order number right after.",
  },
  {
    when: "Install day",
    title: "The technician does the work",
    desc: "They call before arriving, run the fiber to the house, set up the Wi-Fi gateway and check speeds with you. Most installs finish the same visit.",
  },
  {
    when: "First bill",
    title: "Discounts show up",
    desc: "The new-customer and AutoPay & Paperless discounts start within the first three bills. Your Reward Card notice follows by email once the service is active.",
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
    a: "Start with your ZIP code using the check button on this page — it takes about thirty seconds and we only ask for your street address when a specialist calls. Fiber is built out block by block, so two homes on the same street can get different answers, which is why the exact address is confirmed with you rather than guessed.",
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
    q: "How does the $200 AT&T Visa® Reward Card work?",
    a: "New residential AT&T Fiber customers who order through this site qualify for a $200 AT&T Visa® Reward Card. Redemption is required within 75 days of the redemption notice. The card is issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc. Limited time offer, subject to change.",
  },
  {
    q: "I'm moving. Can I take the service with me?",
    a: "Usually yes — service can be transferred, though the plans available depend on what is built at the new address. Check the new address before moving day so there are no surprises, and we'll line the install up with your move date.",
  },
  {
    q: "How many devices can one plan handle?",
    a: "As a rough guide, 300 Mbps comfortably keeps about a dozen devices going at once, 500 Mbps a little more, and 1 GIG around fourteen with heavy use like 4K streaming and gaming mixed in. What actually matters is how many of them are doing something demanding at the same moment — twenty idle smart bulbs cost you nothing, two simultaneous 4K uploads do.",
  },
  {
    q: "Do I need to buy my own router?",
    a: "No. The AT&T Wi-Fi gateway that comes with Fiber service is a modem and router in one, and it is included rather than billed as a monthly equipment rental. If your home is large or awkwardly shaped, AT&T Wi-Fi extenders can be added to spread coverage; they are sold separately.",
  },
  {
    q: "What is AT&T ActiveArmor?",
    a: "It is the security layer built into AT&T internet service. Working at the network and gateway level, it helps block known malicious traffic before it reaches your laptops, phones and smart-home devices. It guards against threats that are already known rather than everything that exists, it is managed through the Smart Home Manager app, and the protections need to be switched on there.",
  },
  {
    q: "Why are fiber upload speeds so much higher than cable?",
    a: "Cable networks were designed around downloading, so they reserve only a thin slice of capacity for the traffic going the other way. Fiber has no such imbalance: on AT&T Fiber your upload speed matches your download speed. In practice that is the difference between a video call that holds steady and one that breaks up while someone else backs up their phone.",
  },
  {
    q: "Is fiber more reliable in bad weather?",
    a: "Fiber carries light through glass rather than electricity through copper, so it is unaffected by electromagnetic interference, nearby radio transmitters and electrical surges from lightning. The cable itself is also not a fire risk the way an energised copper line can be. No connection is immune to a pole coming down, but fiber removes most of the everyday causes of noise and dropouts.",
  },
  {
    q: "What does ordering through an AT&T Preferred Dealer change?",
    a: "You get the same AT&T plans, speeds and pricing shown on this page, with a specialist confirming availability, walking you through the discounts and booking the installation. Our line is open 24/7, which is usually what matters on an evening or weekend order.",
  },
];
