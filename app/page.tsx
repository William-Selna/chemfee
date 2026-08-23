import Link from "next/link";
import { ProductBag, Steam } from "@/components/bag";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Eyebrow,
  Meter,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { ArrowRight, ArrowUpRight, Clock, Leaf, MapPin, Scale, Truck } from "@/components/icons";
import { products } from "@/content/products";
import { guides } from "@/content/guides";
import { sortedPosts } from "@/content/posts";
import { addressLines, hours } from "@/content/site";
import { formatDate } from "@/lib/seo";

const featured = products.slice(0, 3);
const hero = products[0];

const marqueeItems = [
  "Roasted Tuesdays",
  "Shipped Wednesdays",
  "Single origin",
  "Seasonal lots",
  "Direct trade",
  "Never dark roasted",
  "Café open daily",
];

const promises = [
  {
    icon: Leaf,
    title: "Seasonal, not perennial",
    body: "We buy at harvest and sell until it's gone. If a coffee is off the list, it's because it stopped tasting the way it should.",
  },
  {
    icon: Scale,
    title: "Prices you can audit",
    body: "We publish what we paid per kilo, FOB, for every lot on the shelf. Twice the C-market price is the floor, not the headline.",
  },
  {
    icon: Truck,
    title: "Roasted to order",
    body: "Nothing sits in a warehouse. Your bag is roasted on Tuesday and in the post by Wednesday afternoon.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-paper pt-32 pb-20 md:pt-44 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 26%, transparent), transparent 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-56 -left-32 h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--amber) 24%, transparent), transparent 70%)",
          }}
        />

        <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Est. 2019 · Amsterdam Oost</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-display mt-7">
                Coffee that still
                <br />
                tastes like{" "}
                <span className="relative inline-block text-accent">
                  somewhere
                  <svg
                    aria-hidden
                    viewBox="0 0 300 18"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-3 w-full text-accent/40"
                  >
                    <path
                      d="M2 12C60 4 120 4 178 9s86 6 120 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                We buy small lots from farms we can name, roast them light enough to keep the
                origin intact, and publish exactly what we paid. Then we brew it properly on
                Wijttenbachstraat.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href="/coffee" size="lg">
                  Browse the coffee
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/visit" size="lg" variant="outline">
                  Visit the café
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
                {[
                  { value: "14", label: "Producer partners" },
                  { value: "6", label: "Lots on the shelf" },
                  { value: "48h", label: "Roast to doorstep" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-display block text-3xl text-ink md:text-4xl">
                        {stat.value}
                      </span>
                      <span className="mt-1.5 block text-xs leading-snug text-ink-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Hero artwork */}
          <Reveal delay={200} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div
                aria-hidden
                className="absolute inset-0 -m-6 rounded-[3rem] border border-line bg-raised/60 backdrop-blur-sm"
              />
              <Steam
                aria-hidden
                className="absolute -top-16 left-1/2 h-32 w-24 -translate-x-1/2 text-accent"
              />
              <div className="relative px-8 py-10">
                <ProductBag product={hero} />
              </div>

              <div className="absolute -bottom-6 -left-4 rounded-3xl border border-line bg-raised p-5 shadow-lift sm:-left-10">
                <p className="eyebrow">Now pouring</p>
                <p className="font-display mt-2 text-xl text-ink">{hero.name}</p>
                <div className="mt-4 flex w-44 flex-col gap-2">
                  <Meter label="Acidity" value={hero.cupping.acidity} />
                  <Meter label="Body" value={hero.cupping.body} />
                </div>
              </div>

              <div className="absolute -top-4 -right-2 rotate-3 rounded-2xl bg-espresso px-4 py-3 shadow-lift sm:-right-8">
                <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-espresso-muted uppercase">
                  Roasted
                </p>
                <p className="mt-1 text-sm text-espresso-ink">Tuesday, 6:10am</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────────────────────── */}
      <div className="grain overflow-hidden border-y border-line bg-espresso py-5">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10">
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-10">
                  <span className="text-sm font-medium tracking-[0.14em] text-espresso-ink uppercase">
                    {item}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured coffee ────────────────────────────────────────────── */}
      <Section>
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="On the shelf"
                title="What came off the drum this week"
                lead="Six lots at a time, no more. When one runs out we do not reorder — we find the next thing worth roasting."
              />
              <Link
                href="/coffee"
                className="link-underline group inline-flex items-center gap-2 pb-2 text-sm font-medium text-accent"
              >
                All coffee
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 100}>
                <ProductCard product={product} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Promises ───────────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Three things we will not compromise on"
              lead="Everything else is negotiable, including our own opinions about roast profiles."
            />
            <ButtonLink href="/about" variant="outline" className="mt-9">
              Read the long version
            </ButtonLink>
          </Reveal>

          <div className="flex flex-col">
            {promises.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="flex gap-6 border-b border-line py-8 first:pt-0 last:border-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-wash text-accent">
                    <item.icon className="h-5 w-5" />
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

      {/* ── Brew guides ────────────────────────────────────────────────── */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Brew guides"
              title="Recipes we actually use, not ones we copied"
              lead="Weights, times, temperatures, and the three things most likely to be going wrong."
              className="mx-auto items-center text-center"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide, i) => (
              <Reveal key={guide.slug} delay={i * 80}>
                <Link
                  href={`/brew/${guide.slug}`}
                  className="group flex h-full flex-col rounded-4xl border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift"
                >
                  <div
                    className="grid h-11 w-11 place-items-center rounded-2xl text-white"
                    style={{ backgroundColor: guide.accent }}
                  >
                    <span className="font-display text-sm font-semibold">{i + 1}</span>
                  </div>
                  <p className="mt-6 text-xs tracking-[0.14em] text-ink-muted uppercase">
                    {guide.method}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug transition-colors group-hover:text-accent">
                    {guide.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {guide.summary}
                  </p>
                  <p className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink-muted uppercase">
                    {guide.totalTime}
                    <span aria-hidden>·</span>
                    {guide.ratio}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Café ───────────────────────────────────────────────────────── */}
      <Section tone="espresso" className="grain relative overflow-hidden">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal>
            <SectionHeading
              onDark
              eyebrow="The café"
              title="There is a room, and you are welcome in it"
              lead="Twenty-eight seats, one long table, and a bar where the espresso machine faces the customer on purpose. We serve everything we roast, two minutes from the Dappermarkt."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/visit" variant="onDark">
                Hours &amp; directions
              </ButtonLink>
              <ButtonLink
                href="/wholesale"
                variant="outline"
                className="border-white/25 text-espresso-ink hover:border-white hover:text-white"
              >
                Serve our coffee
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-4xl border border-white/12 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <div className="flex items-start gap-4 border-b border-white/10 pb-6">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-espresso-muted uppercase">
                    Roastery &amp; café
                  </p>
                  <p className="mt-2 text-espresso-ink">
                    {addressLines.map((line) => (
  <span key={line} className="block">
    {line}
  </span>
))}
</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div className="flex-1">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-espresso-muted uppercase">
                    Opening hours
                  </p>
                  <dl className="mt-3 flex flex-col gap-2.5 text-sm">
                    {hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6">
                        <dt>{h.days}</dt>
                        <dd className="text-espresso-ink tabular-nums">
                          {h.open} – {h.close}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Journal ────────────────────────────────────────────────────── */}
      <Section>
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Journal"
                title="Writing about coffee, occasionally against our own interests"
              />
              <Link
                href="/journal"
                className="link-underline group inline-flex items-center gap-2 pb-2 text-sm font-medium text-accent"
              >
                All posts
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {sortedPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 90}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group flex h-full flex-col rounded-4xl border border-line p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:bg-raised hover:shadow-lift"
                >
                  <div className="flex items-center gap-3">
                    <Pill tone="amber">{post.category}</Pill>
                    <span className="text-xs text-ink-muted">{post.readingMinutes} min read</span>
                  </div>
                  <h3 className="mt-5 text-xl leading-snug transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <time
                    dateTime={post.date}
                    className="mt-6 text-xs tracking-wide text-ink-muted uppercase"
                  >
                    {formatDate(post.date)}
                  </time>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
