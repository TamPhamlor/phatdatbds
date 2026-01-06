"use client";

import { Post } from "./types";
import PostCard from "./PostCard";
import NoResults from "@/app/components/NoResults";
import { ProjectAdDynamic } from "../[slug]/component/ProjectAdDynamic";

interface Pagination {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
}

interface PostListProps {
  posts: Post[];
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

export default function PostList({ posts, pagination, onPageChange }: PostListProps) {
  const handleClearFilters = () => {
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, "", url.toString());
    window.location.reload();
  };

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.lastPage || 1;
  const total = pagination?.total || posts.length;
  const perPage = pagination?.perPage || 10;
  const startIndex = (currentPage - 1) * perPage;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <main className="lg:col-span-8">
      {sortedPosts && sortedPosts.length > 0 ? (
        <>
          <div id="grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedPosts.map((post, index) => (
              <div key={post.id} className="contents">
                <PostCard post={post} />
                {index === 1 && (
                  <div className="sm:hidden col-span-1">
                    <ProjectAdDynamic />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-emerald-200 bg-white hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                      currentPage === page
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                        : "border border-emerald-200 bg-white text-gray-700 hover:bg-emerald-50 hover:border-emerald-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-emerald-200 bg-white hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Trang {currentPage} / {totalPages} • Hiển thị {startIndex + 1}-
              {Math.min(startIndex + perPage, total)} trong {total} bài viết
            </div>
          )}
        </>
      ) : (
        <div id="emptyState" className="text-center py-16">
          <NoResults
            title="Không tìm thấy bài viết"
            description='Hãy thử từ khóa khác, đổi chuyên mục hoặc chọn "Tất cả".'
            actionText="Xoá bộ lọc"
            onAction={handleClearFilters}
          />
        </div>
      )}
    </main>
  );
}
