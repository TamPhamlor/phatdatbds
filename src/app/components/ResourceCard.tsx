
import Image from "next/image";
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
      <div className="relative h-40 w-full">
  <Image
    src={image}       // link ảnh (có thể là URL ngoài nếu đã thêm domain vào next.config.js)
    alt={title}
    fill              // cho Image chiếm toàn bộ container
    className="object-cover"
    unoptimized       // nếu muốn load từ URL ngoài mà không cần khai báo domain
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
