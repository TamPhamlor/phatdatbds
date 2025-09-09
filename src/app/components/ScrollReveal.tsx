"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  initialClass?: string; // class khi chưa hiển thị
  enterClass?: string;   // class khi vào viewport
  children: ReactNode;
}

const Reveal: React.FC<RevealProps> = ({
  children,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elRef.current) observer.observe(elRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elRef}
      className={`transition-opacity duration-700 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
