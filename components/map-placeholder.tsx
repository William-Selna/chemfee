import { cn } from "@/lib/cn";

/**
 * PLACEHOLDER MAP — a stylised street grid, not a real map.
 * Swap for an embedded map (or a static tile image) once the address is real.
 * Kept as inline SVG so there are no third-party requests or cookie banners.
 */
export function MapPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const horizontals = [70, 150, 232, 318];
  const verticals = [90, 210, 330, 450, 560];

  return (
    <div className={cn("relative overflow-hidden rounded-4xl border border-line bg-sunken", className)}>
      <svg viewBox="0 0 640 400" role="img" aria-label={`Stylised map showing ${label}`} className="h-full w-full">
        <rect width="640" height="400" className="fill-sunken" />

        {/* Blocks */}
        <g className="fill-line" opacity="0.5">
          {horizontals.slice(0, -1).map((y, yi) =>
            verticals.slice(0, -1).map((x, xi) => (
              <rect
                key={`${x}-${y}`}
                x={x + 8}
                y={y + 8}
                width={verticals[xi + 1] - x - 16}
                height={horizontals[yi + 1] - y - 16}
                rx="6"
              />
            )),
          )}
        </g>

        {/* Streets */}
        <g className="stroke-line-strong" strokeWidth="3" strokeLinecap="round">
          {horizontals.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="640" y2={y} />
          ))}
          {verticals.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
          ))}
        </g>

        {/* A river, because every city has one */}
        <path
          d="M-20 340C120 300 180 250 300 262s180 60 360 20"
          className="stroke-amber"
          strokeWidth="26"
          opacity="0.25"
          fill="none"
          strokeLinecap="round"
        />

        {/* Pin */}
        <g transform="translate(330 150)">
          <circle r="34" className="fill-accent" opacity="0.16" />
          <circle r="20" className="fill-accent" opacity="0.24" />
          <path
            d="M0-26c-8.5 0-15.5 7-15.5 15.5C-15.5-1 0 18 0 18s15.5-19 15.5-28.5C15.5-19-7-26 0-26Z"
            className="fill-accent"
          />
          <circle cy="-10.5" r="5.5" className="fill-paper" />
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 rounded-full border border-line bg-paper/90 px-4 py-2 text-xs font-medium text-ink-soft backdrop-blur">
        Placeholder map — {label}
      </div>
    </div>
  );
}
