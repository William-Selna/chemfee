import type { Product } from "@/content/products";
import { cn } from "@/lib/cn";

/**
 * Product artwork, generated entirely in SVG from the product's accent colour.
 * No photography, no image files, nothing to 404 — and swapping in real photos
 * later means replacing this one component.
 */
export function ProductBag({
  product,
  className,
  priorityLabel,
}: {
  product: Product;
  className?: string;
  /** Rendered as the accessible name. Defaults to a sensible description. */
  priorityLabel?: string;
}) {
  const nameLines = splitName(product.name);
  /* Everything below the rule shifts down when the name needs a second line. */
  const nameTop = 298;
  const shift = (nameLines.length - 1) * 28;
  const specTop = nameTop + shift + 52;
  const barcodeTop = specTop + 76;

  const specs: [string, string][] = [
    ["ORIGIN", product.country.toUpperCase()],
    ["PROCESS", product.process.split(",")[0].toUpperCase()],
    ["ROAST", `${product.roast.toUpperCase()} · ${product.roastIndex}/5`],
    ["NET WEIGHT", `${product.weightGrams} g e`],
  ];

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={
        priorityLabel ??
        `Illustration of a ${product.weightGrams} gram bag of ${product.name}, ${product.roast} roast from ${product.country}, lot ${product.lot}`
      }
      className={cn("h-full w-full", className)}
    >
      {/* Cast shadow */}
      <ellipse cx="200" cy="492" rx="128" ry="11" fill="#1C2431" opacity="0.12" />

      {/* Bag body — label stock cream in both themes, like real packaging */}
      <path
        d="M62 100h276a8 8 0 0 1 8 8v366a12 12 0 0 1-12 12H66a12 12 0 0 1-12-12V108a8 8 0 0 1 8-8Z"
        fill="#F8F2E2"
      />

      {/* Crimped top fold, in the lot colour */}
      <rect x="54" y="58" width="292" height="44" rx="6" fill={product.accent} />
      <g stroke="#1C2431" strokeOpacity="0.22" strokeWidth="2">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={i} x1={70 + i * 19} y1="66" x2={70 + i * 19} y2="94" />
        ))}
      </g>

      {/* Hairline frame, as printed on the label */}
      <rect
        x="80"
        y="118"
        width="240"
        height="360"
        rx="10"
        fill="none"
        stroke="#364354"
        strokeOpacity="0.35"
      />

      {/* Certificate band */}
      <rect x="88" y="136" width="224" height="26" fill={product.accent} />
      <text
        x="200"
        y="153"
        textAnchor="middle"
        fill="#F8F2E2"
        fontSize="7.2"
        letterSpacing="0.55"
        className="font-mono"
      >
        CERTIFICATE OF ORIGIN · LOT {product.lot}
      </text>

      {/* Flask mark, hanging off the band */}
      <g transform="translate(184 162) scale(0.8)">
        <rect x="16.4" y="1.2" width="7.2" height="4.6" rx="1.3" fill="#364354" />
        <path
          d="M11 26.4h18l2.9 4.8a3.6 3.6 0 0 1-3.1 5.6H11.2a3.6 3.6 0 0 1-3.1-5.6L11 26.4Z"
          fill="#B8853C"
        />
        <ellipse
          cx="20"
          cy="31.4"
          rx="5.1"
          ry="3.3"
          fill="#364354"
          transform="rotate(-22 20 31.4)"
        />
        <path
          d="M17.7 5.6v9.8L8.1 31.2a3.6 3.6 0 0 0 3.1 5.6h17.6a3.6 3.6 0 0 0 3.1-5.6L22.3 15.4V5.6"
          fill="none"
          stroke="#364354"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Wordmark */}
      <text
        x="200"
        y="232"
        textAnchor="middle"
        fill="#364354"
        fontSize="40"
        fontWeight="800"
        letterSpacing="1.5"
        className="font-display"
      >
        CHEMFEE
      </text>
      <text
        x="200"
        y="250"
        textAnchor="middle"
        fill="#6B6656"
        fontSize="7.5"
        letterSpacing="3.4"
        className="font-mono"
      >
        THE COFFEE CHEMISTS
      </text>

      {/* Rule with the amber diamond */}
      <line x1="118" y1="266" x2="282" y2="266" stroke="#364354" strokeOpacity="0.3" />
      <rect x="196" y="262" width="8" height="8" fill="#B8853C" transform="rotate(45 200 266)" />

      {/* Coffee name */}
      {nameLines.map((line, i) => (
        <text
          key={line}
          x="200"
          y={nameTop + i * 28}
          textAnchor="middle"
          fill="#364354"
          fontSize="26"
          fontWeight="700"
          letterSpacing="0.4"
          className="font-display"
        >
          {line.toUpperCase()}
        </text>
      ))}

      <text
        x="200"
        y={nameTop + shift + 22}
        textAnchor="middle"
        fill="#6B6656"
        fontSize="8"
        letterSpacing="2.4"
        className="font-mono"
      >
        SINGLE ORIGIN · {product.roast.toUpperCase()} ROAST
      </text>

      {/* Spec table with alternating row tints, as on the label */}
      {specs.map(([label, value], i) => (
        <g key={label}>
          {i % 2 === 0 && (
            <rect
              x="96"
              y={specTop + i * 18 - 12}
              width="208"
              height="17"
              fill="#364354"
              opacity="0.05"
            />
          )}
          <text
            x="104"
            y={specTop + i * 18}
            fill="#4A4638"
            fontSize="9"
            letterSpacing="0.9"
            className="font-mono"
          >
            {label}
          </text>
          <text
            x="296"
            y={specTop + i * 18}
            textAnchor="end"
            fill="#364354"
            fontSize="9"
            letterSpacing="0.9"
            className="font-mono"
          >
            {value}
          </text>
        </g>
      ))}

      {/* Barcode */}
      <g transform={`translate(148 ${barcodeTop})`}>
        {BARS.map((w, i, arr) => (
          <rect
            key={i}
            x={arr.slice(0, i).reduce((sum, b) => sum + b + 1.6, 0)}
            y="0"
            width={w}
            height="20"
            fill="#364354"
            opacity="0.85"
          />
        ))}
      </g>
    </svg>
  );
}

