"use client";

import Link from "next/link";
import Image from "next/image";
import { Listing, Image as ListingImage } from "@/app/types/products";

interface RelatedListingsProps {
  listings: Listing[];
}

export default function RelatedListings({ listings }: RelatedListingsProps) {
  // Lọc bỏ các bất động sản đã bán (status = sold)
  const availableListings = listings?.filter(
    (listing) => listing.status?.toLowerCase() !== "sold"
  ) || [];

  if (availableListings.length === 0) return null;

  const getCoverImage = (listing: Listing) => {
    const cover = listing.images?.find((img: ListingImage) => img.is_cover);
    return cover?.url || listing.images?.[0]?.url || "/placeholder.jpg";
  };

  return (
    <section className="mt-6 rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 text-lg">Bất động sản liên quan</h2>
        <Link
          href="/nha-dat-ban"
          className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableListings.slice(0, 4).map((listing) => (
          <Link
            key={listing.id}
            href={`/nha-dat-ban/${listing.slug}`}
            className="group flex gap-3 rounded-xl border border-emerald-100/50 bg-white/80 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all p-2"
          >
            <div className="w-24 h-20 relative flex-none overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={getCoverImage(listing)}
                alt={listing.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 line-clamp-2 text-sm group-hover:text-emerald-600 transition-colors">
                {listing.title}
              </div>
              <div className="mt-1 text-emerald-600 font-semibold text-sm">
                {listing.price_total_text || `${listing.price_total} VND`}
              </div>
              <div className="mt-0.5 text-xs text-gray-500 truncate">
                {listing.address}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
