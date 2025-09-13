"use client"
import { Listing } from './types';
import DetailPanel from './DetailPanel';

interface MobileDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
}

export default function MobileDetailDrawer({ isOpen, onClose, listing }: MobileDetailDrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      ></div>

      {/* Drawer content */}
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl p-4 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-gray-900">Project Detail</div>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        <DetailPanel listing={listing} isOpen={true} />
      </div>
    </div>
  );
}
