import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bỏ qua các file tĩnh, API routes, và Next.js internal routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') || // files with extensions
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Cho phép các static routes hợp lệ
  const validStaticRoutes = [
    '/',
    '/nha-dat-ban',
    '/tin-tuc',
    '/lien-he',
    '/cau-hoi-thuong-gap',
    '/chinh-sach-bao-mat',
    '/dieu-khoan-su-dung',
    '/not-found.html'
  ];

  // Kiểm tra dynamic routes hợp lệ
  const isDynamicRoute = 
    pathname.startsWith('/nha-dat-ban/') ||
    pathname.startsWith('/tin-tuc/') ||
    pathname.match(/^\/(\+84|%2B84)\d{9,10}$/) || // phone number routes với +84
    pathname.match(/^\/0\d{9,10}$/); // phone number routes với 0

  // Cho phép tất cả các route hợp lệ đi qua
  // Dynamic routes sẽ tự xử lý 404 bằng notFound() function
  if (validStaticRoutes.includes(pathname) || isDynamicRoute) {
    return NextResponse.next();
  }

  // Chỉ redirect các route rõ ràng không hợp lệ đến trang 404 tĩnh
  // Ví dụ: /abc, /xyz, /invalid-page, etc.
  return NextResponse.redirect(new URL('/not-found.html', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};