"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Post } from './types';

interface SidebarProps {
  posts: Post[];
  onTagClick: (tag: string) => void;
  onHotPostClick: (title: string) => void;
  activeTag: string;
}

export default function Sidebar({ posts, onTagClick, onHotPostClick, activeTag }: SidebarProps) {
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const tagMap = new Map<string, number>();
    posts.forEach((post) =>
      post.tags.forEach((tag) => {
        tagMap.set(tag.name, (tagMap.get(tag.name) || 0) + 1);
      })
    );
    const sortedTags = Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 16);
    setTags(sortedTags);
  }, [posts]);

  const sortedPosts = [...posts]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 5);

  const renderHotList = (id: string) => (
    <ul id={id} className="space-y-3">
      {sortedPosts.map((post) => (
        <li key={post.id}>
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              onHotPostClick(post.title);
            }}
          >
            <div className="w-full h-13 relative rounded-xl overflow-hidden border border-gray-200">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium text-sm text-gray-900 group-hover:text-indigo-600">{post.title}</div>
              <div className="text-xs text-gray-500">{new Date(post.published_at).toLocaleDateString('vi-VN')}</div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <details className="lg:hidden rounded-2xl border border-gray-200 bg-white shadow-sm mb-4">
        <summary className="list-none px-4 py-3 text-sm font-semibold text-gray-800 cursor-pointer flex items-center justify-between">
          Khám phá & lọc nâng cao
          <svg className="w-5 h-5 text-gray-400 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className="p-4 space-y-4">
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="text-sm font-semibold mb-3">Dự án được ghim</div>
            <div className="rounded-xl overflow-hidden relative w-full h-36">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800"
                alt="Williamsburg Inn-Castilling"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-3 font-semibold">Williamsburg Inn-Castilling</div>
            <div className="text-sm text-gray-500">Evergreen 10, Jakarta</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm font-bold">$ 345.00<span className="text-gray-500 font-normal">/month</span></div>
              <a href="#" className="rounded-full bg-indigo-600 text-white px-3 py-1 text-xs hover:bg-indigo-700">Xem chi tiết</a>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="text-sm font-semibold mb-3">Bài viết hot</div>
            {renderHotList('hotListMobile')}
          </div>
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="text-sm font-semibold mb-3">Tags phổ biến</div>
            <div id="tagCloudMobile" className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  className={`tagBtn inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 ${
                    activeTag === tag.name ? 'ring-1 ring-indigo-100 shadow text-gray-900' : ''
                  }`}
                  onClick={() => onTagClick(tag.name)}
                >
                  #{tag.name} <span className="text-gray-400">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </details>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="lg:sticky lg:top-20 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <div className="text-sm font-semibold mb-3">Dự án được ghim</div>
            <div className="rounded-xl overflow-hidden relative w-full h-36">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800"
                alt="Williamsburg Inn-Castilling"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-3 font-semibold">Williamsburg Inn-Castilling</div>
            <div className="text-sm text-gray-500">Evergreen 10, Jakarta</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm font-bold">$ 345.00<span className="text-gray-500 font-normal">/month</span></div>
              <a href="#" className="rounded-full bg-indigo-600 text-white px-3 py-1 text-xs hover:bg-indigo-700">Xem chi tiết</a>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <div className="text-sm font-semibold mb-3">Bài viết hot</div>
            {renderHotList('hotList')}
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <div className="text-sm font-semibold mb-3">Tags phổ biến</div>
            <div id="tagCloud" className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  className={`tagBtn inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 ${
                    activeTag === tag.name ? 'ring-1 ring-indigo-100 shadow text-gray-900' : ''
                  }`}
                  onClick={() => onTagClick(tag.name)}
                >
                  #{tag.name} <span className="text-gray-400">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
