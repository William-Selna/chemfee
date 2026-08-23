import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBag } from "@/components/bag";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/lead-forms";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, ButtonLink, Meter, Pill, Section, SpecRow } from "@/components/ui";
import { ArrowUpRight, Check } from "@/components/icons";
import { getProduct, products } from "@/content/products";
import { guides } from "@/content/guides";
import { JsonLd, breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/coffee/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) {
    return pageMetadata({
      title: "Coffee not found",
      description: "This coffee is no longer on the shelf.",
      path: `/coffee/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: `${product.name} — ${product.country} ${product.roast.toLowerCase()} roast`,
    description: `${product.blurb} ${product.varietal} from ${product.region}, ${product.process.toLowerCase()}, grown at ${product.altitude}. ${product.weightGrams}g whole bean.`,
    path: `/coffee/${product.slug}`,
  });
}

export default async function ProductPage(props: PageProps<"/coffee/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Coffee", path: "/coffee" },
    { name: product.name, path: `/coffee/${product.slug}` },
  ];

  const recommendedGuides = guides.filter((g) => g.pairsWith.includes(product.slug));
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[productSchema(product), breadcrumbSchema(trail)]} />

      <section className="bg-sunken pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-x">
          <Breadcrumbs trail={trail} />

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Artwork */}
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-5xl border border-line p-10 md:p-16"
              style={{
                background: `linear-gradient(150deg, color-mix(in oklab, ${product.accentSoft} 26%, transparent), color-mix(in oklab, ${product.accent} 12%, transparent))`,
              }}
            >
              {product.badge ? (
                <Pill tone="accent" className="absolute top-6 left-6">
                  {product.badge}
                </Pill>
              ) : null}
              <div className="w-full max-w-md">
                <ProductBag product={product} />
              </div>
            </div>

            {/* Detail */}
            <div className="flex flex-col">
              <p className="eyebrow">
                {product.country} · {product.region}
              </p>
              <h1 className="text-display mt-5">{product.name}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
                {product.blurb}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <Pill key={note} tone="outline">
                    {note}
                  </Pill>
                ))}
              </div>

              <div className="mt-9 flex items-end gap-6 border-y border-line py-7">
                <div>
                  <span className="font-display text-4xl text-ink">€{product.price}</span>
                  <span className="ml-2 text-sm text-ink-muted">
                    / {product.weightGrams}g whole bean
                  </span>
                </div>
                <div className="ml-auto flex flex-col gap-2.5 text-right">
                  <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                    Roast level
                  </span>
                  <span className="flex gap-1" aria-label={`${product.roast} roast`}>
                    {[1, 2, 3, 4, 5].map((step) => (
                      <span
                        key={step}
                        aria-hidden
                        className="h-2.5 w-6 rounded-full"
                        style={{
                          backgroundColor:
                            step <= product.roastIndex ? product.accent : "var(--line-strong)",
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>

              {/* Email capture in place of a cart */}
              <div className="mt-8 rounded-4xl border border-line bg-raised p-7">
                <h2 className="text-xl">Online ordering opens soon</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  Leave your email and we will tell you the day {product.name} goes on sale — and
                  nothing else. In the meantime it is on the bar at the café every day.
                </p>
                <div className="mt-6">
                  <NewsletterForm
                    source="product-interest"
                    product={product.slug}
                    cta="Notify me"
                    note="One email about this coffee. Not a subscription."
                  />
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
                  {["Roasted to order", "Ships in 48 hours", "Roast date on every bag"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-amber" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story + specs ─────────────────────────────────────────────── */}
      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <Reveal>
            <h2 className="text-display-sm">About this lot</h2>
            <div className="mt-7 flex flex-col gap-5 text-lg leading-relaxed text-ink-soft">
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 rounded-4xl bg-sunken p-8">
              <h3 className="text-xl">In the cup</h3>
              <div className="mt-6 flex flex-col gap-4">
                <Meter label="Body" value={product.cupping.body} />
                <Meter label="Acidity" value={product.cupping.acidity} />
                <Meter label="Sweetness" value={product.cupping.sweetness} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-xl">Origin details</h2>
            <dl className="mt-4">
              <SpecRow label="Producer" value={product.producer} />
              <SpecRow label="Region" value={`${product.region}, ${product.country}`} />
              <SpecRow label="Altitude" value={product.altitude} />
              <SpecRow label="Varietal" value={product.varietal} />
              <SpecRow label="Process" value={product.process} />
              <SpecRow label="Harvest" value={product.harvest} />
              <SpecRow label="Roast" value={`${product.roast} — filter profile`} />
              <SpecRow label="Best for" value={product.bestFor.join(", ")} />
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ── Recommended brew methods ──────────────────────────────────── */}
      {recommendedGuides.length > 0 && (
        <Section tone="sunken" className="py-20 md:py-24">
          <div className="container-x">
            <Reveal>
              <h2 className="text-display-sm">How we brew it</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                Two recipes that suit this coffee, with the exact weights and times we use on the
                bar.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {recommendedGuides.map((guide, i) => (
                <Reveal key={guide.slug} delay={i * 90}>
                  <Link
                    href={`/brew/${guide.slug}`}
                    className="group flex h-full flex-col rounded-4xl border border-line bg-raised p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift"
                  >
                    <p className="eyebrow">{guide.method}</p>
                    <h3 className="mt-4 text-2xl transition-colors group-hover:text-accent">
                      {guide.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {guide.summary}
                    </p>
                    <p className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                      Read the recipe
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Related ───────────────────────────────────────────────────── */}
      <Section>
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-display-sm">Also on the shelf</h2>
            <ButtonLink href="/coffee" variant="outline" size="sm">
              See all six
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 90}>
                <ProductCard product={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
