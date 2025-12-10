"use client";

import { Listing } from "@/app/types/products";
import Link from "next/link";
import { useCallback } from "react";
import { useParams } from "next/navigation";

interface BreadcrumbProps {
  listing: Listing;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://phatdatbatdongsan.com";

function buildShareUrl(currentHref: string | null, idFromRoute: string, listing: Listing): string {
  // 1) Ưu tiên URL hiện tại (đầy đủ slug, query, hash…)
  if (currentHref && currentHref !== "" && !currentHref.endsWith("/nha-dat-ban")) {
    return currentHref;
  }
  // 2) Fallback: ghép từ BASE_URL + id trong route (idFromRoute chính là slug trong app router)
  const slugOrId =
    idFromRoute ||
    (listing as unknown as { slug?: string }).slug ||
    String(listing.id);

  return `${BASE_URL}/nha-dat-ban/${slugOrId}`;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ listing }) => {
  const params = useParams(); // { id: 'can-phong-trong' } hoặc số id
  const idFromRoute = (params?.id as string) ?? "";

  const handleShare = useCallback(async () => {
    const currentHref =
      typeof window !== "undefined" ? window.location?.href ?? null : null;
    const shareUrl = buildShareUrl(currentHref, idFromRoute, listing);

    // 1) Web Share API
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share?.({
          title: listing.title,
          text: listing.description?.slice(0, 120),
          url: shareUrl,
        });
        return;
      } catch {
        // user cancel / lỗi -> fallback FB
      }
    }

    // 2) Fallback: Facebook sharer
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    const w = 600;
    const h = 600;
    const left =
      typeof window !== "undefined"
        ? window.screenX + (window.outerWidth - w) / 2
        : 0;
    const top =
      typeof window !== "undefined"
        ? window.screenY + (window.outerHeight - h) / 2.5
        : 0;
    window.open(
      fbUrl,
      "fbshare",
      `width=${w},height=${h},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no`
    );
  }, [idFromRoute, listing]);

  const handleCopy = useCallback(async () => {
    const currentHref =
      typeof window !== "undefined" ? window.location?.href ?? null : null;
    const shareUrl = buildShareUrl(currentHref, idFromRoute, listing);

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Đã sao chép liên kết!");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Đã sao chép liên kết!");
    }
  }, [idFromRoute, listing]);

  return (
    <div className="container-std pt-4">
      <div className="flex items-center justify-between gap-3">
        <nav className="text-sm text-gray-500 min-w-0 flex-1 leading-relaxed">
          <Link href="/" className="hover:text-emerald-600 transition-colors inline">
            Trang chủ
          </Link>
          <svg className="w-4 h-4 mx-1.5 text-gray-300 inline-block align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/nha-dat-ban" className="hover:text-emerald-600 transition-colors inline">
            Bất động sản
          </Link>
          <svg className="w-4 h-4 mx-1.5 text-gray-300 inline-block align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-gray-700 font-medium inline" title={listing.title}>
            {listing.title}
          </span>
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
            aria-label="Chia sẻ lên mạng xã hội"
          >
            <svg
              className="w-4 h-4 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Chia sẻ
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
            aria-label="Sao chép liên kết"
          >
            <svg
              className="w-4 h-4 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Sao chép
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
