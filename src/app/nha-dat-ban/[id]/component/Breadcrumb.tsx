import { Listing } from "@/app/types/products";
import Link from "next/link";

interface BreadcrumbProps {
  listing: Listing;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ listing }) => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex items-center justify-between">
        <nav className="text-sm text-gray-500 flex">
          <Link href="/" className="hover:text-gray-700">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/nha-dat-ban" className="hover:text-gray-700">Bất động sản</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{listing.title}</span>
        </nav>
        <div className="hidden sm:flex items-center gap-2">
          <button 
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.876v-6.987h-2.54v-2.889h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.631.772-1.631 1.562v1.877h2.773l-.443 2.889h-2.33v6.987C18.343 21.127 22 17 22 12z"/>
            </svg>
            Chia sẻ
          </button>
          <button className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 21-1.45-1.32C6 15.36 3 12.28 3 8.5A4.5 4.5 0 0 1 7.5 4 5.4 5.4 0 0 1 12 6.09 5.4 5.4 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.78-3 6.86-7.55 11.18L12 21z"/>
            </svg>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
