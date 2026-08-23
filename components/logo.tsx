import Link from "next/link";
import { brand } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The CHEMFEE mark: an Erlenmeyer flask with a coffee bean settled in the
 * liquid, redrawn from the packaging. The outline follows `currentColor`, so
 * set the text colour at the call site (the footer passes a light one).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Stopper */}
      <rect x="16.4" y="1.2" width="7.2" height="4.6" rx="1.3" className="fill-current" />

      {/* Liquid, sitting inside the flask body */}
      <path
        d="M11 26.4h18l2.9 4.8a3.6 3.6 0 0 1-3.1 5.6H11.2a3.6 3.6 0 0 1-3.1-5.6L11 26.4Z"
        className="fill-amber"
      />

      {/* Bean */}
      <g transform="rotate(-22 20 31.4)">
        <ellipse cx="20" cy="31.4" rx="5.1" ry="3.3" className="fill-espresso" />
        <path
          d="M15.6 32.6c2.6-1.8 5.9-2.6 8.8-2.2"
          className="stroke-amber"
          strokeWidth="0.9"
          opacity="0.75"
        />
      </g>

      {/* Flask outline, drawn last so it sits over the fills */}
      <path
        d="M17.7 5.6v9.8L8.1 31.2a3.6 3.6 0 0 0 3.1 5.6h17.6a3.6 3.6 0 0 0 3.1-5.6L22.3 15.4V5.6"
        className="stroke-current"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Logo({
  className,
  onDark = false,
  compact = false,
}: {
  className?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark
        className={cn(
          "transition-transform duration-500 group-hover:-rotate-6",
          onDark ? "text-espresso-ink" : "text-ink",
          compact ? "h-8 w-8" : "h-9 w-9",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] font-extrabold tracking-[0.06em] whitespace-nowrap",
            onDark ? "text-espresso-ink" : "text-ink",
          )}
        >
          {brand.name}
        </span>
        {!compact && (
          <span
            className={cn(
              // Dropped on the narrowest screens so the header stays on one line.
              "font-mono mt-1 hidden text-[0.5625rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase min-[400px]:block",
              onDark ? "text-espresso-muted" : "text-ink-muted",
            )}
          >
            {brand.descriptor}
          </span>
        )}
      </span>
    </Link>
  );
}
