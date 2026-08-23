import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Pill, Section } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";
import { sortedPosts } from "@/content/posts";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { formatDate, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "Notes on sourcing, roasting, brewing, and running a café — including a full breakdown of what a bag of coffee costs us to put on the shelf.",
  path: "/journal",
});

const [lead, ...rest] = sortedPosts;

export default function JournalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />

      <PageHero
        eyebrow="Journal"
        title="Notes from the roastery"
        lead="Sourcing, roasting, brewing, and the occasional post arguing against something we sell. Published when there is something worth saying, not on a content calendar."
        trail={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ]}
      />

      {/* ── Lead article ──────────────────────────────────────────────── */}
      <Section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/journal/${lead.slug}`}
              className="group grid gap-10 overflow-hidden rounded-5xl border border-line bg-raised p-8 transition-all duration-500 hover:border-transparent hover:shadow-lift md:grid-cols-2 md:p-10 lg:gap-16 lg:p-12"
            >
              <div
                className="relative order-2 min-h-[16rem] overflow-hidden rounded-4xl md:order-1"
                style={{
                  background: `linear-gradient(155deg, color-mix(in oklab, ${lead.accent} 32%, transparent), color-mix(in oklab, ${lead.accent} 8%, transparent))`,
                }}
              >
                <span className="font-display absolute right-6 bottom-4 text-[7rem] leading-none text-ink/10">
                  {lead.category.charAt(0)}
                </span>
              </div>

              <div className="order-1 flex flex-col justify-center md:order-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill tone="accent">Latest</Pill>
                  <Pill tone="amber">{lead.category}</Pill>
                  <span className="text-xs text-ink-muted">{lead.readingMinutes} min read</span>
                </div>
                <h2 className="text-display-sm mt-6 transition-colors group-hover:text-accent">
                  {lead.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lead.excerpt}</p>
                <p className="mt-8 flex items-center gap-3 text-sm text-ink-muted">
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  <span aria-hidden>·</span>
                  {lead.author}
                  <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── Rest ──────────────────────────────────────────────────────── */}
      <Section className="pt-0 pb-24 md:pb-32">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col rounded-4xl border border-line p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:bg-raised hover:shadow-lift"
              >
                <div className="flex items-center gap-3">
                  <Pill tone="amber">{post.category}</Pill>
                  <span className="text-xs text-ink-muted">{post.readingMinutes} min</span>
                </div>
                <h2 className="mt-6 text-2xl leading-snug transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{post.excerpt}</p>
                <p className="mt-8 flex items-center gap-3 text-xs tracking-wide text-ink-muted uppercase">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
