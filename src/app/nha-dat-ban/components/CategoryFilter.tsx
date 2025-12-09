"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { MetaListing } from "@/app/types/products";
import type { ReactNode } from "react";
import {
  Home, Building2, Building, Landmark, Store,
  Briefcase, Rows, Factory, Trees, X,
} from "lucide-react";

interface Props { meta?: MetaListing | null; }

/** Map tên tiếng Việt -> Icon (ReactNode) */
const iconFor = (name: string): ReactNode => {
  const key = name.trim().toLowerCase();
  const cls = "h-4 w-4";
  const map: Record<string, ReactNode> = {
    "nhà phố": <Home className={cls} />,
    "căn hộ chung cư": <Building2 className={cls} />,
    "đất nền": <Landmark className={cls} />,
    "biệt thự": <Building className={cls} />,
    "shophouse": <Store className={cls} />,
    "văn phòng": <Briefcase className={cls} />,
    "nhà liền kề": <Rows className={cls} />,
    "kho xưởng": <Factory className={cls} />,
    "trang trại/nhà vườn": <Trees className={cls} />,
  };
  return map[key] ?? <Home className={cls} />;
};

export default function CategoryFilter({ meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(() => {
    const arr = meta?.property_types ? Object.values(meta.property_types) : [];
    return arr.map((pt) => ({ id: pt.id, name: pt.name }));
  }, [meta]);

  const activeId = (() => {
    const pid = searchParams.get("property_type_id");
    return pid ? Number(pid) : undefined;
  })();

  const setParam = (id?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!id) params.delete("property_type_id");
    else params.set("property_type_id", String(id));
    router.push(`/nha-dat-ban?${params.toString()}`);
  };

  /** ========= Drag-to-scroll & Wheel-to-horizontal ========== */
  const railRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const posRef = useRef<{ startX: number; scrollLeft: number } | null>(null);

  // Mouse drag
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!railRef.current) return;
    setDragging(true);
    railRef.current.classList.add("select-none");
    posRef.current = {
      startX: e.clientX,
      scrollLeft: railRef.current.scrollLeft,
    };
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!dragging || !railRef.current || !posRef.current) return;
    e.preventDefault(); // chặn select text
    const dx = e.clientX - posRef.current.startX;
    railRef.current.scrollLeft = posRef.current.scrollLeft - dx;
  };

  const endDrag = () => {
    setDragging(false);
    railRef.current?.classList.remove("select-none");
    posRef.current = null;
  };

  // Touch drag (mobile)
  const touchRef = useRef<{ startX: number; scrollLeft: number } | null>(null);
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!railRef.current) return;
    const x = e.touches[0].clientX;
    touchRef.current = { startX: x, scrollLeft: railRef.current.scrollLeft };
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!railRef.current || !touchRef.current) return;
    const x = e.touches[0].clientX;
    const dx = x - touchRef.current.startX;
    railRef.current.scrollLeft = touchRef.current.scrollLeft - dx;
  };
  const onTouchEnd = () => { touchRef.current = null; };

  // Chuyển lăn dọc → cuộn ngang trong vùng 85%
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onWheel = (ev: WheelEvent) => {
      // Nếu có thanh cuộn dọc, chỉ khi Shift mới đổi; còn ở đây ta luôn map dọc -> ngang cho vùng rail
      // Ghi đè mặc định để cuộn ngang mượt
      ev.preventDefault();
      el.scrollLeft += (ev.deltaY || 0) + (ev.deltaX || 0);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as EventListener);
  }, []);

  return (
    <section className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-2">
        {/* 2 cột: trái 85% (cuộn/drag), phải 8% (nút xóa cố định) */}
        <div className="flex items-center gap-2">
          {/* Cột trái 85% – cuộn ngang + drag */}
          <div
            ref={railRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={`
              min-w-0 overflow-x-auto overflow-y-hidden whitespace-nowrap
              no-scrollbar
              cursor-grab active:cursor-grabbing
              [-webkit-overflow-scrolling:touch] [overscroll-behavior-x:contain]
              p-2
            `}
            style={{ flexBasis: "85%", maxWidth: "85%" }}
          >
            {/* dải pill */}
            <div className="inline-flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setParam(category.id)}
                  className={`inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 shadow-sm border-0
                    ${activeId === category.id ? "ring-1 ring-indigo-100 shadow-md text-gray-900" : ""}
                  `}
                >
                  <span className="opacity-70">{iconFor(category.name)}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cột phải 8% – nút Xóa luôn thấy, không cuộn */}
          <div
  className="flex justify-end basis-auto max-w-none md:basis-[8%] md:max-w-[8%]"
>
            <button
              onClick={() => setParam(undefined)}
              title="Xóa loại BĐS"
              aria-label="Xóa lọc"
              disabled={activeId === undefined}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm shadow-sm transition
                ${activeId !== undefined
                  ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300"
                  : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Xóa lọc</span>
            </button>
          </div>

          {/* phần dư cho layout tự co giãn (~7%) */}
          <div className="flex-1" />
        </div>
      </div>
    </section>
  );
}
