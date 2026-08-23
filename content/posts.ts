export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  updated?: string;
  author: string;
  role: string;
  category: "Sourcing" | "Brewing" | "Roasting" | "Café";
  readingMinutes: number;
  accent: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "what-a-price-actually-buys",
    title: "What €24 a bag actually buys",
    excerpt:
      "A line-by-line breakdown of where the money goes on a single 250 g bag of washed Ethiopian — including the parts that are uncomfortable to publish.",
    date: "2025-07-22",
    author: "[Author Name]",
    role: "Green buyer",
    category: "Sourcing",
    readingMinutes: 7,
    accent: "#2E6157",
    body: [
      {
        type: "p",
        text: "Every few months someone asks why a bag from us costs more than three times what the same weight costs at a supermarket. It is a fair question and the honest answer is boring: most of the difference is paid out before the coffee ever reaches our roaster.",
      },
      { type: "h2", text: "The green coffee" },
      {
        type: "p",
        text: "We paid €9.70 per kilo FOB for this lot, against a C-market price that sat around €3.85 at the time of contract. That premium is not charity; it is what it costs to secure a specific washing station's specific day lots rather than a blended regional export grade.",
      },
      {
        type: "list",
        items: [
          "Green coffee, FOB: €9.70 / kg",
          "Ocean freight, duty, and customs brokerage: €0.84 / kg",
          "Import warehousing and spot-check cupping: €0.44 / kg",
          "Roast loss — 250 g of roasted coffee starts as roughly 300 g green: about 17%",
        ],
      },
      { type: "h2", text: "The parts nobody puts on a website" },
      {
        type: "p",
        text: "Packaging with a functioning one-way valve costs more than packaging without one. Shipping a 250 g bag across the Netherlands costs us between €3.90 and €7.20 depending on where you live, and we absorb most of it above a threshold because a €8 shipping line at checkout loses more orders than it recovers.",
      },
      {
        type: "quote",
        text: "If a roaster will not tell you what they paid, it is usually because the answer is the C-market price plus a sticker.",
      },
      {
        type: "p",
        text: "What is left after all of that funds a small roastery, four salaries, and a café that has yet to have a genuinely profitable February. We are not complaining. We are just answering the question.",
      },
    ],
  },
  {
    slug: "your-grinder-matters-more",
    title: "Your grinder matters more than your brewer",
    excerpt:
      "If you have €200 to spend on coffee equipment, spend €180 of it on the grinder. Here is the uncomfortable evidence.",
    date: "2025-06-04",
    author: "[Author Name]",
    role: "Head of coffee",
    category: "Brewing",
    readingMinutes: 5,
    accent: "#5F7A4F",
    body: [
      {
        type: "p",
        text: "We ran the same coffee through a €30 blade grinder and a €180 conical burr grinder into identical V60s, same water, same pour, same operator, blind-tasted by six people. Six out of six picked the burr cup. Four described the blade cup with the word 'hollow.'",
      },
      { type: "h2", text: "Why particle size distribution wins" },
      {
        type: "p",
        text: "A blade grinder produces a wide spread of particle sizes — boulders and dust in the same dose. Dust over-extracts almost instantly and tastes bitter and drying. Boulders barely extract at all and taste sour and thin. You get both flavours in the same cup, and no brewing adjustment can separate them.",
      },
      {
        type: "p",
        text: "A burr grinder crushes beans to a set gap, which narrows that distribution dramatically. Once the particles are close to uniform, every variable you change — grind size, temperature, time — produces a legible result instead of noise.",
      },
      { type: "h2", text: "What we would actually buy" },
      {
        type: "list",
        items: [
          "Under €100: a decent hand grinder. Slower, but genuinely better than any electric at this price.",
          "€150 – €250: an entry-level flat or conical burr electric. This is where filter coffee stops being a lottery.",
          "Espresso: budget more than you want to. Espresso is unforgiving of grind inconsistency in a way filter is not.",
        ],
      },
      {
        type: "p",
        text: "Keep the cheap brewer. A €6 plastic V60 with a good grinder beats a €300 machine with a bad one, every single time.",
      },
    ],
  },
  {
    slug: "we-stopped-roasting-dark",
    title: "We stopped roasting anything darker than second crack",
    excerpt:
      "A quiet change to our roast profiles, why we made it, and the customers we lost over it.",
    date: "2025-04-18",
    updated: "2025-05-02",
    author: "[Author Name]",
    role: "Roaster",
    category: "Roasting",
    readingMinutes: 6,
    accent: "#A3552F",
    body: [
      {
        type: "p",
        text: "Somewhere past the start of second crack, the coffee stops tasting of where it came from and starts tasting of roast. That is not a moral failing — plenty of people like it, and there is real craft in a well-executed dark roast — but it is a strange thing to spend a year sourcing a specific Kenyan day lot and then erase it in ninety seconds.",
      },
      { type: "h2", text: "What changed on the drum" },
      {
        type: "p",
        text: "We now drop every filter coffee between 205 °C and 212 °C bean temperature, with development time between 18% and 24% of total roast time. The espresso blend goes furthest, and even that stops at the first audible snaps of second crack.",
      },
      {
        type: "quote",
        text: "Roast development is a dial, not a moral position. We just decided which end of it we wanted to live at.",
        cite: "[Author Name], roaster",
      },
      { type: "h2", text: "The cost" },
      {
        type: "p",
        text: "We lost two wholesale accounts within a month. Both wanted a French roast for drip service and both were entirely reasonable about it. We refer that business to a roaster down the road who does it properly, and we would rather do that than do it badly ourselves.",
      },
      {
        type: "p",
        text: "If you want something dark and smoky, we genuinely are not the roaster for you, and we would rather say that here than have you find out for €21.",
      },
    ],
  },
  {
    slug: "the-cafe-is-not-an-office",
    title: "The café is not an office (mostly)",
    excerpt:
      "On laptops, four-hour table occupancy, and the compromise we landed on after two years of getting it wrong in both directions.",
    date: "2025-02-11",
    author: "[Author Name]",
    role: "Café manager",
    category: "Café",
    readingMinutes: 4,
    accent: "#B8853C",
    body: [
      {
        type: "p",
        text: "For a year we had no laptop policy at all and the room slowly turned into a co-working space with worse chairs. Then we banned laptops entirely at weekends and the room turned quiet and slightly hostile. Neither version was the café we wanted.",
      },
      { type: "h2", text: "Where we landed" },
      {
        type: "list",
        items: [
          "Laptops welcome at the long table and the window bar, any day, any hour.",
          "The six small tables are for conversation and eating — no laptops between 11 and 2.",
          "No time limits. If the room is full and you have been on one cup for three hours, we will probably offer you a refill and you will probably read the situation.",
          "Power outlets exist and we are not going to tape them over.",
        ],
      },
      {
        type: "p",
        text: "It is not a rule so much as a shape. Most people find it without being told, which is how you know it is roughly right.",
      },
    ],
  },
];

export const categories = [...new Set(posts.map((p) => p.category))];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
