"use client";

import { useState } from "react";
import Image from "next/image";
import { Listing } from "@/app/types/products";

interface HeroGalleryProps {
  images: Listing["images"];
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.is_cover)?.url || images[0]?.url
  );

  return (
    <section className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm p-3">
      <div className="relative">
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> For Sale
          </span>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <Image
            src={selectedImage}
            alt="Hero"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

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
    </section>
  );
};

export default HeroGallery;
