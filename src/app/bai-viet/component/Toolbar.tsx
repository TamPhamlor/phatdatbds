"use client"
import { FilterState } from './types';

interface ToolbarProps {
  state: FilterState;
  setState: (state: FilterState) => void;
  onReset: () => void;
}

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'news', label: 'News' },
  { id: 'guide', label: 'Guide' },
  { id: 'tips', label: 'Tips' },
  { id: 'review', label: 'Review' },
  { id: 'tutorial', label: 'Tutorial' },
];

export default function Toolbar({ state, setState, onReset }: ToolbarProps) {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div id="catPills" className="flex items-center gap-2 overflow-x-auto no-scrollbar md:flex-wrap p-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                data-cat={cat.id}
                className={`pill inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ${
                  state.cat === cat.id
                    ? 'ring-1 ring-indigo-100 shadow-md text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50 shadow-sm'
                } border-0 whitespace-nowrap`}
                onClick={() => setState({ ...state, cat: cat.id })}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 p-2">
            <label className="relative sm:block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                  <path strokeWidth="1.8" d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <input
                id="searchInput"
                type="text"
                placeholder="Tìm theo tên bài viết..."
                className=" rounded-full bg-white pl-9 pr-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm border-0"
                value={state.q}
                onChange={(e) => setState({ ...state, q: e.target.value })}
              />
            </label>
            <button
              id="resetBtn"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 shadow-sm border-0"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}