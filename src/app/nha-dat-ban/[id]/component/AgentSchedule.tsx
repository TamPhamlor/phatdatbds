"use client";

import Image from "next/image";
import { useState } from "react";

const AgentSchedule: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="schedule" className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-3">
            <Image
  src="https://i.pravatar.cc/64?img=32"
  alt="Agent"
  width={48}
  height={48}
  className="rounded-full"
  unoptimized // cho phép load ảnh ngoài mà không cần remotePatterns
/>

            <div>
              <div className="font-semibold">Maria Johnson</div>
              <div className="text-sm text-gray-500">Senior Agent, Nestify</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">Call</button>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mt-1">
            Maria Johnson là chuyên viên môi giới bất động sản với hơn 10 năm kinh nghiệm trong lĩnh vực nhà ở cao cấp.
            Cô ấy luôn tận tâm hỗ trợ khách hàng tìm kiếm ngôi nhà phù hợp và cung cấp dịch vụ tư vấn chuyên nghiệp.
          </p>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="font-semibold mb-3">Contact in booking</div>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
          <input
            required
            name="fullName"
            placeholder="Full name"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={formData.date}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your message…"
            rows={3}
            className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={formData.message}
            onChange={handleChange}
          />
          <div className="mt-3 flex justify-end">
            <button type="submit" className="rounded-full bg-indigo-600 text-white px-5 py-2 text-sm hover:bg-indigo-700">Request</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AgentSchedule;