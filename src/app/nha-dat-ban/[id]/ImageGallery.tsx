"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default function ImageGallery({
  images,
  title,
}: {
  images: { id: number; url: string }[];
  title: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Ref cho Swiper trong lightbox
  const lightboxSwiperRef = useRef<SwiperClass | null>(null);

  // Khi mở lightbox, chuyển slide về đúng index
  useEffect(() => {
    if (lightboxOpen && lightboxSwiperRef.current) {
      lightboxSwiperRef.current.slideTo(lightboxIndex, 0);
    }
  }, [lightboxOpen, lightboxIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mx-auto">
      {/* Main slider */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-2xl overflow-hidden"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.id}>
            <div
              className="relative w-full h-[200px] sm:h-[375px] cursor-pointer"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={img.url}
                alt={`${title} - ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                {index + 1} / {images.length}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode
        watchSlidesProgress
        className="mt-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={`thumb-${img.id}`}>
            <div
              className={`relative w-full h-20 sm:h-32 cursor-pointer rounded-md overflow-hidden ${
                index === activeIndex ? "border-2 border-gray-300" : ""
              }`}
              onClick={() => {
                // Chỉ chuyển slide chính, không mở lightbox
                thumbsSwiper?.slideTo(index);
              }}
            >
              <Image
                src={img.url}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          {/* Nút close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-4 right-4 z-[9999] text-white text-3xl font-bold p-2 pointer-events-auto"
          >
            ×
          </button>

          <div className="w-[90%] max-w-3xl h-[80%] relative">
            <Swiper
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => {
                lightboxSwiperRef.current = swiper;
                // Đảm bảo khi mở lightbox sẽ nhảy đúng slide
                setTimeout(() => {
                  swiper.slideTo(lightboxIndex, 0);
                }, 0);
              }}
              initialSlide={lightboxIndex}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              className="w-full h-full z-[10000]"
              onSlideChange={(swiper) => {
                setLightboxIndex(swiper.activeIndex);
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={`lightbox-${img.id}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img.url}
                      alt={`image - ${index + 1}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
