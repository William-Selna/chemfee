import { PageHero } from "@/components/page-hero";
import { MapPlaceholder } from "@/components/map-placeholder";
import { Accordion } from "@/components/accordion";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";
import { JsonLd, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/jsonld";
import { addressLines, contact, hours } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Visit the café",
  description:
    "Opening hours, address, transport, and what's on the bar at our Amsterdam Oost roastery café on Wijttenbachstraat. Open seven days a week.",
  path: "/visit",
});

const menu = [
  {
    section: "Espresso bar",
    items: [
      { name: "Espresso", detail: "18g in, 36g out", price: "3.00" },
      { name: "Macchiato", detail: "Double, whole or oat", price: "3.75" },
      { name: "Cortado", detail: "120 ml, no latte art discourse", price: "4.25" },
      { name: "Flat white", detail: "175 ml", price: "4.75" },
      { name: "Latte", detail: "240 ml or 350 ml", price: "5.00" },
    ],
  },
  {
    section: "Filter & cold",
    items: [
      { name: "Batch brew", detail: "Rotating single origin", price: "3.50" },
      { name: "Pour-over", detail: "V60, brewed to order — ask what's open", price: "6.00" },
      { name: "Cold brew", detail: "18-hour steep, on tap", price: "4.50" },
      { name: "Iced filter", detail: "Flash-chilled over ice", price: "4.75" },
    ],
  },
  {
    section: "Kitchen",
    items: [
      { name: "Sourdough toast", detail: "Cultured butter, sea salt", price: "5.00" },
      { name: "Seasonal galette", detail: "Ask — it changes weekly", price: "6.50" },
      { name: "Cardamom bun", detail: "Baked on the Dapperstraat", price: "5.25" },
    ],
  },
];

const details = [
  {
    icon: MapPin,
    title: "Getting here",
    lines: [
      "Five minutes' walk from Amsterdam Muiderpoort station; trams stop a block away.",
      "Street parking is paid and scarce — most people arrive by bike or tram.",
      "Bike racks directly outside; a covered rack in the courtyard behind.",
    ],
  },
  {
    icon: Clock,
    title: "Best times to come",
    lines: [
      "Quietest between 9:30 and 11:00, and after 3pm on weekdays.",
      "Weekend mornings run a wait of ten to twenty minutes between 9 and 11.",
      "The roaster runs Tuesday mornings — loud, warm, and worth watching.",
    ],
  },
];

const faqs = [
  {
    q: "Do you take reservations?",
    a: "No. Twenty-eight seats and a walk-in-only policy is the only way we have found to keep the room from becoming a booking system. If it is full, the wait is usually under fifteen minutes.",
  },
  {
    q: "Is there a laptop policy?",
    a: "Laptops are welcome at the long table and the window bar at any time. The six small tables are laptop-free between 11am and 2pm so people can eat. There are no time limits and we are not going to tape over the power outlets.",
  },
  {
    q: "Do you have non-dairy milk?",
    a: "Oat as standard, at no extra charge, plus soy and almond. Our espresso blend is built to hold up in oat specifically, because that is what most people order.",
  },
  {
    q: "Is the café accessible?",
    a: "Step-free entry from the street, an accessible toilet, and 90 cm of clearance between tables. The courtyard has one shallow step — tell us and we will bring your order out.",
  },
  {
    q: "Can I bring my dog?",
    a: "In the courtyard, yes, always. Inside, service animals only — a health code thing rather than a preference.",
  },
];

export default function VisitPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Visit", path: "/visit" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="The café"
        title="Wijttenbachstraat, open seven days"
        lead="A roastery with a room attached, on the quiet end of Wijttenbachstraat. Everything we sell in bags is on the bar, brewed by people who taste it every morning before service."
        trail={[
          { name: "Home", path: "/" },
          { name: "Visit", path: "/visit" },
        ]}
      />

      {/* ── Hours, address, map ───────────────────────────────────────── */}
      <Section className="pt-16 md:pt-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="flex h-full flex-col rounded-4xl border border-line bg-raised p-8 sm:p-10">
              <h2 className="text-2xl">Opening hours</h2>
              <dl className="mt-6 flex flex-col">
                {hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 last:border-0"
                  >
                    <dt className="text-ink-soft">{h.days}</dt>
                    <dd className="text-ink tabular-nums">
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8">
                <address className="flex items-start gap-3 not-italic">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-ink-soft">
                    {addressLines.map((line) => (
  <span key={line} className="block">
    {line}
  </span>
))}
</span>
                </address>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 text-ink-soft transition-colors hover:text-accent"
                >
                  <Phone className="h-5 w-5 shrink-0 text-accent" />
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-ink-soft transition-colors hover:text-accent"
                >
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  {contact.email}
                </a>
              </div>

              <ButtonLink href="/contact" variant="outline" className="mt-8">
                Ask us something
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <MapPlaceholder label={`${contact.address.street}, ${contact.address.locality}`} className="h-full min-h-[22rem]" />
          </Reveal>
        </div>
      </Section>

      {/* ── Menu ──────────────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="On the bar"
              title="The menu, roughly"
              lead="Prices are placeholders and the food changes constantly. Coffee prices include the milk — we have never understood charging extra for oat."
            />
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {menu.map((group, i) => (
              <Reveal key={group.section} delay={i * 90}>
                <h3 className="border-b border-line-strong pb-4 text-xl">{group.section}</h3>
                <ul className="mt-2 flex flex-col">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-4 last:border-0"
                    >
                      <div>
                        <p className="text-ink">{item.name}</p>
                        <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
                      </div>
                      <span className="font-display shrink-0 text-ink tabular-nums">
                        €{item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Practical details ─────────────────────────────────────────── */}
      <Section>
        <div className="container-x grid gap-8 md:grid-cols-2">
          {details.map((block, i) => (
            <Reveal key={block.title} delay={i * 100}>
              <div className="h-full rounded-4xl border border-line p-8 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-wash text-accent">
                  <block.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-6 text-2xl">{block.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {block.lines.map((line) => (
                    <li key={line} className="flex gap-3 leading-relaxed text-ink-soft">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <Section tone="sunken" className="py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-display-sm">Before you come</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              The five things people email us about most.
            </p>
          </div>
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
