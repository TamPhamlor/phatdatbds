import { ClientFilter } from "./ClientFilter";
import { ApiResponse, Post } from "./component/types";
import { apiRequestWithCache } from "@/lib/api";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    tag?: string;
    q?: string;
    cat?: string;
    page?: string;
  }>;
}

// Map category code sang type id (cần điều chỉnh theo API thực tế)
const categoryToTypeId: Record<string, number> = {
  news: 2,
  guide: 3,
  tips: 4,
  review: 5,
  tutorial: 1,
  market: 6,
};

async function fetchPosts(params: {
  search?: string;
  typeId?: number;
  tagId?: number;
  page?: number;
}): Promise<ApiResponse["data"] | null> {
  try {
    const queryParams = new URLSearchParams();

    if (params.search) {
      queryParams.set("search", params.search);
    }
    if (params.typeId) {
      queryParams.append("types[]", params.typeId.toString());
    }
    if (params.tagId) {
      queryParams.append("tags[]", params.tagId.toString());
    }
    if (params.page && params.page > 1) {
      queryParams.set("page", params.page.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/v1/posts${queryString ? `?${queryString}` : ""}`;

    const res = await apiRequestWithCache(endpoint, 60);
    const data: ApiResponse = await res.json();

    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return null;
}

// Fetch tất cả posts để lấy danh sách tags (cho sidebar)
async function fetchAllTags(): Promise<Post[]> {
  try {
    const res = await apiRequestWithCache("/api/v1/posts", 300);
    const data: ApiResponse = await res.json();
    if (data.success) return data.data.data;
  } catch {
    console.error("Error fetching tags");
  }
  return [];
}

export default async function TinTucPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const typeId = params.cat ? categoryToTypeId[params.cat] : undefined;
  const page = params.page ? parseInt(params.page, 10) : 1;

  // Fetch all posts first để lấy tag id nếu có tag filter
  const allPostsForTags = await fetchAllTags();
  
  // Tìm tag id từ tag name
  let tagId: number | undefined;
  if (params.tag) {
    for (const post of allPostsForTags) {
      const foundTag = post.tags?.find(t => t.name === params.tag);
      if (foundTag) {
        tagId = foundTag.id;
        break;
      }
    }
  }

  const postsData = await fetchPosts({
    search: params.q,
    typeId,
    tagId,
    page,
  });

  return (
    <div className="bg-gray-50">
      <ClientFilter
        posts={postsData?.data || []}
        pagination={
          postsData
            ? {
                currentPage: postsData.current_page,
                lastPage: postsData.last_page,
                total: postsData.total,
                perPage: postsData.per_page,
              }
            : null
        }
        allPostsForTags={allPostsForTags}
        initialCat={params.cat || "all"}
        initialQuery={params.q || ""}
        initialTag={params.tag || ""}
      />
    </div>
  );
}
