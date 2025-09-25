// lib/meta.ts
import 'server-only';
import { cache } from 'react';

export type Province = { code: string; name: string };
export type Ward = { code: string; name: string; full_name?: string };
export type MetaListing = {
  provinces: Province[];
  wards: Record<number | string, Ward[]>;
};

export const getMetaListing = cache(async (): Promise<MetaListing | null> => {
  try {
    const res = await fetch("https://phatdatbatdongsan.com/api/v1/meta_listing", {
      // Chọn 1 trong 2:
      // cache: "no-store", // luôn gọi API
      next: { revalidate: 3600 }, // hoặc cache 1h, tuỳ nhu cầu
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as MetaListing;
  } catch (e) {
    console.error("Error fetching meta_listing:", e);
    return null;
  }
});
