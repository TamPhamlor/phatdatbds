"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "./types";
import { Listing } from "@/app/types/products";

interface SidebarProps {
  posts: Post[];
  onTagClick: (tag: string) => void;
  onHotPostClick: (title: string) => void;
  activeTag: string;
}

// Slug của listing được ghim
const PINNED_LISTING_SLUG = "ban-lo-dat-cln-dgt-xa-dai-phuoc-nhon-trach-3113m2-to-79-thua-27";

// Export MobileSidebar riêng để dùng ở cuối trang
export function MobileSidebar({
  posts,
  onTagClick,
  onHotPostClick,
  activeTag,
}: SidebarProps) {
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

  // ✅ Tối ưu: Chỉ hiển thị tối đa 4 bài viết mới nhất để giảm tải (MobileSidebar)
  const sortedPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 4); // Giới hạn tối đa 4 bài viết nổi bật

  return (
    <div className="lg:hidden space-y-6">
      {/* Hot Posts */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Bài viết nổi bật
        </h3>
        <div className="space-y-3">
          {sortedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              className="group flex items-start gap-3"
              onClick={() => onHotPostClick(post.title)}
            >
              <div className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden relative">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
                  {post.title}
                </h4>
                <div className="mt-1 text-[11px] text-gray-400">
                  {new Date(post.published_at).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Tags */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          </svg>
          Chủ đề phổ biến
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.name}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeTag === tag.name
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700"
              }`}
              onClick={() => onTagClick(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  posts,
  onTagClick,
  onHotPostClick,
  activeTag,
}: SidebarProps) {
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

  // ✅ Tối ưu: Chỉ hiển thị tối đa 4 bài viết mới nhất để giảm tải (Desktop Sidebar)
  const sortedPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 4); // Giới hạn tối đa 4 bài viết nổi bật

  // Bài viết nổi bật với bố cục mới
  const HotPostsList = ({ id }: { id: string }) => (
    <div id={id} className="space-y-3">
      {sortedPosts.map((post, index) => (
        <Link
          key={post.id}
          href={`/tin-tuc/${post.slug}`}
          className="group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-emerald-50/50 transition-all"
          onClick={() => onHotPostClick(post.title)}
        >
          {/* Số thứ tự */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {index + 1}
          </div>

          {/* Ảnh thumbnail */}
          <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden ring-1 ring-emerald-100">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              unoptimized
            />
          </div>

          {/* Nội dung */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
              {post.title}
            </h4>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
              <span>
                {new Date(post.published_at).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  // State cho listing được ghim
  const [pinnedListing, setPinnedListing] = useState<Listing | null>(null);
  const [loadingPinned, setLoadingPinned] = useState(true);

  // Fetch listing được ghim
  useEffect(() => {
    const fetchPinnedListing = async () => {
      try {
        const res = await fetch(`/api/v1/listings/${PINNED_LISTING_SLUG}`);
        const json = await res.json();
        if (json?.data) {
          setPinnedListing(json.data);
        }
      } catch (error) {
        console.error("Error fetching pinned listing:", error);
      } finally {
        setLoadingPinned(false);
      }
    };
    fetchPinnedListing();
  }, []);

  // Render AdCard content
  const renderAdCard = () => {
    if (loadingPinned) {
      return (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/25">
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm p-4">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-36 bg-gray-200 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      );
    }

    if (!pinnedListing) {
      return (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/25">
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm p-4">
            <div className="text-sm text-gray-500 text-center py-4">
              Không thể tải dự án được ghim
            </div>
          </div>
        </div>
      );
    }

    const coverImage =
      pinnedListing.images?.find((i) => i.is_cover)?.url ||
      pinnedListing.images?.[0]?.url;

    return (
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/25">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 animate-pulse"></div>
        <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Dự án được ghim
            </span>
          </div>
          <Link href={`/nha-dat-ban/${pinnedListing.slug}`}>
            <div className="rounded-xl overflow-hidden relative w-full h-36 ring-2 ring-emerald-200/50">
              {coverImage && (
                <Image
                  src={coverImage}
                  alt={pinnedListing.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg">
                  HOT 🔥
                </span>
              </div>
            </div>
          </Link>
          <div className="mt-3 font-semibold text-gray-900 line-clamp-2">
            {pinnedListing.title}
          </div>
          <div className="text-sm text-gray-500 line-clamp-1">
            {pinnedListing.address}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm font-bold text-emerald-600">
              {pinnedListing.price_total_text || pinnedListing.price_total}
            </div>
            <Link
              href={`/nha-dat-ban/${pinnedListing.slug}`}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 text-xs font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Glass card wrapper
  const GlassCard = ({
    children,
    title,
    icon,
  }: {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
  }) => (
    <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon && (
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
            {icon}
          </span>
        )}
        <span className="text-sm font-semibold text-gray-800">{title}</span>
      </div>
      {children}
    </div>
  );

  // Icons
  const FireIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.5 1.5-4.5 3-6 .5-.5 1-1 1.5-1.5.5.5 1 1 1.5 1.5 1.5 1.5 3 3.5 3 6 0 3.866-3.134 7-7 7zm0-12c-1 1-2 2-2.5 3-.5 1-.5 2-.5 3 0 2.761 2.239 5 5 5s5-2.239 5-5c0-1-.5-2-.5-3-.5-1-1.5-2-2.5-3-1.5-1.5-3-3-4-4.5-1 1.5-2.5 3-4 4.5z" />
    </svg>
  );

  const TagIcon = () => (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-4">
        <div className="lg:sticky lg:top-20 space-y-4">
          {renderAdCard()}
          <GlassCard title="Bài viết nổi bật" icon={<FireIcon />}>
            <HotPostsList id="hotList" />
          </GlassCard>
          <GlassCard title="Thẻ phổ biến" icon={<TagIcon />}>
            <div id="tagCloud" className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  className={`tagBtn inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-all ${
                    activeTag === tag.name
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm"
                      : "border-emerald-100 bg-white/80 text-gray-700 hover:bg-emerald-50 hover:border-emerald-200"
                  }`}
                  onClick={() => onTagClick(tag.name)}
                >
                  #{tag.name}{" "}
                  <span className="text-gray-400">({tag.count})</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </aside>
    </>
  );
}
