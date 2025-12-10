// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderProgress from "./components/HeaderProgress";
import { NetworkProgressProvider } from "./components/NetworkProgress";
import ZoomResetHandler from "./components/ZoomResetHandler";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";

// Nên set URL site ở biến môi trường để tái dùng (Preview/Prod)
// NEXT_PUBLIC_SITE_URL=https://phatdatbatdongsan.com
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatdatbatdongsan.com";
const SITE_NAME = "Phát Đạt Bất Động Sản Nhơn Trạch";

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  weight: ["300","400","500","600","700","800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Mua bán nhà đất Nhơn Trạch, Đồng Nai: đất nền, nhà phố, sổ riêng, pháp lý rõ ràng.",
  keywords: [
    "Phát Đạt Bất Động Sản",
    "Phat Dat Bat Dong San",
    "bất động sản Nhơn Trạch",
    "nhà đất Đồng Nai",
    "mua bán nhà đất",
    "đất nền Nhơn Trạch",
  ],
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",              // sẽ thành https://phatdatbatdongsan.com/ nhờ metadataBase
    languages: { "vi-VN": "/" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai.",
    locale: "vi_VN",
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai.",
    images: ["/og-default.jpg"],
    // site: "@ten_twitter_cua_ban", // bỏ nếu chưa có
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Dán mã xác minh GSC thật vào đây (nếu có)
    // google: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
};

// Viewport config - chặn zoom khi focus input trên iOS
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ZoomResetHandler />
        <NetworkProgressProvider>
          <Suspense fallback={null}><HeaderProgress /></Suspense>
          <Suspense fallback={null}><Header /></Suspense>
          {children}
        </NetworkProgressProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
