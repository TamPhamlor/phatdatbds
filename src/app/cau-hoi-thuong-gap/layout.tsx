import { Metadata } from "next";
import { generateFAQSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

const faqs = [
  {
    question: "Sổ đỏ và sổ hồng khác nhau như thế nào?",
    answer:
      "Sổ đỏ (Giấy chứng nhận quyền sử dụng đất) cấp cho đất không có công trình. Sổ hồng (Giấy chứng nhận quyền sở hữu nhà ở và quyền sử dụng đất ở) cấp cho đất có nhà ở. Hiện nay, cả hai đều được thống nhất thành một loại giấy chứng nhận màu hồng.",
  },
  {
    question: "Thủ tục mua bán nhà đất cần những giấy tờ gì?",
    answer:
      "Cần có: Giấy chứng nhận quyền sử dụng đất (sổ đỏ/sổ hồng), CMND/CCCD của các bên, Hợp đồng mua bán có công chứng, Tờ khai thuế thu nhập cá nhân và lệ phí trước bạ, Đơn đăng ký biến động đất đai.",
  },
  {
    question: "Thuế và phí khi mua bán nhà đất bao gồm những gì?",
    answer:
      "Bao gồm: Thuế thu nhập cá nhân (2% giá trị chuyển nhượng), Lệ phí trước bạ (0.5% giá trị), Phí công chứng (0.1-0.5%), Phí thẩm định hồ sơ, Lệ phí địa chính.",
  },
  {
    question: "Làm sao để kiểm tra pháp lý của bất động sản?",
    answer:
      "Kiểm tra tại Văn phòng đăng ký đất đai, xác minh thông tin trên sổ đỏ/sổ hồng, kiểm tra quy hoạch tại UBND phường/xã, xác nhận không có tranh chấp, thế chấp ngân hàng.",
  },
  {
    question: "Đất nền và đất thổ cư khác nhau thế nào?",
    answer:
      "Đất thổ cư (đất ở) được phép xây dựng nhà ở, có sổ đỏ riêng. Đất nền là đất đã được phân lô nhưng có thể là đất nông nghiệp, đất dự án chưa chuyển đổi mục đích sử dụng.",
  },
];

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description:
    "Giải đáp những thắc mắc phổ biến về mua bán, pháp lý và đầu tư bất động sản tại Nhơn Trạch, Đồng Nai.",
  alternates: {
    canonical: `${SITE_URL}/cau-hoi-thuong-gap`,
  },
  openGraph: {
    title: `Câu hỏi thường gặp | ${SITE_NAME}`,
    description:
      "Giải đáp những thắc mắc phổ biến về mua bán, pháp lý và đầu tư bất động sản.",
    url: `${SITE_URL}/cau-hoi-thuong-gap`,
    type: "website",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {children}
    </>
  );
}
