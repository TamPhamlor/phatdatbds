"use client";

import React from "react";
import ImageGallery from "./ImageGallery";
import ListingInfo from "./ListingInfo";
import ListingAmenities from "./ListingAmenities";
import { Listing } from "@/app/types/products";


interface ListingDetailProps {
  listing: Listing;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  return (
    <div className="container-std py-6">
      {/* Hình ảnh */}
      <ImageGallery images={listing.images} title={listing.title} />

      {/* Thông tin cơ bản */}
      <ListingInfo listing={listing} />

      {/* Tiện ích */}
      <ListingAmenities amenities={listing.amenities} />
    </div>
  );
}
