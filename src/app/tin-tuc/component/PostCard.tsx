import Link from "next/link";
import Image from "next/image";
import { Post } from "./types";

interface PostCardProps {
  post: Post;
}

// SVG Icons
const HeartIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function PostCard({ post }: PostCardProps) {
  const category = post.post_types?.[0]?.name || "Tin tức";

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-200/50 transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div className="order-1 w-full h-44 sm:h-40 relative overflow-hidden">
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Category Badge on Image */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-medium shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Author Info */}
      <div className="order-2 px-3 pt-3 pb-2 flex items-center gap-2">
        <Image
          className="rounded-full ring-2 ring-emerald-100"
          src={`https://i.pravatar.cc/40?img=${post.author_id}`}
          alt="tác giả"
          width={32}
          height={32}
          unoptimized
        />
        <div className="leading-tight min-w-0 flex-1">
          <div className="font-medium text-sm text-gray-900 truncate">
            {post.author.full_name}
          </div>
          <div className="text-[11px] text-gray-400">
            {new Date(post.published_at).toLocaleDateString("vi-VN")}
          </div>
        </div>
      </div>

      {/* Title + Summary */}
      <div className="order-3 px-3 pb-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.summary}</p>

        {/* Stats & CTA */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors">
              <HeartIcon />
              <span>124</span>
            </span>
            <span className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors">
              <CommentIcon />
              <span>12</span>
            </span>
            <span className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors">
              <EyeIcon />
              <span>1.2k</span>
            </span>
          </div>
          <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 text-xs font-medium group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all">
            Xem chi tiết
          </span>
        </div>
      </div>
    </Link>
  );
}
