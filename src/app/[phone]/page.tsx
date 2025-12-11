'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PhonePageProps {
  params: Promise<{ phone: string }>;
}

export default function PhonePage({ params }: PhonePageProps) {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);

  useEffect(() => {
    const handlePhoneCall = async () => {
      const { phone } = await params;
      
      // Kiểm tra nếu phone bắt đầu bằng +84 (số điện thoại Việt Nam)
      if (phone.startsWith('+84') || phone.startsWith('%2B84')) {
        const cleanPhone = phone.replace('%2B', '+');
        
        // Validate số điện thoại Việt Nam: +84 + 9-10 số
        const phoneWithoutCountryCode = cleanPhone.replace('+84', '');
        const isValidLength = phoneWithoutCountryCode.length >= 9 && phoneWithoutCountryCode.length <= 10;
        const isAllDigits = /^\d+$/.test(phoneWithoutCountryCode);
        
        if (isValidLength && isAllDigits) {
          setPhoneNumber(cleanPhone);
          setIsValidPhone(true);
        } else {
          setIsValidPhone(false);
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }
        
        // Đợi 1 giây rồi mới trigger gọi điện
        setTimeout(() => {
          window.location.href = `tel:${cleanPhone}`;
        }, 1000);
        
        // Countdown và redirect về trang chủ sau 10 giây
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              router.push('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(countdownInterval);
      } else {
        // Nếu không phải số điện thoại hợp lệ, đợi 2 giây rồi redirect
        setIsValidPhone(false);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    };

    handlePhoneCall();
  }, [params, router]);

  if (!isValidPhone && phoneNumber === '') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Đang xử lý...</h1>
        </div>
      </div>
    );
  }

  if (!isValidPhone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Số điện thoại không hợp lệ</h1>
          <p className="text-gray-600">Đang chuyển về trang chủ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Đang kết nối cuộc gọi...</h1>
        <p className="text-gray-600 mb-4">Số điện thoại: <span className="font-semibold text-emerald-600">{phoneNumber}</span></p>
        <p className="text-sm text-gray-500">Tự động chuyển về trang chủ sau {countdown} giây</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 text-sm text-emerald-600 hover:text-emerald-700 underline"
        >
          Quay về trang chủ ngay
        </button>
      </div>
    </div>
  );
}