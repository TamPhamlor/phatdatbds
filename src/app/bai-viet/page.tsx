import { ClientFilter } from "./ClientFilter";
import { ApiResponse, Post } from "./component/types";

export const dynamic = 'force-dynamic'; // Buộc SSR

export default async function Home() {
  let posts: Post[] = [];

  try {
    const res = await fetch('https://phatdatbatdongsan.com/api/v1/posts', {
      cache: 'no-store', // Luôn fetch mới
    });
    const data: ApiResponse = await res.json();
    if (data.success) posts = data.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="bg-gray-50">
      <ClientFilter posts={posts} />
    </div>
  );
}