/** Fixed bar widths — decorative, not a scannable code. */
const BARS = [
  1, 2.4, 1, 1, 3, 1.4, 1, 2.6, 1, 1.6, 2.4, 1, 1, 3, 1, 1.4, 2.6, 1, 2, 1, 1.4, 3, 1, 1.6, 1,
  2.4, 1, 1, 2.6, 1.4, 1, 2, 1, 3, 1, 1.6,
];

function splitName(name: string) {
  const words = name.split(" ");
  if (words.length === 1) return words;
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * Loose decorative bean scatter used behind headings.
 * Each bean is its own fixed-size SVG positioned in percentages, so they keep
 * their shape whatever the aspect ratio of the container.
 */
const SCATTER = [
  { x: 12, y: 20, rotate: -24, size: 62 },
  { x: 47, y: 66, rotate: 38, size: 44 },
  { x: 78, y: 28, rotate: -8, size: 54 },
  { x: 31, y: 84, rotate: 62, size: 36 },
  { x: 89, y: 74, rotate: 14, size: 42 },
];

export function BeanScatter({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none overflow-hidden", className)}>
      {SCATTER.map((bean, i) => (
        <svg
          key={i}
          viewBox="-10 -8 20 16"
          width={bean.size}
          height={bean.size * 0.8}
          className="absolute"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
            transform: `translate(-50%, -50%) rotate(${bean.rotate}deg)`,
          }}
        >
          <ellipse rx="8.5" ry="5.6" className="fill-current" opacity="0.13" />
          <path
            d="M-7 2C-3-1 2.5-2.8 7-2"
            className="stroke-current"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
            opacity="0.28"
          />
        </svg>
      ))}
    </div>
  );
}

/** Rising steam, used on the hero. Animation respects reduced-motion. */
export function Steam({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      aria-hidden="true"
      fill="none"
      className={cn("text-current", className)}
    >
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${30 + i * 30} 150c-14-22 14-30 0-52s14-30 0-50`}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-steam"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
    </svg>
  );
}
