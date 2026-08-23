import Link from "next/link";
import { ProductBag } from "@/components/bag";
import { Pill } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";
import type { Product } from "@/content/products";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-4xl border border-line bg-raised transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift",
        className,
      )}
    >
      <div
        className="relative overflow-hidden px-8 pt-10 pb-6"
        style={{ backgroundColor: `color-mix(in oklab, ${product.accent} 9%, transparent)` }}
      >
        {product.badge ? (
          <Pill tone="accent" className="absolute top-5 left-5 z-10">
            {product.badge}
          </Pill>
        ) : null}

        <div className="mx-auto w-[62%] max-w-[220px] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04]">
          <ProductBag product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl leading-tight">
              {/* Stretched link keeps the whole card clickable without nesting anchors */}
              <Link href={`/coffee/${product.slug}`} className="after:absolute after:inset-0">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1.5 text-sm text-ink-muted">
              {product.country} · {product.process}
            </p>
          </div>
          <span className="font-display shrink-0 text-xl text-ink">€{product.price}</span>
        </div>

        <p className="text-sm leading-relaxed text-ink-soft">{product.blurb}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {product.notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1 text-sm font-medium text-accent">
          <span>{product.roast} roast</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
