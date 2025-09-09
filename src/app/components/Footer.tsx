"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black/10 py-8 text-sm text-mute">
      <div className="container-std flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Phát Đạt Bất Động Sản Nhơn Trạch. Đã
          đăng ký bản quyền.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-black">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-black">
            Điều khoản sử dụng
          </a>
          <a href="#" className="hover:text-black">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
