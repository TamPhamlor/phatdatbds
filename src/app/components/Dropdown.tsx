"use client";

import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ label, options, value, onChange }: DropdownProps) {
  return (
    <div className="block relative w-full">
      <Listbox value={value} onChange={onChange}>
        {/* Label */}
        <ListboxLabel className="block text-xs text-[var(--color-mute)] mb-1">
          {label}
        </ListboxLabel>

        {/* Button */}
        <ListboxButton
          className="
            h-12 w-full px-4 text-left flex items-center justify-between
            rounded-[var(--radius-xl2)] border border-black/10 bg-[var(--color-ink)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40
            transition-all
          "
        >
          <span className="truncate">{value}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="ml-3 shrink-0 opacity-70"
          >
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </ListboxButton>

        {/* Options */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ListboxOptions
            className="
              absolute z-50 mt-2 w-full max-h-60 overflow-auto 
              rounded-[var(--radius-xl2)] bg-[var(--color-ink)] py-1 text-sm
              shadow-[var(--shadow-soft)] ring-1 ring-black/5 focus:outline-none
            "
          >
            {options.map((opt) => (
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
                          <path
                            d="M20 6L9 17l-5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    )}
                    <span className="block truncate">{opt}</span>
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
