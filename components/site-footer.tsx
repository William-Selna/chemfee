import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { NewsletterForm } from "@/components/lead-forms";
import { BeanScatter } from "@/components/bag";
import { ArrowUpRight } from "@/components/icons";
import { addressLines, brand, contact, footerNav, social } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain bg-espresso text-espresso-muted">
      {/* Newsletter — the site-wide email capture, anchored as #newsletter */}
      <section id="newsletter" className="relative overflow-hidden scroll-mt-24 border-b border-white/10">
        <BeanScatter className="absolute inset-0 h-full w-full text-espresso-ink opacity-40" />
        <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow text-espresso-muted">The Thursday Drop</p>
            <h2 className="text-display-sm mt-5 text-espresso-ink">
              One email a week. New lots, brew notes, nothing else.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed">
              We roast on Tuesdays and email on Thursdays — what came off the drum, what it tastes
              like, and what is nearly gone. Subscribers see limited lots twenty-four hours early.
            </p>
          </div>
          <NewsletterForm onDark cta="Subscribe" />
        </div>
      </section>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9 text-espresso-ink" />
            <span className="font-display text-lg font-extrabold tracking-[0.06em] text-espresso-ink">
              {brand.name}
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed">{brand.tagline}</p>
          <address className="mt-6 text-sm not-italic">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a href={`mailto:${contact.email}`} className="link-underline mt-3 inline-block text-espresso-ink">
              {contact.email}
            </a>
          </address>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-espresso-ink uppercase">
              {group.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline hover:text-espresso-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Social">
          <h2 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-espresso-ink uppercase">
            Elsewhere
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link-underline inline-flex items-center gap-1 hover:text-espresso-ink"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-white/10 py-8 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {brand.legalName}. All rights reserved.
        </p>
        <p className="text-espresso-muted/70">
          Product photography is illustrated; phone and email are placeholders.
        </p>
      </div>
    </footer>
  );
}
