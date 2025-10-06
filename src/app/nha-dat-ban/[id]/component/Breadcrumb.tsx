"use client";

import { Listing } from "@/app/types/products";
import Link from "next/link";
import { useMemo, useCallback } from "react";

interface BreadcrumbProps {
  listing: Listing;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://phatdatbatdongsan.com";

function getAbsoluteUrl(listingId: number): string {
  if (typeof window !== "undefined" && window.location?.href) {
    // Đang ở client: dùng chính URL hiện tại là chuẩn nhất
    return window.location.href;
  }
  // Fallback khi SSR: dựng URL từ BASE_URL + path chi tiết
  return `${BASE_URL}/nha-dat-ban/${listingId}`;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ listing }) => {
  const shareUrl = useMemo(() => getAbsoluteUrl(listing.id), [listing.id]);

  const handleShare = useCallback(async () => {
    // 1) Ưu tiên Web Share API nếu có
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share?.({
          title: listing.title,
          text: listing.description?.slice(0, 120),
          url: shareUrl,
        });
        return;
      } catch {
        // user cancel hoặc lỗi => rơi xuống fallback FB
      }
    }

    // 2) Fallback: mở share Facebook
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    // Mở popup trung tâm màn hình
    const w = 600;
    const h = 600;
    const left = typeof window !== "undefined" ? window.screenX + (window.outerWidth - w) / 2 : 0;
    const top = typeof window !== "undefined" ? window.screenY + (window.outerHeight - h) / 2.5 : 0;
    window.open(
      fbUrl,
      "fbshare",
      `width=${w},height=${h},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no`
    );
  }, [listing.title, listing.description, shareUrl]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Bạn có thể thay bằng toast của dự án nếu đang dùng (vd: sonner / toastify)
      alert("Đã sao chép liên kết!");
    } catch {
      // Fallback khi không có Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }, [shareUrl]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex items-center justify-between">
        <nav className="text-sm text-gray-500 flex">
          <Link href="/" className="hover:text-gray-700">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/nha-dat-ban" className="hover:text-gray-700">Bất động sản</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{listing.title}</span>
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            aria-label="Chia sẻ lên mạng xã hội"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.876v-6.987h-2.54v-2.889h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.631.772-1.631 1.562v1.877h2.773l-.443 2.889h-2.33v6.987C18.343 21.127 22 17 22 12z"/>
            </svg>
            Chia sẻ
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            aria-label="Sao chép liên kết"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Sao chép link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
