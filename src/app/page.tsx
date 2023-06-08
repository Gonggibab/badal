"use client";
import Image from "next/image";
import image from "assets/test_photo.webp";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <section className="relative w-screen h-screen">
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

      <section className="w-screen h-screen bg-slate-300">test</section>
    </main>
  );
}
