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
  lead: "Most American homes were wired for the telephone and then for television, and both of those networks move data as electricity down copper. Fiber does something else entirely, and almost everything people notice about AT&T Fiber traces back to that one difference.",
  points: [
    {
      title: "Light through glass, not current through metal",
      desc: "A fiber strand carries infrared laser pulses along a core of glass thinner than a hair. Copper carries electrical pulses, and electrical signals fade the further they travel — which is why a copper connection gets slower the further you live from the equipment serving you. Light does not weaken the same way over the distances involved in a neighbourhood.",
    },
    {
      title: "Nothing electrical to interfere with",
      desc: "Because there is no current in the line, fiber is unbothered by electromagnetic interference, by radio transmitters nearby, and by the surges that lightning pushes through copper networks. The cable also carries no fire risk of its own. Fewer things in the physical world can degrade the signal, so the connection behaves the same on a stormy night as on a calm one.",
    },
    {
      title: "Uploads that match downloads",
      desc: "Cable networks were designed on the assumption that you would mostly be downloading, so only a narrow band is set aside for traffic heading out of your home. Fiber has no such split. On AT&T Fiber the upload speed matches the download speed, which is what keeps video calls steady, cloud backups quick and livestreams clean while the rest of the house is online.",
    },
    {
      title: "Steady at the times you actually use it",
      desc: "Evening slowdowns are a capacity problem, and fiber has capacity to spare. Speeds are quoted on a wired connection to the gateway, and that is where the difference is easiest to see.",
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
  lead: "One box arrives with Fiber service and it does two jobs at once. Understanding what it is saves you from buying equipment you do not need.",
  points: [
    {
      title: "Modem and router in a single unit",
      desc: "The gateway terminates the fiber line coming into the house and broadcasts your Wi-Fi from the same device. There is no separate modem to rent and no second box to find a shelf for.",
    },
    {
      title: "Included, not a monthly equipment fee",
      desc: "The gateway comes with Fiber service rather than appearing as an equipment rental line on the bill. Compare that with the monthly hardware charge most cable providers add.",
    },
    {
      title: "Wi-Fi 6 speeds where your devices support it",
      desc: "The current gateways broadcast Wi-Fi 6, the standard that handles a crowded house better than anything before it. Getting the benefit requires devices that speak Wi-Fi 6 too, so an older laptop will connect happily but at older speeds.",
    },
    {
      title: "Extenders for the awkward corners",
      desc: "Large, long or thick-walled homes can add AT&T Wi-Fi extenders, which work with the gateway as a mesh so your phone hands off between them without dropping. Extenders are sold separately and are not needed in most homes.",
    },
    {
      title: "Managed from the Smart Home Manager app",
      desc: "The app is where you rename the network, see what is connected, pause a device, and switch the security features on. It is free with the service.",
    },
  ],
  footnote:
    "Wi-Fi 6 performance requires Wi-Fi 6 capable devices. Whole-home coverage may require AT&T Wi-Fi extenders, sold separately.",
};

export const activeArmor: KnowledgeSection = {
  id: "activearmor",
  title: "AT&T ActiveArmor internet security",
  lead: "Security that sits in the network rather than on each device, so it also covers the things you cannot install software on — the thermostat, the doorbell camera, the TV.",
  points: [
    {
      title: "Filtering before the traffic reaches you",
      desc: "ActiveArmor inspects traffic at the network and gateway level and helps block known malicious activity from ever arriving at your devices.",
    },
    {
      title: "Covers the devices antivirus software cannot",
      desc: "Smart-home hardware rarely accepts a security app. Because this works upstream of the gateway, those devices are covered by the same protection as your laptop.",
    },
    {
      title: "Switched on in Smart Home Manager",
      desc: "The protections are managed in the app, and the security features need to be enabled there. It is worth doing on day one rather than after something goes wrong.",
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
