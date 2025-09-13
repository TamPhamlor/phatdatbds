'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../component/types';
import { normalize } from 'path';
import Image from 'next/image';


// Mock posts for search (replace with API in production)
const MOCK_POSTS: Post[] = [
  // Same as in page.tsx
];

interface PostSearchProps {
  isMobile?: boolean;
}

export function PostSearch({ isMobile = false }: PostSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const qn = normalize(query);
      const matches = MOCK_POSTS.filter((p) => normalize(p.title).includes(qn)).slice(0, 8);
      setResults(matches);
    }, 150);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleNavigate = (id: number) => {
    router.push(`/post/${id}`);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
      <div className="text-sm font-semibold mb-2">Tìm kiếm bài viết</div>
      <label className="relative block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
            <path strokeWidth="1.8" d="M20 20l-3.5-3.5" />
          </svg>
        </span>
        <input
          className="w-full rounded-full bg-white pl-9 pr-3 py-2 text-sm text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nhập tiêu đề bài viết..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <ul className={`mt-3 space-y-2 max-h-${isMobile ? '56' : '64'} overflow-auto no-scrollbar`}>
        {results.length === 0 && (
          <li className="text-xs text-gray-500">Không có kết quả</li>
        )}
        {results.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => handleNavigate(p.id)}
              className="flex items-center gap-3 group w-full text-left"
            >
              <Image
  src={p.cover_image_url}
  alt={p.title}
  width={48}        // tương ứng w-12
  height={48}       // tương ứng h-12
  className="rounded-lg object-cover border border-gray-200"
  unoptimized
/>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                  {p.title}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(p.published_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}