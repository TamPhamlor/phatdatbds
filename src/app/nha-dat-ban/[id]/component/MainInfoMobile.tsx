"use client";

import { useState } from "react";
import { Listing } from "@/app/types/products";

interface MainInfoMobileProps {
  listing: Listing;
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    active: "Đang bán",
    sold: "Đã bán",
    pending: "Đang chờ",
    draft: "Nháp",
  };
  return statusMap[status] || "Đang bán";
};

const MainInfoMobile: React.FC<MainInfoMobileProps> = ({ listing }) => {
  const [showAll, setShowAll] = useState(false);

  const allInfo = [
    { label: "Trạng thái", value: getStatusText(listing.status), highlight: true, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Diện tích đất", value: listing.area_land ? `${listing.area_land} m²` : null, icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
    { label: "Diện tích xây dựng", value: listing.area_built && parseFloat(listing.area_built) > 0 ? `${listing.area_built} m²` : null, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { label: "Chiều ngang", value: listing.width && parseFloat(listing.width) > 0 ? `${listing.width} m` : null, icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
    { label: "Chiều dài", value: listing.length && parseFloat(listing.length) > 0 ? `${listing.length} m` : null, icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" },
    { label: "Số tầng", value: listing.floors > 0 ? `${listing.floors} tầng` : null, icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
    { label: "Phòng ngủ", value: listing.bedrooms > 0 ? `${listing.bedrooms} phòng` : null, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Phòng tắm", value: listing.bathrooms > 0 ? `${listing.bathrooms} phòng` : null, icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
    { label: "Hướng", value: listing.direction || null, icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Đường trước nhà", value: listing.road_width && parseFloat(listing.road_width) > 0 ? `${listing.road_width} m` : null, icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
    { label: "Mặt tiền", value: listing.frontage ? "Có" : null, highlight: listing.frontage, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { label: "Mã tin", value: `# ${listing.id}`, icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14" },
  ].filter(item => item.value !== null);

  const visibleInfo = showAll ? allInfo : allInfo.slice(0, 4);
  const hasMore = allInfo.length > 4;

  return (
    <div className="lg:hidden space-y-4">
      {/* Thông tin chính */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </span>
          Thông tin chính
        </div>
        <dl className="space-y-0 text-sm rounded-xl overflow-hidden">
          {visibleInfo.map((item, index) => (
            <div key={item.label} className={`flex items-center justify-between py-3 px-3 ${index % 2 === 0 ? "bg-emerald-50/50" : "bg-white/50"}`}>
              <dt className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.label}
              </dt>
              <dd className={`font-semibold ${item.highlight ? "text-emerald-600" : "text-gray-900"}`}>{item.value}</dd>
            </div>
          ))}
        </dl>
        {hasMore && (
          <button onClick={() => setShowAll(!showAll)} className="mt-3 w-full flex items-center justify-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
            {showAll ? (
              <>
                Thu gọn
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
              </>
            ) : (
              <>
                Xem thêm ({allInfo.length - 4})
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </>
            )}
          </button>
        )}
      </div>

      {/* Cam kết từ Phát Đạt */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          Cam kết từ Phát Đạt
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/30 p-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Pháp lý rõ ràng, minh bạch</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/30 p-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Cam kết giá tốt nhất thị trường</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/30 p-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Hỗ trợ tư vấn 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoMobile;
