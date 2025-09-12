"use client"

export default function FilterPanel({ isOpen }: { isOpen: boolean, className?: string }) {
  return (
    <aside
      className={`w-80 shrink-0 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="mb-3 font-semibold text-gray-900">Customer Filter</div>
        <details open className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M6 12h12M9 18h6" />
              </svg>
              Property price
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              $250k–$500k
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              $100k–$250k
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              $50k–$100k
            </label>
            <div className="pt-2">
              <div className="text-gray-600 mb-2">Around $10k–50k</div>
              <input type="range" className="w-full" min="10" max="50" defaultValue="30" />
            </div>
          </div>
        </details>
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 21V8.5A2.5 2.5 0 0 1 6.5 6H18a3 3 0 0 1 3 3V21M3 11h18" />
              </svg>
              Property Types
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              Apartment
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600" />
              Single Family Home
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              Bungalow
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
              Condo/Townhouse
            </label>
          </div>
        </details>
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 21V7a2 2 0 0 1 2-2h12v16M4 10h16" />
              </svg>
              Property Rooms
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <button className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50">2 Bedroom</button>
            <button className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50">1 Bathroom</button>
            <button className="col-span-2 rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50">Add Room</button>
          </div>
        </details>
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
              Amenities
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Pool</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Gym</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Parking</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-indigo-600" /> Pet Friendly</label>
          </div>
        </details>
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M2 12h20" />
              </svg>
              Orientation
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> North</label>
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> South</label>
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> East</label>
            <label className="flex items-center gap-2"><input type="radio" name="orientation" className="rounded border-gray-300 text-indigo-600" /> West</label>
          </div>
        </details>
        <details className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 2v4M16 2v4" />
              </svg>
              Year Built
            </span>
            <svg className="w-4 h-4 text-gray-500 group-open:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <select className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500">
              <option value="">Any</option>
              <option value="2020">2020+</option>
              <option value="2010">2010–2019</option>
              <option value="2000">2000–2009</option>
              <option value="1990">Before 2000</option>
            </select>
          </div>
        </details>
      </div>
    </aside>
  );
}