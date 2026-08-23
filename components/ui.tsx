import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ── Buttons ─────────────────────────────────────────────────────────────── */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none " +
  "active:scale-[0.98] whitespace-nowrap";

export const buttonVariants = {
  primary:
    // Dark theme lightens the teal, so the label flips to the dark ink for contrast.
    "bg-accent text-white dark:text-espresso hover:bg-accent-strong shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  secondary:
    "bg-ink text-paper hover:opacity-90 shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-line-strong text-ink hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-ink hover:bg-sunken",
  onDark:
    "bg-espresso-ink text-espresso hover:bg-accent hover:text-espresso shadow-lift hover:-translate-y-0.5",
} as const;

export const buttonSizes = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[0.9375rem]",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function buttonClass({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size]);
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyleProps) {
  return <Link className={cn(buttonClass({ variant, size }), className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & ButtonStyleProps) {
  return <button className={cn(buttonClass({ variant, size }), className)} {...props} />;
}

/* ── Layout ──────────────────────────────────────────────────────────────── */

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "sunken" | "espresso";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper",
    sunken: "bg-sunken",
    espresso: "bg-espresso text-espresso-muted",
  } as const;

  return (
    <section id={id} className={cn("py-20 md:py-28 lg:py-36", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2.5", className)}>
      <span aria-hidden className="h-px w-6 bg-current opacity-50" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={onDark ? "text-espresso-muted" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className={cn("text-display-sm max-w-3xl", onDark && "text-espresso-ink")}>{title}</h2>
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            onDark ? "text-espresso-muted" : "text-ink-soft",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ── Small pieces ────────────────────────────────────────────────────────── */

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "amber" | "outline";
  className?: string;
}) {
  const tones = {
    neutral: "bg-sunken text-ink-soft",
    accent: "bg-accent-wash text-accent-strong dark:text-accent",
    amber: "bg-amber-wash text-amber",
    outline: "border border-line-strong text-ink-muted",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.09em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Meter({
  label,
  value,
  max = 5,
  onDark = false,
}: {
  label: string;
  value: number;
  max?: number;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn("text-sm", onDark ? "text-espresso-muted" : "text-ink-soft")}>
        {label}
      </span>
      <span className="flex gap-1" role="img" aria-label={`${label}: ${value} out of ${max}`}>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "h-1.5 w-5 rounded-full transition-colors",
              i < value ? "bg-accent" : onDark ? "bg-white/15" : "bg-line-strong",
            )}
          />
        ))}
      </span>
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink-soft">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="link-underline hover:text-accent">
                  {item.name}
                </Link>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Definition-list row used across product specs and café details. */
export function SpecRow({
  label,
  value,
  onDark = false,
}: {
  label: string;
  value: ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8",
        onDark ? "border-white/10" : "border-line",
      )}
    >
      <dt
        className={cn(
          "text-[0.6875rem] font-semibold tracking-[0.14em] uppercase",
          onDark ? "text-espresso-muted" : "text-ink-muted",
        )}
      >
        {label}
      </dt>
      <dd className={cn("text-sm sm:text-right", onDark ? "text-espresso-ink" : "text-ink")}>
        {value}
      </dd>
    </div>
  );
}
