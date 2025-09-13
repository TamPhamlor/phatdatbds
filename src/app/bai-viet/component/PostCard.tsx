"use client";
import Link from "next/link";
import Image from "next/image"; 
import { Post } from "./types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const category = post.post_types[0]?.name || "Unknown";

  return (
    <article className="card rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm flex flex-col">
      <div className="order-1 sm:order-2 px-3 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="authorAvatar rounded-full"
            src={`https://i.pravatar.cc/40?img=${post.author_id}`}
            alt="author"
            width={36}
            height={36}
            unoptimized
          />
          <div className="leading-tight">
            <div className="authorName font-semibold text-sm text-gray-900">
              {post.author.full_name}
            </div>
            <div className="text-[12px] text-gray-400 flex items-center gap-1">
              <span className="date">
                {new Date(post.published_at).toLocaleDateString("vi-VN")}
              </span>
              <span>•</span>
              <span className="badge inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-[2px]">
                {category}
              </span>
            </div>
          </div>
        </div>
        <button className="p-1 rounded-full hover:bg-gray-100" aria-label="more">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
          </svg>
        </button>
      </div>

      {/* Cover Image */}
      <div className="order-2 sm:order-1 w-full h-52 sm:h-40 relative">
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover rounded-t-2xl"
          unoptimized
        />
      </div>

      <div className="order-3 p-3 flex-1 flex flex-col">
        <h3 className="title font-semibold text-gray-900">{post.title}</h3>
        <p className="excerpt mt-1 text-sm text-gray-600">{post.summary}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-xs text-gray-500">👍 124 • 💬 12</div>
          <Link
            href={`/bai-viet/${post.slug}`}
            className="rounded-full bg-indigo-600 text-white px-3 py-1 text-xs hover:bg-indigo-700"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
