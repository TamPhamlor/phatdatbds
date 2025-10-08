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
          <ListboxLabel className="block text-xs text-[var(--color-mute)] mb-1">
            {label}
          </ListboxLabel>
        )}

        {/* Button */}
        <ListboxButton
          className={`
            h-12 w-full px-4 text-left flex items-center justify-between
            rounded-[var(--radius-xl2)] border border-black/10
            ${disabled ? "opacity-60 cursor-not-allowed" : "bg-[var(--color-ink)]"}
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40
            transition-all
          `}
        >
          <span className={`truncate ${!value ? "text-black/50" : ""}`}>
            {value || placeholder}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" className="ml-3 shrink-0 opacity-70">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </ListboxButton>

        {/* Options */}
        {!disabled && (
          <Transition
            // ✅ dùng div thay vì Fragment để không truyền props vào Fragment
            as="div"
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
              className="
                absolute z-50 mt-2 w-full max-h-72 overflow-auto 
                rounded-[var(--radius-xl2)] bg-[var(--color-ink)] py-1 text-sm
                shadow-[var(--shadow-soft)] ring-1 ring-black/5 focus:outline-none
                nice-scroll
              "
            >
              {/* Search box */}
              {searchable && (
                <div className="sticky top-0 z-10 bg-[var(--color-ink)] p-2 border-b border-black/5">
                  <div className="flex items-center gap-2 rounded-lg border border-black/10 px-2">
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
                      `relative cursor-default select-none py-2 pl-10 pr-4
                       ${active ? "bg-[var(--color-accent)]/10 text-[var(--color-text)]" : ""}
                       ${selected ? "font-semibold" : "font-normal"}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                              <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </span>
                        )}
                        <span className="block truncate">{opt}</span>
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
