"use client";
import Image from "next/image";
import Link from "next/link";
import { Listing } from "./types";

interface DetailPanelProps {
  listing: Listing | null;
  isOpen: boolean;
}

export default function DetailPanel({ listing, isOpen }: DetailPanelProps) {
  if (!listing) return null;

  const coverImage =
    listing.images.find((img) => img.is_cover)?.url ||
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600";

  return (
    <aside
      className={`w-full md:w-[380px] shrink-0 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sticky top-16">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-3">
          <Link href={`/nha-dat-ban/${listing.id}`} passHref>
            <Image
              src={coverImage}
              alt={listing.title}
              fill
              unoptimized
              className="object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
        <div className="font-semibold text-gray-900 text-lg">
          <Link href={`/nha-dat-ban/${listing.id}`} className="hover:text-indigo-600 transition-colors">
            {listing.title}
          </Link>
          <span className="text-gray-500 text-base font-normal">
            {listing.price_total_text}
            <span className="text-gray-400">/month</span>
          </span>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {listing.address}
        </div>
        <div className="mt-4">
          <div className="flex gap-4 text-sm font-medium text-gray-700">
            <button className="text-indigo-600">Overview</button>
            <button>Reviews</button>
            <button>About</button>
          </div>
          <p className="mt-3 text-sm text-gray-600 leading-6 line-clamp-2">
            {listing.description || "No description available."}
          </p>
        </div>
        <div className="mt-4">
          <div className="text-sm font-semibold text-gray-900 mb-2">
            Room Size
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">
              {listing.bedrooms} Beds
            </span>
            <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">
              {listing.bathrooms} Bathrooms
            </span>
            <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">
              {listing.area_land}
            </span>
          </div>
        </div>
        <div className="mt-4 rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
          <Link href={`/nha-dat-ban/${listing.id}`} passHref>
            <iframe
              src={`https://www.google.com/maps?q=${listing.lat},${listing.lng}&hl=vi&z=15&output=embed`}
              className="w-full h-full border-0 cursor-pointer"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50">
            Contact Us
          </button>
          <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">
            Schedule a Tour
          </button>
        </div>
      </div>
    </aside>
  );
}