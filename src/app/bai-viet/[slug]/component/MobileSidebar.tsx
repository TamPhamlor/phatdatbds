
import { PostSearch } from "./PostSearch";
import { ProjectAd } from "./ProjectAd";



export function MobileSidebar() {
  return (
    <details className="lg:hidden max-w-7xl mx-2 px-2 sm:px-6 lg:px-8 mt-2 mb-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <summary className="list-none px-2 py-3 text-sm font-semibold text-gray-800 cursor-pointer flex items-center justify-between">
        Tìm nhanh & dự án
        <svg
          className="w-5 h-5 text-gray-400 transition group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="p-2 space-y-4 pt-0">
        <PostSearch isMobile />
        <ProjectAd
          title="Khách sạn Williamsburg - Castilling"
          location="Số 10 Evergreen, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội, Việt Nam"
          price="8 triệu 6"
          imageUrl="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200"
        />
      </div>
    </details>
  );
}