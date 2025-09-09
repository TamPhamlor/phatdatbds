import type { Metadata } from "next";
import { Manrope  } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: "Trang chủ - Phát Đạt Bất Động Sản",
  description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${manrope.variable} antialiased`}
      ><Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
