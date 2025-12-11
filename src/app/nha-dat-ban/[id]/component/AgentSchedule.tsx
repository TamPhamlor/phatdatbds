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

  const [loading, setLoading] = useState(false);
  const [thongBao, setThongBao] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDuLieuForm({ ...duLieuForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setThongBao("");

    try {
      const response = await fetch(
        "https://api.phatdatbatdongsan.com/api/v1/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: duLieuForm.hoTen,
            email: duLieuForm.email,
            phone: duLieuForm.soDienThoai,
            message: `${duLieuForm.loiNhan}\nNgày hẹn: ${duLieuForm.ngayHen}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gửi yêu cầu thất bại");
      }

      const data = await response.json();
      console.log("Phản hồi từ server:", data);
      setThongBao("✅ Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm nhất. Nếu không thấy email phản hồi, vui lòng kiểm tra hộp thư Spam.");
      setDuLieuForm({
        hoTen: "",
        email: "",
        soDienThoai: "",
        ngayHen: "",
        loiNhan: "",
      });
    } catch (error) {
      console.error("Lỗi:", error);
      setThongBao("❌ Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
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
              unoptimized
            />
            <div>
              <div className="font-semibold">Maria Johnson</div>
              <div className="text-sm text-gray-500">
                Chuyên viên cao cấp, Nestify
              </div>
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
            Maria Johnson là chuyên viên môi giới bất động sản với hơn 10 năm
            kinh nghiệm trong lĩnh vực nhà ở cao cấp. Cô ấy luôn tận tâm hỗ trợ
            khách hàng tìm kiếm ngôi nhà phù hợp và cung cấp dịch vụ tư vấn
            chuyên nghiệp.
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
          <div className="mt-3 flex sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-indigo-600 text-white px-5 py-2 text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </div>
        </form>

        {thongBao && (
          <p className="mt-3 text-sm text-center text-gray-700">{thongBao}</p>
        )}
      </div>
    </section>
  );
};

export default LichHenMoiGioi;
