import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { motion, useScroll, useTransform } from "framer-motion";

import { isHeaderTranspAtom } from "common/recoil/atom";

export default function FirstSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const setIsHeaderTransp = useSetRecoilState(isHeaderTranspAtom);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 20]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const position = window.scrollY;
    const sectionhalfHeight = sectionRef.current?.clientHeight / 2;

    if (position < sectionhalfHeight) setIsHeaderTransp(true);
    else setIsHeaderTransp(false);

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const position = window.scrollY;
      const sectionhalfHeight = sectionRef.current?.clientHeight / 2;

      if (position < sectionhalfHeight) setIsHeaderTransp(true);
      else setIsHeaderTransp(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsHeaderTransp]);

  return (
    <section ref={sectionRef} className="w-screen h-[300vh] flex flex-col">
      <div className="sticky top-0 w-screen h-screen">
        <motion.video
          className="-z-10 w-full h-full object-cover object-center bg-transparent"
          preload="true"
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: opacity }}
        >
          <source
            src="https://ik.imagekit.io/focel/FOCEL/focel_mainvid.mp4?updatedAt=1687262463986"
            type="video/mp4"
          />
        </motion.video>
        <div
          className="p-6 pb-48 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[90%] flex flex-col justify-center items-center text-white lg:px-20"
        >
          <motion.h1
            className="mt-4 text-5xl font-bold tracking-tight 
            leading-snug break-keep sm:text-7xl lg:text-8xl"
            style={{ scale: scale }}
          >
            건강한 피부를 위한 과학입니다
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
