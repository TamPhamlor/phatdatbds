"use client"
import { Post } from './types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <main className="lg:col-span-9">
      <div id="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div id="emptyState" className={`${posts.length === 0 ? '' : 'hidden'} text-center py-16`}>
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
            <path strokeWidth="1.8" d="M20 20l-3.5-3.5" />
          </svg>
        </div>
        <div className="text-gray-900 font-semibold">Không tìm thấy bài viết</div>
        <p className="text-gray-500 text-sm mt-1">Hãy thử từ khóa khác hoặc chọn “Tất cả”.</p>
      </div>
    </main>
  );
}