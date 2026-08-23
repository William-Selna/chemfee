import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/lead-forms";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, Pill, Section } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";
import { getPost, posts, sortedPosts, type Block } from "@/content/posts";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { formatDate, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) {
    return pageMetadata({
      title: "Post not found",
      description: "This journal entry no longer exists.",
      path: `/journal/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    authors: [post.author],
  });
}

export default async function PostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: post.title, path: `/journal/${post.slug}` },
  ];

  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={[articleSchema(post), breadcrumbSchema(trail)]} />

      <article>
        <header className="bg-sunken pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-x max-w-3xl">
            <Breadcrumbs trail={trail} />

            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="amber">{post.category}</Pill>
              <span className="text-sm text-ink-muted">{post.readingMinutes} min read</span>
            </div>

            <h1 className="text-display-sm mt-6">{post.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">{post.excerpt}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-line pt-7 text-sm text-ink-muted">
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-full text-white"
                style={{ backgroundColor: post.accent }}
              >
                {post.author.charAt(1)}
              </span>
              <span>
                <span className="block text-ink">{post.author}</span>
                <span className="block text-xs">{post.role}</span>
              </span>
              <span aria-hidden className="text-line-strong">
                |
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated ? (
                <span className="text-xs">Updated {formatDate(post.updated)}</span>
              ) : null}
            </div>
          </div>
        </header>

        <Section className="py-16 md:py-20">
          <div className="container-x max-w-3xl">
            {post.body.map((block, i) => (
              <Reveal key={i} delay={Math.min(i, 4) * 40}>
                <BlockRenderer block={block} accent={post.accent} />
              </Reveal>
            ))}

            <div className="mt-16 rounded-4xl border border-line bg-sunken p-8 sm:p-10">
              <h2 className="text-2xl">Get the next one</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                We publish roughly twice a month and send it out with the Thursday roast list.
              </p>
              <div className="mt-7">
                <NewsletterForm cta="Subscribe" />
              </div>
            </div>
          </div>
        </Section>
      </article>

      <Section tone="sunken" className="py-20 md:py-24">
        <div className="container-x">
          <h2 className="text-display-sm">Keep reading</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {more.map((other, i) => (
              <Reveal key={other.slug} delay={i * 90}>
                <Link
                  href={`/journal/${other.slug}`}
                  className="group flex h-full flex-col rounded-4xl border border-line bg-raised p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift"
                >
                  <Pill tone="amber" className="self-start">
                    {other.category}
                  </Pill>
                  <h3 className="mt-5 text-2xl leading-snug transition-colors group-hover:text-accent">
                    {other.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{other.excerpt}</p>
                  <p className="mt-7 flex items-center gap-2 text-sm font-medium text-accent">
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

function BlockRenderer({ block, accent }: { block: Block; accent: string }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-14 mb-5 text-2xl md:text-3xl">{block.text}</h2>;

    case "quote":
      return (
        <figure
          className="my-12 border-l-4 pl-7"
          style={{ borderColor: accent }}
        >
          <blockquote className="font-display text-xl leading-snug text-ink md:text-2xl">
            {block.text}
          </blockquote>
          {block.cite ? (
            <figcaption className="mt-4 text-sm text-ink-muted">— {block.cite}</figcaption>
          ) : null}
        </figure>
      );

    case "list":
      return (
        <ul className="my-7 flex flex-col gap-3.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 text-lg leading-relaxed text-ink-soft">
              <span
                aria-hidden
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return <p className="mb-6 text-lg leading-relaxed text-ink-soft">{block.text}</p>;
  }
}
