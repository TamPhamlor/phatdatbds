import { PostSearch } from "./PostSearch";
import { ProjectAd } from "./ProjectAd";

export function MobileSidebar() {
  return (
    <details className="lg:hidden container-std mt-2 mb-2 rounded-2xl border border-emerald-100/50 bg-white/70 backdrop-blur-md shadow-sm">
      <summary className="list-none px-4 py-3 text-sm font-semibold text-gray-800 cursor-pointer flex items-center justify-between">
        Tìm nhanh & dự án
        <svg
          className="w-5 h-5 text-emerald-500 transition group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="p-4 space-y-4 pt-0">
        <PostSearch isMobile />
        <ProjectAd
          title="Khách sạn Williamsburg - Castilling"
          location="Số 10 Evergreen, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội"
          price="≈ 8.600.000 VNĐ"
          imageUrl="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200"
        />
      </div>
    </details>
  );
}
