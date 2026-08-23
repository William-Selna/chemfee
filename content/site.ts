/**
 * Single source of truth for brand + contact details.
 *
 * The street address, postcode, city, and legal name are real.
 * PLACEHOLDER: phone number, email addresses, and social URLs are stand-ins —
 * replace them here and the whole site updates.
 */

export const brand = {
  name: "CHEMFEE",
  shortName: "CHEMFEE",
  /** Sits under the wordmark, exactly as on the packaging. */
  descriptor: "The Coffee Chemists",
  tagline: "Coffee, measured properly.",
  founded: 2019,
  /** Used for <title> suffixes, OG images, and JSON-LD. */
  legalName: "CHEMFEE Holding Company",
} as const;

export const contact = {
  // PLACEHOLDER — swap for the real inbox and number.
  email: "hello@chemfee.nl",
  wholesaleEmail: "wholesale@chemfee.nl",
  phone: "+31 20 123 4567",
  phoneHref: "tel:+31201234567",
  address: {
    street: "Wijttenbachstraat 307",
    postalCode: "1093 HX",
    locality: "Amsterdam",
    region: "Noord-Holland",
    country: "NL",
    countryName: "Netherlands",
  },
  /** Approximate — good enough for a map pin, worth refining before launch. */
  geo: { lat: 52.3603, lng: 4.9319 },
} as const;

/** Address in Dutch reading order, for anywhere it's printed as a block. */
export const addressLines = [
  contact.address.street,
  `${contact.address.postalCode} ${contact.address.locality}`,
  contact.address.countryName,
] as const;

export const hours = [
  { days: "Monday – Thursday", open: "7:30", close: "17:00" },
  { days: "Friday", open: "7:30", close: "18:00" },
  { days: "Saturday", open: "8:30", close: "18:00" },
  { days: "Sunday", open: "9:00", close: "16:00" },
] as const;

export const social = [
  { label: "Instagram", href: "https://example.com/instagram" },
  { label: "Substack", href: "https://example.com/substack" },
  { label: "YouTube", href: "https://example.com/youtube" },
] as const;

export const nav = [
  { label: "Coffee", href: "/coffee" },
  { label: "Brew Guides", href: "/brew" },
  { label: "Visit", href: "/visit" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Wholesale", href: "/wholesale" },
] as const;

export const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "All coffee", href: "/coffee" },
      { label: "Wholesale", href: "/wholesale" },
      { label: "Brew guides", href: "/brew" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Visit the café", href: "/visit" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
