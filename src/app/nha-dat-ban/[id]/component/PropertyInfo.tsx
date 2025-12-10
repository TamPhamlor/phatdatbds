import { Listing } from "@/app/types/products";

interface PropertyInfoProps {
  listing: Listing;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ listing }) => {
  return (
    <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-4 md:p-5">
      {/* Tiêu đề và giá */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
          {listing.title}
        </h1>
        
        {/* Giá tiền nổi bật màu đỏ - nằm dưới tiêu đề */}
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl sm:text-3xl font-bold text-red-600">
            {listing.price_total_text}
          </span>
          {listing.price_per_m2_text && (
            <span className="text-sm text-gray-500">
              • {listing.price_per_m2_text}/m²
            </span>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4 text-emerald-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{listing.address}</span>
        </div>
      </div>

      {/* Thông tin nhanh */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700">
          {listing.bedrooms} Phòng ngủ
        </span>
        <span className="rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700">
          {listing.bathrooms} Phòng tắm
        </span>
        <span className="rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700">
          {listing.area_land} m²
        </span>
        {listing.direction?.name && (
          <span className="rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-sm text-emerald-700">
            Hướng {listing.direction.name}
          </span>
        )}
      </div>
    </section>
  );
};

export default PropertyInfo;
