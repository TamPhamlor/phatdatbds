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
    lat: number;
  lng: number;
}

export interface FilterState {
  filterOpen: boolean;
  detailOpen: boolean;
}