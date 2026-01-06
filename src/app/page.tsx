// app/page.tsx

import { getMetaListing, MetaListing } from "@/lib/meta";
import { apiRequestWithCache } from '@/lib/api';
import HomeClient from "./components/HomeClient";
import { Post } from "./tin-tuc/component/types";

interface ApiImage {
  id: number;
  listing_id: number;
  url: string;
  is_cover: boolean;
  sort_order: number;
}

interface ApiProvince { code: string; name: string; }
interface ApiWard { code: string; name: string; }

interface ApiListing {
  id: number;
  title: string;
  slug: string;
  street?: string | null;
  address?: string | null;
  area_land?: string | null;
  price_total?: string | null;
  price_total_text?: string | null;
  images?: ApiImage[];
  ward?: ApiWard | null;
  province?: ApiProvince | null;
  status?: string | null;
}

interface ApiResponse { data: ApiListing[]; }

interface PostsApiResponse {
  success: boolean;
  data: {
    data: Post[];
  };
}

async function fetchLatestPosts(): Promise<Post[]> {
  try {
    const res = await apiRequestWithCache("/api/v1/posts?per_page=6", 60);
    const data: PostsApiResponse = await res.json();
    if (data.success) {
      return data.data.data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return [];
}

export interface Listing {
  id: number;
  title: string;
  img: string;
  address: string;
  beds: string;   // m² hiển thị
  price: string;  // chuỗi đã format
  slug: string;
  status?: string; // trạng thái: sold, available, etc.
}

// ---- Utils (server side) ----
const pickCoverImage = (images?: ApiImage[]): string => {
  if (!images || images.length === 0) return "/placeholder.jpg";
  const cover = images.find((i) => i.is_cover)?.url;
  return cover ?? images[0].url ?? "/placeholder.jpg";
};

const formatVND = (val: number): string =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(val);

const mapApiToListing = (it: ApiListing): Listing => {
  const img = pickCoverImage(it.images);

  const address =
    it.address ||
    [it.ward?.name, it.province?.name].filter(Boolean).join(", ") ||
    "Đang cập nhật";

  const areaNum = it.area_land ? Number(it.area_land) : NaN;
  const beds = Number.isFinite(areaNum)
    ? `${areaNum.toLocaleString("vi-VN")} m²`
    : "—";

  let price = it.price_total_text || "Đang cập nhật";
  if (!it.price_total_text && it.price_total) {
    const num = Number(it.price_total);
    if (Number.isFinite(num)) price = formatVND(num);
  }

  return {
    id: it.id,
    title: it.title,
    img,
    address,
    beds,
    price,
    slug: it.slug,
    status: it.status || undefined,
  };
};

export default async function HomePage() {
  let listings: Listing[] = [];
  let loadErr: string | null = null;
  let meta: MetaListing | null = null;

  try {
    // Server fetch — không dùng useEffect
    // Relative URL hoạt động trong App Router khi render server
    const res = await apiRequestWithCache("/api/v1/listings", 60);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = (await res.json()) as ApiResponse;
    const data = json?.data ?? [];
    listings = data.map(mapApiToListing);
  } catch (e) {
    loadErr = e instanceof Error ? e.message : "Không tải được danh sách";
  }
  
  meta = await getMetaListing();
  const latestPosts = await fetchLatestPosts();
  
  return <HomeClient listings={listings} loadErr={loadErr} meta={meta} latestPosts={latestPosts} />;
}
