"use client";

import React from "react";
import ImageGallery from "./ImageGallery";
import ListingInfo from "./ListingInfo";
import ListingAmenities from "./ListingAmenities";
import { Listing } from "@/app/types/products";
import Map from "./Map";
import AuthorCard from "./AuthorCard";
import ListingSummary from "./ListingSummary";

interface ListingDetailProps {
  listing: Listing;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  return (
    <div className="container-std py-6">
      {/* Hình ảnh */}
      <ImageGallery images={listing.images} title={listing.title} />

      {/* Thông tin mẫu */}
      <ListingSummary
      listing={listing}
      />

      {/* Thông tin cơ bản */}
      <ListingInfo listing={listing} />

      {/* Tiện ích */}
      <ListingAmenities amenities={listing.amenities} />

      <AuthorCard
        author={listing.author || "Phát Đạt"}
        phone="0909123456"
        avatar="https://i.pravatar.cc/150?img=3"
        publishedAt={listing.published_at}
      />

      {/* Map */}
      <Map
        lat={listing.lat}
        lng={listing.lng}
      />
    </div>
  );
}
