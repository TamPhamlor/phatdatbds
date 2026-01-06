"use client";

import { useState, useEffect, useRef } from "react";
import { FilterState } from "./types";

interface ToolbarProps {
  state: FilterState;
  setState: (state: FilterState) => void;
  onReset: () => void;
}

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "news", label: "Tin tức" },
  { id: "guide", label: "Hướng dẫn" },
  { id: "tips", label: "Mẹo hay" },
  { id: "review", label: "Đánh giá" },
  { id: "tutorial", label: "Kiến thức" },
  { id: "market", label: "Thị trường" },
];

export default function Toolbar({ state, setState, onReset }: ToolbarProps) {
  const [localQuery, setLocalQuery] = useState(state.q);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync localQuery khi state.q thay đổi từ bên ngoài (reset filter)
  useEffect(() => {
    setLocalQuery(state.q);
  }, [state.q]);

  // Debounce search - 2s delay
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (localQuery !== state.q) {
        setState({ ...state, q: localQuery });
      }
    }, 2000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localQuery]);

  const hasFilters = state.cat !== "all" || state.q || state.tag;

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50/50 to-white/50">
      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="container-std py-6">
          {/* Search */}
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm bài viết theo tiêu đề, nội dung..."
                className="w-full pl-12 pr-12 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-500 placeholder:text-gray-400"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalQuery("");
                    setState({ ...state, q: "" });
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Danh mục bài viết
              </h3>
              {hasFilters && (
                <button type="button" onClick={onReset} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Xóa bộ lọc
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                    state.cat === cat.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200 shadow-sm"
                  }`}
                  onClick={() => setState({ ...state, cat: cat.id })}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
              <div className="flex items-center gap-2 text-sm text-emerald-700 flex-wrap">
                <span className="font-medium">Bộ lọc:</span>
                {state.cat !== "all" && <span className="px-2 py-1 bg-emerald-100 rounded-full text-xs">{categories.find((c) => c.id === state.cat)?.label}</span>}
                {state.q && <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">&quot;{state.q}&quot;</span>}
                {state.tag && <span className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs">#{state.tag}</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="container-std py-4">
          <details className="rounded-2xl border border-emerald-100/50 bg-white/70 shadow-sm">
            <summary className="list-none px-4 py-3 text-sm font-semibold text-gray-800 cursor-pointer flex items-center justify-between">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Tìm kiếm & lọc danh mục
                {hasFilters && <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>}
              </span>
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm bài viết</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-4-4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm bài viết..."
                    className="w-full pl-10 pr-10 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                  />
                  {localQuery && (
                    <button type="button" onClick={() => {
                      setLocalQuery("");
                      setState({ ...state, q: "" });
                    }} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                        state.cat === cat.id
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                          : "bg-white text-gray-700 border border-gray-200 shadow-sm"
                      }`}
                      onClick={() => setState({ ...state, cat: cat.id })}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <div className="pt-2 border-t border-emerald-100/50">
                  <button type="button" onClick={onReset} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
