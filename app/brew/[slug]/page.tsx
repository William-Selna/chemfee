import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, ButtonLink, Pill, Section, SpecRow } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";
import { getGuide, guides } from "@/content/guides";
import { getProduct } from "@/content/products";
import { JsonLd, breadcrumbSchema, howToSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: PageProps<"/brew/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuide(slug);

  if (!guide) {
    return pageMetadata({
      title: "Guide not found",
      description: "This brew guide no longer exists.",
      path: `/brew/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: guide.title,
    description: `${guide.summary} ${guide.dose}, ${guide.water}, ${guide.ratio} ratio at ${guide.temperature}.`,
    path: `/brew/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage(props: PageProps<"/brew/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Brew guides", path: "/brew" },
    { name: guide.method, path: `/brew/${guide.slug}` },
  ];

  const pairings = guide.pairsWith.map(getProduct).filter((p) => p !== undefined);
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <JsonLd data={[howToSchema(guide), breadcrumbSchema(trail)]} />

      <section className="bg-sunken pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-x">
          <Breadcrumbs trail={trail} />

          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="accent">{guide.method}</Pill>
            <Pill tone="outline">{guide.difficulty}</Pill>
          </div>

          <h1 className="text-display mt-7 max-w-4xl">{guide.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {guide.summary}
          </p>

          {/* Recipe card */}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Coffee", value: guide.dose },
              { label: "Water", value: guide.water },
              { label: "Ratio", value: guide.ratio },
              { label: "Temperature", value: guide.temperature },
              { label: "Grind", value: guide.grind },
              { label: "Total time", value: guide.totalTime },
              { label: "Yield", value: guide.yield },
              { label: "Difficulty", value: guide.difficulty },
            ].map((spec) => (
              <div key={spec.label} className="bg-paper p-6">
                <dt className="text-[0.625rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                  {spec.label}
                </dt>
                <dd className="mt-2 text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Method ────────────────────────────────────────────────────── */}
      <Section className="py-20 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-display-sm">The method</h2>
            </Reveal>

            <ol className="mt-10 flex flex-col">
              {guide.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 70} as="li">
                  <div className="flex gap-6 border-b border-line py-8 first:pt-0 last:border-0">
                    <div className="flex w-20 shrink-0 flex-col gap-2">
                      <span
                        className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: guide.accent }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-ink-muted tabular-nums">
                        {step.at}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl leading-snug">{step.title}</h3>
                      <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <aside className="flex flex-col gap-8">
            <Reveal delay={120}>
              <div className="rounded-4xl border border-line bg-raised p-8">
                <h2 className="text-xl">What you need</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {guide.gear.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink-soft">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: guide.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-4xl bg-sunken p-8">
                <h2 className="text-xl">If it tastes wrong</h2>
                <dl className="mt-4">
                  {guide.troubleshooting.map((row) => (
                    <SpecRow key={row.problem} label={row.problem} value={row.fix} />
                  ))}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* ── Pairings ──────────────────────────────────────────────────── */}
      {pairings.length > 0 && (
        <Section tone="sunken" className="py-20 md:py-24">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="text-display-sm">Coffee that suits this method</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                    Any coffee will work. These two are what we reach for.
                  </p>
                </div>
                <ButtonLink href="/coffee" variant="outline" size="sm">
                  All coffee
                </ButtonLink>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {pairings.map((product, i) => (
                <Reveal key={product.slug} delay={i * 90}>
                  <ProductCard product={product} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Other guides ──────────────────────────────────────────────── */}
      <Section className="py-20 md:py-24">
        <div className="container-x">
          <h2 className="text-display-sm">Other guides</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 80}>
                <Link
                  href={`/brew/${other.slug}`}
                  className="group flex h-full flex-col rounded-4xl border border-line p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:bg-raised hover:shadow-lift"
                >
                  <p className="eyebrow">{other.method}</p>
                  <h3 className="mt-4 flex-1 text-xl leading-snug transition-colors group-hover:text-accent">
                    {other.title}
                  </h3>
                  <p className="mt-5 flex items-center gap-2 text-sm font-medium text-accent">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
