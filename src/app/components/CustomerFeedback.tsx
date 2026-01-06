"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";

// Ảnh feedback khách hàng thật
const demoFeedbackImages = [
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940814/z7335194408133_35bd2ca6a7f7f82f5ed3c3b80e3846a0_a3bhcz.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940814/z7335194478856_a01a91f06a172e6423dde3e04ab9e9b0_dheyfe.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940814/z7335194401949_711db985790965e3d856ec8172c96bcb_bzrl4b.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940814/z7335194415144_7a29beb81f81971f1669e6890352aeb1_mkazn6.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940813/z7335194424082_4ab1c1a4450c76e1295fc24c7ddce0b7_ejsalp.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940813/z7335194441462_c18d6169610122aa67c86270584c76f9_bluxmv.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940813/z7335194429190_b6847970902d65ca7bde5f86eec47f39_pwzgm4.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940813/z7335194436356_2b5c6831b84ed5d094cb9b0c757032a7_kcph0s.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940812/z7335194471906_487e5bea782a81e41270755ec5f1c664_ncehfd.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940812/z7335194492929_991d42f58e48becf3ac90e5530f84e13_l6w7uv.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940812/z7335194464806_64147dd4b3fe7baa59bca137037e6afa_zpnwba.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940812/z7335194458375_3fa51b201e2517d125f4b956b78d6c31_pxm5z6.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940812/z7335194449143_59d431381b25b0cd1171499106232ae7_ctglkn.jpg",
  "https://res.cloudinary.com/dsiier5sg/image/upload/v1765940812/z7335194485776_bf4398223b90b76e05eedd0116a45bd7_f8vqrv.jpg",
];

const CustomerFeedback: React.FC = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Shuffle ảnh
  const shuffledImages = useMemo(() => {
    const shuffled = [...demoFeedbackImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const totalSets = Math.ceil(shuffledImages.length / 6);

  const goToSet = useCallback((index: number) => {
    setCurrentSet(index);
  }, []);

  const nextSet = useCallback(() => {
    setCurrentSet((prev) => (prev + 1) % totalSets);
  }, [totalSets]);

  const prevSet = useCallback(() => {
    setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets);
  }, [totalSets]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      nextSet();
    } else if (diff < -threshold) {
      prevSet();
    }
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSet();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSet]);

  // Close modal on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const startIdx = currentSet * 6;
  let displayImages = shuffledImages.slice(startIdx, startIdx + 6);
  // Nếu không đủ 6 ảnh, lấy thêm từ đầu
  if (displayImages.length < 6) {
    displayImages = [...displayImages, ...shuffledImages.slice(0, 6 - displayImages.length)];
  }

  // Layout patterns với grid areas
  const gridAreas = currentSet % 2 === 0
    ? ["a", "b", "c", "d", "e", "f"]
    : ["a", "b", "c", "d", "e", "f"];

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container-std">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
            Khách hàng <span className="text-gradient-emerald">tin tưởng</span> Phát Đạt
          </h3>
          <p className="text-mute text-base mt-3">
            Hình ảnh giao dịch thành công và phản hồi từ khách hàng đã tin tưởng sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        {/* Bento Grid với swipe */}
        <div 
          ref={containerRef}
          className="relative touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop: Bento Grid */}
          <div className="hidden md:block">
            <div 
              className="grid gap-4 transition-opacity duration-500"
              style={{ 
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "180px 180px",
                gridTemplateAreas: currentSet % 3 === 0
                  ? `"a b c c" "a d e f"`  // ô dọc trái + ô dọc phải
                  : currentSet % 3 === 1
                  ? `"a a b c" "d e e c"`  // ô dọc phải
                  : `"a b c d" "a b e f"`, // 2 ô dọc trái
              }}
            >
              {displayImages.map((src, index) => (
                <div
                  key={`${currentSet}-${index}`}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer"
                  style={{ gridArea: gridAreas[index] }}
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`Feedback khách hàng ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">Giao dịch thành công</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: 2x3 Grid */}
          <div className="md:hidden">
            <div 
              className="grid grid-cols-2 gap-3 transition-opacity duration-500"
              style={{ 
                gridTemplateRows: "140px 140px 140px",
              }}
            >
              {displayImages.map((src, index) => (
                <div
                  key={`mobile-${currentSet}-${index}`}
                  className="relative overflow-hidden rounded-xl group cursor-pointer"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`Feedback khách hàng ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-active:scale-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white text-[10px] font-medium">Thành công</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSets }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSet(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSet === index ? "bg-emerald-500 w-8" : "bg-gray-300 hover:bg-emerald-300 w-2.5"
                }`}
                aria-label={`Xem bộ ảnh ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint for mobile */}
          <p className="md:hidden text-center text-xs text-gray-400 mt-2">
            ← Vuốt để xem thêm →
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
          <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
            <div className="text-xl md:text-3xl font-bold text-gradient-emerald">500+</div>
            <div className="text-[10px] md:text-sm text-gray-600 mt-1">Giao dịch thành công</div>
          </div>
          <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
            <div className="text-xl md:text-3xl font-bold text-gradient-emerald">98%</div>
            <div className="text-[10px] md:text-sm text-gray-600 mt-1">Khách hàng hài lòng</div>
          </div>
          <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
            <div className="text-xl md:text-3xl font-bold text-gradient-emerald">10+</div>
            <div className="text-[10px] md:text-sm text-gray-600 mt-1">Năm kinh nghiệm</div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          
          {/* Image container */}
          <div 
            className="relative z-10 max-w-4xl max-h-[85vh] w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Feedback khách hàng"
                fill
                unoptimized
                className="object-contain bg-black/50"
              />
            </div>
            
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 md:top-4 md:right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Đóng"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Giao dịch thành công tại Phát Đạt</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CustomerFeedback;
