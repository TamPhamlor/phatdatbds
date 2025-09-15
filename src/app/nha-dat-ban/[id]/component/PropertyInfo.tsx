"use client";
import { Listing } from "@/app/types/products";

interface PropertyInfoProps {
  listing: Listing;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ listing }) => {
  return (
    <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">{listing.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 8.5c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9z"/>
            </svg>
            {listing.address}
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="text-amber-500">★ 4.9</span>
            <span className="text-gray-400">(128 reviews)</span>
          </div>
        </div>
        <div className="text-left md:text-right">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{listing.price_total_text}<span className="text-base text-gray-500 font-normal">/total</span></div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50 w-full sm:w-auto">Liên hệ</button>
            <a href="#schedule" className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700 w-full sm:w-auto text-center">Đặt lịch tham quan</a>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{listing.bedrooms} Phòng ngủ</span>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{listing.bathrooms} Phòng tắm</span>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">{listing.area_land} m²</span>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">Xây dựng 2019</span>
      </div>
    </section>
  );
};

export default PropertyInfo;