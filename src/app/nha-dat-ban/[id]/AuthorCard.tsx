"use client";

import React from "react";
import Image from "next/image";

interface AuthorCardProps {
  author: string;
  phone: string;
  avatar: string;
  publishedAt?: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  phone,
  avatar,
  publishedAt,
}) => {
  const isExternal = (url: string) => url.startsWith("http");

  const formattedDate =
    publishedAt &&
    new Date(publishedAt).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white mt-4">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={avatar}
            alt={author}
            fill
            className="object-cover"
            unoptimized={isExternal(avatar)}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800 pb-2">{author}</span>
          {formattedDate && (
            <span className="text-xs text-gray-500">{formattedDate}</span>
          )}
        </div>
      </div>

      {/* Contact */}
      <a
        href={`tel:${phone}`}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
      >
        {phone}
      </a>
    </div>
  );
};

export default AuthorCard;
