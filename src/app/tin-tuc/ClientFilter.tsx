"use client";
import { useState } from 'react';
import { Post, FilterState } from './component/types';
import Toolbar from './component/Toolbar';
import Sidebar, { MobileSidebar } from './component/Sidebar';
import PostList from './component/PostList';

interface ClientFilterProps {
  posts: Post[];
}

export function ClientFilter({ posts }: ClientFilterProps) {
  const [state, setState] = useState<FilterState>({ q: '', cat: 'all', tag: '' });

  const normalize = (s: string) =>
    (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd');

  const applyFilter = () => {
    const qn = normalize(state.q);
    const tnorm = normalize(state.tag);
    return posts.filter((p) => {
      const okCat = state.cat === 'all' || p.post_types.some((pt) => pt.code === state.cat);
      const okTitle = !qn || normalize(p.title).includes(qn);
      const okTag = !tnorm || p.tags.map((t) => normalize(t.name)).includes(tnorm);
      return okCat && okTitle && okTag;
    });
  };

  const handleReset = () => setState({ q: '', cat: 'all', tag: '' });
  const handleTagClick = (tag: string) => setState({ ...state, tag: state.tag === tag ? '' : tag });
  const handleHotPostClick = (title: string) => setState({ ...state, q: title });

  const filteredPosts = applyFilter();

  return (
    <>
      <Toolbar state={state} setState={setState} onReset={handleReset} />
      <div className="container-std mb-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            <span className="font-medium">
              Tìm thấy <span className="text-emerald-600 font-semibold">{filteredPosts.length}</span> bài viết
              {(state.q || state.tag || state.cat !== 'all') && (
                <span className="text-gray-400 ml-1">phù hợp</span>
              )}
            </span>
          </div>
          {filteredPosts.length > 0 && (
            <div className="text-xs text-gray-400">
              Sắp xếp theo mới nhất
            </div>
          )}
        </div>
      </div>
      <div className="container-std pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Sidebar
            posts={posts}
            onTagClick={handleTagClick}
            onHotPostClick={handleHotPostClick}
            activeTag={state.tag}
          />
          <PostList posts={filteredPosts} />
        </div>
        {/* Mobile Sidebar - hiển thị ở cuối trang trên mobile */}
        <div className="mt-8">
          <MobileSidebar
            posts={posts}
            onTagClick={handleTagClick}
            onHotPostClick={handleHotPostClick}
            activeTag={state.tag}
          />
        </div>
      </div>
    </>
  );
}