// src/app/nha-dat-ban/[id]/page.tsx
import { Listing, Image as ListingImage } from "@/app/types/products";
import ListingDetail from "./ListingDetail";
import type { Metadata } from "next";

export const revalidate = 60;

// Đặt NEXT_PUBLIC_BASE_URL trên môi trường deploy (vd: https://phatdatbatdongsan.com)
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://phatdatbatdongsan.com";

import { apiRequestWithCache } from '@/lib/api';

async function getListing(id: string): Promise<Listing | null> {
  try {
    const res = await apiRequestWithCache(`/api/v1/listings/${id}`, 60);
    if (!res.ok) return null;
    const data = await res.json();
    return (data && data.data) ? (data.data as Listing) : null;
  } catch {
    return null;
  }
}

type ListingDetailPageProps = {
  params: { id: string | string[] };
};

export async function generateMetadata(
  { params }: ListingDetailPageProps
): Promise<Metadata> {
  const resolved = await params;
  const id = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id;
  const listing = await getListing(id);

  const title = listing?.title || `Tin rao #${id} | Nhà đất bán`;
  const desc =
    (listing?.description ?? "").replace(/<[^>]*>/g, '').slice(0, 180) ||
    "Tin rao bất động sản - thông tin chi tiết, hình ảnh, giá, pháp lý.";

  const cover =
    listing?.images?.find((i: ListingImage) => i.is_cover)?.url ||
    listing?.images?.[0]?.url ||
    `${BASE_URL}/default-og.jpg`;

  const url = `${BASE_URL}/nha-dat-ban/${id}`;

  // Thẻ product price cho Facebook (đặt qua metadata.other)
  const other: Record<string, string> = {};
  if (listing?.price_total_text) {
    other["product:price:amount"] = listing.price_total_text; // price trong types là string
    other["product:price:currency"] = "VND";
  }

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      // ❗ Fix: Next.js không hỗ trợ "product", dùng "website" là chuẩn
      type: "website",
      url,
      title,
      description: desc,
      siteName: "Phát Đạt Bất Động Sản",
      locale: "vi_VN",
      images: [{ url: cover, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [cover],
    },
    other, // nhúng product:price:* vào head
  };
}

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams.id)
    ? resolvedParams.id[0]
    : resolvedParams.id;
  const listing = await getListing(id);

  if (!listing) {
    return <div className="container-std py-6">Không tìm thấy dữ liệu</div>;
  }

  // JSON-LD (SEO) cho RealEstateListing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title ?? `Tin rao #${id}`,
    description: (listing.description ?? "Tin rao bất động sản chi tiết.").replace(/<[^>]*>/g, ''),
    url: `${BASE_URL}/nha-dat-ban/${id}`,
    image: (listing.images ?? [])
      .map((img: ListingImage) => img.url)
      .slice(0, 6),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetail listing={listing} />
    </>
  );
}
