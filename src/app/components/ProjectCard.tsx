"use client";
import React from "react";
import Image from "next/image";
import { FavoriteBorder, BedroomParent, Bathtub, SquareFoot, LocationOn } from "@mui/icons-material";

interface ProjectCardProps {
  title: string;
  price: string;
  area: string;
  rooms: number;
  baths: number;
  location: string;
  images: string[];
  author?: string;
  phone: string;
  avatar: string;
  description?: string;
  publishedAt: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  price,
  area,
  rooms,
  baths,
  location,
  images,
  phone,
  avatar,
  description,
  author,
  publishedAt,
}) => {
  const mainImage = images[0];
  const subImages = images.slice(1, 4);
  const remaining = images.length - 4;

  const formattedDate = new Date(publishedAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Helper để xác định khi nào cần bỏ tối ưu (link ngoài)
  const isExternal = (url: string) => url.startsWith("http");

  return (
    <div className="flex flex-col md:flex-row-reverse border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 p-4 gap-4 bg-white">
      {/* Image section */}
      <div className="w-full md:w-1/2 flex flex-col relative gap-2">
        <div className="relative w-full h-64 md:h-70 rounded-2xl overflow-hidden">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            unoptimized={isExternal(mainImage)}
          />
        </div>

        {/* Sub images */}
        {subImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {subImages.map((img, idx) => (
              <div key={idx} className="relative w-full h-20 rounded-xl overflow-hidden">
                <Image
                  src={img}
                  alt={`sub-${idx}`}
                  fill
                  className="object-cover"
                  unoptimized={isExternal(img)}
                />
                {idx === 2 && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm rounded-xl">
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Love icon */}
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-white py-[4px] px-[8px]">
          <FavoriteBorder className="text-red-500" fontSize="small" />
        </button>
      </div>

      {/* Info section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
        {/* Title */}
        <div className="pb-3 border-b border-gray-200">
          <h3 className="font-semibold text-2xl text-gray-800">{title}</h3>
          <span className="text-red-600 font-bold text-lg mt-1 block">{price}</span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 pb-3 border-b border-gray-200 mt-2 text-gray-600 text-sm">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <BedroomParent fontSize="small" /> {rooms} PN
            </span>
            <span className="flex items-center gap-1">
              <Bathtub fontSize="small" /> {baths} WC
            </span>
            <span className="flex items-center gap-1">
              <SquareFoot fontSize="small" /> {area}
            </span>
            <span className="flex items-center gap-1">
              <LocationOn fontSize="small" /> {location}
            </span>
          </div>
          {description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{description}</p>
          )}
        </div>

        {/* Author & contact */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={avatar}
                alt={author || "avatar"}
                fill
                className="object-cover"
                unoptimized={isExternal(avatar)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">{author}</span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
          </div>
          <button className="btn btn-primary text-xs px-3 py-1">{phone}</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
