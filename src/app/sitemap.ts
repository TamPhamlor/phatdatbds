// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatdatbatdongsan.com";

  // TODO: fetch danh sách bài/rao bán từ DB/CMS
  // const listings = await fetchListings(); // [{slug: "dat-abc", updatedAt: "..."}]

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date() , changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/nha-dat-ban`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/tin-tuc`, changeFrequency: "daily", priority: 0.6 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    // ...(listings?.map(x => ({
    //   url: `${SITE_URL}/nha-dat/${x.slug}`,
    //   lastModified: new Date(x.updatedAt || Date.now()),
    //   changeFrequency: "weekly",
    //   priority: 0.7,
    // })) || [])
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
