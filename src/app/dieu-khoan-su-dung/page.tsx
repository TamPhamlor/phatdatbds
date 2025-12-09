import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Điều khoản sử dụng | Phát Đạt Bất Động Sản",
  description: "Điều khoản và điều kiện sử dụng dịch vụ của Phát Đạt Bất Động Sản Nhơn Trạch",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container-std max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
            Trang chủ
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-emerald-600 font-medium">Điều khoản sử dụng</span>
        </nav>

        {/* Header */}
        <div className="card p-8 md:p-10 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Điều khoản <span className="text-gradient-emerald">sử dụng dịch vụ</span>
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
              1. Chấp nhận điều khoản
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Khi truy cập và sử dụng website của <span className="text-gradient-emerald font-semibold">Phát Đạt Bất Động Sản</span>, 
                bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau đây.
              </p>
              <p>
                Nếu bạn <span className="text-emerald-600 font-semibold">không đồng ý</span> với bất kỳ phần nào của các điều khoản này, 
                vui lòng không sử dụng dịch vụ của chúng tôi.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              2. Quyền và nghĩa vụ của người dùng
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                <h3 className="font-semibold text-emerald-800 mb-3">Quyền của người dùng:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Được cung cấp thông tin chính xác, đầy đủ về bất động sản</li>
                  <li>Được tư vấn miễn phí về các sản phẩm phù hợp</li>
                  <li>Được bảo mật thông tin cá nhân theo chính sách</li>
                  <li>Được hỗ trợ trong quá trình giao dịch</li>
                  <li>Khiếu nại khi có vi phạm từ phía công ty</li>
                </ul>
              </div>
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                <h3 className="font-semibold text-emerald-800 mb-3">Nghĩa vụ của người dùng:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Cung cấp thông tin chính xác, trung thực</li>
                  <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                  <li>Không vi phạm quyền sở hữu trí tuệ của bên thứ ba</li>
                  <li>Tuân thủ các quy định pháp luật hiện hành</li>
                  <li>Thanh toán đầy đủ các khoản phí dịch vụ (nếu có)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              3. Quyền và nghĩa vụ của Phát Đạt
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Quyền của Phát Đạt:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Thu thập thông tin cần thiết để cung cấp dịch vụ</li>
                  <li>Từ chối cung cấp dịch vụ nếu phát hiện hành vi vi phạm</li>
                  <li>Thay đổi, bổ sung điều khoản sử dụng khi cần thiết</li>
                  <li>Tạm ngừng dịch vụ để bảo trì, nâng cấp hệ thống</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Nghĩa vụ của Phát Đạt:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cung cấp thông tin bất động sản <span className="text-emerald-600 font-semibold">chính xác</span>, <span className="text-emerald-600 font-semibold">trung thực</span></li>
                  <li>Bảo mật thông tin khách hàng theo quy định</li>
                  <li>Hỗ trợ khách hàng trong quá trình giao dịch</li>
                  <li>Giải quyết khiếu nại, tranh chấp một cách công bằng</li>
                  <li>Tuân thủ các quy định pháp luật về kinh doanh bất động sản</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              4. Quy định về giao dịch
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Mọi giao dịch bất động sản thông qua Phát Đạt phải tuân thủ các quy định sau:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Xác minh thông tin</h4>
                    <p className="text-sm">Kiểm tra kỹ giấy tờ pháp lý trước khi giao dịch</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ký hợp đồng</h4>
                    <p className="text-sm">Lập hợp đồng rõ ràng, đầy đủ theo quy định</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thanh toán</h4>
                    <p className="text-sm">Thực hiện thanh toán qua các hình thức hợp pháp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Bàn giao</h4>
                    <p className="text-sm">Bàn giao đầy đủ giấy tờ và tài sản theo thỏa thuận</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              5. Giới hạn trách nhiệm
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Phát Đạt Bất Động Sản <span className="text-emerald-600 font-semibold">không chịu trách nhiệm</span> trong các trường hợp:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Thông tin do bên thứ ba cung cấp không chính xác</li>
                <li>Tranh chấp phát sinh từ giao dịch trực tiếp giữa các bên</li>
                <li>Thiệt hại do lỗi kỹ thuật, sự cố hệ thống ngoài tầm kiểm soát</li>
                <li>Vi phạm pháp luật từ phía người dùng</li>
                <li>Thiệt hại gián tiếp, ngẫu nhiên hoặc mang tính hệ quả</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Lưu ý:</span> Khách hàng nên tự kiểm tra kỹ lưỡng mọi thông tin và tham khảo ý kiến chuyên gia pháp lý trước khi thực hiện giao dịch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              6. Sở hữu trí tuệ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nội dung trên website thuộc <span className="text-gradient-emerald font-semibold">quyền sở hữu trí tuệ</span> của Phát Đạt Bất Động Sản bao gồm:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Văn bản, nội dung bài viết do Phát Đạt biên soạn</li>
                <li>Logo, nhận diện thương hiệu Phát Đạt</li>
                <li>Thiết kế giao diện và trải nghiệm người dùng</li>
                <li>Cơ sở dữ liệu bất động sản</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Về hình ảnh:</p>
                    <p>Hình ảnh minh họa trên website được <span className="font-semibold">sưu tầm</span> từ các nguồn công khai và chỉ sử dụng cho mục đích minh họa, tham khảo. Chúng tôi tôn trọng bản quyền của các tác giả và sẵn sàng gỡ bỏ nếu có yêu cầu từ chủ sở hữu.</p>
                  </div>
                </div>
              </div>
              <p className="mt-4">
                Nghiêm cấm mọi hành vi <span className="text-red-600 font-semibold">sao chép</span>, 
                <span className="text-red-600 font-semibold"> phân phối</span>, 
                <span className="text-red-600 font-semibold"> sửa đổi</span> hoặc 
                <span className="text-red-600 font-semibold"> sử dụng</span> nội dung thuộc sở hữu của Phát Đạt mà không có sự cho phép bằng văn bản.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              7. Điều khoản chung
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Điều khoản này có hiệu lực kể từ ngày công bố</li>
                <li>Phát Đạt có quyền sửa đổi điều khoản mà không cần thông báo trước</li>
                <li>Phiên bản mới nhất luôn được cập nhật trên website</li>
                <li>Điều khoản tuân thủ pháp luật Việt Nam và các công ước quốc tế</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              8. Thông tin liên hệ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ:
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3">Phát Đạt Bất Động Sản</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Hotline: <a href="tel:0365614778" className="text-emerald-600 font-semibold">0365 614 778</a></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Địa chỉ: Nhơn Trạch, Đồng Nai</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Giờ làm việc: 8:00 - 18:00 (Thứ 2 - Chủ nhật)</span>
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
