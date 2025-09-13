// app/bai-viet/[slug]/page.tsx

import { Post } from "./component/bai-viet.types";
import PostLayout from "./PostLayout";


async function fetchPost(slug: string): Promise<Post> {
  const res = await fetch(`https://phatdatbatdongsan.com/api/v1/posts/${slug}`, { cache: 'no-store' });
  const data = await res.json();
  return data.data as Post;
}

async function fetchRelatedPosts(categoryCode: string, excludeId: number): Promise<Post[]> {
  const res = await fetch(`https://phatdatbatdongsan.com/api/v1/posts?category=${categoryCode}&limit=5`, { cache: 'no-store' });
  const data = await res.json();
  if (!data.success) return [];
  return data.data.data.filter((p: Post) => p.id !== excludeId);
}

// ✨ Accept `params` as a Promise
export default async function Page({ params }: { params: { slug: string } }) {
  // wrap params in Promise.resolve to satisfy Next.js
  const { slug } = await Promise.resolve(params);

  const post = await fetchPost(slug);
  const relatedPosts = await fetchRelatedPosts(post.category?.code || '', post.id);

  return <PostLayout post={post} relatedPosts={relatedPosts} />;
}
