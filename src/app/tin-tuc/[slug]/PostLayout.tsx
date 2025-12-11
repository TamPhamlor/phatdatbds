// app/posts/PostLayout.tsx
"use client";

import { ReactNode, useEffect } from "react";
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
  // Scroll to top khi vào trang - fix iOS Safari
  useEffect(() => {
    // Disable scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Force scroll to top với delay cho iOS
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Breadcrumb title={post.title} />
      <main className="container-std py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Article post={post} relatedPosts={relatedPosts} />
          <Sidebar relatedPosts={relatedPosts} />
        </div>
        {children}
      </main>
    </div>
  );
}
