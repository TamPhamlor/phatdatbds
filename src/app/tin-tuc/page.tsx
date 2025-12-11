import { ClientFilter } from "./ClientFilter";
import { ApiResponse, Post } from "./component/types";

export const dynamic = "force-dynamic"; // Buộc SSR

interface PageProps {
  searchParams: Promise<{ tag?: string; q?: string; cat?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  let posts: Post[] = [];

  try {
    const res = await fetch("https://phatdatbatdongsan.com/api/v1/posts", {
      next: { revalidate: 60 }, // Luôn fetch mới
    });
    const data: ApiResponse = await res.json();
    if (data.success) posts = data.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

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
