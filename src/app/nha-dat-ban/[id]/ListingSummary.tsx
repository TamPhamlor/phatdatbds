"use client";

import { Listing } from "@/app/types/products";
import { Paid, SquareFoot, Hotel } from "@mui/icons-material";
import React from "react";

export default function ListingSummary({ listing }: { listing: Listing }) {
  return (
    <div className="mb-4 mt-4">
      {/* Tên dự án */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
      <p className="text-gray-600 mb-5">{listing.address}</p>

      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b pb-5 border-gray-200">
        {/* Giá */}
        <div className="flex items-center gap-3">
          <Paid className="text-gray-500" fontSize="medium" />
          <div>
            <p className="text-mb text-gray-500">Mức giá</p>
            <p className="text-lg font-bold text-gray-900">
              {listing.price_total_text}
            </p>
          </div>
        </div>

        {/* Diện tích */}
        <div className="flex items-center gap-3">
          <SquareFoot className="text-gray-500" fontSize="medium" />
          <div>
            <p className="text-mb text-gray-500">Diện tích</p>
            <p className="text-lg font-semibold text-gray-800">
              {listing.area_land} m²
            </p>
          </div>
        </div>

        {/* Phòng ngủ */}
        <div className="flex items-center gap-3">
          <Hotel className="text-gray-500" fontSize="medium" />
          <div>
            <p className="text-mb text-gray-500">Phòng ngủ</p>
            <p className="text-lg font-semibold text-gray-800">
              {listing.bedrooms} PN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
