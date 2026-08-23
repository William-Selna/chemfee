import type { NextConfig } from "next";

/**
 * GitHub Pages serves this project site from /<repo>/, so production builds
 * need a basePath. The deploy workflow supplies it via NEXT_PUBLIC_BASE_PATH,
 * which leaves `npm run dev` serving from / locally.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emits a fully static site to ./out — no Node server to run.
  output: "export",
  basePath,
  // Directory-style URLs (/coffee/index.html) are what Pages serves cleanly.
  trailingSlash: true,
  // Pages has no image optimiser; the site uses no next/image anyway.
  images: { unoptimized: true },
};

export default nextConfig;
