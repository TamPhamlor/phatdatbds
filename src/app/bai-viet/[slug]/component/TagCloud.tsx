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
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
      <div className="text-sm font-semibold mb-3">Tags phổ biến</div>
      <div className="flex flex-wrap gap-2">
        {MOCK_TAGS.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
          >
            #{tag} <span className="text-gray-400">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}