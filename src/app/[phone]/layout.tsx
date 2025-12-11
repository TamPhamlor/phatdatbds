import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đang kết nối cuộc gọi - Phát Đạt Bất Động Sản',
  description: 'Đang kết nối cuộc gọi với Phát Đạt Bất Động Sản',
  robots: 'noindex, nofollow',
};

export default function PhoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}