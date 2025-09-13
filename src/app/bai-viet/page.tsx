import { ClientFilter } from "./ClientFilter";
import { ApiResponse, Post } from "./component/types";


// Server Component
export default async function Home() {
  // Fetch posts từ server
  let posts: Post[] = [];
  try {
    const res = await fetch('https://phatdatbatdongsan.com/api/v1/posts');
    const data: ApiResponse = await res.json();
    if (data.success) posts = data.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="bg-gray-50">
      {/* ClientFilter sẽ xử lý Toolbar, Sidebar và lọc bài viết */}
      <ClientFilter posts={posts} />
    </div>
  );
}