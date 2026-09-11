import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // Advertised automatically once site.url is set in src/data/site.ts.
    ...(site.url
      ? { sitemap: `${site.url.replace(/\/+$/, "")}/sitemap.xml` }
      : {}),
  };
}
