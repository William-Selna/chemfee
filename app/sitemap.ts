import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { guides } from "@/content/guides";
import { posts } from "@/content/posts";
import { absoluteUrl } from "@/lib/seo";

// Required by `output: "export"` — generated once at build time.
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
      { url: absoluteUrl("/coffee"), changeFrequency: "weekly", priority: 0.9 },
      { url: absoluteUrl("/wholesale"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/visit"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/brew"), changeFrequency: "monthly", priority: 0.7 },
      { url: absoluteUrl("/journal"), changeFrequency: "weekly", priority: 0.7 },
      { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/coffee/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/brew/${guide.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/journal/${post.slug}`),
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...guideRoutes, ...postRoutes];
}
