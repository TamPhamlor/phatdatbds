'use client';

import { useEffect, useState } from 'react';

interface HydrationSafeProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component để tránh hydration mismatch do browser extensions
 * hoặc các yếu tố external khác
 */
export default function HydrationSafe({ children, fallback = null }: HydrationSafeProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Đảm bảo component chỉ render sau khi hydration hoàn tất
    setIsHydrated(true);
  }, []);

  // Trong quá trình hydration, render fallback hoặc null
  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}