"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ImageGallery({
  images,
  title,
}: {
  images: { id: number; url: string }[];
  title: string;
}) {
  if (!images || images.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className="rounded-2xl mb-6"
    >
      {images.map((img) => (
        <SwiperSlide key={img.id}>
          <Image
            src={img.url}
            alt={title}
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover rounded-2xl"
            unoptimized
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
