"use client";

import { useState, useRef, useEffect } from "react";
import { Listing } from "@/app/types/products";

interface TabsProps {
  listing: Listing;
}

const Tabs: React.FC<TabsProps> = ({ listing }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "amenities" | "nearby" | "reviews"
  >("overview");
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "amenities", label: "Tiện ích", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { id: "nearby", label: "Vị trí", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "reviews", label: "Đánh giá", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    // Scroll section into view
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll active tab into view
  useEffect(() => {
    const activeButton = tabsRef.current?.querySelector(`[data-tab="${activeTab}"]`);
    activeButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm scroll-mt-20">
      {/* Tabs header */}
      <div className="px-4 md:px-5 pt-4 border-b border-emerald-100/50">
        <div ref={tabsRef} className="flex gap-1 overflow-x-auto no-scrollbar pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs content */}
      <div className="p-4 md:p-5">
        {/* Tổng quan */}
        <div className={`${activeTab === "overview" ? "" : "hidden"} space-y-5`}>
          {mounted && (
            <p className={`text-gray-700 leading-7 text-[15px] ${showFullOverview ? "" : "line-clamp-3"}`} dangerouslySetInnerHTML={{ __html: listing.description || '' }}></p>
          )}
          <button
            className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
            onClick={() => setShowFullOverview(!showFullOverview)}
          >
            {showFullOverview ? "Thu gọn" : "Xem thêm"}
            <svg
              className={`w-4 h-4 transition-transform ${showFullOverview ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
            <div className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Điểm nổi bật
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                listing.bedrooms > 0 && `${listing.bedrooms} phòng ngủ rộng rãi`,
                listing.bathrooms > 0 && `${listing.bathrooms} phòng tắm tiện nghi`,
                listing.floors > 0 && `${listing.floors} tầng thiết kế hiện đại`,
                listing.direction && `Hướng ${listing.direction} thoáng mát`,
                listing.frontage && "Mặt tiền đường lớn",
                listing.road_width && parseFloat(listing.road_width) > 0 && `Đường trước nhà ${listing.road_width}m`,
              ].filter(Boolean).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tiện ích */}
        <div className={`${activeTab === "amenities" ? "" : "hidden"}`}>
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => (
              <span
                key={amenity.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm text-emerald-700 font-medium"
              >
                <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {amenity.name}
              </span>
            ))}
          </div>
          {listing.amenities.length === 0 && (
            <p className="text-center text-gray-500 py-8">Chưa có thông tin tiện ích</p>
          )}
        </div>

        {/* Vị trí */}
        <div className={`${activeTab === "nearby" ? "" : "hidden"} space-y-4`}>
          <div className="rounded-xl border border-emerald-100 overflow-hidden">
            <iframe
              className="w-full h-64 md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${listing.lat},${listing.lng}&output=embed`}
            />
          </div>
        </div>

        {/* Đánh giá */}
        <div className={`${activeTab === "reviews" ? "" : "hidden"} space-y-4`}>
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="font-medium text-gray-600">Chưa có đánh giá nào</p>
            <p className="text-sm text-gray-400 mt-1">Hãy là người đầu tiên đánh giá</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tabs;
