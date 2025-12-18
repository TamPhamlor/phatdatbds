"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { Post } from "../../component/types";
import { Copy, Check, X, ZoomIn, ZoomOut } from "lucide-react";

interface Tag {
  id: number;
  code: string;
  name: string;
  pivot: {
    post_id: number;
    tag_id: number;
  };
}

interface SavedPost {
  slug: string;
  title: string;
  cover_image_url: string;
  published_at: string;
  savedAt: string;
}

interface ArticleProps {
  post: Post;
  relatedPosts: Post[];
}

export function Article({ post, relatedPosts }: ArticleProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Đóng lightbox
  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    setLightboxCaption("");
    setIsZoomed(false);
    document.body.style.overflow = "";
  }, []);

  // Toggle zoom
  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Xử lý overflow và ESC key khi lightbox mở
  useEffect(() => {
    if (!lightboxImage) return;
    
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage, closeLightbox]);

  // Dùng event delegation để xử lý click ảnh
  const handleContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    // Tìm img hoặc figure gần nhất
    const img = target.closest("img") as HTMLImageElement | null;
    const figure = target.closest("figure") as HTMLElement | null;
    
    let imgSrc: string | null = null;
    let caption = "";
    
    if (img) {
      imgSrc = img.src;
      caption = img.alt || "";
    }
    
    if (figure) {
      const figImg = figure.querySelector("img");
      const figCaption = figure.querySelector("figcaption");
      if (figImg) {
        imgSrc = figImg.src;
        // Ưu tiên figcaption, sau đó là alt
        caption = figCaption?.textContent || figImg.alt || "";
      }
    }
    
    if (imgSrc) {
      e.preventDefault();
      e.stopPropagation();
      setLightboxImage(imgSrc);
      setLightboxCaption(caption);
    }
  }, []);

  // Set cursor cho ảnh và figure
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const figures = container.querySelectorAll("figure");
    figures.forEach((figure) => {
      (figure as HTMLElement).style.cursor = "zoom-in";
    });

    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      (img as HTMLElement).style.cursor = "zoom-in";
    });
  }, [post.content]);

  const copyLink = async () => {
    try {
      // Lấy URL hiện tại ngay khi click để đảm bảo đúng đường dẫn
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Sao chép thất bại:", err);
    }
  };

  const savePost = () => {
    try {
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
      const postData = {
        slug: post.slug,
        title: post.title,
        cover_image_url: post.cover_image_url,
        published_at: post.published_at,
        savedAt: new Date().toISOString()
      };
      
      const isAlreadySaved = savedPosts.some((p: SavedPost) => p.slug === post.slug);
      
      if (isAlreadySaved) {
        // Remove from saved
        const updatedPosts = savedPosts.filter((p: SavedPost) => p.slug !== post.slug);
        localStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
        setSaved(false);
      } else {
        // Add to saved
        savedPosts.unshift(postData);
        localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
        setSaved(true);
      }
    } catch (err) {
      console.error("Lưu bài viết thất bại:", err);
    }
  };

  // Check if post is already saved on mount
  useEffect(() => {
    try {
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
      const isAlreadySaved = savedPosts.some((p: SavedPost) => p.slug === post.slug);
      setSaved(isAlreadySaved);
    } catch (err) {
      console.error("Kiểm tra bài viết đã lưu thất bại:", err);
    }
  }, [post.slug]);

  return (
    <article className="lg:col-span-8">
      {/* Cover Image - mobile: tràn viền full width */}
      <div className="overflow-hidden md:rounded-2xl md:bg-white/70 md:backdrop-blur-md md:border md:border-emerald-100/50 md:shadow-sm relative w-screen left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0 aspect-[16/9]">
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Info Section - mobile: bỏ border/padding để đồng bộ với content */}
      <section className="mt-4 md:rounded-2xl md:bg-white/70 md:backdrop-blur-md md:border md:border-emerald-100/50 md:shadow-sm p-0 md:p-5">
        <div>
          <h1 className="text-2xl md:text-3xl mb-1 md:mb-2 font-semibold text-gray-900">
            {post.title}
          </h1>
        </div>

        {/* Author */}
        <div className="mt-3 items-center gap-3 text-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 relative rounded-full overflow-hidden ring-2 ring-emerald-100">
              <Image
                src={"/phatdat_avatar.jpg"}
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


      </section>

      {/* Content - mobile: bỏ padding/border để tăng diện tích */}
      <section className="mt-4 md:rounded-2xl md:bg-white/70 md:backdrop-blur-md md:border md:border-emerald-100/50 md:shadow-sm p-0 md:p-8">
        <div
          ref={contentRef}
          onClick={handleContentClick}
          className="article-content prose prose-sm md:prose-base max-w-none
            [&>*]:!text-[15px] [&>*]:!md:text-base
            [&>p]:mb-2 [&>p]:leading-7 [&>p]:text-gray-700
            [&>div]:mb-2
            [&_p+p]:mt-2 [&_div+div]:mt-2 [&_p+div]:mt-2 [&_div+p]:mt-2
            prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:mt-6 prose-headings:mb-3 md:prose-headings:mt-8 md:prose-headings:mb-4
            prose-h2:!text-lg prose-h2:md:!text-xl
            prose-h3:!text-base prose-h3:md:!text-lg
            prose-a:text-emerald-600 prose-a:font-medium hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:my-4 prose-ul:pl-5 prose-li:mb-2 prose-li:text-gray-700
            prose-ol:my-4 prose-ol:pl-5
            prose-img:rounded-xl prose-img:my-5
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-5
            [&_table]:w-full [&_table]:border-collapse [&_table]:my-5 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-emerald-200
            [&_thead]:bg-gradient-to-r [&_thead]:from-emerald-500 [&_thead]:to-teal-500
            [&_th]:!text-white [&_th]:!font-semibold [&_th]:!text-left [&_th]:px-3 [&_th]:py-2.5 [&_th]:!text-sm [&_th]:border-b [&_th]:border-emerald-300
            [&_tbody_tr]:border-b [&_tbody_tr]:border-emerald-100 [&_tbody_tr:last-child]:border-0
            [&_tbody_tr:nth-child(even)]:bg-emerald-50/50
            [&_tbody_tr]:hover:bg-emerald-50 [&_tbody_tr]:transition-colors
            [&_td]:px-3 [&_td]:py-2.5 [&_td]:text-gray-700 [&_td]:!text-sm"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\r\n\r\n/g, "<p>"),
          }}
        />
      </section>

      {/* Share, Save & Tags - cuối bài viết */}
      <section className="mt-6 md:rounded-2xl md:bg-white/70 md:backdrop-blur-md md:border md:border-emerald-100/50 md:shadow-sm p-0 md:p-5">
        {/* Tags */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Thẻ bài viết:</div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: Tag) => (
              <Link
                key={tag.id}
                href={`/tin-tuc?tag=${encodeURIComponent(tag.name)}`}
                className="inline-flex items-center rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Share & Save Buttons - Gọn với gradient emerald */}
        <div className="pt-4 border-t border-emerald-100/50">
          <div className="text-sm font-medium text-gray-700 mb-3">Chia sẻ bài viết này:</div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Copy Link Button */}
            <button
              onClick={copyLink}
              className={`flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                copied
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white hover:from-emerald-500 hover:to-teal-500'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Đã sao chép
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Sao chép liên kết
                </>
              )}
            </button>

            {/* Save Button */}
            <button
              onClick={savePost}
              className={`flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                saved
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-emerald-100 hover:to-teal-100 hover:text-emerald-700'
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 21-1.45-1.32C6 15.36 3 12.28 3 8.5A4.5 4.5 0 0 1 7.5 4 5.4 5.4 0 0 1 12 6.09 5.4 5.4 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.78-3 6.86-7.55 11.18L12 21z" />
              </svg>
              {saved ? 'Đã lưu' : 'Lưu bài viết'}
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/70 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Toolbar */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isZoomed ? "Thu nhỏ" : "Phóng to"}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image container - flex grow để chiếm hết không gian */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div
              className={`relative transition-transform duration-300 ${
                isZoomed 
                  ? "cursor-zoom-out overflow-auto max-h-full w-full" 
                  : "cursor-zoom-in w-full md:w-auto flex items-center justify-center"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImage}
                alt={lightboxCaption || "Ảnh phóng to"}
                className={`transition-all duration-300 ${
                  isZoomed
                    ? "max-w-none w-auto h-auto"
                    : "max-h-[70vh] w-full md:w-auto md:max-w-[90vw] object-contain md:rounded-lg shadow-2xl"
                }`}
              />
            </div>
          </div>

          {/* Caption - cố định ở dưới, luôn hiển thị */}
          {lightboxCaption && (
            <div 
              className="flex-none bg-black/50 py-3 px-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/90 text-sm max-w-2xl mx-auto">
                {lightboxCaption}
              </p>
            </div>
          )}

          {/* Hint - chỉ hiện trên desktop, khi không có caption */}
          {!lightboxCaption && (
            <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              Nhấn ESC hoặc click bên ngoài để đóng
            </div>
          )}
        </div>
      )}

      {/* Related Posts - chỉ hiện trên mobile, đồng bộ với content */}
      <section className="lg:hidden mt-4 md:rounded-2xl md:bg-white/70 md:backdrop-blur-md md:border md:border-emerald-100/50 md:shadow-sm p-0 md:p-5">
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
