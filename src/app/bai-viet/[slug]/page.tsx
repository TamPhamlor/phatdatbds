// app/bai-viet/[slug]/page.tsx
import { Metadata } from "next";
import { Post } from "./component/bai-viet.types";
import PostLayout from "./PostLayout";

async function fetchPost(slug: string): Promise<Post> {
  const res = await fetch(`https://phatdatbatdongsan.com/api/v1/posts/${slug}`, {
    next: { revalidate: 60 }
  });
  const data = await res.json();
  return data.data as Post;
}

async function fetchRelatedPosts(categoryCode: string, excludeId: number): Promise<Post[]> {
  const res = await fetch(
    `https://phatdatbatdongsan.com/api/v1/posts?category=${categoryCode}&limit=5`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  if (!data.success) return [];
  return data.data.data.filter((p: Post) => p.id !== excludeId);
}

// ✅ SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = await fetchPost(slug);

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
  const post = await fetchPost(slug);
  const relatedPosts = await fetchRelatedPosts(post.category?.code || "", post.id);

  return <PostLayout post={post} relatedPosts={relatedPosts} />;
}
