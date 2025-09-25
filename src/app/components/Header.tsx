"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, User, Building2, FileText, Ellipsis } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SCROLL_DELTA = 8;     // ngưỡng chống rung: thay đổi < 8px thì bỏ qua
const HIDE_OFFSET = 80;     // sau khi vượt 80px mới bắt đầu ẩn khi kéo xuống

const Header: React.FC = () => {
  const pathname = usePathname();

  const [showBars, setShowBars] = useState(true); // header + bottom nav cùng trạng thái
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    // set giá trị ban đầu
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const curY = window.scrollY;

      // chống gọi xử lý quá dày
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;
          const diff = Math.abs(curY - lastY);

          // luôn hiện ở very top
          if (curY < 16) {
            if (!showBars) setShowBars(true);
            lastYRef.current = curY;
            tickingRef.current = false;
            return;
          }

          if (diff > SCROLL_DELTA) {
            if (curY > lastY && curY > HIDE_OFFSET) {
              // đang kéo xuống và đã qua offset -> ẩn
              if (showBars) setShowBars(false);
            } else if (curY < lastY) {
              // kéo lên -> hiện
              if (!showBars) setShowBars(true);
            }
            lastYRef.current = curY;
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showBars]);

  return (
    <>
      {/* Header: sticky + animate translate */}
      <header
        className={`
          sticky top-0 z-50
          bg-white/80 backdrop-blur border-b border-black/10 font-semibold
          transition-transform duration-300 will-change-transform
          ${showBars ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="container-std flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_phat_dat_bat_don_san.png"
              alt="Phát Đạt Bất Động Sản"
              height={50}
              width={50}
              unoptimized
            />
            <span className="sr-only">Phát Đạt Bất Động Sản</span>
          </div>

          {/* Menu ngang chỉ hiện trên desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-mute">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <Link href="/nha-dat-ban" className="hover:text-black">Mua bán</Link>
            <Link href="/bai-viet" className="hover:text-black">Bài viết</Link>
            <Link href="#manage" className="hover:text-black">Quản lý</Link>
            <Link href="#resources" className="hover:text-black">Tài nguyên</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="btn btn-dark text-sm">Đăng tin</button>
            <button className="btn btn-primary text-sm">Đăng nhập</button>
          </div>
        </div>
      </header>

      {/* Bottom navigation: mobile only + animate translate */}
      <nav
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white border-t border-gray-200 shadow-lg
          transition-transform duration-300 will-change-transform
          ${showBars ? "translate-y-0" : "translate-y-[130%]"}
        `}
      >
        <div className="flex justify-around items-center py-2 bg-white">
          {/* Mua bán */}
          <Link
            href="/nha-dat-ban"
            className={`flex flex-col items-center ${
              isActive("/nha-dat-ban") ? "text-[var(--color-accent)]" : "text-gray-500"
            }`}
          >
            <Building2 size={22} />
            <span className="text-xs">Mua bán</span>
          </Link>

          {/* Bài viết */}
          <Link
            href="/bai-viet"
            className={`flex flex-col items-center ${
              isActive("/bai-viet") ? "text-[var(--color-accent)]" : "text-gray-500"
            }`}
          >
            <FileText size={22} />
            <span className="text-xs">Bài viết</span>
          </Link>

          {/* Home: icon ở giữa, nổi bật */}
          <Link
            href="/"
            className={`flex flex-col items-center -mt-6 rounded-full p-4 shadow-lg
              bg-[var(--color-accent)] text-white`}
            aria-label="Trang chủ"
          >
            <Home size={24} />
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className={`flex flex-col items-center ${
              isActive("/profile") ? "text-[var(--color-accent)]" : "text-gray-500"
            }`}
          >
            <User size={22} />
            <span className="text-xs">Profile</span>
          </Link>

          {/* More */}
          <Link
            href="/more"
            className={`flex flex-col items-center ${
              isActive("/more") ? "text-[var(--color-accent)]" : "text-gray-500"
            }`}
          >
            <Ellipsis size={22} />
            <span className="text-xs">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
