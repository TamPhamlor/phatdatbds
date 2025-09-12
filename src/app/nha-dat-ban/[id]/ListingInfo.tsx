"use client";

import { Listing } from "@/app/types/products";
import {
  SquareFoot,
  Hotel,
  Bathtub,
  Layers,
  Explore,
  AltRoute,
} from "@mui/icons-material";
import React, { useState } from "react";

export default function ListingInfo({ listing }: { listing: Listing }) {
  const [showFull, setShowFull] = useState(false);

  // Giới hạn ký tự mô tả
  const MAX_LENGTH = 220;
  const isLongText = listing.description.length > MAX_LENGTH;
  const displayText = showFull
    ? listing.description
    : listing.description.slice(0, MAX_LENGTH);

  return (
    <div className="mt-2">
      {/* Thông tin mô tả */}
      <div className="mb-2">
        <h2 className="font-bold text-lg mb-2">Thông tin mô tả</h2>
        <p className="text-gray-700 font-semibold leading-relaxed whitespace-pre-line border-b pb-3 border-gray-200">
          {displayText}
          {!showFull && isLongText && "... "}
          <br />
          {isLongText && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="mt-2 text-blue-600 font-medium hover:underline"
          >
            {showFull ? " Thu gọn" : "Xem thêm"}
          </button>
        )}
        </p>

        
      </div>

      {/* Đặc điểm bất động sản */}
      <div>
        <h2 className="font-semibold text-lg">Đặc điểm bất động sản</h2>
        <div className="grid md:grid-cols-2 gap-x-10 text-sm text-gray-800">
          {/* Cột trái */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <SquareFoot className="text-gray-500" fontSize="small" />
                <span>Diện tích đất</span>
              </div>
              <span>{listing.area_land} m²</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Layers className="text-gray-500" fontSize="small" />
                <span>Diện tích xây</span>
              </div>
              <span>{listing.area_built} m²</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Hotel className="text-gray-500" fontSize="small" />
                <span>Số phòng ngủ</span>
              </div>
              <span>{listing.bedrooms} phòng</span>
            </div>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Bathtub className="text-gray-500" fontSize="small" />
                <span>Số phòng tắm</span>
              </div>
              <span>{listing.bathrooms} phòng</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <AltRoute className="text-gray-500" fontSize="small" />
                <span>Số tầng</span>
              </div>
              <span>{listing.floors}</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Explore className="text-gray-500" fontSize="small" />
                <span>Hướng</span>
              </div>
              <span>{listing.direction}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
