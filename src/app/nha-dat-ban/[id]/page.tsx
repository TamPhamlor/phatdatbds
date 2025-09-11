import React from "react";

import ListingDetail from "./ListingDetail";
import { Listing } from "@/app/types/products";

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

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    return <div className="container-std py-6">Không tìm thấy dữ liệu</div>;
  }

  return <ListingDetail listing={listing} />;
}
