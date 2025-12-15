'use client';

import { useEffect } from 'react';

/**
 * Component để suppress hydration warnings do browser extensions
 * Chỉ sử dụng trong development mode
 */
export default function SuppressHydrationWarning() {
  useEffect(() => {
    // Chỉ chạy trong development mode
    if (process.env.NODE_ENV === 'development') {
      // Suppress hydration warnings do browser extensions
      const originalError = console.error;
      console.error = (...args) => {
        if (
          typeof args[0] === 'string' &&
          (args[0].includes('Hydration failed') ||
           args[0].includes('hydration') ||
           args[0].includes('bis_register') ||
           args[0].includes('browser extension'))
        ) {
          return;
        }
        originalError.call(console, ...args);
      };

      return () => {
        console.error = originalError;
      };
    }
  }, []);

  return null;
}