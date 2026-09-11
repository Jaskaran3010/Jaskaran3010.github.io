import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { publishedProjects } from "@/data/projects";

export const dynamic = "force-static";

/** Emits entries only once the production domain is set in site.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const base = site.url.replace(/\/+$/, "");
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...publishedProjects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
