"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur border-b border-black/10" style={{ fontWeight: "600", background: "rgb(255,255,255,0.8)" }}>
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
        <nav className="hidden md:flex items-center gap-6 text-sm text-mute">
          <Link href="/" className="hover:text-black">
            Trang chủ
          </Link>
          <Link href="/nha-dat-ban" className="hover:text-black">
            Mua bán
          </Link>
          <Link href="/bai-viet" className="hover:text-black">
            Bài viết
          </Link>
          <Link href="#manage" className="hover:text-black">
            Quản lý
          </Link>
          <Link href="#resources" className="hover:text-black">
            Tài nguyên
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="btn btn-dark text-sm">Đăng tin</button>
          <button className="btn btn-primary text-sm">Đăng nhập</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
