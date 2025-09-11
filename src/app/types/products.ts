// types.ts
export interface Image {
  id: number;
  listing_id: number;
  url: string;
  is_cover: boolean;
  sort_order: number;
}

export interface Amenity {
  id: number;
  code: string;
  name: string;
  group_name: string;
  pivot: {
    listing_id: number;
    amenity_id: number;
  };
}

export interface Listing {
  id: number;
  user_id: number | null;
  property_type_id: number;
  land_use_type_id: number;
  legal_status_id: number;
  province_id: number;
  district_id: number | null;
  ward_id: number;
  street: string;
  address: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  area_land: string;
  area_built: string;
  width: string;
  length: string;
  road_width: string;
  frontage: boolean;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  direction: string;
  price_total: string;
  price_per_m2: string;
  currency: string;
  status: string;
  published_at: string;
  expired_at: string;
  created_at: string;
  updated_at: string;

  // Quan hệ
  images: Image[];
  amenities: Amenity[];

  // Field bổ sung từ API
  price_total_text: string;
}


export interface SupportForm {
  name: string;
  email: string;
  need: "Mua" | "Thuê" | "Đầu tư";
  message: string;
  query: string;
  subscribe: boolean;
}

export interface FilterState {
  location: string;
  type: string;
  price: string;
}
