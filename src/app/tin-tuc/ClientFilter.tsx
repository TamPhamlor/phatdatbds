"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Post, FilterState } from "./component/types";
import Toolbar from "./component/Toolbar";
import Sidebar, { MobileSidebar } from "./component/Sidebar";
import PostList from "./component/PostList";

interface Pagination {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
}

interface ClientFilterProps {
  posts: Post[];
  pagination: Pagination | null;
  allPostsForTags: Post[];
  initialTag?: string;
  initialQuery?: string;
  initialCat?: string;
}

export function ClientFilter({
  posts,
  pagination,
  allPostsForTags,
  initialTag = "",
  initialQuery = "",
  initialCat = "all",
}: ClientFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const state: FilterState = {
    q: initialQuery,
    cat: initialCat,
    tag: initialTag,
  };

  // Cập nhật URL với params mới
  const updateUrl = useCallback(
    (newState: Partial<FilterState & { page?: number }>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Reset page khi thay đổi filter
      if (newState.q !== undefined || newState.cat !== undefined || newState.tag !== undefined) {
        params.delete("page");
      }

      if (newState.q !== undefined) {
        if (newState.q) params.set("q", newState.q);
        else params.delete("q");
      }

      if (newState.cat !== undefined) {
        if (newState.cat && newState.cat !== "all") params.set("cat", newState.cat);
        else params.delete("cat");
      }

      if (newState.tag !== undefined) {
        if (newState.tag) params.set("tag", newState.tag);
        else params.delete("tag");
      }

      if (newState.page !== undefined) {
        if (newState.page > 1) params.set("page", newState.page.toString());
        else params.delete("page");
      }

      const queryString = params.toString();
      router.push(`/tin-tuc${queryString ? `?${queryString}` : ""}`);
    },
    [router, searchParams]
  );

  const setState = (newState: FilterState) => {
    updateUrl(newState);
  };

  const handleReset = () => {
    router.push("/tin-tuc");
  };

  const handleTagClick = (tag: string) => {
    updateUrl({ tag: state.tag === tag ? "" : tag });
  };

  const handleHotPostClick = (title: string) => {
    updateUrl({ q: title });
  };

  const handlePageChange = (page: number) => {
    updateUrl({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              Tìm thấy <span className="text-emerald-600 font-semibold">{pagination?.total || posts.length}</span> bài viết
              {(state.q || state.tag || state.cat !== "all") && <span className="text-gray-400 ml-1">phù hợp</span>}
            </span>
          </div>
          {posts.length > 0 && (
            <div className="text-xs text-gray-400">
              Sắp xếp theo mới nhất
            </div>
          )}
        </div>
      </div>
      <div className="container-std pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Sidebar
            posts={allPostsForTags}
            onTagClick={handleTagClick}
            onHotPostClick={handleHotPostClick}
            activeTag={state.tag}
          />
          <PostList
            posts={posts}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="mt-8">
          <MobileSidebar
            posts={allPostsForTags}
            onTagClick={handleTagClick}
            onHotPostClick={handleHotPostClick}
            activeTag={state.tag}
          />
        </div>
      </div>
    </>
  );
}
