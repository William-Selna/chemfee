export type RoastLevel = "Light" | "Medium" | "Medium-Dark" | "Dark";

export type Product = {
  slug: string;
  name: string;
  /** Short hook shown on cards. */
  blurb: string;
  country: string;
  region: string;
  producer: string;
  altitude: string;
  varietal: string;
  process: string;
  harvest: string;
  roast: RoastLevel;
  /** 1–5, drives the little roast meter. */
  roastIndex: number;
  notes: string[];
  bestFor: string[];
  price: number;
  weightGrams: number;
  /** Printed on the certificate band of the bag artwork. */
  lot: string;
  /** Drives the generated bag artwork — no image files needed. */
  accent: string;
  accentSoft: string;
  badge?: "Seasonal" | "Limited" | "Decaf" | "Best seller";
  description: string[];
  cupping: { body: number; acidity: number; sweetness: number };
};

export const products: Product[] = [
  {
    slug: "dawn-chorus",
    name: "Dawn Chorus",
    blurb: "Jasmine, bergamot, and white peach. Loud in the best way.",
    country: "Ethiopia",
    region: "Guji, Oromia",
    producer: "Shakiso Washing Station",
    altitude: "1,950 – 2,150 masl",
    varietal: "Heirloom (74110, 74112)",
    process: "Washed",
    harvest: "November – January",
    roast: "Light",
    roastIndex: 1,
    notes: ["Jasmine", "Bergamot", "White peach"],
    bestFor: ["Pour-over", "Filter", "Cold brew"],
    price: 24,
    weightGrams: 250,
    lot: "CF 001-120826",
    accent: "#2E6157",
    accentSoft: "#7FA69C",
    badge: "Best seller",
    cupping: { body: 2, acidity: 5, sweetness: 4 },
    description: [
      "The lot that convinced us to start roasting in the first place. Grown on the ridges above Shakiso and fully washed at a station that runs its fermentation tanks cold and slow, it lands somewhere between a cup of tea and a glass of stone-fruit juice.",
      "We roast it deliberately short of first crack's tail end, which keeps the florals intact and the finish clean. If you have ever been told you do not like light roasts, this is the one we would ask you to try again.",
    ],
  },
  {
    slug: "nightshift",
    name: "Nightshift",
    blurb: "Our espresso blend. Cocoa, plum, and brown sugar under pressure.",
    country: "Brazil & Colombia",
    region: "Cerrado Mineiro / Huila",
    producer: "Six-farm blend",
    altitude: "1,100 – 1,750 masl",
    varietal: "Red Catuaí, Caturra, Castillo",
    process: "Natural & Washed",
    harvest: "Year-round rotation",
    roast: "Medium-Dark",
    roastIndex: 4,
    notes: ["Dark cocoa", "Red plum", "Brown sugar"],
    bestFor: ["Espresso", "Moka pot", "Milk drinks"],
    price: 21,
    weightGrams: 340,
    lot: "CF 002-090126",
    accent: "#38455B",
    accentSoft: "#8892A6",
    badge: "Best seller",
    cupping: { body: 5, acidity: 2, sweetness: 5 },
    description: [
      "Built for the 6 a.m. shift and the 6 p.m. one. Natural Brazils carry the body and the sugar; a washed Colombian component keeps it from collapsing into sweetness and adds a red-fruit lift through the middle.",
      "It pulls forgiving — a wide window either side of 1:2 in 28 seconds — and it does not disappear in oat milk, which is the entire point of an espresso blend.",
    ],
  },
  {
    slug: "cloud-cover",
    name: "Cloud Cover",
    blurb: "Blackcurrant and cane sugar with that famous Kenyan snap.",
    country: "Kenya",
    region: "Nyeri County",
    producer: "Gichathaini Factory",
    altitude: "1,800 – 1,900 masl",
    varietal: "SL28, SL34, Ruiru 11",
    process: "Washed, 72hr fermentation",
    harvest: "October – December",
    roast: "Light",
    roastIndex: 2,
    notes: ["Blackcurrant", "Tomato leaf", "Cane sugar"],
    bestFor: ["Pour-over", "Filter", "Chemex"],
    price: 26,
    weightGrams: 250,
    lot: "CF 003-041125",
    accent: "#5F7A4F",
    accentSoft: "#A3B894",
    badge: "Limited",
    cupping: { body: 3, acidity: 5, sweetness: 4 },
    description: [
      "Nyeri's red volcanic soil and a 72-hour soak give this the kind of acidity people describe with words like 'structural.' Blackcurrant up front, something savoury and green in the middle, cane sugar on the way out.",
      "Twelve bags landed. When they are gone we will not have more until the next harvest, and we are not going to pretend otherwise on a banner.",
    ],
  },
  {
    slug: "slow-sunday",
    name: "Slow Sunday",
    blurb: "Milk chocolate, orange peel, toasted almond. Nobody's first coffee to run out.",
    country: "Guatemala",
    region: "Huehuetenango",
    producer: "Finca La Bolsa",
    altitude: "1,500 – 1,700 masl",
    varietal: "Bourbon, Caturra",
    process: "Washed",
    harvest: "January – March",
    roast: "Medium",
    roastIndex: 3,
    notes: ["Milk chocolate", "Orange peel", "Toasted almond"],
    bestFor: ["Filter", "French press", "Espresso"],
    price: 20,
    weightGrams: 340,
    lot: "CF 004-220326",
    accent: "#B8853C",
    accentSoft: "#DDBA82",
    badge: "Seasonal",
    cupping: { body: 4, acidity: 3, sweetness: 5 },
    description: [
      "The house coffee. Roasted to sit comfortably in the middle — enough development for chocolate and nut, not so much that the orange gets cooked out of it.",
      "This is what we hand to people who say 'I just want something that tastes like coffee,' and it is what most of our subscribers end up on after six months of exploring.",
    ],
  },
  {
    slug: "terracotta",
    name: "Terracotta",
    blurb: "Hazelnut, toffee, malt. The one that makes a good flat white.",
    country: "Brazil",
    region: "Cerrado Mineiro",
    producer: "Fazenda Rio Verde",
    altitude: "1,050 – 1,250 masl",
    varietal: "Yellow Bourbon",
    process: "Pulped natural",
    harvest: "June – August",
    roast: "Medium-Dark",
    roastIndex: 4,
    notes: ["Hazelnut", "Toffee", "Malted barley"],
    bestFor: ["Espresso", "Moka pot", "Milk drinks"],
    price: 19,
    weightGrams: 340,
    lot: "CF 005-160825",
    accent: "#A3552F",
    accentSoft: "#D19273",
    cupping: { body: 5, acidity: 2, sweetness: 4 },
    description: [
      "Yellow Bourbon dried on raised beds with the mucilage still on, which is where the toffee comes from. Low acid, heavy body, and a finish that lingers like the end of a long meal.",
      "If your grinder is inconsistent or your scale is a guess, start here. It is the most forgiving coffee we roast.",
    ],
  },
  {
    slug: "half-light",
    name: "Half Light",
    blurb: "Decaf that isn't an apology. Red apple, cocoa, caramel.",
    country: "Colombia",
    region: "Huila",
    producer: "Cooperativa de Caficultores del Huila",
    altitude: "1,600 – 1,900 masl",
    varietal: "Castillo, Colombia",
    process: "Sugarcane EA decaffeination",
    harvest: "April – June",
    roast: "Medium",
    roastIndex: 3,
    notes: ["Red apple", "Cocoa nib", "Caramel"],
    bestFor: ["Filter", "Espresso", "Evening"],
    price: 22,
    weightGrams: 250,
    lot: "CF 006-300526",
    accent: "#6B5480",
    accentSoft: "#A897B8",
    badge: "Decaf",
    cupping: { body: 4, acidity: 3, sweetness: 4 },
    description: [
      "Decaffeinated with ethyl acetate derived from Colombian sugarcane, in Colombia, close to where it grew — which means the beans do not cross an ocean twice before they are roasted.",
      "It keeps far more of the origin character than solvent decafs usually manage. We drink it after eight o'clock and we are not being polite about it.",
    ],
  },
];

export const roastLevels: RoastLevel[] = ["Light", "Medium", "Medium-Dark", "Dark"];

export const origins = [...new Set(products.map((p) => p.country))].sort();

export const allNotes = [...new Set(products.flatMap((p) => p.notes))].sort();

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
