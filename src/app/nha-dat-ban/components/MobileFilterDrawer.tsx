"use client"
import FilterPanel from './FilterPanel';
import { MetaListing } from "@/app/types/products";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  meta?: MetaListing | null;   // thêm props meta
}

export default function MobileFilterDrawer({ isOpen, onClose, meta }: MobileFilterDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black/30 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`
          absolute inset-y-0 left-0 w-11/12 max-w-sm bg-white shadow-xl p-4 overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          pointer-events-auto
        `}
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-gray-900">Customer Filter</div>
          <button className="p-2 rounded-full hover:bg-gray-100" onClick={onClose}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        
        {/* Truyền meta xuống để có dữ liệu thành phố */}
        <FilterPanel isOpen={true} meta={meta} />
      </div>
    </div>
  );
}
