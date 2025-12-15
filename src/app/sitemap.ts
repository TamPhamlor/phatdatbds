// app/sitemap.ts
import { MetadataRoute } from "next";

const API_BASE_URL = process.env.API_URL || 'https://api.phatdatbatdongsan.com';
const API_KEY = process.env.API_SECRET_KEY;

interface SitemapItem {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

interface SitemapResponse {
  urls?: SitemapItem[];
}

async function fetchSitemapData(): Promise<SitemapItem[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (API_KEY) {
      headers['X-API-Key'] = API_KEY;
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/sitemap.xml`, {
      headers,
      next: { revalidate: 3600 } // Cache 1 giờ
    });

    if (!response.ok) {
      console.error('Failed to fetch sitemap data:', response.status);
      return [];
    }

    // Kiểm tra content-type để xử lý phù hợp
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const data: SitemapResponse = await response.json();
      return data.urls || [];
    }
    
    // Nếu trả về XML, parse XML
    if (contentType?.includes('xml')) {
      const xmlText = await response.text();
      return parseXmlSitemap(xmlText);
    }

    return [];
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}

function parseXmlSitemap(xml: string): SitemapItem[] {
  const urls: SitemapItem[] = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  const locRegex = /<loc>(.*?)<\/loc>/;
  const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/;
  const changefreqRegex = /<changefreq>(.*?)<\/changefreq>/;
  const priorityRegex = /<priority>(.*?)<\/priority>/;

  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    const urlBlock = match[1];
    const loc = locRegex.exec(urlBlock)?.[1];
    
    if (loc) {
      urls.push({
        loc,
        lastmod: lastmodRegex.exec(urlBlock)?.[1],
        changefreq: changefreqRegex.exec(urlBlock)?.[1],
        priority: parseFloat(priorityRegex.exec(urlBlock)?.[1] || '0.5'),
      });
    }
  }

  return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatdatbatdongsan.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/nha-dat-ban`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/tin-tuc`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/lien-he`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/cau-hoi-thuong-gap`, changeFrequency: "monthly", priority: 0.4 },
  ];

  // Fetch dynamic routes từ API
  const apiSitemapData = await fetchSitemapData();
  
  const dynamicRoutes: MetadataRoute.Sitemap = apiSitemapData.map((item) => ({
    url: item.loc.startsWith('http') ? item.loc : `${SITE_URL}${item.loc}`,
    lastModified: item.lastmod ? new Date(item.lastmod) : new Date(),
    changeFrequency: (item.changefreq as MetadataRoute.Sitemap[number]['changeFrequency']) || "weekly",
    priority: item.priority || 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
