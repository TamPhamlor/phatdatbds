
import React from "react";
import Image from "next/image";

interface CardItem {
  img: string;
  title: string;
  address: string;
  beds: string;
  price: string;
}

interface CardProps {
  item: CardItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-emerald-100/70 via-white to-emerald-50/80
        backdrop-blur-md
        border border-emerald-300/70
        transition-all duration-300
        group hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-200/60
        hover:-translate-y-1 hover:from-emerald-100 hover:to-emerald-50
        h-full flex flex-col
      "
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="
            object-cover
            group-hover:scale-105 transition-transform duration-500
          "
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col">
        <h5 className="font-semibold text-base text-gray-900 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
          {item.title}
        </h5>
        
        {/* Price & Area */}
        <div className="flex items-center gap-2.5 pt-0.5">
          {/* Giá - Màu đỏ */}
          <span className="text-lg font-bold text-red-600">{item.price}</span>
          
          <span className="text-gray-300">•</span>
          
          {/* Diện tích */}
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="text-sm font-semibold text-emerald-600">{item.beds}</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{item.address}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
