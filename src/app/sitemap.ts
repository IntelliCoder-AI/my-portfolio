import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return origin
    ? [
        {
          url: `${origin.replace(/\/$/, "")}/`,
          changeFrequency: "monthly",
          priority: 1,
        },
      ]
    : [];
}
