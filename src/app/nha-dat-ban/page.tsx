import type { Metadata } from "next";
import NhaDatBanContent from "./NhaDatBanContent";

export interface Listing {
  id: number;
  title: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  price_total: string;
  area_land: string;
  images: { url: string; is_cover: boolean; sort_order: number }[];
  author?: string;
  published_at: string;
  price_total_text: string;
}

export const metadata: Metadata = {
  title: "Nhà đất bán - Phát Đạt Bất Động Sản",
  description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai",
};

export async function getListings(): Promise<Listing[]> {
  try {
  const res = await fetch(`https://phatdatbatdongsan.com/api/v1/listings`);
  const data = await res.json();
  return data.data || [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}


export default async function NhaDatBanPage() {
  const projects = await getListings();

  return <NhaDatBanContent projects={projects} />;
}
