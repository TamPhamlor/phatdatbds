import { Metadata } from "next";
import { Listing } from "@/app/types/products";
import ListingDetail from "./ListingDetail";

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

// Dùng hàm generateMetadata cho server-side metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const listing = await getListing(params.id);
  if (!listing) {
    return {
      title: "Không tìm thấy dữ liệu",
      description: "Listing không tồn tại",
    };
  }

  return {
    title: listing.title,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: listing.images?.[0]?.url ? [listing.images[0].url] : undefined,
      url: `https://phatdatbatdongsan.com/nha-dat-ban/${listing.id}`,
      type: "website",
    },
  };
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);

  if (!listing) {
    return <div className="container-std py-6">Không tìm thấy dữ liệu</div>;
  }

  return <ListingDetail listing={listing} />;
}
