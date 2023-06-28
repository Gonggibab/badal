import Image from "next/image";
import Link from "next/link";

import image from "assets/images/main_product.jpg";
import ArrowIcon from "assets/icon/arrow_w_stick.svg";

export default function FirstSection() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] flex">
      <div className="z-10 w-full h-full flex flex-col">
        <div className="p-8 w-full">
          <h2 className="w-fit pt-6 text-2xl font-light drop-shadow shadow-white">
            눈부신 피부 재생
          </h2>
          <div className="w-fit overflow-hidden">
            <h1 className="text-6xl font-bold tracking-tighter animate-appear drop-shadow shadow-white">
              LETHITINE
            </h1>
          </div>
          <div className="w-fit overflow-hidden">
            <h1 className="text-6xl font-bold tracking-tighter animate-appear drop-shadow shadow-white">
              CONG CREAM
            </h1>
          </div>

          <Link
            href={"/product"}
            className="mt-10 p-1 w-fit flex items-center text-sm rounded-md transition-all 
          backdrop-blur-[1px] bg-[#eae5e5]/[0.1] hover:translate-x-1"
          >
            구매하러 가기 <ArrowIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
      <Image
        src={image}
        alt="제품 이미지"
        fill
        sizes="100vw 100vh"
        className="w-full h-full object-cover object-center"
      ></Image>
    </section>
  );
}
