'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "Sổ đỏ và sổ hồng khác nhau như thế nào?",
    answer: "Sổ đỏ (Giấy chứng nhận quyền sử dụng đất) cấp cho đất không có công trình. Sổ hồng (Giấy chứng nhận quyền sở hữu nhà ở và quyền sử dụng đất ở) cấp cho đất có nhà ở. Hiện nay, cả hai đều được thống nhất thành một loại giấy chứng nhận màu hồng."
  },
  {
    question: "Thủ tục mua bán nhà đất cần những giấy tờ gì?",
    answer: "Cần có: Giấy chứng nhận quyền sử dụng đất (sổ đỏ/sổ hồng), CMND/CCCD của các bên, Hợp đồng mua bán có công chứng, Tờ khai thuế thu nhập cá nhân và lệ phí trước bạ, Đơn đăng ký biến động đất đai."
  },
  {
    question: "Thuế và phí khi mua bán nhà đất bao gồm những gì?",
    answer: "Bao gồm: Thuế thu nhập cá nhân (2% giá trị chuyển nhượng), Lệ phí trước bạ (0.5% giá trị), Phí công chứng (0.1-0.5%), Phí thẩm định hồ sơ, Lệ phí địa chính."
  },
  {
    question: "Làm sao để kiểm tra pháp lý của bất động sản?",
    answer: "Kiểm tra tại Văn phòng đăng ký đất đai, xác minh thông tin trên sổ đỏ/sổ hồng, kiểm tra quy hoạch tại UBND phường/xã, xác nhận không có tranh chấp, thế chấp ngân hàng."
  },
  {
    question: "Đất nền và đất thổ cư khác nhau thế nào?",
    answer: "Đất thổ cư (đất ở) được phép xây dựng nhà ở, có sổ đỏ riêng. Đất nền là đất đã được phân lô nhưng có thể là đất nông nghiệp, đất dự án chưa chuyển đổi mục đích sử dụng."
  },
  {
    question: "Quy trình vay mua nhà tại ngân hàng như thế nào?",
    answer: "Bước 1: Chuẩn bị hồ sơ (CMND, sổ hộ khẩu, xác nhận thu nhập). Bước 2: Nộp hồ sơ và thẩm định. Bước 3: Ký hợp đồng tín dụng. Bước 4: Giải ngân. Thời gian xử lý từ 7-15 ngày làm việc."
  },
  {
    question: "Mức lãi suất vay mua nhà hiện tại là bao nhiêu?",
    answer: "Lãi suất ưu đãi năm đầu từ 6-8%/năm, sau đó thả nổi theo thị trường (thường 10-12%/năm). Thời hạn vay tối đa 25-30 năm, mức vay tối đa 70-80% giá trị bất động sản."
  },
  {
    question: "Khi nào nên mua nhà, khi nào nên thuê nhà?",
    answer: "Nên mua khi: có tài chính ổn định, định cư lâu dài, giá nhà hợp lý. Nên thuê khi: chưa ổn định công việc, cần linh hoạt di chuyển, chưa đủ tài chính hoặc đang chờ thời điểm tốt hơn."
  },
  {
    question: "Làm sao để định giá bất động sản chính xác?",
    answer: "Dựa vào: vị trí, diện tích, hướng nhà, pháp lý, hạ tầng xung quanh, so sánh với các BĐS tương tự đã giao dịch. Có thể thuê công ty thẩm định giá chuyên nghiệp."
  },
  {
    question: "Hướng nhà nào tốt nhất theo phong thủy?",
    answer: "Tùy thuộc vào tuổi gia chủ. Thông thường hướng Đông, Đông Nam được ưa chuộng vì đón nắng sáng, thoáng mát. Tránh hướng Tây vì nắng chiều gay gắt."
  },
  {
    question: "Mua nhà chung cư cần lưu ý những gì?",
    answer: "Kiểm tra chủ đầu tư uy tín, pháp lý dự án, tiến độ xây dựng, phí quản lý, quy định sử dụng, hạ tầng tiện ích, khả năng cho thuê/bán lại, chất lượng xây dựng."
  },
  {
    question: "Phí quản lý chung cư bao gồm những gì?",
    answer: "Bao gồm: vệ sinh công cộng, bảo vệ an ninh, bảo trì thang máy, hệ thống điện nước chung, chăm sóc cây xanh, quản lý tòa nhà. Mức phí từ 5.000-20.000đ/m²/tháng."
  },
  {
    question: "Đặt cọc mua nhà cần lưu ý gì?",
    answer: "Kiểm tra kỹ pháp lý trước khi cọc, ghi rõ thông tin BĐS trong hợp đồng cọc, quy định rõ thời hạn và điều kiện hoàn cọc, mức cọc thường 10-30% giá trị, có người làm chứng hoặc công chứng."
  },
  {
    question: "Quy hoạch ảnh hưởng thế nào đến giá trị bất động sản?",
    answer: "Quy hoạch tích cực (mở đường, xây trường, bệnh viện) làm tăng giá. Quy hoạch tiêu cực (giải tỏa, hành lang an toàn) làm giảm giá hoặc không thể giao dịch. Luôn kiểm tra quy hoạch trước khi mua."
  },
  {
    question: "Nhà trong hẻm và nhà mặt tiền khác nhau thế nào về giá?",
    answer: "Nhà mặt tiền thường đắt hơn 30-100% so với nhà hẻm cùng khu vực. Nhà mặt tiền có lợi thế kinh doanh, dễ cho thuê. Nhà hẻm yên tĩnh hơn, phù hợp ở gia đình."
  },
  {
    question: "Khi nào cần sang tên sổ đỏ?",
    answer: "Cần sang tên khi: mua bán, tặng cho, thừa kế bất động sản. Thời hạn đăng ký biến động là 30 ngày kể từ ngày công chứng hợp đồng. Chậm sang tên có thể bị phạt hành chính."
  },
  {
    question: "Bất động sản nào không được phép mua bán?",
    answer: "BĐS đang tranh chấp, bị kê biên thi hành án, đang thế chấp (chưa giải chấp), nằm trong quy hoạch giải tỏa, đất công, đất rừng phòng hộ, đất quốc phòng an ninh."
  },
  {
    question: "Mua đất dự án cần kiểm tra những gì?",
    answer: "Kiểm tra: Giấy phép đầu tư, quyết định giao đất, giấy phép xây dựng, tiến độ dự án, năng lực chủ đầu tư, hợp đồng mua bán mẫu, chính sách thanh toán, cam kết bàn giao."
  },
  {
    question: "Làm sao để tránh mua phải đất quy hoạch?",
    answer: "Kiểm tra tại phòng Tài nguyên Môi trường, UBND phường/xã, tra cứu trên cổng thông tin quy hoạch, yêu cầu người bán cam kết bằng văn bản, thuê luật sư tư vấn."
  },
  {
    question: "Chi phí xây nhà hiện nay khoảng bao nhiêu?",
    answer: "Nhà cấp 4: 3-5 triệu/m². Nhà phố 1 trệt 1-2 lầu: 5-8 triệu/m². Biệt thự: 8-15 triệu/m². Chi phí phụ thuộc vào vật liệu, thiết kế, vị trí xây dựng."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 shadow-xl shadow-emerald-200/50">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Câu hỏi thường gặp
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Giải đáp những thắc mắc phổ biến về mua bán, pháp lý và đầu tư bất động sản
        </p>
      </section>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-emerald-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900 placeholder-gray-400 shadow-lg shadow-emerald-100/30"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Keyword Tags - chỉ hiện từ khóa có kết quả */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {['Sổ đỏ', 'Thuế phí', 'Vay ngân hàng', 'Pháp lý', 'Quy hoạch', 'Chung cư', 'Đặt cọc', 'Phong thủy']
            .filter((keyword) => {
              const normalizedKeyword = keyword.toLowerCase();
              return faqs.some(faq => 
                faq.question.toLowerCase().includes(normalizedKeyword) ||
                faq.answer.toLowerCase().includes(normalizedKeyword)
              );
            })
            .map((keyword) => (
              <button
                key={keyword}
                onClick={() => setSearchTerm(keyword)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  searchTerm === keyword
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {keyword}
              </button>
            ))}
        </div>

        {searchTerm && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            Tìm thấy <span className="font-semibold text-emerald-600">{filteredFaqs.length}</span> kết quả
          </p>
        )}
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openIndex === index
                ? 'border-emerald-400 bg-gradient-to-br from-emerald-50/90 via-white/95 to-emerald-50/80 shadow-xl shadow-emerald-100/50'
                : 'border-emerald-200/60 bg-white/70 backdrop-blur-sm hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/30'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <span className="flex items-center gap-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  openIndex === index
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {index + 1}
                </span>
                <span className={`font-medium transition-colors ${
                  openIndex === index ? 'text-emerald-700' : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
              </span>
              <svg
                className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}>
              <div className="px-6 pb-5 pl-[4.5rem]">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600">Không tìm thấy câu hỏi phù hợp</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Xem tất cả câu hỏi
            </button>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="max-w-2xl mx-auto mt-16">
        <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-white/90 to-emerald-50/60 backdrop-blur-xl p-8 text-center shadow-xl shadow-emerald-100/30">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Không tìm thấy câu trả lời?
          </h3>
          <p className="text-gray-600 mb-6">
            Liên hệ với chúng tôi để được tư vấn trực tiếp
          </p>
          <a
            href="tel:0365614778"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Gọi ngay 0365614778
          </a>
        </div>
      </div>
    </main>
  );
}
