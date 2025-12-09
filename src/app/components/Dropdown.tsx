"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

export interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;

  searchable?: boolean;
  searchPlaceholder?: string;
  noResultsText?: string;
  className?: string;
}

function normalize(v: string) {
  return v.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Chọn...",
  searchable = false,
  searchPlaceholder = "Tìm kiếm...",
  noResultsText = "Không tìm thấy",
  className = "",
}: DropdownProps) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!searchable || !q.trim()) return options;
    const nQ = normalize(q.trim());
    return options.filter((o) => normalize(o).includes(nQ));
  }, [options, q, searchable]);

  return (
    <div className={`block relative w-full ${className}`}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {/* Label */}
        {label && (
          <ListboxLabel className="block text-xs font-medium text-gray-600 mb-1.5">
            {label}
          </ListboxLabel>
        )}

        {/* Button */}
        <ListboxButton
          className={`
            h-10 w-full px-3 text-left flex items-center justify-between
            rounded-lg border border-gray-300
            ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : "bg-white hover:border-emerald-400"}
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-40 focus:border-emerald-500
            transition-all text-sm
          `}
        >
          <span className={`truncate ${!value ? "text-gray-400" : "text-gray-900"}`}>
            {value || placeholder}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" className="ml-2 shrink-0 text-gray-500">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </ListboxButton>

        {/* Options */}
        {!disabled && (
          <Transition
            // ✅ dùng div thay vì Fragment để không truyền props vào Fragment
            as="div"
            className="absolute z-[9999] w-full"
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            // ✅ clear ô tìm sau khi dropdown đóng
            afterLeave={() => setQ("")}
          >
            <ListboxOptions
              modal={false}
              className="
                pt-0 mt-1 w-auto min-w-full max-h-60 overflow-y-auto overflow-x-hidden
                bg-white py-1 text-sm
                shadow-xl ring-1 ring-gray-200 focus:outline-none
                nice-scroll rounded-lg
                overscroll-contain
              "
              style={{ 
                minWidth: 'max(100%, 240px)',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {/* Search box */}
              {searchable && (
                <div className="sticky top-0 z-10 bg-white p-2 border-b border-black/5">
                  <div className="flex items-center gap-2 rounded-lg border border-black/10 px-2 bg-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-60">
                      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M20 20l-3-3" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="h-9 w-full bg-transparent outline-none text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        // Cho phép nhập khoảng trắng
                        if (e.key === " " || e.key === "Spacebar") {
                          e.stopPropagation();
                        }
                      }}
                    />
                    {q && (
                      <button
                        type="button"
                        onClick={() => setQ("")}
                        className="px-1 text-xs text-black/60 hover:text-black"
                        aria-label="Xoá tìm kiếm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* List */}
              {filtered.length === 0 ? (
                <div className="py-3 px-4 text-sm text-black/60">{noResultsText}</div>
              ) : (
                filtered.map((opt: string) => (
                  <ListboxOption
                    key={opt}
                    value={opt}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none py-2 pl-9 pr-3
                       ${active ? "bg-emerald-50 text-emerald-900" : "text-gray-900"}
                       ${selected ? "font-semibold bg-emerald-50" : "font-normal"}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" className="text-emerald-600">
                              <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                            </svg>
                          </span>
                        )}
                        <span className="block truncate text-sm">{opt}</span>
                      </>
                    )}
                  </ListboxOption>
                ))
              )}
            </ListboxOptions>
          </Transition>
        )}
      </Listbox>
    </div>
  );
}
