"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface CardItem {
  img: string;
  title: string;
  address: string;
  beds: string;
  price: string;
}

interface CardProps {
  item: CardItem;
  index?: number; // Index để hiển thị số thứ tự
}

// Lightbox component - render với inline style để tránh bị ảnh hưởng bởi parent CSS
function ImageLightbox({
  src,
  alt,
  index,
  onClose,
}: {
  src: string;
  alt: string;
  index?: number;
  onClose: () => void;
}) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2147483647, // Max z-index
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        margin: 0,
        padding: 0,
      }}
      onClick={handleOverlayClick}
    >
      {/* Index badge */}
      {index !== undefined && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            padding: "8px 16px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
            zIndex: 2147483647,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Ảnh #{index + 1}
        </div>
      )}

      {/* Close button */}
      <button
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 2147483647,
        }}
        onClick={handleOverlayClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Main image */}
      <div
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
        onClick={handleImageClick}
      >
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          style={{
            objectFit: "contain",
            maxHeight: "90vh",
            borderRadius: "8px",
            width: "auto",
            height: "auto",
          }}
          unoptimized
        />
      </div>
    </div>
  );
}

const Card: React.FC<CardProps> = ({ item, index }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (e: React.MouseEvent) => {
    // Ngăn chặn tất cả event propagation để không trigger Link navigation
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={openLightbox}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Zoom icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </span>
          </div>
          {/* Price badge - NỔI BẬT HƠN */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
              <span className="text-base font-bold tracking-wide">{item.price}</span>
            </div>
          </div>
          {/* Favorite button */}
          <button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg
              className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h5 className="font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
            {item.title}
          </h5>

          {/* Address */}
          <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-500">
            <svg
              className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{item.address}</span>
          </div>

          {/* Area badge */}
          <div className="mt-auto pt-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {item.beds}
              </span>
              <span className="text-xs text-gray-400">Xem chi tiết →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox via Portal - render ra document.body */}
      {mounted &&
        lightboxOpen &&
        createPortal(
          <ImageLightbox
            src={item.img}
            alt={item.title}
            index={index}
            onClose={closeLightbox}
          />,
          document.body
        )}
    </>
  );
};

export default Card;
