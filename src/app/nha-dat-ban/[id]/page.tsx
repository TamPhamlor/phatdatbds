import { Listing } from "@/app/types/products";
import ListingDetail from "./ListingDetail";
import { Metadata } from "next";

async function getListing(id: string): Promise<Listing | null> {
  try {
    const res = await fetch(
      `https://phatdatbatdongsan.com/api/v1/listings/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
}



interface ListingDetailPageProps {
  params: { id: string | string[] };
}

// ⚡ Tạo metadata động cho từng listing
export async function generateMetadata(
  { params }: ListingDetailPageProps
): Promise<Metadata> {
   const resolvedParams = await params; // await params
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;
  const listing = await getListing(id);

  if (!listing) {
    return {
      title: "Không tìm thấy dữ liệu",
      description: "Listing không tồn tại",
    };
  }

  return {
    title: listing.title,
    description: listing.description,
    alternates: {
      canonical: `https://phatdatbatdongsan.com/listings/${listing.id}`,
    },
    openGraph: {
      type: "article",
      url: `https://phatdatbatdongsan.com/listings/${listing.id}`,
      title: listing.title,
      description: listing.description,
      images: listing.images?.length
        ? listing.images.map((img) => ({
            url: img.url,
            width: 1200,
            height: 630,
            alt: listing.title,
          }))
        : [
            {
              url: "https://phatdatbatdongsan.com/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Phát Đạt BĐS",
            },
          ],
      siteName: "Phát Đạt BĐS",
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description,
      images: [listing.images?.[0] || "https://phatdatbatdongsan.com/og-image.jpg"],
    },
  };
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const resolvedParams = await params; // await params
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;
  const listing = await getListing(id);

  if (!listing) {
    return <div className="container-std py-6">Không tìm thấy dữ liệu</div>;
  }

  return <ListingDetail listing={listing} />;
}
