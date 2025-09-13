'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Post } from '../../component/types';
import { Tag } from './bai-viet.types';

interface ArticleProps {
  post: Post;
  relatedPosts: Post[];
}

export function Article({ post, relatedPosts }: ArticleProps) {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/?q=${encodeURIComponent(tag)}`);
  };

  const handleRelatedClick = (id: number) => {
    router.push(`/post/${id}`);
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
      <section className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {post.title}
          </h1>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="m12 21-1.45-1.32C6 15.36 3 12.28 3 8.5A4.5 4.5 0 0 1 7.5 4 5.4 5.4 0 0 1 12 6.09 5.4 5.4 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.78-3 6.86-7.55 11.18L12 21z"
              />
            </svg>
            Lưu
          </button>
        </div>

        {/* Author */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 relative rounded-full overflow-hidden">
              <Image
                src={'https://i.pravatar.cc/64'}
                alt={post.author.full_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="font-medium text-gray-900">{post.author.full_name}</div>
              <div className="text-gray-500">
                <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span> •{' '}
                <span>{post.reading_minutes} phút đọc</span>
              </div>
            </div>
          </div>
          <span className="ml-auto inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium">
            {post.post_types[0]?.name || 'Tin tức'}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag: Tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section
        className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-6 prose prose-sm sm:prose-base max-w-none prose-headings:scroll-mt-20"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\r\n\r\n/g, '<p>') }}
      />

      {/* Related Posts */}
      <section className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Bài viết liên quan</div>
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Về danh sách
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {relatedPosts.map((p) => (
            <button
              key={p.id}
              onClick={() => handleRelatedClick(p.id)}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition p-2"
            >
              <div className="w-32 aspect-[4/3] relative flex-none overflow-hidden rounded-lg bg-gray-100">
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
                  {new Date(p.published_at).toLocaleDateString('vi-VN')}
                </div>
                <div className="mt-0.5 font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600">
                  {p.title}
                </div>
                <div className="mt-1 text-[11px] text-gray-500 truncate">
                  #{p.tags.map((t) => t.name).slice(0, 3).join(' #')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}
