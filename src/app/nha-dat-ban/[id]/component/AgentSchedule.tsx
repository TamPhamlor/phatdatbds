"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PHONE_CONTACT, formatPhone, telLink } from "@/lib/config";

// Custom DatePicker component với màu emerald - dùng Portal
function DatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày",
}: {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tính vị trí calendar khi mở
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  // Close khi click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target as Node) &&
        calendarRef.current && !calendarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const handleSelectDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formatted = date.toISOString().split("T")[0];
    onChange(formatted);
    setIsOpen(false);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSelectedDate = (day: number) => {
    if (!value) return false;
    const selected = new Date(value);
    return selected.getDate() === day && 
           selected.getMonth() === currentMonth.getMonth() && 
           selected.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (day: number) => {
    const now = new Date();
    return now.getDate() === day && 
           now.getMonth() === currentMonth.getMonth() && 
           now.getFullYear() === currentMonth.getFullYear();
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < today;
  };

  const calendarContent = (
    <div
      ref={calendarRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 99999,
      }}
      className="bg-white rounded-2xl shadow-2xl border border-emerald-100 p-4 w-72"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-emerald-50 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-emerald-50 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                type="button"
                disabled={isPastDate(day)}
                onClick={() => handleSelectDate(day)}
                className={`w-full h-full rounded-full text-sm font-medium transition-all ${
                  isSelectedDate(day)
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                    : isToday(day)
                    ? "bg-emerald-100 text-emerald-700"
                    : isPastDate(day)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-emerald-50"
                }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 text-sm text-left focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20 transition-all"
      >
        <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
      </button>

      {/* Calendar via Portal */}
      {mounted && isOpen && createPortal(calendarContent, document.body)}
    </div>
  );
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDuLieuForm({ ...duLieuForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setThongBao("");

    try {
      const response = await fetch("https://api.phatdatbatdongsan.com/api/v1/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: duLieuForm.hoTen,
          email: duLieuForm.email,
          phone: duLieuForm.soDienThoai,
          message: `${duLieuForm.loiNhan}\nNgày hẹn: ${duLieuForm.ngayHen}`,
        }),
      });

      if (!response.ok) throw new Error("Gửi yêu cầu thất bại");

      setThongBao("✅ Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.");
      setDuLieuForm({ hoTen: "", email: "", soDienThoai: "", ngayHen: "", loiNhan: "" });
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
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="https://i.pravatar.cc/64?img=32"
                alt="Môi giới"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-emerald-100"
                unoptimized
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Phát Đạt BĐS</div>
              <div className="text-sm text-gray-500">Chuyên viên tư vấn</div>
            </div>
          </div>
          <a href={telLink(PHONE_CONTACT)} className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
            Gọi ngay
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          Phát Đạt BĐS là đơn vị chuyên tư vấn bất động sản tại Nhơn Trạch với hơn 10 năm kinh nghiệm. 
          Chúng tôi cam kết hỗ trợ khách hàng tìm kiếm sản phẩm phù hợp với pháp lý rõ ràng, giá tốt nhất thị trường.
        </p>
      </div>

      {/* Form đặt lịch */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          Đặt lịch hẹn
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            name="hoTen"
            placeholder="Họ và tên"
            className="w-full rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 text-base focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            value={duLieuForm.hoTen}
            onChange={handleChange}
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Địa chỉ email"
            className="w-full rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 text-base focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            value={duLieuForm.email}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="tel"
              name="soDienThoai"
              placeholder="Số điện thoại"
              className="rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 text-base focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              value={duLieuForm.soDienThoai}
              onChange={handleChange}
            />
            <DatePicker
              value={duLieuForm.ngayHen}
              onChange={(date) => setDuLieuForm({ ...duLieuForm, ngayHen: date })}
              placeholder="Chọn ngày"
            />
          </div>
          <textarea
            name="loiNhan"
            placeholder="Lời nhắn của bạn…"
            rows={3}
            className="w-full rounded-2xl border border-emerald-100 bg-white/80 px-4 py-2.5 text-base focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
            value={duLieuForm.loiNhan}
            onChange={handleChange}
          />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </div>
        </form>

        {thongBao && (
          <p className={`mt-4 text-sm text-center px-4 py-2 rounded-full ${thongBao.includes("✅") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
            {thongBao}
          </p>
        )}
      </div>
    </section>
  );
};

export default LichHenMoiGioi;
