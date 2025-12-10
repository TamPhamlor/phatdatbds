"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Post } from "../../component/types";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

interface Tag {
  id: number;
  code: string;
  name: string;
  pivot: {
    post_id: number;
    tag_id: number;
  };
}



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
      console.error("Sao chép thất bại:", err);
    }
  };

  return (
    <article className="lg:col-span-8">
      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm relative w-full aspect-[16/9]">
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Info Section */}
      <section className="mt-4 rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-3 md:p-5">
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
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-emerald-100 bg-white/80 backdrop-blur-sm p-2 sm:px-3 sm:py-1.5 text-sm hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                >
                  <Share2 className="w-4 h-4 sm:mr-1 flex-shrink-0 text-emerald-600" />
                  <span className="hidden sm:inline text-gray-700">Chia sẻ</span>
                </button>

                {openShare && (
                  <div className="absolute mt-2 w-44 rounded-xl border border-emerald-100 bg-white/95 backdrop-blur-md shadow-lg shadow-emerald-500/10 p-2 z-50">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <FaFacebook className="w-4 h-4 text-blue-600" />
                      Facebook
                    </a>

                    <a
                      href={`https://zalo.me/share?url=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-sky-500" />
                      Zalo
                    </a>

                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2 px-2 py-2 text-sm w-full rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-gray-500" />
                          Sao chép liên kết
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button className="inline-flex items-center justify-center rounded-full border border-emerald-100 bg-white/80 backdrop-blur-sm p-2 sm:px-3 sm:py-1.5 text-sm hover:bg-emerald-50 hover:border-emerald-200 transition-all">
              <svg
                className="w-4 h-4 sm:mr-1 text-emerald-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m12 21-1.45-1.32C6 15.36 3 12.28 3 8.5A4.5 4.5 0 0 1 7.5 4 5.4 5.4 0 0 1 12 6.09 5.4 5.4 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.78-3 6.86-7.55 11.18L12 21z" />
              </svg>
              <span className="hidden sm:inline text-gray-700">Lưu</span>
            </button>
          </div>
        </div>

        {/* Author */}
        <div className="mt-3 items-center gap-3 text-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 relative rounded-full overflow-hidden ring-2 ring-emerald-100">
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
                className="inline-block rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1 text-xs font-medium border border-emerald-100/50"
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
              className="inline-flex items-center rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="mt-4 rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-4 md:p-8">
        <div
          className={`prose prose-sm md:prose-base max-w-none [&>p]:mb-6 [&>p]:md:mb-7
            prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4 md:prose-headings:mt-10 md:prose-headings:mb-5
            prose-h2:text-lg prose-h2:md:text-xl
            prose-h3:text-base prose-h3:md:text-lg
            prose-p:text-gray-700 prose-p:leading-7 prose-p:text-[15px] prose-p:md:text-base
            prose-a:text-emerald-600 prose-a:font-medium hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:my-5 prose-ul:pl-5 prose-li:mb-2 prose-li:text-gray-700 prose-li:text-[15px] prose-li:md:text-base
            prose-ol:my-5 prose-ol:pl-5
            prose-img:rounded-xl prose-img:my-6
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-sm prose-blockquote:md:text-base prose-blockquote:my-6
            ${expanded ? "" : "max-h-[400px] overflow-hidden relative"}`}
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\r\n\r\n/g, "<p>"),
          }}
        />
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/95 to-transparent pointer-events-none" />
        )}
        <div className="text-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
          >
            {expanded ? (
              <>
                Thu gọn
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </>
            ) : (
              <>
                Đọc tiếp bài viết
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Related Posts */}
      <section className="mt-4 rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-gray-900">Bài viết liên quan</div>
          <Link href="/tin-tuc" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
            Về danh sách
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {relatedPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/tin-tuc/${p.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-emerald-100/50 bg-white/80 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all p-2"
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
                <div className="mt-0.5 font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
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
