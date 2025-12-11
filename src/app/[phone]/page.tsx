'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PhonePageProps {
  params: Promise<{ phone: string }>;
}

export default function PhonePage({ params }: PhonePageProps) {
  const router = useRouter();

  useEffect(() => {
    const handlePhoneCall = async () => {
      const { phone } = await params;
      
      // Kiểm tra nếu phone bắt đầu bằng +84 (số điện thoại Việt Nam)
      if (phone.startsWith('+84') || phone.startsWith('%2B84')) {
        const cleanPhone = phone.replace('%2B', '+');
        
        // Tự động trigger gọi điện
        window.location.href = `tel:${cleanPhone}`;
        
        // Redirect về trang chủ sau 2 giây
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        // Nếu không phải số điện thoại hợp lệ, redirect về trang chủ
        router.push('/');
      }
    };

    handlePhoneCall();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Đang kết nối cuộc gọi...</h1>
        <p className="text-gray-600">Bạn sẽ được chuyển về trang chủ sau ít giây</p>
      </div>
    </div>
  );
}