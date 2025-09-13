export interface Listing {
  id: number;
  title: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  price_total: string;
  price_total_text: string;
  area_land: string;
  images: { url: string; is_cover: boolean; sort_order: number }[];
  author?: string;
  published_at: string;
  lat: number;
  lng: number;
  amenities: {
    id: number;
    code: string;
    name: string;
    group_name: string;
    pivot: { listing_id: number; amenity_id: number };
  }[];
}

export interface FilterState {
  filterOpen: boolean;
  detailOpen: boolean;
}