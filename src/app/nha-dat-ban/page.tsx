import type { Metadata } from "next";
import CategoryFilter from "./components/CategoryFilter";
import ClientLayout from "./components/ClientLayout";
import { Listing, Filters } from "./components/types";
import { MetaListing } from "../types/products";

// Metadata
export const metadata: Metadata = {
  title: "Nhà đất bán - Phát Đạt Bất Động Sản",
  description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai",
};

export const dynamic = "force-dynamic";

// ---- Helper ----
function parseNumber(value: string | string[] | undefined): number | undefined {
  if (!value) return undefined;
  const num = Array.isArray(value) ? parseInt(value[0]) : parseInt(value);
  return isNaN(num) ? undefined : num;
}

// ---- API get listings ----
async function getListings(filters: Filters): Promise<Listing[]> {
  try {
    const res = await fetch("https://phatdatbatdongsan.com/api/v1/listings", {
      cache: "no-store",
    });
    let listings = await res.json();
    listings = listings.data || [];

    return listings.filter((listing: Listing) => {
      let pass = true;

      // Filter by price_total
      if (filters.price_total_min && parseFloat(listing.price_total) < filters.price_total_min) pass = false;
      if (filters.price_total_max && parseFloat(listing.price_total) > filters.price_total_max) pass = false;

      // Filter by area_land
      if (filters.area_land_min && parseFloat(listing.area_land) < filters.area_land_min) pass = false;
      if (filters.area_land_max && parseFloat(listing.area_land) > filters.area_land_max) pass = false;

      // Bedrooms
      if (filters.bedrooms && listing.bedrooms !== filters.bedrooms) pass = false;

      // Bathrooms
      if (filters.bathrooms && listing.bathrooms !== filters.bathrooms) pass = false;

      // Floors
      if (filters.floors && listing.floors !== filters.floors) pass = false;

      // Direction
      if (filters.direction && listing.direction !== filters.direction) pass = false;

      // Amenities
      if (
        filters.amenities &&
        !filters.amenities.every((id) =>
          listing.amenities.some((a) => a.id.toString() === id)
        )
      ) {
        pass = false;
      }

      // Property type
      if (filters.property_type_id && listing.property_type_id !== filters.property_type_id) pass = false;

      // Province
      if (filters.province_id && listing.province_id !== filters.province_id) pass = false;

      // Ward
      if (filters.ward_id && listing.ward_id !== filters.ward_id) pass = false;

      // Legal status
      if (filters.legal_status_id && listing.legal_status_id !== filters.legal_status_id) pass = false;

      return pass;
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}


// ---- API get meta ----
async function getMetaListing(): Promise<MetaListing | null> {
  try {
    const res = await fetch("http://localhost:3000/api/v1/meta_listing", {
      cache: "no-store",
    });
    const data: MetaListing = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching meta_listing:", error);
    return null;
  }
}

// ---- Page ----
export default async function NhaDatBanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 🔹 Await searchParams to resolve the Promise
  const resolvedSearchParams = await searchParams;

  // 🔹 Convert searchParams to filters
  const filters: Filters = {
    price_total_min: parseNumber(resolvedSearchParams.price_total_min),
    price_total_max: parseNumber(resolvedSearchParams.price_total_max),
    area_land_min: parseNumber(resolvedSearchParams.area_land_min),
    area_land_max: parseNumber(resolvedSearchParams.area_land_max),
    bedrooms: parseNumber(resolvedSearchParams.bedrooms),
    bathrooms: parseNumber(resolvedSearchParams.bathrooms),
    floors: parseNumber(resolvedSearchParams.floors),
    direction: resolvedSearchParams.direction as string | undefined,
    amenities: resolvedSearchParams.amenities
      ? (resolvedSearchParams.amenities as string).split(",")
      : undefined,
    property_type_id: parseNumber(resolvedSearchParams.property_type_id),
    province_id: parseNumber(resolvedSearchParams.province_id),
    ward_id: parseNumber(resolvedSearchParams.ward_id),
    legal_status_id: parseNumber(resolvedSearchParams.legal_status_id),
  };

  const [projects, meta] = await Promise.all([
    getListings(filters),
    getMetaListing(),
  ]);

  return (
    <>
      <CategoryFilter />
      <ClientLayout projects={projects} meta={meta} />
    </>
  );
}
