import { Plus } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Built on <details>/<summary>, so it is keyboard-accessible, screen-reader
 * friendly, and works with JavaScript disabled — no state, no client bundle.
 */
export function Accordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg leading-snug transition-colors group-hover:text-accent">
              {item.q}
            </h3>
            <span
              aria-hidden
              className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white"
            >
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="animate-fade-in max-w-3xl pb-7 leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
