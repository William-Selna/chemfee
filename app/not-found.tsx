import { ButtonLink } from "@/components/ui";
import { BeanScatter } from "@/components/bag";
import { nav } from "@/content/site";
import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center overflow-hidden bg-sunken pt-40 pb-32">
      <BeanScatter className="absolute inset-0 h-full w-full text-ink opacity-50" />
      <div className="container-x relative max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="text-display mt-6">This one&apos;s gone cold</h1>
        <p className="mt-7 text-lg leading-relaxed text-ink-soft">
          The page you were after does not exist — it may have been a coffee we sold out of, or a
          link that was never quite right in the first place.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to the front
          </ButtonLink>
          <ButtonLink href="/coffee" size="lg" variant="outline">
            See what&apos;s on the shelf
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-14 border-t border-line pt-10">
          <p className="text-sm text-ink-muted">Or try one of these:</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-ink transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
