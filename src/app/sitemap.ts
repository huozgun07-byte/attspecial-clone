import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { cities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/att-fiber", changeFrequency: "weekly", priority: 0.9 },
    { path: "/att-internet-air", changeFrequency: "weekly", priority: 0.8 },
    { path: "/wireless", changeFrequency: "weekly", priority: 0.8 },
    { path: "/business", changeFrequency: "weekly", priority: 0.8 },
    { path: "/espanol", changeFrequency: "monthly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticRoutes = routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const cityRoutes = cities.map((city) => ({
    url: `${siteUrl}/att-fiber/${city.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes];
}
