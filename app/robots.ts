import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Required by `output: "export"` — generated once at build time.
export const dynamic = "force-static";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing private yet — listed so the pattern is obvious when there is.
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
