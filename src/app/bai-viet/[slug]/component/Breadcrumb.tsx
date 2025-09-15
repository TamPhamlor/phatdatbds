import Link from "next/link";

export function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <nav className="text-sm text-gray-500">
        <a href="#" className="hover:text-gray-700">Trang chủ</a>
        <span className="mx-2">/</span>
        <Link href="/bai-viet" className="hover:text-gray-700">Bài viết</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{title}</span>
      </nav>
    </div>
  );
}