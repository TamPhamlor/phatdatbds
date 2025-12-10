import { Listing } from "@/app/types/products";
import { PHONE_CONTACT, telLink } from "@/lib/config";

interface MobileActionBarProps {
  listing: Listing;
}

const MobileActionBar: React.FC<MobileActionBarProps> = ({ listing }) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-emerald-100 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="container-std py-2.5 flex items-center justify-between gap-2">
        {/* Thông tin giá và diện tích */}
        <div className="min-w-0 flex-1">
          <div className="text-lg font-bold text-red-600 leading-tight">
            {listing.price_total_text} <span className="text-xs font-medium">VNĐ</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
            <span>{listing.area_land}m²</span>
            {listing.bedrooms > 0 && (
              <>
                <span className="text-gray-300">•</span>
                <span>{listing.bedrooms}PN</span>
              </>
            )}
            {listing.bathrooms > 0 && (
              <>
                <span className="text-gray-300">•</span>
                <span>{listing.bathrooms}WC</span>
              </>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={telLink(PHONE_CONTACT)}
            className="w-9 h-9 rounded-full border border-emerald-200 bg-white flex items-center justify-center hover:bg-emerald-50 transition-all"
            aria-label="Gọi điện"
          >
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a
            href="#lich-hen"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all whitespace-nowrap"
          >
            Đặt lịch xem
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileActionBar;