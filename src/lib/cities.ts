/**
 * City landing pages.
 *
 * Scope rule: AT&T Fiber is sold inside AT&T's 21-state wireline footprint
 * (CA, NV, TX, OK, KS, MO, OH, KY, MI, IN, IL, WI, AR, LA, TN, MS, AL, GA, FL,
 * SC, NC). Do not add a city outside that footprint — the address check would
 * come back empty and the page would be a dead end for both visitors and Google.
 *
 * Every entry is hand-written. Neighborhood lists are real districts and
 * suburbs of the metro, and the copy is specific to that market: these pages
 * have to earn their place, not be twenty copies of the same paragraph with the
 * city name swapped in.
 */

export interface City {
  /** URL segment, e.g. "dallas-tx" */
  slug: string;
  city: string;
  /** Two-letter state code */
  state: string;
  stateName: string;
  /** Metro label used in prose */
  metro: string;
  /** Two sentences of market-specific context. */
  blurb: string;
  /** Real neighborhoods and suburbs within the service area. */
  neighborhoods: string[];
  /** Slugs of nearby cities, for internal linking. */
  nearby: string[];
  /** One thing that is genuinely different about ordering here. */
  localNote: string;
}

export const cities: City[] = [
  {
    slug: "dallas-tx",
    city: "Dallas",
    state: "TX",
    stateName: "Texas",
    metro: "Dallas–Fort Worth",
    blurb:
      "Dallas sits in AT&T's home region and is one of the company's largest fiber markets, with coverage concentrated in the urban core and the northern suburbs. Build-out is uneven street to street, so the address check matters more here than the ZIP code does.",
    neighborhoods: ["Uptown", "Oak Lawn", "Lakewood", "Bishop Arts District", "Deep Ellum", "Preston Hollow", "Lake Highlands", "Oak Cliff"],
    nearby: ["fort-worth-tx", "austin-tx", "houston-tx"],
    localNote:
      "Plenty of Dallas apartment buildings are wired as a whole property, so if you're in a mid-rise the answer often depends on the building rather than the street. Give us the unit number and we'll check the building record too.",
  },
  {
    slug: "fort-worth-tx",
    city: "Fort Worth",
    state: "TX",
    stateName: "Texas",
    metro: "Dallas–Fort Worth",
    blurb:
      "Fort Worth's fiber footprint follows its growth: the newer developments north toward Alliance and west around the TCU area tend to have the most straightforward installs. Historic neighborhoods closer to downtown vary house by house.",
    neighborhoods: ["Sundance Square", "Arlington Heights", "Fairmount", "Wedgwood", "Near Southside", "Alliance", "Tanglewood", "Stockyards"],
    nearby: ["dallas-tx", "austin-tx", "oklahoma-city-ok"],
    localNote:
      "On larger lots in west Fort Worth the technician may need to run a longer drop from the street, which is still included in the professional install — it just means booking the wider appointment window.",
  },
  {
    slug: "houston-tx",
    city: "Houston",
    state: "TX",
    stateName: "Texas",
    metro: "Greater Houston",
    blurb:
      "Houston is a sprawling market and AT&T's fiber reach reflects that — dense inside the Loop, patchier as you move out toward the far suburbs. Master-planned communities in Katy, Sugar Land and Cypress are often fully built.",
    neighborhoods: ["The Heights", "Montrose", "Midtown", "River Oaks", "Katy", "Sugar Land", "Clear Lake", "Spring Branch"],
    nearby: ["austin-tx", "san-antonio-tx", "dallas-tx"],
    localNote:
      "If you're in a townhome community with shared utility easements, the install sometimes needs HOA sign-off for the line route. Worth checking before you book the appointment.",
  },
  {
    slug: "austin-tx",
    city: "Austin",
    state: "TX",
    stateName: "Texas",
    metro: "Austin–Round Rock",
    blurb:
      "Austin is one of the most fiber-saturated cities in the country and AT&T competes hard here, which is why the multi-gig tiers show up at more Austin addresses than in most markets. Newer east-side and Mueller construction is well covered.",
    neighborhoods: ["Mueller", "East Austin", "Hyde Park", "South Congress", "Zilker", "Round Rock", "Cedar Park", "Pflugerville"],
    nearby: ["san-antonio-tx", "houston-tx", "dallas-tx"],
    localNote:
      "Austin is one of the better markets for the 5 GIG plan. If you work from home with large uploads, ask us to check whether the multi-gig tier is live at your address rather than assuming the 1 GIG cap.",
  },
  {
    slug: "san-antonio-tx",
    city: "San Antonio",
    state: "TX",
    stateName: "Texas",
    metro: "San Antonio–New Braunfels",
    blurb:
      "San Antonio's fiber coverage is strongest across the north and northwest sides, including the Stone Oak corridor and the suburbs along Loop 1604. The older neighborhoods near downtown are a mixed picture.",
    neighborhoods: ["Alamo Heights", "Stone Oak", "Southtown", "Monte Vista", "Helotes", "Schertz", "Converse", "Leon Valley"],
    nearby: ["austin-tx", "houston-tx", "dallas-tx"],
    localNote:
      "Several San Antonio suburbs sit in newer subdivisions where fiber was laid during construction — those installs are usually quick because the line already reaches the house.",
  },
  {
    slug: "los-angeles-ca",
    city: "Los Angeles",
    state: "CA",
    stateName: "California",
    metro: "Greater Los Angeles",
    blurb:
      "Los Angeles is a large but uneven fiber market: some blocks have had AT&T Fiber for years while the next street over is still on a copper-based service. The address check is the only way to tell which side of that line you're on.",
    neighborhoods: ["Silver Lake", "Sherman Oaks", "Westwood", "Culver City", "Glendale", "Burbank", "Pasadena", "Long Beach"],
    nearby: ["san-diego-ca", "san-jose-ca", "sacramento-ca"],
    localNote:
      "In LA's older apartment stock the building's wiring often decides the answer. If the address check comes back short, call us — buildings are sometimes served under a property-level record the public checker doesn't surface.",
  },
  {
    slug: "san-diego-ca",
    city: "San Diego",
    state: "CA",
    stateName: "California",
    metro: "San Diego County",
    blurb:
      "San Diego's coverage runs from the coastal neighborhoods through the inland suburbs, with newer North County developments generally well served. Military housing areas are a common question here and are handled case by case.",
    neighborhoods: ["North Park", "La Jolla", "Point Loma", "Mira Mesa", "Clairemont", "Chula Vista", "Escondido", "El Cajon"],
    nearby: ["los-angeles-ca", "san-jose-ca", "las-vegas-nv"],
    localNote:
      "If you're relocating on military orders, tell the specialist — the no-annual-contract terms on eligible plans mean a PCS move doesn't leave you paying out a commitment.",
  },
  {
    slug: "san-francisco-ca",
    city: "San Francisco",
    state: "CA",
    stateName: "California",
    metro: "San Francisco Bay Area",
    blurb:
      "San Francisco is dense, vertical and heavily built out, which cuts both ways: where fiber has reached a building the service is excellent, and where it hasn't the wait can be long. Multi-unit buildings dominate the picture.",
    neighborhoods: ["Mission District", "SoMa", "Noe Valley", "Richmond District", "Sunset District", "Bernal Heights", "Daly City", "South San Francisco"],
    nearby: ["san-jose-ca", "sacramento-ca", "los-angeles-ca"],
    localNote:
      "For condos and apartments, have the unit number ready. In San Francisco the difference between 'available' and 'not available' is frequently a single riser in the building, not the street address.",
  },
  {
    slug: "san-jose-ca",
    city: "San Jose",
    state: "CA",
    stateName: "California",
    metro: "Silicon Valley",
    blurb:
      "San Jose and the surrounding Silicon Valley cities are competitive fiber territory, and symmetrical upload speed is usually the reason people switch here rather than raw download numbers. Suburban single-family areas are the best covered.",
    neighborhoods: ["Willow Glen", "Almaden Valley", "Evergreen", "Santa Clara", "Sunnyvale", "Cupertino", "Campbell", "Milpitas"],
    nearby: ["san-francisco-ca", "sacramento-ca", "los-angeles-ca"],
    localNote:
      "If your household runs home labs, VPNs into work, or uploads large builds, mention it — the symmetrical upload on Fiber is the part that changes your day, and it's worth sizing the plan around that rather than download speed.",
  },
  {
    slug: "sacramento-ca",
    city: "Sacramento",
    state: "CA",
    stateName: "California",
    metro: "Sacramento Valley",
    blurb:
      "Sacramento's fiber coverage extends well into the suburban ring — Roseville, Folsom and Elk Grove often have more consistent availability than parts of the city core. Growth areas like Natomas are largely built.",
    neighborhoods: ["Midtown", "East Sacramento", "Natomas", "Elk Grove", "Roseville", "Folsom", "Citrus Heights", "Rancho Cordova"],
    nearby: ["san-francisco-ca", "san-jose-ca", "los-angeles-ca"],
    localNote:
      "Summer heat is hard on equipment left in a garage or attic. Ask the technician to place the All-Fi Hub somewhere climate-controlled and central — it costs nothing and it protects your Wi-Fi range.",
  },
  {
    slug: "atlanta-ga",
    city: "Atlanta",
    state: "GA",
    stateName: "Georgia",
    metro: "Metro Atlanta",
    blurb:
      "Atlanta is one of AT&T's flagship fiber markets, and Georgia is among the states with the deepest build. Coverage runs through the city and out across most of the inner suburbs inside and around the Perimeter.",
    neighborhoods: ["Midtown", "Buckhead", "Decatur", "East Atlanta", "Sandy Springs", "Marietta", "Brookhaven", "Smyrna"],
    nearby: ["charlotte-nc", "birmingham-al", "nashville-tn"],
    localNote:
      "Atlanta has a lot of tree cover and long driveways, which occasionally turns a standard drop into a longer run. It's still part of the included professional install — just book the earlier slot if you want it finished before the afternoon.",
  },
  {
    slug: "miami-fl",
    city: "Miami",
    state: "FL",
    stateName: "Florida",
    metro: "Miami–Dade",
    blurb:
      "Miami is a high-rise market, so availability is decided building by building far more often than street by street. Single-family areas out toward Kendall and Doral behave more like a typical suburban build.",
    neighborhoods: ["Brickell", "Coral Gables", "Wynwood", "Coconut Grove", "Kendall", "Doral", "Hialeah", "Aventura"],
    nearby: ["orlando-fl", "jacksonville-fl", "atlanta-ga"],
    localNote:
      "Spanish-language ordering is available on the same line, around the clock. If it's easier, use the Español page and a Spanish-speaking specialist will handle the whole order.",
  },
  {
    slug: "orlando-fl",
    city: "Orlando",
    state: "FL",
    stateName: "Florida",
    metro: "Greater Orlando",
    blurb:
      "Orlando's newer master-planned communities — Lake Nona and the Baldwin Park area among them — tend to be fully fibered, because the conduit went in with the streets. Older neighborhoods closer to downtown are more variable.",
    neighborhoods: ["Winter Park", "Lake Nona", "Dr. Phillips", "Baldwin Park", "Altamonte Springs", "Kissimmee", "Oviedo", "Windermere"],
    nearby: ["jacksonville-fl", "miami-fl", "atlanta-ga"],
    localNote:
      "If you're buying in a new build, order before closing. Where the development is already fibered we can often line the install up with your move-in date instead of leaving you offline for a week.",
  },
  {
    slug: "jacksonville-fl",
    city: "Jacksonville",
    state: "FL",
    stateName: "Florida",
    metro: "Jacksonville",
    blurb:
      "Jacksonville covers an enormous land area for a single city, and fiber availability changes noticeably as you move between the urban core, the beaches and the southern suburbs. Nocatee and the St. Johns growth corridor are well covered.",
    neighborhoods: ["Riverside", "San Marco", "Mandarin", "Southside", "Arlington", "Orange Park", "Ponte Vedra", "Nocatee"],
    nearby: ["orlando-fl", "miami-fl", "charlotte-nc"],
    localNote:
      "Because the city is so spread out, install windows fill up differently by side of town. If your schedule is tight, ask for the next available slot on your side of the river rather than the next slot overall.",
  },
  {
    slug: "charlotte-nc",
    city: "Charlotte",
    state: "NC",
    stateName: "North Carolina",
    metro: "Charlotte Metro",
    blurb:
      "Charlotte has grown fast and the fiber build has largely kept pace, especially through South End, Ballantyne and the University City corridor. The suburban towns north and south of the city are increasingly covered too.",
    neighborhoods: ["NoDa", "South End", "Ballantyne", "Dilworth", "University City", "Steele Creek", "Matthews", "Huntersville"],
    nearby: ["raleigh-nc", "atlanta-ga", "nashville-tn"],
    localNote:
      "A lot of Charlotte's new apartment inventory is pre-wired for fiber. If you're moving into a building constructed in the last few years, the odds are good — give us the property name and unit.",
  },
  {
    slug: "raleigh-nc",
    city: "Raleigh",
    state: "NC",
    stateName: "North Carolina",
    metro: "Raleigh–Durham (Triangle)",
    blurb:
      "The Triangle is one of the most competitive fiber regions in the Southeast, which tends to mean better availability and more speed tiers on offer. Cary, Apex and Morrisville are consistently strong.",
    neighborhoods: ["North Hills", "Brier Creek", "Cary", "Apex", "Morrisville", "Wake Forest", "Holly Springs", "Garner"],
    nearby: ["charlotte-nc", "atlanta-ga", "nashville-tn"],
    localNote:
      "With so many people in the Triangle working remotely for out-of-state employers, the upload side of the plan usually matters more than the download. Size it for the video calls, not the streaming.",
  },
  {
    slug: "nashville-tn",
    city: "Nashville",
    state: "TN",
    stateName: "Tennessee",
    metro: "Nashville–Davidson",
    blurb:
      "Nashville's fiber coverage is solid across the urban core and the fast-growing southern suburbs toward Franklin and Brentwood. Some of the older East Nashville housing stock still needs a per-address check.",
    neighborhoods: ["East Nashville", "The Gulch", "Green Hills", "Germantown", "Hermitage", "Bellevue", "Franklin", "Brentwood"],
    nearby: ["memphis-tn", "louisville-ky", "atlanta-ga"],
    localNote:
      "If you record or stream from home — and in this city plenty of people do — the symmetrical upload is the whole point. Ask about the 1 GIG tier before defaulting to the entry plan.",
  },
  {
    slug: "memphis-tn",
    city: "Memphis",
    state: "TN",
    stateName: "Tennessee",
    metro: "Memphis Metro",
    blurb:
      "Memphis fiber coverage is strongest east of the city through Germantown, Collierville and Cordova. Midtown and the downtown core are a mix, with build-out continuing.",
    neighborhoods: ["Midtown", "Cooper-Young", "East Memphis", "Downtown", "Cordova", "Germantown", "Collierville", "Bartlett"],
    nearby: ["nashville-tn", "little-rock-ar", "birmingham-al"],
    localNote:
      "Where fiber hasn't reached yet, AT&T Internet Air is usually the practical alternative in this market. We check both in one call so you're not left without an option.",
  },
  {
    slug: "birmingham-al",
    city: "Birmingham",
    state: "AL",
    stateName: "Alabama",
    metro: "Birmingham–Hoover",
    blurb:
      "Birmingham's over-the-mountain suburbs — Homewood, Mountain Brook, Vestavia Hills and Hoover — carry much of the metro's fiber coverage. The city neighborhoods vary, with newer runs going in steadily.",
    neighborhoods: ["Homewood", "Mountain Brook", "Vestavia Hills", "Hoover", "Avondale", "Five Points South", "Trussville", "Bessemer"],
    nearby: ["atlanta-ga", "nashville-tn", "jackson-ms"],
    localNote:
      "Hilly terrain and mature trees make Wi-Fi placement matter more than usual here. A mesh node on the far side of the house is often the difference, and you can add your own behind the All-Fi Hub.",
  },
  {
    slug: "new-orleans-la",
    city: "New Orleans",
    state: "LA",
    stateName: "Louisiana",
    metro: "Greater New Orleans",
    blurb:
      "Louisiana is one of the states where AT&T's fiber build is deepest, and the New Orleans metro reflects that — Metairie and the Lakeview side are widely covered. Historic neighborhoods need an address-level check because of how the lines run.",
    neighborhoods: ["Uptown", "Mid-City", "Garden District", "Marigny", "Lakeview", "Gentilly", "Algiers", "Metairie"],
    nearby: ["baton-rouge-la", "jackson-ms", "houston-tx"],
    localNote:
      "In the historic districts, exterior work can be restricted, which occasionally changes how the drop is routed. The technician will walk the options with you before anything is attached to the building.",
  },
  {
    slug: "baton-rouge-la",
    city: "Baton Rouge",
    state: "LA",
    stateName: "Louisiana",
    metro: "Baton Rouge",
    blurb:
      "Baton Rouge has benefited from Louisiana's broad fiber build, with good coverage through the southern and eastern suburbs. Student-heavy areas near LSU see high demand for the faster tiers.",
    neighborhoods: ["Mid City", "Garden District", "Shenandoah", "Central", "Zachary", "Prairieville", "Denham Springs", "LSU area"],
    nearby: ["new-orleans-la", "jackson-ms", "houston-tx"],
    localNote:
      "Shared student housing is the one case where the entry plan rarely holds up — four people streaming and gaming at once is what the 500 Mbps and 1 GIG tiers are for.",
  },
  {
    slug: "jackson-ms",
    city: "Jackson",
    state: "MS",
    stateName: "Mississippi",
    metro: "Jackson Metro",
    blurb:
      "Jackson's fiber footprint centers on the metro's northern suburbs, including Madison and Ridgeland, with continued build-out in the city. Coverage gaps are common enough that checking the exact address is essential here.",
    neighborhoods: ["Fondren", "Belhaven", "Northeast Jackson", "Ridgeland", "Madison", "Brandon", "Flowood", "Clinton"],
    nearby: ["new-orleans-la", "memphis-tn", "birmingham-al"],
    localNote:
      "This is a market where AT&T Internet Air fills a lot of the gaps. If fiber isn't at your address yet, we'll tell you straight away rather than putting you on a waiting list that goes nowhere.",
  },
  {
    slug: "little-rock-ar",
    city: "Little Rock",
    state: "AR",
    stateName: "Arkansas",
    metro: "Little Rock–North Little Rock",
    blurb:
      "Little Rock's coverage is strongest west of downtown and through the Chenal and Maumelle corridors. The metro is compact enough that install appointments are usually easy to schedule quickly.",
    neighborhoods: ["Hillcrest", "The Heights", "Chenal Valley", "West Little Rock", "Maumelle", "North Little Rock", "Sherwood", "Benton"],
    nearby: ["memphis-tn", "oklahoma-city-ok", "st-louis-mo"],
    localNote:
      "Smaller market, shorter queues: same-week installs are more often available here than in the big metros. If you need service fast, say so when you order.",
  },
  {
    slug: "oklahoma-city-ok",
    city: "Oklahoma City",
    state: "OK",
    stateName: "Oklahoma",
    metro: "Oklahoma City Metro",
    blurb:
      "Oklahoma City's fiber coverage tracks its suburban growth, with Edmond, Moore and Norman generally well served. The metro's low density means longer runs in some outlying areas.",
    neighborhoods: ["Bricktown", "Midtown", "Nichols Hills", "Edmond", "Moore", "Norman", "Yukon", "Deer Creek"],
    nearby: ["tulsa-ok", "little-rock-ar", "fort-worth-tx"],
    localNote:
      "Storm season is a real consideration here. Fiber isn't affected by electrical surges the way copper can be, but keep the hub on a surge protector anyway — the electronics still need power.",
  },
  {
    slug: "tulsa-ok",
    city: "Tulsa",
    state: "OK",
    stateName: "Oklahoma",
    metro: "Tulsa Metro",
    blurb:
      "Tulsa's coverage is best through the midtown and south Tulsa corridors and out into Broken Arrow and Jenks. Remote-work demand has pushed interest toward the gigabit tiers here.",
    neighborhoods: ["Midtown", "Brookside", "South Tulsa", "Cherry Street", "Broken Arrow", "Jenks", "Bixby", "Owasso"],
    nearby: ["oklahoma-city-ok", "little-rock-ar", "wichita-ks"],
    localNote:
      "Tulsa has an unusually high share of remote workers relocating in. If you're moving from out of state, check the address before you sign a lease — it's the cheapest five minutes of the whole move.",
  },
  {
    slug: "wichita-ks",
    city: "Wichita",
    state: "KS",
    stateName: "Kansas",
    metro: "Wichita Metro",
    blurb:
      "Wichita's fiber availability concentrates in the eastern and northeastern parts of the metro, including Andover and Derby. Build-out continues, and the picture changes address by address.",
    neighborhoods: ["College Hill", "Riverside", "East Wichita", "Northeast Heights", "Andover", "Derby", "Maize", "Bel Aire"],
    nearby: ["kansas-city-mo", "tulsa-ok", "oklahoma-city-ok"],
    localNote:
      "In a market this size the entry 300 Mbps plan genuinely covers most households. We'd rather put you on the right tier than upsell you into speed you won't use.",
  },
  {
    slug: "kansas-city-mo",
    city: "Kansas City",
    state: "MO",
    stateName: "Missouri",
    metro: "Kansas City Metro",
    blurb:
      "Kansas City is a well-known fiber city and competition is high, which usually works in your favour on both speed and price. AT&T's coverage runs through much of the Missouri side and parts of the suburbs.",
    neighborhoods: ["Brookside", "Waldo", "River Market", "Westport", "Lee's Summit", "Independence", "Liberty", "Blue Springs"],
    nearby: ["st-louis-mo", "wichita-ks", "chicago-il"],
    localNote:
      "The state line runs through this metro and the available plans can differ on either side of it. Tell us which side you're on and we'll check the right footprint.",
  },
  {
    slug: "st-louis-mo",
    city: "St. Louis",
    state: "MO",
    stateName: "Missouri",
    metro: "Greater St. Louis",
    blurb:
      "St. Louis coverage is strongest through the central corridor and the western suburbs toward Chesterfield. The region's older housing stock means install details vary more than in newer metros.",
    neighborhoods: ["Central West End", "The Hill", "Soulard", "Tower Grove", "Clayton", "Kirkwood", "Webster Groves", "Chesterfield"],
    nearby: ["kansas-city-mo", "chicago-il", "indianapolis-in"],
    localNote:
      "Century-old brick homes here often have thick interior walls that Wi-Fi struggles with. Plan the hub placement with the technician rather than defaulting to wherever the line enters the house.",
  },
  {
    slug: "chicago-il",
    city: "Chicago",
    state: "IL",
    stateName: "Illinois",
    metro: "Chicagoland",
    blurb:
      "Chicago is a dense, building-by-building market where a two-flat and the high-rise next door can get different answers. The suburbs — Naperville, Evanston, Oak Park — often have more consistent coverage than the city core.",
    neighborhoods: ["Lincoln Park", "Logan Square", "Wicker Park", "Lakeview", "Hyde Park", "Evanston", "Oak Park", "Naperville"],
    nearby: ["milwaukee-wi", "indianapolis-in", "detroit-mi"],
    localNote:
      "Winter installs are routine here, but if the drop has to be buried the ground work may be scheduled separately once conditions allow. You still get connected on the first visit — the burial is finished afterwards.",
  },
  {
    slug: "indianapolis-in",
    city: "Indianapolis",
    state: "IN",
    stateName: "Indiana",
    metro: "Indianapolis Metro",
    blurb:
      "Indianapolis has broad coverage through the northern suburbs — Carmel, Fishers and Zionsville — with the city's near-downtown neighborhoods filling in. The metro's flat, grid-like layout keeps most installs simple.",
    neighborhoods: ["Broad Ripple", "Fountain Square", "Irvington", "Speedway", "Carmel", "Fishers", "Zionsville", "Greenwood"],
    nearby: ["chicago-il", "louisville-ky", "columbus-oh"],
    localNote:
      "Hamilton County suburbs are among the better-covered parts of the state. If you're house-hunting across the metro, check a couple of candidate addresses at once and we'll tell you which ones already have fiber.",
  },
  {
    slug: "detroit-mi",
    city: "Detroit",
    state: "MI",
    stateName: "Michigan",
    metro: "Metro Detroit",
    blurb:
      "Metro Detroit's fiber coverage leans toward the suburbs — Royal Oak, Ferndale, Troy and the Grosse Pointes — with ongoing build-out inside the city. Ann Arbor and Dearborn are separate pictures again.",
    neighborhoods: ["Midtown", "Corktown", "Royal Oak", "Ferndale", "Dearborn", "Grosse Pointe", "Troy", "Ann Arbor"],
    nearby: ["chicago-il", "cleveland-oh", "milwaukee-wi"],
    localNote:
      "Older suburban homes here frequently have the demarcation point in a basement corner. Ask the technician to mount the hub upstairs and run the line — it makes a bigger difference to Wi-Fi than any router upgrade.",
  },
  {
    slug: "milwaukee-wi",
    city: "Milwaukee",
    state: "WI",
    stateName: "Wisconsin",
    metro: "Milwaukee Metro",
    blurb:
      "Milwaukee's coverage is concentrated in the city's east side and the near northern and western suburbs. Wauwatosa, Shorewood and Brookfield are typically among the better-served areas.",
    neighborhoods: ["Bay View", "Third Ward", "Riverwest", "Wauwatosa", "Shorewood", "Whitefish Bay", "West Allis", "Brookfield"],
    nearby: ["chicago-il", "detroit-mi", "st-louis-mo"],
    localNote:
      "Duplexes are everywhere in Milwaukee and each unit is usually treated as its own address. Check the specific unit, not just the street number, or the answer you get may belong to your neighbour.",
  },
  {
    slug: "columbus-oh",
    city: "Columbus",
    state: "OH",
    stateName: "Ohio",
    metro: "Columbus Metro",
    blurb:
      "Columbus has grown quickly and fiber has followed into Dublin, Westerville and Hilliard. The university area and the older central neighborhoods are more variable.",
    neighborhoods: ["Short North", "German Village", "Clintonville", "Grandview Heights", "Dublin", "Westerville", "Hilliard", "Gahanna"],
    nearby: ["cleveland-oh", "indianapolis-in", "louisville-ky"],
    localNote:
      "Student rentals near campus turn over every August and install slots get scarce in that window. If you're moving in for the school year, book the appointment a few weeks ahead.",
  },
  {
    slug: "cleveland-oh",
    city: "Cleveland",
    state: "OH",
    stateName: "Ohio",
    metro: "Greater Cleveland",
    blurb:
      "Cleveland's coverage is strongest across the western and eastern suburbs — Lakewood, Westlake, Shaker Heights — with the city itself continuing to build out. Lake-effect weather shapes the install calendar more than in most markets.",
    neighborhoods: ["Ohio City", "Tremont", "University Circle", "Lakewood", "Shaker Heights", "Westlake", "Rocky River", "Parma"],
    nearby: ["columbus-oh", "detroit-mi", "chicago-il"],
    localNote:
      "Winter weather can push an outdoor portion of the install into a follow-up visit. Your service is still activated on the first appointment — the remaining exterior work is finished when conditions allow.",
  },
  {
    slug: "louisville-ky",
    city: "Louisville",
    state: "KY",
    stateName: "Kentucky",
    metro: "Louisville Metro",
    blurb:
      "Louisville's fiber coverage runs through the Highlands, St. Matthews and out east toward Middletown and Prospect. The south and west of the metro are more of a mixed picture.",
    neighborhoods: ["Highlands", "NuLu", "St. Matthews", "Clifton", "Germantown", "Jeffersontown", "Middletown", "Prospect"],
    nearby: ["nashville-tn", "indianapolis-in", "columbus-oh"],
    localNote:
      "Metro Louisville spans the county, so 'Louisville' on an envelope can mean very different infrastructure. The address check settles it in a few seconds.",
  },
  {
    slug: "las-vegas-nv",
    city: "Las Vegas",
    state: "NV",
    stateName: "Nevada",
    metro: "Las Vegas Valley",
    blurb:
      "The Las Vegas Valley is newer construction than most AT&T markets, which generally helps: master-planned areas like Summerlin and parts of Henderson tend to have straightforward fiber installs. Older central areas vary.",
    neighborhoods: ["Summerlin", "Henderson", "Green Valley", "Spring Valley", "Enterprise", "Centennial Hills", "North Las Vegas", "Paradise"],
    nearby: ["los-angeles-ca", "san-diego-ca", "san-jose-ca"],
    localNote:
      "Note that AT&T Internet Air is not offered in Nevada, so if fiber hasn't reached your address here, the 5G home internet fallback isn't an option — worth knowing before you plan a move-in date.",
  },
];

export const citiesBySlug = new Map(cities.map((c) => [c.slug, c]));

/** Cities grouped by state name, alphabetically — used by the hub page. */
export function citiesByState(): Array<{ stateName: string; items: City[] }> {
  const map = new Map<string, City[]>();
  for (const city of cities) {
    const list = map.get(city.stateName) ?? [];
    list.push(city);
    map.set(city.stateName, list);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([stateName, items]) => ({
      stateName,
      items: items.sort((a, b) => a.city.localeCompare(b.city)),
    }));
}
