"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PHONE_CONTACT, formatPhone, telLink, FACEBOOK_LINK, ZALO_LINK } from "@/lib/config";

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
              <a href={telLink(PHONE_CONTACT)} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">{formatPhone(PHONE_CONTACT)}</span>
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
                <Link href="/nha-dat-ban" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                  Mua bán
                </Link>
              </li>
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
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" aria-label="Facebook">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="fb-gradient-footer" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#18ACFE"/>
                      <stop offset="100%" stopColor="#0163E0"/>
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="12" fill="url(#fb-gradient-footer)"/>
                  <path fill="#fff" d="M16.5 8.5h-2.2c-.3 0-.5.3-.5.6v1.4h2.7l-.4 2.5h-2.3v6h-2.6v-6H9.5v-2.5h1.7V8.8c0-1.7 1-2.8 2.7-2.8h2.6v2.5z"/>
                </svg>
              </a>
              <a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" aria-label="Zalo">
                <Image src="/icon_zalo.svg" alt="Zalo" width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
