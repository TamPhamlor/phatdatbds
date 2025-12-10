"use client";
import { useEffect } from "react";
import FilterPanel from './FilterPanel';
import { MetaListing } from "@/app/types/products";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  meta?: MetaListing | null;
}

export default function MobileFilterDrawer({ isOpen, onClose, meta }: MobileFilterDrawerProps) {
  // 🚀 Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black/30 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          absolute inset-y-0 left-0 w-11/12 max-w-sm bg-white shadow-xl p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          pointer-events-auto flex flex-col
        `}
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center justify-end mb-2 shrink-0">
          <button className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors" onClick={onClose}>
            <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Nội dung cuộn trong drawer */}
        <div className="flex-1 overflow-y-auto">
          {isOpen && (
            <FilterPanel
              meta={meta}
              onFilter={() => {
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
