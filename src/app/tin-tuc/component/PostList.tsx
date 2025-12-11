"use client";

import { useState, useEffect } from "react";
import { Post } from "./types";
import PostCard from "./PostCard";
import NoResults from "@/app/components/NoResults";

interface PostListProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 8;

export default function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset về trang 1 khi posts thay đổi (do filter)
  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

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

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll lên đầu danh sách
    const gridElement = document.getElementById("grid");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Tạo mảng số trang để hiển thị
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
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {/* Prev button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-emerald-200 bg-white hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-10 h-10 flex items-center justify-center text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
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

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-emerald-200 bg-white hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Page info */}
          {totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Trang {currentPage} / {totalPages} • Hiển thị {startIndex + 1}-
              {Math.min(startIndex + POSTS_PER_PAGE, sortedPosts.length)} trong{" "}
              {sortedPosts.length} bài viết
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
