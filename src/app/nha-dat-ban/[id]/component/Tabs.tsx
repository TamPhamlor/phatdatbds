"use client";

import { useState } from "react";
import { Listing } from "@/app/types/products";

interface TabsProps {
  listing: Listing;
}

const Tabs: React.FC<TabsProps> = ({ listing }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "nearby" | "reviews">("overview");
  const [showFullOverview, setShowFullOverview] = useState(false);

  return (
    <section className="rounded-2xl bg-white border border-gray-200 shadow-sm">
      {/* Tabs header */}
      <div className="px-5 pt-4">
        <div className="flex gap-4 text-sm font-medium">
          <button
            className={`tab-btn ${activeTab === "overview" ? "text-indigo-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "amenities" ? "text-indigo-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("amenities")}
          >
            Amenities
          </button>
          <button
            className={`tab-btn ${activeTab === "nearby" ? "text-indigo-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("nearby")}
          >
            Nearby
          </button>
          <button
            className={`tab-btn ${activeTab === "reviews" ? "text-indigo-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Tabs content */}
      <div className="p-5">
        {/* Overview */}
        <div className={`${activeTab === "overview" ? "" : "hidden"} space-y-5`}>
          <p className={`text-gray-700 leading-7 ${showFullOverview ? "" : "line-clamp-3"}`}>
            {listing.description}
          </p>
          <button
            className="text-indigo-600 text-sm font-medium hover:underline"
            onClick={() => setShowFullOverview(!showFullOverview)}
          >
            {showFullOverview ? "Thu gọn" : "Xem thêm"}
          </button>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="font-semibold mb-2">Highlights</div>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Open-plan living & dining</li>
                <li>South-facing garden with patio</li>
                <li>Energy efficient windows</li>
                <li>Smart home integration</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="font-semibold mb-2">Property Facts</div>
              <dl className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                <dt>Lot Size</dt><dd>{listing.area_land} m²</dd>
                <dt>Parking</dt><dd>2 cars</dd>
                <dt>HOA</dt><dd>$120/mo</dd>
                <dt>MLS</dt><dd># 882731</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className={`${activeTab === "amenities" ? "" : "hidden"}`}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {listing.amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-2 rounded-xl border border-gray-200 p-3">
                <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 11h18v10H3z"/>
                  <path d="M7 11V7a5 5 0 1 1 10 0v4H7z"/>
                </svg>
                {amenity.name}
              </div>
            ))}
          </div>
        </div>

        {/* Nearby */}
        <div className={`${activeTab === "nearby" ? "" : "hidden"} space-y-4`}>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <iframe
              className="w-full h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${listing.lat},${listing.lng}&output=embed`}
            />
          </div>
        </div>

        {/* Reviews */}
        <div className={`${activeTab === "reviews" ? "" : "hidden"} space-y-4`}>
          {/* Reviews content here */}
        </div>
      </div>
    </section>
  );
};

export default Tabs;
