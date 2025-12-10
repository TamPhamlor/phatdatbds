// app/posts/PostLayout.tsx
import { ReactNode } from "react";
import { Breadcrumb } from "./component/Breadcrumb";
import { Sidebar } from "./component/Sidebar";
import { Article } from "./component/Article";
import { Post } from "../component/types";

interface PostLayoutProps {
  post: Post;
  relatedPosts: Post[];
  children?: ReactNode; // optional slot if needed
}

export default function PostLayout({
  post,
  relatedPosts,
  children,
}: PostLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Breadcrumb title={post.title} />
      <main className="container-std py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Article post={post} relatedPosts={relatedPosts} />
          <Sidebar />
        </div>
        {children}
      </main>
    </div>
  );
}
