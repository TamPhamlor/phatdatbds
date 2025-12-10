"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Listing } from "@/app/types/products";

interface HeroGalleryProps {
  images: Listing["images"];
}

// Lightbox component rendered via Portal
function GalleryLightbox({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}: {
  images: Listing["images"];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onClose: () => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lightboxThumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
    resetZoom();
  };
  const goPrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    resetZoom();
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setOffset({ x: 0, y: 0 });
  };

  // Auto-scroll thumbnail trong lightbox
  useEffect(() => {
    const thumb = lightboxThumbRefs.current[currentIndex];
    if (thumb) {
      thumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const handleZoom = (e: React.MouseEvent) => {
    if (isZoomed) {
      resetZoom();
      return;
    }
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x: `${clickX}%`, y: `${clickY}%` });
    setIsZoomed(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !lastPos.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    lastPos.current = null;
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
      }}
      onClick={() => {
        onClose();
        resetZoom();
      }}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Main image */}
      <div
        className="relative max-w-[90vw] max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Image
          src={images[currentIndex]?.url || ""}
          alt="Preview"
          width={1600}
          height={1000}
          className="rounded-xl object-contain select-none max-h-[80vh]"
          unoptimized
          style={{
            transform: isZoomed ? `scale(2) translate(${offset.x}px, ${offset.y}px)` : "scale(1)",
            transformOrigin: `${origin.x} ${origin.y}`,
            transition: isZoomed ? "transform 0.1s ease-out" : "transform 0.3s ease",
            cursor: isZoomed ? "grab" : "zoom-in",
          }}
          onClick={handleZoom}
        />
      </div>

      {/* Thumbnails với auto-scroll */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm overflow-x-auto max-w-[90vw] scroll-smooth">
        {images.map((img, index) => (
          <div
            key={`lightbox-thumb-${index}`}
            ref={(el) => { lightboxThumbRefs.current[index] = el; }}
            className={`relative w-14 h-10 rounded-lg overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
              currentIndex === index
                ? "ring-2 ring-emerald-500 scale-110"
                : "opacity-60 hover:opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
              resetZoom();
            }}
          >
            <Image src={img.url} alt={`Thumb ${index + 1}`} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {
  // Tìm index của ảnh cover, nếu không có thì dùng 0
  const coverIndex = images.findIndex((img) => img.is_cover);
  const [selectedIndex, setSelectedIndex] = useState(coverIndex >= 0 ? coverIndex : 0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll thumbnail vào view khi selectedIndex thay đổi
  useEffect(() => {
    const thumb = thumbRefs.current[selectedIndex];
    if (thumb && thumbsContainerRef.current) {
      thumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  return (
    <>
      <section className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-emerald-100/50 shadow-sm p-3">
        {/* Ảnh chính */}
        <div
          className="relative w-full aspect-[16/9] rounded-xl overflow-hidden cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={images[selectedIndex]?.url || ""}
            alt="Hero"
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Nhấn để phóng to
          </div>
        </div>

        {/* Thumbnails với auto-scroll - thêm padding để không bị cắt khi scale */}
        <div 
          ref={thumbsContainerRef}
          className="mt-3 flex gap-2 overflow-x-auto no-scrollbar py-3 px-2 scroll-smooth -mx-1"
        >
          {images.map((img, index) => (
            <div
              key={`hero-thumb-${index}`}
              ref={(el) => { thumbRefs.current[index] = el; }}
              className={`relative rounded-lg w-24 h-16 min-w-[6rem] cursor-pointer overflow-hidden transition-all ${
                selectedIndex === index
                  ? "ring-2 ring-emerald-400 scale-[1.03]"
                  : "opacity-70 hover:opacity-100 hover:scale-[1.02]"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox via Portal */}
      {mounted &&
        isOpen &&
        createPortal(
          <GalleryLightbox
            images={images}
            currentIndex={selectedIndex}
            setCurrentIndex={setSelectedIndex}
            onClose={() => setIsOpen(false)}
          />,
          document.body
        )}
    </>
  );
};

export default HeroGallery;
