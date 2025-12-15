import Link from "next/link";
import Image from "next/image";
import { Post } from "./types";

interface PostCardProps {
  post: Post;
}



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
          src="/phatdat_avatar.jpg"
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

        {/* Tags & CTA */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 flex-wrap">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-medium border border-emerald-100"
              >
                #{tag.name}
              </span>
            ))}
            {post.tags.length > 2 && (
              <div className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-medium border border-emerald-100">
                +{post.tags.length - 2}
              </div>
            )}
          </div>
          <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 text-xs font-medium group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all whitespace-nowrap">Xem chi tiết</span>
        </div>
      </div>
    </Link>
  );
}
