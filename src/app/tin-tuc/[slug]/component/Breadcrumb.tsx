import Link from "next/link";

export function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="container-std py-2 px-0 md:px-4">
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href="/tin-tuc" className="hover:text-emerald-600 transition-colors">Tin tức</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{title}</span>
      </nav>
    </div>
  );
}
