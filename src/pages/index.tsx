import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import Head from "next/head";
import Image from "next/image";

import { isHeaderTranspAtom } from "common/recoil/atom";
import image from "assets/test_photo.webp";

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const setIsHeaderTransp = useSetRecoilState(isHeaderTranspAtom);

  useEffect(() => {
    if (!sectionRef.current) return;

    const position = window.scrollY;
    const sectionHeight = sectionRef.current?.clientHeight;

    if (position < sectionHeight - 80) setIsHeaderTransp(true);
    else setIsHeaderTransp(false);

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const position = window.scrollY;
      const sectionHeight = sectionRef.current?.clientHeight;

      if (position < sectionHeight - 80) setIsHeaderTransp(true);
      else setIsHeaderTransp(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsHeaderTransp]);

  return (
    <>
      <Head>
        <title>FO:CEL</title>
        <meta
          name="description"
          content="피부 걱정 없이 살아가는 모두를 위한 솔루션."
        />
      </Head>
      <article className="flex flex-col items-center justify-between">
        <section
          ref={sectionRef}
          className="relative w-screen h-screen flex flex-col
            justify-center items-center -translate-y-[80px]"
        >
          <video
            className="-z-10 absolute w-full h-full object-cover object-center bg-transparent"
            preload="true"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://ik.imagekit.io/focel/FOCEL/focel_mainvid.mp4?updatedAt=1687262463986"
              type="video/mp4"
            />
          </video>

          <div className="p-6 pb-48 flex flex-col justify-center items-center text-white lg:px-20">
            <h1
              className="mt-4 text-5xl font-bold tracking-tight animate-fadein 
                  leading-snug break-keep sm:text-7xl lg:text-8xl"
            >
              건강한 피부를 위한 과학입니다
            </h1>
          </div>
        </section>

        <section className="relative w-screen h-screen bg-slate-300 -translate-y-[80px]">
          <Image
            src={image}
            alt="배경 이미지"
            fill
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </section>
      </article>
    </>
  );
}
