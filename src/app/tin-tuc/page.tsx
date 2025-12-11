import { ClientFilter } from "./ClientFilter";
import { ApiResponse, Post } from "./component/types";
import { apiRequestWithCache } from '@/lib/api';

export const dynamic = "force-dynamic"; // Buộc SSR

interface PageProps {
  searchParams: Promise<{ tag?: string; q?: string; cat?: string }>;
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await apiRequestWithCache("/api/v1/posts", 60);
    const data: ApiResponse = await res.json();
    if (data.success) return data.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return [];
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const posts = await fetchPosts();

  return (
    <div className="bg-gray-50">
      <ClientFilter
        posts={posts}
        initialTag={params.tag}
        initialQuery={params.q}
        initialCat={params.cat}
      />
    </div>
  );
}
