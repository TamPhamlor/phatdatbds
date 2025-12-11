"use client";

import Link from "next/link";

// Tags phổ biến
const POPULAR_TAGS: string[] = [
  "Thị trường bất động sản",
  "Nhơn Trạch",
  "Đồng Nai",
  "Đất nền",
  "Pháp lý",
  "Đầu tư",
];

export function TagCloud() {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-4">
      <div className="text-sm font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        Thẻ phổ biến
      </div>
      <div className="flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => (
          <Link
            key={tag}
            href={`/tin-tuc?tag=${encodeURIComponent(tag)}`}
            className="inline-flex items-center rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
