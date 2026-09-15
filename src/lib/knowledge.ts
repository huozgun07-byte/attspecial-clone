// Educational content for the /why-fiber page and the knowledge blocks reused
// on the homepage and city pages.
//
// Copy note: every sentence here is written for this site. The underlying
// facts are AT&T's (fiber vs copper, gateway behaviour, ActiveArmor scope,
// upload comparisons) and must stay accurate — reword freely, but do not
// invent a capability, drop a qualifier, or change a comparison figure.
//
// Deliberately NOT covered: the Internet 2000 / 2 Gig tier. It is not part of
// the line-up being sold on this site.

export interface KnowledgeSection {
  id: string;
  title: string;
  lead: string;
  points: { title: string; desc: string }[];
  /** Rendered small under the section when a claim needs qualifying. */
  footnote?: string;
}

export const fiberVsCable: KnowledgeSection = {
  id: "fiber-vs-cable",
  title: "How fiber is different from cable and copper",
  lead: "Cable and phone lines move data as electricity through copper. Fiber sends light through glass — and almost everything you notice about AT&T Fiber comes from that one difference.",
  points: [
    {
      title: "Light, not electricity",
      desc: "Laser pulses travel through a glass core thinner than a hair. Electrical signals fade with distance; light doesn't over a neighborhood.",
    },
    {
      title: "Nothing to interfere",
      desc: "No current in the line means no interference from storms, nearby radio or power surges. A stormy night performs like a calm one.",
    },
    {
      title: "Uploads match downloads",
      desc: "Cable keeps a narrow lane for upload. Fiber has no split, so video calls, backups and livestreams stay smooth while the house is online.",
    },
    {
      title: "Steady in the evening",
      desc: "Peak-hour slowdowns are a capacity problem. Fiber has capacity to spare, so 8 p.m. feels like 8 a.m.",
    },
  ],
  footnote:
    "Speeds are based on a wired connection to the gateway. Actual speeds vary and are not guaranteed. See att.com/speed101 for details.",
};

export const uploadComparison = {
  title: "Upload speed compared with cable",
  lead: "Download speed is the number everyone advertises. Upload speed is the one you feel on a video call.",
  rows: [
    { plan: "Internet 300", claim: "15X faster uploads" },
    { plan: "Internet 500", claim: "20X faster uploads" },
    { plan: "Internet 1 GIG", claim: "25X faster uploads" },
  ],
  footnote:
    "Comparison of AT&T Fiber wired upload speeds against Xfinity, Spectrum and Cox cable service at comparable download tiers with uploads of 10, 20 and 35 Mbps. Download speed for Internet 1000 typically maxes out at 940 Mbps. Speeds vary and are not guaranteed. See att.com/speed101.",
};

export const wifiGateway: KnowledgeSection = {
  id: "wifi-gateway",
  title: "Your AT&T Wi-Fi gateway",
  lead: "One box does the job of modem and router — and it comes with the service.",
  points: [
    {
      title: "Modem and router in one",
      desc: "The gateway ends the fiber line and broadcasts your Wi-Fi. No second box, nothing to find a shelf for.",
    },
    {
      title: "No equipment fee",
      desc: "Included with Fiber instead of showing up as a monthly rental line on the bill.",
    },
    {
      title: "Wi-Fi 6 inside",
      desc: "Handles a crowded house better than older Wi-Fi. Your devices need Wi-Fi 6 too to get the full benefit.",
    },
    {
      title: "Extenders if you need them",
      desc: "Large or thick-walled homes can add AT&T Wi-Fi extenders that mesh with the gateway. Most homes don't need them.",
    },
  ],
  footnote:
    "Wi-Fi 6 performance requires Wi-Fi 6 capable devices. Whole-home coverage may require AT&T Wi-Fi extenders, sold separately.",
};

export const activeArmor: KnowledgeSection = {
  id: "activearmor",
  title: "AT&T ActiveArmor internet security",
  lead: "Security in the network, not on each device — so it also covers the thermostat, the doorbell camera and the TV.",
  points: [
    {
      title: "Blocks threats upstream",
      desc: "Inspects traffic at the network and gateway and helps stop known malicious activity before it reaches your devices.",
    },
    {
      title: "Covers what antivirus can't",
      desc: "Smart-home hardware can't run a security app. Protection upstream of the gateway covers those devices too.",
    },
    {
      title: "Switched on in Smart Home Manager",
      desc: "Managed in the free app — rename the network, pause a device, enable the security features. Worth doing on day one.",
    },
  ],
  footnote:
    "ActiveArmor guards against known threats only. Smart Home Manager app required; security features must be enabled. It is not a substitute for safe browsing habits or device-level protection.",
};

export interface TrustItem {
  title: string;
  desc: string;
}

/** The three things people most often ask to have confirmed before ordering. */
export const noSurprises: TrustItem[] = [
  {
    title: "No annual contract",
    desc: "Eligible plans are month to month, so there is nothing to sign and no early termination fee if your plans change.",
  },
  {
    title: "Unlimited data",
    desc: "AT&T Fiber plans include unlimited data. No monthly cap, no overage charges, no slowdown after a threshold.",
  },
  {
    title: "No equipment fee",
    desc: "The Wi-Fi gateway is included with Fiber service instead of being rented back to you every month.",
  },
];

/** Short questions answered on /why-fiber, also emitted as FAQPage schema. */
export const whyFiberFaqs = [
  {
    q: "Is AT&T Fiber actually faster than cable in day-to-day use?",
    a: "For downloads at the same advertised tier the difference is often small. For uploads it is not close: cable reserves only a narrow slice of capacity for outbound traffic, while fiber sends data both ways at the same speed. If you take video calls, back up photos, upload footage or play online, that is where you notice it.",
  },
  {
    q: "Do I have to rent equipment from AT&T?",
    a: "No. The Wi-Fi gateway comes with Fiber service rather than as a monthly rental. You can still put your own router or mesh system behind it if you prefer your own setup.",
  },
  {
    q: "Does ActiveArmor replace antivirus software?",
    a: "It complements it. ActiveArmor works upstream at the network level and helps block known threats before they reach your devices, which is especially useful for smart-home hardware that cannot run security software. Device-level protection and sensible browsing habits still matter.",
  },
  {
    q: "Will fiber reach every room of my house?",
    a: "The fiber line reaches the gateway; from there it is Wi-Fi, and Wi-Fi is governed by distance, walls and the age of your devices. Most homes are covered by the gateway alone. Larger or heavily partitioned homes can add AT&T Wi-Fi extenders, which are sold separately.",
  },
];
