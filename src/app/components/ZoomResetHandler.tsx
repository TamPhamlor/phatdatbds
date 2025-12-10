"use client";

import { useEffect } from "react";

// Component này xử lý reset zoom khi blur khỏi input/select trên iOS
export default function ZoomResetHandler() {
  useEffect(() => {
    const resetZoom = () => {
      // Chỉ chạy trên mobile
      if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
      
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        // Tạm thời cho phép scale để reset
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=10');
        
        // Sau đó khóa lại
        setTimeout(() => {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        }, 50);
      }
    };

    // Lắng nghe blur event trên tất cả input, select, textarea
    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA'
      ) {
        resetZoom();
      }
    };

    document.addEventListener('blur', handleBlur, true);
    
    return () => {
      document.removeEventListener('blur', handleBlur, true);
    };
  }, []);

  return null;
}
