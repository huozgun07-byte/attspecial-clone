// Campaign detail pages (/deals/[slug]). Numbers and terms are pulled from
// site-config so a price only ever lives in one place; this file adds the
// narrative around them. Each entry names its att.com source and fetch date.

import { bundleFootnote, bundleSavingsNote, switcherOffer, guarantee } from "./site-config";

export interface Deal {
  slug: string;
  /** Short label for footer navigation. */
  navLabel: string;
  eyebrow: string;
  title: string;
  /** One or two sentences under the title. */
  summary: string;
  description: string;
  image: string;
  imagePosition: string;
  /** "How it works", in order. */
  steps: { title: string; desc: string }[];
  /** Fine print, one paragraph per entry. */
  terms: string[];
  sourceUrl: string;
  /** e.g. "att.com/bundles, 15 Sep 2026". */
  sourceNote: string;
  /** Which price table to show under the steps. */
  plans: "fiber" | "wireless" | "none";
  wizardSource: string;
  wizardService: "internet" | "wireless" | "bundle";
}

export const deals: Deal[] = [
  {
    slug: "fiber-wireless-bundle",
    navLabel: "Fiber + wireless bundle",
    eyebrow: "AT&T Fiber + AT&T Wireless",
    title: "1 Gig internet for $30/mo when you bundle",
    summary:
      "Pair AT&T Fiber with an eligible AT&T unlimited wireless plan and the fiber bill drops by $15–$25 a month for 12 months, on top of the new-customer and AutoPay discounts. New Fiber customers also get a $200 AT&T Visa® Reward Card.",
    description:
      "The bundle discount is a monthly credit on the internet bill, not a separate plan. Fiber and wireless are billed separately and either can be ordered first; the discount starts once both are active under the same name and address.",
    image: "/images/hero-bundle.jpg",
    imagePosition: "object-[68%_center]",
    steps: [
      { title: "Check the address", desc: "Start with your ZIP. A specialist confirms which fiber speeds are built at your address and which wireless lines you have or want." },
      { title: "Pick the fiber speed", desc: "300 Mbps, 500 Mbps, 1 GIG or 5 GIG. The bundle credit is $15/mo on 300M and 500M, $20/mo on 1 GIG and $25/mo on 5 GIG." },
      { title: "Add or keep an unlimited wireless plan", desc: "Any eligible AT&T unlimited postpaid plan qualifies, including lines you already have. Both services must be under the same name and address." },
      { title: "Discounts land within 3 bills", desc: "The bundle credit, the 12-month new-customer discount and the $10/mo AutoPay & Paperless discount all show up on the internet bill within the first three cycles. The Reward Card notice follows by email." },
    ],
    terms: [
      bundleFootnote.replace(/^‡ /, ""),
      bundleSavingsNote,
      "1 GIG for $30/mo reflects the $30/mo new-customer discount for 12 months, the $10/mo AutoPay & Paperless bill discount and the $20/mo wireless bundle discount on the $90/mo 1 GIG rate. Taxes & fees extra. After 12 months, prevailing rate applies. Limited availability in select areas.",
      "¹ Best & fastest internet: AT&T Fiber, based on analysis by Ookla® of Speedtest Intelligence® data, 2H 2025. Ookla trademarks used under license and reprinted with permission.",
      "$200 AT&T Visa® Reward Card for new residential AT&T Fiber customers who order through this site. Redemption required within 75 days of the reward notice; card delivered within 3–4 weeks after redemption to customers who maintain and pay for qualifying service through reward fulfillment. Card expires at month-end 6 months after issuance. Card issued by The Bancorp Bank N.A., Member FDIC, pursuant to a license from Visa U.S.A. Inc.",
    ],
    sourceUrl: "https://www.att.com/bundles/internet-wireless/",
    sourceNote: "att.com/bundles/internet-wireless, 15 Sep 2026",
    plans: "fiber",
    wizardSource: "deal-bundle",
    wizardService: "bundle",
  },
  {
    slug: "switcher-800",
    navLabel: "Switch & save up to $800/line",
    eyebrow: "Switching carriers",
    title: switcherOffer.headline,
    summary: switcherOffer.sub,
    description:
      "AT&T pays off what you still owe on your current phone, or your early termination fee, as a Visa Reward Card — up to $800 for each line you bring over, on up to 10 lines. You keep your number.",
    image: "/images/hero-wireless-2.jpg",
    imagePosition: "object-[62%_center]",
    steps: [
      { title: "Bring your number to AT&T", desc: "Port a number from an eligible carrier onto any AT&T unlimited plan. Cricket and other AT&T brands are excluded." },
      { title: "Upload your final bill", desc: "Within 60 days of activation, submit your most recent bill showing the phone balance or early termination fee at att.com/switcherpayoff." },
      { title: "Stay active for 60 days", desc: "The account must be active and in good standing for 60 days after the submission." },
      { title: "The Reward Card arrives", desc: "A Visa Reward Card for the balance owed, up to $800 per line, is mailed 8–10 weeks later and expires 6 months after issuance." },
    ],
    terms: [switcherOffer.terms],
    sourceUrl: "https://www.att.com/wireless/switch-and-save/",
    sourceNote: "att.com/wireless/switch-and-save, 15 Sep 2026",
    plans: "wireless",
    wizardSource: "deal-switcher",
    wizardService: "wireless",
  },
  {
    slug: "att-guarantee",
    navLabel: "AT&T Guarantee",
    eyebrow: "AT&T Guarantee",
    title: "All guaranteed, or AT&T will make it right",
    summary: "The first and only guarantee that covers both wireless and fiber networks — at no extra charge, with nothing to sign up for.",
    description:
      "The AT&T Guarantee is automatic — there is nothing to sign up for and no extra charge. It covers both AT&T Fiber (and Internet Air) and AT&T wireless, and when you have both, your support call stays with one agent from start to finish.",
    image: "/images/hero-family-2.jpg",
    imagePosition: "object-[68%_center]",
    steps: guarantee.items.map((item) => ({ title: item.title, desc: item.desc })),
    terms: [
      guarantee.terms,
      "Benefits are AT&T's acknowledgement that it came up short of its own standards. Where a bill credit or reward card applies, AT&T identifies eligible lines automatically and notifies the account holder; you can check the status of a benefit in the myAT&T app.",
    ],
    sourceUrl: guarantee.sourceUrl,
    sourceNote: "att.com/why-att/guarantee, 15 Sep 2026",
    plans: "none",
    wizardSource: "deal-guarantee",
    wizardService: "internet",
  },
];

export const dealsBySlug = new Map(deals.map((d) => [d.slug, d]));

export const dealHref = (slug: string) => `/deals/${slug}`;
