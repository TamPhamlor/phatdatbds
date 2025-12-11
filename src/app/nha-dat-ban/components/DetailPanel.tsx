import Image from "next/image";
import Link from "next/link";
import { Listing } from "./types";
import { X } from "lucide-react";

interface DetailPanelProps {
  listing: Listing | null;
  onClose: () => void;
}

export default function DetailPanel({ listing, onClose }: DetailPanelProps) {
  if (!listing) return null;

  const coverImage =
    listing.images.find((img) => img.is_cover)?.url ||
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600";

  return (
    <aside className="w-full">
      <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-white/90 to-emerald-50/60 backdrop-blur-xl shadow-2xl shadow-emerald-100/50 overflow-hidden relative">
    {/* Hình ảnh chính (không padding) */}
    <div className="relative aspect-video bg-gray-100">
      <Link href={`/nha-dat-ban/${listing.slug}`} passHref>
        <Image
          src={coverImage}
          alt={listing.title}
          fill
          unoptimized
          className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
        />
      </Link>
    </div>

    {/* Nội dung có padding */}
    <div className="p-4">
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all z-[9999] hidden md:block group"
      >
        <X className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
      </button>

      {/* Tiêu đề + Giá */}
      <div className="font-semibold text-gray-900 text-lg">
        <Link
          href={`/nha-dat-ban/${listing.slug}`}
          className="hover:text-emerald-600 transition-colors"
        >
          {listing.title}
        </Link>
        <br />
        <span className="text-red-600 text-base font-bold">
          {listing.price_total_text}
        </span>
      </div>

      {/* Địa chỉ */}
      <div className="text-sm text-gray-600 flex items-center gap-2 mt-2">
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {listing.address}
      </div>

      {/* Mô tả */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-900 mb-2">Mô tả</div>
        <div 
          className="text-sm text-gray-600 leading-6 line-clamp-4 prose prose-sm max-w-none
            [&>*]:!text-sm [&>*]:!leading-6 [&>*]:!text-gray-600
            [&>p]:mb-2 [&>p]:leading-6
            [&>strong]:font-semibold [&>strong]:text-gray-700
            [&>em]:italic
            [&>a]:text-emerald-600 [&>a]:font-medium hover:[&>a]:text-emerald-700
            [&>ul]:my-2 [&>ul]:pl-4 [&>li]:mb-1
            [&>ol]:my-2 [&>ol]:pl-4"
          dangerouslySetInnerHTML={{ 
            __html: listing.description || "Chưa có mô tả." 
          }}
        />
      </div>

      {/* Thông tin phòng */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-900 mb-2">
          Diện tích & Phòng
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700 font-medium">
            {listing.bedrooms} Phòng ngủ
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700 font-medium">
            {listing.bathrooms} Phòng tắm
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700 font-medium">
            {listing.area_land} m²
          </span>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="mt-4 rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
        <Link href={`/nha-dat-ban/${listing.id}`} passHref>
          <iframe
            src={`https://www.google.com/maps?q=${listing.lat},${listing.lng}&hl=vi&z=15&output=embed`}
            className="w-full h-full border-0 cursor-pointer"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ"
          />
        </Link>
      </div>

      {/* Nút hành động */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link 
          href="/lien-he"
          className="rounded-xl border border-emerald-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm text-center"
        >
          Liên hệ
        </Link>
        <Link 
          href={`/nha-dat-ban/${listing.slug}`}
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2.5 text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  </div>
</aside>

  );
}
