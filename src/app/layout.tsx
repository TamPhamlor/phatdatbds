import type { Metadata } from "next";
import { Manrope  } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderProgress from "./components/HeaderProgress";
import { NetworkProgressProvider } from "./components/NetworkProgress";
import { Suspense } from "react";

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
    <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={` ${manrope.variable} antialiased`}
      >
        
        <NetworkProgressProvider>
          
          <Suspense fallback={null}>
            <HeaderProgress />
          </Suspense>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          
          {children}
        </NetworkProgressProvider>
        <Footer/>
      </body>
    </html>
  );
}
