import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Pill, Section, SectionHeading } from "@/components/ui";
import { BeanScatter } from "@/components/bag";
import { Bean, Cup, Flame, Leaf } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/content/site";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "How a small-batch roastery in Amsterdam Oost got started, what we believe about sourcing and roasting, and the people who show up at 5am to make it happen.",
  path: "/about",
});

const values = [
  {
    icon: Leaf,
    title: "Relationships over transactions",
    body: "We would rather buy the same farm's coffee for six years running and watch the quality climb than chase whatever scored highest at auction last month. Four of our producers have been with us since the first year.",
  },
  {
    icon: Flame,
    title: "Roast for the bean, not the brand",
    body: "Every lot gets its own profile, developed over three to six sample roasts before it ever goes on the shelf. Consistency is the goal; a house style that flattens everything into the same cup is not.",
  },
  {
    icon: Cup,
    title: "Hospitality is not a service tier",
    body: "The person ordering a small filter to take away gets the same attention as the one spending forty euros on beans. We have never understood why that is treated as a radical position.",
  },
  {
    icon: Bean,
    title: "Say the quiet part out loud",
    body: "We publish our green prices, our roast dates, and the occasional post explaining why something we sell is not worth what we charge for it. Trust is built in the unglamorous disclosures.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "A 1kg sample roaster in a garage",
    body: "Two people, a secondhand drum roaster, and a farmers-market stall that sold out by ten and made no money at all. The first bag we ever sold was a washed Ethiopian, which felt like an omen and probably was not.",
  },
  {
    year: "2021",
    title: "The first direct relationship",
    body: "A trip to Huila that was meant to last ten days and lasted three weeks. We came back with a contract, a much better understanding of what a wet mill actually costs to run, and a mild parasite.",
  },
  {
    year: "2023",
    title: "Wijttenbachstraat opens",
    body: "Twenty-eight seats, a 15kg roaster behind glass, and eight months of Amsterdam permitting that we do not like to talk about. The café broke even in month seven, which we are told is fast.",
  },
  {
    year: "2025",
    title: "Fourteen producer partners",
    body: "Still six coffees at a time. Still roasting on Tuesdays. Considerably better at forecasting green inventory than we were in year one, which sounds boring and is the single biggest reason we are still here.",
  },
];

const team = [
  { name: "[Founder Name]", role: "Founder & green buyer", note: "Spent nine years in logistics. Can still recite HS tariff codes from memory, unprompted." },
  { name: "[Roaster Name]", role: "Head roaster", note: "Starts at 5:10am. Believes the drum tells you more than the software does, and is usually right." },
  { name: "[Manager Name]", role: "Café manager", note: "Wrote the laptop policy. Has strong feelings about milk temperature and no patience for latte art discourse." },
  { name: "[Educator Name]", role: "Wholesale & training", note: "Trains every new account in person. Has dialled in more grinders than anyone should have to." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="Our story"
        title={
          <>
            We started with one roaster,
            <br />
            <span className="text-accent italic">two opinions</span>, and no plan
          </>
        }
        lead="Six years later we have a café, fourteen producer partners, and roughly the same two opinions. This is the long version, including the parts that did not work."
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* ── Origin story ──────────────────────────────────────────────── */}
      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink-soft">
              <p className="text-2xl leading-snug text-ink md:text-[1.75rem]">
                In 2019, our founder was three years into a career they had stopped believing in
                and one week into owning a secondhand 1kg drum roaster that did not have a working
                thermocouple.
              </p>
              <p>
                The story we could tell here is the tidy one: a life-changing cup in a small café
                abroad, a moment of clarity, a leap of faith. Some of that is even true. But the
                honest version is that the first eighteen months were mostly failure — scorched
                batches, a market stall in the rain, and a spreadsheet that told us, every single
                Sunday, that this was not going to work.
              </p>
              <p>
                What changed was not passion. It was arithmetic. We stopped trying to be cheap,
                started paying properly for green coffee, and discovered that people will happily
                pay for something that is obviously better if you can explain to them why it costs
                what it costs.
              </p>
              <p>
                That is the whole business model. There is no secret. We buy well, roast carefully,
                keep the range small enough to actually manage, and answer questions honestly even
                when the honest answer is unflattering.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <figure className="grain relative overflow-hidden rounded-5xl bg-espresso p-10 md:p-12">
              <BeanScatter className="absolute inset-0 h-full w-full text-espresso-ink opacity-50" />
              <blockquote className="relative">
                <p className="font-display text-2xl leading-snug text-espresso-ink md:text-3xl">
                  “We are not trying to change your life with a cup of coffee. We are trying to
                  make one good enough that you notice, and consistent enough that you stop having
                  to think about it.”
                </p>
              </blockquote>
              <figcaption className="relative mt-8 text-sm text-espresso-muted">
                [Founder Name] — Founder, {brand.name}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What we believe"
              title="Four things, stated plainly"
              lead="Not a manifesto. Just the criteria we use when a decision is genuinely difficult."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-4xl border border-line bg-raised p-8 transition-shadow duration-500 hover:shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-wash text-accent">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-2xl leading-snug">{value.title}</h3>
                  <p className="mt-3.5 leading-relaxed text-ink-soft">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="How it went" title="Six years, abbreviated" />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((entry, i) => (
              <Reveal key={entry.year} delay={i * 80} as="li" className="bg-paper">
                <div className="flex h-full flex-col p-8">
                  <span className="font-display text-4xl text-accent">{entry.year}</span>
                  <h3 className="mt-5 text-xl leading-snug">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{entry.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── Team ──────────────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="The people"
              title="Nine of us, four you'll meet most often"
              lead="Names and portraits are placeholders — swap them for the real team before launch."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person, i) => (
              <Reveal key={person.role} delay={i * 80}>
                <article className="flex h-full flex-col rounded-4xl border border-line bg-raised p-7">
                  {/* Placeholder portrait — initials on a tinted plate */}
                  <div
                    className="grid aspect-4/5 w-full place-items-center rounded-3xl"
                    style={{
                      background:
                        "linear-gradient(160deg, color-mix(in oklab, var(--accent) 24%, transparent), color-mix(in oklab, var(--amber) 22%, transparent))",
                    }}
                  >
                    <span className="font-display text-5xl text-ink/35">
                      {person.role.charAt(0)}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg">{person.name}</h3>
                  <Pill tone="amber" className="mt-2.5 self-start">
                    {person.role}
                  </Pill>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{person.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Section tone="espresso" className="grain">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-display-sm mx-auto max-w-3xl text-espresso-ink">
              Come and decide for yourself whether any of that is true
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed">
              The bar is open seven days. Ask for whatever is freshest and tell us if we are wrong
              about it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/visit" variant="onDark" size="lg">
                Plan a visit
              </ButtonLink>
              <ButtonLink
                href="/coffee"
                variant="outline"
                size="lg"
                className="border-white/25 text-espresso-ink hover:border-white hover:text-white"
              >
                See the coffee
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
