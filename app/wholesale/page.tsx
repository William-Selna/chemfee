import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/lead-forms";
import { Accordion } from "@/components/accordion";
import { Reveal } from "@/components/reveal";
import { Pill, Section, SectionHeading } from "@/components/ui";
import { Check, Clock, Cup, Scale, Truck } from "@/components/icons";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { contact } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wholesale coffee",
  description:
    "Wholesale specialty coffee for cafés, restaurants, and offices in Amsterdam and across the Netherlands. Volume pricing, on-site barista training, equipment support, and weekly roast-to-order delivery.",
  path: "/wholesale",
});

const tiers = [
  {
    name: "Café",
    volume: "5 – 20 kg / week",
    price: "18.50",
    unit: "per kg",
    highlight: false,
    features: [
      "Weekly roast-to-order delivery",
      "Two on-site dial-in visits per year",
      "Menu and origin cards for your bar",
      "Net 14 terms after three months",
    ],
  },
  {
    name: "Multi-site",
    volume: "20 – 80 kg / week",
    price: "16.75",
    unit: "per kg",
    highlight: true,
    features: [
      "Everything in Café, plus:",
      "Quarterly staff training at the roastery",
      "Grinder servicing and loan units",
      "Named account contact, not a shared inbox",
      "Net 30 terms",
    ],
  },
  {
    name: "Office & retail",
    volume: "Any volume",
    price: "Custom",
    unit: "",
    highlight: false,
    features: [
      "Retail bags at trade pricing",
      "Brew equipment recommendations",
      "Flexible delivery cadence",
      "White-label options on request",
    ],
  },
];

const support = [
  {
    icon: Cup,
    title: "Training that isn't a sales visit",
    body: "Every new account gets a half-day on site before launch — extraction, milk, workflow, and machine maintenance. We come back whenever your staff turns over, at no charge.",
  },
  {
    icon: Scale,
    title: "Dialled in, properly",
    body: "We set your grinders to your water and your machine, then leave you a written recipe card with target weights and times. When the coffee changes seasonally, we come back.",
  },
  {
    icon: Truck,
    title: "Roasted Tuesday, delivered Wednesday",
    body: "Amsterdam is delivered by our own cargo bike and van. The rest of the Benelux ships next-day courier the morning after roasting, with tracking sent to whoever actually receives it.",
  },
  {
    icon: Clock,
    title: "A real person, quickly",
    body: "Named contact, direct number, answered within business hours. If your grinder dies on a Saturday you will not be filing a ticket.",
  },
];

const process = [
  { step: "01", title: "Tell us what you need", body: "Volume, equipment, what you are serving now, and what is not working about it." },
  { step: "02", title: "Samples and a cupping", body: "We send three coffees matched to your setup, then talk through them — at the roastery or over a call." },
  { step: "03", title: "Dial-in and launch", body: "Half a day on site setting recipes and training staff, timed to your opening or menu change." },
  { step: "04", title: "Weekly rhythm", body: "Standing order with a two-day change window, adjusted seasonally as lots rotate." },
];

const faqs = [
  {
    q: "What's the minimum order?",
    a: "5 kg per week for a standing wholesale account. Below that, trade pricing on retail bags usually works out better and we are happy to set that up instead.",
  },
  {
    q: "Do you supply equipment?",
    a: "We do not sell machines, but we will spec your setup honestly, put you in touch with two or three suppliers we trust, and lend a grinder if yours goes down mid-week.",
  },
  {
    q: "Can we get an exclusive blend?",
    a: "Above roughly 40 kg per week, yes. We will build a profile with you across three or four cuppings. Below that volume it is genuinely not worth what it would cost you.",
  },
  {
    q: "How do seasonal changes work?",
    a: "Single origins rotate two to four times a year. We give six weeks' notice, send samples of the replacement before the switch, and re-dial your grinders when it lands.",
  },
  {
    q: "Do you work outside Amsterdam?",
    a: "Yes — roughly a third of our accounts are outside the city, across the Netherlands and into Belgium. Training happens on a launch visit and by video after that, which works better than it sounds.",
  },
];

