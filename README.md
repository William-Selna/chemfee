# CHEMFEE — coffee roaster website

A static, SEO-first marketing site for a specialty coffee roastery and café.
Next.js App Router + React 19 + Tailwind v4 + TypeScript. Every page is
pre-rendered to real HTML at build time, so there is no backend to run.

```bash
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
npm run lint
```

Hosted on GitHub Pages at **https://william-selna.github.io/chemfee/** — every
push to `main` rebuilds and redeploys via `.github/workflows/deploy.yml`.

---

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, featured coffees, principles, brew guides, café, journal |
| `/coffee` | Shop index with client-side roast/origin filtering and sorting |
| `/coffee/[slug]` | Product detail — origin specs, cupping scores, brew pairings |
| `/about` | Company story, values, timeline, team |
| `/visit` | Café hours, address, stylised map, menu, practical FAQ |
| `/brew` | Brew guide index + brewing fundamentals |
| `/brew/[slug]` | Full recipe with timed steps and troubleshooting |
| `/journal` | Blog index |
| `/journal/[slug]` | Article template |
| `/wholesale` | B2B — volume pricing, support, onboarding, enquiry form |
| `/contact` | Contact form, channels, FAQ |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon` | Generated automatically |

---

## The three files you'll edit most

1. **`content/site.ts`** — brand name, tagline, address, phone, hours, social
   links, navigation. Everything on the site reads from here.
2. **`app/globals.css`** — the entire palette lives in the `:root` and `.dark`
   blocks at the top. Change those values and the whole site re-skins; no
   component references a raw hex.
3. **`lib/forms.ts`** — the single `submitLead()` function every form calls.

Content lives in plain typed TypeScript, not a CMS:

- `content/products.ts` — the six coffees
- `content/guides.ts` — brew recipes
- `content/posts.ts` — journal articles

Adding a product, guide, or post to its array is enough: the listing pages,
detail routes, sitemap, and JSON-LD all pick it up automatically.

---

## Email capture (no cart)

There is no shopping cart or checkout. Instead the site collects email in four
places, all routed through one function:

- Footer newsletter (`#newsletter`, present on every page)
- "Notify me" on each coffee's detail page
- Wholesale enquiry form
- Contact form

To go live, replace the body of `submitLead()` in [`lib/forms.ts`](lib/forms.ts)
with a call to your provider — Formspree, Basin, Klaviyo, Mailchimp, or your own
route handler. The file has copy-paste examples. Nothing else changes.

Each form includes a hidden honeypot field and client-side email validation.

---

## SEO

- Per-page `<title>`, meta description, and canonical URL via `pageMetadata()`
  in [`lib/seo.ts`](lib/seo.ts)
- Open Graph + Twitter cards on every page, with a generated 1200×630 social
  image (`app/opengraph-image.tsx`)
- JSON-LD structured data in [`lib/jsonld.tsx`](lib/jsonld.tsx): `Organization`,
  `WebSite`, `CafeOrCoffeeShop` (with opening hours + geo), `Product` with
  `Offer`, `Article`, `HowTo` for brew guides, `BreadcrumbList`, and `FAQPage`
- `sitemap.xml` and `robots.txt` generated from the content files
- Semantic headings, one `<h1>` per page, breadcrumbs, descriptive alt text
- Everything statically rendered — crawlers get complete HTML

The canonical origin comes from `NEXT_PUBLIC_SITE_URL`, which the deploy
workflow sets to the Pages URL. For a local production build, copy
`.env.example` to `.env.local` and set it yourself.

---

## Hosting

`next.config.ts` sets `output: "export"`, so `npm run build` writes a plain
static site to `./out` — no Node server anywhere. The Actions workflow builds
that and publishes it to Pages.

Two things are needed because Pages serves the site from a subdirectory:

- **`NEXT_PUBLIC_BASE_PATH`** (`/chemfee`) becomes Next's `basePath`, so every
  asset and internal link is prefixed. It is only set in CI, which keeps
  `npm run dev` serving from `/` locally.
- **`trailingSlash: true`**, so routes export as `coffee/index.html`. Canonical
  URLs and the sitemap carry matching trailing slashes.

The favicon and social card are static PNGs in `public/` rather than generated
`ImageResponse` routes — Next does not apply `basePath` to metadata image
routes, and the export writes them without a file extension. Regenerate them by
hand if the brand changes.

**Moving to a real domain later:** add the domain in the repo's Pages settings,
then drop `NEXT_PUBLIC_BASE_PATH` from the workflow and point
`NEXT_PUBLIC_SITE_URL` at the new origin. Nothing else changes.

---

## Accessibility

Skip link, keyboard-navigable nav and mobile drawer (Escape closes it, scroll
locks), native `<details>` accordions, visible focus rings, `aria-live` regions
on form status, AA-contrast palette in both themes, and full
`prefers-reduced-motion` support.

---

## Design system notes

- **Type**: Archivo (wordmark, headings, body) + IBM Plex Mono (eyebrows, spec
  rows, certificate bands) — the same bold-sans / mono split used on the bag
- **Theme**: light/dark toggle with system default, applied by an inline script
  before first paint so there's no flash. The `dark` class on `<html>` is the
  single source of truth.
- **Motion**: scroll-reveal via one `IntersectionObserver` per element that
  disconnects after firing. Content renders fully visible without JavaScript.
- **Palette**: taken off the CHEMFEE label — cream label stock, slate ink,
  laboratory teal, amber accent, deep navy for the dark blocks.
- **Imagery**: there are no image files. The flask mark, product bags, the map,
  decorative beans, the favicon, and the social card are all generated SVG.
  Each bag is a redrawn CHEMFEE label with a per-lot band colour. Swap
  `components/bag.tsx` and `components/map-placeholder.tsx` when you have real
  photography.

---

## Real vs. placeholder

**Real** — taken from the packaging and the address you supplied:

- Brand name, descriptor, legal name (`CHEMFEE Holding Company`)
- Logo mark (flask + bean, redrawn as SVG)
- Palette and the bold-sans / mono type pairing
- `Wijttenbachstraat 307, 1093 HX Amsterdam`

**Still placeholder — replace before launch:**

- Phone number and both email addresses (`content/site.ts`)
- `NEXT_PUBLIC_SITE_URL` — currently assumes `chemfee.nl`
- Tagline (`Coffee, measured properly.`) — invented, not from the label
- Map coordinates are approximate (`contact.geo`)
- Social URLs (currently `example.com`)
- Team names (`app/about/page.tsx`)
- Wholesale pricing (`app/wholesale/page.tsx`)
- Café menu and prices (`app/visit/page.tsx`)
- Author names in journal posts (`content/posts.ts`)
- The stylised map (`components/map-placeholder.tsx`)

All body copy, product names, and journal articles are fictional.
