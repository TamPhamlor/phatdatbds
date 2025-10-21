"use client";

import Image from "next/image";
import { useState } from "react";

const LichHenMoiGioi: React.FC = () => {
  const [duLieuForm, setDuLieuForm] = useState({
    hoTen: "",
    email: "",
    soDienThoai: "",
    ngayHen: "",
    loiNhan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDuLieuForm({ ...duLieuForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý khi gửi form
  };

  return (
    <section id="lich-hen" className="grid lg:grid-cols-2 gap-4">
      {/* Thông tin môi giới */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-3">
            <Image
              src="https://i.pravatar.cc/64?img=32"
              alt="Môi giới"
              width={48}
              height={48}
              className="rounded-full"
              unoptimized // cho phép load ảnh ngoài mà không cần remotePatterns
            />
            <div>
              <div className="font-semibold">Maria Johnson</div>
              <div className="text-sm text-gray-500">Chuyên viên cao cấp, Nestify</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">
              Gọi ngay
            </button>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mt-1">
            Maria Johnson là chuyên viên môi giới bất động sản với hơn 10 năm kinh nghiệm trong lĩnh vực nhà ở cao cấp.
            Cô ấy luôn tận tâm hỗ trợ khách hàng tìm kiếm ngôi nhà phù hợp và cung cấp dịch vụ tư vấn chuyên nghiệp.
          </p>
        </div>
      </div>

      {/* Form đặt lịch */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="font-semibold mb-3">Liên hệ để đặt lịch hẹn</div>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
          <input
            required
            name="hoTen"
            placeholder="Họ và tên"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={duLieuForm.hoTen}
            onChange={handleChange}
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Địa chỉ email"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={duLieuForm.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="soDienThoai"
            placeholder="Số điện thoại"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={duLieuForm.soDienThoai}
            onChange={handleChange}
          />
          <input
            type="date"
            name="ngayHen"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={duLieuForm.ngayHen}
            onChange={handleChange}
          />
          <textarea
            name="loiNhan"
            placeholder="Lời nhắn của bạn…"
            rows={3}
            className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={duLieuForm.loiNhan}
            onChange={handleChange}
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-indigo-600 text-white px-5 py-2 text-sm hover:bg-indigo-700"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LichHenMoiGioi;
