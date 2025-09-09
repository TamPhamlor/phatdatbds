"use client";

import React from "react";

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
        rounded-[var(--radius-xl2)]
        bg-[var(--color-card)]
        border border-black/10
        transition-all duration-300
      "
    >
      <div className="relative h-48 overflow-hidden rounded-t-[var(--radius-xl2)]">
  <img
    src={item.img}
    alt={item.title}
    className="
      absolute inset-0 w-full h-full object-cover
      group-hover:scale-[1.02] transition-transform duration-300
      rounded-t-[var(--radius-xl2)]
    "
  />
</div>

      {/* Content */}
      <div className="p-4">
        <h5 className="font-semibold text-lg text-[var(--color-text)]">
          {item.title}
        </h5>
        <p className="text-xs mt-1 text-[var(--color-mute)]">{item.address}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-[var(--color-mute)]">{item.beds}</span>
          <span className="text-sm font-semibold text-[var(--color-text)]">
            {item.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
