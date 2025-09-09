// types.ts
export interface Listing {
  id: number;
  title: string;
  img: string;
  address: string;
  beds: string;
  price: string;
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
