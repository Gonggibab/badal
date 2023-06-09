"use client";
import { useEffect, useState } from "react";

const useScroll = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [bodyOffset, setBodyOffset] = useState<DOMRect>(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState<number>(bodyOffset.top);
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  const listener = () => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "up" : "down");
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
};

export default useScroll;
