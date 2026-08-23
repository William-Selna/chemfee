"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades content up as it scrolls into view. Uses a single IntersectionObserver
 * per instance and disconnects after firing, so long pages stay cheap.
 * Falls back to fully visible content when JS is unavailable (see globals.css).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount should not animate in late.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
