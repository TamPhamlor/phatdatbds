"use client";
import { useState } from 'react';
import { Post, FilterState } from './component/types';
import Toolbar from './component/Toolbar';
import Sidebar from './component/Sidebar';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-3">
        <div id="resultInfo" className="text-sm text-gray-500 px-2 py-1">
          {filteredPosts.length} bài viết
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Sidebar
            posts={posts}
            onTagClick={handleTagClick}
            onHotPostClick={handleHotPostClick}
            activeTag={state.tag}
          />
          <PostList posts={filteredPosts} />
        </div>
      </div>
    </>
  );
}