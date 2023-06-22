import { useEffect, useRef } from "react";
import Image from "next/image";
import { Variants, motion, useScroll, useTransform } from "framer-motion";

import image1 from "assets/images/product1.jpg";

export default function SecondSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 0.3], [0, 200]);

  const textVariants: Variants = {
    offscreen: {
      y: 100,
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative p-8 w-screen h-[300vh] flex flex-col"
    >
      <div className="m-10 w-full flex flex-col text-8xl font-bold">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          className="pt-2 overflow-hidden"
        >
          <motion.h2 variants={textVariants}>최소한의 재료</motion.h2>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          className="pt-2 overflow-hidden"
        >
          <motion.h2 variants={textVariants}>최대한의 효과</motion.h2>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          className="pt-2 overflow-hidden"
        >
          <motion.h2 variants={textVariants}>피부가 증명합니다</motion.h2>
        </motion.div>
      </div>

      {/* <h2>FOCEL, 써보지 않으면 알 수 없는 느낌</h2>
      <h2>화장품의 가치, 결국 피부가 증명합니다</h2>
      <h2>
        Minimal, The Best! - 다다익선(多多益善) NO!, 좋은 성분들이니 어쨌든 좋을
        거야. 과연 그럴까요?
      </h2>
      <h2>
        본인보다 주위에서 먼저 알아봅니다. “요즘 얼굴에 뭐 했어?” “요즘 얼굴에
        무슨 짓을 한거야?!”
      </h2>
      <h2>망설이면 늦습니다. 여러분의 피부에 생기를 넣어주세요.</h2> */}
    </section>
  );
}
