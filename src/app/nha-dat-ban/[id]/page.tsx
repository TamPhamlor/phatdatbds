import { Listing } from "@/app/types/products";
import ListingDetail from "./ListingDetail";

export const revalidate = 60;

async function getListing(id: string): Promise<Listing | null> {
  try {
    
    const res = await fetch(
      `https://phatdatbatdongsan.com/api/v1/listings/${id}`,
      { next: { revalidate: 60 } }
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

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const resolvedParams = await params; // await params
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;
  const listing = await getListing(id);

  if (!listing) {
    return <div className="container-std py-6">Không tìm thấy dữ liệu</div>;
  }

  return <ListingDetail listing={listing} />;
}
