"use client"
import { useState, useEffect } from 'react';

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('Villa');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFilterPanel(false);
      } else {
        setShowFilterPanel(false); // mobile mặc định ẩn
      }
    };
    handleResize();
    setHydrated(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { name: 'House', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10.5L12 3l9 7.5M4.5 9.75V21h15V9.75" /></svg> },
    { name: 'Hotel', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21V8.5A2.5 2.5 0 0 1 5.5 6H18a3 3 0 0 1 3 3V21M3 11h18M7.5 11V7.5m4 3.5V7.5m4 3.5V7.5" /></svg> },
    { name: 'Villa', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c3 0 9 7 9 12a9 9 0 0 1-18 0c0-5 6-12 9-12Zm0 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /></svg> },
    { name: 'Apartment', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 21V6a2 2 0 0 1 2-2h5v17M11 6h7a2 2 0 0 1 2 2v13M7 9h2m-2 4h2m-2 4h2m6-8h2m-2 4h2m-2 4h2" /></svg> },
  ];

  return (
    <section className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar md:flex-wrap p-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 shadow-sm border-0 whitespace-nowrap ${activeCategory === category.name ? 'ring-1 ring-indigo-100 shadow-md text-gray-900' : ''}`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 p-2">
            <label className="relative sm:block">
              <span className="sr-only">Search</span>
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="1.8"></circle>
                  <path strokeWidth="1.8" d="M20 20l-3.5-3.5"></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Ranjinhan City, RC"
                className="w-64 rounded-full bg-white pl-9 pr-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm border-0"
              />
            </label>
            <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 shadow-sm border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h16v12H7l-3 3V4z" />
              </svg>
            </button>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 shadow-sm border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
              </svg>
              Filter
            </button>
          </div>
        </div>
        {hydrated && (
          <div
            className={`
              md:absolute md:right-8 w-full md:w-96 transition-all duration-300 z-[9999]
              ${showFilterPanel ? 'md:opacity-100 md:translate-x-0 md:max-h-[1000px] md:pointer-events-auto' : 'md:hidden'}
              ${showFilterPanel ? 'opacity-100 translate-x-0 max-h-[1000px] pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none max-h-0'}
              overflow-hidden md:overflow-visible
            `}
          >
            <div className="mx-4 md:mx-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="mb-4 text-base font-semibold text-gray-900">Filters</div>
              <div className="space-y-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                  <select
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="hcm">TP Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Xã/Phường</label>
                  <select
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
                    disabled
                  >
                    <option value="">Chọn Xã/Phường</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Giá (Nhỏ - Lớn)</label>
                  <input
                    type="text"
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập giá trị "
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bedrooms</label>
                  <select
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button className="text-sm px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50">Reset</button>
                <button className="text-sm px-4 py-2 rounded-full bg-indigo-600 text-white shadow-sm hover:bg-indigo-700">Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}