// app/page.tsx

import HomeClient from "./components/HomeClient";


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
}

interface ApiResponse { data: ApiListing[]; }

export interface Listing {
  id: number;
  title: string;
  img: string;
  address: string;
  beds: string;   // m² hiển thị
  price: string;  // chuỗi đã format
  slug: string;
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
  };
};

export default async function Page() {
  let listings: Listing[] = [];
  let loadErr: string | null = null;

  try {
    // Server fetch — không dùng useEffect
    // Relative URL hoạt động trong App Router khi render server
    const res = await fetch("https://phatdatbatdongsan.com/api/v1/listings", {
      cache: "no-store", // luôn lấy mới; tùy bạn đổi sang revalidate
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = (await res.json()) as ApiResponse;
    const data = json?.data ?? [];
    listings = data.map(mapApiToListing);
  } catch (e) {
    loadErr = e instanceof Error ? e.message : "Không tải được danh sách";
  }

  return <HomeClient listings={listings} loadErr={loadErr} />;
}
