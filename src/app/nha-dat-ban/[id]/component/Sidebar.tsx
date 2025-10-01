import { Listing } from "@/app/types/products";

interface SidebarProps {
  listing: Listing;
}

const Sidebar: React.FC<SidebarProps> = ({ listing }) => {
  return (
    <aside className="lg:col-span-4">
      <div className="lg:sticky lg:top-20 space-y-4">
        {/* Giá và thế chấp */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="text-xl font-bold">
            {listing.price_total_text}
            <span className="text-base text-gray-500 font-normal">/tổng</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">Ước tính khoản vay thế chấp</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-xl border border-gray-200 p-3 text-center">
              <div className="font-semibold">$1,200</div>
              <div className="text-gray-500">/tháng</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-3 text-center">
              <div className="font-semibold">$60k</div>
              <div className="text-gray-500">Trả trước</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-3 text-center">
              <div className="font-semibold">3.5%</div>
              <div className="text-gray-500">Lãi suất</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50">
              Liên hệ
            </button>
            <a
              href="#schedule"
              className="flex-1 text-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700"
            >
              Đặt lịch xem
            </a>
          </div>
        </div>

        {/* Thông tin chính */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="font-semibold mb-3">Thông tin chính</div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
            <dt>Trạng thái</dt><dd>Đang bán</dd>
            <dt>Loại</dt><dd>Nhà đơn lập</dd>
            <dt>Năm xây dựng</dt><dd>2019</dd>
            <dt>Hệ thống làm mát</dt><dd>Trung tâm</dd>
            <dt>Hệ thống sưởi</dt><dd>Gas</dd>
            <dt>Mã MLS</dt><dd># 882731</dd>
          </dl>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
