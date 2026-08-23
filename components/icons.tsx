import type { SVGProps } from "react";

/**
 * Hand-rolled 24px stroke icons so the site ships zero icon dependencies
 * and nothing can 404. All inherit `currentColor`.
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Icon>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);

export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </Icon>
);

export const Close = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const Sun = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2 12h2M20 12h2M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" />
  </Icon>
);

export const Moon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Icon>
);

export const Leaf = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 20c0-8 5-14 16-15 0 9-4.5 15-12 15H4Z" />
    <path d="M4 20c3.5-4.5 7-7.5 11-9.5" />
  </Icon>
);

export const Flame = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 2s5 4.5 5 9a5 5 0 0 1-10 0c0-1.6.7-3 1.6-4.2C9 8.5 12 7 12 2Z" />
    <path d="M12 21a4 4 0 0 0 4-4c0-2-2-3.5-4-6-2 2.5-4 4-4 6a4 4 0 0 0 4 4Z" />
  </Icon>
);

export const Truck = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M2 7h11v10H2zM13 10h4l3 3v4h-7z" />
    <circle cx="6.5" cy="18" r="1.8" />
    <circle cx="16.5" cy="18" r="1.8" />
  </Icon>
);

export const MapPin = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 22s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="11" r="2.6" />
  </Icon>
);

export const Clock = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Icon>
);

export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Icon>
);

export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
  </Icon>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Icon>
);

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Bean = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <ellipse cx="12" cy="12" rx="9" ry="6.5" transform="rotate(-38 12 12)" />
    <path d="M6.5 17.5c4-2.5 5-8.5 11-11" />
  </Icon>
);

export const Cup = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
    <path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M8 2.5c-.8 1.2-.8 2 0 3.2M12 2.5c-.8 1.2-.8 2 0 3.2" />
  </Icon>
);

export const Scale = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M8 12h8M12 3v3" />
  </Icon>
);
