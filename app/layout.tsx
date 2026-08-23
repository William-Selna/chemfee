import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { themeScript } from "@/components/theme";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { brand } from "@/content/site";
import { defaultOgImage, siteUrl } from "@/lib/seo";

// Next does not prefix metadata icon routes with basePath, so the favicon is a
// static file in /public and the path is built here instead.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
import "./globals.css";

// Archivo carries the wordmark and headings; IBM Plex Mono handles every
// small-caps label, spec row, and eyebrow — the split used on the packaging.
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description:
    "Small-batch specialty coffee roasted in Amsterdam. Single-origin beans, seasonal blends, brew guides, and a café that treats filter coffee like laboratory work.",
  applicationName: brand.name,
  keywords: [
    "specialty coffee",
    "coffee roaster",
    "single origin coffee",
    "coffee beans online",
    "espresso blend",
    "pour over",
    "Amsterdam coffee",
    "koffiebranderij Amsterdam",
    "wholesale coffee",
  ],
  authors: [{ name: brand.name, url: siteUrl }],
  creator: brand.name,
  publisher: brand.legalName,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: `${basePath}/icon.png`, type: "image/png", sizes: "32x32" }],
    apple: `${basePath}/icon.png`,
  },
  formatDetection: { telephone: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Small-batch specialty coffee roasted in Amsterdam. Single-origin beans, seasonal blends, and brew guides worth following.",
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: "Small-batch specialty coffee, roasted in Amsterdam.",
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Food & Drink",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7efdc" },
    { media: "(prefers-color-scheme: dark)", color: "#141a24" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint — avoids a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
