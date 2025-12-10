"use client";

import { Listing } from "@/app/types/products";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PhotoGalleryProps {
  images: Listing["images"];
}

// Lightbox component rendered via Portal
function Lightbox({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}: {
  images: Listing["images"];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onClose: () => void;
}) {
  const goNext = () => setCurrentIndex((currentIndex + 1) % images.length);
  const goPrev = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  // Handle keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Main image */}
      <div
        className="relative max-w-[90vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].url}
          alt={`Gallery ${currentIndex + 1}`}
          width={1400}
          height={900}
          className="object-contain max-h-[80vh] rounded-lg"
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm overflow-x-auto max-w-[90vw]">
        {images.map((img, index) => (
          <div
            key={`photo-lightbox-thumb-${index}`}
            className={`relative w-14 h-10 rounded-lg overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
              currentIndex === index
                ? "ring-2 ring-emerald-500 scale-110"
                : "opacity-60 hover:opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
          >
            <Image
              src={img.url}
              alt={`Thumb ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
      <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </span>
            Thư viện ảnh
          </div>
          <span className="text-sm text-gray-500">{images.length} ảnh</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={`photo-grid-${index}`}
              className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={img.url}
                alt="Gallery"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox via Portal - renders to document.body */}
      {mounted &&
        lightboxOpen &&
        createPortal(
          <Lightbox
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onClose={closeLightbox}
          />,
          document.body
        )}
    </>
  );
};

export default PhotoGallery;
