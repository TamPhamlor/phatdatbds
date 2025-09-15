"use client"

export default function FilterPanel({ isOpen }: { isOpen: boolean, className?: string }) {
  return (
    <aside
      className={`
        w-80 shrink-0
        transition-all duration-300
        ${isOpen ? 'ml-0 opacity-100 pointer-events-auto' : '-ml-80 opacity-0 pointer-events-none'}
      `}
      style={{ willChange: 'margin-left, opacity' }}
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="mb-3 font-semibold text-gray-900">Bộ lọc khách hàng</div>
        
        {/* Giá bất động sản */}
        <details open className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M6 12h12M9 18h6" />
              </svg>
              Giá bất động sản
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              Từ 21 triệu trở lên
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              Từ 11 triệu đến 20 triệu
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              Từ 100 nghìn đến 10 triệu
            </label>
            <div className="pt-2">
              <div className="text-gray-600 mb-2">Khoảng giá 10 triệu – 21 triệu</div>
              <input type="range" className="w-full" min="10" max="50" defaultValue="30" />
            </div>
          </div>
        </details>

        {/* Loại bất động sản */}
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 21V8.5A2.5 2.5 0 0 1 6.5 6H18a3 3 0 0 1 3 3V21M3 11h18" />
              </svg>
              Loại bất động sản
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Căn hộ</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600" /> Nhà đơn lập</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Nhà trệt</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Chung cư / Nhà phố</label>
          </div>
        </details>

        {/* Phòng */}
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 21V7a2 2 0 0 1 2-2h12v16M4 10h16" />
              </svg>
              Số phòng
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <button className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50">2 Phòng ngủ</button>
            <button className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50">1 Phòng tắm</button>
            <button className="col-span-2 rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50">Thêm phòng</button>
          </div>
        </details>

        {/* Tiện ích */}
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
              Tiện ích
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Hồ bơi</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Phòng gym</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Bãi đậu xe</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Thân thiện với thú cưng</label>
          </div>
        </details>

        {/* Hướng nhà */}
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M2 12h20" />
              </svg>
              Hướng nhà
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> Bắc</label>
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> Nam</label>
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> Đông</label>
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> Tây</label>
          </div>
        </details>

        {/* Năm xây dựng */}
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 2v4M16 2v4" />
              </svg>
              Năm xây dựng
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <select className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500">
              <option value="">Bất kỳ</option>
              <option value="2020">2020 trở lên</option>
              <option value="2010">2010 – 2019</option>
              <option value="2000">2000 – 2009</option>
              <option value="1990">Trước 2000</option>
            </select>
          </div>
        </details>
      </div>
    </aside>
  );
}