export default function WholesalePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Wholesale", path: "/wholesale" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Wholesale & B2B"
        title="Coffee your staff can actually make well"
        lead="We supply cafés, restaurants, and offices with roast-to-order coffee, real training, and someone who answers the phone. Thirty-one accounts, and we would rather grow slowly than badly."
        trail={[
          { name: "Home", path: "/" },
          { name: "Wholesale", path: "/wholesale" },
        ]}
      />

      {/* ── Pricing tiers ─────────────────────────────────────────────── */}
      <Section className="pt-16 md:pt-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="Volume pricing, published"
              lead="Indicative rates for our house range. Single-origin and micro-lot pricing varies by contract — we will always show you the green cost."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90}>
                <div
                  className={
                    tier.highlight
                      ? "flex h-full flex-col rounded-4xl border-2 border-accent bg-raised p-8 shadow-lift sm:p-10"
                      : "flex h-full flex-col rounded-4xl border border-line bg-raised p-8 sm:p-10"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl">{tier.name}</h3>
                      <p className="mt-1.5 text-sm text-ink-muted">{tier.volume}</p>
                    </div>
                    {tier.highlight ? <Pill tone="accent">Most accounts</Pill> : null}
                  </div>

                  <p className="mt-8 flex items-baseline gap-2">
                    <span className="font-display text-4xl text-ink">
                      {tier.price === "Custom" ? tier.price : `€${tier.price}`}
                    </span>
                    {tier.unit ? <span className="text-sm text-ink-muted">{tier.unit}</span> : null}
                  </p>

                  <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-line pt-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink-muted">
            All prices exclude delivery and tax. Rates shown are placeholders — confirm your real
            pricing before publishing this page.
          </p>
        </div>
      </Section>

      {/* ── Support ───────────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What's included"
              title="The parts that aren't the coffee"
              lead="Green quality gets you to the door. Everything below is what keeps the cup consistent once we've left the building."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {support.map((item, i) => (
              <Reveal key={item.title} delay={i * 85}>
                <div className="flex h-full gap-5 rounded-4xl border border-line bg-raised p-8">
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

      {/* ── Process ───────────────────────────────────────────────────── */}
      <Section tone="espresso" className="grain">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              onDark
              eyebrow="How it starts"
              title="Four steps, about three weeks"
            />
          </Reveal>

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 85} as="li">
                <div className="border-t border-white/15 pt-6">
                  <span className="font-display text-sm text-accent">{item.step}</span>
                  <h3 className="mt-3 text-xl text-espresso-ink">{item.title}</h3>
                  <p className="mt-3 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── Enquiry ───────────────────────────────────────────────────── */}
      <Section id="enquiry" className="scroll-mt-24">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Get in touch"
              title="Tell us about your bar"
              lead="We reply within two business days with sample options and indicative pricing. No automated sequences, no sales calls you did not ask for."
            />
            <div className="mt-9 flex flex-col gap-3 text-sm text-ink-soft">
              <p>
                Prefer email?{" "}
                <a
                  href={`mailto:${contact.wholesaleEmail}`}
                  className="link-underline text-accent"
                >
                  {contact.wholesaleEmail}
                </a>
              </p>
              <p>
                Or call the roastery on{" "}
                <a href={contact.phoneHref} className="link-underline text-accent">
                  {contact.phone}
                </a>
                , weekdays 8am – 4pm.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-4xl border border-line bg-raised p-8 sm:p-10">
              <EnquiryForm
                source="wholesale"
                cta="Request samples"
                successTitle="Got it — samples are on the way."
                successBody="We'll be in touch within two business days with three coffees matched to your setup and indicative pricing."
                topics={["Café", "Restaurant", "Office", "Retail", "Something else"]}
                fields={[
                  { name: "name", label: "Your name", placeholder: "Alex Rivera" },
                  { name: "company", label: "Business name", placeholder: "The Corner Room" },
                  {
                    name: "message",
                    label: "What are you working with?",
                    type: "textarea",
                    placeholder:
                      "Volume per week, your espresso machine and grinder, what you're serving now, and when you'd want to start.",
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <Section tone="sunken" className="py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-display-sm">Wholesale questions</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              If yours is not here, ask — we will add it.
            </p>
          </div>
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
