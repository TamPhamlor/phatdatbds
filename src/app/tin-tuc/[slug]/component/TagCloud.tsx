'use client';

import { useRouter } from 'next/navigation';

// Mock tags (replace with API in production)
const MOCK_TAGS: [string, number][] = [
  ['Thị trường bất động sản', 5],
  ['TP. Hồ Chí Minh', 3],
  ['Đồng Nai', 2],
  ['Căn hộ', 4],
];

export function TagCloud() {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-4">
      <div className="text-sm font-semibold mb-3 text-gray-800">Thẻ phổ biến</div>
      <div className="flex flex-wrap gap-2">
        {MOCK_TAGS.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
          >
            #{tag} <span className="text-gray-400">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
