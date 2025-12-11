// lib/meta.ts
import 'server-only';
import { cache } from 'react';

export type Province = { code: string; name: string };
export type Ward = { code: string; name: string; full_name?: string };
export type MetaListing = {
  provinces: Province[];
  wards: Record<number | string, Ward[]>;
};

import { apiRequestWithCache } from './api';

export const getMetaListing = cache(async (): Promise<MetaListing | null> => {
  try {
    const res = await apiRequestWithCache("/api/v1/meta_listing", 86400);
    return (await res.json()) as MetaListing;
  } catch (e) {
    console.error("Error fetching meta_listing:", e);
    return null;
  }
});
