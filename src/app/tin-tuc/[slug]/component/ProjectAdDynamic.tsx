"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/app/types/products";

const PINNED_LISTING_SLUG =
  "ban-lo-dat-cln-dgt-xa-dai-phuoc-nhon-trach-3113m2-to-79-thua-27";

export function ProjectAdDynamic() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/v1/listings/${PINNED_LISTING_SLUG}`);
        const json = await res.json();
        if (json?.data) {
          setListing(json.data);
        }
      } catch (error) {
        console.error("Error fetching pinned listing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  if (loading) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/20">
        <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const coverImage =
    listing.images?.find((i) => i.is_cover)?.url || listing.images?.[0]?.url;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20"></div>
      <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Dự án được ghim
          </span>
        </div>

        <Link href={`/nha-dat-ban/${listing.slug}`}>
          <div className="relative w-full h-40 rounded-xl overflow-hidden ring-2 ring-emerald-200/50">
            {coverImage && (
              <Image
                src={coverImage}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                unoptimized
              />
            )}
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg">
                HOT 🔥
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-3 font-semibold text-gray-900 line-clamp-2">
          {listing.title}
        </div>
        <div className="text-sm text-gray-500 line-clamp-1">
          {listing.address}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-bold text-emerald-600">
            {listing.price_total_text || listing.price_total}
          </div>
          <Link
            href={`/nha-dat-ban/${listing.slug}`}
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 text-xs font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
