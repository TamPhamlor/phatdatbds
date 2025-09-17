export interface Listing {
  id: number;
  title: string;
  description?: string;
  bedrooms: number;
  legal_status_id: number;
  bathrooms: number;
  address: string;
  price_total: string;
  price_total_text: string;
  area_land: string;
  area_built?: string;
  width?: string;
  length?: string;
  road_width?: string;
  frontage?: boolean;
  floors?: number;
  direction?: string;
  property_type_id?: number;
  province_id?: number;
  ward_id?: number;
  images: { id: number; url: string; is_cover: boolean; sort_order: number }[];
  author?: string;
  published_at: string;
  lat: number;
  lng: number;
  slug: string;
  amenities: {
    id: number;
    code: string;
    name: string;
    group_name: string;
    pivot: { listing_id: number; amenity_id: number };
  }[];
}

export interface Filters {
  price_total_min?: number;
  price_total_max?: number;
  area_land_min?: number;
  area_land_max?: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  direction?: string;
  amenities?: string[];
  property_type_id?: number;
  province_id?: number;
  ward_id?: number;
  legal_status_id?: number;
}

export interface FilterState {
  filterOpen: boolean;
  detailOpen: boolean;
}