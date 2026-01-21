"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SCROLL_DELTA = 8;     // ngưỡng chống rung: thay đổi < 8px thì bỏ qua
const HIDE_OFFSET = 80;     // sau khi vượt 80px mới bắt đầu ẩn khi kéo xuống

const Header: React.FC = () => {
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState(true); // state riêng cho header
  const [showNav, setShowNav] = useState(true); // state riêng cho bottom nav
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-h",
      showHeader ? "83px" : "0px"
    );
  }, [showHeader]);

  useEffect(() => {
    // set giá trị ban đầu
    lastYRef.current = window.scrollY;

    // Kiểm tra xem có phải trang nha-dat-ban không
    const isPropertyPage = pathname.startsWith('/nha-dat-ban');

    const onScroll = () => {
      const curY = window.scrollY;

      // chống gọi xử lý quá dày
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;
          const diff = Math.abs(curY - lastY);

          // Logic riêng cho HEADER trên MOBILE ở trang nha-dat-ban
          if (isPropertyPage && isMobile) {
            // luôn hiện ở very top (trong vòng 150px từ đầu trang)
            if (curY < 150) {
              if (!showHeader) setShowHeader(true);
              if (!showNav) setShowNav(true);
              lastYRef.current = curY;
              tickingRef.current = false;
              return;
            }

            if (diff > SCROLL_DELTA) {
              if (curY > lastY && curY > HIDE_OFFSET) {
                // đang kéo xuống và đã qua offset -> ẩn cả header và nav
                if (showHeader) setShowHeader(false);
                if (showNav) setShowNav(false);
              } else if (curY < lastY) {
                // kéo lên -> hiện nav, header chỉ hiện khi gần đầu trang
                if (!showNav) setShowNav(true);
                if (curY < 150 && !showHeader) {
                  setShowHeader(true);
                }
              }
              lastYRef.current = curY;
            }
          } else {
            // Logic mặc định cho các trang khác hoặc desktop
            // luôn hiện ở very top
            if (curY < 16) {
              if (!showHeader) setShowHeader(true);
              if (!showNav) setShowNav(true);
              lastYRef.current = curY;
              tickingRef.current = false;
              return;
            }

            if (diff > SCROLL_DELTA) {
              if (curY > lastY && curY > HIDE_OFFSET) {
                // đang kéo xuống và đã qua offset -> ẩn cả 2
                if (showHeader) setShowHeader(false);
                if (showNav) setShowNav(false);
              } else if (curY < lastY) {
                // kéo lên -> hiện cả 2
                if (!showHeader) setShowHeader(true);
                if (!showNav) setShowNav(true);
              }
              lastYRef.current = curY;
            }
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showHeader, showNav, pathname, isMobile]);

  return (
    <>
      {/* Header: sticky + animate translate */}
      <header
        className={`
          sticky top-0 z-50 font-semibold
          bg-transparent
          transition-transform duration-300 will-change-transform
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="container-std py-4">
          <div className="flex items-center justify-between bg-emerald-50/50 backdrop-blur rounded-full px-4 py-3 border border-emerald-100/50">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo_phat_dat_bat_don_san.png"
                alt="Phát Đạt Bất Động Sản"
                height={50}
                width={50}
                unoptimized
              />
              <div>
                <h1 className="font-bold text-lg text-gray-900 leading-tight">Phát Đạt</h1>
                <p className="text-xs text-emerald-600 hidden sm:inline">Bất Động Sản Nhơn Trạch</p>
                <p className="text-xs text-emerald-600 sm:hidden">Bất Động Sản</p>
              </div>
            </Link>

            {/* Menu ngang chỉ hiện trên desktop */}
            <nav className="hidden md:flex items-center gap-2 text-base text-gray-700">
              <Link href="/" className="menu-link">Trang chủ</Link>
              <Link href="/gioi-thieu" className="menu-link">Giới thiệu</Link>
              <Link href="/tin-tuc" className="menu-link">Tin tức</Link>
              <Link href="/cau-hoi-thuong-gap" className="menu-link">Câu hỏi thường gặp</Link>
            </nav>

            <div className="flex items-center gap-3">
              <a href="tel:0365614778" className="btn btn-primary btn-pulse text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Gọi ngay</span>
                <span>0365614778</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation: mobile only + animate translate */}
      <nav
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-[9999]
          bg-white/95 backdrop-blur-lg border-t border-emerald-100 shadow-2xl
          transition-transform duration-300 will-change-transform
          ${showNav ? "translate-y-0" : "translate-y-[130%]"}
        `}
      >
        <div className="flex justify-around items-center py-3 px-2">
          {/* Giới thiệu */}
          <Link
            href="/gioi-thieu"
            className={`mobile-nav-item ${isActive("/gioi-thieu") ? "mobile-nav-active" : ""
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs font-medium mt-1">Giới thiệu</span>
          </Link>

          {/* Tin tức */}
          <Link
            href="/tin-tuc"
            className={`mobile-nav-item ${isActive("/tin-tuc") ? "mobile-nav-active" : ""
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-xs font-medium mt-1">Tin tức</span>
          </Link>

          {/* Home: icon ở giữa, nổi bật */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center -mt-8 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95"
            aria-label="Trang chủ"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>

          {/* Liên hệ */}
          <Link
            href="#cta-support"
            className={`mobile-nav-item ${isActive("#cta-support") ? "mobile-nav-active" : ""
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium mt-1">Liên hệ</span>
          </Link>

          {/* Gọi ngay */}
          <a
            href="tel:0365614778"
            className="mobile-nav-item"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-xs font-medium mt-1">Gọi ngay</span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
