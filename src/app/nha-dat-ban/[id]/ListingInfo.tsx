"use client";

import { Listing } from "@/app/types/products";
import React from "react";


export default function ListingInfo({ listing }: { listing: Listing }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
      <p className="mb-1">{listing.address}</p>
      <p className="text-red-600 font-bold text-lg mb-2">{listing.price_total_text}</p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>Diện tích đất: {listing.area_land} m²</p>
        <p>Diện tích xây: {listing.area_built} m²</p>
        <p>Phòng ngủ: {listing.bedrooms}</p>
        <p>Phòng tắm: {listing.bathrooms}</p>
        <p>Số tầng: {listing.floors}</p>
        <p>Hướng: {listing.direction}</p>
        <p>Đường rộng: {listing.road_width}m</p>
      </div>

      <p className="mt-4">{listing.description}</p>
    </div>
  );
}
