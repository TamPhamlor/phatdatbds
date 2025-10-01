import { Post } from './types';
import PostCard from './PostCard';
import NoResults from '@/app/components/NoResults';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const handleClearFilters = () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
    window.location.reload();
  };

  return (
    <main className="lg:col-span-9">
      {posts && posts.length > 0 ? (
        <div id="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div id="emptyState" className="text-center py-16">
          <NoResults
            title="Không tìm thấy bài viết"
            description="Hãy thử từ khóa khác, đổi chuyên mục hoặc chọn “Tất cả”."
            actionText="Xoá bộ lọc"
            onAction={handleClearFilters}
          />
        </div>
      )}
    </main>
  );
}
