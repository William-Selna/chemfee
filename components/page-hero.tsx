import type { ReactNode } from "react";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { BeanScatter } from "@/components/bag";
import { cn } from "@/lib/cn";

/**
 * Standard top-of-page block for interior pages. Carries the padding that
 * clears the fixed header so individual pages don't have to remember it.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  trail?: { name: string; path: string }[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-sunken pt-32 pb-16 md:pt-40 md:pb-24", className)}>
      <BeanScatter className="absolute inset-y-0 right-0 h-full w-1/2 text-ink opacity-45" />
      <div className="container-x relative">
        {trail ? <Breadcrumbs trail={trail} /> : null}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-display mt-6 max-w-4xl">{title}</h1>
        {lead ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{lead}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
