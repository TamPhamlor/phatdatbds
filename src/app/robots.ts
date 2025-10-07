// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatdatbatdongsan.com";
  const isProd = SITE_URL.includes("phatdatbds.vercel.app") || process.env.VERCEL_ENV === "production";

  // Ở preview/dev: chặn index để không bị trùng lặp nội dung trên domain tạm
  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: ["/"] }],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  // Production: mở crawl và chỉ chặn đường dẫn nội bộ
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/_next", "/draft"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
