import React from "react";
import Link from "next/link";
import { PHONE_CONTACT, formatPhone, telLink } from "@/lib/config";

export const metadata = {
  title: "Chính sách bảo mật | Phát Đạt Bất Động Sản",
  description: "Chính sách bảo mật thông tin khách hàng của Phát Đạt Bất Động Sản Nhơn Trạch",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container-std max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-emerald-600 font-medium">Chính sách bảo mật</span>
        </nav>

        {/* Header */}
        <div className="card p-8 md:p-10 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Chính sách <span className="text-gradient-emerald">bảo mật thông tin</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              1. Mục đích và phạm vi thu thập thông tin
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="text-gradient-emerald font-semibold">Phát Đạt Bất Động Sản</span> cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng. 
                Chúng tôi thu thập thông tin nhằm các mục đích sau:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cung cấp dịch vụ tư vấn bất động sản phù hợp với nhu cầu</li>
                <li>Liên hệ xác nhận và hỗ trợ khách hàng khi cần thiết</li>
                <li>Gửi thông tin về các dự án, ưu đãi mới (nếu khách hàng đồng ý)</li>
                <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng</li>
                <li>Tuân thủ các quy định pháp luật hiện hành</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              2. Thông tin được thu thập
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                <h3 className="font-semibold text-emerald-800 mb-2">Thông tin cá nhân:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Họ và tên</li>
                  <li>Số điện thoại</li>
                  <li>Địa chỉ email</li>
                  <li>Địa chỉ liên hệ</li>
                </ul>
              </div>
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                <h3 className="font-semibold text-emerald-800 mb-2">Thông tin giao dịch:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Nhu cầu mua/bán/thuê bất động sản</li>
                  <li>Ngân sách dự kiến</li>
                  <li>Vị trí quan tâm</li>
                  <li>Lịch sử tương tác với website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              3. Phạm vi sử dụng thông tin
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Thông tin khách hàng được sử dụng <span className="text-emerald-600 font-semibold">chỉ trong phạm vi nội bộ</span> của 
                Phát Đạt Bất Động Sản và <span className="text-emerald-600 font-semibold">không được chia sẻ</span> cho bên thứ ba 
                trừ các trường hợp sau:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Có sự đồng ý rõ ràng từ khách hàng</li>
                <li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền</li>
                <li>Để bảo vệ quyền lợi hợp pháp của công ty và khách hàng</li>
                <li>Với các đối tác cung cấp dịch vụ hỗ trợ (đã ký cam kết bảo mật)</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              4. Thời gian lưu trữ thông tin
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Thông tin cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ. 
                Trong mọi trường hợp, thông tin sẽ được bảo mật trên máy chủ của Phát Đạt Bất Động Sản.
              </p>
              <p>
                Khách hàng có quyền yêu cầu <span className="text-emerald-600 font-semibold">xóa</span>, 
                <span className="text-emerald-600 font-semibold"> chỉnh sửa</span> hoặc 
                <span className="text-emerald-600 font-semibold"> cập nhật</span> thông tin cá nhân bất kỳ lúc nào 
                bằng cách liên hệ qua hotline <a href={telLink(PHONE_CONTACT)} className="text-emerald-600 font-semibold hover:underline">{formatPhone(PHONE_CONTACT)}</a>.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              5. Cam kết bảo mật thông tin
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Phát Đạt Bất Động Sản cam kết:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm">Bảo mật tuyệt đối thông tin khách hàng</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm">Không chia sẻ cho bên thứ ba</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm">Sử dụng công nghệ mã hóa SSL</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm">Tuân thủ pháp luật Việt Nam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              6. Liên hệ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ:
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3">Phát Đạt Bất Động Sản</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Hotline: <a href={telLink(PHONE_CONTACT)} className="text-emerald-600 font-semibold">{formatPhone(PHONE_CONTACT)}</a></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Địa chỉ: Nhơn Trạch, Đồng Nai</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link href="/" className="btn btn-primary inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
