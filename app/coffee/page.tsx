import { CoffeeBrowser } from "@/components/coffee-browser";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui";
import { Accordion } from "@/components/accordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { origins, products, roastLevels } from "@/content/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Coffee beans",
  description:
    "Six single-origin and blended coffees, roasted in small batches. Filter by roast level and origin — tasting notes, altitude, process, and producer listed for every lot.",
  path: "/coffee",
});

const faqs = [
  {
    q: "How fresh will my coffee be?",
    a: "We roast every Tuesday and post on Wednesday. Whole bean is at its best from three days to about four weeks after roasting, and every bag has the roast date stamped on the base rather than a meaningless best-before.",
  },
  {
    q: "Whole bean or ground?",
    a: "We sell whole bean only. Ground coffee loses most of its aromatics within twenty minutes, and we would rather point you at a €40 hand grinder than sell you something that will be flat by the time it arrives.",
  },
  {
    q: "Which one should I start with?",
    a: "Slow Sunday if you want something familiar and chocolatey, Dawn Chorus if you want to understand what people mean by 'fruity', and Nightshift if you are pulling espresso. All three are forgiving.",
  },
  {
    q: "Can I order online right now?",
    a: "Not yet — the shop opens later this year. Join the list on any coffee and we will email you the moment ordering goes live, along with first access to limited lots.",
  },
];

export default function CoffeePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Coffee", path: "/coffee" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow="The shelf"
        title="Six coffees. That's the whole range."
        lead="We keep the list short so every lot gets the attention it needs — and so nothing sits in the warehouse long enough to go stale."
        trail={[
          { name: "Home", path: "/" },
          { name: "Coffee", path: "/coffee" },
        ]}
      />

      <Section className="pt-16 md:pt-20">
        <div className="container-x">
          <CoffeeBrowser products={products} roastLevels={roastLevels} origins={origins} />
        </div>
      </Section>

      <Section tone="sunken" className="py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-display-sm">Before you buy</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              The questions we get asked most, answered without marketing language.
            </p>
          </div>
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
