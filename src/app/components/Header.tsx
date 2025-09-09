"use client";

import Image from "next/image";
import React from "react";

const Header: React.FC = () => {

  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur border-b border-black/10">
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
          <a href="#explore" className="hover:text-black">
            Khám phá
          </a>
          <a href="#rent" className="hover:text-black">
            Cho thuê
          </a>
          <a href="#own" className="hover:text-black">
            Mua bán
          </a>
          <a href="#manage" className="hover:text-black">
            Quản lý
          </a>
          <a href="#resources" className="hover:text-black">
            Tài nguyên
          </a>
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
