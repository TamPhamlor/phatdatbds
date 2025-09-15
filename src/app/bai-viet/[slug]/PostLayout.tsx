// app/posts/PostLayout.tsx
import { ReactNode } from "react";
import { Breadcrumb } from "./component/Breadcrumb";
import { MobileSidebar } from "./component/MobileSidebar";
import { Sidebar } from "./component/Sidebar";
import { Article } from "./component/Article";
import { Post } from "./component/bai-viet.types";

interface PostLayoutProps {
  post: Post;
  relatedPosts: Post[];
  children?: ReactNode; // optional slot if needed
}

export default function PostLayout({ post, relatedPosts, children }: PostLayoutProps) {
  return (
    <div className="bg-gray-50">
      <Breadcrumb title={post.title} />
      <MobileSidebar />
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Article post={post} relatedPosts={relatedPosts} />
          <Sidebar />
        </div>
        {children}
      </main>
    </div>
  );
}
