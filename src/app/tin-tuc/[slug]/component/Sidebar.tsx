import Link from "next/link";
import Image from "next/image";
import { TagCloud } from "./TagCloud";
import { Post } from "../../component/types";

interface SidebarProps {
  relatedPosts?: Post[];
}

export function Sidebar({ relatedPosts = [] }: SidebarProps) {
  return (
    <aside className="lg:col-span-4">
      <div className="lg:sticky lg:top-24 space-y-4">
        {/* Related Posts - chỉ hiện trên desktop */}
        {relatedPosts.length > 0 && (
          <section className="hidden lg:block rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Bài viết liên quan
              </div>
            </div>
            <div className="space-y-3">
              {relatedPosts.slice(0, 5).map((p) => (
                <Link
                  key={p.slug}
                  href={`/tin-tuc/${p.slug}`}
                  className="group flex gap-3 rounded-xl border border-emerald-100/50 bg-white/80 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all p-2"
                >
                  <div className="w-20 aspect-[4/3] relative flex-none overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={p.cover_image_url}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-500">
                      {new Date(p.published_at).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {p.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/tin-tuc"
              className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Xem tất cả bài viết
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        )}

        <TagCloud />
      </div>
    </aside>
  );
}
