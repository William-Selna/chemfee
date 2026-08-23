import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/lead-forms";
import { Accordion } from "@/components/accordion";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Section } from "@/components/ui";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { addressLines, contact, hours } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with the roastery — orders, wholesale, press, and café enquiries. Email, phone, and our Amsterdam address.",
  path: "/contact",
});

const channels = [
  {
    icon: Mail,
    label: "General enquiries",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Answered within two business days.",
  },
  {
    icon: Mail,
    label: "Wholesale",
    value: contact.wholesaleEmail,
    href: `mailto:${contact.wholesaleEmail}`,
    note: "Or use the enquiry form on the wholesale page.",
  },
  {
    icon: Phone,
    label: "Roastery",
    value: contact.phone,
    href: contact.phoneHref,
    note: "Weekdays 8am – 4pm.",
  },
];

const faqs = [
  {
    q: "How quickly do you reply?",
    a: "Within two business days for everything, usually the same day for wholesale. If you have not heard back after three days, something went wrong — call the roastery.",
  },
  {
    q: "I have a problem with an order.",
    a: "Email us with your order number and what happened. If the coffee arrived damaged, stale, or simply not as described, we replace it. We do not ask for the bag back.",
  },
  {
    q: "Do you host tastings or events?",
    a: "We run a public cupping on the first Saturday of each month, free, twelve places, announced to the newsletter first. Private events for six or more can be booked by email.",
  },
  {
    q: "Are you hiring?",
    a: "We post openings to the newsletter and nowhere else. Speculative applications are genuinely welcome — tell us what you want to be doing in two years and we will keep it on file.",
  },
  {
    q: "Press and collaborations?",
    a: "Same address, with 'Press' in the subject line. We are slow with product collaborations and quick with anything involving producers.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Ask us anything about coffee"
        lead="Including the questions we would rather you did not ask. A person reads every message — there is no ticketing system behind this form."
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section className="pt-16 md:pt-20">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div className="rounded-4xl border border-line bg-raised p-8 sm:p-10">
              <h2 className="text-2xl">Send a message</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Pick a subject so it reaches the right person first time.
              </p>
              <div className="mt-8">
                <EnquiryForm
                  source="contact"
                  cta="Send message"
                  topics={["An order", "Wholesale", "The café", "Press", "Something else"]}
                  fields={[
                    { name: "name", label: "Your name", placeholder: "Alex Rivera" },
                    {
                      name: "message",
                      label: "Message",
                      type: "textarea",
                      placeholder: "What can we help with?",
                    },
                  ]}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded-4xl bg-sunken p-8 sm:p-10">
                {channels.map((channel) => (
                  <div key={channel.label} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-wash text-accent">
                      <channel.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                        {channel.label}
                      </p>
                      <a
                        href={channel.href}
                        className="link-underline mt-1.5 inline-block text-ink transition-colors hover:text-accent"
                      >
                        {channel.value}
                      </a>
                      <p className="mt-1 text-sm text-ink-muted">{channel.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-4xl border border-line p-8 sm:p-10">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-accent" />
                  <address className="not-italic">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                      Roastery &amp; café
                    </p>
                    <p className="mt-2 text-ink-soft">
                      {addressLines.map((line) => (
  <span key={line} className="block">
    {line}
  </span>
))}
</p>
                  </address>
                </div>

                <div className="mt-7 flex gap-4 border-t border-line pt-7">
                  <Clock className="h-5 w-5 shrink-0 text-accent" />
                  <div className="flex-1">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                      Café hours
                    </p>
                    <dl className="mt-3 flex flex-col gap-2 text-sm">
                      {hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-6">
                          <dt className="text-ink-soft">{h.days}</dt>
                          <dd className="text-ink tabular-nums">
                            {h.open} – {h.close}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <ButtonLink href="/visit" variant="outline" className="mt-8 w-full">
                  Directions &amp; parking
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sunken" className="py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-display-sm">Common questions</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Worth a look before you write — it might save you a wait.
            </p>
          </div>
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
