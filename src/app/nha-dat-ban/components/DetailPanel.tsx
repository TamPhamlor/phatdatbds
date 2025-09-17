"use client";
import Image from "next/image";
import Link from "next/link";
import { Listing } from "./types";
import { X } from "lucide-react";

interface DetailPanelProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void; // thêm prop onClose
}

export default function DetailPanel({ listing, isOpen, onClose }: DetailPanelProps) {
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
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm sticky top-16 overflow-hidden">
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
        className="absolute top-1 right-1 p-2 rounded-full transition-colors z-[9999] hidden md:block"
      >
        <X className="w-7 h-7 text-white" />
      </button>

      {/* Tiêu đề + Giá */}
      <div className="font-semibold text-gray-900 text-lg">
        <Link
          href={`/nha-dat-ban/${listing.slug}`}
          className="hover:text-indigo-600 transition-colors"
        >
          {listing.title}
        </Link>
        <br />
        <span className="text-gray-500 text-base font-normal">
          {listing.price_total_text}
          <span className="text-gray-400">/tháng</span>
        </span>
      </div>

      {/* Địa chỉ */}
      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        {listing.address}
      </div>

      {/* Giới thiệu */}
      <div className="mt-4">
        <div className="flex gap-4 text-sm font-medium text-gray-700">
          <button className="text-indigo-600">Tổng quan</button>
          <button>Đánh giá</button>
          <button>Giới thiệu</button>
        </div>
        <p className="mt-3 text-sm text-gray-600 leading-6 line-clamp-2">
          {listing.description || "Chưa có mô tả."}
        </p>
      </div>

      {/* Thông tin phòng */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-900 mb-2">
          Diện tích & Phòng
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">
            {listing.bedrooms} Phòng ngủ
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">
            {listing.bathrooms} Phòng tắm
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-sm">
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
        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50">
          Liên hệ
        </button>
        <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">
          Đặt lịch
        </button>
      </div>
    </div>
  </div>
</aside>

  );
}
