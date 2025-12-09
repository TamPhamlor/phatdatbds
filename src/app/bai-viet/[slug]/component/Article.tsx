"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Post } from "../../component/types";
import { Tag } from "./bai-viet.types";
import { Share2, Facebook, Copy, Check, MessageCircle } from "lucide-react";

interface ArticleProps {
  post: Post;
  relatedPosts: Post[];
}

export function Article({ post, relatedPosts }: ArticleProps) {
  const [expanded, setExpanded] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <article className="lg:col-span-8">
      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm relative w-full aspect-[16/9]">
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Info Section */}
      <section className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-3 md:p-5">
        <div className="items-start justify-between gap-3 md:flex-nowrap">
          <h1 className="text-2xl md:text-3xl mb-1 md:mb-2 font-semibold text-gray-900">
            {post.title}
          </h1>
          <div className="relative flex gap-2">
            {/* Share Button */}
            <div className="relative">
              <div className="relative inline-block">
                <button
                  onClick={() => setOpenShare(!openShare)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-gray-200 bg-white p-2 sm:px-3 sm:py-1.5 text-sm hover:bg-gray-50"
                >
                  <Share2 className="w-4 h-4 sm:mr-1 flex-shrink-0" />
                  <span className="hidden sm:inline">Chia sẻ</span>
                </button>

                {openShare && (
                  <div className="absolute mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg p-2 z-50">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg hover:bg-gray-50"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      Facebook
                    </a>

                    <a
                      href={`https://zalo.me/share?url=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg hover:bg-gray-50"
                    >
                      <MessageCircle className="w-4 h-4 text-sky-500" />
                      Zalo
                    </a>

                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2 px-2 py-2 text-sm w-full rounded-lg hover:bg-gray-50"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Sao chép link
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 sm:px-3 sm:py-1.5 text-sm hover:bg-gray-50">
              <svg
                className="w-4 h-4 sm:mr-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m12 21-1.45-1.32C6 15.36 3 12.28 3 8.5A4.5 4.5 0 0 1 7.5 4 5.4 5.4 0 0 1 12 6.09 5.4 5.4 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.78-3 6.86-7.55 11.18L12 21z" />
              </svg>
              <span className="hidden sm:inline">Lưu</span>
            </button>
          </div>
        </div>

        {/* Author */}
        <div className="mt-3 items-center gap-3 text-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 relative rounded-full overflow-hidden">
              <Image
                src={"https://i.pravatar.cc/64"}
                alt={post.author.full_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="font-medium text-gray-900">
                {post.author.full_name}
              </div>
              <div className="text-gray-500">
                <span>
                  {new Date(post.published_at).toLocaleDateString("vi-VN")}
                </span>{" "}
                • <span>{post.reading_minutes} phút đọc</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {post.post_types.map((pt) => (
              <span
                key={pt.id}
                className="inline-block rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium"
              >
                {pt.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag: Tag) => (
            <Link
              key={tag.id}
              href={`/?q=${encodeURIComponent(tag.name)}`}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-4 prose prose-sm sm:prose-base max-w-none prose-headings:scroll-mt-20 transition-all duration-300 overflow-hidden">
        <div
          className={`${expanded ? "" : "max-h-[300px] overflow-hidden"}`}
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\r\n\r\n/g, "<p>"),
          }}
        />
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            {expanded ? "Thu gọn ▲" : "Xem thêm ▼"}
          </button>
        </div>
      </section>

      {/* Related Posts */}
      <section className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Bài viết liên quan</div>
          <Link href="#top" className="text-sm text-indigo-600 hover:underline">
            Về danh sách
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {relatedPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/bai-viet/${p.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition p-2"
            >
              <div className="w-28 sm:w-32 aspect-[4/3] relative flex-none overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={p.cover_image_url}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500">
                  {new Date(p.published_at).toLocaleDateString("vi-VN")}
                </div>
                <div className="mt-0.5 font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600">
                  {p.title}
                </div>
                <div className="mt-1 text-[11px] text-gray-500 truncate">
                  #
                  {p.tags
                    .map((t) => t.name)
                    .slice(0, 3)
                    .join(" #")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
