"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-emerald-50/30 border-t border-emerald-100">
      <div className="container-std py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo_phat_dat_bat_don_san.png"
                alt="Phát Đạt Bất Động Sản"
                width={50}
                height={50}
                unoptimized
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">Phát Đạt</h3>
                <p className="text-sm text-emerald-600">Bất Động Sản Nhơn Trạch</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-md">
              Chuyên cung cấp dịch vụ mua bán, cho thuê bất động sản tại Nhơn Trạch, Đồng Nai.
              Uy tín - Chuyên nghiệp - Tận tâm.
            </p>
            <div className="flex items-center gap-3">
              <a href="tel:0365614778" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">0365 614 778</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Giới thiệu
                </Link>
              </li>
              {/* HIDDEN: Mua bán menu - Commented out as requested
              <li>
                <Link href="/nha-dat-ban" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Mua bán
                </Link>
              </li>
              */}
              <li>
                <Link href="/tin-tuc" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Tin tức
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Pháp lý</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/chinh-sach-bao-mat" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/cau-hoi-thuong-gap" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Phát Đạt Bất Động Sản. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="Zalo">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 48 48">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 2c9.941 0 18 8.059 18 18s-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6zm-5.223 10.102c-.456 0-.91.174-1.258.522l-2.02 2.02c-.696.696-.696 1.82 0 2.516l2.02 2.02c.348.348.802.522 1.258.522.456 0 .91-.174 1.258-.522l.762-.762 5.484 5.484-.762.762c-.696.696-.696 1.82 0 2.516l2.02 2.02c.348.348.802.522 1.258.522.456 0 .91-.174 1.258-.522l2.02-2.02c.696-.696.696-1.82 0-2.516l-2.02-2.02c-.348-.348-.802-.522-1.258-.522-.456 0-.91.174-1.258.522l-.762.762-5.484-5.484.762-.762c.696-.696.696-1.82 0-2.516l-2.02-2.02c-.348-.348-.802-.522-1.258-.522z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
