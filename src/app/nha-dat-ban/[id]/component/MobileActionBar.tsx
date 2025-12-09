import { Listing } from "@/app/types/products";

interface MobileActionBarProps {
  listing: Listing;
}

const MobileActionBar: React.FC<MobileActionBarProps> = ({ listing }) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-base font-semibold">{listing.price_total_text}<span className="text-gray-500 text-sm font-normal">/total</span></div>
        <a href="#schedule" className="rounded-full bg-indigo-600 text-white px-5 py-2 text-sm hover:bg-indigo-700">Schedule</a>
      </div>
    </div>
  );
};

export default MobileActionBar;