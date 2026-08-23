"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui";
import type { Product, RoastLevel } from "@/content/products";
import { cn } from "@/lib/cn";

type Sort = "featured" | "price-asc" | "price-desc" | "roast-light";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "roast-light", label: "Lightest roast first" },
];

export function CoffeeBrowser({
  products,
  roastLevels,
  origins,
}: {
  products: Product[];
  roastLevels: RoastLevel[];
  origins: string[];
}) {
  const [roast, setRoast] = useState<RoastLevel | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const filtered = products.filter(
      (p) => (!roast || p.roast === roast) && (!origin || p.country === origin),
    );

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "roast-light":
        return [...filtered].sort((a, b) => a.roastIndex - b.roastIndex);
      default:
        return filtered;
    }
  }, [products, roast, origin, sort]);

  const hasFilters = roast !== null || origin !== null;

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-5">
          <FilterRow label="Roast">
            <Chip active={roast === null} onClick={() => setRoast(null)}>
              All
            </Chip>
            {roastLevels.map((level) => (
              <Chip key={level} active={roast === level} onClick={() => setRoast(level)}>
                {level}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Origin">
            <Chip active={origin === null} onClick={() => setOrigin(null)}>
              All
            </Chip>
            {origins.map((country) => (
              <Chip key={country} active={origin === country} onClick={() => setOrigin(country)}>
                {country}
              </Chip>
            ))}
          </FilterRow>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase"
          >
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-line-strong bg-raised px-4 py-2.5 text-sm text-ink transition-colors focus:border-accent focus:outline-none"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-ink-muted">
        Showing {visible.length} of {products.length} coffees
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setRoast(null);
              setOrigin(null);
            }}
            className="link-underline ml-3 text-accent"
          >
            Clear filters
          </button>
        )}
      </p>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} className="h-full" />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-4xl border border-dashed border-line-strong px-8 py-16 text-center">
          <h2 className="text-2xl">Nothing matches that combination</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            We only keep six lots on the shelf at a time, so some combinations come up empty.
            Try widening the filter.
          </p>
          <Button
            variant="outline"
            className="mt-7"
            onClick={() => {
              setRoast(null);
              setOrigin(null);
            }}
          >
            Show everything
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="w-14 shrink-0 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all duration-300",
        active
          ? "border-accent bg-accent text-white"
          : "border-line-strong text-ink-soft hover:border-accent hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}
