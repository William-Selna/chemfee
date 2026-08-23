import { brand, contact, hours, social } from "@/content/site";
import type { Product } from "@/content/products";
import type { Post } from "@/content/posts";
import type { Guide } from "@/content/guides";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * Renders a JSON-LD block. Server component — the payload is serialised at
 * build time and shipped as static HTML, which is what crawlers want.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the `</script>` edge case below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const DAY_MAP: Record<string, string[]> = {
  "Monday – Thursday": ["Monday", "Tuesday", "Wednesday", "Thursday"],
  Friday: ["Friday"],
  Saturday: ["Saturday"],
  Sunday: ["Sunday"],
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brand.name,
    legalName: brand.legalName,
    url: siteUrl,
    description: brand.tagline,
    foundingDate: String(brand.founded),
    email: contact.email,
    telephone: contact.phone,
    sameAs: social.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${siteUrl}/visit#cafe`,
    name: brand.name,
    url: absoluteUrl("/visit"),
    image: absoluteUrl("/opengraph-image"),
    description: `${brand.name} café and roastery — ${brand.tagline}`,
    priceRange: "$$",
    servesCuisine: "Coffee",
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP[h.days] ?? [h.days],
      opens: h.open,
      closes: h.close,
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    url: absoluteUrl(`/coffee/${product.slug}`),
    description: product.blurb,
    category: "Coffee beans",
    brand: { "@type": "Brand", name: brand.name },
    countryOfOrigin: product.country,
    weight: {
      "@type": "QuantitativeValue",
      value: product.weightGrams,
      unitCode: "GRM",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Roast level", value: product.roast },
      { "@type": "PropertyValue", name: "Process", value: product.process },
      { "@type": "PropertyValue", name: "Varietal", value: product.varietal },
      { "@type": "PropertyValue", name: "Altitude", value: product.altitude },
      { "@type": "PropertyValue", name: "Tasting notes", value: product.notes.join(", ") },
    ],
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      // Online ordering is not live yet — the site collects interest instead.
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl(`/coffee/${product.slug}`),
      seller: { "@id": `${siteUrl}/#organization` },
    },
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/journal/${post.slug}`),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author, jobTitle: post.role },
    publisher: { "@id": `${siteUrl}/#organization` },
    articleSection: post.category,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/journal/${post.slug}`) },
  };
}

export function howToSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.summary,
    url: absoluteUrl(`/brew/${guide.slug}`),
    totalTime: `PT${guide.totalTime.replace(/[^0-9].*/, "") || "5"}M`,
    yield: guide.yield,
    supply: guide.gear.map((g) => ({ "@type": "HowToSupply", name: g })),
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
