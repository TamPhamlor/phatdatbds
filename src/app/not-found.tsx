import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Glass morphism container */}
        <div className="relative backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-500/10">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 blur-sm -z-10"></div>
          
          {/* 404 Number with glass effect */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 drop-shadow-lg">
              404
            </div>
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-emerald-200/30 blur-sm">
              404
            </div>
          </div>

          {/* Icon with glass morphism */}
          <div className="mb-6 flex justify-center">
            <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-emerald-500/10 border border-emerald-200/30 shadow-lg">
              <svg 
                className="w-16 h-16 text-emerald-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.674-2.64M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
          </div>

          {/* Title and description */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trang không tồn tại
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. 
            <br className="hidden md:block" />
            Có thể trang đã được di chuyển hoặc không còn tồn tại.
          </p>

          {/* Action buttons with glass morphism */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="group relative px-8 py-4 rounded-2xl backdrop-blur-lg bg-emerald-500/90 hover:bg-emerald-600/90 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 border border-emerald-400/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Về trang chủ
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link 
              href="/nha-dat-ban"
              className="group relative px-8 py-4 rounded-2xl backdrop-blur-lg bg-white/50 hover:bg-white/70 text-emerald-700 font-semibold shadow-lg shadow-gray-500/10 hover:shadow-gray-500/20 transition-all duration-300 hover:-translate-y-1 border border-white/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Tìm bất động sản
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Additional help links */}
          <div className="mt-8 pt-6 border-t border-emerald-200/30">
            <p className="text-sm text-gray-500 mb-4">Hoặc bạn có thể:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/tin-tuc" 
                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Đọc tin tức
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                href="/lien-he" 
                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Liên hệ hỗ trợ
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                href="/cau-hoi-thuong-gap" 
                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Câu hỏi thường gặp
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-emerald-400/20 backdrop-blur-sm animate-bounce delay-300"></div>
        <div className="absolute -top-2 -right-6 w-6 h-6 rounded-full bg-teal-400/20 backdrop-blur-sm animate-bounce delay-700"></div>
        <div className="absolute -bottom-4 left-8 w-10 h-10 rounded-full bg-emerald-300/20 backdrop-blur-sm animate-bounce delay-1000"></div>
        <div className="absolute -bottom-2 -right-4 w-7 h-7 rounded-full bg-teal-300/20 backdrop-blur-sm animate-bounce delay-500"></div>
      </div>
    </div>
  );
}