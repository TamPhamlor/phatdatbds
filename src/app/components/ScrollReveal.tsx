"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  initialClass?: string; // class khi chưa hiển thị
  enterClass?: string;   // class khi vào viewport
  children: ReactNode;
}

const Reveal: React.FC<RevealProps> = ({
  initialClass = "opacity-0 translate-y-10",
  enterClass = "opacity-100 translate-y-0",
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
      className={`
        transition-all duration-700 ease-out
        ${visible ? enterClass : initialClass}
      `}
    >
      {children}
    </div>
  );
};

export default Reveal;
