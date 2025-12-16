// app/tin-tuc/[slug]/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Post } from "../component/types";
import PostLayout from "./PostLayout";
import { generateArticleSchema, SITE_URL } from "@/lib/seo";

import { apiRequestWithCache } from '@/lib/api';

interface PostResponse {
  success: boolean;
  data: Post;
  relative: Post[];
}

async function fetchPost(slug: string): Promise<{ post: Post; relative: Post[] } | null> {
  try {
    const res = await apiRequestWithCache(`/api/v1/posts/${slug}`, 86400);
    if (!res.ok) return null;
    const json: PostResponse = await res.json();
    if (!json?.data) return null;
    return {
      post: json.data,
      relative: json.relative || [],
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// ✅ SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const result = await fetchPost(slug);

  // Nếu không tìm thấy bài viết, trả về metadata mặc định
  if (!result) {
    return {
      title: "Bài viết không tồn tại | Phát Đạt Bất Động Sản",
      description: "Bài viết bạn tìm kiếm không tồn tại hoặc đã được gỡ bỏ.",
    };
  }

  const post = result.post;

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.summary,
    keywords: post.meta_keywords,
    alternates: {
      canonical: post.canonical_url,
    },
    openGraph: {
      title: post.og_title || post.meta_title,
      description: post.og_description || post.meta_description,
      images: post.og_image ? [{ url: post.og_image }] : [],
      type: "article",
      locale: post.locale || "vi_VN",
    },
    robots: {
      index: post.robots_index,
      follow: post.robots_follow,
    },
  };
}

// ✅ Page render
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);
  const result = await fetchPost(slug);
  
  // ✅ Nếu không tìm thấy bài viết, redirect đến trang 404 HTML tĩnh
  if (!result) {
    redirect('/not-found.html');
  }
  
  const { post, relative: relatedPosts } = result;

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.summary || post.meta_description || "",
    url: `${SITE_URL}/tin-tuc/${post.slug}`,
    image: post.cover_image_url || post.og_image || "",
    datePublished: post.published_at,
    dateModified: post.updated_at,
    authorName: post.author?.full_name || "Phát Đạt Bất Động Sản",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <PostLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}
