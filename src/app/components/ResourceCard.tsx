"use client";

import React from "react";

interface SlideCardProps {
  title: string;
  text: string;
  cta: string;
  image: string;
}

const SlideCard: React.FC<SlideCardProps> = ({ title, text, cta, image }) => {
  return (
    <div
      className="
        card overflow-hidden flex flex-col
        rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)] 
        bg-[var(--color-card)] border border-black/10
      "
    >
      {/* Image */}
      <div className="relative h-40">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h5 className="font-semibold text-lg text-[var(--color-text)]">{title}</h5>
        <p className="text-sm mt-1 flex-1 text-[var(--color-mute)]">{text}</p>

        <button
          className="
            btn btn-dark mt-4 w-max
            rounded-[var(--radius-xl2)]
            border border-black/10
            bg-[rgba(0,0,0,0.05)]
            text-[var(--color-text)]
            hover:bg-[rgba(0,0,0,0.1)]
            transition-all
          "
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

export default SlideCard;
