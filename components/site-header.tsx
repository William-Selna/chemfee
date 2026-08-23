"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme";
import { Close, Menu } from "@/components/icons";
import { nav } from "@/content/site";
import { buttonClass } from "@/components/ui";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes. Adjusting during render rather
  // than in an effect avoids a frame where the menu covers the new page.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll and wire up Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "link-underline text-sm transition-colors",
                  isActive(item.href) ? "text-accent" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {/* max-sm:hidden rather than `hidden sm:inline-flex` — the latter
                collides with the button's own `inline-flex` display utility. */}
            <Link href="#newsletter" className={cn(buttonClass({ size: "sm" }), "max-sm:hidden")}>
              Join the list
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-60 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 rounded-b-4xl bg-paper px-6 pt-6 pb-10 shadow-lift transition-transform duration-400 ease-out",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink"
            >
              <Close className="h-[18px] w-[18px]" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={cn(
                  "font-display border-b border-line py-4 text-2xl transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActive(item.href) ? "text-accent" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#newsletter"
            onClick={() => setOpen(false)}
            className={cn(buttonClass({ size: "lg" }), "mt-8 w-full")}
          >
            Join the list
          </Link>
        </div>
      </div>
    </>
  );
}
