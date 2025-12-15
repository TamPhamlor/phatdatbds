"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { MetaListing } from "@/app/types/products";
import type { ReactNode } from "react";
import {
  Home, Building2, Building, Landmark, Store,
  Briefcase, Rows, Factory, Trees,
} from "lucide-react";

interface Props { meta?: MetaListing | null; }

/** Map tên tiếng Việt -> Icon (ReactNode) */
const iconFor = (name: string, isActive: boolean): ReactNode => {
  const key = name.trim().toLowerCase();
  const cls = `h-4 w-4 ${isActive ? 'text-white' : 'text-emerald-600'}`;
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
    // Toggle: nếu đang active thì xóa, nếu chưa thì set
    if (activeId === id) {
      params.delete("property_type_id");
    } else if (id) {
      params.set("property_type_id", String(id));
    }
    router.push(`/nha-dat-ban?${params.toString()}`);
    
    // Scroll to top trên mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <section className="w-full bg-gradient-to-r from-emerald-50/30 via-white/50 to-emerald-50/30 backdrop-blur-sm border-b border-emerald-100/30">
      <div className="container-std py-3">
        <div className="flex items-center gap-3">
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
              min-w-0 overflow-x-auto overflow-y-visible whitespace-nowrap
              no-scrollbar
              cursor-grab active:cursor-grabbing
              [-webkit-overflow-scrolling:touch] [overscroll-behavior-x:contain]
              py-2 flex-1
            `}
          >
            {/* dải pill */}
            <div className="inline-flex items-center gap-2.5 px-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setParam(category.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 border whitespace-nowrap
                    ${activeId === category.id 
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200/50 scale-105" 
                      : "bg-white/90 backdrop-blur text-gray-700 border-emerald-200/50 hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-md hover:scale-105"
                    }
                  `}
                >
                  {iconFor(category.name, activeId === category.id)}
                  {category.name}
                </button>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
