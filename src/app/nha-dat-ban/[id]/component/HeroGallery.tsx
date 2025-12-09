"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Listing } from "@/app/types/products";

interface HeroGalleryProps {
  images: Listing["images"];
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.is_cover)?.url || images[0]?.url
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const handleZoom = (e: React.MouseEvent) => {
    if (isZoomed) {
      // Nếu đang zoom thì nhấn lần nữa -> reset
      setIsZoomed(false);
      setOffset({ x: 0, y: 0 });
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

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    lastPos.current = null;
  };

  return (
    <section className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm p-3">
      {/* Ảnh chính */}
      <div
        className="relative w-full aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={selectedImage}
          alt="Hero"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar p-1">
        {images.map((img) => (
          <div
            key={img.sort_order}
            className={`relative rounded-xl w-28 h-20 min-w-[7rem] cursor-pointer ${
              selectedImage === img.url ? "ring-2 ring-indigo-500" : ""
            } overflow-hidden`}
            onClick={() => setSelectedImage(img.url)}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${img.sort_order}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Popup ảnh to */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => {
            setIsOpen(false);
            setIsZoomed(false);
            setOffset({ x: 0, y: 0 });
          }}
        >
          {/* Ảnh to */}
          <div
            className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Image
              src={selectedImage}
              alt="Preview"
              width={1600}
              height={1000}
              className="rounded-xl object-contain select-none"
              unoptimized
              style={{
                transform: isZoomed
                  ? `scale(2) translate(${offset.x}px, ${offset.y}px)`
                  : "scale(1)",
                transformOrigin: `${origin.x} ${origin.y}`,
                transition: isZoomed ? "transform 0.1s ease-out" : "transform 0.3s ease",
                cursor: isZoomed ? "grab" : "zoom-in",
              }}
              onClick={handleZoom}
            />
          </div>

          {/* Nút đóng ngoài ảnh */}
          <button
  className="absolute top-5 right-5 flex items-center justify-center 
             w-10 h-10 rounded-full bg-white shadow-lg 
             hover:bg-gray-100 hover:scale-105 transition"
  onClick={() => {
    setIsOpen(false);
    setIsZoomed(false);
    setOffset({ x: 0, y: 0 });
  }}
>
  <span className="text-xl font-bold text-gray-700">✕</span>
</button>
        </div>
      )}
    </section>
  );
};

export default HeroGallery;
