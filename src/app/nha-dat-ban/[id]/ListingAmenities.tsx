"use client";

import React from "react";

interface Amenity {
  id: number;
  code: string;
  name: string;
  group_name: string;
}

export default function ListingAmenities({ amenities }: { amenities: Amenity[] }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Tiện ích</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {amenities.map((amenity) => (
          <span
            key={amenity.id}
            className="px-3 py-2 bg-gray-100 rounded-xl text-sm"
          >
            {amenity.name}
          </span>
        ))}
      </div>
    </div>
  );
}
