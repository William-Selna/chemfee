import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Pill, Section, SectionHeading } from "@/components/ui";
import { ArrowUpRight, Scale } from "@/components/icons";
import { guides } from "@/content/guides";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Brew guides",
  description:
    "Step-by-step coffee brewing recipes for V60 pour-over, AeroPress, French press, and home espresso — with exact doses, ratios, temperatures, and troubleshooting.",
  path: "/brew",
});

const fundamentals = [
  {
    title: "Weigh everything",
    body: "A €15 kitchen scale improves your coffee more than a €150 brewer. Volume measures for coffee are a rounding error pretending to be a recipe.",
  },
  {
    title: "Ratio first, grind second",
    body: "Pick a ratio between 1:15 and 1:17 for filter, then stop changing it. Grind size is the only variable you should be adjusting day to day.",
  },
  {
    title: "Water is 98% of the cup",
    body: "Filtered tap water is usually ideal. Distilled water extracts badly and tastes hollow; very hard water mutes acidity and scales your kettle.",
  },
  {
    title: "Taste, then adjust once",
    body: "Sour and thin means under-extracted — grind finer. Bitter and drying means over-extracted — grind coarser. Change one thing per brew.",
  },
];

export default function BrewIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brew guides", path: "/brew" },
        ])}
      />

      <PageHero
        eyebrow="Brew guides"
        title="Four recipes, no mysticism"
        lead="These are the recipes we use on the bar and at home — weights, times, temperatures, and the specific things most likely to be going wrong."
        trail={[
          { name: "Home", path: "/" },
          { name: "Brew guides", path: "/brew" },
        ]}
      />

      <Section className="pt-16 md:pt-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {guides.map((guide, i) => (
            <Reveal key={guide.slug} delay={i * 90}>
              <Link
                href={`/brew/${guide.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-raised transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift"
              >
                <div
                  className="flex items-center justify-between px-8 py-7"
                  style={{ backgroundColor: `color-mix(in oklab, ${guide.accent} 12%, transparent)` }}
                >
                  <Pill tone="outline">{guide.method}</Pill>
                  <span
                    className="font-display text-sm font-semibold"
                    style={{ color: guide.accent }}
                  >
                    {guide.difficulty}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <h2 className="text-2xl leading-snug transition-colors group-hover:text-accent">
                    {guide.title}
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{guide.summary}</p>

                  <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                    {[
                      { label: "Ratio", value: guide.ratio },
                      { label: "Grind", value: guide.grind.split(" — ")[0] },
                      { label: "Time", value: guide.totalTime },
                    ].map((spec) => (
                      <div key={spec.label}>
                        <dt className="text-[0.625rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                          {spec.label}
                        </dt>
                        <dd className="mt-1.5 text-sm text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-7 flex items-center gap-2 text-sm font-medium text-accent">
                    Read the guide
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sunken">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Fundamentals"
              title="Four things that matter more than your equipment"
              lead="If you only read one section of this site, make it this one."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2">
            {fundamentals.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="bg-paper">
                <div className="flex h-full gap-5 p-8">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-wash text-amber">
                    <Scale className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl">{item.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
