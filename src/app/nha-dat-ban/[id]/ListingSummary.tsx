"use client";

import { Listing } from "@/app/types/products";
import { Paid, SquareFoot, Hotel, Share, ThumbDown, FavoriteBorder, Facebook, Link } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { SiZalo } from "react-icons/si";

export default function ListingSummary({ listing }: { listing: Listing }) {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const actionButton = (Icon: React.ElementType, label: string, onClick?: () => void) => (
    <div className="relative flex flex-col items-center cursor-pointer" onClick={onClick}>
      <Icon className="text-gray-500 hover:text-blue-500" fontSize="medium" />
      <span className="absolute -top-6 text-center hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mb-4 mt-4">
      {/* Tên dự án */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
      <p className="text-gray-600 mb-5">{listing.address}</p>

      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 border-b pb-5 border-gray-200">
        {/* Giá */}
        <div className="flex items-center gap-3">
          <Paid className="text-gray-500" fontSize="medium" />
          <div>
            <p className="text-mb text-gray-500">Mức giá</p>
            <p className="text-lg font-bold text-gray-900">{listing.price_total_text}</p>
          </div>
        </div>

        {/* Diện tích */}
        <div className="flex items-center gap-3">
          <SquareFoot className="text-gray-500" fontSize="medium" />
          <div>
            <p className="text-mb text-gray-500">Diện tích</p>
            <p className="text-lg font-semibold text-gray-800">{listing.area_land} m²</p>
          </div>
        </div>

        {/* Phòng ngủ */}
        <div className="flex items-center gap-3">
          <Hotel className="text-gray-500" fontSize="medium" />
          <div>
            <p className="text-mb text-gray-500">Phòng ngủ</p>
            <p className="text-lg font-semibold text-gray-800">{listing.bedrooms} PN</p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex items-center gap-10 mt-5">
          <div className="relative" ref={shareRef}>
            {/* Chia sẻ */}
            {actionButton(Share, "Chia sẻ", () => setShowShare(!showShare))}

            {/* Dropdown chia sẻ */}
            {showShare && (
              <div className="absolute right-0 mt-2 w-45 bg-white border border-gray-200 rounded shadow-lg z-10">
                <ul >
                  <li
                    className="flex items-center gap-2 pl-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                        "_blank"
                      )
                    }
                  >
                    <Facebook fontSize="small" /> Facebook
                  </li>
                  <li
                    className="flex items-center gap-2 pl-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://zalo.me/share?url=${encodeURIComponent(window.location.href)}`,
                        "_blank"
                      )
                    }
                  >
                    <SiZalo fontSize="small" /> Zalo
                  </li>
                  <li
                    className="flex items-center gap-2 pl-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                  >
                    <Link fontSize="small" /> Sao chép liên kết
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Báo xấu */}
          {actionButton(ThumbDown, "Báo xấu")}

          {/* Yêu thích */}
          {actionButton(FavoriteBorder, "Yêu thích")}
        </div>
      </div>
    </div>
  );
}
