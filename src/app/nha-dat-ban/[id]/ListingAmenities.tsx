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
    <div className="mt-2">
      <h2 className="text-xl font-semibold mb-3">Tiện ích</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 list-disc list-inside text-gray-700">
        {amenities.map((amenity) => (
          <li
            key={amenity.id}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {amenity.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
